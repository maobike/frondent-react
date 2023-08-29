import React from 'react';
import { render } from '@testing-library/react';
import NavBar from './../../../../src/modules/shared/components/NavBar'; // Asegúrate de que la ruta sea correcta
import { BrowserRouter } from 'react-router-dom';

describe('Test in NavBar component', () => { 

    test('Navbar renders correctly', () => {
        const { container } = render(
            <BrowserRouter>
                <NavBar />
            </BrowserRouter>
        );
    
        expect( container).toMatchSnapshot();
    });

    test('should show title component', () => { 

        const { getByText, getByTestId } = render(
            <BrowserRouter>
                <NavBar />
            </BrowserRouter>
        );

        const title = 'Test Corserva';
        expect( getByText(title) ).toBeTruthy();
        expect( getByTestId('titleApp').innerHTML ).toContain(title)
    })
})