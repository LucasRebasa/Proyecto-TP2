const dao = require("../MongoDBDao/MongoDBDao.js");
const { ObjectId } = require("mongodb");

module.exports = class RepositoryPaciente {
  constructor() {
  }

  async existsById(id) {
    try {
      await dao.connect();
      let collection = await dao.db("TP2").collection("Paciente");
      return await collection.findOne({ _id: new ObjectId(id) });
    } finally {
      await dao.close();
    }
  }

  async agregarPaciente(paciente) {
    try {
      await dao.connect();
      let collection = await dao.db("TP2").collection("Paciente");
      return await collection.insertOne(paciente);
    } finally {
      await dao.close();
    }
  }

  async findById(id) {
    try {
      await dao.connect();
      let collection = await dao.db("TP2").collection("Paciente");
      
      return await collection.findOne({ _id: new ObjectId(id) });
    } finally {
      await dao.close();
    }
  }

  async update(idPaciente,nuevoPaciente) {
    try {
      await dao.connect();
      let collection = await dao.db("TP2").collection("Paciente");
      
      return await collection.replaceOne({ _id: new ObjectId(idPaciente) }, nuevoPaciente);
    } finally {
      await dao.close();
    }
  }

  async deleteById(id) {
    try {
      await dao.connect();
      let collection = await dao.db("TP2").collection("Paciente");
      
      return await collection.deleteOne({ _id: new ObjectId(id) });
    } finally {
      await dao.close();
    }
  }

  async findAll() {
    try {
      await dao.connect();
      // Obtención de la base de datos y la colección
      const listado = dao.db("TP2");
      const collection = listado.collection("Paciente");
      return await collection.find().toArray();
    } finally {
      await dao.close();
    }
  }
  
  async login(email, password){
    try {
      await dao.connect();
      let collection = await dao.db("TP2").collection("Paciente");
      return await collection.findOne({ email: email, password:password });
    } finally {
      await dao.close();
    }
  }
};
