import React from 'react';
import SimpleCard from '../molecules/SimpleCard';
import { Degree } from '@/lib/interfaces/degree.interface';
import { getDegreesByFacultyId } from '@/lib/services/degree.service';
import { appRoutes } from '../../../routes';

const Degrees = async ({
  facultyId,
  universitySlug,
}: {
  facultyId: string;
  universitySlug: string;
}) => {
  let degrees: Degree[] = [];

  try {
    const { data } = await getDegreesByFacultyId(facultyId);
    degrees = data.data;
  } catch (error) {
    console.error('Error fetching faculties:', error);
    // Si hay error, mostrar página sin universidades
  }
  return degrees.length > 0 ? (
    <div className="grid grid-cols-[repeat(auto-fill,minmax(200px,1fr))] w-full max-w-3xl mx-auto py-8 gap-4">
      {degrees.map((degree) => (
        <SimpleCard
          key={degree.id}
          name={degree.name}
          detail={degree.slug}
          href={appRoutes.facultades.carreras.detail(
            universitySlug,
            facultyId,
            degree.id
          )}
        />
      ))}
    </div>
  ) : (
    <div className="text-center py-8">
      <p className="text-[#114230] text-lg">
        No se pudieron cargar las carreras en este momento, actualiza la página
      </p>
    </div>
  );
};

export default Degrees;
