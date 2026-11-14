/**
 * Gastos compartidos (UD03): la liquidación de las deudas. No cambies nada de este
 * archivo: tus cuentas le pasan los balances y la vista muestra los pagos.
 */

/**
 * Propone los pagos que dejan todos los balances a cero. El que más debe
 * paga al que más ha adelantado, y se repite con lo que queda.
 * @param {Map<number, number>} balances - Id de cada persona y su balance en céntimos.
 * @returns {Object[]} Los pagos, como { de, a, importe }.
 */
function liquidar(balances) {
    let deudor = null;
    let acreedor = null;
    for (const [id, saldo] of balances) {
        if (saldo < 0 && (deudor === null || saldo < balances.get(deudor))) {
            deudor = id;
        }
        if (saldo > 0 && (acreedor === null || saldo > balances.get(acreedor))) {
            acreedor = id;
        }
    }
    if (deudor === null || acreedor === null) {
        return [];
    }
    const importe = Math.min(-balances.get(deudor), balances.get(acreedor));
    const resto = new Map(balances);
    resto.set(deudor, resto.get(deudor) + importe);
    resto.set(acreedor, resto.get(acreedor) - importe);
    const pagos = liquidar(resto);
    pagos.unshift({ de: deudor, a: acreedor, importe: importe });
    return pagos;
}
