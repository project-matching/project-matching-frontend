import { useState } from 'react';
import PasswordChangeForm from '../Forms/PasswordChangeForm';
import SigninForm from '../Forms/SigninForm';
import SignupForm from '../Forms/SignupForm';
import ModalLayout from './ModalLayout';

export type AuthFormTypes = 'signin' | 'signup' | 'changePassword';

const AuthModal = () => {
  // TODO: find password
  const [AuthForm, setAuthForm] = useState<AuthFormTypes>('signin');

  const checkAuthForm = () => {
    switch (AuthForm) {
      case 'signin':
        return <SigninForm setAuthForm={setAuthForm} />;
      case 'signup':
        return <SignupForm setAuthForm={setAuthForm} />;
      case 'changePassword':
        return <PasswordChangeForm setAuthForm={setAuthForm} />;
      default:
        return <SigninForm setAuthForm={setAuthForm} />;
    }
  };

  return (
    <>
      <ModalLayout modalContent="AuthModal">{checkAuthForm()}</ModalLayout>
    </>
  );
};

export default AuthModal;
