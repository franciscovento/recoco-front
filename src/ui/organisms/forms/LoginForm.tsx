import { LoginRegisterFormSuccess } from '@/lib/hooks/modals/useLoginRegisterForm';
import useLogin from '@/lib/hooks/useLogin';
import { useLoginMutation } from '@/store/api/recoco/authApi';
import { ErrorMessage } from '@hookform/error-message';
import { Button } from 'antd';
import Image from 'next/image';
import Link from 'next/link';
import { useForm } from 'react-hook-form';

interface Props {
  setModalType: React.Dispatch<React.SetStateAction<'login' | 'register'>>;
  onLoginRegisterSuccess?: (response: LoginRegisterFormSuccess) => void;
}

const inputClass =
  'px-3 py-2 italic border-2 border-app-border rounded-xl outline-none w-full text-xs  duration-300';

const LoginForm = ({ setModalType, onLoginRegisterSuccess }: Props) => {
  const { loginToApp, isLoading } = useLogin();

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isValid },
  } = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
    mode: 'all',
  });

  const onSubmit = async (data: { email: string; password: string }) => {
    try {
      await loginToApp({
        email: data.email,
        password: data.password,
      });
      onLoginRegisterSuccess?.('login');
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
              disabled={!isValid}
              htmlType="submit"
              type="primary"
              loading={isLoading}
            >
              Ingresar
            </Button>
            <button
              type="button"
              onClick={() => setModalType('register')}
              className="text-xs block mt-2 italic cursor-pointer underline underline-offset-2"
            >
              ¿No tiene una cuenta? Crear
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export { LoginForm };
