const { ObjectId } = require("mongodb");
const dao = require("../MongoDBDao/MongoDBDao.js");
const Turno = require("../Turno.js");

module.exports = class RepositoryTurnos {
  
  async existsById(id) {
    try {
      await dao.connect();
      let collection = await dao.db("TP2").collection("Turno");
      return await collection.findOne({ _id: new ObjectId(id) });
    } finally {
      await dao.close();
    }
  }

  async agregarTurno(turno) {
    try {
      await dao.connect();
      let collection = await dao.db("TP2").collection("Turno");
      return await collection.insertOne(
        new Turno(
          turno.fecha,
          turno.hora,
          turno.especialidad,
          turno.medico,
          turno.paciente,
          turno.sede
        )
      );
    } finally {
      await dao.close();
    }
  }

  async findById(id) {
    try {
      await dao.connect();
      let collection = await dao.db("TP2").collection("Turno");
      return await collection.findOne({ _id: new ObjectId(id) });
    } finally {
      await dao.close();
    }
  }

  async findByIdPaciente(paciente) {
    try {
      await dao.connect();
      let collection = await dao.db("TP2").collection("Turno");
      return await collection.find({ paciente: new ObjectId(paciente) }).toArray();
    } finally {
      await dao.close();
    }
  }

  async findByIdMedico(medico) {
    try {
      await dao.connect();
      let collection = await dao.db("TP2").collection("Turno");
      return await collection.find({ medico: new ObjectId(medico) }).toArray();
    } finally {
      await dao.close();
    }
  }

  async update(id, turno) {
    try {
      await dao.connect();
      let collection = dao.db("TP2").collection("Turno");
      return await collection.replaceOne(
        { _id: new ObjectId(id) },
        turno
      );
    } finally {
      await dao.close();
    }
  }

  async deleteById(id) {
    try {
      await dao.connect();
      let collection = await dao.db("TP2").collection("Turno");
      return await collection.deleteOne({ _id: new ObjectId(id) });
    } finally {
      await dao.close();
    }
  }

  async findTurnoByMedicoFechaYHora(idMedico, fecha, hora) {
    try {
      await dao.connect();
      // Busqueda en la base de datos y la colección turnos, para corroborar que ese medico no tenga un turno asignado en esa fecha y hora
      const listado = dao.db("TP2");
      const collection = listado.collection("Turno");
      return await collection.findOne({medico:idMedico,fecha:fecha,hora:hora});
    } finally {
      await dao.close();
    }
  }
  
};
