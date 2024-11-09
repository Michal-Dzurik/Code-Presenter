import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('Renders App component', () => {
    render(<App />);
    const linkElement = screen.getByText(/Welcome in Code Presenter/i);
    expect(linkElement).toBeInTheDocument();
});
