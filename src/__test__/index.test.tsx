// __tests__/index.test.jsx

import Header from '@/components/Headers/Header';
import '@testing-library/jest-dom';
import { login } from 'mocks/handlers';
import { server } from 'mocks/server';
import { act } from 'react-dom/test-utils';
import { fireEvent, render, screen } from './test-utils';

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
    expect(screen.getByText('새 프로젝트')).toBeInTheDocument();
    expect(screen.getByText('로그인')).toBeInTheDocument();
  });

  it('navigates to Recruiting page when "Recruiting" is clicked', () => {
    // const recruiting = screen.getByText('Recruiting');
    const recruiting = screen.getByRole('link', { name: 'Recruiting' });
    expect(recruiting).toBeInTheDocument();

    // TODO: nav 클릭 시 해당 페이지로 이동 => Element가 null로 잡히는 것 해결하기
    // console.log(
    //   '------------SHOW_THE_RECRUITING_ELELMENT-------------------',
    //   recruiting
    // );
    // recruiting.click();
  });
});

describe('Login modal', () => {
  beforeEach(() => {
    render(<Header />);
    act(() => {
      screen.getAllByText('로그인')[0].click();
    });
  });

  it('shows signin modal when login button is clicked', () => {
    expect(screen.getByPlaceholderText('Email')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Password')).toBeInTheDocument();

    expect(
      screen.getAllByRole('button', { name: '로그인' })[1]
    ).toBeInTheDocument();

    expect(screen.getByText('OR')).toBeInTheDocument();

    expect(screen.getByText('Google', { exact: false })).toBeInTheDocument();
    expect(screen.getByText('계정이 없나요?')).toBeInTheDocument();
  });

  it('toggle signin & signup modal', () => {
    act(() => {
      fireEvent.click(screen.getByText('회원가입'));
    });

    expect(screen.getByPlaceholderText('Name')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Email')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Password')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Confirm password')).toBeInTheDocument();

    expect(
      screen.getByRole('button', { name: '회원가입' })
    ).toBeInTheDocument();

    expect(screen.getByText('계정이 있나요?')).toBeInTheDocument();

    act(() => {
      fireEvent.click(screen.getAllByText('로그인')[1]);
    });

    expect(screen.getByPlaceholderText('Email')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Password')).toBeInTheDocument();

    expect(
      screen.getAllByRole('button', { name: '로그인' })[1]
    ).toBeInTheDocument();

    expect(screen.getByText('OR')).toBeInTheDocument();

    expect(screen.getByText('Google', { exact: false })).toBeInTheDocument();
    expect(screen.getByText('계정이 없나요?')).toBeInTheDocument();
    expect(screen.getByText('비밀번호를 잊으셨나요?')).toBeInTheDocument();
  });

  it('close sign in modal when close button is clicked', () => {
    act(() => {
      fireEvent.click(screen.getByText('X'));
    });

    expect(screen.queryByPlaceholderText('Email')).not.toBeInTheDocument();
    expect(screen.queryByPlaceholderText('Password')).not.toBeInTheDocument();
  });

  // Validation
  it('check validation of signin input values', async () => {
    // const emailInput = screen.getByPlaceholderText('Email');
    // const passwordInput = screen.getByPlaceholderText('Password');

    server.use(login);
    act(() => {});
  });
});
