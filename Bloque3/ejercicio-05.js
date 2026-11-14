function aImporte(texto) {
    if (texto === null) {
        return NaN;
    }

    const importe = texto.trim().replace(",", ".");

    if (importe === "") {
        return NaN;
    }

    let hayDigito = false;
    let hayPunto = false;

    for (let i = 0; i < importe.length; i++) {
        const caracter = importe[i];

        if (caracter >= "0" && caracter <= "9") {
            hayDigito = true;
        } else if ((caracter === "-" || caracter === "+") && i === 0) {

        } else if (caracter === "." && !hayPunto) {
            hayPunto = true;
        } else {
            return NaN;
        }
    }

    if (!hayDigito) {
        return NaN;
    }

    return Number(importe);
}

function aUnidades(texto) {
    return parseInt(texto, 10);
}

console.log(`aImporte("19,90"): ${aImporte("19,90")} ${typeof aImporte("19,90")}`);
console.log(`aImporte(" 3 "): ${aImporte(" 3 ")} ${typeof aImporte(" 3 ")}`);
console.log(`aImporte(""): ${aImporte("")} ${typeof aImporte("")}`);
console.log(`aImporte("   "): ${aImporte("   ")} ${typeof aImporte("   ")}`);
console.log(`aImporte(null): ${aImporte(null)} ${typeof aImporte(null)}`);
console.log(`aImporte("3 unidades"): ${aImporte("3 unidades")} ${typeof aImporte("3 unidades")}`);
console.log(`aImporte("0"): ${aImporte("0")} ${typeof aImporte("0")}`);
console.log(`aUnidades("3 unidades"): ${aUnidades("3 unidades")} ${typeof aUnidades("3 unidades")}`);
console.log(`aUnidades("12.7"): ${aUnidades("12.7")} ${typeof aUnidades("12.7")}`);
console.log(`aUnidades("abc"): ${aUnidades("abc")} ${typeof aUnidades("abc")}`);
