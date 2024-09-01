import { getUniversities } from '@/lib/services/university.service';
import SvgRecocoSticker from '@/ui/atoms/svg/branding/SvgRecocoSticker';
import SimpleCard from '@/ui/molecules/SimpleCard';

export default async function Home() {
  const { data } = await getUniversities();
  const universities = data.data;

  return (
    <main className="flex min-h-screen flex-col gap-4 items-center justify-center p-8 bg-app-accent">
      <SvgRecocoSticker />
      <div className="max-w-xl mx-auto text-center flex flex-col gap-8 items-center">
        <h2 className="text-3xl sm:text-5xl font-bold uppercase  text-black bg-white bg-clip-text rounded p-2 inline-block ">
          ¡estás en el lugar correcto!
        </h2>
        <p className="text-[#114230] text-xl italic ">
          Encuentra recomendaciones para tu cursada. Por ahora solo están
          disponibles las siguientes universidades:
        </p>
      </div>
      <div className="grid grid-cols-[repeat(auto-fill,minmax(200px,1fr))] w-full max-w-3xl mx-auto py-8 gap-4">
        {universities.map((university) => (
          <SimpleCard
            key={university.id}
            detail={university.country.name}
            name={university.name}
            href={`/${university.id}/facultades`}
          />
        ))}
      </div>
    </main>
  );
}
