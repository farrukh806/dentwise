import React, { ReactNode } from 'react';
import { Button } from '../ui/button';
import { SignInButton as ClerkSignInButton } from '@clerk/nextjs';
import { SignInButtonProps } from '@clerk/types';

type ISignInButtonProps = SignInButtonProps & {
  children?: ReactNode;
};
const SignInButton: React.FC<ISignInButtonProps> = ({ children, ...props }) => {
  return (
    <ClerkSignInButton mode="modal" {...props}>
      {children ? (
        children
      ) : (
        <Button variant={'default'} size={'sm'}>
          Sign In
        </Button>
      )}
    </ClerkSignInButton>
  );
};

export default SignInButton;
