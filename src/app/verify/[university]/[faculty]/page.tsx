'use client';
import {
  useDeleteUniversityMutation,
  useGetUniversitiesQuery,
  useUpdateUniversityMutation,
} from '@/store/api/recocoApi';
import CreateUniversity from '@/ui/organisms/CreateUniversityFrom';
import React from 'react';

const Page = () => {
  const { isError, data, isLoading } = useGetUniversitiesQuery(null);
  const [update] = useUpdateUniversityMutation();
  const [deleteU] = useDeleteUniversityMutation();
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
      await deleteU('18e41324-7b2f-4e8a-b284-e34954352c92').unwrap();
      console.log('deleted');
    } catch (error) {
      console.log('error');
    }
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
    </>
  );
};

export default Page;
