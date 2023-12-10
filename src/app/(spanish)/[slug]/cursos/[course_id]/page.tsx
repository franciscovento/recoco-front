import { getUniversityBySlug } from '@/lib/services/university.service';
import Card from '@/ui/atoms/Card';
import React from 'react';

const Page = async () => {
  return (
    <Card className="bg-white h-full">No has seleccionado un profesor</Card>
  );
};

export default Page;
