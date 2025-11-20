import { verifyToken } from '@/lib/auth';
import { connectToDb } from '@/lib/mongo';
import Task from '@/models/Task';

export async function POST(req: Request) {
  await connectToDb();

  const payload = verifyToken(req);
  if (!payload) {
    return Response.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const body = await req.json();

  const task = await Task.create({
    ...body,
    userId: payload.userId,
  });

  return Response.json(task);
}

export async function GET(req: Request) {
  await connectToDb();

  const payload = verifyToken(req);
  if (!payload) {
    return Response.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const tasks = await Task.find({ userId: payload.userId });

  const now = new Date();

  const updated = tasks.map((task) => {
    let status = task.status;

    if (status !== 'passed') {
      status = now > task.deadline ? 'overdue' : 'ongoing';
    }

    return {
      ...task.toObject(),
      status,
    };
  });

  return Response.json(updated);
}
