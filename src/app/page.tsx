import SvgRecocoSticker from '@/ui/atoms/svg/branding/SvgRecocoSticker';
import Link from 'next/link';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col gap-4 items-center justify-center  p-8 bg-app-accent">
      <SvgRecocoSticker />
      <div className="max-w-xl mx-auto text-center flex flex-col gap-8 items-center">
        <h2 className="text-3xl sm:text-5xl font-bold uppercase  text-black bg-white bg-clip-text rounded p-2 inline-block ">
          ¡estás en el lugar correcto!
        </h2>
        <p className="text-[#114230] text-xl italic ">
          Encuentra recomendaciones para tu cursada. Por ahora solo está
          disponible la carrera de Sistemas de la Información de la UBA.
        </p>
        <Link href={'/uba/carreras/1'}>
          <button className="w-[273px] h-[60px] rounded-full text-xl bg-white text-app-secondary font-medium">
            Ir a la carrera
          </button>
        </Link>
      </div>
    </main>
  );
}
