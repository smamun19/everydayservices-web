import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
import { NextRequest, NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  try {
    const { email, password, name, contactInfo, address } = await req.json();

    const hashedPassword = await bcrypt.hash(password, 10);

    await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        name,
        contactInfo,
        address,
      },
    });

    return NextResponse.json(
      {
        status: true,
        message: 'Sign-up successful',
        statusCode: 201,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error during sign-up:', error);
    console.log('Error during sign-up:', error);

    return NextResponse.json(
      {
        status: false,
        message: error?.message || 'Internal server error',
        statusCode: 500,
      },
      { status: 500 }
    );
  }
}
