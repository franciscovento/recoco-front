import React, { FC, Suspense } from 'react';
import Degrees from '@/ui/templates/Degrees';

interface Props {
  params: {
    slug: string;
    faculty_id: string;
  };
}
const Page: FC<Props> = async ({ params }) => {
  return (
    <div className="w-full max-w-3xl mx-auto p-8 gap-4">
      <Suspense fallback={<div>Cargando carreras...</div>}>
        <Degrees facultyId={params.faculty_id} universitySlug={params.slug} />
      </Suspense>
    </div>
  );
};

export default Page;
