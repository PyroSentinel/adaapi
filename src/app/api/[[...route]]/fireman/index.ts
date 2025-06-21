import { zValidator } from '@hono/zod-validator';
import { Hono } from 'hono';
import { env } from 'hono/adapter';
import { except } from 'hono/combine';
import { jwt } from 'hono/jwt';
import { z } from 'zod';

import prisma from '../../../../../prisma';

export const fireman = new Hono().basePath('/fireman');

fireman.use(
  '/*',
  except('*/*/login', async (c, next) => {
    const { JWT_SECRET } = env<EnvironmentVariables>(c);
    const jwtMiddleware = jwt({
      secret: JWT_SECRET,
    });
    return jwtMiddleware(c, next);
  }),
);

fireman.get('/', async (c) => {
  return c.json({ message: 'Hello from fireman!' });
});

const ProcessSchema = z.object({
  report_id: z.number().min(1, 'Group ID is required'),
});

fireman.post(
  '/process-report',
  zValidator('json', ProcessSchema),
  async (c) => {
    const { report_id } = c.req.valid('json');
    const { sub } = c.get('jwtPayload');

    const report = await prisma.report_group_member.findFirst({
      where: { id: report_id },
      include: {
        group: true,
      },
    });

    if (!report || !report.group) {
      return c.notFound();
    }

    if (report.group.status == 'completed') {
      return c.json({ message: 'Report already completed' }, 400);
    }

    const firemanGroup = await prisma.fireman_report_group.findMany({
      where: {
        group_id: report.group.id,
      },
    });

    const firemanExists = firemanGroup.some(
      (fireman) => fireman.fireman_id === sub,
    );

    if (firemanExists) {
      return c.json({ message: 'You have already respond' }, 400);
    }

    const firemanReportGroup = await prisma.fireman_report_group.create({
      data: {
        fireman_id: sub,
        group_id: report.group.id,
      },
    });

    const updateGroup = await prisma.group.update({
      where: { id: report.group.id },
      data: { status: 'process' },
    });

    return c.json({ data: { updateGroup, firemanReportGroup } });
  },
);

const CompletedSchema = z.object({
  report_id: z.number().min(1, 'Group ID is required'),
});

fireman.post(
  '/completed-report',
  zValidator('json', CompletedSchema),
  async (c) => {
    const { report_id } = c.req.valid('json');

    const report = await prisma.report_group_member.findFirst({
      where: { id: report_id },
      include: {
        group: true,
      },
    });

    if (!report || !report.group) {
      return c.notFound(); // or throw an appropriate error
    }

    const updateGroup = await prisma.group.update({
      where: { id: report.group.id },
      data: { status: 'completed' },
    });

    return c.json({ data: updateGroup });
  },
);

const ProfileSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Invalid email address'),
  password: z.string().min(8, 'Password must be at least 8 character long'),
  longitude: z.number().min(-180).max(180),
  latitude: z.number().min(-90).max(90),
});

fireman.post('/profile', zValidator('json', ProfileSchema), async (c) => {
  const { name, email, password, longitude, latitude } = c.req.valid('json');
  const { sub } = c.get('jwtPayload');

  const profile = prisma.fireman.update({
    where: {
      id: sub,
    },
    data: {
      name,
      email,
      password,
      longitude,
      latitude,
    },
  });

  return c.json({ data: profile });
});

fireman.get('/profile', async (c) => {
  const { sub } = c.get('jwtPayload');

  const profile = await prisma.fireman.findUnique({
    where: {
      id: sub,
    },

    omit: {
      password: true, // Exclude password from the response
    },
  });

  if (!profile) {
    return c.notFound();
  }

  return c.json({ data: profile });
});
