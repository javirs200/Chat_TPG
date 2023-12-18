import { render } from '@testing-library/react';
import "@testing-library/jest-dom/extend-expect";
import Message from './Message.jsx';

describe('test del componente mensaje',()=>{

  const user = 'usuario'
  const message = 'este es mi mensaje'
  const type = 0
  const diference = 'Now'
  
  test('render messaje text', () => {
    const { container } = render(<Message user={user} message={message} type={type} timestamp={diference} />);
    const texto = container.querySelector('.texto');
    expect(texto).toBeVisible();
    expect(texto.innerHTML).toBe('este es mi mensaje');
  });

  test('render usuario Capitalized ', () => {
    const { container } = render(<Message user={user} message={message} type={type} timestamp={diference} />);
    const nick = container.querySelector('.nick');
    expect(nick).toBeVisible();
    expect(nick.innerHTML).toBe('Usuario');
  });

  test('render diference text', () => {
    const { container } = render(<Message user={user} message={message} type={type} timestamp={diference} />);
    const timestamp = container.querySelector('.timestamp');
    expect(timestamp).toBeVisible();
    expect(timestamp.innerHTML).toBe('Now');
  });

  test('have correct class', () => {
    const { container } = render(<Message user={user} message={message} type={type} timestamp={diference} />);
    expect(container).toBeVisible();
    expect(container.firstChild.classList.contains('Messaje0')).toBe(true)
  });

});