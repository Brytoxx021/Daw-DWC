let condition = true
let op1
let op2
let numOp = 0
let sumTotal = 0
let operacion 

function pedirOperandos(operacion) {
    do {
        op1 = parseFloat(prompt("Dame el primer operando"))
        op2 = parseFloat(prompt("Dame el segundo operando"))

        if (isNaN(op1) || isNaN(op2)) {
            alert("Introduce una operación correcta")
        }else{
        switch(operacion){
        case "+":
            console.log(`${op1} + ${op2} = ${op1 + op2}`)
            break
        case "-":
            console.log(`${op1} - ${op2} = ${op1 - op2}`)
            break
        case "*":
            console.log(`${op1} x ${op2} = ${op1 * op2}`)
            break
        case "/":
            if (op2 === 0) {
                console.log(`${op1} / ${op2} = ${"error"}`)
            }else{
                console.log(`${op1} / ${op2} = ${op1 / op2}`)
            }
            break
        }
        }
    } while (isNaN(op1) || isNaN(op2))
}

do{
    if (operacion === undefined || operacion === null || operacion != "+" || operacion != "-" ||operacion != "*" || operacion != "/") {
        operacion = prompt(`Seleciona una operación:\n+ suma\n- resta\n* multiplicación\n/ división\n0 o escribe "cancelar" Para salir`)
    }
    switch (operacion) {
        case "cancelar":
            console.log("Usted a salido")
            condition = false
            break
        case "0":
            console.log("Usted a salido")
            condition = false
            break
        case "+":
            pedirOperandos(operacion)
            operacion=null
            numOp++
            sumTotal = sumTotal + (op1 + op2)
            break
        case "-":
            pedirOperandos(operacion)
            operacion=null
            numOp++
            sumTotal = sumTotal + (op1 - op2)
            break
        case "*":
            pedirOperandos(operacion)
            operacion=null
            numOp++
            sumTotal = sumTotal + (op1 * op2)
            break
        case "/":
            pedirOperandos(operacion)
            while (op2 === 0) {
                alert("No se puede dividir entre 0")
                break
            }
            if(op2 != 0){
                numOp++
                sumTotal = sumTotal + (op1 / op2)
            }
            operacion=null
            break
        default:
            operacion
            alert("Introduce una operación correcta")
    }
} while (condition == true)

alert(`Han sido un total de ${numOp} y suman en total ${sumTotal}`)

