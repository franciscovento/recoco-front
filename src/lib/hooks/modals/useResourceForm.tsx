import React, { FC } from 'react';
import { useAppModal } from '../useAppModal';
import { Controller, useForm } from 'react-hook-form';
import { Button, Input, Select } from 'antd';
import { getCategoryResourceName } from '@/lib/helpers/getCategoryResourceName';
import { useAddResourceMutation } from '@/store/api/recoco/teacherClassApi';
import { ErrorMessage } from '@hookform/error-message';
import { useAddAnonymsResourceMutation } from '@/store/api/recoco/anonymsApi';
import { ResourceCategory } from '@/lib/interfaces/resource.interface';
import useAppNotification from './useAppNotification';

export type LoginRegisterFormType = 'login' | 'register';
export type LoginRegisterFormSuccess = 'login' | 'register' | 'anonyms';
const resourceCategories: ResourceCategory[] = [
  'books',
  'exams',
  'videos',
  'other',
];
const useResourceForm = () => {
  const { appModal } = useAppModal();

  const showResourceFormModal = (props: {
    course_id: number;
    teacher_id: number;
    isAnonyms?: boolean;
  }) => {
    const instance = appModal({
      title: 'Agregar Recurso',
      content: (
        <ResourceForm
          closeModal={() => instance.destroy()}
          course_id={props.course_id}
          teacher_id={props.teacher_id}
          isAnonyms={props.isAnonyms}
        />
      ),
      footer: null,
    });
  };
  return {
    showResourceFormModal,
  };
};

export default useResourceForm;

interface ResourceFormProps {
  closeModal: () => void;
  course_id: number;
  teacher_id: number;
  isAnonyms?: boolean;
}

interface ResourceFormValues {
  name: string;
  url: string;
  category: ResourceCategory;
  course_id: number;
  teacher_id: number;
}
const ResourceForm: FC<ResourceFormProps> = ({
  closeModal,
  course_id,
  teacher_id,
  isAnonyms,
}) => {
  const { notification } = useAppNotification();
  const [addResource, { isLoading }] = useAddResourceMutation();
  const [addAnonymsResource, { isLoading: isLoadingAnonyms }] =
    useAddAnonymsResourceMutation();
  const {
    control,
    handleSubmit,
    setError,

    formState: { isValid, errors },
  } = useForm<ResourceFormValues>({
    defaultValues: {
      name: '',
      url: '',
      category: undefined,
      course_id,
      teacher_id,
    },
    mode: 'onChange',
  });

  const onSubmit = async (data: ResourceFormValues) => {
    try {
      if (isAnonyms) {
        await addAnonymsResource({
          course_id: data.course_id,
          teacher_id: data.teacher_id,
          name: data.name,
          url: data.url,
          category: data.category,
        }).unwrap();
        notification({
          type: 'success',
          message: 'Recurso agregado correctamente',
        });
      } else {
        await addResource({
          course_id: data.course_id,
          teacher_id: data.teacher_id,
          name: data.name,
          url: data.url,
          category: data.category,
        }).unwrap();
        notification({
          type: 'success',
          message: 'Recurso agregado correctamente',
        });
      }
      closeModal();
    } catch (error) {
      setError('root', {
        message: 'Error al agregar el recurso',
      });
    }
  };

  return (
    <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
      <div>
        <span className="text-xs text-app-text">
          Solo se admiten urls de páginas web seguras si necesitas subir una url
          y no te permite, comunicate a adm.recoco@gmail.com para habilitar el
          sitio.
        </span>
      </div>
      <div className="grid sm:grid-cols-2 gap-4">
        <Controller
          control={control}
          name="name"
          rules={{ required: true }}
          render={({ field }) => {
            return <Input placeholder="Nombre del recurso" {...field} />;
          }}
        />
        <Controller
          control={control}
          name="category"
          rules={{ required: true }}
          render={({ field }) => {
            return (
              <Select
                placeholder="Selecciona una categoría"
                {...field}
                options={resourceCategories.map((category) => ({
                  label: getCategoryResourceName(category),
                  value: category,
                }))}
              />
            );
          }}
        />
      </div>
      <div>
        <Controller
          control={control}
          name="url"
          rules={{
            required: true,
            pattern: {
              value:
                /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/,
              message: 'La URL no es válida',
            },
          }}
          render={({ field }) => {
            return (
              <Input
                placeholder="Ingresa la URL donde se encuentra el recurso"
                {...field}
              />
            );
          }}
        />
        <ErrorMessage
          className="text-xs text-red-300 pb-2"
          errors={errors}
          name="url"
          as={'span'}
        />
      </div>

      <div>
        <ErrorMessage
          className="text-xs text-red-300 pb-2"
          errors={errors}
          // @ts-ignore
          name="root"
          as={'span'}
        />
      </div>
      <div className="flex items-center gap-2 justify-end">
        <Button type="default" htmlType="button" onClick={closeModal}>
          Cancelar
        </Button>
        <Button
          loading={isLoading || isLoadingAnonyms}
          disabled={!isValid}
          type="primary"
          htmlType="submit"
        >
          Agregar
        </Button>
      </div>
    </form>
  );
};
