const pow = require("../pow");

describe('Функция pow', () => {
    it('возвращает 16 при аргументах 4 и 2', () => {
        const result = pow(4, 2);
        expect(result).toBe(16);
    });

    it('возвращает 9 при аргументах 3 и 2', () => {
        const result = pow(3, 2);
        expect(result).toBe(9);
    });

    it('возвращает 27 при аргументах 3 и 3', () => {
        const result = pow(3, 3);
        expect(result).toBe(27);
    });

    it('возвращает null при аргументах null и 3', () => {
        const result = pow(null, 3);
        expect(result).toBeNull();
    });

    it('возвращает null при аргументах 5 и null', () => {
        const result = pow(5, null);
        expect(result).toBeNull();
        expect(result).not.toBe(1);
    });
});


// Виды тестирования
// - Статическое 
// - Unit (модульное)
// - Интеграционные 
// - End-to-end (e2e, сквозное)
