export const routes = {
  home: '/',
  auth: {
    forgot_password: '/auth/forgot-password',
    reset_password: '/auth/reset-password',
  },
  degrees: {
    degree_id: (university_id: string, degree_id: string) =>
      `/${university_id}/carreras/${degree_id}`,
  },
  courses: {
    course_id: (university_id: string, course_id: string) =>
      `/${university_id}/cursos/${course_id}`,
    teacher: {
      teacher_id: (
        university_id: string,
        course_id: string,
        teacher_id: string
      ) => `/${university_id}/cursos/${course_id}/profesores/${teacher_id}`,
    },
  },
};
