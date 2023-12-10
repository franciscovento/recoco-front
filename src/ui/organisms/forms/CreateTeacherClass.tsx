'use client';
import { appModal } from '@/lib/services/modal.service';
import { failedNotification } from '@/lib/services/notification.service';
import { useAddWithDegreeCourseMutation } from '@/store/api/recoco/courseApi';
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
  facultyId: number;
  courseId: number;
}
const CreateTeacherClass = ({ courseId, facultyId }: Props) => {
  const [createTeacherClass] = useAddTeacherClassMutation();

  const onCreate = () => {
    appModal.fire({
      html: (
        <CreateTeacherClassForm
          facultyId={facultyId}
          courseId={courseId}
          createTeacherClass={createTeacherClass}
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
      onCreateElement={onCreate}
    />
  );
};

export default CreateTeacherClass;

type formData = {
  teacher_name: string;
  course_id: number;
  faculty_id: number;
  last_name: string;
  teacher_class_name: string;
};

interface CreateCourseProps {
  createTeacherClass: any;
  courseId: number;
  facultyId: number;
}
const CreateTeacherClassForm = ({
  createTeacherClass,
  facultyId,
  courseId,
}: CreateCourseProps) => {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<formData>({
    defaultValues: {
      teacher_name: '',
      last_name: '',
      course_id: courseId,
      faculty_id: facultyId,
      teacher_class_name: '',
    },
  });

  const onSubmit = async (data: formData) => {
    try {
      await createTeacherClass({
        teacher_name: data.teacher_name,
        last_name: data.last_name,
        course_id: courseId,
        faculty_id: facultyId,
        teacher_class_name: data.teacher_class_name,
      }).unwrap();

      Swal.clickConfirm();
    } catch (error: any) {
      throw error;
    }
  };

  return (
    <CreateElementLayout title="Nuevo Profesor">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-4 [&>input]:w-full"
      >
        <div className="grid sm:grid-cols-2 gap-2">
          <label>
            <input
              placeholder="Escribe el nombre"
              {...register('teacher_name', {
                required: '*Este campo es obligatorio',
              })}
              className={inputClass}
            />
            <ErrorMessage
              name="teacher_name"
              errors={errors}
              as={'span'}
              className="text-xs text-red-300 float-left left-1 relative top-1 "
            />
          </label>
          <label>
            <input
              placeholder="Escribe el apellido"
              {...register('last_name', {
                required: '*Este campo es obligatorio',
              })}
              className={inputClass}
            />
            <ErrorMessage
              name="last_name"
              errors={errors}
              as={'span'}
              className="text-xs text-red-300 float-left left-1 relative top-1 "
            />
          </label>
        </div>
        <label>
          <input
            placeholder="Nombre de la cátedra (opcional)"
            {...register('teacher_class_name')}
            className={inputClass}
          />
          <ErrorMessage
            name="teacher_class_name"
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
