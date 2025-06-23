import { LoginRegisterFormSuccess } from '@/lib/hooks/modals/useLoginRegisterForm';
import {
  useLoginMutation,
  useSignUpMutation,
} from '@/store/api/recoco/authApi';
import SvgRecocoMusic from '@/ui/atoms/svg/branding/SvgRecocoMusic';
import { ErrorMessage } from '@hookform/error-message';
import { Button } from 'antd';
import Image from 'next/image';
import { useForm } from 'react-hook-form';

type RegisterFormType = {
  username: string;
  email: string;
  password: string;
  profile_img: string;
  // repeatPassword: string;
};

interface Props {
  setModalType: React.Dispatch<React.SetStateAction<'login' | 'register'>>;
  onLoginRegisterSuccess?: (response: LoginRegisterFormSuccess) => void;
}

const inputClass =
  'px-3 py-2 italic border-2 border-app-border rounded-xl outline-none w-full text-xs  duration-300';

const RegisterForm = ({ setModalType, onLoginRegisterSuccess }: Props) => {
  const [signUp, { isLoading }] = useSignUpMutation();
  const [login, { isLoading: isLoginLoading }] = useLoginMutation();

  const IMG_AVATARS = [
    '/images/characters/default.png',
    '/images/characters/loofie.png',
    '/images/characters/pepa.png',
    '/images/characters/homero.png',
  ];
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    setError,
    formState: { isValid, errors },
  } = useForm<RegisterFormType>({
    defaultValues: {
      username: '',
      email: '',
      password: '',
      profile_img: '/images/characters/default.png',
    },
  });

  const profileImg = watch('profile_img');

  const onSubmit = async (data: RegisterFormType) => {
    try {
      await signUp({
        username: data.username,
        email: data.email,
        password: data.password,
        profile_img: data.profile_img,
      }).unwrap();

      await login({
        email: data.email,
        password: data.password,
      }).unwrap();

      onLoginRegisterSuccess?.('register');
    } catch (error: any) {
      if (error) {
        setError('root', { message: error?.data?.message });
      }
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
            <div className="text-xs italic text-app-text">
              Elige un avatar: (Opcional)
              <div className="flex gap-2 pt-4">
                {IMG_AVATARS.map((img, index) => (
                  <Image
                    onClick={() => setValue('profile_img', img)}
                    key={index}
                    src={img}
                    width={40}
                    height={40}
                    alt="character"
                    className={`rounded-full duration-300 object-contain border-2 cursor-pointer ${
                      profileImg === img && 'border-app-primary'
                    }`}
                  />
                ))}
              </div>
            </div>
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
              loading={isLoading || isLoginLoading}
              htmlType="submit"
              type="primary"
            >
              Crear cuenta
            </Button>
            <button
              type="button"
              onClick={() => setModalType('login')}
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
            ¡Tu aporte es valioso!
          </h2>
          <p className="text-white text-sm font-extralight">
            Si no quieres registrarte aún puedes seguir como anónimo, pero no
            podrás editar ni eliminar tus aportes.
          </p>
        </div>
        <Button
          onClick={() => onLoginRegisterSuccess?.('anonyms')}
          className="w-fit px-8 bg-white font-bold mt-4 text-xs"
        >
          Realizar acción como anónimo
        </Button>
      </div>
    </div>
  );
};

export { RegisterForm };
