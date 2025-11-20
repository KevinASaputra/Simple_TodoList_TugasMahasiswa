import { TokenPayload } from '@/types/auth';
import jwt, { JwtPayload } from 'jsonwebtoken';

export function signToken(payload: { userId: string }): string {
  return jwt.sign(payload, process.env.JWT_SECRET as string, {
    expiresIn: '7d',
  });
}

export function verifyToken(req: Request): TokenPayload | null {
  const header = req.headers.get('authorization');
  if (!header) return null;

  const token = header.split(' ')[1];
  if (!token) return null;

  try {
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET as string,
    ) as JwtPayload;

    if (typeof decoded !== 'object' || !('userId' in decoded)) {
      return null;
    }

    return decoded as TokenPayload;
  } catch {
    return null;
  }
}
