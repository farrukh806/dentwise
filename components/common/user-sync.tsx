'use client';
import { syncUser } from '@/lib/actions/user';
import { useUser } from '@clerk/nextjs';
import { useEffect } from 'react';

const UserSync = () => {
  const { isLoaded, isSignedIn } = useUser();
  useEffect(() => {
    const synchronizeUser = async () => {
      if (isLoaded && isSignedIn) {
        await syncUser();
      }
    };
    synchronizeUser();
  }, [isLoaded, isSignedIn]);
  return null;
};

export default UserSync;
