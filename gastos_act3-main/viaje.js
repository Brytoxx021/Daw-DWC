/*
 * Gastos compartidos · Entrega 3 · viaje.js
 *
 * Este archivo debe contener la función crearViaje, que crea el viaje como OBJETO:
 * sus personas, sus gastos y los métodos que los cambian. Escríbela debajo de este
 * comentario, con los nombres de los métodos y sus parámetros en el orden de la
 * lista: las pruebas de la página y vista.js los llaman así.
 *
 * Lo que devuelven los métodos que pueden salir mal es siempre un OBJETO:
 *   - si sale bien, { persona } o { gasto }, con la persona o el gasto añadido;
 *   - si sale mal, { error }, con el texto exacto del error.
 * Un error no cambia nada: no se añade ninguna persona ni ningún gasto. Quien llama
 * al método desestructura el resultado y mira si hay error:
 *     const { persona, error } = viaje.agregarPersona("Eva", "eva@ejemplo.com");
 *
 * Los ids van seguidos: una persona o un gasto rechazados no gastan número.
 *
 *
 * Apartado 1 · crearViaje(nombre) · 1,5 puntos · RA4.g
 * -----------------------------------------------------
 * Devuelve un OBJETO LITERAL que representa un viaje vacío, con las propiedades
 * nombre (el que recibe), personas (un array vacío) y gastos (otro array vacío), y
 * los métodos de los apartados 2 a 4.
 *
 * Requisitos:
 *   - los ids de las personas y de los gastos salen de dos contadores de
 *     crearContador guardados en una CLAUSURA, no en propiedades del objeto. Así
 *     cada viaje lleva sus propios ids y nadie los puede cambiar desde fuera;
 *   - los métodos llegan a las propiedades del viaje con this.
 *
 *     const viaje = crearViaje("Fin de semana");
 *     viaje.nombre;      // "Fin de semana"
 *     viaje.personas;    // []
 *
 *
 * Apartado 2 · Las personas · 2 puntos · RA4.h
 * ---------------------------------------------
 * nombreDe(id) devuelve el nombre de la persona, o "desconocido" si no existe. Usa
 * el encadenamiento opcional ?. y el operador ??.
 *
 * agregarPersona(nombre, email):
 *   1. quita los espacios del principio y del final de los dos datos y pasa el email
 *      a minúsculas;
 *   2. comprueba, EN ESTE ORDEN:
 *        - que el nombre no esté vacío      → "El nombre no puede estar vacío"
 *        - que el email tenga una @         → "Email no válido: eva.ejemplo.com"
 *        - que no haya otra con ese email   →
 *              "Ya existe una persona con el email ana@ejemplo.com"
 *   3. crea la persona como un objeto { id, nombre, email }, la añade a personas y
 *      devuelve { persona }.
 *
 *
 * Apartado 3 · Añadir gastos · 3,5 puntos · RA4.h y RA4.c
 * --------------------------------------------------------
 * agregarGasto(datos) recibe un objeto con concepto, importe (en céntimos), pagador,
 * participantes, categoria y fecha, y comprueba, EN ESTE ORDEN:
 *   1. que exista quien paga                 → "No existe la persona 9"
 *   2. que existan todos los participantes   → "No existe la persona 8", con el
 *      primero que no exista
 *   3. que haya al menos un participante     →
 *          "El gasto necesita al menos un participante"
 *   4. que el importe sea un entero mayor que 0 → "Importe no válido: -500"
 * Si todo es correcto, crea el gasto como un objeto NUEVO con todos los datos y su
 * id, lo añade y devuelve { gasto }.
 *
 * El gasto guardado es una COPIA: si después se cambian los datos que se pasaron, o
 * su array de participantes, el gasto no cambia.
 *
 * agregarGastos(...listaDatos) recibe CUALQUIER NÚMERO de gastos, los añade uno a
 * uno con agregarGasto y devuelve un array con lo que devuelve agregarGasto con cada
 * uno.
 *
 * Requisitos:
 *   - agregarGasto DESESTRUCTURA los datos que necesita;
 *   - las dos copias, la del gasto y la de sus participantes, se hacen con el
 *     operador spread (...);
 *   - agregarGastos recibe los gastos en un parámetro rest.
 *
 *
 * Apartado 4 · resumen() · 2 puntos · RA4.e
 * ------------------------------------------
 * Devuelve un OBJETO LITERAL con estas propiedades, EN ESTE ORDEN:
 *   gastos            cuántos gastos hay;
 *   total             lo que suman, con tu total de cuentas.js;
 *   mediaPorPersona   el total entre el número de personas, redondeado con
 *                     Math.round a céntimos enteros, o 0 si no hay personas;
 *   porCategoria      un objeto con una propiedad por categoría usada, en el orden
 *                     en que aparecen, y lo que suman sus gastos, como
 *                     { Alojamiento: 84000, Transporte: 115335, ... };
 *   categoriaMayor    la categoría en la que más se ha gastado, la primera que
 *                     aparece si hay empate, o null si no hay gastos.
 *
 * Requisitos: porCategoria se calcula con reduce, empezando por un objeto vacío, y
 * categoriaMayor recorre porCategoria con Object.entries.
 *
 *     { gastos: 20, total: 387640, mediaPorPersona: 64607,
 *       porCategoria: { ... }, categoriaMayor: "Transporte" }
 */

// ESCRIBE AQUÍ TU CÓDIGO

function crearViaje(nombre) {
  // Estos contadores quedan privados en la clausura y empiezan de nuevo en cada viaje.
  const idPersonas = crearContador();
  const idGastos = crearContador();

  const viaje = {
    nombre,
    personas: [],
    gastos: [],

    nombreDe(id) {
      // ?. evita leer nombre si no se encuentra a la persona; ?? aplica el texto alternativo.
      return this.personas.find((persona) => persona.id === id)?.nombre ?? "desconocido";
    },

    agregarPersona(nombre, email) {
      nombre = nombre.trim();
      email = email.trim().toLowerCase();

      if (nombre === "") {
        return { error: "El nombre no puede estar vacío" };
      }
      if (!email.includes("@")) {
        return { error: `Email no válido: ${email}` };
      }
      if (this.personas.find((persona) => persona.email === email)) {
        return { error: `Ya existe una persona con el email ${email}` };
      }

      // El contador solo avanza cuando todas las comprobaciones han pasado.
      const persona = {
        id: idPersonas(),
        nombre,
        email,
      };
      this.personas.push(persona);
      return { persona };
    },

    agregarGasto(datos) {
      // Se desestructura para validar los campos antes de crear y guardar el gasto.
      const { concepto, importe, pagador, participantes, categoria, fecha } =
        datos;

      if (!this.personas.find((persona) => persona.id === pagador)) {
        return { error: `No existe la persona ${pagador}` };
      }
      for (const id of participantes) {
        if (!this.personas.find((persona) => persona.id === id)) {
          return { error: `No existe la persona ${id}` };
        }
      }
      if (!participantes || participantes.length === 0) {
        return { error: "El gasto necesita al menos un participante" };
      }
      if (!Number.isInteger(importe) || importe <= 0) {
        return { error: `Importe no válido: ${importe}` };
      }

      // El gasto y participantes se copian solo después de validar; los errores no consumen ID.
      const gasto = {
        ...datos,
        id: idGastos(),
        participantes: [...participantes],
      };
      this.gastos.push(gasto);
      return { gasto };
    },

    agregarGastos(...listaDatos) {
      // El parámetro rest reúne todos los gastos; map conserva un resultado por cada uno.
      return listaDatos.map((datos) => this.agregarGasto(datos));
    },

    resumen() {
      const totalGastos = total(this.gastos);
      // reduce acumula los importes por categoría; ?? 0 inicia cada categoría en cero.
      const porCategoria = this.gastos.reduce((acumulado, gasto) => {
        acumulado[gasto.categoria] =
          (acumulado[gasto.categoria] ?? 0) + gasto.importe;
        return acumulado;
      }, {});
      // El acumulador guarda también la categoría; usar > conserva la primera en caso de empate.
      const categoriaMayor = Object.entries(porCategoria).reduce(
        ([mayor, importeMayor], [categoria, importe]) =>
          importe > importeMayor ? [categoria, importe] : [mayor, importeMayor],
        [null, 0],
      )[0];

      return {
        gastos: this.gastos.length,
        total: totalGastos,
        // El resultado permanece en céntimos enteros y evita dividir entre cero.
        mediaPorPersona: this.personas.length
          ? Math.round(totalGastos / this.personas.length)
          : 0,
        porCategoria,
        categoriaMayor,
      };
    },
  };

  return viaje;
}
