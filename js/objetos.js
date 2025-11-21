"use strict";

class User {
  #id_user;
  #name;
  #email;
  #registration_date;
  #age;
  #vip;
  #observation;
  #id_membership;
  constructor(id_user, name, email, registration_date, age, vip, observation, id_membership) {
    this.#id_user = id_user;
    this.#name = name;
    this.#email = email;
    this.#registration_date = registration_date;
    this.#age = age;
    this.#vip = vip;
    this.#observation = observation;
    this.#id_membership = id_membership;
  }

  get id_user() {
    return this.#id_user;
  }
  set id_user(id_user) {
    this.#id_user = id_user;
  }

  get name() {
    return this.#name;
  }
  set name(name) {
    this.#name = name;
  }

  get email() {
    return this.#email;
  }
  set email(email) {
    this.#email = email;
  }

  get registration_date() {
    return this.#registration_date;
  }
  set registration_date(registration_date) {
    this.#registration_date = registration_date;
  }

  get age() {
    return this.#age;
  }
  set age(age) {
    this.#age = age;
  }

  get vip() {
    return this.#vip;
  }
  set vip(vip) {
    this.#vip = vip;
  }

  get observation() {
    return this.#observation;
  }
  set observation(observation) {
    this.#observation = observation;
  }
  get id_membership() {
    return this.#id_membership;
  }
  set id_membership(id_membership) {
    this.#id_membership = id_membership;
  }
  // toJSON() sirve para controlar cómo se representa tu objeto en formato JSON
  toJSON() {
    let oUser = {
      id_user: this.#id_user,
      name: this.#name,
      email: this.#email,
      registration_date: this.#registration_date,
      age: this.#age,
      vip: this.#vip,
      observation: this.#observation,
      id_membership: this.#id_membership,
    };
    return oUser;
  }
}

class Reservation {
  #id_reservation;
  #name;
  #id_user;
  #id_activity;
  #reservation_date;
  #is_active;
  #id_assessment;

  constructor(id_reservation, name, id_user, id_activity, reservation_date, is_active, id_assessment) {
    this.#id_reservation = id_reservation;
    this.#name = name;
    this.#id_user = id_user;
    this.#id_activity = id_activity;
    this.#reservation_date = reservation_date;
    this.#is_active = is_active;
    this.#id_assessment = id_assessment;
  }

  get id_reservation() {
    return this.#id_reservation;
  }
  set id_reservation(id_reservation) {
    this.#id_reservation = id_reservation;
  }

  get name() {
    return this.#name;
  }
  set name(name) {
    this.#name = name;
  }

  get id_user() {
    return this.#id_user;
  }
  set id_user(id_user) {
    this.#id_user = id_user;
  }

  get id_activity() {
    return this.#id_activity;
  }
  set id_activity(id_activity) {
    this.#id_activity = id_activity;
  }

  get reservation_date() {
    return this.#reservation_date;
  }
  set reservation_date(reservation_date) {
    this.#reservation_date = reservation_date;
  }

  get is_active() {
    return this.#is_active;
  }
  set is_active(is_active) {
    this.#is_active = is_active;
  }

  get id_assessment() {
    return this.#id_assessment;
  }
  set id_assessment(id_assessment) {
    this.#id_assessment = id_assessment;
  }

  toJSON() {
    let oReservation = {
      id_reservation: this.#id_reservation,
      name: this.#name,
      id_user: this.#id_user,
      id_activity: this.#id_activity,
      reservation_date: this.#reservation_date,
      is_active: this.#is_active,
      id_assessment: this.#id_assessment,
    };
    return oReservation;
  }
}

class Activity {
  #id_activity;
  #name;
  #description;
  #activity_day;
  #duration;
  #available;
  #id_trainer;
  constructor(id_activity,
    name,
    description,
    activity_day,
    duration,
    available,
    id_trainer) {
    this.#id_activity = id_activity;
    this.#name = name;
    this.#description = description;
    this.#activity_day = activity_day;
    this.#duration = duration;
    this.#available = available;
    this.#id_trainer = id_trainer;
  }
  get id_activity() {
    return this.#id_activity;
  }
  set id_activity(id_activity) {
    this.#id_activity = id_activity;
  }
  get name() {
    return this.#name;
  }
  set name(name) {
    this.#name = name;
  }
  get description() {
    return this.#description;
  }
  set description(description) {
    this.#description = description;
  }
  get activity_day() {
    return this.#activity_day;
  }
  set activity_day(activity_day) {
    this.#activity_day = activity_day;
  }
  get duration() {
    return this.#duration;
  }
  set duration(duration) {
    this.#duration = duration;
  }
  get available() {
    return this.#available;
  }
  set available(available) {
    this.#available = available;
  }
  get id_trainer() {
    return this.#id_trainer;
  }
  set id_trainer(id_trainer) {
    this.#id_trainer = id_trainer;
  }
  toJSON() {
    let oActivity = {
      id_activity: this.#id_activity,
      name: this.#name,
      description: this.#description,
      activity_day: this.#activity_day,
      duration: this.#duration,
      available: this.#available,
      id_trainer: this.#id_trainer,
    };
    return oActivity;
  }
}
class Gimnasio {
  async altaUsuario(oUser) {
    let datos = new FormData();
    //No es necesario pasar campo por campo
    datos.append("user", JSON.stringify(oUser));
    let respuesta = await peticionPOST("alta_usuario.php", datos);
    return respuesta;
  }

  async altaReserva(oReservation) {
    let datos = new FormData();
    datos.append("reservation", JSON.stringify(oReservation));
    let respuesta = await peticionPOST("alta_reserva.php", datos);
    return respuesta;
  }

  async getPlanes() {
    let datos = new FormData();
    let respuesta = await peticionGET("get_planes.php", datos);
    return respuesta;
  }

  async getValoraciones() {
    let datos = new FormData();
    let respuesta = await peticionGET("get_valoraciones.php", datos);
    return respuesta;
  }

  async buscarUsuario(name) {
    let datos = new FormData();
    datos.append("name", name);
    let respuesta = await peticionPOST("buscar_usuario.php", datos);
    return respuesta;
  }

  async buscarReserva(name) {
    let datos = new FormData();
    datos.append("name", name);
    let respuesta = await peticionPOST("buscar_reserva.php", datos);
    return respuesta;
  }

  async borrarUsuario(id_user) {
    let datos = new FormData();
    datos.append("id_user", id_user);
    let respuesta = await peticionPOST("borrar_usuario.php", datos);
    return respuesta;
  }

  async borrarReserva(id_reservation) {
    let datos = new FormData();
    datos.append("id_reservation", id_reservation);
    let respuesta = await peticionPOST("borrar_reserva.php", datos);
    return respuesta;
  }

  async listadoUsuariosConPlan() {
    let listado = "";

    let respuesta = await peticionGET("get_planes_listado.php", new FormData());

    if (!respuesta.ok) {
      listado = respuesta.mensaje;
    } else {
      listado = "<table class='table table-striped'>";
      listado += "<thead><tr><th>ID</th><th>Nombre</th><th>Email</th><th>Fecha Registro</th><th>Edad</th><th>VIP</th><th>Observación</th><th>Plan</th></tr></thead>";
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
        listado += "<td>" + fila.membershipPlan + "</td>";
        listado += "</tr>";
      }

      listado += "</tbody></table>";
    }

    return listado;
  }

  // async listadoReservas() {
  //   let listado = "";

  //   let respuesta = await peticionGET("get_reservas_listado.php", new FormData());

  //   if (!respuesta.ok) {
  //     listado = respuesta.mensaje;
  //   } else {
  //     listado = "<table class='table table-striped'>";
  //     listado += "<thead><tr><th>ID</th><th>Nombre</th><th>ID Usuario</th><th>ID Actividad</th><th>Fecha</th><th>Activa</th><th>Valoración</th></tr></thead>";
  //     listado += "<tbody>";

  //     for (let fila of respuesta.datos) {
  //       listado += "<tr>";
  //       listado += "<td>" + fila.id_reservation + "</td>";
  //       listado += "<td>" + fila.name + "</td>";
  //       listado += "<td>" + fila.id_user + "</td>";
  //       listado += "<td>" + fila.id_activity + "</td>";
  //       listado += "<td>" + fila.reservation_date + "</td>";
  //       listado += "<td>" + (fila.is_active == 1 ? "Sí" : "No") + "</td>";
  //       listado += "<td>" + fila.assessment_value + "</td>";
  //       listado += "</tr>";
  //     }

  //     listado += "</tbody></table>";
  //   }

  //   return listado;
  // }

  async listadoPorEdad(minimum_age, maximum_age) {
    let datos = new FormData();
    datos.append("minimum_age", minimum_age);
    datos.append("maximum_age", maximum_age);
    let respuesta = await peticionGET("get_usuarios_por_edad.php", datos);

    return respuesta;
  }

  async listadoReservasPorFecha() {
    let datos = new FormData();
    let respuesta = await peticionGET("get_reservas_por_fecha.php", datos);
    return respuesta;
  }

  async modificarUsuario(oUser) {
    let datos = new FormData();
    datos.append("user", JSON.stringify(oUser));
    let respuesta = await peticionPOST("modificar_usuario.php", datos);
    return respuesta;
  }

  async modificarReserva(oReservation) {
    let datos = new FormData();
    datos.append("reservation", JSON.stringify(oReservation));
    let respuesta = await peticionPOST("modificar_reserva.php", datos);
    return respuesta;
  }
  async altaActividad(oActivity) {
    let datos = new FormData();

    datos.append("activity", JSON.stringify(oActivity));

    let respuesta = await peticionPOST("alta_actividad.php", datos);

    return respuesta;
  }
  async borrarActividad(id_activity){
    let datos = new FormData();

    datos.append("id_activity", id_activity);

    let respuesta = await peticionPOST("borrar_actividad.php", datos);

    return respuesta;
  }
  async modificarActividad(oActividad){
    let datos = new FormData();

    datos.append("activity", JSON.stringify(oActividad));

    let respuesta = await peticionPOST("modificar_actividad.php", datos);
    return respuesta
  }
  async listadoActividades(){
    let datos = new FormData();

    let respuesta = await peticionGET("get_actividades.php", datos);
    
    return respuesta;
  }
  
  async listadoActividadesOrdered(){
    let datos = new FormData();

    datos.append("orderByDate", "1");

    let respuesta = await peticionGET("get_actividades.php", datos);

    return respuesta;
  }
  
  async listadoActividadesPorEntrenador(trainer){
    let datos = new FormData();

    datos.append("trainer", trainer);

    let respuesta = await peticionGET("get_actividades.php", datos);

    return respuesta;
  }
  
  async listadoActividadesPorNombre(activityName){
    let datos = new FormData();

    datos.append("activityName", activityName);

    let respuesta = await peticionGET("get_actividades.php", datos);

    return respuesta;
  }
}
