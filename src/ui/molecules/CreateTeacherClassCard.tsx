import React from 'react';
import Card from '../atoms/Card';
import Image from 'next/image';

const CreateTeacherClassCard = () => {
  return (
    <Card className="bg-[#FBFBFC] relative h-80 flex  flex-col justify-center gap-12">
      <Image
        className="absolute bottom-5 right-5"
        src={'/svg/recoco-question.svg'}
        width={172}
        height={208}
        alt=""
      />

      <div className="relative">
        <h3 className="text-sm font-medium text-black pb-2">
          No encuentras tu cátedra?
        </h3>
        <p className="max-w-[223px] text-sm text-app-text font-light">
          Cursaste en una catedra que no está en nuestras listas. Ayuda a la
          comunidad Recoco creando una cátedra.
        </p>
      </div>
      <button className="w-[177px] relative p-2 rounded-3xl border border-app-primary text-xs duration-300 hover:bg-app-primary-accent">
        Crear un cátedra
      </button>
    </Card>
  );
};

export default CreateTeacherClassCard;
