import Card from '@/ui/atoms/Card';
import CourseTag from '@/ui/atoms/CourseTag';
import TeacherClassCard from '@/ui/molecules/TeacherClassCard';
import Image from 'next/image';
import React from 'react';

const page = () => {
  return (
    <main className="flex flex-col lg:flex-row min-h-screen gap-8">
      <div className="w-full lg:w-[450px] flex flex-col gap-8">
        <Card className="bg-[#FBFBFC]">
          <div className="flex gap-8">
            <CourseTag tag="EC" />
            <div>
              <h3 className="">Administración General</h3>
              <span className="text-xs text-app-text">Carga Horaria: 4hs</span>
            </div>
          </div>
          <div className="py-6 flex flex-col gap-3">
            <TeacherClassCard isActive />
            <TeacherClassCard />
            <TeacherClassCard />
          </div>
        </Card>
        <Card className="bg-[#FBFBFC] relative h-80 flex  flex-col justify-center gap-12">
          <Image
            className="absolute bottom-5 right-5"
            src={'/svg/recoco-question.svg'}
            width={172}
            height={208}
            alt=""
          />

          <div>
            <h3 className="text-sm font-medium text-black pb-2">
              No encuentras tu cátedra?
            </h3>
            <p className="max-w-[223px] text-sm text-app-text font-light">
              Cursaste en una catedra que no está en nuestras listas. Ayuda a la
              comunidad Recoco creando una cátedra.
            </p>
          </div>
          <button className="w-[177px] p-2 rounded-3xl border border-app-primary text-xs duration-300 hover:bg-app-primary-accent">
            Crear un cátedra
          </button>
        </Card>
      </div>
      <div className="flex-1">
        <Card className="bg-white h-full">Contenido 2</Card>
      </div>
    </main>
  );
};

export default page;
