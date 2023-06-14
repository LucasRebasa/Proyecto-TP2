const RepositoryPaciente = require('./Repositories/RepositoryPaciente.js')

const repoPaciente = new RepositoryPaciente()

module.exports = class PacienteService {

    async crearPaciente(paciente){
        if(!paciente.nombre || !paciente.apellido || !paciente.dni){
            repoPaciente.crearPaciente(paciente)
            return true;
        }
        return false;
    }

    async buscarTodos(){
        repoPaciente.findAll()
    }

    async buscarPorId(id){
        repoPaciente.findById(id)
    }

    async eliminarPorId(id){
        if(!id){
            return "No se ingreso un id"
        }
        return repoPaciente.deleteById(id);

    }

    
}
