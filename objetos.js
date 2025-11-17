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
class Gimnasio {
  async altaUsuario(oUser) {
    let datos = new FormData();

    //No es necesario pasar campo por campo
    datos.append("user", JSON.stringify(oUser));

    let respuesta = await peticionPOST("alta_usuario.php", datos);

    return respuesta;
  }

  async getPlanes() {
    let datos = new FormData();

    let respuesta = await peticionGET("get_planes.php", datos);

    return respuesta;
  }

  async buscarUsuario(name) {
    let datos = new FormData();

    datos.append("name", name);

    let respuesta = await peticionPOST("buscar_usuario.php", datos);

    return respuesta;
  }

  async borrarUsuario(id_user) {
    let datos = new FormData();

    datos.append("id_user", id_user);

    let respuesta = await peticionPOST("borrar_usuario.php", datos);

    return respuesta;
  }
  async listadoUsuariosConPlan() {
    let listado = "";

    let respuesta = await peticionGET("get_planes_listado.php", new FormData());

    if (!respuesta.ok) {
      listado = respuesta.mensaje;
    } else {
      listado = "<table class='table table-striped'>";
      listado +=
        "<thead><tr><th>ID</th><th>Nombre</th><th>Email</th><th>Fecha Registro</th><th>Edad</th><th>VIP</th><th>Observación</th><th>Plan</th></tr></thead>";
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

  async listadoPorEdad(minimum_age, maximum_age) {
    let datos = new FormData();
    datos.append("minimum_age", minimum_age);
    datos.append("maximum_age", maximum_age);

    let respuesta = await peticionGET("get_usuarios_por_edad.php", datos);

    return respuesta;
  }

  async modificarUsuario(oUser) {
    let datos = new FormData();

    datos.append("user", JSON.stringify(oUser));

    let respuesta = await peticionPOST("modificar_usuario.php", datos);

    return respuesta;
  }
}
