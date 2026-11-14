/*
 * Gastos compartidos · Entrega 2 · cuentas.js
 *
 * Este archivo debe contener las funciones que hacen las cuentas del viaje.
 * Escríbelas debajo de este comentario, con los nombres de la lista y los parámetros
 * en ese orden: las pruebas de la página y vista.js las llaman así.
 *
 * Los datos están en datos.js. Cada persona es un objeto con id, nombre y email, y
 * cada gasto, un objeto con id, concepto, importe (en céntimos), pagador (el id de
 * quien lo pagó), participantes (los ids de quienes lo comparten), categoria y
 * fecha. Sus datos se leen con un punto: gasto.importe, persona.nombre.
 *
 * En esta entrega los gastos se reparten a partes iguales entre sus participantes.
 *
 * Para todas las funciones:
 *   - NINGUNA cambia las listas que recibe (1 punto · RA4.c);
 *   - se escriben con métodos de array (map, filter, reduce, forEach, includes,
 *     indexOf...), SIN bucles for, for...of ni while, salvo tabla.
 *
 *
 * Apartado 1 · total y pagadoPor · 1,5 puntos · RA4.e
 * ----------------------------------------------------
 * total(gastos) devuelve lo que suman todos los gastos. Con una lista vacía, 0.
 * pagadoPor(gastos, id) devuelve lo que ha pagado esa persona.
 *
 * Requisitos: total usa reduce, y pagadoPor encadena filter y reduce.
 *
 *     total(GASTOS_EJEMPLO);              // 387640
 *     pagadoPor(GASTOS_EJEMPLO, 1);       // 133810
 *
 *
 * Apartado 2 · correspondeA(gastos, id) · 2 puntos · RA4.e
 * ---------------------------------------------------------
 * Devuelve lo que le corresponde pagar a esa persona: la suma de sus cuotas en los
 * gastos en los que participa. Cada gasto se reparte a partes iguales con tu
 * repartir de la entrega anterior: las partes son un 1 por cada participante, y la
 * cuota de la persona es la que está en su misma posición dentro de participantes.
 *
 * Requisitos: usa filter, includes y reduce. El array de partes se crea con map a
 * partir de participantes, y la posición de la persona se busca con indexOf.
 *
 *     const cena = { importe: 10000, participantes: [1, 2, 3], ... };
 *     correspondeA([cena], 1);            // 3334
 *     correspondeA([cena], 2);            // 3333
 *     correspondeA(GASTOS_EJEMPLO, 1);    // 65469
 *
 *
 * Apartado 3 · balances(personas, gastos) · 1,5 puntos · RA4.e
 * -------------------------------------------------------------
 * Devuelve un Map con el id de cada persona, en el orden de la lista, y su balance:
 * lo que ha pagado MENOS lo que le corresponde. Un balance positivo es dinero que ha
 * adelantado, y uno negativo, dinero que debe. Entre todas, los balances suman 0.
 *
 * Requisitos: crea el Map con new Map() y lo rellena con set, con lo que dan
 * pagadoPor y correspondeA.
 *
 *     balances(PERSONAS_EJEMPLO, GASTOS_EJEMPLO).get(1);    // 68341
 *
 *
 * Apartado 4 · categorias(gastos) · 1 punto · RA4.e
 * --------------------------------------------------
 * Devuelve un array con las categorías usadas, SIN REPETIR, en el orden en que
 * aparecen.
 *
 * Requisitos: quita las repetidas con un Set, que guarda los valores en el orden en
 * que se añaden.
 *
 *     categorias(GASTOS_EJEMPLO);
 *         // ["Alojamiento", "Transporte", "Comida", "Otros", "Ocio"]
 *
 *
 * Apartado 5 · tabla(personas, gastos) · 3 puntos · RA4.c y RA4.d
 * ----------------------------------------------------------------
 * Devuelve una MATRIZ con una fila por persona, en el orden de la lista, y una
 * columna por categoría, en el orden de categorias. Cada casilla es lo que le
 * corresponde pagar a esa persona en esa categoría: la suma de sus cuotas en los
 * gastos de esa categoría.
 *
 * Requisitos: la matriz se rellena con DOS BUCLES ANIDADOS (for, for...of o
 * forEach), uno por las personas y, dentro, otro por las categorías.
 *
 * La primera fila del viaje, la de Ana, es
 *     [14000, 19662, 17398, 10659, 3750]
 */

// ESCRIBE AQUÍ TU CÓDIGO
/*
 * Apartado 1 · total y pagadoPor · 1,5 puntos · RA4.e
 * ----------------------------------------------------
 * total(gastos) devuelve lo que suman todos los gastos. Con una lista vacía, 0.
 * pagadoPor(gastos, id) devuelve lo que ha pagado esa persona.
 *
 * Requisitos: total usa reduce, y pagadoPor encadena filter y reduce.
 *
 *     total(GASTOS_EJEMPLO);              // 387640
 *     pagadoPor(GASTOS_EJEMPLO, 1);       // 133810*/


function total(gastos) {
    return gastos.reduce((acumulado, gasto) => acumulado + gasto.importe, 0);
}

function pagadoPor(gastos, id) {
    return gastos
        .filter(gasto => gasto.pagador === id)
        .reduce((acumulado, gasto) => acumulado + gasto.importe, 0);
}

/*
 * Apartado 2 · correspondeA(gastos, id) · RA4.e
 * Suma las cuotas de la persona en los gastos en los que participa.
 */

function correspondeA(gastos, id) {
    return gastos
        .filter(gasto => gasto.participantes.includes(id))
        .reduce((acumulado, gasto) => {
            const partes = gasto.participantes.map(() => 1);
            const cuotas = repartir(gasto.importe, partes);
            const posicion = gasto.participantes.indexOf(id);
            return acumulado + cuotas[posicion];
        }, 0);
}

/*
 * Apartado 3 · balances(personas, gastos) · RA4.e
 * Map con el id de cada persona y su balance: lo pagado menos lo que le corresponde.
 */
function balances(personas, gastos) {
    const saldos = new Map();
    personas.forEach(persona => {
        const pagado = pagadoPor(gastos, persona.id);
        const corresponde = correspondeA(gastos, persona.id);
        saldos.set(persona.id, pagado - corresponde);
    });
    return saldos;
}


/*
 * Apartado 4 · categorias(gastos) · RA4.e
 * Categorías usadas, sin repetir y en el orden en que aparecen (con un Set).
 */
function categorias(gastos) {
    const todas = gastos.map(gasto => gasto.categoria);
    return [...new Set(todas)];
}


/*
 * Apartado 5 · tabla(personas, gastos) · RA4.c y RA4.d
 * Matriz con una fila por persona y una columna por categoría, con dos forEach anidados.
 */
function tabla(personas, gastos) {
    const listaCategorias = categorias(gastos);
    const matriz = [];
    personas.forEach(persona => {
        const fila = [];
        listaCategorias.forEach(categoria => {
            const gastosDeCategoria = gastos.filter(gasto => gasto.categoria === categoria);
            fila.push(correspondeA(gastosDeCategoria, persona.id));
        });
        matriz.push(fila);
    });
    return matriz;
}
