import React, { useState } from 'react';
import { Button, ButtonProps, Drawer, Spin, Tooltip } from 'antd';
import { useGetResourcesQuery } from '@/store/api/recoco/teacherClassApi';
import { getCategoryResourceName } from '@/lib/helpers/getCategoryResourceName';
import useResourceForm from '@/lib/hooks/modals/useResourceForm';
import { useRequireAuth } from '@/lib/hooks/useRequireAuth';
import {
  DeleteOutlined,
  FlagFilled,
  FlagOutlined,
  PlusOutlined,
} from '@ant-design/icons';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import {
  useDeleteReportMutation,
  useDeleteResourceMutation,
  useReportResourceMutation,
} from '@/store/api/recoco/resourceApi';
import useConfirm from '@/lib/hooks/modals/useAppNotification';
import {
  Resource,
  ResourceCategory,
} from '@/lib/interfaces/resource.interface';
import { groupBy } from '@/lib/helpers/groupBy';

interface ResourceDrawerProps {
  teacher_id: number;
  course_id: number;
  buttonText?: string;
  buttonProps?: ButtonProps;
  children?: React.ReactNode;
}

const ResourceDrawer: React.FC<ResourceDrawerProps> = ({
  teacher_id,
  course_id,
  buttonProps,
  children,
}) => {
  const user = useSelector((state: RootState) => state.ui.user);
  const isAuthenticated = useSelector(
    (state: RootState) => state.ui.isAuthenticated
  );

  const { confirm, notification } = useConfirm();
  const [deleteResource] = useDeleteResourceMutation();
  const [reportResource] = useReportResourceMutation();
  const [deleteReport] = useDeleteReportMutation();
  const { handleOpenModal } = useRequireAuth();
  const { showResourceFormModal } = useResourceForm();
  const [open, setOpen] = useState(false);

  // La petición se ejecuta solo cuando open es true
  const {
    data: resourcesData,
    isLoading,
    error,
  } = useGetResourcesQuery(
    { teacher_id, course_id },
    {
      skip: !open, // Solo hace la petición cuando el drawer está abierto
      refetchOnMountOrArgChange: false,
      refetchOnFocus: false,
    }
  );

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  const handleDeleteResource = async (id: number) => {
    confirm({
      title: 'Eliminar recurso',
      content: '¿Estás seguro de querer eliminar este recurso?',
      onOk: async () => {
        try {
          await deleteResource({ id, teacher_id, course_id });
          notification({
            type: 'success',
            message: 'Recurso eliminado correctamente',
          });
        } catch (error) {
          notification({
            type: 'error',
            message: 'Error al eliminar recurso',
          });
        }
      },
    });
  };

  const handleReportResource = async (id: number) => {
    confirm({
      title: 'Reportar recurso',
      content:
        'Reporta este recurso si consideras que no es útil para la comunidad, no es de calidad o no es relevante para el curso.',
      onOk: async () => {
        try {
          await reportResource({ id, teacher_id, course_id }).unwrap();
          notification({
            type: 'success',
            message: 'Recurso reportado correctamente',
          });
        } catch (error) {
          notification({
            type: 'error',
            message: 'Error al reportar recurso',
          });
        }
      },
    });
  };

  const handleDeleteReport = async (id: number) => {
    confirm({
      title: 'Quitar reporte',
      content: '¿Estás seguro de querer quitar el reporte de este recurso?',
      onOk: async () => {
        try {
          await deleteReport({ id, teacher_id, course_id });
          notification({
            type: 'success',
            message: 'Reporte quitado correctamente',
          });
        } catch (error) {
          notification({
            type: 'error',
            message: 'Error al quitar reporte',
          });
        }
      },
    });
  };

  // Agrupar recursos por categoría
  const resources = resourcesData?.data || [];

  const groupedResources =
    resources.length > 0 ? groupBy(resources, 'category') : {};

  return (
    <>
      <Button onClick={showDrawer} {...buttonProps}>
        {children}
      </Button>
      <Drawer
        title="Recursos útiles"
        closable={{ 'aria-label': 'Close Button' }}
        onClose={onClose}
        open={open}
        width={400}
        loading={isLoading}
      >
        {error ? (
          <div className="text-red-500 text-center">
            Error al cargar los recursos
          </div>
        ) : resources.length > 0 ? (
          <div className="h-full flex flex-col justify-between">
            <div className="flex flex-col gap-4  h-[calc(100%_-_50px)] overflow-y-auto">
              <div>
                <span className="text-xs text-app-text">
                  Nota: Estas urls son subidas por la comunidad, no podemos
                  asegurar que sean seguras, por favor, revisa bien el origen
                  antes de ingresar. No podemos evitar los trolls.
                </span>
              </div>
              {Object.keys(groupedResources).map((category) => (
                <div key={category} className="w-full">
                  <h3 className="text-base font-bold mb-1">
                    {getCategoryResourceName(category as ResourceCategory)}
                  </h3>
                  <div className="flex flex-col gap-2">
                    {groupedResources[category as ResourceCategory]?.map(
                      (resource: Resource) => (
                        <div className="flex flex-col" key={resource.id}>
                          <div className="flex items-center justify-between gap-2">
                            <a
                              href={resource.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-xs text-blue-500 underline hover:text-blue-700"
                            >
                              {resource.name}
                            </a>
                            <div className="flex items-center gap-2">
                              {resource.created_by !== user?.id && (
                                <Tooltip
                                  title={
                                    resource.is_reported_by_user
                                      ? 'Quitar reporte'
                                      : 'Reportar recurso'
                                  }
                                  placement="right"
                                >
                                  {resource.is_reported_by_user ? (
                                    <button
                                      aria-label="Reportar recurso"
                                      onClick={() =>
                                        handleDeleteReport(resource.id)
                                      }
                                    >
                                      <FlagFilled className="!text-red-400" />
                                    </button>
                                  ) : (
                                    <button
                                      aria-label="Reportar recurso"
                                      onClick={() =>
                                        handleReportResource(resource.id)
                                      }
                                    >
                                      <FlagOutlined className="!text-red-400" />
                                    </button>
                                  )}
                                </Tooltip>
                              )}
                              {isAuthenticated &&
                                resource.created_by === user?.id && (
                                  <Tooltip
                                    title="Eliminar recurso"
                                    placement="right"
                                  >
                                    <button
                                      aria-label="Eliminar recurso"
                                      onClick={() =>
                                        handleDeleteResource(resource.id)
                                      }
                                    >
                                      <DeleteOutlined />
                                    </button>
                                  </Tooltip>
                                )}
                            </div>
                          </div>
                          <span className="text-[9px] text-app-text truncate block">
                            {resource.url}
                          </span>
                        </div>
                      )
                    )}
                  </div>
                </div>
              ))}
            </div>
            <div className="text-center">
              <Button
                onClick={() =>
                  handleOpenModal((anonymous) => {
                    showResourceFormModal({
                      course_id,
                      teacher_id,
                      isAnonyms: anonymous,
                    });
                  })
                }
                icon={<PlusOutlined />}
                type="primary"
              >
                Nuevo recurso
              </Button>
            </div>
          </div>
        ) : (
          <div className="text-gray-500 text-center">
            No hay recursos disponibles
          </div>
        )}
      </Drawer>
    </>
  );
};

export { ResourceDrawer };

/*
Ejemplo de uso:

import { ResourceDrawer } from '@/ui/organisms/drawers/ResourceDrawer';

// En tu componente:
<ResourceDrawer 
  teacher_id={1} 
  course_id={2} 
  buttonText="Ver Recursos" 
  buttonType="primary" 
/>

// O usando parámetros dinámicos:
const params = useParams();
<ResourceDrawer 
  teacher_id={+params.teacher_id} 
  course_id={+params.course_id} 
/>
*/
