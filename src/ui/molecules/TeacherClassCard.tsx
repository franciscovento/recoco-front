import Image from 'next/image';
import React from 'react';
import clsx from 'clsx';
import SvgDelete from '../atoms/svg/SvgDelete';
import { useDeleteTeacherClassMutation } from '@/store/api/recoco/teacherClassApi';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import { useParams, useRouter } from 'next/navigation';
import { appRoutes } from '../../../routes';
import useConfirm from '@/lib/hooks/modals/useAppNotification';

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
  facultyId: number;
  degreeId: number;
}

const TeacherClassCard = ({
  teacherName,
  totalComments,
  teacherLastName,
  score,
  teacherClassName,
  teacherId,
  facultyId,
  degreeId,
  courseId,
  createdBy,
}: Props) => {
  const router = useRouter();
  const { confirm } = useConfirm();
  const { teacher_id, slug } = useParams();
  const { user } = useSelector((state: RootState) => state.ui);
  const [deleteCourse] = useDeleteTeacherClassMutation();
  const fullName = `${teacherName} ${teacherLastName || ''}`.trim();
  const deleteTeacherClass = async () => {
    confirm({
      title: '¿Estás seguro de eliminar esta clase?',
      content: 'Si eliminas esta clase, no podrás recuperarlo.',
      onOk: async () => {
        try {
          const resp = await deleteCourse({
            course_id: courseId,
            teacher_id: teacherId,
          }).unwrap();
        } catch (error) {
          throw error;
        }
      },
    });
  };
  return (
    <div className="relative">
      <button
        onClick={() =>
          router.replace(
            appRoutes.facultades.carreras.cursos.profesores.detail(
              slug as string,
              facultyId,
              degreeId,
              courseId,
              teacherId
            ) + '#comments'
          )
        }
        className={clsx(
          'p-4 border shadow-app-teacher-class rounded-xl flex  items-center gap-4 cursor-pointer duration-300 hover:border-app-primary hover:border-[1.5px] w-full',
          {
            'border-app-primary border-[1.5px]': +teacher_id === teacherId,
          }
        )}
      >
        <div
          className={clsx(
            'flex-shrink-0 duration-300 bg-app-primary rounded-3xl',
            {
              'w-[5px] h-[50px]': +teacher_id === teacherId,
              'w-[0px] h-[0px]': +teacher_id !== teacherId,
            }
          )}
        ></div>
        <div className="flex-1 pr-14 flex flex-col gap-2">
          <div className="flex flex-wrap items-center gap-4">
            <span className="text-app-primary-dark capitalize text-left">
              {fullName}
            </span>
          </div>

          <div className="text-xs text-app-text text-left">
            Cátedra: {teacherClassName || '---'}
          </div>

          <div className="flex items-center flex-wrap gap-3">
            <Image src={'/svg/comments.svg'} width={63} height={23} alt="" />
            <span className="text-xs text-app-text">
              {totalComments} comentarios
            </span>
          </div>
        </div>
      </button>
      <div className="flex flex-col font-bold text-xl md:text-3xl justify-between py-4 gap-2 items-end text-app-primary absolute right-4 top-0 h-full">
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
