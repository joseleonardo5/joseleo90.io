var dbTrabajadores = localStorage.getItem("dbTrabajadores"); // Obtener datos del localStorage
var operacion = "A"; // "A"=agregar; "E"=editar
dbTrabajadores = JSON.parse(dbTrabajadores); // Convertir a objeto

if (dbTrabajadores === null) dbTrabajadores = [];

function Mensaje(t) {
    switch (t) {
        case 1:
            $(".mensaje-alerta").append(
                "<div class='alert alert-success' role='alert'>Se agregó con éxito el trabajador</div>"
            );
            break;
        case 2:
            $(".mensaje-alerta").append(
                "<div class='alert alert-danger' role='alert'>Se eliminó el trabajador</div>"
            );
            break;
    }
}

function AgregarTrabajador() {
    var datos_trabajador = JSON.stringify({
        Nombre: $("#nombre").val(),
        Correo: $("#correo").val(),
        Peso: $("#peso").val(),
        Fecha_nacimiento: $("#fecha_nacimiento").val(),
        Cargo: $("#cargo").val(),
        Telefono: $("#telefono").val()
    });

    dbTrabajadores.push(datos_trabajador);
    localStorage.setItem("dbTrabajadores", JSON.stringify(dbTrabajadores));
    ListarTrabajadores();
    return Mensaje(1);
}

function ListarTrabajadores() {
    $("#dbTrabajadores-list").html(
        "<thead>" +
            "<tr>" +
                "<th>ID</th>" +
                "<th>Nombre</th>" +
                "<th>Correo</th>" +
                "<th>Peso</th>" +
                "<th>Fecha de nacimiento</th>" +
                "<th>Cargo</th>" +
                "<th>Teléfono</th>" +
                "<th></th><th></th>" +
            "</tr>" +
        "</thead>" +
        "<tbody></tbody>"
    );

    for (var i in dbTrabajadores) {
        var d = JSON.parse(dbTrabajadores[i]);
        $("#dbTrabajadores-list").append(
            "<tr>" +
                "<td>" + i + "</td>" +
                "<td>" + d.Nombre + "</td>" +
                "<td>" + d.Correo + "</td>" +
                "<td>" + d.Peso + "</td>" +
                "<td>" + d.Fecha_nacimiento + "</td>" +
                "<td>" + d.Cargo + "</td>" +
                "<td>" + d.Telefono + "</td>" +
                "<td><a id='" + i + "' class='btnEditar' href='#'><span class='glyphicon glyphicon-pencil'></span></a></td>" +
                "<td><a id='" + i + "' class='btnEliminar' href='#'><span class='glyphicon glyphicon-trash'></span></a></td>" +
            "</tr>"
        );
    }
}

function contarTrabajadores() {
    var n = dbTrabajadores.length;
    $("#numeroTrabajadores").append(
        "<a>Tienes actualmente<br><span class='badge'>" + n + "</span></a> Trabajadores"
    );
    return n;
}

function Eliminar(index) {
    dbTrabajadores.splice(index, 1);
    localStorage.setItem("dbTrabajadores", JSON.stringify(dbTrabajadores));
    return Mensaje(2);
}

function Editar() {
    dbTrabajadores[indice_seleccionado] = JSON.stringify({
        Nombre: $("#nombre").val(),
        Correo: $("#correo").val(),
        Peso: $("#peso").val(),
        Fecha_nacimiento: $("#fecha_nacimiento").val(),
        Cargo: $("#cargo").val(),
        Telefono: $("#telefono").val()
    });
    localStorage.setItem("dbTrabajadores", JSON.stringify(dbTrabajadores));
    operacion = "A";
    return true;
}

// Mostrar lista inicial si hay datos
if (dbTrabajadores.length !== 0) {
    ListarTrabajadores();
} else {
    $("#dbTrabajadores-list").append("<h2>No tienes trabajadores</h2>");
}

contarTrabajadores();

// Eventos de botones
$(document).on("click", ".btnEliminar", function() {
    alert("¿Me quieres eliminar?");
    indice_seleccionado = $(this).attr("id");
    Eliminar(indice_seleccionado);
    ListarTrabajadores();
});

$(document).on("click", ".btnEditar", function() {
    alert("¿Me quieres editar?");
    $(".modo").html("<span class='glyphicon glyphicon-pencil'></span> Modo edición");
    operacion = "E";
    indice_seleccionado = $(this).attr("id");
    var trabajador = JSON.parse(dbTrabajadores[indice_seleccionado]);

    $("#nombre").val(trabajador.Nombre);
    $("#correo").val(trabajador.Correo);
    $("#peso").val(trabajador.Peso);
    $("#fecha_nacimiento").val(trabajador.Fecha_nacimiento);
    $("#cargo").val(trabajador.Cargo);
    $("#telefono").val(trabajador.Telefono);
    $("#nombre").focus();
});

// Enviar formulario
$("#trabajadores-form").bind("submit", function() {
    if (operacion === "A") return AgregarTrabajador();
    else return Editar();
});
