import { render, screen  } from '@testing-library/react';
import "@testing-library/jest-dom/extend-expect";
import App from './App.jsx'


test('render shomething on App component', () => {
    render(<App />);
    const HomeComponent = screen.queryByText('Chat TPG');
    expect(HomeComponent).toBeVisible();
  });