const RepositoryPaciente = require("../Repositories/RepositoryPaciente.js");


const repoPaciente = new RepositoryPaciente()

module.exports = class PacienteService {

    async crearPaciente(paciente){
        if(!paciente.nombre || !paciente.apellido || !paciente.dni || !paciente.edad || !paciente.email){
            return {error:"Los datos ingresados son incorrectos"};
        }
        await repoPaciente.agregarPaciente(paciente)
        return true;
    }

    async buscarTodos(){
        return await repoPaciente.findAll()
    }

    async buscarPorId(id){
        if(typeof id === "string" && id.length < 24){
            return {error:"El id ingresado es incorrecto"}
        }
        let pacienteBuscado = await repoPaciente.findById(id)
        if (!pacienteBuscado){
            return {error:"El paciente buscado no existe"}
        }
        
        return pacienteBuscado
    }

    async eliminarPorId(id){
        let deleted = await repoPaciente.deleteById(id);
        if(deleted.deletedCount === 0){
            return {error:"El paciente ingresado no existe"}
        }
        return true;

    }

    async update(idPaciente, nuevoPaciente){
        let pacienteActualizar = await repoPaciente.existsById(idPaciente);
        
        if(!pacienteActualizar || !nuevoPaciente.nombre || !nuevoPaciente.apellido || !nuevoPaciente.dni || !nuevoPaciente.edad || !nuevoPaciente.email){
            return {error:"Los datos ingresados son incorrectos"};
        }
        let actualizado = await repoPaciente.update(idPaciente, nuevoPaciente)
        
        return actualizado.modifiedCount > 0;
    }

    
}
