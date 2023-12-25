import { getMongoDbUserIdFromClerkUserId } from '@/actions/users';
import { connectDB } from '@/config/db';
import CommentModel from '@/models/commentModel';
import { auth } from '@clerk/nextjs';
import { NextRequest, NextResponse } from 'next/server';

connectDB();

interface AnswerParams {
  params: {
    commentid: string;
  };
}

export async function PUT(request: NextRequest, { params }: AnswerParams) {
  try {
    const { userId } = auth();
    const reqBody = await request.json();
    reqBody.user = await getMongoDbUserIdFromClerkUserId(userId!);

    await CommentModel.findByIdAndUpdate(params.commentid, reqBody);

    return NextResponse.json({ message: 'Comment updated successfully' });
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest, { params }: AnswerParams) {
  try {
    const { userId } = auth();

    if (userId === undefined) {
      throw new Error('User not authenticated');
    }

    await CommentModel.findByIdAndDelete(params.commentid);

    return NextResponse.json({ message: 'Comment deleted successfully' });
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
