import { getMongoDbUserIdFromClerkUserId } from '@/actions/users';
import { connectDB } from '@/config/db';
import AnswerModel from '@/models/answerModel';
import { auth } from '@clerk/nextjs';
import { NextRequest, NextResponse } from 'next/server';

connectDB();

interface AnswerParams {
  params: {
    answerid: string;
  };
}

export async function PUT(request: NextRequest, { params }: AnswerParams) {
  try {
    const { userId } = auth();
    const reqBody = await request.json();
    reqBody.user = await getMongoDbUserIdFromClerkUserId(userId!);

    await AnswerModel.findByIdAndUpdate(params.answerid, reqBody);

    return NextResponse.json({ message: 'Answer updated successfully' });
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

    await AnswerModel.findByIdAndDelete(params.answerid);
    return NextResponse.json({ message: 'Answer deleted successfully' });
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
