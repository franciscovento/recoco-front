import React, { FC } from 'react';

interface Props {
  params: {
    slug: string;
  };
}
const Page: FC<Props> = ({ params }) => {
  return <div>Pagina de carreras de la universidad {params.slug}</div>;
};

export default Page;
