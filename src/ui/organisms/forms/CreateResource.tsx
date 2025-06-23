'use client';

import { ResourceCategory } from '@/lib/interfaces/resource.interface';
import { appModal } from '@/lib/services/modal.service';
import { useAddAnonymsTeacherClassMutation } from '@/store/api/recoco/anonymsApi';
import { useAddTeacherClassMutation } from '@/store/api/recoco/teacherClassApi';
import Button from '@/ui/atoms/Button';
import CreateElementLayout from '@/ui/atoms/CreateElementLayout';
import CreateElement from '@/ui/molecules/CreateElementCard';
import { ErrorMessage } from '@hookform/error-message';
import React from 'react';
import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2';

const inputClass =
  'px-3 py-2 border-2 border-app-border rounded-xl outline-none w-full text-sm  duration-300';

interface Props {
  teacher_id: number;
  course_id: number;
}
const CreateResource = ({ teacher_id, course_id }: Props) => {
  // const [createTeacherClass] = useAddTeacherClassMutation();
  // const [createAnonymsTeacherClass] = useAddAnonymsTeacherClassMutation();

  const onCreateElement = (isAnonyms: boolean = false) => {
    appModal.fire({
      html: (
        <CreateResourceForm
          teacher_id={teacher_id}
          course_id={course_id}
          createResource={(data: any) => console.log(data)}
          createResourceAnonyms={(data: any) => console.log(data)}
          isAnonyms={isAnonyms}
        />
      ),
      width: 600,
    });
  };

  return (
    <CreateElement
      question="No encuentras a tu profesor?"
      description="Cursaste en una materia que no está en nuestras listas. Ayuda a la comunidad Recoco creándolo."
      buttonText="Crear profesor"
      onCreateElement={onCreateElement}
    />
  );
};

export default CreateResource;

type formData = {
  name: string;
  url: string;
  category: ResourceCategory;
  teacher_id: number;
  course_id: number;
};

interface CreateResourceProps {
  createResource: any;
  createResourceAnonyms: any;
  course_id: number;
  teacher_id: number;
  isAnonyms: boolean;
}
const CreateResourceForm = ({
  createResource,
  createResourceAnonyms,
  teacher_id,
  course_id,
  isAnonyms,
}: CreateResourceProps) => {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<formData>({
    defaultValues: {
      name: '',
      url: '',
      category: 'exams',
      teacher_id: teacher_id,
      course_id: course_id,
    },
  });

  const onSubmit = async (data: formData) => {
    try {
      if (isAnonyms) {
        await createResourceAnonyms({
          ...data,
        }).unwrap();
        return Swal.clickConfirm();
      } else {
        await createResourceAnonyms({
          ...data,
        }).unwrap();
        return Swal.clickConfirm();
      }
    } catch (error: any) {
      throw error;
    }
  };

  return (
    <CreateElementLayout title="Nuevo Recurso">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-4 [&>input]:w-full"
      >
        <div className="grid sm:grid-cols-2 gap-2">
          <label>
            <input
              placeholder="Escribe el nombre del recurso para identificarlo"
              {...register('name', {
                required: '*Este campo es obligatorio',
              })}
              className={inputClass}
            />
            <ErrorMessage
              name="name"
              errors={errors}
              as={'span'}
              className="text-xs text-red-300 float-left left-1 relative top-1 "
            />
          </label>
          <label>
            <input
              placeholder="Escribe el url del recurso"
              {...register('url', {
                required: '*Este campo es obligatorio',
              })}
              className={inputClass}
            />
            <ErrorMessage
              name="url"
              errors={errors}
              as={'span'}
              className="text-xs text-red-300 float-left left-1 relative top-1 "
            />
          </label>
        </div>
        <label>
          <input
            placeholder="Nombre de la cátedra (opcional)"
            {...register('category')}
            className={inputClass}
          />
          <ErrorMessage
            name="category"
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
