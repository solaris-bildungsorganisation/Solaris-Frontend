import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import App from './App';
import PATHS from './routes/paths';
import VerifyEmail from './pages/VerifyEmail';
import ForgotPassword from './pages/ForgotPassword';
import ChangePassword from './pages/ChangePassword';
import { getPasswordChecks } from './components/PasswordStrengthMeter';

test('redirects / to /login by default', () => {
  render(
    <MemoryRouter initialEntries={[PATHS.ROOT]}>
      <App />
    </MemoryRouter>
  );
  expect(
    screen.getByRole('heading', { name: /welcome back/i })
  ).toBeInTheDocument();
  expect(
    screen.getByRole('link', { name: /forgot password\?/i })
  ).toHaveAttribute('href', PATHS.FORGOT_PASSWORD);
  expect(screen.getByRole('link', { name: /sign up/i })).toHaveAttribute(
    'href',
    PATHS.SIGNUP
  );
});

test('renders Create Your Account heading and password strength meter on /signup route', () => {
  render(
    <MemoryRouter initialEntries={[PATHS.SIGNUP]}>
      <App />
    </MemoryRouter>
  );
  const headingElement = screen.getByRole('heading', {
    name: /create your account/i,
  });
  expect(headingElement).toBeInTheDocument();
  expect(
    screen.getByText(
      /create your account and take the first step toward new opportunities\./i
    )
  ).toBeInTheDocument();
  const progressbar = screen.getByRole('progressbar', {
    name: /password strength/i,
  });
  expect(progressbar).toHaveAttribute('aria-valuenow', '0');
  expect(screen.getByText('8 characters minimum')).toBeInTheDocument();
  expect(screen.getByText('a number')).toBeInTheDocument();
  expect(screen.getByText('a symbol')).toBeInTheDocument();
});

test('getPasswordChecks computes minLength, hasNumber, hasSymbol, and score', () => {
  expect(getPasswordChecks('')).toEqual({
    minLength: false,
    hasNumber: false,
    hasSymbol: false,
    score: 0,
  });
  expect(getPasswordChecks('abcdefgh')).toEqual({
    minLength: true,
    hasNumber: false,
    hasSymbol: false,
    score: 1,
  });
  expect(getPasswordChecks('abcdefg1')).toEqual({
    minLength: true,
    hasNumber: true,
    hasSymbol: false,
    score: 2,
  });
  expect(getPasswordChecks('abcdefg1!')).toEqual({
    minLength: true,
    hasNumber: true,
    hasSymbol: true,
    score: 3,
  });
});

test('renders Verify Your Email Address page with fallback email and 6 OTP inputs', () => {
  render(<VerifyEmail />);
  expect(
    screen.getByRole('heading', { name: /verify your email address/i })
  ).toBeInTheDocument();
  expect(screen.getByText('username@gmail.com')).toBeInTheDocument();
  expect(screen.getByLabelText('Digit 1 of 6')).toBeInTheDocument();
  expect(screen.getByLabelText('Digit 6 of 6')).toBeInTheDocument();
});

test('renders Forgot Password? page with email input, Log in link, and Continue button', () => {
  render(<ForgotPassword />);
  expect(
    screen.getByRole('heading', { name: /forgot password\?/i })
  ).toBeInTheDocument();
  expect(
    screen.getByText(/please enter your email to reset your password/i)
  ).toBeInTheDocument();
  expect(screen.getByLabelText(/email/i)).toHaveAttribute(
    'placeholder',
    'Enter your email'
  );
  expect(screen.getByRole('link', { name: /log in/i })).toHaveAttribute(
    'href',
    PATHS.LOGIN
  );
  expect(
    screen.getByRole('button', { name: /continue/i })
  ).toBeInTheDocument();
});

test('renders Change Password page with New Password, Confirm Password, and Change Password button', () => {
  render(<ChangePassword />);
  expect(
    screen.getByRole('heading', { name: /change password/i })
  ).toBeInTheDocument();
  expect(
    screen.getByText(/please enter your new password\./i)
  ).toBeInTheDocument();
  expect(screen.getByLabelText(/^new password$/i)).toHaveAttribute(
    'placeholder',
    'Enter your new password'
  );
  expect(screen.getByLabelText(/^confirm password$/i)).toHaveAttribute(
    'placeholder',
    'confirm your new password'
  );
  expect(
    screen.getByRole('button', { name: /^change password$/i })
  ).toBeInTheDocument();
});
