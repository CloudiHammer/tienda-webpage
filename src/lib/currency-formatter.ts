export const CurrencyFormatter = (amount: number) => {
    return amount.toLocaleString('es-ES', {
        style: 'currency',
        currency: 'EUR',
        minimumFractionDigits: 2,
    });
}
