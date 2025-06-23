import Swal from 'sweetalert2';

const successNotification = (message: string) => {
  try {
    return Swal.fire({
      text: message,
      showConfirmButton: false,
      toast: true,
      position: 'top-end',
      timer: 4000,
      icon: 'success',
      customClass: {
        popup: 'app-success-notification',
      },
    });
  } catch (error) {
    console.error('Error showing success notification:', error);
    // Fallback: usar alert nativo si SweetAlert falla
    alert(`✅ ${message}`);
  }
};

const failedNotification = (message: string) => {
  try {
    return Swal.fire({
      text: message,
      showConfirmButton: false,
      toast: true,
      position: 'top-end', // Consistente con success
      timer: 4000,
      icon: 'error', // Cambiado de 'warning' a 'error' para consistencia
      customClass: {
        popup: 'app-error-notification',
      },
    });
  } catch (error) {
    console.error('Error showing failed notification:', error);
    // Fallback: usar alert nativo si SweetAlert falla
    alert(`❌ ${message}`);
  }
};

export { successNotification, failedNotification };
