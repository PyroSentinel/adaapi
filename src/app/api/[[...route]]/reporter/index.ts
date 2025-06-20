import prisma from '@db';
import { zValidator } from '@hono/zod-validator';
import { findNearestGroup } from '@sql';
import { Hono } from 'hono';
import { z } from 'zod';

export const reporter = new Hono().basePath('/reports');

reporter.get('/', async (c) => {
  const report = await prisma.report_group_member.findMany({
    select: {
      id: true,
      validation: true,
      report: true,
      group: {
        select: {
          id: true,
          status: true,
          report_id: true,
          created_at: true,
          updated_at: true,
          fireman_report_group: {
            select: {
              created_at: true,
              updated_at: true,
              fireman: true,
            },
          },
        },
      },
    },
  });

  return report.length === 0 ? c.notFound() : c.json({ data: report });
});

reporter.get('/:id', async (c) => {
  const id = c.req.param('id');
  const report = await prisma.report_group_member.findFirst({
    select: {
      id: true,
      validation: true,
      report: true,
      group: {
        select: {
          id: true,
          status: true,
          report_id: true,
          created_at: true,
          updated_at: true,
          fireman_report_group: {
            select: {
              created_at: true,
              updated_at: true,
              fireman: true,
            },
          },
        },
      },
    },
    where: {
      id: Number(id),
    },
  });

  return report ? c.json({ data: report }) : c.notFound();
});

const ReportSchema = z.object({
  media_url: z.string().url(),
  type: z.enum(['video', 'image']),
  email: z.string().optional(),
  longitude: z.number().min(-180).max(180),
  latitude: z.number().min(-90).max(90),
  description: z.string(),
  is_anonymous: z.boolean().default(false),
  is_secret: z.boolean().default(false),
  verified: z.boolean(),
  accuracy: z.number().min(0).max(100),
  location_name: z.string().min(1, 'Location name is required'),
});

reporter.post('/', zValidator('json', ReportSchema), async (c) => {
  const {
    media_url,
    type,
    email = null, // mark email as optional, default to null if undefined
    longitude,
    latitude,
    location_name,
    description,
    is_anonymous,
    is_secret,
    verified,
    accuracy,
  } = c.req.valid('json');
  let group_id = null;

  const report = await prisma.report.create({
    data: {
      media_url,
      type,
      email,
      longitude,
      latitude,
      location_name,
      description,
      is_anonymous,
      is_secret,
    },
  });

  const validation = await prisma.validation.create({
    data: {
      verified,
      accuracy,
    },
  });

  const nearestGroup = await prisma.$queryRawTyped(
    findNearestGroup(latitude, longitude),
  );

  if (nearestGroup.length == 0) {
    const group = await prisma.group.create({
      data: {
        report_id: report.id,
        status: 'process',
      },
    });

    group_id = group.id;
  } else {
    group_id = nearestGroup[0].id;
  }

  const report_group = await prisma.report_group_member.create({
    data: {
      validation_id: validation.id,
      report_id: report.id,
      group_id,
    },
    include: {
      group: true,
      report: true,
      validation: true,
    },
  });

  c.status(201);
  return c.json({ data: report_group });
});
