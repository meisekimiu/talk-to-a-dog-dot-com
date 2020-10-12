import React from 'react';
import { render } from '@testing-library/react';
import DogHeader from './DogHeader';

test('renders properly', () => {
  const { getByText } = render(<DogHeader />);
  const description = getByText(/TalkToADog.com/i);
  expect(description).toBeInTheDocument();
});
