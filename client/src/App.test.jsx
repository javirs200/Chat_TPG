import { render, screen  } from '@testing-library/react';
import App from './App.jsx'

test('render shomething', () => {
    render(<App />);
    const HomeComponent = screen.queryByText('Chat TPG');
    expect(HomeComponent)
  });