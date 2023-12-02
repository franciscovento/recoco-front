import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const customSwal = withReactContent(Swal);

const appModal = customSwal.mixin({
  background: 'transparent',
  showConfirmButton: false,
  showDenyButton: false,
  showCloseButton: false,
  showCancelButton: false,
  customClass: {
    htmlContainer: 'app-modal-container',
  },
});

const confirmModal = (
  message: string,
  confirmButtonText = 'Aceptar',
  cancelButtonText = 'Cancelar'
) => {
  return new Promise((resolve) => {
    Swal.fire({
      text: message,
      icon: 'warning',
      iconColor: '#EA4959',
      showCancelButton: true,
      confirmButtonText: confirmButtonText,
      cancelButtonText: cancelButtonText,
      confirmButtonColor: '#EA4959',
      reverseButtons: true,
      showCloseButton: true,
    }).then((resp) => {
      if (resp.isConfirmed) {
        resolve(true);
      } else {
        resolve(false);
      }
    });
  });
};

export { appModal, confirmModal };
