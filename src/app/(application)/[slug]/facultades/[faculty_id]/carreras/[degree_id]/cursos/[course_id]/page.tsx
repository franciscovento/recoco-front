'use client';
import Card from '@/ui/atoms/Card';
import SvgTeacherClassCard from '@/ui/atoms/svg/SvgTeacherClassCard';
import { usePathname } from 'next/navigation';
import React, { useEffect } from 'react';

const Page = () => {
  const pathName = usePathname();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathName]);
  return (
    <Card className="bg-white h-full flex flex-col items-center justify-center">
      <SvgTeacherClassCard />
      <div className="max-w-xl mx-auto text-center flex flex-col gap-4 items-center pt-4">
        <h3 className="text-xl text-app-accent font-medium">
          Selecciona un profesor
        </h3>
        <p className="italic">
          Al parecer aún no has seleccionado ningún profesor. Selecciona a uno
          de la lista de la barra izquierda y te aparecera el detalle aquí.
        </p>
      </div>
    </Card>
  );
};

export default Page;
