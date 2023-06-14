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
        return await repoMedico.findById(id)
    }

    async eliminarPorId(id) {
        if (!id) {
            return "No se ingreso un id"
        }
        const eliminados = repoMedico.deleteById(id);
        return eliminados.acknowledged > 0;
    }

    async update(idMedico, nuevoMedico){
        repoMedico.update(idMedico, nuevoMedico);
    }


}
