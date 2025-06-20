import { zValidator } from '@hono/zod-validator';
import bcrypt from 'bcrypt';
import { Hono } from 'hono';
import { sign } from 'hono/jwt';
import { z } from 'zod';

import prisma from '../../../../prisma';

const authApp = new Hono().basePath('/auth');

const RegisterSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Invalid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters long'),
  longitude: z.number().min(-180).max(180),
  latitude: z.number().min(-90).max(90),
  location_name: z.string().min(1, 'Location name is required'),
});

authApp.post('/register', zValidator('json', RegisterSchema), async (c) => {
  const { name, email, password, longitude, latitude, location_name } =
    c.req.valid('json');
  const hashedPassword = await bcrypt.hash(password, 10);

  // Check if user already exists
  const existingUser = await prisma.fireman.findUnique({
    where: { email },
  });

  if (existingUser) {
    return c.json({ message: 'User already exists' }, 409);
  }

  // Create new user
  const user = await prisma.fireman.create({
    data: {
      name,
      email,
      password: hashedPassword,
      longitude,
      latitude,
      location_name,
    },
  });

  c.status(201);
  return c.json({ data: user });
});

const LoginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters long'),
});

authApp.post('/login', zValidator('json', LoginSchema), async (c) => {
  const { email, password } = c.req.valid('json');
  const { JWT_SECRET } = process.env;

  // Find user by email
  const user = await prisma.fireman.findUnique({
    where: { email },
  });

  if (!user || !(await bcrypt.compare(password, user.password))) {
    return c.json({ message: 'Invalid credentials' }, 401);
  }

  // Generate JWT token
  const token = await sign({ sub: user.id }, JWT_SECRET!);

  return c.json({ data: { user, token } });
});

export default authApp;
