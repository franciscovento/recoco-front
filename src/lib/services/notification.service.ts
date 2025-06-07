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

const failedNotification = (message: string) => {
  return Swal.fire({
    text: message,
    showConfirmButton: false,
    toast: true,
    position: 'bottom-left',
    timer: 4000,
    icon: 'warning',
    customClass: 'app-error-notification',
  });
};

export { successNotification, failedNotification };
