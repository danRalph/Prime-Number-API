import { render, screen } from '@testing-library/react';
import ReactDOM from 'react-dom';
import Primes from './Primes';


it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Primes />, div);
});

it('renders input text', () => {
  render(<Primes />);
  expect(screen.getByText('Input a number:')).toBeInTheDocument();
});


