'use client';
import Image from 'next/image';
import React, { useState } from 'react';
import ChipButton from '../atoms/ChipButton';
import Rating from '../molecules/Rating';
import Button from '../atoms/Button';
import { useForm } from 'react-hook-form';
import useLoginModal from '@/lib/hooks/useLoginModal';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import {
  failedNotification,
  successNotification,
} from '@/lib/services/notification.service';
import { useAddCommentMutation } from '@/store/api/recoco/commentApi';
import { Difficulty } from '@/lib/interfaces/difficulty.enmu';
import { useAddAnonymsCommentMutation } from '@/store/api/recoco/anonymsApi';

type formData = {
  comment: string;
  difficulty: number | null;
  quality: number | null;
};

interface Props {
  course_id: number;
  teacher_id: number;
}

const CreateComment = ({ course_id, teacher_id }: Props) => {
  const { isAuthenticated } = useSelector((state: RootState) => state.ui);
  const [addComment] = useAddCommentMutation();
  const [addAnonymsComment] = useAddAnonymsCommentMutation();
  const { loginRegisterModal } = useLoginModal();
  const [commentActive, setCommentActive] = useState<boolean>(false);
  const [rows, setRows] = useState<'50' | '100'>('50');
  const difficultyOptions = [
    { value: 1, name: Difficulty.EASY },
    { value: 2, name: Difficulty.MEDIUM },
    { value: 3, name: Difficulty.HARD },
    { value: 4, name: Difficulty.HEAVY },
  ];
  const {
    register,
    handleSubmit,
    reset,
    watch,
    setValue,
    formState: { isValid, isSubmitting },
  } = useForm<formData>({
    defaultValues: {
      comment: '',
      difficulty: null,
      quality: null,
    },
  });
  const difficulty = watch('difficulty');
  const quality = watch('quality');
  const handleOnFocus = () => {
    setRows('100');
    setCommentActive(true);
  };

  const handleCancel = () => {
    setCommentActive(false);
    reset();
    setRows('50');
  };

  const onSubmit = async (data: formData) => {
    try {
      if (!isAuthenticated) {
        const resp = await loginRegisterModal('register');
        if (resp === 'login') {
          return await handleAddComment(data);
        }
        if (resp === 'anonyms') {
          return await handleAddAnonymsComment(data);
        }
        return;
      } else {
        return handleAddComment(data);
      }
    } catch (error: any) {
      failedNotification(
        error?.data?.message || 'Error al crear el comentario'
      );
      console.log(error);
    }
  };

  const handleAddComment = async (data: formData) => {
    await addComment({
      comment: data.comment,
      difficulty: Number(data.difficulty),
      quality: Number(data.quality),
      course_id,
      teacher_id,
    }).unwrap();

    successNotification('Comentario creado');
    reset();
    setCommentActive(false);
    setRows('50');
  };

  const handleAddAnonymsComment = async (data: formData) => {
    await addAnonymsComment({
      comment: data.comment,
      difficulty: Number(data.difficulty),
      quality: Number(data.quality),
      course_id,
      teacher_id,
    }).unwrap();
    successNotification('Comentario creado');
    reset();
    setCommentActive(false);
    setRows('50');
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex items-start flex-wrap gap-4"
    >
      <Image
        src={'/images/characters/default.png'}
        width={30}
        height={30}
        alt=""
      />
      <div className="flex-1">
        <textarea
          style={{
            height: `${rows}px`,
          }}
          placeholder="Agrega tu comentario"
          className="w-full outline-none border-2 border-app-border rounded-3xl px-4 py-2 resize-none text-app-text duration-300"
          onFocus={handleOnFocus}
          {...register('comment', { required: true })}
        />
        {commentActive && (
          <div>
            <ul className="list-disc flex flex-col gap-4 pt-4">
              <li className="ml-5">
                <div className="flex items-center flex-wrap gap-x-8 gap-y-3 ">
                  <span className="text-sm">
                    ¿Qué tan difícil te pareció la materia?
                  </span>
                  <div className="flex items-center gap-2 flex-wrap">
                    {difficultyOptions.map((item, index) => {
                      return (
                        <label key={index} className="relative group">
                          <input
                            value={item.value}
                            {...register('difficulty', { required: true })}
                            type="radio"
                            className="absolute opacity-0 w-full h-full cursor-pointer"
                          />
                          <ChipButton isActive={difficulty == item.value}>
                            {item.name}
                          </ChipButton>
                        </label>
                      );
                    })}
                  </div>
                </div>
              </li>
              <li className="ml-5">
                <div className="flex items-center flex-wrap gap-x-8 gap-y-3 ">
                  <span className="text-sm">
                    Califica al profesor de este curso
                  </span>
                  <Rating
                    showTooltip
                    onChangue={(e) => setValue('quality', e)}
                  />
                </div>
              </li>
            </ul>
            <div className="flex items-center gap-2 pt-6">
              <Button
                type="button"
                onClick={handleCancel}
                className=" max-w-full"
                variant="outline"
              >
                Cancelar
              </Button>
              <Button
                disabled={!isValid || !quality || isSubmitting}
                type="submit"
                className=" max-w-full"
              >
                Comentar
              </Button>
            </div>
          </div>
        )}
      </div>
    </form>
  );
};

export default CreateComment;
