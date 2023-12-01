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

export { appModal };
