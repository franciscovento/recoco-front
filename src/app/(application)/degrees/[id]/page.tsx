import Button from '@/ui/atoms/Button';
import SvgRecocoThinking from '@/ui/atoms/svg/branding/SvgRecocoThinking';
import CourseCard from '@/ui/molecules/CourseCard';
import CreateCourse from '@/ui/organisms/forms/CreateCourse';
import React from 'react';

const page = () => {
  return (
    <div className="flex flex-col sm:flex-row min-h-screen">
      <div className="hidden md:block w-[460px] max-w-full bg-[url(/images/shared/recoco-side.png)] h-screen bg-cover"></div>
      <div className="flex-1 h-screen flex flex-col gap-4 items-center p-4 pt-12 max-w-[900px] mx-auto w-full">
        <SvgRecocoThinking />
        <h2 className="text-xl font-medium">Hola, qué materia buscas?</h2>
        <label className="relative w-full">
          <input
            type="text"
            className="w-full bg-[#FBFBFC] rounded-3xl p-[11px] outline-none text-app-text italic"
            placeholder="Escribe el nombre de la materia"
          />
          <Button
            variant="outline"
            className="w-[114px] h-[31px] flex items-center gap-2 justify-center absolute top-1/2 -translate-y-1/2 right-4"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="22"
              height="22"
              viewBox="0 0 22 22"
              fill="none"
            >
              <path
                d="M17.9667 19.25L12.1917 13.475C11.7333 13.8417 11.2063 14.1319 10.6104 14.3458C10.0146 14.5597 9.38056 14.6667 8.70833 14.6667C7.04306 14.6667 5.63383 14.0898 4.48067 12.936C3.3275 11.7822 2.75061 10.373 2.75 8.70833C2.75 7.04306 3.32689 5.63383 4.48067 4.48067C5.63444 3.3275 7.04367 2.75061 8.70833 2.75C10.3736 2.75 11.7831 3.32689 12.9369 4.48067C14.0907 5.63444 14.6673 7.04367 14.6667 8.70833C14.6667 9.38056 14.5597 10.0146 14.3458 10.6104C14.1319 11.2063 13.8417 11.7333 13.475 12.1917L19.25 17.9667L17.9667 19.25ZM8.70833 12.8333C9.85417 12.8333 10.8283 12.4324 11.6307 11.6307C12.4331 10.8289 12.8339 9.85478 12.8333 8.70833C12.8333 7.5625 12.4324 6.58869 11.6307 5.78692C10.8289 4.98514 9.85478 4.58394 8.70833 4.58333C7.5625 4.58333 6.58869 4.98453 5.78692 5.78692C4.98514 6.58931 4.58394 7.56311 4.58333 8.70833C4.58333 9.85417 4.98453 10.8283 5.78692 11.6307C6.58931 12.4331 7.56311 12.8339 8.70833 12.8333Z"
                fill="black"
              />
            </svg>
            Buscar
          </Button>
        </label>
        <div className="w-full py-8">
          <CourseCard
            courseName="Historia Económica y Social Argentina"
            teacherClasses={4}
            classCode="249"
            totalComments={20}
          />
        </div>

        <CreateCourse />
      </div>
    </div>
  );
};

export default page;
