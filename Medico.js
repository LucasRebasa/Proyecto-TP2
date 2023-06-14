module.exports = class Medico{

    constructor(dni,nombre,apellido,email){

        this.dni = dni
        this.nombre = nombre
        this.apellido = apellido 
        this.email = email
        this.turnosAsignados = []
    }

    estaDisponible(fecha){
        return !this.turnosAsignados.find(e => e.fecha === fecha);
    }
    
    agregarTurno(turno){
       this.turnosAsignados.push(turno)
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

}