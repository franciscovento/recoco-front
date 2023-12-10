'use client';
import { appModal } from '@/lib/services/modal.service';
import {
  failedNotification,
  successNotification,
} from '@/lib/services/notification.service';
import { useAddWithDegreeCourseMutation } from '@/store/api/recoco/courseApi';
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

interface Props {
  facultyId: number;
  degreeId: number;
}
const CreateCourse = ({ degreeId, facultyId }: Props) => {
  const [createCourse] = useAddWithDegreeCourseMutation();

  const onCreateCourse = async (data: {
    course_code: string;
    name: string;
  }) => {
    createCourse({
      course_code: data.course_code,
      degree_id: degreeId,
      name: data.name,
      faculty_id: facultyId,
    })
      .unwrap()
      .then(() => {
        successNotification('Materia creada con éxito');
      })
      .catch(() => failedNotification('Parece que este curso ya existe'));
  };

  const onCreate = () => {
    appModal.fire({
      html: <CreateCourseForm createCourse={onCreateCourse} />,
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

type formData = {
  course_name: string;
  course_code: string;
};

interface CreateCourseProps {
  createCourse: (_data: { course_code: string; name: string }) => Promise<any>;
}
const CreateCourseForm = ({ createCourse }: CreateCourseProps) => {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<formData>({
    defaultValues: {
      course_name: '',
      course_code: '',
    },
  });
  const onSubmit = async (data: formData) => {
    return await createCourse({
      course_code: data.course_code,
      name: data.course_name,
    });
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
