import { Hono } from 'hono';
import { type JwtVariables } from 'hono/jwt';
import { handle } from 'hono/vercel';

import auth from './auth';
import { fireman } from './fireman';
import { reporter } from './reporter';

type Variables = JwtVariables;

const app = new Hono<{
  Variables: Variables;
}>().basePath('/api');

app.route('/', reporter);
app.route('/', fireman);
app.route('/', auth);

export const GET = handle(app);
export const POST = handle(app);
export const PUT = handle(app);
export const DELETE = handle(app);
