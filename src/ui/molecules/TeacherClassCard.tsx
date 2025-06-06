import Image from 'next/image';
import React from 'react';
import clsx from 'clsx';
import SvgDelete from '../atoms/svg/SvgDelete';
import { confirmModal } from '@/lib/services/modal.service';
import { useDeleteTeacherClassMutation } from '@/store/api/recoco/teacherClassApi';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { routes } from '../../../routes';

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
  const router = useRouter();
  const { teacher_id, slug } = useParams();
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
    <div className="relative">
      <button
        onClick={() =>
          router.replace(
            routes.courses.teacher.teacher_id(
              slug as string,
              courseId.toString(),
              teacherId.toString() + '#comments'
            )
          )
        }
        // href={routes.courses.teacher.teacher_id(
        //   slug as string,
        //   courseId.toString(),
        //   teacherId.toString() + '#comments'
        // )}
        className={clsx(
          'p-4 border shadow-app-teacher-class rounded-xl flex  items-center gap-4 cursor-pointer duration-300 hover:border-app-primary hover:border-[1.5px] w-full',
          {
            'border-app-primary border-[1.5px]': +teacher_id === teacherId,
          }
        )}
      >
        <div className="w-[5px] h-[50px] bg-app-primary rounded-3xl"></div>
        <div>
          <div className="flex flex-wrap items-center gap-4 pb-2">
            <span className="text-app-primary-dark capitalize">
              {teacherName} {teacherLastName}
            </span>
            <span className="block w-2 h-2 bg-app-text rounded-full"></span>
            <span className="text-xs text-app-text">{teacherClassName}</span>
          </div>
          <div className="flex items-center flex-wrap gap-3">
            <Image src={'/svg/comments.svg'} width={63} height={23} alt="" />
            <span className="text-xs text-app-text">
              {totalComments} comentarios
            </span>
          </div>
        </div>
      </button>
      <div className="flex flex-col font-bold text-3xl justify-between py-4 gap-2 items-end text-app-primary absolute right-4 top-0 h-full">
        {score
          ? (Math.round(score * 100) / 100).toFixed(1)
          : createdBy === user?.id && (
              <button className="relative" onClick={deleteTeacherClass}>
                <SvgDelete />
              </button>
            )}
      </div>
    </div>
  );
};

export default TeacherClassCard;
