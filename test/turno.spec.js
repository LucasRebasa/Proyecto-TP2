let chai = require('chai')
let expect = chai.expect
// importamos atributo o lo que sea a testear

const Turno = require('../Turno.js')

// mocha no hace falta porque se autoinvoca en el package json

describe('Chequear si el turno esta vigente', function(){
  it('El turno esta vigente',function(){
  //Arrange
  let turno = new Turno(Date.parse("2023-06-25"));

  //Act
  let resultado = turno.vigenciaDeTurno();

  //Assert
  expect(resultado).to.eql(true);
  }),
  it('El turno no esta vigente',function(){
    //Arrange
    let turno = new Turno(Date.parse("2023-03-25"));
  
    //Act
    let resultado = turno.vigenciaDeTurno();
  
    //Assert
    expect(resultado).to.eql(false);
    })
})

describe('La fecha del turno se modifico correctamente', function() {
  it('La fecha es correcta', function() {
    //Arrange
    let turno = new Turno(Date.parse("2023-03-25"));
    //Act
    let fechaValida = turno.posponer(Date.parse("2023-08-25"));
    //Assert
    expect(fechaValida).to.eql(true);
  }),
  it('La fecha es incorrecta', function() {
    //Arrange
    let turno = new Turno(Date.parse("2023-03-25"));
    //Act
    let fechaValida = turno.posponer(Date.parse("2023-01-14"));
    //Assert
    expect(fechaValida).to.eql(false);
  })
})






