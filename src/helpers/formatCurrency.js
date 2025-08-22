

//formatea a moneda mx
export function formatToCurrency(amount, currency = 'MXN', locale = 'es-MX') {
    return new Intl.NumberFormat(locale, {
        style: 'currency',
        currency,
        minimumFractionDigits: 2,
    }).format(amount);
}


export function parseCurrencyToNumber(currencyString, locale = 'es-MX') {
    // Eliminar cualquier símbolo de moneda, espacios y caracteres especiales
    const numericValue = currencyString
        .replace(/[^\d.-]/g, ''); // Mantener solo números, el punto y el guion
    return parseFloat(numericValue);
}
