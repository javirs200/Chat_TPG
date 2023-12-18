import { render, screen } from '@testing-library/react';
import "@testing-library/jest-dom/extend-expect";
import Message from './Message';

describe('test del componente mensaje',()=>{

  test('render shomething', () => {
    const user = 'usuario'
    const message = 'este es mi mensaje'
    const type = 0
    const diference = 'Now'
    render(<Message user={user} message={message} type={type} timestamp={diference} />);
    const Message = screen.queryByText('este es mi mensaje');
    console.log("elemento mensaje en los tes",Message);
    expect(Message).toBeVisible();
  });


});