import { render, screen } from '@testing-library/react';
import "@testing-library/jest-dom/extend-expect";

import { BrowserRouter } from 'react-router-dom';
import Home from './Home.jsx'

test('render home correctly', () => {
    render(
        <BrowserRouter>
            <Home />
        </BrowserRouter>
    );
    const HomeComponent = screen.queryByText('Chat TPG');
    expect(HomeComponent).toBeVisible();
});