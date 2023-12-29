import Button from '@/ui/atoms/Button';
import Image from 'next/image';
import React from 'react';
import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2';
import { ErrorMessage } from '@hookform/error-message';
import { successNotification } from '@/lib/services/notification.service';
import Link from 'next/link';
import SvgRecocoMusic from '@/ui/atoms/svg/branding/SvgRecocoMusic';

const inputClass =
  'px-3 py-2 italic border-2 border-app-border rounded-xl outline-none w-full text-xs  duration-300';

interface Props {
  login: any;
  signUp: any;
  defaultIsLogin?: boolean;
}
const LoginRegisterModal = ({
  login,
  signUp,
  defaultIsLogin = true,
}: Props) => {
  const [isLogin, setIsLogin] = React.useState<boolean>(defaultIsLogin);

  return (
    <>
      {isLogin ? (
        <LoginModal login={login} setIsLogin={setIsLogin} />
      ) : (
        <RegisterModal signUp={signUp} setIsLogin={setIsLogin} />
      )}
    </>
  );
};

export default LoginRegisterModal;

interface ILoginModal {
  setIsLogin: React.Dispatch<React.SetStateAction<boolean>>;
  login: any;
}
const LoginModal = ({ setIsLogin, login }: ILoginModal) => {
  const {
    register,
    handleSubmit,
    setError,
    formState: { isSubmitting, errors, isValid },
  } = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
    mode: 'all',
  });

  const onSubmit = async (data: { email: string; password: string }) => {
    try {
      await login({
        email: data.email,
        password: data.password,
      });
      Swal.clickConfirm();
      return successNotification('Sesión iniciada correctamente');
    } catch (error: any) {
      if (error) {
        setError('root', { message: error?.data?.message });
      }
      return error;
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-app-card grid sm:grid-cols-5  relative gap-8 pt-4 sm:pt-0">
      <div className="col-span-2 self-end order-2 sm:order-1 bg-[url(/images/recoco/login.png)] sm:bg-none w-full bg-bottom bg-no-repeat h-full rounded-bl-xl bg-contain sm:bg-auto">
        <Image
          src={'/images/recoco/login.png'}
          className="rounded-bl-xl opacity-0"
          width={238}
          height={238}
          alt=""
        />
        <Image
          src={'/images/recoco/login.png'}
          className="rounded-bl-xl absolute bottom-0 left-0 hidden sm:block"
          width={238}
          height={238}
          alt=""
        />
      </div>
      <div className="text-left col-span-3 pt-12 sm:py-12 px-6 order-1 sm:order-2 sm:pr-12">
        <h3 className="text-2xl font-semibold pb-1">¡Holaaa!</h3>
        <p className="text-sm leading-normal font-light">
          Aunque aquí todo es confidencial, necesitas iniciar sesión para
          validar que no eres un extraterreste...
        </p>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col ">
          <div className="py-4 flex flex-col gap-3">
            <label>
              <input
                placeholder="Escribe tu correo electrónico"
                className={inputClass + ` ${errors.email && 'border-red-300'}`}
                type="email"
                {...register('email', {
                  required: '*Este campo es obligatorio',
                })}
              />
            </label>
            <label className="text-right">
              <input
                placeholder="Escribe tu contraseña"
                className={
                  inputClass + ` ${errors.password && 'border-red-300'}`
                }
                type="password"
                {...register('password', {
                  required: '*Este campo es obligatorio',
                })}
              />
              <Link
                className="text-xs underline text-app-text hover:text-blue-400 duration-300 inline-block  relative pt-2 "
                href={'/auth/forgot-password'}
              >
                Olvidé contraseña
              </Link>
            </label>
          </div>
          <div className="text-center flex flex-col items-center">
            <ErrorMessage
              className="text-xs text-red-300 pb-2"
              errors={errors}
              // @ts-ignore
              name="root"
              as={'span'}
            />
            <Button
              disabled={!isValid || isSubmitting}
              type="submit"
              className="w-[203px] max-w-full"
            >
              Ingresar
            </Button>
            <button
              type="button"
              onClick={() => setIsLogin(false)}
              className="text-xs block mt-2 italic cursor-pointer underline underline-offset-2"
            >
              ¿No tiene una cuenta? Crear
            </button>
          </div>
        </form>
      </div>
      <svg
        onClick={() => Swal.close()}
        className="absolute top-3 left-3 cursor-pointer"
        xmlns="http://www.w3.org/2000/svg"
        width="26"
        height="26"
        viewBox="0 0 26 26"
        fill="none"
      >
        <path
          d="M13 1.625C6.6625 1.625 1.625 6.6625 1.625 13C1.625 19.3375 6.6625 24.375 13 24.375C19.3375 24.375 24.375 19.3375 24.375 13C24.375 6.6625 19.3375 1.625 13 1.625ZM13 22.75C7.6375 22.75 3.25 18.3625 3.25 13C3.25 7.6375 7.6375 3.25 13 3.25C18.3625 3.25 22.75 7.6375 22.75 13C22.75 18.3625 18.3625 22.75 13 22.75Z"
          fill="#00DC8C"
        />
        <path
          d="M17.3875 18.6875L13 14.3L8.6125 18.6875L7.3125 17.3875L11.7 13L7.3125 8.6125L8.6125 7.3125L13 11.7L17.3875 7.3125L18.6875 8.6125L14.3 13L18.6875 17.3875L17.3875 18.6875Z"
          fill="#00DC8C"
        />
      </svg>
    </div>
  );
};

interface IRegisterModal {
  setIsLogin: React.Dispatch<React.SetStateAction<boolean>>;
  signUp: any;
}

type RegisterForm = {
  username: string;
  email: string;
  password: string;
  // repeatPassword: string;
};
const RegisterModal = ({ setIsLogin, signUp }: IRegisterModal) => {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting, isValid, errors },
  } = useForm<RegisterForm>({
    defaultValues: {
      username: '',
      email: '',
      password: '',
    },
  });

  const onSubmit = async (data: RegisterForm) => {
    try {
      await signUp({
        username: data.username,
        email: data.email,
        password: data.password,
      });
      Swal.clickConfirm();
      return successNotification('Create una cuenta con éxito');
    } catch (error) {
      return error;
    }
  };

  return (
    <div className="rounded-xl shadow-app-card grid sm:grid-cols-5  relative sm:pt-0 bg-app-primary-dark">
      <div className="text-left col-span-full sm:col-span-3 order-1 sm:order-2 bg-white rounded-xl px-8 py-12">
        <h3 className="text-2xl font-semibold pb-1">Create una cuenta</h3>
        <p className="text-sm leading-normal font-light">
          Y miles de estudiantes pueden beneficiarse de tu experiencia :)
        </p>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-2">
          <div className="py-4 flex flex-col gap-3">
            <label>
              <input
                placeholder="Nombre de usuario - este campo será público"
                className={inputClass}
                type="text"
                {...register('username', {
                  required: 'Este campo es obligatorio',
                })}
              />
            </label>
            <label>
              <input
                placeholder="Correo electrónico - este campo es privado"
                className={inputClass}
                type="email"
                {...register('email', {
                  required: 'Este campo es obligatorio',
                })}
              />
            </label>
            <label>
              <input
                placeholder="Contraseña"
                className={inputClass}
                type="password"
                {...register('password', {
                  required: 'Este campo es obligatorio',
                })}
              />
            </label>
          </div>
          <div className="text-center flex flex-col items-center">
            <ErrorMessage
              className="text-xs text-red-300 pb-2"
              errors={errors}
              // @ts-ignore
              name="root"
              as={'span'}
            />
            <Button
              disabled={!isValid || isSubmitting}
              type="submit"
              className="w-full"
            >
              Crear cuenta
            </Button>
            <button
              type="button"
              onClick={() => setIsLogin(true)}
              className="text-xs block mt-2 italic cursor-pointer underline underline-offset-2 text-app-primary-dark"
            >
              ¿Ya tienes una cuenta? Iniciar sesión
            </button>
          </div>
        </form>
      </div>
      <div className="col-span-full sm:col-span-2 order-1 sm:order-2 px-4 py-12 flex items-center justify-center flex-col text-center gap-4">
        <SvgRecocoMusic />
        <div>
          <h2 className="text-xl font-medium text-white pb-2">
            ¡Tu comentario es valioso!
          </h2>
          <p className="text-white text-sm font-extralight">
            Si no quieres registrarte aún puedes seguir como anónimo
          </p>
        </div>
        <Button
          onClick={() => Swal.clickDeny()}
          className="w-fit px-8 bg-white font-bold mt-4 text-xs"
        >
          Seguir como anónimo
        </Button>
      </div>
      <svg
        onClick={() => Swal.close()}
        className="absolute top-3 right-3 cursor-pointer text-app-primary-dark sm:text-white"
        xmlns="http://www.w3.org/2000/svg"
        width="26"
        height="26"
        viewBox="0 0 26 26"
        fill="none"
      >
        <path
          d="M13 1.625C6.6625 1.625 1.625 6.6625 1.625 13C1.625 19.3375 6.6625 24.375 13 24.375C19.3375 24.375 24.375 19.3375 24.375 13C24.375 6.6625 19.3375 1.625 13 1.625ZM13 22.75C7.6375 22.75 3.25 18.3625 3.25 13C3.25 7.6375 7.6375 3.25 13 3.25C18.3625 3.25 22.75 7.6375 22.75 13C22.75 18.3625 18.3625 22.75 13 22.75Z"
          fill="currentColor"
        />
        <path
          d="M17.3875 18.6875L13 14.3L8.6125 18.6875L7.3125 17.3875L11.7 13L7.3125 8.6125L8.6125 7.3125L13 11.7L17.3875 7.3125L18.6875 8.6125L14.3 13L18.6875 17.3875L17.3875 18.6875Z"
          fill="currentColor"
        />
      </svg>
    </div>
  );
};
