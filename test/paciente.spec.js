let chai = require('chai')
let expect = chai.expect
const Paciente = require('../Paciente.js')

describe('Validacion de mail', function() {
    it('Mail valido', function(){
        //Arrange
        let paciente = new Paciente()
        let email = "mail@mail.com"
        //Act
        let resultado = paciente.validarEmail(email)
        //Assert
        expect(resultado).to.eql(email)
    }),
    it('Mail invalido', function(){
        //Arrange
        let paciente = new Paciente()
        let email = "mail@mail"
        //Act
        let resultado = paciente.validarEmail(email)
        //Assert
        expect(resultado).to.eql(null)
    })
})