import { connectToDb } from '@/lib/mongo';
import User from '@/models/User';
import { RegisterRequest } from '@/types/auth';
import bcrypt from 'bcryptjs';

export async function POST(req: Request) {
  await connectToDb();

  const body = (await req.json()) as RegisterRequest;

  if (!body.username || !body.password) {
    return Response.json(
      { error: 'Username and password are required' },
      { status: 400 },
    );
  }

  const exists = await User.findOne({ username: body.username });
  if (exists) {
    return Response.json({ error: 'User already exists' }, { status: 409 });
  }

  const hashedPassword = await bcrypt.hash(body.password, 10);

  const user = await User.create({
    username: body.username,
    password: hashedPassword,
  });

  return Response.json(
    {
      message: 'User registered successfully',
      user: {
        id: user._id.toString(),
        username: user.username,
      },
    },
    { status: 201 },
  );
}
