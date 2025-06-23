import { App, ModalFuncProps } from 'antd';
import { ArgsProps } from 'antd/es/notification';
import clsx from 'clsx';

const useConfirm = () => {
  const { modal, notification: nt } = App.useApp();

  const notification = (args: ArgsProps) => {
    nt.open({
      closable: false,
      placement: 'bottomLeft',
      ...args,
    });
  };

  const confirm = (args: ModalFuncProps) => {
    return new Promise((resolve) => {
      const { onOk, onCancel, content, ...rest } = args;
      modal.confirm({
        className: 'app-confirm',
        closable: false,
        okCancel: true,
        centered: true,
        content: <div className="pb-2">{content}</div>,
        okText: 'Si, seguro',
        cancelText: 'Cancelar',
        ...rest,
        onOk: async () => {
          onOk && (await onOk());
          resolve(true);
        },
        onCancel: async () => {
          onCancel && (await onCancel());
          resolve(false);
        },
      });
    });
  };
  return {
    confirm,
    notification,
  };
};

export default useConfirm;
