// __tests__/index.test.jsx

import Header from '@/components/Common/Header';
import Home from '@/pages/index';
import '@testing-library/jest-dom';
import { fireEvent, screen } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import { render } from './test-utils';

describe('Header and navigations', () => {
  beforeEach(() => {
    render(<Header />);
  });

  it('renders header logo', () => {
    expect(screen.getByText('Logo')).toBeInTheDocument();
  });

  it('renders header navigators', async () => {
    expect(screen.getByRole('link', { name: 'Home' })).toBeInTheDocument();
    expect(
      screen.getByRole('link', { name: 'Recruiting' })
    ).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Recruited' })).toBeInTheDocument();
  });

  it('renders header buttons', async () => {
    expect(screen.getByText('Recruit')).toBeInTheDocument();
    expect(screen.getByText('Log In')).toBeInTheDocument();
  });

  it('navigates to Recruiting page when "Recruiting" is clicked', () => {
    // const recruiting = screen.getByText('Recruiting');
    const recruiting = screen.getByRole('link', { name: 'Recruiting' });
    expect(recruiting).toBeInTheDocument();

    // TODO: nav 클릭 시 해당 페이지로 이동 => Element가 null로 잡히는 것 해결하기
    console.log(
      '------------SHOW_THE_RECRUITING_ELELMENT-------------------',
      recruiting
    );
    // recruiting.click();
  });
});

describe('Login modal', () => {
  beforeEach(() => {
    render(<Home />);
    act(() => {
      screen.getByText('Log In').click();
    });
  });

  it('shows signin modal when login button is clicked', () => {
    expect(screen.getByPlaceholderText('Email')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Password')).toBeInTheDocument();

    expect(screen.getByRole('button', { name: 'Sign in' })).toBeInTheDocument();

    expect(screen.getByText('OR')).toBeInTheDocument();

    expect(screen.getByText('Google')).toBeInTheDocument();
    expect(screen.getByText("Don't have any account?")).toBeInTheDocument();
  });

  it('toggle signin & signup modal', () => {
    act(() => {
      fireEvent.click(screen.getByText('Sign up'));
    });

    expect(screen.getByPlaceholderText('Name')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Email')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Password')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Confirm password')).toBeInTheDocument();

    expect(screen.getByRole('button', { name: 'Sign up' })).toBeInTheDocument();

    expect(screen.getByText('Have an account?')).toBeInTheDocument();

    act(() => {
      fireEvent.click(screen.getByText('Sign in'));
    });

    expect(screen.getByPlaceholderText('Email')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Password')).toBeInTheDocument();

    expect(screen.getByRole('button', { name: 'Sign in' })).toBeInTheDocument();

    expect(screen.getByText('OR')).toBeInTheDocument();

    expect(screen.getByText('Google')).toBeInTheDocument();
    expect(screen.getByText("Don't have any account?")).toBeInTheDocument();
  });

  it('close sign in modal when close button is clicked', () => {
    act(() => {
      fireEvent.click(screen.getByText('X'));
    });

    expect(screen.queryByPlaceholderText('Email')).not.toBeInTheDocument();
    expect(screen.queryByPlaceholderText('Password')).not.toBeInTheDocument();
  });

  // Validation
  it('check validation of signin input values', () => {
    const emailInput = screen.getByPlaceholderText('Email');
    const passwordInput = screen.getByPlaceholderText('Password');

    act(() => {});
  });
});
