'use client';
import CreateUniversity from '@/ui/organisms/CreateUniversityFrom';
import React from 'react';
import {
  useUpdateUniversityMutation,
  useDeleteUniversityMutation,
  useGetUniversitiesQuery,
} from '@/store/api/recoco/universityApi';
import {
  useLoginMutation,
  useLogoutMutation,
  useMeQuery,
} from '@/store/api/recoco/authApi';

const Page = () => {
  const { isError, data, isLoading } = useGetUniversitiesQuery();
  const [login] = useLoginMutation();
  const { data: me, refetch } = useMeQuery();
  const [update] = useUpdateUniversityMutation();
  const [deleteU] = useDeleteUniversityMutation();
  const [logout] = useLogoutMutation();
  const updateUniversity = async () => {
    await update({
      id: '18e41324-7b2f-4e8a-b284-e34954352c92',
      name: 'University updated!!!!!!',
    })
      .unwrap()
      .then((resp) => {
        console.log(resp);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const deleteUniversity = async () => {
    try {
      await deleteU('b22252f9-38ae-40dc-90bd-95ee2c7b7c24').unwrap();
      console.log('deleted');
    } catch (error) {
      console.log('error');
    }
  };

  const loginHandler = async () => {
    try {
      const resp = await login({
        email: 'fgvr92@gmail.com',
        password: 'Diciembre18',
      }).unwrap();
      console.log(resp);
    } catch (error) {
      console.log(error);
    }
  };

  const revalidate = () => {
    refetch();
  };
  return (
    <>
      {isError && <div>error</div>}
      {isLoading && <div>loading</div>}

      <div className="flex flex-col gap-5">
        {data?.map((university, index) => {
          return (
            <div key={university.id}>
              {' '}
              <span className="text-3xl text-red-600">{index + 1}</span>{' '}
              {JSON.stringify(university)}
            </div>
          );
        })}
      </div>
      <CreateUniversity />

      <button onClick={updateUniversity}>update university</button>
      <button onClick={deleteUniversity}>deleteUniversity</button>
      <button onClick={loginHandler}>login</button>
      <button onClick={revalidate}>revalidate</button>
      <button onClick={() => logout()}>logout</button>
    </>
  );
};

export default Page;
