'use client';
import Image from 'next/image';
import React, { FC } from 'react';

import { useLogoutMutation } from '@/store/api/recoco/authApi';
import { uiActions } from '@/store/slices/ui';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import useLoginModal from '@/lib/hooks/useLoginModal';
import Link from 'next/link';
import useAppNotification from '@/lib/hooks/modals/useAppNotification';
import { Button } from 'antd';
import { useParams } from 'next/navigation';
import { useGetDegreeByIdQuery } from '@/store/api/recoco/degreeApi';
import { appRoutes } from '../../../routes';

import { useGetFacultyByIdQuery } from '@/store/api/recoco/facultyApi';
import { useGetUniversityBySlugQuery } from '@/store/api/recoco/universityApi';

interface Props {
  headerName: string;
  headerHref: string;
}
const Header: FC<Props> = ({ headerHref, headerName }) => {
  const { notification, confirm } = useAppNotification();
  const { isAuthenticated } = useSelector((state: RootState) => state.ui);
  const { loginRegisterModal } = useLoginModal();
  const [logout] = useLogoutMutation();
  const dispatch = useDispatch();

  const handleLogout = async () => {
    if (!isAuthenticated) {
      return loginRegisterModal('login');
    } else {
      confirm({
        title: 'Cerrar sesión',
        content: '¿Estás seguro de querer cerrar sesión?',
        onOk: async () => {
          try {
            await logout();
            dispatch(uiActions.setAuthState(false));
            dispatch(uiActions.setUserMe(null));
            notification({
              type: 'success',
              message: 'Has cerrado sesión correctamente',
            });
          } catch (error) {
            notification({
              type: 'error',
              message: 'Error al cerrar sesión',
            });
          }
        },
      });
    }
  };
  return (
    <header className="bg-white shadow-app-card flex items-center flex-wrap xs:flex-nowrap  justify-between py-2 px-4 min-h-[67px]">
      <div className=" items-center gap-2 hidden sm:flex">
        <Image src={'/svg/recoco.svg'} width={31} height={28} alt="logo" />
        <Link href={`/`}>
          <strong>RECOCO</strong>
        </Link>
      </div>
      <div>
        <Link
          href={headerHref}
          className="truncate max-w-[200px] text-xs xs:text-base font-semibold text-app-secondary cursor-pointer uppercase xs:max-w-fit block px-2 py-1"
        >
          {headerName}
        </Link>
      </div>

      <Button type="primary" onClick={handleLogout}>
        {isAuthenticated ? 'Cerrar sesión' : 'Iniciar sesión'}
      </Button>
    </header>
  );
};

export default Header;

// const HeaderName = () => {
//   const params = useParams();

//   const degree = params.degree_id;
//   const course = params.course_id;
//   const faculty = params.faculty_id;
//   const university = params.slug;

//   const { data: degreeData } = useGetDegreeByIdQuery(degree as string, {
//     skip: !course,
//   });

//   const { data: facultyData } = useGetFacultyByIdQuery(faculty as string, {
//     skip: !degree,
//   });

//   const { data: universityData } = useGetUniversityBySlugQuery(
//     university as string,
//     {
//       skip: !faculty,
//     }
//   );

//   // Determinar qué mostrar basándose en la ruta
//   const getHeaderContent = () => {
//     // Si estamos en una página de curso, mostrar el nombre del curso
//     if (course && degreeData?.data) {
//       return {
//         name: degreeData.data.name,
//         href: appRoutes.facultades.carreras.detail(
//           university as string,
//           faculty as string,
//           degree as string
//         ),
//       };
//     }

//     // Si estamos en una página de carrera, mostrar el nombre de la carrera
//     if (degree && facultyData?.data) {
//       return {
//         name: facultyData.data.name,
//         href: appRoutes.facultades.detail(
//           university as string,
//           faculty as string
//         ),
//       };
//     }

//     if ((faculty || university) && universityData?.data) {
//       return {
//         name: universityData.data.name,
//         href: appRoutes.facultades.root(university as string),
//       };
//     }

//     return null;
//   };

//   const headerContent = getHeaderContent();

//   if (!headerContent) {
//     return null;
//   }

//   return (
//     <div>
//       <Link
//         href={headerContent.href}
//         className="truncate max-w-[200px] text-xs xs:text-base font-semibold text-app-secondary cursor-pointer uppercase xs:max-w-fit block px-2 py-1"
//       >
//         {headerContent.name}
//       </Link>
//     </div>
//   );
// };
