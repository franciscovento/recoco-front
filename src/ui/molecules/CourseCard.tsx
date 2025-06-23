import Image from 'next/image';
import React from 'react';
import clsx from 'clsx';
import { useDeleteDegreeCourseMutation } from '@/store/api/recoco/degreeApi';
import SvgDelete from '../atoms/svg/SvgDelete';
import { confirmModal } from '@/lib/services/modal.service';
import Link from 'next/link';
import { routes } from '../../../routes';
import CourseCode from '../atoms/CourseCode';
import { formatText } from '@/lib/helpers/formatText';
import useConfirm from '@/lib/hooks/modals/useAppNotification';

interface Props {
  isActive?: boolean;
  courseName: string;
  teacherClasses: number;
  classCode: string;
  courseId: number;
  canDelete: boolean;
  degreeId: number;
  universityId: string;
}

const CourseCard = ({
  courseId,
  isActive = false,
  teacherClasses,
  courseName,
  classCode,
  canDelete = false,
  degreeId,
  universityId,
}: Props) => {
  const [deleteCourse] = useDeleteDegreeCourseMutation();
  const { confirm } = useConfirm();

  const handleDelete = async () => {
    confirm({
      title: '¿Estás seguro que deseas eliminar esta materia?',
      content: 'Esta acción no se puede deshacer',
      onOk: async () => {
        try {
          await deleteCourse({
            degree_id: degreeId,
            course_id: courseId,
          }).unwrap();
        } catch (error) {
          throw error;
        }
      },
    });
  };
  return (
    <div className="relative">
      <Link
        className={clsx(
          'p-4 pr-14 border shadow-app-teacher-class rounded-xl flex  items-center gap-4 duration-300 hover:border-app-primary hover:border-[1.5px] bg-white',
          {
            'border-app-primary border-[1.5px]': isActive === true,
          }
        )}
        href={routes.courses.course_id(universityId, courseId.toString())}
      >
        <CourseCode classCode={classCode} />
        <div>
          <div className="flex flex-col lg:flex-row lg:items-center gap-2 lg:gap-4 pb-2 ">
            <h3 className="flex-1 text-app-primary-dark duration-300">
              {formatText(courseName)}
            </h3>
            <span className="hidden lg:block w-2 h-2 bg-app-text rounded-full"></span>
            <span className="text-xs text-app-text">
              {teacherClasses} Cátedras
            </span>
          </div>
          <div className="flex items-center gap-3">
            <Image src={'/svg/comments.svg'} width={63} height={23} alt="" />
          </div>
        </div>
      </Link>
      {teacherClasses === 0 && canDelete && (
        <div className="flex-1 flex justify-end absolute right-4 top-1/2 -translate-y-1/2">
          <button onClick={handleDelete}>
            <SvgDelete />
          </button>
        </div>
      )}
    </div>
  );
};

export default CourseCard;
