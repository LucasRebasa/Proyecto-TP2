module.exports = class Turno {

    constructor(fecha, hora, especialidad, medico, paciente, sede) {
        this.fecha = fecha;
        this.especialidad = especialidad;
        this.Medico = medico;
        this.Paciente = paciente;
        this.Sede = sede;
        this.hora = hora;
    }

    vigenciaDeTurno() {
        const fechaActual = new Date()
        return this.fecha > fechaActual
    }


    cancelar() {
        this.paciente = null;
        this.medico = null;
    }

    posponer(nuevaFecha) {
        if (nuevaFecha > this.fecha) {
            this.fecha = nuevaFecha
            return true
        }
        return false
    }


    toString() {
        return `Turno ${this.id}: ${this.fecha} ${this.hora}, Paciente: ${this.paciente}, Médico: ${this.medico}`;
    }

}





