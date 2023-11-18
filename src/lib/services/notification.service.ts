import Swal from 'sweetalert2';

const successNotification = (message: string) => {
  return Swal.fire({
    text: message,
    showConfirmButton: false,
    toast: true,
    position: 'top-end',
    timer: 4000,
    icon: 'success',
  });
};

export { successNotification };
