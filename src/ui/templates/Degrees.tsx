import React from 'react';
import SimpleCard from '../molecules/SimpleCard';
import { Degree } from '@/lib/interfaces/degree.interface';
import { getDegreesByFacultyId } from '@/lib/services/degree.service';
import { appRoutes } from '../../../routes';
import { formatText } from '@/lib/helpers/formatText';

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

  console.log(degrees);

  return (
    <>
      <div className="pt-24">
        <div className="flex flex-col text-center items-center gap-4 app-wrapper">
          <h1 className="text-4xl  font-bold">
            Recomendaciones{' '}
            <span>{formatText(degrees[0]?.faculty?.name || '-')}</span>
          </h1>
          <p className="text-xl">
            Sistema inteligente de recomendaciones para la{' '}
            <span>{formatText(degrees[0]?.faculty?.name || '-')}</span>.
            Descubre qué cursos tomar basándote en experiencias reales de
            estudiantes.
          </p>
        </div>
      </div>

      <div className="app-wrapper flex flex-col gap-4 py-12">
        {degrees.length > 0 ? (
          <div className="grid grid-cols-[repeat(auto-fill,minmax(200px,1fr))] w-full mx-auto gap-4">
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
              No se pudieron cargar las carreras en este momento, actualiza la
              página
            </p>
          </div>
        )}
      </div>
    </>
  );
};

export default Degrees;
