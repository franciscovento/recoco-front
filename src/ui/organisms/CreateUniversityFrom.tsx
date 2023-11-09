'use client';
import { useAddUniversityMutation } from '@/store/api/recoco/universityApi';
import { useGetCountriesQuery } from '@/store/api/recocoApi';
import { useForm } from 'react-hook-form';

type formData = {
  name: string;
  country_id: number;
  website: string;
  phone: string;
};

const CreateUniversity = () => {
  const { data: countries } = useGetCountriesQuery();
  const [addUniversity] = useAddUniversityMutation();
  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<formData>({
    defaultValues: {
      name: '',
      country_id: undefined,
      website: '',
      phone: '',
    },
  });

  const onSubmit = async (data: formData) => {
    await addUniversity({
      ...data,
      country_id: +data.country_id,
    })
      .unwrap()
      .then((res) => {
        console.log(res);
        alert('University created');
      })
      .catch((err) => {
        console.log(err);
        alert('Error creating university');
      });
  };

  return (
    <form
      className="flex flex-col gap-4 [&>label]:flex [&>label]:flex-col bg-slate-500 p-4 mt-12"
      onSubmit={handleSubmit(onSubmit)}
    >
      <label>
        Name:
        <input {...register('name')} />
      </label>
      <label>
        Website:
        <input {...register('website')} />
      </label>
      <label>
        Phone:
        <input {...register('phone')} />
      </label>
      <select {...register('country_id')}>
        Country
        <option value="">Selecciona una opción</option>
        {countries?.map((country) => {
          return (
            <option key={country.id} value={country.id}>
              {country.name}
            </option>
          );
        })}
      </select>

      <div>
        <button
          className="bg-orange-500 p-2 disabled:bg-black"
          type="submit"
          disabled={isSubmitting}
        >
          Create University
        </button>
      </div>
    </form>
  );
};

export default CreateUniversity;
