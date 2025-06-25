import React from 'react';
import SimpleCard from '../molecules/SimpleCard';
import { Faculty } from '@/lib/interfaces/faculty.interface';
import { getFacultiesByUniversityId } from '@/lib/services/faculty.service';

const Faculties = async ({ universitySlug }: { universitySlug: string }) => {
  let faculties: Faculty[] = [];

  try {
    const { data } = await getFacultiesByUniversityId(universitySlug);
    faculties = data.data;
  } catch (error) {
    console.error('Error fetching faculties:', error);
    // Si hay error, mostrar página sin universidades
  }
  return faculties.length > 0 ? (
    <div className="grid grid-cols-[repeat(auto-fill,minmax(200px,1fr))] w-full max-w-3xl mx-auto py-8 gap-4">
      {faculties.map((faculty) => (
        <SimpleCard
          key={faculty.id}
          name={faculty.name}
          detail={faculty.slug}
          href={`/${universitySlug}/facultades/${faculty.id}`}
        />
      ))}
    </div>
  ) : (
    <div className="text-center py-8">
      <p className="text-[#114230] text-lg">
        No se pudieron cargar las facultades en este momento, actualiza la
        página
      </p>
    </div>
  );
};

export default Faculties;
