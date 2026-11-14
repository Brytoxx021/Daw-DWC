/*
 * Gastos compartidos · Entrega 1 · utilidades.js
 *
 * Este archivo debe contener las cuatro funciones que trabajan con el dinero.
 * Escríbelas debajo de este comentario, con los nombres de la lista y los parámetros
 * en ese orden: las pruebas de la página las llaman así.
 *
 * Para todas las funciones:
 *   - el dinero va siempre en céntimos, como números enteros: 12,50 € son 1250. Así
 *     se evitan los restos de los decimales, como 0.1 + 0.2 = 0.30000000000000004;
 *   - DEVUELVEN su resultado con return: no muestran nada en la página ni en la
 *     consola (0,5 puntos · RA4.b);
 *   - los redondeos, los decimales, los textos y los arrays se resuelven con las
 *     funciones predefinidas del lenguaje (las de Math, Number, los textos y los
 *     arrays), sin programarlas tú (1 punto · RA4.a).
 *
 *
 * Apartado 1 · crearContador(inicio) · 1,5 puntos · RA4.b
 * --------------------------------------------------------
 * Devuelve una función que, cada vez que se llama, devuelve un número: inicio la
 * primera vez, el siguiente la segunda, y así. Cada contador lleva su propia cuenta.
 *
 * Requisitos: es una CLAUSURA que devuelve una función flecha, e inicio es un
 * parámetro por defecto que vale 1.
 *
 *     const siguiente = crearContador();
 *     siguiente();              // 1
 *     siguiente();              // 2
 *     const otro = crearContador(100);
 *     otro();                   // 100
 *
 *
 * Apartado 2 · formatearEuros(centimos, conSigno) · 1 punto · RA4.b
 * ------------------------------------------------------------------
 * Devuelve la cantidad en euros como texto: coma decimal, dos decimales y " €" al
 * final. Si conSigno es true, las cantidades positivas llevan delante un +.
 *
 * Requisitos: conSigno es un parámetro por defecto que vale false.
 *
 *     formatearEuros(1250);           // "12,50 €"
 *     formatearEuros(-5000);          // "-50,00 €"
 *     formatearEuros(15000, true);    // "+150,00 €"
 *     formatearEuros(0, true);        // "0,00 €"
 *
 *
 * Apartado 3 · aCentimos(texto) · 1 punto · RA4.b
 * ------------------------------------------------
 * Convierte en céntimos un importe escrito en euros, con coma o con punto decimal y
 * con espacios alrededor. El resultado se redondea al céntimo. Si el texto no es un
 * número, devuelve NaN.
 *
 *     aCentimos("12,5");      // 1250
 *     aCentimos(" 3.99 ");    // 399
 *     aCentimos("doce");      // NaN
 *
 *
 * Apartado 4 · repartir(importe, partes) · 3 puntos · RA4.b
 * ----------------------------------------------------------
 * Reparte un importe en céntimos entre varias personas, según las partes que paga
 * cada una, y devuelve un array con la cuota de cada persona, en el mismo orden. Si
 * alguien paga 2 partes y otra persona 1, la primera paga el doble.
 *
 * La regla del reparto, para que las cuotas sumen siempre el importe exacto:
 *   1. la primera persona paga el importe por sus partes, dividido entre el total de
 *      partes, redondeado hacia arriba;
 *   2. lo que queda del importe se reparte entre las demás con la misma regla.
 *
 * Requisitos:
 *   - es RECURSIVA: sin partes devuelve un array vacío y, si las hay, calcula la
 *     cuota de la primera persona y se llama a sí misma con lo que queda del importe
 *     y con las partes de las demás;
 *   - es PURA: no cambia el array de partes que recibe.
 *
 *     repartir(10000, [1, 1, 1]);    // [3334, 3333, 3333]
 *     repartir(1000, [1, 2]);        // [334, 666]
 *     repartir(5000, []);            // []
 */

// ESCRIBE AQUÍ TU CÓDIGO

/* * Apartado 1 · crearContador(inicio) · 1,5 puntos · RA4.b
 * --------------------------------------------------------
 */

function crearContador(inicio = 1) {
	let contador = inicio;
	return () => contador++;
}
/*
 * Apartado 2 · formatearEuros(centimos, conSigno) · 1 punto · RA4.b
 * ------------------------------------------------------------------
 */

function formatearEuros(centimos, conSigno = false) {
	let euros = centimos;
	euros = (euros / 100).toFixed(2);
	if (conSigno === true) {
		if (euros > 0) {
			euros = "+" + euros;
		}
	}
	euros = euros.replace(".", ",");
	return euros + " €";
}

/* * Apartado 3 · aCentimos(texto) · 1 punto · RA4.b
 * ------------------------------------------------
 */

function aCentimos(texto) {
	texto = texto.replace(",", ".");
	if (isNaN(texto)) {
		return NaN;
	}
	return texto * 100;
}
/*Apartado 4 · repartir(importe, partes) · 3 puntos · RA4.b
 * ----------------------------------------------------------+
 */

function repartir(importe, partes) {
	if (partes.length === 0) {
		return [];
	}
	let totalPartes = partes.reduce((n, s) => n + s, 0);
	let primera = Math.ceil((partes[0] * importe) / totalPartes);

	let cuotas = repartir(importe - primera, partes.slice(1));
	cuotas.unshift(primera);

	return cuotas;
}
