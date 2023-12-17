import { render, screen } from '@testing-library/react';
import App from './App.js'

test('Learn React link is visible', () => {
    render(<App />);
    const HomeComponent = screen.queryByText('Chat TPG');
    expect(HomeComponent).toBeVisible();
  });