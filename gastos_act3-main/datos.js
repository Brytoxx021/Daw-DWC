// Datos de ejemplo: un viaje de seis amigos a Lisboa.
// No cambies nada de este archivo. Los importes están en céntimos.
// Las personas reciben los ids 1 a 6 en este orden.

const CATEGORIAS = ["Alojamiento", "Transporte", "Comida", "Ocio", "Otros"];

const PERSONAS_EJEMPLO = [
    { nombre: "Ana", email: "ana@ejemplo.com" },
    { nombre: "Luis", email: "luis@ejemplo.com" },
    { nombre: "Marta", email: "marta@ejemplo.com" },
    { nombre: "Pedro", email: "pedro@ejemplo.com" },
    { nombre: "Lucía", email: "lucia@ejemplo.com" },
    { nombre: "Sergio", email: "sergio@ejemplo.com" },
];

const GASTOS_EJEMPLO = [
    { concepto: "Hotel, tres noches", importe: 84000, pagador: 1,
      participantes: [1, 2, 3, 4, 5, 6], categoria: "Alojamiento", fecha: "2026-11-17" },
    { concepto: "Billetes de avión", importe: 95400, pagador: 2,
      participantes: [1, 2, 3, 4, 5, 6], categoria: "Transporte", fecha: "2026-11-17" },
    { concepto: "Taxi al hotel", importe: 3850, pagador: 3,
      participantes: [3, 4, 5], categoria: "Transporte", fecha: "2026-11-17" },
    { concepto: "Cena de bienvenida", importe: 21360, pagador: 1,
      participantes: [1, 2, 3, 4, 5, 6], categoria: "Comida", fecha: "2026-11-17" },
    { concepto: "Desayuno", importe: 4280, pagador: 4,
      participantes: [4, 5, 6], categoria: "Comida", fecha: "2026-11-18" },
    { concepto: "Seguro de viaje", importe: 54000, pagador: 2,
      participantes: [1, 2, 3, 4, 5, 6], categoria: "Otros", fecha: "2026-11-18" },
    { concepto: "Comida en la Baixa", importe: 9720, pagador: 3,
      participantes: [1, 2, 3, 6], categoria: "Comida", fecha: "2026-11-18" },
    { concepto: "Bonos de metro", importe: 2400, pagador: 5,
      participantes: [1, 2, 3, 4, 5, 6], categoria: "Transporte", fecha: "2026-11-18" },
    { concepto: "Cena en Alfama", importe: 18975, pagador: 4,
      participantes: [1, 2, 3, 4, 5, 6], categoria: "Comida", fecha: "2026-11-18" },
    { concepto: "Concierto de fado", importe: 15000, pagador: 1,
      participantes: [1, 2, 3, 5], categoria: "Ocio", fecha: "2026-11-18" },
    { concepto: "Desayuno", importe: 3960, pagador: 5,
      participantes: [1, 2, 5], categoria: "Comida", fecha: "2026-11-19" },
    { concepto: "Tranvía 28", importe: 1860, pagador: 3,
      participantes: [1, 3, 6], categoria: "Transporte", fecha: "2026-11-19" },
    { concepto: "Comida en Belém", importe: 11340, pagador: 2,
      participantes: [1, 2, 3, 4, 5, 6], categoria: "Comida", fecha: "2026-11-19" },
    { concepto: "Tarjetas SIM", importe: 6250, pagador: 1,
      participantes: [1, 2, 3, 4, 5, 6], categoria: "Otros", fecha: "2026-11-19" },
    { concepto: "Oceanario", importe: 11400, pagador: 5,
      participantes: [2, 4, 5, 6], categoria: "Ocio", fecha: "2026-11-19" },
    { concepto: "Cena de despedida", importe: 26430, pagador: 3,
      participantes: [1, 2, 3, 4, 5, 6], categoria: "Comida", fecha: "2026-11-19" },
    { concepto: "Pasteles de Belém", importe: 1890, pagador: 4,
      participantes: [1, 4, 5], categoria: "Comida", fecha: "2026-11-20" },
    { concepto: "Taxi al aeropuerto", importe: 4625, pagador: 2,
      participantes: [1, 2, 3], categoria: "Transporte", fecha: "2026-11-20" },
    { concepto: "Recuerdos", importe: 3700, pagador: 5,
      participantes: [1, 2, 3, 4, 5, 6], categoria: "Otros", fecha: "2026-11-20" },
    { concepto: "Aparcamiento en Manises", importe: 7200, pagador: 1,
      participantes: [1, 2, 3, 4, 5, 6], categoria: "Transporte", fecha: "2026-11-20" },
];
