const Medico = require('../Medico.js');
const RepositoryMedico = require('../Repositories/RepositoryMedico.js')

const repoMedico = new RepositoryMedico()

module.exports = class MedicoService {


    async crearMedico(medico) {
        if (medico.nombre && medico.apellido && medico.dni && medico.email) {
            let nuevoMedico = new Medico(medico.dni, medico.nombre, medico.apellido, medico.email);
            repoMedico.agregarMedico(nuevoMedico);
            return true;
        }
        return false;
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
        let medico = await repoMedico.existsById(idMedico);
        if(!medico || !nuevoMedico.nombre || !nuevoMedico.apellido || !nuevoMedico.dni || !nuevoMedico.email){
            return {error: "Los datos ingresados fueron incorrectos"};
        }
        let actualizado = await repoMedico.update(idMedico, nuevoMedico);
       
        return  actualizado.modifiedCount > 0;
    }

    async login(email, password){
        let buscado = await repoMedico.login(email, password)
        return buscado;
    }
}
