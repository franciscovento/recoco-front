import React, { FC, Suspense } from 'react';
import Degrees from '@/ui/templates/Degrees';
import {
  ArrowUpOutlined,
  BookOutlined,
  MessageOutlined,
} from '@ant-design/icons';
import LoginRegisterButton from '@/ui/templates/LoginRegisterButton';
import {
  getFacultiesByUniversityId,
  getFacultyById,
} from '@/lib/services/faculty.service';
import SimpleCard from '@/ui/molecules/SimpleCard';
import { formatText } from '@/lib/helpers/formatText';
import { getDegreesByFacultyId } from '@/lib/services/degree.service';
import { appRoutes } from '../../../../../../routes';
import { getUniversities } from '@/lib/services/university.service';
import Header from '@/ui/organisms/Header';

interface Props {
  params: {
    slug: string;
    faculty_id: string;
  };
}

export async function generateStaticParams() {
  const { data } = await getUniversities();
  const universities = data.data;

  const params: { faculty_id: string; slug: string }[] = [];

  for (const university of universities) {
    const faculties = await getFacultiesByUniversityId(university.slug);
    for (const faculty of faculties.data.data) {
      params.push({
        faculty_id: faculty.id.toString(),
        slug: university.slug,
      });
    }
  }

  return params;
}

const Page: FC<Props> = async ({ params }) => {
  const { data: faculty } = await getFacultyById(params.faculty_id);

  const { data } = await getDegreesByFacultyId(params.faculty_id);
  const degrees = data.data;
  return (
    <>
      <Header
        headerHref={appRoutes.facultades.root(params.slug)}
        headerName={faculty.data.university.name}
      />
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
                  params.slug,
                  params.faculty_id,
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

      {/* Faculty banner */}
      <div className="py-12 bg-app-primary  text-white ">
        <div className="app-wrapper flex flex-col gap-4">
          <div>
            <p className="text-2xl font-bold pb-2">
              ¿No encontrás tu curso en la lista?{' '}
            </p>
            <p className="text-lg">
              ¡No te preocupes! Podés crearlo vos mismo. Todo el contenido de
              esta página es dinámico y colaborativo: cualquier persona puede
              contribuir agregando nuevas carreras y cursos, para que más
              estudiantes puedan pedir y dejar recomendaciones útiles.
            </p>
          </div>
        </div>
      </div>
      {/* Características Section */}
      <section id="caracteristicas" className="py-20 app-wrapper">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Características Principales
            </h2>
            <p className="text-lg text-muted-foreground">
              Todo lo que necesitas para tomar decisiones académicas informadas
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-app-primary text-white rounded-full flex items-center justify-center mb-4">
                <MessageOutlined className="text-[32px]" />
              </div>
              <h3 className="text-xl font-semibold mb-2">
                Comentarios Verificados
              </h3>
              <p className="text-muted-foreground">
                Solo estudiantes reales pueden dejar comentarios sobre los
                cursos que han tomado
              </p>
            </div>

            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-app-primary text-white rounded-full flex items-center justify-center mb-4">
                <ArrowUpOutlined className="text-[32px] " />
              </div>
              <h3 className="text-xl font-semibold mb-2">
                Ranking Inteligente
              </h3>
              <p className="text-muted-foreground">
                Los cursos se ordenan por popularidad y valoraciones positivas
                de estudiantes
              </p>
            </div>

            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-app-primary rounded-full text-white flex items-center justify-center mb-4">
                <BookOutlined className="text-[32px] " />
              </div>
              <h3 className="text-xl font-semibold mb-2">
                Información Completa
              </h3>
              <p className="text-muted-foreground">
                Accede a recursos adicionales, como exámenes pasados y material
                de estudio compartido por otros estudiantes.
              </p>
            </div>
          </div>
        </div>
      </section>
      {/* CTA Section */}
      <section className="py-20 bg-app-primary text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            ¿Listo para ayudar a la comunidad?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Únete a miles de estudiantes que ya usan RECOCO para tomar mejores
            decisiones académicas
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <LoginRegisterButton modalType="register">
              Comenzar ahora
            </LoginRegisterButton>
          </div>
        </div>
      </section>
    </>
  );
};

export default Page;
