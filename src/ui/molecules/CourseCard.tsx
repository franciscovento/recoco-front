import Image from 'next/image';
import React from 'react';
import clsx from 'clsx';
import { useDeleteDegreeCourseMutation } from '@/store/api/recoco/degreeApi';
import SvgDelete from '../atoms/svg/SvgDelete';
import { confirmModal } from '@/lib/services/modal.service';
import Link from 'next/link';
import { routes } from '../../../routes';

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

  const handleDelete = async () => {
    try {
      const confirm = await confirmModal(
        '¿Estás seguro que deseas eliminar esta materia?',
        'Esta acción no se puede deshacer'
      );
      if (confirm) {
        const course = await deleteCourse({
          degree_id: degreeId,
          course_id: courseId,
        }).unwrap();
        console.log(course);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div
      className={clsx(
        'p-4 border shadow-app-teacher-class rounded-xl flex  items-center gap-4 duration-300 hover:border-app-primary hover:border-[1.5px] bg-white',
        {
          'border-app-primary border-[1.5px]': isActive === true,
        }
      )}
    >
      <div className=" bg-app-primary rounded-lg w-[50px] h-[50px] text-white flex items-center justify-center text-xl font-bold">
        {classCode}
      </div>
      <div>
        <div className="flex items-center flex-wrap gap-4 pb-2">
          <h3 className="text-app-primary-dark capitalize duration-300 hover:underline">
            <Link
              href={routes.courses.course_id(universityId, courseId.toString())}
            >
              {courseName}
            </Link>
          </h3>
          <span className="block w-2 h-2 bg-app-text rounded-full"></span>
          <span className="text-xs text-app-text">
            {teacherClasses} Cátedras
          </span>
        </div>
        <div className="flex items-center gap-3">
          <Image src={'/svg/comments.svg'} width={63} height={23} alt="" />
        </div>
      </div>
      {canDelete && (
        <div className="flex-1 flex justify-end">
          <button onClick={handleDelete}>
            <SvgDelete />
          </button>
        </div>
      )}
    </div>
  );
};

export default CourseCard;
