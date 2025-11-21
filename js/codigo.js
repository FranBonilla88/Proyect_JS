"use strict";
// MAIN PROGRAM
var oGimnasio = new Gimnasio();

registrarEventos();

// Registro de eventos
function registrarEventos() {
  //Opciones del menu

  document.querySelector("#mnuAltaUsuario").addEventListener("click", mostrarFormulario);
  document.querySelector("#mnuBuscarUsuario").addEventListener("click", mostrarFormulario);
  document.querySelector("#mnuListadoUsuario").addEventListener("click", mostrarUsuarios); //no muestra un frm
  document.querySelector("#mnuListadoUsuarioPorEdad").addEventListener("click", mostrarFormulario);

  //Botones
  frmAltaUsuario.btnAceptarAltaUsuario.addEventListener("click", procesarAltaUsuario);
  frmBuscarUsuario.btnAceptarBuscarUsuario.addEventListener("click", procesarBuscarUsuario);
  frmListadoUsuarioPorEdad.btnAceptarBuscarUsuarioPorEdad.addEventListener("click", procesarListadoUsuarioPorEdad);
  frmModificarUsuario.btnAceptarModUsuario.addEventListener("click", procesarModificarUsuario);

  document.querySelector("#mnuAltaReserva").addEventListener("click", mostrarFormulario);
  document.querySelector("#mnuBuscarReserva").addEventListener("click", mostrarFormulario);
  // document.querySelector("#mnuListadoReserva").addEventListener("click", procesarListadoReservas); // abre listado en nueva ventana
  document.querySelector("#mnuListadoReservaPorFecha").addEventListener("click", procesarListadoReservasPorFecha);

  // Botones 
  frmAltaReserva.btnAceptarAltaReserva.addEventListener("click", procesarAltaReserva);
  frmBuscarReserva.btnAceptarBuscarReserva.addEventListener("click", procesarBuscarReserva);
  frmListadoReservaPorFecha.btnAceptarListadoReservaPorFecha.addEventListener("click", procesarListadoReservasPorFecha);
  frmModificarReserva.btnAceptarModReserva.addEventListener("click", procesarModificarReserva);
}

function mostrarFormulario(oEvento) {
  let opcionMenu = oEvento.target.id; // Opción de menú pulsada (su id)
  ocultarFormularios();

  switch (opcionMenu) {
    case "mnuAltaUsuario":
      frmAltaUsuario.classList.remove("d-none");
      actualizarDesplegableMembership(undefined); //<--aparezca un frm con plan
      break;
    case "mnuBuscarUsuario":
      frmBuscarUsuario.classList.remove("d-none");
      break;
    case "mnuListadoUsuarioPorEdad":
      frmListadoUsuarioPorEdad.classList.remove("d-none");
      break;
    case "mnuAltaReserva":
      frmAltaReserva.classList.remove("d-none");
      actualizarDesplegableAssessments(undefined);
      break;
    case "mnuBuscarReserva":
      frmBuscarReserva.classList.remove("d-none");
      break;
    case "mnuListadoReservaPorFecha":
      frmListadoReservaPorFecha.classList.remove("d-none");
      break;
  }
}
function ocultarFormularios() {
  frmAltaUsuario.classList.add("d-none");
  frmBuscarUsuario.classList.add("d-none");
  frmListadoUsuarioPorEdad.classList.add("d-none");
  frmModificarUsuario.classList.add("d-none");

  frmAltaReserva.classList.add("d-none");
  frmBuscarReserva.classList.add("d-none");
  frmListadoReservaPorFecha.classList.add("d-none");
  frmModificarReserva.classList.add("d-none");

  // Borrado del contenido de capas con resultados
  document.querySelector("#resultadoBusqueda").innerHTML = "";
  document.querySelector("#listados").innerHTML = "";
}

async function actualizarDesplegableMembership(idMembershipSeleccionado) {
  let respuesta = await oGimnasio.getPlanes();
  let options = "";

  for (let membership of respuesta.datos) {
    if (idMembershipSeleccionado && idMembershipSeleccionado == membership.id_membership) {
      // Si llega el parámetro ( != undefined )
      options += "<option selected value='" + membership.id_membership + "' >" + membership.plan + "</option>";
    } else {
      options += "<option value='" + membership.id_membership + "' >" + membership.plan + "</option>";
    }
  }
  // Agrego los options generados a partir del contenido de la BD en todos los desplegables
  frmAltaUsuario.lstAltaPlanes.innerHTML = options;

  frmModificarUsuario.lstAltaPlanes_mod.innerHTML = options;
}

async function actualizarDesplegableAssessments(idAssessmentSeleccionado) {
  let respuesta = await oGimnasio.getValoraciones();
  let options = "";

  for (let assessment of respuesta.datos) {
    if (idAssessmentSeleccionado && idAssessmentSeleccionado == assessment.id_assessment) {
      options += "<option selected value='" + assessment.id_assessment + "'>" + assessment.value + "</option>";
    } else {
      options += "<option value='" + assessment.id_assessment + "'>" + assessment.value + "</option>";
    }
  }

  frmAltaReserva.lstAssessmentsReservation.innerHTML = options;

  frmModificarReserva.lstAssessmentsReservation_mod.innerHTML = options;
}


async function procesarAltaUsuario() {
  // Recuperar datos del formulario frmAltaUsuario
  //ponemos trim para eliminar espacios
  let name = frmAltaUsuario.name_user.value.trim();
  let email = frmAltaUsuario.email.value.trim();
  let registration_date = frmAltaUsuario.registration_date.value;
  let age = parseInt(frmAltaUsuario.age.value.trim());
  let vip = frmAltaUsuario.vip.value; // "0" o "1"
  let observation = frmAltaUsuario.observation.value.trim();
  let id_membership = frmAltaUsuario.lstAltaPlanes.value;
  // Validar datos del formulario
  if (validarAltaUsuario()) {
    let respuesta = await oGimnasio.altaUsuario(new User(null, name, email, registration_date, age, vip, observation, id_membership));
    alert(respuesta.mensaje);

    if (!respuesta.error) {
      // Si NO hay error
      //Resetear formulario
      frmAltaUsuario.reset();
      // Ocultar el formulario
      frmAltaUsuario.classList.add("d-none");
    }
  }
}

async function procesarAltaReserva() {
  let name = frmAltaReserva.name_reservation.value.trim();
  let id_user = parseInt(frmAltaReserva.id_user.value.trim());
  let id_activity = parseInt(frmAltaReserva.id_activity.value.trim());
  let reservation_date = frmAltaReserva.reservation_date.value;
  let is_active = frmAltaReserva.is_active.value; //Cambiar si da fallos: parseInt(frmAltaReserva.is_active.value);
  let id_assessment = frmAltaReserva.lstAssessmentsReservation.value; //Cambiar si da fallos: parseInt(frmAltaReserva.lstAssessmentsReservation.value);

  if (validarAltaReserva()) {
    let respuesta = await oGimnasio.altaReserva(new Reservation(null, name, id_user, id_activity, reservation_date, is_active, id_assessment));
    alert(respuesta.mensaje);

    if (!respuesta.error) {
      frmAltaReserva.reset();
      frmAltaReserva.classList.add("d-none");
    }
  }
}

function validarAltaUsuario() {
  // Recuperar datos del formulario frmAltaUsuario
  let name = frmAltaUsuario.name_user.value.trim();
  let email = frmAltaUsuario.email.value.trim();
  let registration_date = frmAltaUsuario.registration_date.value.trim();
  let age = parseInt(frmAltaUsuario.age.value.trim());
  let observation = frmAltaUsuario.observation.value.trim();

  let valido = true;
  let errores = "";

  if (name.length == 0 || email.length == 0) {
    valido = false;
    errores += "El nombre y email no pueden estar vacíos \n";
  }

  if (registration_date.length == 0) {
    valido = false;
    errores += "La fecha de registro no puede estar vacía \n";
  }

  if (observation.length == 0) {
    valido = false;
    errores += "La observación no puede estar vacía \n";
  }

  if (isNaN(age)) {
    valido = false;
    errores += "La edad del usuario debe ser numérico \n";
  } else if (age < 5 || age > 99) {
    valido = false;
    errores += "La edad debe estar entre 5 y 99 años \n";
  }

  if (!valido) {
    // Hay errores
    alert(errores);
  }

  return valido;
}

function validarAltaReserva() {
  let name = frmAltaReserva.name_reservation.value.trim();
  let id_user = frmAltaReserva.id_user.value.trim();
  let id_activity = frmAltaReserva.id_activity.value.trim();
  let reservation_date = frmAltaReserva.reservation_date.value.trim();
  let id_assessment = frmAltaReserva.lstAssessmentsReservation.value;

  let valido = true;
  let errores = "";

  if (name.length == 0) {
    valido = false;
    errores += "El nombre de la reserva no puede estar vacío \n";
  }
  if (reservation_date.length == 0) {
    valido = false;
    errores += "La fecha de la reserva no puede estar vacía \n";
  }
  if (id_user.length == 0 || isNaN(parseInt(id_user))) {
    valido = false;
    errores += "El ID de usuario debe ser numérico y no vacío \n";
  }
  if (id_activity.length == 0 || isNaN(parseInt(id_activity))) {
    valido = false;
    errores += "El ID de actividad debe ser numérico y no vacío \n";
  }
  if (!id_assessment || isNaN(parseInt(id_assessment))) {
    valido = false;
    errores += "Debe seleccionar una valoración válida \n";
  }

  if (!valido) alert(errores);
  return valido;
}

async function procesarBuscarUsuario() {
  if (validarBuscarUsuario()) {
    let name = frmBuscarUsuario.name_user_buscar.value.trim();
    let respuesta = await oGimnasio.buscarUsuario(name);

    if (!respuesta.error) {
      let resultadoBusqueda = document.querySelector("#resultadoBusqueda");

      let tablaSalida = "<table class='table table-striped' id='tablaUsuarios'>";
      tablaSalida +=
        "<thead><tr><th>ID</th><th>Nombre</th><th>Email</th><th>Fecha Registro</th><th>Edad</th><th>VIP</th><th>Observación</th><th>Plan</th></tr></thead><tbody>";

      for (let usuario of respuesta.datos) {
        tablaSalida += "<tr>";
        tablaSalida += "<td>" + usuario.id_user + "</td>";
        tablaSalida += "<td>" + usuario.name + "</td>";
        tablaSalida += "<td>" + usuario.email + "</td>";
        tablaSalida += "<td>" + usuario.registration_date + "</td>";
        tablaSalida += "<td>" + usuario.age + "</td>";
        tablaSalida += "<td>" + (usuario.vip == 1 ? "Sí" : "No") + "</td>";
        tablaSalida += "<td>" + usuario.observation + "</td>";
        tablaSalida += "<td>" + usuario.membershipPlan + "</td>";
        tablaSalida += "<td><button class='btn btn-danger' data-id_user='" + usuario.id_user + "'><i class='bi bi-trash'></i></button></td>";
        tablaSalida += "</tr>";
      }

      tablaSalida += "</tbody></table>";
      resultadoBusqueda.innerHTML = tablaSalida;

      document.querySelector("#tablaUsuarios").addEventListener("click", borrarUsuario);
    } else {
      alert(respuesta.mensaje);
    }
  }
}

async function procesarBuscarReserva() {
  if (validarBuscarReserva()) {
    let name = frmBuscarReserva.name_reservation_buscar.value.trim();
    let respuesta = await oGimnasio.buscarReserva(name);

    if (!respuesta.error) {
      let resultadoBusqueda = document.querySelector("#resultadoBusqueda");

      let tablaSalida = "<table class='table table-striped' id='tablaReservas'>";
      tablaSalida += "<thead><tr><th>ID</th><th>Nombre</th><th>ID Usuario</th><th>ID Actividad</th><th>Fecha</th><th>Activa</th><th>Valoración</th><th>Acciones</th></tr></thead><tbody>";

      for (let reserva of respuesta.datos) {
        tablaSalida += "<tr>";
        tablaSalida += "<td>" + reserva.id_reservation + "</td>";
        tablaSalida += "<td>" + reserva.name + "</td>";
        tablaSalida += "<td>" + reserva.id_user + "</td>";
        tablaSalida += "<td>" + reserva.id_activity + "</td>";
        tablaSalida += "<td>" + reserva.reservation_date + "</td>";
        tablaSalida += "<td>" + (reserva.is_active == 1 ? "Sí" : "No") + "</td>";
        tablaSalida += "<td>" + reserva.assessment_value + "</td>";
        tablaSalida += "<td>";
        tablaSalida += "<td><button class='btn btn-danger' data-id_reservation='" + reserva.id_reservation + "'><i class='bi bi-trash'></i></button></td>";
        tablaSalida += "</td>";
        tablaSalida += "</tr>";
      }

      tablaSalida += "</tbody></table>";
      resultadoBusqueda.innerHTML = tablaSalida;

      document.querySelector("#tablaReservas").addEventListener("click", borrarReserva);
    } else {
      alert(respuesta.mensaje);
    }
  }
}

function validarBuscarUsuario() {
  // Recuperar datos del formulario frmBuscarUsuario
  let name = frmBuscarUsuario.name_user_buscar.value.trim();
  let valido = true;
  let errores = "";

  if (name.length == 0) {
    valido = false;
    errores += "El nombre no puede estar vacío";
  }

  if (!valido) {
    // Hay errores
    alert(errores);
  }

  return valido;
}

function validarBuscarReserva() {
  let name = frmBuscarReserva.name_reservation_buscar.value.trim();
  let valido = true;
  let errores = "";

  if (name.length == 0) {
    valido = false;
    let errores = "";
  }

  if (!valido) {
    //hay errores
    alert(errores);
  }
  return valido;
}

async function procesarListadoUsuarioPorEdad() {
  let minimum_age = parseInt(frmListadoUsuarioPorEdad.minimum_age.value.trim());
  let maximum_age = parseInt(frmListadoUsuarioPorEdad.maximum_age.value.trim());

  let respuesta = await oGimnasio.listadoPorEdad(minimum_age, maximum_age);

  let listado = "<table class='table table-striped' id='listadoPorPlan'>";

  listado +=
    "<thead><tr><th>ID</th><th>Nombre</th><th>Email</th><th>Fecha Registro</th><th>Edad</th><th>VIP</th><th>Observación</th><th>Plan</th><th>Acción</th></tr></thead>";
  listado += "<tbody>";

  for (let fila of respuesta.datos) {
    listado += "<tr>";
    listado += "<td>" + fila.id_user + "</td>";
    listado += "<td>" + fila.name + "</td>";
    listado += "<td>" + fila.email + "</td>";
    listado += "<td>" + fila.registration_date + "</td>";
    listado += "<td>" + fila.age + "</td>";
    listado += "<td>" + fila.vip + "</td>";
    listado += "<td>" + fila.observation + "</td>";
    listado += "<td>" + fila.plan + "</td>";
    listado += "<td><button class='btn btn-primary' data-fila='" + JSON.stringify(fila) + "'><i class='bi bi-pencil-square'></i></button></td></tr>";
  }

  listado += "</tbody></table>";

  // Agregamos el contenido a la capa de listados
  document.querySelector("#listados").innerHTML = listado;
  // Agregar manejador de evento para toda la tabla
  document.querySelector("#listadoPorPlan").addEventListener("click", procesarBotonEditarUsuario);
}

async function procesarListadoReservasPorFecha() {
  let respuesta = await oGimnasio.listadoReservasPorFecha();


  let listado = "<table class='table table-striped' id='listadoReservasPorFecha'>";
  listado += "<thead><tr><th>ID</th><th>Nombre</th><th>ID Usuario</th><th>ID Actividad</th><th>Fecha</th><th>Activa</th><th>Valoración</th><th>Acciones</th></tr></thead><tbody>";

  for (let fila of respuesta.datos) {
    listado += "<tr>";
    listado += "<td>" + fila.id_reservation + "</td>";
    listado += "<td>" + fila.name + "</td>";
    listado += "<td>" + fila.id_user + "</td>";
    listado += "<td>" + fila.id_activity + "</td>";
    listado += "<td>" + fila.reservation_date + "</td>";
    listado += "<td>" + (fila.is_active == 1 ? "Sí" : "No") + "</td>";
    listado += "<td>" + fila.assessment_value + "</td>";
    listado += "<td><button class='btn btn-primary' data-fila='" + JSON.stringify(fila) + "'><i class='bi bi-pencil-square'></i></button></td></tr>";
    listado += "<tr>";
  }

  listado += "</tbody></table>";
  document.querySelector("#listados").innerHTML = listado;

  // Eventos de acción sobre la tabla
  document.querySelector("#listadoReservasPorFecha").addEventListener("click", procesarBotonEditarReserva);
}

// async function procesarListadoReservas() {
//   let respuesta = await oGimnasio.listadoReservas();

//   if (respuesta.ok && Array.isArray(respuesta.datos)) {
//     let listado = "<table class='table table-striped' id='listadoReservas'>";
//     listado += "<thead><tr><th>ID</th><th>Nombre</th><th>ID Usuario</th><th>ID Actividad</th><th>Fecha</th><th>Activa</th><th>Valoración</th><th>Acciones</th></tr></thead><tbody>";

//     for (let fila of respuesta.datos) {
//       listado += "<tr>";
//       listado += "<td>" + fila.id_reservation + "</td>";
//       listado += "<td>" + fila.name + "</td>";
//       listado += "<td>" + fila.id_user + "</td>";
//       listado += "<td>" + fila.id_activity + "</td>";
//       listado += "<td>" + fila.reservation_date + "</td>";
//       listado += "<td>" + (fila.is_active == 1 ? "Sí" : "No") + "</td>";
//       listado += "<td>" + fila.assessment_value + "</td>";
//       listado += "<td><button class='btn btn-primary' data-fila='" + JSON.stringify(fila) + "'><i class='bi bi-pencil-square'></i></button></td>";
//       listado += "</tr>";
//     }

//     listado += "</tbody></table>";

//     document.querySelector("#listados").innerHTML = listado;

//     // Eventos de acción sobre la tabla
//     document.querySelector("#listadoReservas").addEventListener("click", (e) => {
//       const btn = e.target.closest("button");
//       if (!btn) return;
//       const fila = JSON.parse(btn.dataset.fila);
//       procesarBotonEditarReserva(fila);
//     });

//   } else {
//     console.error("Respuesta inválida:", respuesta);
//     document.querySelector("#listados").innerHTML = "<p class='text-danger'>No se pudieron cargar las reservas.</p>";
//   }
// }


function procesarBotonEditarUsuario(oEvento) {
  let boton = null;

  // Verificamos si han hecho clic sobre el botón o el icono
  if (oEvento.target.nodeName == "I" || oEvento.target.nodeName == "button") {
    if (oEvento.target.nodeName == "I") {
      // Pulsacion sobre el icono
      boton = oEvento.target.parentElement; // El padre es el boton
    } else {
      boton = oEvento.target;
    }
    // 1.Ocultar todos los formularios
    ocultarFormularios();
    // 2.Mostrar el formulario de modificación de usuario
    frmModificarUsuario.classList.remove("d-none");
    // 3. Rellenar los datos de este formulario con los del usuario
    let user = JSON.parse(boton.dataset.fila); //es fila por el de arriba

    frmModificarUsuario.id_user_mod.value = user.id_user;
    frmModificarUsuario.name_user_mod.value = user.name;
    frmModificarUsuario.email_mod.value = user.email;
    frmModificarUsuario.registration_date_mod.value = user.registration_date;
    frmModificarUsuario.age_mod.value = user.age;
    frmModificarUsuario.vip_mod.value = user.vip;
    frmModificarUsuario.observation_mod.value = user.observation;

    actualizarDesplegableMembership(user.id_membership);
  }
}

function procesarBotonEditarReserva(oEvento) {
  let boton = null;

  if (oEvento.target.nodeName == "I" || oEvento.target.nodeName == "button") {
    if (oEvento.target.nodeName == "I") {
      // Pulsacion sobre el icono
      boton = oEvento.target.parentElement; // El padre es el boton
    } else {
      boton = oEvento.target;
    }
    ocultarFormularios();
    frmModificarReserva.classList.remove("d-none");

    let reservation = JSON.parse(boton.dataset.fila);

    frmModificarReserva.id_reservation_mod.value = reservation.id_reservation;
    frmModificarReserva.name_reservation_mod.value = reservation.name;
    frmModificarReserva.id_user_mod.value = reservation.id_user;
    frmModificarReserva.id_activity_mod.value = reservation.id_activity;
    frmModificarReserva.reservation_date_mod.value = reservation.reservation_date;
    frmModificarReserva.is_active_mod.value = reservation.is_active;

    actualizarDesplegableAssessments(reservation.id_assessment);
  }
}


async function procesarModificarUsuario() {
  // Recuperar datos del formulario frmModificarUsuario
  let id_user = frmModificarUsuario.id_user_mod.value.trim();
  let name = frmModificarUsuario.name_user_mod.value.trim();
  let email = frmModificarUsuario.email_mod.value.trim();
  let registration_date = frmModificarUsuario.registration_date_mod.value;
  let age = parseInt(frmModificarUsuario.age_mod.value.trim());
  let vip = frmModificarUsuario.vip_mod.value; // "0" o "1"
  let observation = frmModificarUsuario.observation_mod.value.trim();
  let id_membership = frmModificarUsuario.lstAltaPlanes_mod.value;

  // Validar datos del formulario
  if (validarModUsuario()) {
    let respuesta = await oGimnasio.modificarUsuario(new User(id_user, name, email, registration_date, age, vip, observation, id_membership));

    alert(respuesta.mensaje);

    if (!respuesta.error) {
      // Si NO hay error
      //Resetear formulario
      frmModificarUsuario.reset();
      // Ocultar el formulario
      frmModificarUsuario.classList.add("d-none");
    }
  }
}

async function procesarModificarReserva() {
  let id_reservation = frmModificarReserva.id_reservation_mod.value.trim();
  let name = frmModificarReserva.name_reservation_mod.value.trim();
  let id_user = parseInt(frmModificarReserva.id_user_mod.value.trim());
  let id_activity = parseInt(frmModificarReserva.id_activity_mod.value.trim());
  let reservation_date = frmModificarReserva.reservation_date_mod.value;
  let is_active = frmModificarReserva.is_active_mod.value;
  let id_assessment = frmModificarReserva.lstAssessmentsReservation_mod.value;

  if (validarModReserva()) {
    let respuesta = await oGimnasio.modificarReserva(new Reservation(id_reservation, name, id_user, id_activity, reservation_date, is_active, id_assessment));

    alert(respuesta.mensaje);

    if (!respuesta.error) {
      frmModificarReserva.reset();
      frmModificarReserva.classList.add("d-none");
    }
  }
}

function validarModUsuario() {
  // Recuperar datos del formulario frmModificarUsuario
  let id_user = frmModificarUsuario.id_user_mod.value.trim();
  let name = frmModificarUsuario.name_user_mod.value.trim();
  let email = frmModificarUsuario.email_mod.value.trim();
  let registration_date = frmModificarUsuario.registration_date_mod.value;
  let age = parseInt(frmModificarUsuario.age_mod.value.trim());
  let observation = frmModificarUsuario.observation_mod.value.trim();

  let valido = true;
  let errores = "";

  if (isNaN(id_user)) {
    valido = false;
    errores += "El identificador de usuario debe ser numérico \n";
  }

  if (name.length == 0 || email.length == 0) {
    valido = false;
    errores += "El nombre y email no pueden estar vacíos \n";
  }

  if (registration_date.length == 0) {
    valido = false;
    errores += "La fecha de registro no puede estar vacía \n";
  }

  if (observation.length == 0) {
    valido = false;
    errores += "La observación no puede estar vacía \n";
  }

  if (isNaN(age)) {
    valido = false;
    errores += "La edad del usuario debe ser numérico \n";
  } else if (age < 5 || age > 99) {
    valido = false;
    errores += "La edad debe estar entre 5 y 99 años \n";
  }

  if (!valido) {
    // Hay errores
    alert(errores);
  }

  return valido;
}

function validarModReserva() {
  let id_reservation = frmModificarReserva.id_reservation_mod.value.trim();
  let name = frmModificarReserva.name_reservation_mod.value.trim();
  let id_user = frmModificarReserva.id_user_mod.value.trim();
  let id_activity = frmModificarReserva.id_activity_mod.value.trim();
  let reservation_date = frmModificarReserva.reservation_date_mod.value;

  let valido = true;
  let errores = "";

  if (isNaN(id_reservation)) {
    valido = false;
    errores += "El identificador de reserva debe ser numérico \n";
  }

  if (name.length == 0) {
    valido = false;
    errores += "El nombre de la reserva no puede estar vacío \n";
  }
  if (reservation_date.length == 0) {
    valido = false;
    errores += "La fecha de la reserva no puede estar vacía \n";
  }
  if (id_user.length == 0 || isNaN(parseInt(id_user))) {
    valido = false;
    errores += "El ID de usuario debe ser numérico y no vacío \n";
  }
  if (id_activity.length == 0 || isNaN(parseInt(id_activity))) {
    valido = false;
    errores += "El ID de actividad debe ser numérico y no vacío \n";
  }

  if (!valido) {
    // Hay errores
    alert(errores);
  }

  return valido;
}

async function borrarUsuario(oEvento) {
  let boton = oEvento.target.closest("button");
  if (!boton) return; // seguridad

  let id_user = boton.dataset.id_user; // ahora sí coincide

  let respuesta = await oGimnasio.borrarUsuario(id_user);

  alert(respuesta.mensaje);

  if (!respuesta.error) {
    boton.closest("tr").remove();
  }
}

async function borrarReserva(oEvento) {
  let boton = oEvento.target.closest("button");
  if (!boton) return;

  let id_reservation = boton.dataset.id_reservation;

  let respuesta = await oGimnasio.borrarReserva(id_reservation);

  alert(respuesta.mensaje);

  if (!respuesta.error) {
    boton.closest("tr").remove();
  }
}

function mostrarUsuarios() {
  open("listado_usuarios.html");
}

