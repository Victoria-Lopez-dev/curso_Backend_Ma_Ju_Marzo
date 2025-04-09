/*
Cardinalidad  -> relacion entre "entidades"/ tablas 

tres tipos de relacion

---- muchos a muchos -> relacion entre tablas donde muchos campos de una tabla se relacionan con muchos campos de otra tabla
ej: tabla de equipos y tabla de estadios 


---- 1 a muchos -> 1 campo de una tabla uno se relaciona con varios registros de una tabla 2 , pero desde la tabla2 solo vinculamos con un unico campo de la tabla 1

Ej: jefes y empleados ( un jefe tiene varios empleados pero cada empleado solo tiene 1 solo jefe)

---- 1 a 1 -> 1 campo de una tabla se relaciona con un campo de otra y viseversa 

ej: sucursuales y supervisores (cada sucursal tiene 1 supervisor; y cada supervisor responde a 1 sucursal)



para hacer una relacion 1 a 1 entre tablas

agrego el comando

ALTER TABLE tabla1 ADD FOREING KEY (campo) REFERENCE tabla2(campo2)
*/
// proxima clase : dudas SQl -JOIN - intro a DB no relaciones (MongoDB)
