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

  async findByPaciente(paciente) {
    try {
      await dao.connect();
      let collection = await dao.db("TP2").collection("Turno");
      return await collection.findOne({ paciente: new ObjectId(paciente) });
    } finally {
      await dao.close();
    }
  }

  async findByMedico(medico) {
    try {
      await dao.connect();
      let collection = await dao.db("TP2").collection("Turno");
      return await collection.findOne({ paciente: new ObjectId(medico) });
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
};
