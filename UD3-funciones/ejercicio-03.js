/**
 * Simula el comportamiento de un bucle 'for' clásico utilizando funciones.
 * 
 * @param {any} valor - El valor inicial de la iteración.
 * @param {Function} condicion - Función que se evalúa antes de cada vuelta; si devuelve false, el bucle termina.
 * @param {Function} actualizar - Función que calcula el siguiente valor a partir del actual.
 * @param {Function} cuerpo - Función que se ejecuta en cada iteración recibiendo el valor actual.
 */
function bucle(valor, condicion, actualizar, cuerpo) {
    while (condicion(valor)) {
        cuerpo(valor);
        valor = actualizar(valor);
    }
}

/**
 * Comprueba si todos los elementos de un array cumplen una condición (simulando el comportamiento de 'every').
 * 
 * @param {Array} array - El array de elementos a evaluar.
 * @param {Function} condicion - La condición que debe cumplir cada elemento.
 * @returns {boolean} - true si todos los elementos cumplen la condición, false si al menos uno falla.
 */
function todosConBucle(array, condicion) {
    for (let i = 0; i < array.length; i++) {
        // Si encontramos un elemento que NO cumple la condición, devolvemos false
        if (!condicion(array[i])) {
            return false;
        }
    }
    // Si el bucle finaliza sin encontrar excepciones, todos cumplen
    return true;
}

/**
 * Comprueba si todos los elementos de un array cumplen una condición utilizando únicamente 'some' sin bucles.
 * 
 * ¿Por qué el array vacío da true?
 * Esto se basa en el principio lógico de la "verdad vacua" (vacuous truth). 
 * La lógica detrás de "todos cumplen P" es equivalente a "no existe ningún elemento que no cumpla P".
 * Cuando el array está vacío ([ ]), el método .some() busca si hay algún elemento que no cumpla la condición. 
 * Al no haber elementos, .some() devuelve 'false' (ninguno cumple lo contrario). 
 * Al negar ese resultado con el operador NOT (!false), obtenemos 'true'.
 * 
 * @param {Array} array - El array de elementos a evaluar.
 * @param {Function} condicion - La condición que debe cumplir cada elemento.
 */
function todosConSome(array, condicion) {
    // "Todos cumplen P" <=> "No hay ninguno que no cumpla P"
    return !array.some((elemento) => !condicion(elemento));
}

bucle(3, (numero) => numero > 0, (numero) => numero - 1, (numero) => console.log("Cuenta atrás: " + numero));
bucle(1, (numero) => numero <= 16, (numero) => numero * 2, (numero) => console.log("Potencia de 2: " + numero));

const pruebas = [[1, 3, 5], [2, 4, 16], []];
for (const array of pruebas) {
    console.log("[" + array.join(", ") + "] → " + todosConBucle(array, (n) => n < 10) + " / " + todosConSome(array, (n) => n < 10));
}