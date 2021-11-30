
//Declaración de variables.
var nombre = prompt("Ingrese nombre nombre y apellido");
var carrera = prompt("Ingrese carrera");

//Datos ramo 1
var ramo1 = prompt("Ingrese el primer ramo");
var nota1_ramo1 = parseInt(prompt("Ingrese la primera nota [" + ramo1 + "]"));
var nota2_ramo1 = parseInt(prompt("Ingrese la segunda nota [" + ramo1 + "]"));
var nota3_ramo1 = parseInt(prompt("Ingrese la tercera nota [" + ramo1 + "]"));
var promedio_ramo1 = (nota1_ramo1 + nota2_ramo1 + nota3_ramo1) / 3;

//Datos ramo 2
var ramo2 = prompt("Ingrese el segundo ramo");
var nota1_ramo2 = parseInt(prompt("Ingrese la primera nota [" + ramo2 + "]"));
var nota2_ramo2 = parseInt(prompt("Ingrese la segunda nota [" + ramo2 + "]"));
var nota3_ramo2 = parseInt(prompt("Ingrese la tercera nota [" + ramo2 + "]"));
var promedio_ramo2 = (nota1_ramo2 + nota2_ramo2 + nota3_ramo2) / 3;

//Datos ramo 3
var ramo3 = prompt("Ingrese el tercer ramo");
var nota1_ramo3 = parseInt(prompt("Ingrese la primera nota [" + ramo3 + "]"));
var nota2_ramo3 = parseInt(prompt("Ingrese la segunda nota [" + ramo3 + "]"));
var nota_aprobacion = parseInt(prompt("Ingrese nota de aprobación [" + ramo3 + "]"));
var nota3_ramo3 = (nota_aprobacion * 3) - (nota1_ramo3 + nota2_ramo3);

//Inicio container
document.write(`
<div class='container-fluid'>

    <h1 class='py-3'>Notas finales</h1>
    
    <h6 class='d-inline fw-bold pe-5 me-5'>Nombre:</h6>
    <p class='d-inline ms-5'> ${nombre} </p>
    
    <br>
    
    <h6 class='d-inline fw-bold pe-5 me-5'>Carrera: </h6>
    <p class='d-inline ms-5'> &nbsp ${carrera} </p>
    
    <table class='table mt-4'>
    
        <thead class='bg-dark text-white'>

            <tr>
                <th scope='col'>Ramo</th>
                <th scope='col'>Nota 1</th>
                <th scope='col'>Nota 2</th>
                <th scope='col'>Nota 3</th>
                <th scope='col'>Promedio</th>
            </tr>
    
        </thead>

        <tbody>
    
            <tr>
                <td scope='row'> ${ramo1} </td>
                <td> ${nota1_ramo1} </td>
                <td> ${nota2_ramo1} </td>
                <td> ${nota3_ramo1} </td>
                <td> ${promedio_ramo1} </td>
            </tr>
    
            <tr>
                <td scope='row'> ${ramo2} </td>
                <td> ${nota1_ramo2} </td>
                <td> ${nota2_ramo2} </td>
                <td> ${nota3_ramo2} </td>
                <td> ${promedio_ramo2} </td>
            </tr>
    
            <tr>
                <td scope='row'> ${ramo3} </td>
                <td> ${nota1_ramo3} </td>
                <td> ${nota2_ramo3} </td>
                <td> - </td>
                <td> - </td>
            </tr>
    
        </tbody>
    
    </table>

    <strong>Para aprobar el ramo ${ramo3} con nota ${nota_aprobacion}, necesitas obtener un ${nota3_ramo3} en la nota 3.</strong>

</div>`);
//Fin container