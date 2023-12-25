import { getMongoDbUserIdFromClerkUserId } from '@/actions/users';
import { connectDB } from '@/config/db';
import CommentModel from '@/models/commentModel';
import { auth } from '@clerk/nextjs/server';
import { NextRequest, NextResponse } from 'next/server';

connectDB();

export async function POST(request: NextRequest) {
  try {
    const { userId } = auth();
    const reqBody = await request.json();
    reqBody.user = await getMongoDbUserIdFromClerkUserId(userId!);
    await CommentModel.create(reqBody);
    return NextResponse.json({ message: 'Comment added successfully' });
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
