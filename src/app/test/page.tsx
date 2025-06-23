'use client';
import React from 'react';
import { ResourceDrawer } from '@/ui/organisms/drawers/ResourceDrawer';

const Page = () => {
  return (
    <div>
      <ResourceDrawer
        buttonProps={{
          size: 'small',
          variant: 'outlined',
          color: 'primary',
        }}
        teacher_id={1}
        course_id={1}
      />
    </div>
  );
};

export default Page;
