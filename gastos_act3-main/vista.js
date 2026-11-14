// Muestra el viaje en la página y atiende los formularios, con los métodos de tu
// viaje y tus funciones de cuentas.js. No cambies nada de este archivo. Lo único que
// usa app.js es mostrarViaje.

/**
 * Muestra el viaje, y lo vuelve a mostrar después de cada cambio en los formularios.
 * @param {Object} viaje - El objeto que devuelve crearViaje, con sus personas y sus
 *   gastos ya añadidos.
 */
function mostrarViaje(viaje) {
    let criterios = {};

    const pasaElFiltro = gasto =>
        (criterios.persona === undefined ||
            gasto.pagador === criterios.persona ||
            gasto.participantes.includes(criterios.persona)) &&
        (criterios.categoria === undefined || gasto.categoria === criterios.categoria) &&
        (criterios.desde === undefined || gasto.fecha >= criterios.desde) &&
        (criterios.hasta === undefined || gasto.fecha <= criterios.hasta);

    const pintar = () => {
        const { personas, gastos } = viaje;
        const resumen = viaje.resumen();
        const saldos = balances(personas, gastos);

        mostrarResumen([
            ["Total", formatearEuros(resumen.total)],
            ["Gastos", String(resumen.gastos)],
            ["Media por persona", formatearEuros(resumen.mediaPorPersona)],
            ["Categoría con más gasto", resumen.categoriaMayor ?? "ninguna"],
        ]);
        mostrarPorCategoria(
            Object.entries(resumen.porCategoria).map(([categoria, importe]) => [
                categoria,
                formatearEuros(importe),
            ]),
        );
        mostrarPersonas(
            personas.map(({ id, nombre, email }) => ({
                id,
                nombre,
                email,
                balance: formatearEuros(saldos.get(id), true),
            })),
        );
        mostrarGastos(
            gastos.filter(pasaElFiltro).map(gasto => ({
                id: gasto.id,
                concepto: gasto.concepto,
                detalle: `${viaje.nombreDe(gasto.pagador)} · ${gasto.categoria} · ${gasto.fecha}`,
                importe: formatearEuros(gasto.importe),
            })),
        );
        mostrarTabla(
            ["", ...categorias(gastos)],
            tabla(personas, gastos).map((fila, i) => [
                personas[i].nombre,
                ...fila.map(centimos => formatearEuros(centimos)),
            ]),
        );
        mostrarLiquidacion(
            liquidar(saldos).map(
                ({ de, a, importe }) =>
                    `${viaje.nombreDe(de)} paga ${formatearEuros(importe)} a ${viaje.nombreDe(a)}`,
            ),
        );
        mostrarSinPagar(
            personas
                .filter(persona => !gastos.some(gasto => gasto.pagador === persona.id))
                .map(persona => persona.nombre),
        );
    };

    mostrarGrupo(viaje.nombre);
    mostrarCategorias(CATEGORIAS);
    pintar();

    alAnadirPersona(({ nombre, email }) => {
        const { persona, error } = viaje.agregarPersona(nombre, email);
        if (error) {
            mostrarMensaje(error, "error");
            return false;
        }
        mostrarMensaje(`Se ha añadido a ${persona.nombre}.`);
        pintar();
        return true;
    });

    alAnadirGasto(datos => {
        const { gasto, error } = viaje.agregarGasto({
            ...datos,
            importe: aCentimos(datos.importe),
        });
        if (error) {
            mostrarMensaje(error, "error");
            return false;
        }
        mostrarMensaje(`Se ha añadido el gasto ${gasto.concepto}.`);
        pintar();
        return true;
    });

    alFiltrar(elegidos => {
        criterios = elegidos;
        pintar();
    });
}
