import Card from '@/ui/atoms/Card';
import React from 'react';

const page = async ({ params }: { params: { id: string } }) => {
  return (
    <Card className="bg-white h-full">No has seleccionado un profesor</Card>
  );
};

export default page;
