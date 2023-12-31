module.exports = class Turno {

    constructor(fecha, hora, especialidad, medico, paciente) {
        this.fecha = fecha;
        this.especialidad = especialidad;
        this.medico = medico;
        this.paciente = paciente;
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





