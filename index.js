const RepositoryMedico = require('./Repositories/RepositoryMedico.js')
const MedicoService = require('./Services/MedicoService.js')
const GestorTurnos = require('./Services/GestorTurnos.js');
const RepositoryTurnos = require('./Repositories/RepositoryTurnos.js')
const RepositoryPaciente = require('./Repositories/RepositoryPaciente.js')
const RepositoryEstudio = require('./Repositories/RepositoryEstudio.js')
const express = require('express')
const bodyParser = require('body-parser');
const app = express()
const port = 3000

const medicoService = new MedicoService
const repoMedico = new RepositoryMedico
const repoTurnos = new RepositoryTurnos
const repoPaciente = new RepositoryPaciente
const repoEstudio = new RepositoryEstudio

const gestorTurnos = new GestorTurnos(repoMedico, repoTurnos, repoPaciente);

app.use(bodyParser.json());

app.get('/', function (request, response) {
  console.log(`Recibimos GET`)
  response.send('Bienvenidos a Cuidapp. Les vengo a proponer un sueño.')
})

//MEDICOS//
app.post('/medico', async (request, response) => {
  const { body } = request;

  const data = await medicoService.crearMedico(body);

  if (!data) {
    response.sendStatus(400);
  } else {
    response.status(200).json("Medico creado correctamente").send();
  }
})

app.get('/medico', async (request, response) => {
  //const list = await repoMedico.findAll()
  const list = await medicoService.buscarTodos()
  if (list.length === 0) {
    response.sendStatus(400);
  } else {
    response.status(200).json(list);
  }
  console.log(list);
})

app.get('/medico/:id', async (request, response) => {
  const id = request.params.id;

  //const data = await repoMedico.findById(id);
  const data = await medicoService.buscarPorId(id)
  if (!data) {
    response.sendStatus(404);
  } else {
    response.json(data);
  }
})

app.delete('/medico/:id', async (request, response) => {
  const id = request.params.id;

  //const data = await repoMedico.deleteById(id);
  const deleted = await medicoService.eliminarPorId(id)
  if (deleted) {
    response.sendStatus(200);
  } else {
    response.sendStatus(400);
  }

})

app.put('/medico/:id', (request, response) => {
  const { body, params } = request;

  repoMedico.update(params.id, body.nuevoMedico);

})

//ESTUDIO//

app.get('/estudio', async (request, response) => {
  const list = await repoEstudio.findAll()
  console.log(list);
  response.json(list)
})

app.post('/estudio', (request, response) => {
  const { body } = request;
  console.log(body)
  const data = repoEstudio.agregarTurno(body);
  response.json(data);
})

//PACIENTES//

app.get('/paciente', async (request, response) => {
  const list = await repoPaciente.findAll()
  console.log(list);
  response.json(list)
})

app.post('/paciente', (request, response) => {
  const { body } = request;
  console.log(body)
  if (!body.nombre) {
    response.status(400);
    response.send()
  } else {
    const data = repoPaciente.agregarPaciente(body);
    response.status(200);
    response.json(data);
  }
})

app.put('/paciente', (request, response) => {
  const { body } = request;
  const idAnterior = body.id;
  const fechaNueva = body.fechaNueva;
  const data = repoPaciente.update(idAnterior, fechaNueva);
})

app.delete('/paciente', () => { })

app.listen(port, () => {
  console.log(`Nuestro server está funcionando bien en el port ${port}`)
})