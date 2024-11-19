import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { NextRequest, NextResponse } from 'next/server';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  try {
    const { identifier, password } = await req.json();

    const user = await prisma.user.findUniqueOrThrow({ where: { email: identifier } });

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return NextResponse.json(
        {
          status: false,
          message: 'Invalid credentials',
          statusCode: 401,
        },
        { status: 401 }
      );
    }

    const token = jwt.sign({ userId: user.id, email: user.email, roles: user.roles }, JWT_SECRET, { expiresIn: '1h' });

    return NextResponse.json(
      {
        status: true,
        message: 'Sign-in successful',
        statusCode: 200,
        result: {
          token,
          ...user,
          deletedAt: undefined,
          password: undefined,
        },
      },
      { status: 200 }
    );
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : error;
    return NextResponse.json(
      {
        status: false,
        message: errorMessage || 'Internal server error',
        statusCode: 500,
      },
      { status: 500 }
    );
  }
}
