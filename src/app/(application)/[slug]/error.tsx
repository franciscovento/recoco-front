'use client'; // Error components must be Client Components

import { useEffect } from 'react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div className="w-full h-[calc(100vh-67px)] flex flex-1 flex-col gap-4 justify-center items-center bg-app-primary-dark">
      <div className="text-white text-6xl"> :{'('} </div>
      <h1 className="text-3xl text-white max-w-[900px] px-4 text-center">
        Ocurrió un error, posiblemente porque usamos sistemas gratuitos que
        duermen el servidor.
      </h1>
      <button
        className="border border-white px-4 py-2 rounded-lg text-white duration-300 hover:bg-white hover:text-app-primary-dark"
        onClick={
          // Attempt to recover by trying to re-render the segment
          () => reset()
        }
      >
        Intentar de nuevo
      </button>
    </div>
  );
}
