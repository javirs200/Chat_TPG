import { render, screen } from '@testing-library/react';
import Messaje from './Message.jsx'

test('render shomething', () => {
    const user='usuario'
    const message='este es mi mensaje'
    const type=0 
    render(<Messaje user={user} message={message} type={type}/>);
    // const HomeComponent = screen.queryByText('Chat TPG');
    // expect(HomeComponent).toBeVisible();
  });