// __tests__/index.test.jsx

import Header from '@/components/Common/Header';
import '@testing-library/jest-dom';
import { screen } from '@testing-library/react';
import { render } from './test-utils';

describe('Header', () => {
  it('renders header logo', () => {
    render(<Header />);

    const heading = screen.getByText('Logo');

    expect(heading).toBeInTheDocument();
  });
});
