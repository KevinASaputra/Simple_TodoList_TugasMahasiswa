import { verifyToken } from '@/lib/auth';
import { connectToDb } from '@/lib/mongo';
import Task from '@/models/Task';

export async function PUT(
  req: Request,
  { params }: { params: { id: string } },
) {
  await connectToDb();

  const payload = verifyToken(req);
  if (!payload) {
    return Response.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const body = await req.json();

  const task = await Task.findOneAndUpdate(
    { _id: params.id, userId: payload.userId },
    body,
    { new: true },
  );

  return Response.json(task);
}

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } },
) {
  await connectToDb();

  const payload = verifyToken(req);
  if (!payload) {
    return Response.json({ error: 'Unauthorized' }, { status: 401 });
  }

  await Task.findOneAndDelete({ _id: params.id, userId: payload.userId });

  return Response.json({ message: 'Task deleted' });
}
