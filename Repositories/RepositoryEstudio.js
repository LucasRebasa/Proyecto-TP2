const dao = require("../MongoDBDao/MongoDBDao.js")
module.exports = class RepositoryEstudio {
    constructor() {
        this.dao = dao;
      }
    
      async existsById(id){
        try{
          await dao.connect()
          let collection = await dao.db("TP2").collection("Estudio");
          return await collection.findOne({_id: new ObjectId(id)});
        }finally{
          await dao.close();
        }
      }

      async agregarEstudio(estudio) {
        try{
          await dao.connect()
          let collection = await dao.db("TP2").collection("Estudio");
          return await collection.insertOne(estudio);
        }finally{
          await dao.close();
        }
      }

      async findAll(){
        try{
          await dao.connect()
          // Obtención de la base de datos y la colección
           const listado = dao.db("TP2");
          const collection = listado.collection("Estudio");
          return await collection.find({nombre:''});
        }finally{
          await dao.close();
        }
      }
}