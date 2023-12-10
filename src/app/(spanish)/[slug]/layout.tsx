import { getUniversityBySlug } from '@/lib/services/university.service';

export default async function ApplicationLayout({
  children, // will be a page or nested layout
  params,
}: {
  children: React.ReactNode;
  params: any;
}) {
  await getUniversityBySlug(params.slug);
  return <>{children}</>;
}
