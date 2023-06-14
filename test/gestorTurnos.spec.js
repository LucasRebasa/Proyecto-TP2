let chai = require('chai')
let expect = chai.expect

const Gestor = require('../GestorTurnos.js')
const Medico = require('../Medico.js')
const Paciente = require('../Paciente.js')
const Sede = require('../Sede.js')

describe('Lista de turnos', function(){
    it('El turno se añadio correctamente', function(){
        //Arrange
        let gestor = new Gestor()
        let medico = new Medico()
        let paciente = new Paciente()
        let sede = new Sede()
        let length = gestor.turnos.length
        //Act
        gestor.agregarTurno(Date.parse('2023-04-10'), "clinico", medico, paciente, sede)
        //Assert
        expect(gestor.turnos.length).to.be.eql(length + 1)
    })
})