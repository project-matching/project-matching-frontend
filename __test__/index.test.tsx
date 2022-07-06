// __tests__/index.test.jsx

import Header from '@/components/Common/Header';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';

describe('Header', () => {
  it('renders header logo', () => {
    render(<Header />);

    const heading = screen.getByText('Logo');

    expect(heading).toBeInTheDocument();
  });
});
