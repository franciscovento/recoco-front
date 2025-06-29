export const appRoutes = {
  inicio: '/',
  auth: {
    forgot_password: '/auth/forgot-password',
    reset_password: '/auth/reset-password',
  },
  facultades: {
    root: (university_slug: string) => `/${university_slug}/facultades`,
    detail: (university_slug: string, faculty_id: string | number) =>
      `/${university_slug}/facultades/${faculty_id}`,
    carreras: {
      detail: (
        university_slug: string,
        faculty_id: string | number,
        degree_id: string | number
      ) => `/${university_slug}/facultades/${faculty_id}/carreras/${degree_id}`,
      cursos: {
        detail: (
          university_slug: string,
          faculty_id: string | number,
          degree_id: string | number,
          course_id: string | number
        ) =>
          `/${university_slug}/facultades/${faculty_id}/carreras/${degree_id}/cursos/${course_id}`,
        profesores: {
          detail: (
            university_slug: string,
            faculty_id: string | number,
            degree_id: string | number,
            course_id: string | number,
            teacher_id: string | number
          ) =>
            `/${university_slug}/facultades/${faculty_id}/carreras/${degree_id}/cursos/${course_id}/profesores/${teacher_id}`,
        },
      },
    },
  },
};
