## Introducción
La aplicación de “una obra social” permitirá gestionar turnos, solicitando, reprogramando o cancelando los mismos, de manera centralizada.

## Requerimientos del sistema
### Funcionales:
- Permitir al usuario solicitar, modificar o cancelar turnos.
-Permitir al medico ver el listado de los turnos que tiene asignados.
- Permitir al usuario ver sus turnos asignados.
- Generar un QR/token como método de validación para la asistencia a los turnos de manera presencial

### No funcionales:
- La aplicación debe ser intuitiva y fácil de utilizar.
- La aplicación debe poder gestionarse de manera independiente y debe generar una respuesta automática la mayor parte del tiempo, es decir sin esperar una validación por parte de otra persona.
- La aplicación debe responder de manera rápida y eficaz.

## Reglas de negocio
### Reglas de gestión y solicitud de turnos:
- Los turnos solicitados deben solicitarse en una fecha y hora específicos.
- Los turnos se pueden cancelar hasta 48 hs antes.
- Los turnos se pueden reprogramar 48 hs antes.
- No se puede cancelar o modificar un turno después de la fecha del mismo
- No se puede solicitar un turno con fecha anterior a la actual.
- Los usuarios deben presentar el QR o token al asistir de manera presencial a un turno.
- Los turnos son intransferibles entre usuarios.

## Relación entre Clases
### Paciente
- El paciente contara con sus datos personales (dni, nombre, apellido, edad, email) y con sus respectivos estudios, turnos asignados. 
### Medico
- La clase Medico tendra dni,nombre,apellido,especialidad,matricula y email. A su vez, contara con un listado semanal de turnos (al estilo agenda). La idea de contar con dni y email tiene como un sentido netamente funcional, seran usados para futuros logins, asignacion de perfil, etc.
### GestorTurnos
- El gestor de turnos se va encargar de crear, actualizar, eliminar y buscar los turnos que haya solicitado cada paciente o que se haya asignado a un medico. Permite la busqueda por paciente o medico.
### Turno
- Una de las clases mas importantes. Sera la clase que servira de vinculo entre Los medicos y los pacientes y contendra varias funcionalidades que responden a las reglas de negocio(creacion, pos).


## Conclusión

El sistema de gestión de turnos proporcionará a los usuarios una experiencia agradable al poder organizar su agenda de una manera fácil ágil e innovadora.
