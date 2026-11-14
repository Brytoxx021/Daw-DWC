// Pruebas del viaje. No cambies nada de este archivo.
// Cada prueba crea su propio viaje, así que un fallo no estropea las demás.
{
    const viajeConPersonas = () => {
        const viaje = crearViaje("Prueba");
        PERSONAS_EJEMPLO.forEach(({ nombre, email }) =>
            viaje.agregarPersona(nombre, email),
        );
        return viaje;
    };
    const viajeDeEjemplo = () => {
        const viaje = viajeConPersonas();
        viaje.agregarGastos(...GASTOS_EJEMPLO);
        return viaje;
    };
    const cena = {
        concepto: "Cena",
        importe: 10000,
        pagador: 1,
        participantes: [1, 2, 3],
        categoria: "Comida",
        fecha: "2026-11-18",
    };

    grupoDePruebas("1. El viaje y sus personas");
    prueba(
        "Un viaje nuevo tiene su nombre y está vacío",
        () => {
            const viaje = crearViaje("Fin de semana");
            return [viaje.nombre, viaje.personas, viaje.gastos];
        },
        ["Fin de semana", [], []],
    );
    prueba(
        "agregarPersona da ids seguidos, quita los espacios y pasa el email a minúsculas",
        () => {
            const viaje = crearViaje("Prueba");
            viaje.agregarPersona("Ana", "ana@ejemplo.com");
            const { persona } = viaje.agregarPersona("  Luis ", " LUIS@Ejemplo.com ");
            return [persona.id, persona.nombre, persona.email, viaje.personas.length];
        },
        [2, "Luis", "luis@ejemplo.com", 2],
    );
    prueba(
        "Un nombre vacío, un email sin @ o repetido devuelven el error",
        () => {
            const viaje = viajeConPersonas();
            return [
                viaje.agregarPersona("   ", "nadie@ejemplo.com"),
                viaje.agregarPersona("Eva", "eva.ejemplo.com"),
                viaje.agregarPersona("Ana María", "ANA@ejemplo.com"),
                viaje.personas.length,
            ];
        },
        [
            { error: "El nombre no puede estar vacío" },
            { error: "Email no válido: eva.ejemplo.com" },
            { error: "Ya existe una persona con el email ana@ejemplo.com" },
            6,
        ],
    );
    prueba(
        "Una persona rechazada no gasta id",
        () => {
            const viaje = viajeConPersonas();
            viaje.agregarPersona("Eva", "sin-arroba");
            return viaje.agregarPersona("Eva", "eva@ejemplo.com").persona.id;
        },
        7,
    );
    prueba(
        "nombreDe da el nombre, o desconocido si no existe",
        () => {
            const viaje = viajeConPersonas();
            return [viaje.nombreDe(3), viaje.nombreDe(99)];
        },
        ["Marta", "desconocido"],
    );
    prueba(
        "Cada viaje tiene sus propias personas, sus gastos y sus ids",
        () => {
            const uno = viajeConPersonas();
            const otro = crearViaje("Otro");
            const eva = otro.agregarPersona("Eva", "eva@ejemplo.com").persona;
            return [uno.personas.length, otro.personas.length, eva.id];
        },
        [6, 1, 1],
    );

    grupoDePruebas("2. Los gastos del viaje");
    prueba(
        "agregarGasto les da ids seguidos y agregarGastos añade varios de una vez",
        () => {
            const viaje = viajeConPersonas();
            const primero = viaje.agregarGasto(cena).gasto;
            const otros = viaje.agregarGastos(
                { ...cena, concepto: "Taxi" },
                { ...cena, concepto: "Museo" },
            );
            return [
                primero.id,
                otros.map(resultado => resultado.gasto.id),
                viaje.gastos.length,
            ];
        },
        [1, [2, 3], 3],
    );
    prueba(
        "El gasto guarda todos sus datos y su id",
        () => {
            const { gasto } = viajeConPersonas().agregarGasto(cena);
            const { id, concepto, importe, pagador, participantes, categoria, fecha } =
                gasto;
            return [id, concepto, importe, pagador, participantes, categoria, fecha];
        },
        [1, "Cena", 10000, 1, [1, 2, 3], "Comida", "2026-11-18"],
    );
    prueba(
        "Cada dato incorrecto del gasto da su error",
        () => {
            const viaje = viajeConPersonas();
            return [
                viaje.agregarGasto({ ...cena, pagador: 9 }).error,
                viaje.agregarGasto({ ...cena, participantes: [1, 8] }).error,
                viaje.agregarGasto({ ...cena, participantes: [] }).error,
                viaje.agregarGasto({ ...cena, importe: 0 }).error,
                viaje.agregarGasto({ ...cena, importe: 12.5 }).error,
                viaje.gastos.length,
            ];
        },
        [
            "No existe la persona 9",
            "No existe la persona 8",
            "El gasto necesita al menos un participante",
            "Importe no válido: 0",
            "Importe no válido: 12.5",
            0,
        ],
    );
    prueba(
        "Un gasto rechazado no gasta id",
        () => {
            const viaje = viajeConPersonas();
            viaje.agregarGasto({ ...cena, importe: -3 });
            return viaje.agregarGasto(cena).gasto.id;
        },
        1,
    );
    prueba(
        "El gasto guardado es una copia: cambiar los datos después no lo cambia",
        () => {
            const viaje = viajeConPersonas();
            const datos = { ...cena, participantes: [1, 2, 3] };
            viaje.agregarGasto(datos);
            datos.concepto = "Otra cosa";
            datos.participantes.push(4);
            return [viaje.gastos[0].concepto, viaje.gastos[0].participantes];
        },
        ["Cena", [1, 2, 3]],
    );

    grupoDePruebas("3. El resumen");
    prueba("El resumen del viaje", () => viajeDeEjemplo().resumen(), {
        gastos: 20,
        total: 387640,
        mediaPorPersona: 64607,
        porCategoria: {
            Alojamiento: 84000,
            Transporte: 115335,
            Comida: 97955,
            Otros: 63950,
            Ocio: 26400,
        },
        categoriaMayor: "Transporte",
    });
    prueba("El resumen de un viaje sin gastos", () => viajeConPersonas().resumen(), {
        gastos: 0,
        total: 0,
        mediaPorPersona: 0,
        porCategoria: {},
        categoriaMayor: null,
    });
}
