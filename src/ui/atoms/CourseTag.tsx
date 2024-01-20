import React from 'react';

interface Props {
  tag: string;
}
const CourseTag = ({ tag }: Props) => {
  return (
    <span className="w-12 h-12 rounded-lg bg-app-primary text-lg flex items-center justify-center uppercase text-white font-semibold">
      {tag}
    </span>
  );
};

export default CourseTag;
