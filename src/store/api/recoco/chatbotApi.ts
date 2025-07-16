import { ApiResponse } from '@/lib/interfaces/apiResponse.interface';
import { recocoApi } from '../recocoApi';

const chatbotModel = recocoApi.injectEndpoints({
  endpoints: (builder) => ({
    askQuestion: builder.mutation<
      ApiResponse<{ answer: string }>,
      { query: string; sessionId: string; facultyId: number }
    >({
      query: (body) => ({
        url: '/chatbot',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Chatbot'],
    }),
  }),
});

export const { useAskQuestionMutation } = chatbotModel;
