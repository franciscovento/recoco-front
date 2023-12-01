'use client';
import { appModal } from '@/lib/services/modal.service';
import Button from '@/ui/atoms/Button';
import Card from '@/ui/atoms/Card';
import CreateElementLayout from '@/ui/atoms/CreateElementLayout';
import SvgRecocoBlink from '@/ui/atoms/svg/branding/SvgRecocoBlink';
import CreateElement from '@/ui/molecules/CreateElementCard';
import { ErrorMessage } from '@hookform/error-message';
import React from 'react';
import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2';

const inputClass =
  'px-3 py-2 border-2 border-app-border rounded-xl outline-none w-full text-sm  duration-300';

const CreateCourse = () => {
  const onCreate = () => {
    appModal.fire({
      html: <CreateCourseForm />,
      width: 600,
    });
  };

  return (
    <CreateElement
      question="No encuentras la materia que buscas?"
      description="Cursaste en una materia que no está en nuestras listas. Ayuda a la comunidad Recoco creándolo."
      buttonText="Crear materia"
      onCreateElement={onCreate}
    />
  );
};

export default CreateCourse;

const CreateCourseForm = () => {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({
    defaultValues: {
      course_name: '',
      course_code: '',
    },
  });

  const onSubmit = (data: any) => {
    console.log(data);
    Swal.clickConfirm();
  };

  return (
    <CreateElementLayout title="Nueva Materia">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-4 [&>input]:w-full"
      >
        <label>
          <input
            placeholder="Escribe el nombre de la materia"
            {...register('course_name', {
              required: '*Este campo es obligatorio',
            })}
            className={inputClass}
          />
          <ErrorMessage
            name="course_name"
            errors={errors}
            as={'span'}
            className="text-xs text-red-300 float-left left-1 relative top-1 "
          />
        </label>
        <label>
          <input
            placeholder="Escribe el código del curso (opcional)"
            {...register('course_code', {
              maxLength: {
                value: 4,
                message: '*El código debe tener máximo 4 caracteres',
              },
            })}
            className={inputClass}
          />
          <ErrorMessage
            name="course_code"
            errors={errors}
            as={'span'}
            className="text-xs text-red-300 float-left left-1 relative top-1 "
          />
        </label>
        <div className="flex items-center gap-4 justify-center">
          <Button
            onClick={() => Swal.clickCancel()}
            type="button"
            variant="outline"
          >
            Cancelar
          </Button>
          <Button type="submit">Crear</Button>
        </div>
      </form>
    </CreateElementLayout>
  );
};
