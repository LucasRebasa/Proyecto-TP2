
module.exports = class Paciente {
  constructor(dni, nombre, apellido, email,password) {
    this.dni = dni;
    this.nombre = nombre;
    this.apellido = apellido;
    this.email = email;
    this.password = password
  }

  agregarTurno(turno) {
    this.turnos.push(turno)
  }

  posponerTurno(turno, nuevaFecha){
    let hoy = new Date();
    if(hoy.getTime() - nuevaFecha.getTime() >= 172800000){
        turno.fecha = nuevaFecha;
        this.turnosAsignados = this.turnosAsignados.map(e => e.id === turno.id ? turno : e);
    }
}

cancelarTurno(turnoACancelar){
  this.turnosAsignados = this.turnosAsignados.filter(turno => turno.id !== turnoACancelar.id)
}

  validarEmail(email) {
    const expresionRegular = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if(expresionRegular.test(email)) {
        return email
    }
    return null
  }
};
