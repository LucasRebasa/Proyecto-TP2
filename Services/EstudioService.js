const Estudio = require('../Estudio.js');
const RepositoryEstudio = require('../Repositories/RepositoryEstudio.js')

const repoEstudio = new RepositoryEstudio()

module.exports = class EstudioService {

    
    async crearEstudio(estudio) {
        if (estudio.fecha && estudio.Medico && estudio.TipoEstudio && estudio.observaciones) {
            let nuevoEstudio = new Estudio(estudio.fecha, estudio.Medico, estudio.TipoEstudio, estudio.observaciones);
            repoEstudio.agregarEstudio(nuevoEstudio);
            return true;
        }
        return false;
    }

    async buscarTodos() {
        return await repoEstudio.findAll()
    }

    async buscarPorId(id) {
        let buscado = await repoEstudio.findById(id)
        if(!buscado){
            return {error: "El estudio buscado no existe"}
        }
        return buscado
    }

    async eliminarPorId(id) {
        const eliminados = await repoEstudio.deleteById(id);
        if (eliminados.deletedCount < 0) {
            return {error:"No se ingreso un id"};
        }
        return true;
    }

    async update(idEstudio, nuevoEstudio){
        let estudio = await repoEstudio.existsById(idEstudio);
        if(!estudio || !nuevoEstudio.fecha || !nuevoEstudio.Medico || !nuevoEstudio.TipoEstudio || !nuevoEstudio.observaciones){
            return {error: "Los datos ingresados fueron incorrectos"};
        }
        repoEstudio.update(idEstudio, nuevoEstudio);
    }


}