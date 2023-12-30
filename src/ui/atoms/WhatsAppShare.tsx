'use client';
import { RootState } from '@/store/store';
import { useRef } from 'react';
import { useSelector } from 'react-redux';

const WhatsAppShare = () => {
  const { teacherClass } = useSelector(
    (state: RootState) => state.teacherClass
  );
  const ref = useRef<HTMLSpanElement>(null);
  const onMouseEnter = () => {
    ref.current?.classList.remove('hidden', 'animate-app-fade-out');
    ref?.current?.classList.add('animate-app-fade-in');
  };

  const onMouseLeave = () => {
    ref?.current?.classList.remove('animate-app-fade-in');
    ref.current?.classList.add('animate-app-fade-out');
  };

  const onAnimationEnd = () => {
    if (ref.current?.classList.contains('animate-app-fade-out')) {
      ref.current?.classList.add('hidden');
    }
  };

  const shareOnWhatsApp = () => {
    const url = window.location.href;
    const teacherFullName =
      `${teacherClass?.teacher.name} ${teacherClass?.teacher.last_name}`
        .split(' ')
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
    const text = `Hola, ¿tienen algún comentario sobre ${teacherFullName} de ${teacherClass?.course.name}? Los que hayan cursado pueden ayudar escribiendo un comentario en esta página. ¡Gracias!\n`;
    const message = encodeURIComponent(text + url);
    const whatsapp_url = 'https://wa.me/?text=' + message;
    window.open(whatsapp_url, '_blank');
  };

  return (
    <span
      onClick={shareOnWhatsApp}
      onMouseLeave={onMouseLeave}
      onMouseEnter={onMouseEnter}
      className="bg-app-primary w-14 h-14 rounded-full  fixed right-8 bottom-8  flex items-center justify-center "
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="32"
        height="32"
        viewBox="0 0 24 24"
        className="text-black cursor-pointer"
      >
        <path
          fill="currentColor"
          d="M19.05 4.91A9.816 9.816 0 0 0 12.04 2c-5.46 0-9.91 4.45-9.91 9.91c0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21c5.46 0 9.91-4.45 9.91-9.91c0-2.65-1.03-5.14-2.9-7.01m-7.01 15.24c-1.48 0-2.93-.4-4.2-1.15l-.3-.18l-3.12.82l.83-3.04l-.2-.31a8.264 8.264 0 0 1-1.26-4.38c0-4.54 3.7-8.24 8.24-8.24c2.2 0 4.27.86 5.82 2.42a8.183 8.183 0 0 1 2.41 5.83c.02 4.54-3.68 8.23-8.22 8.23m4.52-6.16c-.25-.12-1.47-.72-1.69-.81c-.23-.08-.39-.12-.56.12c-.17.25-.64.81-.78.97c-.14.17-.29.19-.54.06c-.25-.12-1.05-.39-1.99-1.23c-.74-.66-1.23-1.47-1.38-1.72c-.14-.25-.02-.38.11-.51c.11-.11.25-.29.37-.43s.17-.25.25-.41c.08-.17.04-.31-.02-.43s-.56-1.34-.76-1.84c-.2-.48-.41-.42-.56-.43h-.48c-.17 0-.43.06-.66.31c-.22.25-.86.85-.86 2.07c0 1.22.89 2.4 1.01 2.56c.12.17 1.75 2.67 4.23 3.74c.59.26 1.05.41 1.41.52c.59.19 1.13.16 1.56.1c.48-.07 1.47-.6 1.67-1.18c.21-.58.21-1.07.14-1.18s-.22-.16-.47-.28"
        />
      </svg>
      <span
        ref={ref}
        onAnimationEnd={onAnimationEnd}
        className={`absolute hidden app-animation-fill-mode-forwards bg-white px-6 py-1 right-16 top-1/2 -translate-y-1/2 rounded-xl shadow-[0px_1px_4px_0px_rgba(174,_174,_192,_0.30)] text-sm w-48 sm:w-96`}
      >
        Comparte y pide comentarios sobre este profesor
      </span>
    </span>
  );
};

export default WhatsAppShare;
