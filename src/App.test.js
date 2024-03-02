import { render, screen } from '@testing-library/react';
import App from './App';
<<<<<<< HEAD
=======
import NoteBoard from './noteboard';
>>>>>>> 0a59abb43089a68d6a20f36c8079330a768ce985

test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
