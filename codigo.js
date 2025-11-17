"use strict";
// MAIN PROGRAM
var oGimnasio = new Gimnasio();

registrarEventos();

// Registro de eventos
function registrarEventos() {
  //Opciones del menu
  //mostarFormulario son los que mustran un formulario
  document.querySelector("#mnuAltaUsuario").addEventListener("click", mostrarFormulario);
  document.querySelector("#mnuBuscarUsuario").addEventListener("click", mostrarFormulario);
  document.querySelector("#mnuListadoUsuario").addEventListener("click", mostrarUsuarios); //no muestra un frm
  document.querySelector("#mnuListadoUsuarioPorEdad").addEventListener("click", mostrarFormulario);
  //Botones
  frmAltaUsuario.btnAceptarAltaUsuario.addEventListener("click", procesarAltaUsuario);
  frmBuscarUsuario.btnAceptarBuscarUsuario.addEventListener("click", procesarBuscarUsuario);
  frmListadoUsuarioPorEdad.btnAceptarBuscarUsuarioPorEdad.addEventListener("click", procesarListadoUsuarioPorEdad);
  frmModificarUsuario.btnAceptarModUsuario.addEventListener("click", procesarModificarUsuario);
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
  }
}
function ocultarFormularios() {
  frmAltaUsuario.classList.add("d-none");
  frmBuscarUsuario.classList.add("d-none");
  frmListadoUsuarioPorEdad.classList.add("d-none");
  frmModificarUsuario.classList.add("d-none");

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

async function procesarModificarUsuario() {
  // Recuperar datos del formulario frmModificarUsuario
  let id_user = frmModificarUsuario.id_user_mod.value.trim();
  let name = frmModificarUsuario.name_user_mod.value.trim();
  let email = frmModificarUsuario.email_mod.value.trim();
  let registration_date = frmModificarUsuario.registration_date_mod.value;
  let age = parseInt(frmModificarUsuario.age_mod.value.trim());
  let vip = frmModificarUsuario.vip_mod.value; // "0" o "1"
  let observation = frmModificarUsuario.observation_mod.value.trim();
  let id_Membership = frmModificarUsuario.lstAltaPlanes_mod.value;

  // Validar datos del formulario
  if (validarModUsuario()) {
    let respuesta = await oGimnasio.modificarUsuario(new User(id_user, name, email, registration_date, age, vip, observation, id_Membership));

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

function mostrarUsuarios(){
  open("listado_usuarios.html");
}