import { App, ModalFuncProps } from 'antd';

const defaultConfig: ModalFuncProps = {
  closable: true,
  okCancel: true,
  icon: null,
  centered: true,
  width: 636,
};

export const useAppModal = () => {
  const { modal: Modal } = App.useApp();

  const appModal = (config: ModalFuncProps) => {
    return Modal.confirm({
      ...defaultConfig, // Aplica configuración base
      ...config, // Sobrescribe con configuraciones específicas si se pasan
    });
  };

  return { appModal };
};
