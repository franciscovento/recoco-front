'use client';
import { useForgotPasswordMutation } from '@/store/api/recoco/authApi';
import Button from '@/ui/atoms/Button';
import Logo from '@/ui/atoms/svg/branding/Logo';
import SvgRecocoThinking from '@/ui/atoms/svg/branding/SvgRecocoThinking';
import Link from 'next/link';
import React, { useState } from 'react';

const inputClass =
  'px-3 py-2 border-2 border-app-border rounded-xl outline-none w-full text-sm  duration-300';
const page = () => {
  const [forgotPassword] = useForgotPasswordMutation();
  const [email, setEmail] = useState('');
  const [showError, setShowError] = useState(false);
  const [isSended, setIsSended] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const sendEmail = async () => {
    setIsSending(true);
    try {
      await forgotPassword({ email }).unwrap();
      setIsSended(true);
      setShowError(false);
      setIsSending(false);
    } catch (error) {
      setShowError(true);
      setIsSending(false);
      console.log(error);
    }
  };

  return (
    <div className="flex flex-col sm:flex-row h-screen overflow-hidden">
      <Link href={'/'} className="fixed left-4">
        <Logo width={150} height={90} />
      </Link>
      <div className="hidden md:flex w-[460px] max-w-full bg-[url(/images/shared/recoco-side.png)] h-screen bg-cover p-8">
        <div className="pt-40">
          <p className="text-black">Trabaja esa memoria</p>
          <h1 className="uppercase text-2xl font-semibold text-black ">
            ¿Olvidaste tu contraseña?
          </h1>
          <p className="text-black uppercase">Recuperala aquí</p>
        </div>
      </div>
      <div className=" px-4 py-12  w-full overflow-y-auto h-full">
        <div className="flex-1 flex flex-col gap-4 items-center h-full justify-center max-w-[500px] mx-auto">
          <SvgRecocoThinking />
          {!isSended ? (
            <>
              <h2 className="text-xl font-medium">
                Escribe tu correo electrónico
              </h2>
              <span className="text-xs">
                Necesitamos enviarte un correo para que puedas recuperar tu
                cuenta.{' '}
              </span>
              <label className="relative w-full">
                <input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  type="email"
                  className={inputClass}
                  placeholder="Tu correo electrónico"
                />
                {showError && (
                  <span className="text-[10px] text-red-400">
                    {' '}
                    Parece que este correo no es un usuario del sistema
                  </span>
                )}
              </label>
              <Button
                disabled={
                  !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(
                    email
                  ) || isSending
                }
                onClick={sendEmail}
                className="w-fit px-5"
              >
                {' '}
                Enviar confirmación
              </Button>
            </>
          ) : (
            <>
              <h2 className="text-xl font-medium">Resetear Contraseña</h2>
              <span className="text-xs">
                Enviamos un correo a <strong>{email}</strong> , con las
                instrucciones necesarias para cambiar tu contraseña.
              </span>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default page;
