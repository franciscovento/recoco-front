'use client';
import Image from 'next/image';
import React, { useState } from 'react';
import ChipButton from '../atoms/ChipButton';
import Rating from '../molecules/Rating';
import { useForm } from 'react-hook-form';
import useLoginModal from '@/lib/hooks/useLoginModal';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import { useAddCommentMutation } from '@/store/api/recoco/commentApi';
import { Difficulty } from '@/lib/interfaces/difficulty.enmu';
import { useAddAnonymsCommentMutation } from '@/store/api/recoco/anonymsApi';
import { Button } from 'antd';
import useAppNotification from '@/lib/hooks/modals/useAppNotification';

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
  const { notification } = useAppNotification();
  const { isAuthenticated } = useSelector((state: RootState) => state.ui);
  const [addComment, { isLoading: isLoadingAddComment }] =
    useAddCommentMutation();
  const [addAnonymsComment, { isLoading: isLoadingAddAnonymsComment }] =
    useAddAnonymsCommentMutation();
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
    formState: { isValid },
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
      notification({
        type: 'error',
        message: error?.data?.message || 'Error al crear el comentario',
      });
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

    notification({
      type: 'success',
      message: 'Comentario creado',
    });
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
    notification({
      type: 'success',
      message: 'Comentario creado',
    });
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
          disabled={isLoadingAddComment || isLoadingAddAnonymsComment}
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
                            disabled={
                              isLoadingAddComment || isLoadingAddAnonymsComment
                            }
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
                    disabled={isLoadingAddComment || isLoadingAddAnonymsComment}
                  />
                </div>
              </li>
            </ul>
            <div className="flex items-center gap-2 pt-6">
              <Button htmlType="button" onClick={handleCancel}>
                Cancelar
              </Button>
              <Button
                type="primary"
                disabled={!isValid || !quality}
                loading={isLoadingAddComment || isLoadingAddAnonymsComment}
                htmlType="submit"
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
