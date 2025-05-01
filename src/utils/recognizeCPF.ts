const validateCPF = (cpf: string): boolean => {
    const sanitizedCPF = cpf.replace(/[^\d]/g, '');

    if (sanitizedCPF.length !== 11) {
        return false;
    }

    if (/^(\d)\1{10}$/.test(sanitizedCPF)) {
        return false;
    }

    let sum = 0;
    for (let i = 0; i < 9; i += 1) {
        sum += parseInt(sanitizedCPF.charAt(i), 10) * (10 - i);
    }

    let remainder = sum % 11;
    const checkDigit1 = remainder < 2 ? 0 : 11 - remainder;

    if (parseInt(sanitizedCPF.charAt(9), 10) !== checkDigit1) {
        return false;
    }

    sum = 0;
    for (let i = 0; i < 10; i += 1) {
        sum += parseInt(sanitizedCPF.charAt(i), 10) * (11 - i);
    }

    remainder = sum % 11;
    const checkDigit2 = remainder < 2 ? 0 : 11 - remainder;

    if (parseInt(sanitizedCPF.charAt(10), 10) !== checkDigit2) {
        return false;
    }

    return true;
};

export const extractValidCPFs = (text: string): string[] => {
    const cpfRegex = /(\d{3}\.?\d{3}\.?\d{3}-?\d{2})/g;
    const potentialCPFs = text.match(cpfRegex) || [];
    const validCPFs = potentialCPFs.filter((cpf) => validateCPF(cpf));

    return validCPFs;
};
