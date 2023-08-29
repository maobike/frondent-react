import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { ListUsers } from '../../../../src/modules/users/components/ListUsers';
import { BrowserRouter } from 'react-router-dom';

describe('ListUsers Component', () => {
  it('This should render correctly', () => {

    const { container } = render(
      <BrowserRouter>
        <ListUsers />
      </BrowserRouter>
    );

    expect( container).toMatchSnapshot();
  });

//   it('debe manejar cambios en el input de búsqueda', () => {
//     const { getByPlaceholderText } = render(<ListUsers />);
//     const searchInput = getByPlaceholderText('Buscar...');
    
//     // Simula un cambio en el input de búsqueda
//     fireEvent.change(searchInput, { target: { value: 'John' } });
    
//     // Asegúrate de que el valor del input haya cambiado
//     expect(searchInput).toHaveValue('John');
//   });

});
