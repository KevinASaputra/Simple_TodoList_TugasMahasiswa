import { signToken } from '@/lib/auth';
import { connectToDb } from '@/lib/mongo';
import User from '@/models/User';
import { LoginRequest } from '@/types/auth';
import bcrypt from 'bcryptjs';
export async function POST(req: Request) {
  await connectToDb();

  const body = (await req.json()) as LoginRequest;

  if (!body.username || !body.password) {
    return Response.json(
      { error: 'Username and password are required' },
      { status: 400 },
    );
  }

  const user = await User.findOne({ username: body.username });
  if (!user) {
    return Response.json({ error: 'User not found' }, { status: 404 });
  }

  const isValid = await bcrypt.compare(body.password, user.password);
  if (!isValid) {
    return Response.json({ error: 'Invalid password' }, { status: 401 });
  }

  const token = signToken({ userId: user._id.toString() });

  return Response.json({
    message: 'Login success',
    token,
    user: {
      id: user._id.toString(),
      username: user.username,
    },
  });
}
