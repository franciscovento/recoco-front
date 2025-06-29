import { University } from '@/lib/interfaces/university.interface';
import { getUniversities } from '@/lib/services/university.service';
import React from 'react';
import SimpleCard from '../molecules/SimpleCard';
import { appRoutes } from '../../../routes';

const Universities = async () => {
  let universities: University[] = [];

  try {
    const { data } = await getUniversities();
    universities = data.data;
  } catch (error) {
    console.error('Error fetching universities:', error);
    // Si hay error, mostrar página sin universidades
  }
  return universities.length > 0 ? (
    <div className="grid grid-cols-[repeat(auto-fill,minmax(200px,1fr))] w-full max-w-3xl mx-auto py-8 gap-4">
      {universities.map((university) => (
        <SimpleCard
          key={university.id}
          detail={university.country.name}
          name={university.name}
          href={appRoutes.facultades.root(university.slug)}
        />
      ))}
    </div>
  ) : (
    <div className="text-center py-8">
      <p className="text-[#114230] text-lg">
        No se pudieron cargar las universidades en este momento, actualiza la
        página
      </p>
    </div>
  );
};

export default Universities;
