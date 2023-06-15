const RepositoryMedico = require("./Repositories/RepositoryMedico.js");
const MedicoService = require("./Services/MedicoService.js");
const GestorTurnos = require("./Services/GestorTurnos.js");
const RepositoryTurnos = require("./Repositories/RepositoryTurnos.js");
const RepositoryPaciente = require("./Repositories/RepositoryPaciente.js");
const RepositoryEstudio = require("./Repositories/RepositoryEstudio.js");
const express = require("express");
const bodyParser = require("body-parser");
const PacienteService = require("./Services/PacienteService.js");
const app = express();
const port = 3000;

const medicoService = new MedicoService();
const pacienteService = new PacienteService();
const repoMedico = new RepositoryMedico();
const repoTurnos = new RepositoryTurnos();
const repoPaciente = new RepositoryPaciente();
const repoEstudio = new RepositoryEstudio();

const gestorTurnos = new GestorTurnos(repoTurnos, repoMedico, repoPaciente);

app.use(bodyParser.json());

app.get("/", function (request, response) {
  
  response.send("Bienvenidos a Cuidapp. Les vengo a proponer un sueño.");
});

//MEDICOS//
app.post("/medico", async (request, response) => {
  const { body } = request;

  const data = await medicoService.crearMedico(body);

  if (!data) {
    response.sendStatus(400);
  } else {
    response.sendStatus(201);
  }
});

app.get("/medico", async (request, response) => {
  const list = await medicoService.buscarTodos();
  if (list.error) {
    response.status(404).send({error:list.error});
  } else {
    response.status(200).json(list);
  }
});

app.get("/medico/:id", async (request, response) => {
  const id = request.params.id;

  const data = await medicoService.buscarPorId(id);
  if (data.error) {
    response.status(404).send({error:data.error});
  } else {
    response.json(data);
  }
});

app.delete("/medico/:id", async (request, response) => {
  const id = request.params.id;

  const deleted = await medicoService.eliminarPorId(id);
  if (deleted.error) {
    response.status(404).send({error:deleted.error});
  } else {
    response.sendStatus(200);
  }
});

app.put("/medico/:id", async (request, response) => {
  const { body, params } = request;
  let medicoActualizado = await medicoService.update(params.id, body);
  if(!medicoActualizado || medicoActualizado.error){
    response.status(400).send({error:medicoActualizado.error})
  }else{
    response.status(200).send()
  }
  
});

//ESTUDIO//

app.get("/estudio", async (request, response) => {
  const list = await repoEstudio.findAll();
  response.json(list);
});

app.post("/estudio", (request, response) => {
  const { body } = request;
  const data = repoEstudio.agregarTurno(body);
  response.json(data);
});

//PACIENTES//

app.get("/paciente", async (request, response) => {
  const list = await pacienteService.buscarTodos();
  if(!list){
    response.sendStatus(404);
  }else{
    response.status(200).json(list);
  }
});

app.get("/paciente/:id", async (request, response) => {
  const id = request.params.id;
  const pacienteABuscar = await pacienteService.buscarPorId(id);
  if(pacienteABuscar.error){
    response.status(404).send({error:pacienteABuscar.error});
  }else{
    response.status(200).json(pacienteABuscar);
  }
});

app.post("/paciente", async (request, response) => {
  const { body } = request;
  const data = await pacienteService.crearPaciente(body);

  if (data.error) {
    response.status(400).send({error:data.error});
  } else {
    response.sendStatus(201);
  }
});

app.put("/paciente/:id", async (request, response) => {
  const { body, params } = request;

  let actualizado = await pacienteService.update(params.id, body);
  if(actualizado.error || !actualizado){
    response.status(400).send({error:actualizado.error})
  }else{
    response.sendStatus(200);
  }
});

app.delete("/paciente/:id", async (request, response) => {
  const id = request.params.id;

  const deleted = await pacienteService.eliminarPorId(id);
  if (!deleted || deleted.error) {
    response.status(400).send({error:deleted.error});
  } else {
    response.sendStatus(200);
  }
});

//TURNOS
app.get("/turno/paciente/:idPaciente", async (request,response) => {
  const idPaciente = request.params.idPaciente;

  const data = gestorTurnos.buscarTurnosPorPaciente(idPaciente);
  if(!data){
    response.status(404).send({error:"No existen turnos para ese paciente"});
  }else{
    response.status(200).json(data);
  }
})

app.get("/turno/medico/:idMedico", async (request,response) => {
  const idMedico = request.params.idMedico;

  const data = gestorTurnos.buscarTurnosPorMedico(idMedico);
  if(!data){
    response.status(404).send({error:"No existen turnos para ese paciente"});
  }else{
    response.status(200).json(data);
  }
})

app.post("/turno", async (request, response) => {
  const { body } = request;
  let data = await gestorTurnos.agregarTurno(body);
  if (data.error) {
    response.status(400).send({error:data.error});
  } else {
    response.sendStatus(200);
  }
});

app.put("/turno/:id", async (request, response) => {
  const id = request.params.id;
  const {fechaNueva, horaNueva}  = request.body;
  let actualizado = await gestorTurnos.modificarTurno(id, fechaNueva, horaNueva);
  if(actualizado.error){
    response.status(400).send({error:actualizado.error});
  }else{
    response.sendStatus(200);
  }
})

app.delete("/turno/:id", async (request, response) => {
  const id = request.params.id;
   
  let deleted = await gestorTurnos.cancelarTurno(id);
  
  if(deleted){
    response.sendStatus(200);
  }else{
    response.status(404).send("No se pudo cancelar el turno");
  }
})

app.listen(port, () => {
  console.log(`Nuestro server está funcionando bien en el port ${port}`);
});
