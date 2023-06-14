const { ObjectId } = require("mongodb");
const dao = require("../MongoDBDao/MongoDBDao.js")
module.exports = class RepositoryMedico {
    constructor() {
        this.dao = dao;
      }
    
      async agregarMedico(medico) {
        try{
          await dao.connect()
          let collection = await dao.db("TP2").collection("Medico");
          return await collection.insertOne(medico);
        }finally{
          await dao.close();
        }
      }
    
      async findById(id) {
        try{
          await dao.connect()
          let collection = await dao.db("TP2").collection("Medico");
          console.log(id)
          return await collection.findOne({_id: new ObjectId(id)});
        }finally{
          await dao.close();
        }
      }
    
      async   update(idMedico, nuevoMedico) {
        try{
          await dao.connect()
          let collection = await dao.db("TP2").collection("Medico");
          return await collection.replaceOne({_id: new ObjectId(idMedico)}, nuevoMedico);
        }finally{
          await dao.close();
        }
      }
    
      async deleteById(id){
        try{
          await dao.connect()
          let collection = await dao.db("TP2").collection("Medico");
          console.log(id)
          return await collection.deleteOne({_id: new ObjectId(id)});
        }finally{
          await dao.close();
        }
      }

      async findAll(){
        try{
          await dao.connect()
          // Obtención de la base de datos y la colección
           const collection = dao.db("TP2").collection("Medico");
          return await collection.find().toArray();
        }finally{
          await dao.close();
        }
      }
  }

