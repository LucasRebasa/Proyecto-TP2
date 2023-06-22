const RepositoryPaciente = require("../Repositories/RepositoryPaciente.js");

const repoPaciente = new RepositoryPaciente()

module.exports = class PacienteService {

    async crearPaciente(paciente){
        let existe = await repoPaciente.existByEmail(paciente.email);
        if(existe){
            return {error:"Ya existe un usuario con esas credenciales"};
        }

        if(!paciente.nombre || !paciente.apellido || !paciente.dni || !paciente.email || !paciente.password){
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
        let existe = await repoPaciente.existByEmail(nuevoPaciente.email);
        let pacienteActualizar = await repoPaciente.existsById(idPaciente);
        
        if((existe && existe?._id.toString()!==idPaciente) || !pacienteActualizar || !nuevoPaciente.nombre || !nuevoPaciente.apellido || !nuevoPaciente.dni || !nuevoPaciente.email || !nuevoPaciente.password){
            return {error:"Los datos ingresados son incorrectos"};
        }
        let actualizado = await repoPaciente.update(idPaciente, nuevoPaciente)
        
        return actualizado.modifiedCount > 0;
    }

    async login(email, password){
        let buscado = await repoPaciente.login(email, password)
        if(!buscado){
            return {error:"El usuario no esta registrado"}
        }
        return buscado;
    }
    
}
