import sendMail from '@/lib/sendMail';
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

  const fireman = await prisma.fireman.findMany({});

  const toFireman = fireman.map((f) => `${f.name} <${f.email}>`).join(',');

  const mailOptions = {
    from: `AdaApi <${process.env.SMTP_EMAIL_USER}>`,
    to: toFireman,
    subject: 'Fire Notification',
    html: `
  <div style="font-family: 'Roboto', sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #ffa200; border-radius: 12px; background-color: #fff8f6; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);">
    <div style="text-align: center; margin-bottom:40px;">
      <img src="https://ik.imagekit.io/aipproject/ADAAPI.png" alt="AdaApi Logo" style="height: 50px; margin-bottom: 35px;" />
    <br>
      <h1 style="font-family: 'Gill Sans', 'Gill Sans MT'; color: #ffa200; font-size: 24px; margin: 0; border: 2px solid #ffa200; display: inline-block; padding: 5px 10px; border-radius: 6px;">Fire Notification</h1>
    </div>
      <p style="color: #410002">${description}</p>
    <div style="text-align: center; margin: 20px 0;">
      <p style="color: #410002 ;font-weight: bold;">Terdeteksi kebakaran disini:</p>
      <a href="https://www.google.com/maps/search/?api=1&query=${latitude},${longitude}" style="display: inline-block; padding: 10px 20px; font-size: 16px; color: #fff8f6; background-color: #ffa200; text-decoration: none; border-radius: 5px;">
      <span style="vertical-align: middle;">Cek Lokasi</span>
      </a>
    </div>
    <hr style="border: none; border-top: 1px solid #ffa200; margin: 20px 0;" />
    <p style="font-family: 'Gill Sans', 'Gill Sans MT'; color: #53433f; text-align: center; font-size: 14px;">Terima kasih,<br>Tim Support AdaApi</p>
    <div style="font-family: 'Gill Sans', 'Gill Sans MT'; text-align: center; margin-top: 20px; color: #afa8a6; font-size: 12px;">
    &copy; 2025 AdaApi
    </div>
  </div>
`,
  };

  await sendMail.sendMail(mailOptions);

  const nearestGroup = await prisma.$queryRawTyped(
    findNearestGroup(latitude, longitude),
  );

  if (nearestGroup.length == 0) {
    const group = await prisma.group.create({
      data: {
        report_id: report.id,
        status: 'pending',
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
