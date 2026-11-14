// Funciones para mostrar la aplicación en la página y recoger lo que se hace en ella.
// No cambies nada de este archivo. Usan el DOM, que se estudia más adelante: aquí
// solo hace falta saber qué hace cada una. No calculan nada: muestran lo que reciben.

/**
 * Muestra el nombre del grupo en la cabecera.
 * @param {string} nombre
 */
function mostrarGrupo(nombre) {
    document.getElementById("nombre-grupo").textContent = nombre;
    document.title = `${nombre} · Gastos compartidos`;
}

/**
 * Muestra un mensaje encima del resumen. Con "" lo borra.
 * @param {string} texto
 * @param {string} tipo - "ok" (verde) o "error" (rojo).
 */
function mostrarMensaje(texto, tipo = "ok") {
    const mensaje = document.getElementById("mensaje");
    mensaje.textContent = texto;
    mensaje.className = texto === "" ? "mensaje" : `mensaje ${tipo}`;
}

/**
 * Muestra las tarjetas del resumen.
 * @param {string[][]} pares - Una pareja [etiqueta, valor] por tarjeta,
 *   como ["Total", "120,00 €"].
 */
function mostrarResumen(pares) {
    const resumen = document.getElementById("resumen");
    resumen.innerHTML = "";
    pares.forEach(([etiqueta, valor]) => {
        const tarjeta = document.createElement("div");
        const dt = document.createElement("dt");
        const dd = document.createElement("dd");
        dt.textContent = etiqueta;
        dd.textContent = valor;
        tarjeta.append(dt, dd);
        resumen.appendChild(tarjeta);
    });
}

/**
 * Muestra la lista de personas y las pone en los desplegables y en el reparto del
 * formulario de gastos.
 * @param {Object[]} personas - Cada una como { id, nombre, email, balance }, con el
 *   balance ya escrito como texto ("+150,00 €"). Si empieza por + sale en verde, y si
 *   empieza por -, en rojo.
 */
function mostrarPersonas(personas) {
    const lista = document.getElementById("personas");
    lista.innerHTML = "";
    if (personas.length === 0) {
        lista.innerHTML = '<li class="vacia">Todavía no hay personas.</li>';
    }
    personas.forEach(persona => {
        const elemento = document.createElement("li");
        const texto = document.createElement("span");
        texto.className = "texto";
        texto.textContent = persona.nombre;
        const email = document.createElement("span");
        email.className = "detalle";
        email.textContent = persona.email;
        texto.appendChild(email);
        const balance = document.createElement("span");
        balance.className =
            "cantidad" +
            (persona.balance.startsWith("+")
                ? " positivo"
                : persona.balance.startsWith("-")
                  ? " negativo"
                  : "");
        balance.textContent = persona.balance;
        elemento.append(texto, balance);
        lista.appendChild(elemento);
    });

    const opciones = personas.map(persona => [String(persona.id), persona.nombre]);
    interfazRellenarDesplegable(
        document.querySelector("#form-gasto [name=pagador]"),
        opciones,
    );
    interfazRellenarDesplegable(document.querySelector("#form-filtro [name=persona]"), [
        ["", "Todas"],
        ...opciones,
    ]);

    const reparto = document.getElementById("participantes");
    const anteriores = new Map(
        [...reparto.querySelectorAll("[data-persona]")].map(fila => [
            fila.dataset.persona,
            fila.querySelector("[type=checkbox]").checked,
        ]),
    );
    reparto.innerHTML = "";
    personas.forEach(persona => {
        const fila = document.createElement("label");
        fila.dataset.persona = persona.id;
        const casilla = document.createElement("input");
        casilla.type = "checkbox";
        casilla.checked = anteriores.get(String(persona.id)) ?? true;
        fila.append(casilla, persona.nombre);
        reparto.appendChild(fila);
    });
}

/**
 * Pone las categorías en los desplegables de los formularios de gasto y de filtro.
 * @param {string[]} categorias
 */
function mostrarCategorias(categorias) {
    const opciones = categorias.map(categoria => [categoria, categoria]);
    interfazRellenarDesplegable(
        document.querySelector("#form-gasto [name=categoria]"),
        opciones,
    );
    interfazRellenarDesplegable(document.querySelector("#form-filtro [name=categoria]"), [
        ["", "Todas"],
        ...opciones,
    ]);
}

/**
 * Muestra la lista de gastos.
 * @param {Object[]} gastos - Cada uno como { id, concepto, detalle, importe }, todo ya
 *   escrito como texto salvo el id.
 */
function mostrarGastos(gastos) {
    const lista = document.getElementById("gastos");
    lista.innerHTML = "";
    if (gastos.length === 0) {
        lista.innerHTML = '<li class="vacia">No hay gastos que mostrar.</li>';
    }
    gastos.forEach(gasto => {
        const elemento = document.createElement("li");
        const texto = document.createElement("span");
        texto.className = "texto";
        texto.textContent = gasto.concepto;
        const detalle = document.createElement("span");
        detalle.className = "detalle";
        detalle.textContent = gasto.detalle;
        texto.appendChild(detalle);
        const importe = document.createElement("span");
        importe.className = "cantidad";
        importe.textContent = gasto.importe;
        elemento.append(texto, importe);
        lista.appendChild(elemento);
    });
}

/**
 * Muestra lo gastado en cada categoría.
 * @param {string[][]} pares - Una pareja [categoría, importe] por línea,
 *   como ["Comida", "979,55 €"].
 */
function mostrarPorCategoria(pares) {
    const lista = document.getElementById("por-categoria");
    lista.innerHTML = "";
    pares.forEach(([categoria, importe]) => {
        const dt = document.createElement("dt");
        const dd = document.createElement("dd");
        dt.textContent = categoria;
        dd.textContent = importe;
        lista.append(dt, dd);
    });
}

/**
 * Muestra una tabla.
 * @param {string[]} cabecera - Los títulos de las columnas.
 * @param {string[][]} filas - Una matriz de textos, con una fila por cada fila de la
 *   tabla.
 */
function mostrarTabla(cabecera, filas) {
    const tabla = document.getElementById("tabla");
    tabla.innerHTML = "";
    const thead = tabla.createTHead().insertRow();
    cabecera.forEach(titulo => {
        const th = document.createElement("th");
        th.textContent = titulo;
        thead.appendChild(th);
    });
    const tbody = tabla.createTBody();
    filas.forEach(fila => {
        const tr = tbody.insertRow();
        fila.forEach(valor => {
            tr.insertCell().textContent = valor;
        });
    });
}

/**
 * Muestra la lista de pagos que saldan las cuentas.
 * @param {string[]} lineas - Una por pago, como "Luis paga 50,00 € a Ana".
 */
function mostrarLiquidacion(lineas) {
    const lista = document.getElementById("liquidacion");
    lista.innerHTML = "";
    if (lineas.length === 0) {
        lista.innerHTML = "<li>Las cuentas están saldadas.</li>";
    }
    lineas.forEach(linea => {
        const elemento = document.createElement("li");
        elemento.textContent = linea;
        lista.appendChild(elemento);
    });
}

/**
 * Muestra quién no ha pagado ningún gasto.
 * @param {string[]} nombres - Los nombres de esas personas.
 */
function mostrarSinPagar(nombres) {
    document.getElementById("sin-pagar").textContent =
        nombres.length === 0 ? "Todos han pagado algún gasto." : nombres.join(", ");
}

/**
 * Muestra las cuotas de la calculadora y su suma.
 * @param {string[]} lineas - Una por persona, como "Persona 1 (1 parte): 33,34 €".
 * @param {string} suma - La suma de las cuotas, ya escrita como texto.
 */
function mostrarCuotas(lineas, suma) {
    const lista = document.getElementById("cuotas");
    lista.innerHTML = "";
    lineas.forEach(linea => {
        const elemento = document.createElement("li");
        elemento.textContent = linea;
        lista.appendChild(elemento);
    });
    document.getElementById("suma-cuotas").textContent = `Suma de las cuotas: ${suma}`;
}

/**
 * Añade una línea a la lista de cálculos hechos.
 * @param {string} texto
 */
function anotarCalculo(texto) {
    const elemento = document.createElement("li");
    elemento.textContent = texto;
    document.getElementById("historial").appendChild(elemento);
}

/**
 * Ejecuta una función cuando se pulsa «Calcular».
 * @param {Function} funcion - Recibe dos datos: el importe, tal como se ha escrito, y un
 *   array con las partes de cada persona, como [1, 2, 1]. De lo escrito en «Partes de
 *   cada persona» solo se quedan los números enteros desde 1.
 */
function alCalcular(funcion) {
    const formulario = document.getElementById("form-calculo");
    formulario.addEventListener("submit", evento => {
        evento.preventDefault();
        const partes = formulario.partes.value
            .split(/[\s,;]+/)
            .map(Number)
            .filter(numero => Number.isInteger(numero) && numero >= 1);
        funcion(formulario.importe.value, partes);
    });
}

/**
 * Ejecuta una función cuando se envía el formulario «Añadir persona».
 * @param {Function} funcion - Recibe { nombre, email }, tal como se han escrito. Si
 *   devuelve true, el formulario se vacía.
 */
function alAnadirPersona(funcion) {
    const formulario = document.getElementById("form-persona");
    formulario.addEventListener("submit", evento => {
        evento.preventDefault();
        const datos = { nombre: formulario.nombre.value, email: formulario.email.value };
        if (funcion(datos) === true) {
            formulario.reset();
        }
    });
}

/**
 * Ejecuta una función cuando se envía el formulario «Añadir gasto».
 * @param {Function} funcion - Recibe { concepto, importe, pagador, categoria, fecha,
 *   participantes }. El importe es el texto escrito, el pagador es un id, la fecha es
 *   "AAAA-MM-DD" y participantes es un array con los ids de las personas marcadas,
 *   como [1, 3]. Si la función devuelve true, el concepto y el importe se vacían.
 */
function alAnadirGasto(funcion) {
    const formulario = document.getElementById("form-gasto");
    formulario.fecha.value = interfazHoy();
    formulario.addEventListener("submit", evento => {
        evento.preventDefault();
        const filas = [...document.querySelectorAll("#participantes [data-persona]")];
        const participantes = filas
            .filter(fila => fila.querySelector("[type=checkbox]").checked)
            .map(fila => Number(fila.dataset.persona));
        const datos = {
            concepto: formulario.concepto.value,
            importe: formulario.importe.value,
            pagador: Number(formulario.pagador.value),
            categoria: formulario.categoria.value,
            fecha: formulario.fecha.value || interfazHoy(),
            participantes,
        };
        if (funcion(datos) === true) {
            formulario.concepto.value = "";
            formulario.importe.value = "";
        }
    });
}

/**
 * Ejecuta una función cuando se pulsa «Filtrar» o «Quitar filtro».
 * @param {Function} funcion - Recibe un objeto solo con los criterios elegidos, entre
 *   { persona, categoria, desde, hasta }. La persona es un id y las fechas, "AAAA-MM-DD".
 *   Con «Quitar filtro» recibe {}.
 */
function alFiltrar(funcion) {
    const formulario = document.getElementById("form-filtro");
    formulario.addEventListener("submit", evento => {
        evento.preventDefault();
        const criterios = {};
        if (formulario.persona.value !== "")
            criterios.persona = Number(formulario.persona.value);
        if (formulario.categoria.value !== "")
            criterios.categoria = formulario.categoria.value;
        if (formulario.desde.value !== "") criterios.desde = formulario.desde.value;
        if (formulario.hasta.value !== "") criterios.hasta = formulario.hasta.value;
        funcion(criterios);
    });
    document.getElementById("quitar-filtro").addEventListener("click", () => {
        formulario.reset();
        funcion({});
    });
}

// Las dos funciones siguientes las usa pruebas.js. No hace falta usarlas en app.js.

/**
 * Empieza un grupo en la lista de pruebas.
 * @param {string} titulo
 */
function grupoDePruebas(titulo) {
    const elemento = document.createElement("li");
    elemento.className = "grupo";
    elemento.textContent = titulo;
    document.getElementById("lista-pruebas").appendChild(elemento);
}

/**
 * Ejecuta una prueba y añade a la lista si sale bien o mal.
 * @param {string} descripcion - Qué se comprueba.
 * @param {Function} calcular - Función que devuelve el resultado obtenido.
 * @param {*} esperado - El resultado correcto.
 */
function prueba(descripcion, calcular, esperado) {
    let obtenido;
    try {
        obtenido = calcular();
    } catch (error) {
        obtenido = `Error: ${error.message}`;
    }
    const bien = JSON.stringify(obtenido) === JSON.stringify(esperado);
    const elemento = document.createElement("li");
    elemento.className = bien ? "bien" : "mal";
    const estado = document.createElement("span");
    estado.className = "estado";
    estado.textContent = bien ? "Bien. " : "Mal. ";
    elemento.append(estado, descripcion);
    if (!bien) {
        const detalle = document.createElement("pre");
        detalle.textContent =
            `Esperado:\n${JSON.stringify(esperado)}\n\n` +
            `Obtenido:\n${JSON.stringify(obtenido)}`;
        elemento.appendChild(detalle);
    }
    document.getElementById("lista-pruebas").appendChild(elemento);
    const filas = document.querySelectorAll("#lista-pruebas li:not(.grupo)");
    const correctas = document.querySelectorAll("#lista-pruebas li.bien");
    document.getElementById("resumen-pruebas").textContent =
        `(${correctas.length} de ${filas.length} bien)`;
}

// Auxiliares internas de este archivo.

function interfazRellenarDesplegable(desplegable, opciones) {
    const valorAnterior = desplegable.value;
    desplegable.innerHTML = "";
    opciones.forEach(([valor, texto]) => {
        const opcion = document.createElement("option");
        opcion.value = valor;
        opcion.textContent = texto;
        desplegable.appendChild(opcion);
    });
    if (opciones.some(([valor]) => valor === valorAnterior)) {
        desplegable.value = valorAnterior;
    }
}

function interfazHoy() {
    const fecha = new Date();
    const dos = numero => String(numero).padStart(2, "0");
    return `${fecha.getFullYear()}-${dos(fecha.getMonth() + 1)}-${dos(fecha.getDate())}`;
}
