import React from 'react';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { FormUser } from '../../../../src/modules/users/components/FormUser';
import { BrowserRouter } from 'react-router-dom';

describe('Test in FormUser component', () => { 
    const toggle = jest.fn();
    const refreshList = jest.fn();
    const user = {
        id: 1,
        name: 'John Doe',
        email: 'johndoe@example.com',
        phone: '1234567890',
        status: "true",
    };

    test('should show title create new user in the component', () => { 

        const { getByTestId } = render(
            <BrowserRouter>
                <FormUser toggle={toggle} refreshList={refreshList} />
            </BrowserRouter>
        );

        const title = 'Crear Usuario';
        expect( getByTestId('titleApp').innerHTML ).toContain(title)
    })

    test('should show title edit user in the component', () => { 
        const { getByTestId } = render(
            <BrowserRouter>
                <FormUser toggle={toggle} refreshList={refreshList} user={user} />
            </BrowserRouter>
        );

        const title = 'Editar Usuario';
        expect( getByTestId('titleApp').innerHTML ).toContain(title)
    })

    test('should test if name fields have their data', () => { 
        const { getByDisplayValue } = render(
            <BrowserRouter>
                <FormUser toggle={toggle} refreshList={refreshList} user={user} />
            </BrowserRouter>
        );

        const inputName = getByDisplayValue('John Doe');
        userEvent.type(inputName, 'prueba');
        const nameInput = inputName.value;
        expect(nameInput).toBe(user.name)
    })

    test('should test if email fields have their data', () => { 
        const { getByDisplayValue } = render(
            <BrowserRouter>
                <FormUser toggle={toggle} refreshList={refreshList} user={user} />
            </BrowserRouter>
        );

        const inputEmail = getByDisplayValue('johndoe@example.com');
        userEvent.type(inputEmail, 'prueba');
        const emailInput = inputEmail.value;
        expect(emailInput).toBe(user.email)
    })

    test('should test if phone fields have their data', () => { 
        const { getByDisplayValue } = render(
            <BrowserRouter>
                <FormUser toggle={toggle} refreshList={refreshList} user={user} />
            </BrowserRouter>
        );

        const inputPhone = getByDisplayValue('1234567890');
        userEvent.type(inputPhone, 'prueba');
        const phoneInput = inputPhone.value;
        expect(phoneInput).toBe(user.phone)
    })

    test('should test if status fields have their data', () => { 
        const { getByDisplayValue } = render(
            <BrowserRouter>
                <FormUser toggle={toggle} refreshList={refreshList} user={user} />
            </BrowserRouter>
        );

        const inputStatus = getByDisplayValue('Activo');
        userEvent.type(inputStatus, 'prueba');
        const statusInput = inputStatus.value;
        expect(statusInput).toContain(user.status)
    })
})