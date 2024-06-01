"use client";
import React, { useState } from "react";
import {
  Dropdown,
  MultiChoiceQuestion,
  WritingQuestion,
  YesNoQuestion,
} from "@/components";
import { ButtonIcon, InputData } from "@/components/atoms";
import Image from "next/image";
import DeleteButton from "@/components/molechules/Delete/deleteButton";

interface QuestionFormProps {
  question?: any;
  removeQuestion: () => void;
  onQuestionChange: (
    updatedQuestionText: string,
    updatedAnswer: any,
    questionId: string,
    QAtype: string
  ) => void;
  index?: number;
}

const QuestionForm: React.FC<QuestionFormProps> = ({
  onQuestionChange,
  question,
  removeQuestion,
  index,
}) => {
  const [QAType, setQAType] = useState("Writing Answer");

  const handleAnswerChange = (updatedAnswer: any) => {
    onQuestionChange(question.question, updatedAnswer, QAType, question.id);
  };
  const handleSelectType = (selectedOption: any) => {
    setQAType(selectedOption);
  };

  const handleQuestionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onQuestionChange(event.target.value, question.answer, QAType, question.id);
    console.log(QAType);
  };

  return (
    <div className="w-full bg-white  rounded-lg">
      <div className="flex md:flex-row flex-col justify-between items-center gap-x-3">
        <InputData
          type="text"
          placeholder="Question"
          className="!md:w-[547px] h-[50px] w-full  px-6 py-4 border-gray-300 lg:w-[900px] lg:py-2 border-b focus:outline-none focus:border-blue-500 bg-white"
          onChange={handleQuestionChange}
        />

        <Dropdown
          options={["Writing Answer", "Multi Choice", "Yes/No"]}
          classname="w-[30%] h-[50px] bg-white rounded-lg z-50"
          placeholder="Type of Answer"
          onChange={handleSelectType}
        />
        <ButtonIcon
          onclick={removeQuestion}
          icon={
            <Image
              src={"assets/icons/trash.svg"}
              width={36.5}
              height={37.5}
              alt="trash icon"
            />
          }
        />
        
      </div>

      {QAType === "Writing Answer" ? (
        <WritingQuestion />
      ) : QAType === "Multi Choice" ? (
        <MultiChoiceQuestion
          onchange={(options) => handleAnswerChange(options)}
        />
      ) : QAType === "Yes/No" ? (
        <YesNoQuestion />
      ) : (
        <></>
      )}
    </div>
  );
};

export default QuestionForm;
