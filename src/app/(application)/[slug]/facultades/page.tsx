import Faculties from '@/ui/templates/Faculties';
import React, { FC, Suspense } from 'react';

interface Props {
  params: {
    slug: string;
  };
}

const Page: FC<Props> = async ({ params }) => {
  return (
    <div className="w-full max-w-3xl mx-auto p-8 gap-4">
      <Suspense fallback={<div>Cargando facultades...</div>}>
        <Faculties universitySlug={params.slug} />
      </Suspense>
    </div>
  );
};

export default Page;
