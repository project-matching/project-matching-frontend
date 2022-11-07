import { useState } from 'react';
import ForgotPasswordForm from '../AuthForm/ForgotPasswordForm';

import SigninForm from '../AuthForm/SigninForm';
import SignupForm from '../AuthForm/SignupForm';
import ModalLayout from './ModalLayout';

export type AuthFormTypes = 'signin' | 'signup' | 'changePassword';

const AuthModal = () => {
  const [AuthForm, setAuthForm] = useState<AuthFormTypes>('signin');

  const checkAuthForm = () => {
    switch (AuthForm) {
      case 'signin':
        return <SigninForm setAuthForm={setAuthForm} />;
      case 'signup':
        return <SignupForm setAuthForm={setAuthForm} />;
      case 'changePassword':
        return <ForgotPasswordForm setAuthForm={setAuthForm} />;
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
