class Estudio{
  
 constructor( fecha, Medico, TipoEstudio, observaciones){
    this.fecha= fecha;
    this.Medico= Medico;
    this.TipoEstudio= TipoEstudio;
    this.observaciones=observaciones

 }
 TipoEstudio = Object.freeze({
    Placa: 1,
    Laboratorio: 2,
    AptoFisico: 3,

  });





      
    
      
}