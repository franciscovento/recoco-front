'use client';
import { failedNotification } from '@/lib/services/notification.service';
import { useResetPasswordMutation } from '@/store/api/recoco/authApi';
import Button from '@/ui/atoms/Button';
import Logo from '@/ui/atoms/svg/branding/Logo';
import SvgRecocoThinking from '@/ui/atoms/svg/branding/SvgRecocoThinking';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import React, { useState } from 'react';

const inputClass =
  'px-3 py-2 border-2 border-app-border rounded-xl outline-none w-full text-sm  duration-300';
const page = () => {
  const searchParams = useSearchParams();
  const code = searchParams.get('code') || '';
  const [resetPassword] = useResetPasswordMutation();
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState('');

  const [confirmPassword, setConfirmPassword] = useState('');
  const [isSended, setIsSended] = useState(false);

  const sendChanguePassword = async () => {
    try {
      await resetPassword({ code, password }).unwrap();
      setIsSended(true);
    } catch (error) {
      failedNotification('No se pudo cambiar la contraseña, intenta de nuevo.');
      console.log(error);
    }
  };

  const passwordMatch = password != '' ? password === confirmPassword : false;

  return (
    <div className="flex flex-col sm:flex-row h-screen overflow-hidden">
      <Link href={'/'} className="fixed left-4">
        <Logo width={150} height={90} />
      </Link>
      <div className="hidden md:flex w-[460px] max-w-full bg-[url(/images/shared/recoco-side.png)] h-screen bg-cover p-8">
        <div className="pt-40">
          <p className="text-black">No te olvides esta vez</p>
          <h1 className="uppercase text-2xl font-semibold text-black ">
            Cambia tu <br /> contraseña
          </h1>
        </div>
      </div>
      <div className=" px-4 py-12  w-full overflow-y-auto h-full">
        <div className="flex-1 flex flex-col gap-4 items-center h-full justify-center max-w-[500px] mx-auto">
          <SvgRecocoThinking />
          {!isSended ? (
            <>
              <h2 className="text-xl font-medium">
                Escribe tu nueva contraseña
              </h2>
              <span className="text-xs">
                Recuerda que ambas contraseñas deben coincidir para poder
                cambiarla.{' '}
              </span>
              <label className="relative w-full">
                <input
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  type={showPassword ? 'text' : 'password'}
                  className={inputClass}
                  placeholder="Tu nueva contraseña"
                />
              </label>
              <label className="relative w-full">
                <input
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  type={showPassword ? 'text' : 'password'}
                  className={inputClass}
                  placeholder="Repite tu nueva contraseña"
                />
              </label>
              <Button
                disabled={!passwordMatch}
                onClick={sendChanguePassword}
                className="w-fit px-5"
              >
                {' '}
                Cambiar contraseña
              </Button>
            </>
          ) : (
            <>
              <h2 className="text-xl font-medium">Se cambió tu contraseña</h2>
              <span className="text-xs">
                Tu contraseña ha sido cambiada, ya puedes ingresar a la
                aplicación normalmente.
              </span>
              <Link href={'/'}>
                <Button>Volver al incio</Button>
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default page;
