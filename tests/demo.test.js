
describe('demo component', () => {
    test('this test should not fail', () => {
    
        // 1. Inicialización
        const message1 = 'Hola mundo'
    
        // 2. Estimulo
        const message2 = message1.trim();
    
        // 3. 
        expect( message1 ).toBe(message2);
    
    })

})
