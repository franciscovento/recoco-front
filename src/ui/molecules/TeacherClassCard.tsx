import Image from 'next/image';
import React from 'react';
import clsx from 'clsx';
import SvgDelete from '../atoms/svg/SvgDelete';
import { confirmModal } from '@/lib/services/modal.service';
import { useDeleteTeacherClassMutation } from '@/store/api/recoco/teacherClassApi';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import Link from 'next/link';
import { useParams } from 'next/navigation';

interface Props {
  isActive?: boolean;
  teacherName: string;
  totalComments: number;
  teacherLastName?: string;
  score?: number | null;
  teacherClassName?: string;
  teacherId: number;
  courseId: number;
  createdBy: string;
}

const TeacherClassCard = ({
  teacherName,
  totalComments,
  teacherLastName,
  score,
  teacherClassName,
  teacherId,
  courseId,
  createdBy,
}: Props) => {
  const { id, teacher_id } = useParams();
  const { user } = useSelector((state: RootState) => state.ui);
  const [deleteCourse] = useDeleteTeacherClassMutation();
  const deleteTeacherClass = async () => {
    const confirm = await confirmModal('¿Estás seguro de eliminar esta clase?');
    if (confirm) {
      try {
        const resp = await deleteCourse({
          course_id: courseId,
          teacher_id: teacherId,
        }).unwrap();
        console.log(resp);
      } catch (error) {
        throw error;
      }
    }
  };
  return (
    <Link
      href={`/teacher-class/${id}/teacher/${teacherId}`}
      className={clsx(
        'p-4 border shadow-app-teacher-class rounded-xl flex flex-wrap items-center gap-4 cursor-pointer duration-300 hover:border-app-primary hover:border-[1.5px]',
        {
          'border-app-primary border-[1.5px]': +teacher_id === teacherId,
        }
      )}
    >
      <div className="w-[5px] h-[50px] bg-app-primary rounded-3xl"></div>
      <div>
        <div className="flex flex-wrap items-center gap-4 pb-2">
          <h3 className="text-app-primary-dark">
            {teacherName} {teacherLastName}
          </h3>
          <span className="block w-2 h-2 bg-app-text rounded-full"></span>
          <span className="text-xs text-app-text">{teacherClassName}</span>
        </div>
        <div className="flex items-center gap-3">
          <Image src={'/svg/comments.svg'} width={63} height={23} alt="" />
          <span className="text-xs text-app-text">
            {totalComments} comentarios
          </span>
        </div>
      </div>
      <div className="flex-1 flex items-end self-end font-bold text-3xl text-app-primary justify-end">
        {score
          ? (Math.round(score * 100) / 100).toFixed(1)
          : createdBy === user?.id && (
              <button className="relative" onClick={deleteTeacherClass}>
                <SvgDelete />
              </button>
            )}
      </div>
    </Link>
  );
};

export default TeacherClassCard;
