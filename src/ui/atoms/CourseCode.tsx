import React from 'react';

interface Props {
  classCode: string;
}
const CourseCode = ({ classCode }: Props) => {
  return (
    <div className=" bg-app-primary rounded-lg w-[50px] h-[50px] text-white flex items-center justify-center text-lg font-bold">
      {classCode}
    </div>
  );
};

export default CourseCode;
