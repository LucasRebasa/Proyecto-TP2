 const Turno = require('../Turno.js')
 const Factory = require('../Factory.js');
 //const RepositoryTurnos = require('./Repositories/RepositoryTurnos.js')
 //const RepositoryMedico = require('./RepositoryMedico.js')
 //const RepositoryPaciente = require('./Repositories/RepositoryPaciente.js')
 //const Medico = require('./Medico.js')
 //const Paciente = require('./Paciente.js')
 module.exports = class GestorTurnos{

    constructor(repositoryTurnos, repositoryMedico, repositoryPaciente){
        this.factory = new Factory();
        this.repositoryTurnos = repositoryTurnos;
        this.repositoryMedico = repositoryMedico;
        this.repositoryPaciente = repositoryPaciente;
    }

    agregarTurno(fecha,especialidad,medico,paciente,sede){
        return this.repositoryTurnos.agregarTurno();
    }
        
        
    cancelarTurno(id){
        let fechaActual = new Date();
        let turnoActual = this.repositoryTurnos.findById(id);
        if( fechaActual.getTime() - turnoActual.fecha.getTime() >= 172800000){
            return this.repositoryTurnos.deleteById(id);
        }
    }

    modificarTurno(turno, fechaNueva){
        let fechaTurno = this.turno.fecha;
        if(fechaNueva.getTime() - fechaTurno.getTime() >= 172800000 ){
            this.repositoryTurnos.update(turno, fechaNueva);
            turno.paciente.posponerTurno(fechaNueva);
            turno.medico.posponerTurno(fechaNueva);
        }
    }

    buscarTurnoPorPaciente(paciente){
        return this.repositoryTurnos.findByPaciente(paciente);
    }

    buscarTurnoPorMedico(medico){
        return this.repositoryTurnos.findByMedico(medico);
    }

    buscarTurnoPorId(id){
        return this.repositoryTurnos.findById(id);
    }

    
    
 }



