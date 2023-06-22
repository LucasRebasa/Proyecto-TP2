const Medico = require('../Entities/Medico');
const RepositoryMedico = require('../Repositories/RepositoryMedico.js')

const repoMedico = new RepositoryMedico()

module.exports = class MedicoService {


    async crearMedico(medico) {
        let existe = await repoMedico.existByEmail(medico.email);
        if(existe){
            return {error:"Ya existe un usuario con esas credenciales"};
        }

        if (medico.nombre && medico.apellido && medico.dni && medico.email && medico.especialidad && medico.matricula && medico.password) {
            let nuevoMedico = new Medico(medico.dni, medico.nombre, medico.apellido, medico.email, medico.especialidad,medico.matricula,medico.password);
            repoMedico.agregarMedico(nuevoMedico);
           
            return true;
        }
        return {error:"Los datos ingresados fueron incorrectos"};
    }

    async buscarTodos() {
        return await repoMedico.findAll()
    }

    async buscarPorId(id) {
        let buscado = await repoMedico.findById(id)
        if(!buscado){
            return {error: "El medico buscado no existe"}
        }
        return buscado
    }

    async eliminarPorId(id) {
        const eliminados = await repoMedico.deleteById(id);
        if (eliminados.deletedCount === 0) {
            return {error:"El medico ingresado no existe"};
        }
        return true;
    }

    async update(idMedico, nuevoMedico){
        let existe = await repoMedico.existByEmail(nuevoMedico.email);
        let medico = await repoMedico.existsById(idMedico);
        if( (existe && existe?._id.toString()!==idMedico) || !medico || !nuevoMedico.nombre || !nuevoMedico.apellido || !nuevoMedico.dni || !nuevoMedico.email || !nuevoMedico.password || !nuevoMedico.matricula || !nuevoMedico.especialidad){
            return {error: "Los datos ingresados fueron incorrectos"};
        }
        let actualizado = await repoMedico.update(idMedico, nuevoMedico);
       
        return  actualizado.modifiedCount > 0;
    }

    async login(email, password){
        let buscado = await repoMedico.login(email, password)
        if(!buscado){
            return {error:"El usuario no esta registrado"}
        }
        return buscado;
    }

    async buscarEspecialidad(especialidad) {
        let especialistas = await repoMedico.buscarPorEspecialidad(especialidad);
        if(especialistas.length === 0){
            return {error:"No existe medicos para esa especialidad"}
        }
        return especialistas
    }

    
}
