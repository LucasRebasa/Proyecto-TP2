module.exports = class Turno{

    constructor(fecha,especialidad,Medico,Paciente,Sede){
        this.id = this.id
        this.fecha = fecha
        this.especialidad = especialidad
        this.Medico = Medico
        this.Paciente = Paciente
        this.Sede = Sede
    }

    vigenciaDeTurno(){
       const fechaActual = new Date()
      return this.fecha > fechaActual
    }


    cancelar() {
        this.paciente = null;
        this.medico = null;
    }

    posponer(nuevaFecha) {
        if(nuevaFecha > this.fecha){
            this.fecha = nuevaFecha
            return true
        }
        return false
    }


    toString() {
        return `Turno ${this.id}: ${this.fecha} ${this.hora}, Paciente: ${this.paciente}, Médico: ${this.medico}`;
    }
    
    }





