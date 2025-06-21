'use client';
import { getCategoryResourceName } from '@/lib/helpers/getCategoryResourceName';
import {
  ResourceCategory,
  TeacherClassResource,
} from '@/lib/interfaces/resources.interface';
import { getTeacherClassResources } from '@/lib/services/teacher-class.service';
import React, { useEffect, useState } from 'react';
import Button from '../atoms/Button';
import { appModal } from '@/lib/services/modal.service';
import CreateResource from './forms/CreateResource';

interface Props {
  teacher_id: number;
  course_id: number;
}
const ResourcesCard = ({ teacher_id, course_id }: Props) => {
  const [resources, setResources] = useState<TeacherClassResource[]>([]);
  const groupedResources = Object.groupBy(
    resources,
    (resource) => resource.category
  );

  const handleAddResource = () => {
    appModal.fire({
      html: <CreateResource teacher_id={teacher_id} course_id={course_id} />,
      width: 600,
    });
  };

  useEffect(() => {
    const getResources = async () => {
      try {
        const response = await getTeacherClassResources(teacher_id, course_id);
        setResources(response.data.data);
      } catch (error) {
        console.log(error);
      }
    };
    getResources();
  }, [course_id, teacher_id]);

  return (
    <div
      style={{
        height: 'calc(100vh - 100px)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        textAlign: 'start',
      }}
    >
      <h1 className="text-2xl font-bold ">Recursos útiles</h1>
      <div className="text-xs text-gray-500">
        Los links son publicados por estudiantes, no podemos garantizar que las
        urls sean seguras.
      </div>
      <div className="py-4 w-full flex flex-col items-start gap-4 h-[calc(100vh-200px)]">
        {Object.keys(groupedResources).map((category) => (
          <div key={category} className="w-full">
            <h2 className="text-base font-bold">
              {getCategoryResourceName(category as ResourceCategory)}
            </h2>
            <div className="flex flex-col gap-2  overflow-y-auto">
              {groupedResources[category as ResourceCategory]?.map(
                (resource) => (
                  <a
                    key={resource.id}
                    href={resource.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-blue-500 underline"
                  >
                    {resource.name}
                  </a>
                )
              )}
            </div>
          </div>
        ))}
      </div>
      <div className="w-full flex items-center justify-center">
        <Button onClick={handleAddResource}>Agregar nuevo recurso</Button>
      </div>
    </div>
  );
};

export default ResourcesCard;
