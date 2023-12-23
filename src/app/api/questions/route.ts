import { NextRequest, NextResponse } from 'next/server';
import QuestionModel from '@/models/questionModel';
import { connectDB } from '@/config/db';
import { auth } from '@clerk/nextjs/server';
import { getMongoDbUserIdFromClerkUserId } from '@/actions/users';

connectDB();

export async function POST(request: NextRequest) {
  try {
    const { userId } = auth();
    const reqBody = await request.json();
    reqBody.user = await getMongoDbUserIdFromClerkUserId(userId!);
    await QuestionModel.create(reqBody);
    return NextResponse.json({ message: 'Question created successfully' });
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
