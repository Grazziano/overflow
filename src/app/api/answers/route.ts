import { getMongoDbUserIdFromClerkUserId } from '@/actions/users';
import { connectDB } from '@/config/db';
import AnswerModel from '@/models/answerModel';
import QuestionModel from '@/models/questionModel';
import { auth } from '@clerk/nextjs/server';
import { NextRequest, NextResponse } from 'next/server';

connectDB();

export async function POST(request: NextRequest) {
  try {
    const { userId } = auth();
    const reqBody = await request.json();
    reqBody.user = await getMongoDbUserIdFromClerkUserId(userId!);

    await AnswerModel.create(reqBody);

    // increment totalAnswer count in question
    const question: any = await QuestionModel.findById(reqBody.question);
    question.totalAnswers++;
    await question.save();

    return NextResponse.json({ message: 'Answer posted successfully' });
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
