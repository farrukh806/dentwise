import { SignUpButton as ClerkSignUpButton } from '@clerk/nextjs';
import { SignUpButtonProps } from '@clerk/types';
import { Button } from '../ui/button';
import { ReactNode } from 'react';

type ISignUpButtonProps = SignUpButtonProps & {
  children?: ReactNode;
};

const SignUpButton: React.FC<ISignUpButtonProps> = ({ children, ...props }) => {
  return (
    <ClerkSignUpButton mode="modal" {...props}>
      {children ? (
        children
      ) : (
        <Button variant={'default'} size={'sm'}>
          Sign Up
        </Button>
      )}
    </ClerkSignUpButton>
  );
};

export default SignUpButton;
