import { TeacherClass } from '@/lib/interfaces/teacher-class.interface';
import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export interface TeacherClassState {
  teacherClass: TeacherClass | null;
}

const initialState: TeacherClassState = {
  teacherClass: null,
};

export const teacherClassSlice = createSlice({
  name: 'teacherClass',
  initialState,
  reducers: {
    setTeacherClass: (state, action: PayloadAction<TeacherClass>) => {
      state.teacherClass = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { actions: teacherClassActions, reducer: teacherClassReducer } =
  teacherClassSlice;

export default teacherClassReducer;
