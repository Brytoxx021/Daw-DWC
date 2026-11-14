/*
 * Gastos compartidos · Entrega 1 · app.js
 *
 * Este archivo debe contener la calculadora de cuotas de la página. Escríbela debajo
 * de este comentario con tus funciones de utilidades.js y con las de interfaz.js,
 * que están explicadas en los comentarios de ese archivo.
 */
/* * Apartado 1 · crearContador(inicio) · 1,5 puntos · RA4.b
 * --------------------------------------------------------
 */
/*
 *
 * Apartado 5 · La calculadora · 2 puntos · RA4.b
 * -----------------------------------------------
 * alCalcular recibe la función que se ejecuta cada vez que se pulsa «Calcular». Esa
 * función recibe dos datos: el importe tal como se ha escrito (un texto) y un array
 * con las partes de cada persona, como [1, 2, 1].
 *
 * Al pulsar «Calcular», se comprueba primero el importe y después las partes:
 *   - si el importe, convertido con aCentimos, no es un número mayor que 0, se
 *     muestra en rojo «Importe no válido: » seguido de lo escrito, como
 *     «Importe no válido: doce», y no se calcula nada;
 *   - si no hay partes, se muestra en rojo «Escribe las partes de al menos una
 *     persona», y no se calcula nada;
 *   - si todo es correcto, se borra el mensaje con mostrarMensaje(""), se reparte el
 *     importe con repartir y se muestra con mostrarCuotas una línea por persona, como
 *     «Persona 2 (2 partes): 6,66 €», o «Persona 1 (1 parte): 3,34 €» cuando es una
 *     sola parte, y la suma de las cuotas en euros;
 *   - el cálculo se anota con anotarCalculo, numerado: «1. 100,00 € entre 3
 *     personas», «2. 46,25 € entre 1 persona». Los cálculos con error no cuentan.
 *
 * Requisitos:
 *   - la suma de las cuotas se calcula con un bucle;
 *   - la numeración sale de UN SOLO contador de crearContador para toda la página;
 *   - los textos se montan con template literals (`...${variable}...`).
 */

// ESCRIBE AQUÍ TU CÓDIGO
// Instancia única del contador para toda la página
const contadorCalculos = crearContador(1);

alCalcular((importeTexto, partes) => {
    // 1. Convertir el importe a céntimos
    const centimos = aCentimos(importeTexto);

    // 2. Validación del importe: debe ser un número mayor que 0
    if (Number.isNaN(centimos) || centimos <= 0) {
        mostrarMensaje(`Importe no válido: ${importeTexto}`, "error");
        return;
    }

    // 3. Validación de las partes: debe haber al menos una persona
    if (partes.length === 0) {
        mostrarMensaje("Escribe las partes de al menos una persona", "error");
        return;
    }

    // 4. Si todo es correcto, limpiamos el mensaje de error/éxito
    mostrarMensaje("");

    // 5. Repartir el importe entre las partes
    const cuotasCentimos = repartir(centimos, partes);

    // 6. Generar las líneas de cuotas por persona y calcular la suma con un bucle
    const lineas = [];
    let sumaCentimos = 0;

    for (let i = 0; i < cuotasCentimos.length; i++) {
        const cuota = cuotasCentimos[i];
        sumaCentimos += cuota;

        const numPersona = i + 1;
        const numPartes = partes[i];
        const textoParte = numPartes === 1 ? "1 parte" : `${numPartes} partes`;
        const cuotaFormateada = formatearEuros(cuota);

        lineas.push(`Persona ${numPersona} (${textoParte}): ${cuotaFormateada}`);
    }

    // 7. Mostrar cuotas en la interfaz
    const sumaFormateada = formatearEuros(sumaCentimos);
    mostrarCuotas(lineas, sumaFormateada);

    // 8. Anotar el cálculo con el contador único de la página
    const numCalculo = contadorCalculos();
    const textoPersonas = partes.length === 1 ? "1 persona" : `${partes.length} personas`;
    const importeFormateado = formatearEuros(centimos);

    anotarCalculo(`${numCalculo}. ${importeFormateado} entre ${textoPersonas}`);
});

const viaje = crearViaje("Viaje a Lisboa");
PERSONAS_EJEMPLO.forEach(({ nombre, email }) =>
    viaje.agregarPersona(nombre, email),
);
viaje.agregarGastos(...GASTOS_EJEMPLO);
mostrarViaje(viaje);
