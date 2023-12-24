import { NextRequest, NextResponse } from 'next/server';
import QuestionModel from '@/models/questionModel';
import { connectDB } from '@/config/db';
import { auth } from '@clerk/nextjs/server';
import { getMongoDbUserIdFromClerkUserId } from '@/actions/users';

connectDB();

interface QuestionParams {
  params: {
    questionid: string;
  };
}

export async function PUT(request: NextRequest, { params }: QuestionParams) {
  try {
    const { userId } = auth();
    const reqBody = await request.json();
    reqBody.user = await getMongoDbUserIdFromClerkUserId(userId!);

    await QuestionModel.findByIdAndUpdate(params.questionid, reqBody);

    return NextResponse.json({ message: 'Question updated successfully' });
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest, { params }: QuestionParams) {
  try {
    const { userId } = auth();

    if (userId === undefined) {
      throw new Error('User not authenticated');
    }

    await QuestionModel.findByIdAndDelete(params.questionid);
    return NextResponse.json({ message: 'Question deleted successfully' });
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
