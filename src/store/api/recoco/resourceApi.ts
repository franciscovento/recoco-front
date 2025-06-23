import { ResourceResponse } from '@/lib/interfaces/resource.interface';
import { recocoApi } from '../recocoApi';
import { ApiResponse } from '@/lib/interfaces/apiResponse.interface';

const resourceModel = recocoApi.injectEndpoints({
  endpoints: (builder) => ({
    deleteResource: builder.mutation<
      ResourceResponse,
      { id: number; teacher_id: number; course_id: number }
    >({
      query: ({ id }) => ({
        url: `/resource/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: (result, error, { id, teacher_id, course_id }) => [
        {
          type: 'Resource',
          id,
        },
        {
          type: 'TeacherClassResource',
          id: `${teacher_id}-${course_id}`,
        },
      ],
    }),
    reportResource: builder.mutation<
      ApiResponse<{ id: number }>,
      { id: number; teacher_id: number; course_id: number }
    >({
      query: ({ id }) => ({
        url: `/resource/${id}/report`,
        method: 'POST',
      }),
      invalidatesTags: (result, error, { id, teacher_id, course_id }) => [
        {
          type: 'Resource',
          id,
        },
        {
          type: 'TeacherClassResource',
          id: `${teacher_id}-${course_id}`,
        },
      ],
    }),
    deleteReport: builder.mutation<
      ApiResponse<{ id: number }>,
      { id: number; teacher_id: number; course_id: number }
    >({
      query: ({ id }) => ({
        url: `/resource/${id}/report`,
        method: 'DELETE',
      }),
      invalidatesTags: (result, error, { id, teacher_id, course_id }) => [
        {
          type: 'Resource',
          id,
        },
        {
          type: 'TeacherClassResource',
          id: `${teacher_id}-${course_id}`,
        },
      ],
    }),
  }),
});

export const {
  useDeleteResourceMutation,
  useReportResourceMutation,
  useDeleteReportMutation,
} = resourceModel;

export default resourceModel;
