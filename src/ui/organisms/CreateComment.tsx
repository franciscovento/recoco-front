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
import { successNotification } from '@/lib/services/notification.service';

type formData = {
  comment: string;
  difficulty: number | null;
  quality: number | null;
};

const CreateComment = () => {
  const { isAuthenticated } = useSelector((state: RootState) => state.ui);
  const { loginRegisterModal } = useLoginModal();
  const [commentActive, setCommentActive] = useState<boolean>(false);
  const [rows, setRows] = useState<'50' | '100'>('50');
  const difficultyOptions = [
    { value: 1, name: 'Fácil' },
    { value: 2, name: 'Medio' },
    { value: 3, name: 'Difícil' },
    { value: 4, name: 'Infumable' },
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
    console.log(isAuthenticated);

    try {
      if (!isAuthenticated) {
        return loginRegisterModal();
      }
      successNotification('Comentario creado');
      reset();
      setCommentActive(false);
      setRows('50');
    } catch (error) {}
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
                className="w-[77px] max-w-full"
                variant="outline"
              >
                Cancelar
              </Button>
              <Button
                disabled={!isValid || !quality}
                type="submit"
                className="w-[102px] max-w-full"
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
