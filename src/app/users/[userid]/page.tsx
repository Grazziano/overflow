import React from 'react';
import { connectDB } from '@/config/db';
import UserModel from '@/models/userModel';
import QuestionModel from '@/models/questionModel';
import Image from 'next/image';
import { dateTimeFormat } from '@/helpers/date-time-formats';
import QuestionCard from '@/components/QuestionCard';
import { IQuestion } from '@/interfaces';

connectDB();

interface UserInfoProps {
  params: {
    userid: string;
  };
}

export default async function UserInfo({ params }: UserInfoProps) {
  const userData: any = await UserModel.findById(params.userid);
  const questions: IQuestion[] = await QuestionModel.find({
    user: params.userid,
  });

  return (
    <div>
      <div className="bg-gray-100 p-5 flex gap-5 items-center">
        <Image
          src={userData?.profilePicUrl}
          height={70}
          width={70}
          alt={userData?.name}
          className="rounded-full"
        />

        <div className="flex flex-col">
          <h1 className="text-primary text-xl uppercase font-semibold">
            {userData?.name}
          </h1>
          <p className="text-gray-600 text-sm">{userData?.email}</p>
          {/* <p className="text-gray-600 text-sm">
            Added On {dateTimeFormat(userData?.createdAt)}
          </p> */}
          <p className="text-gray-600 text-sm">
            {questions.length} Questions Asked
          </p>
        </div>
      </div>

      <h1 className="mt-5">
        Questions asked by {userData.name} ({questions.length})
      </h1>

      <div className="mt-5">
        <div className="flex flex-col gap-5 mt-5">
          {questions.map((question) => (
            <QuestionCard
              key={question._id}
              question={JSON.parse(JSON.stringify(question))}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
