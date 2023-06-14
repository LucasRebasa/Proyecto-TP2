const GestorTurnos = require("./GestorTurnos");
const RepositoryPaciente = require('./Repositories/RepositoryPaciente.js')
const RepositoryTurnos = require('./Repositories/RepositoryTurnos.js')
const RepositoryMedico = require('./Repositories/RepositoryMedico.js')
const Paciente = require('./Paciente.js')
const Medico = require('./Medico.js')

const repoTurno = new RepositoryTurnos();
const repoMedico = new RepositoryMedico();
const repoPaciente = new RepositoryPaciente();


const Medico1 = new Medico(11111,"Pepe","Curita","jose@gmail.com")
const gestorTurnos = new GestorTurnos(repoTurno,repoMedico,repoPaciente)
const Messi = new Paciente(123456,"Lionel","Messi",30,"lio@gmail.com")
gestorTurnos.agregarMedico(Medico1)
gestorTurnos.agregarPaciente(Messi)
/*
const Messi = new Paciente(123456,"Lionel","Messi",30,"lio@gmail.com")
const Dibu = new Paciente(000000,"Dibu","Martinez",30,"dibu@gmail.com")
const Medico1 = new Medico(11111,"Jose","Curita","jose@gmail.com")

gestorTurnos.agregarPaciente(Messi)
gestorTurnos.agregarPaciente(Dibu)

gestorTurnos.agregarTurno("10-5-23","Clinico",Medico1,Messi,"Yatay")
gestorTurnos.agregarTurno("10-5-23","Clinico",Medico1,Dibu,"Yatay")
//console.log(repoTurno.turnos)
console.log(gestorTurnos.buscarTurnoPorId(0))
console.log(gestorTurnos.buscarTurnoPorId(1))*/

