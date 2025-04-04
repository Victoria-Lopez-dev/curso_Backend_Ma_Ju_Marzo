//JS

//string numbers boolean

//DB relacionales -> 
//SQL -> lenguaje
//informacion en forma de tablas
//columnas -> campos
// filas -> registros

//VARCHAR - CHAR -> caracteres alfanumericos 255 caracteres 
//INT(enteros) - DECIMAL(decimales) -> numeros
//BOOLEAN -> booleans (true-false)
//DATE -> fecha
//TEXT -> textos 


//VARCHAR(100)


//XAMPP -> programa para generar DB(data base = base de datos) relacionales de manera local
//MySQLWorkbench -> programa para generar DB relacionales

//MariaDB - MySQL -> tipo de base de datos relacional
//SQL -> lenguaje que manejan las DB relacionales 


//-----------------------------


//Comandos SQL

//-----
// Data Definition Lenguaje (DDL)
// comandos que me permiten manejar-alterar campos-tabla-db  (estructura)
// el manejo del esqueleto de la DB 

//CREATE -> crear : bases de datos y tablas 

//CREATE DATABASE nombre;

//CREATE TABLE nombreTabla(
// nombreCampo tipo restriccion,
// nombreCampo tipo restriccion,
//nombreCampo tipo restriccion,)


//ALTER -> altera la tabla
//ALTER TABLE tabla ADD COLUMN campo tipo restriccion;
//ALTER TABLE tabla DROP COLUMN campo a eliminar;
//ALTER TABLE tabla MODIFY COLUMN campo con tipo y restricciones modificadas; 
//ALTER TABLE tabla ADD COLUMN columna AFTER referencia ;



//-----
//Data Manipulation Lenguaje (DML)

//comandos referidos al manejo de los registros (la informacion que agrego a la tabla)

//INSERT -> agregar registros a una tabla
//INSERT INTO tabla(campos) VALUES (registro),(registro);

//SELECT -> obtener registros
//SELECT campos FROM  tabla WHERE campo=registro; -> nos trae los registros de esos campos que cumplen con esa condicion 
//SELECT  campos FROM tabla -> nos trae solo los campos indicados de todos los registros 
//SELECT  * FROM tabla WHERE campo=registro; -> nos trae todos los campos de los registros que cumplen con esa condicion
 
//UPDATE -> actualizar registros
//UPDATE tabla SET campoAModificar=valor,campo=valorAModificar WHERE  campo=valor -> referencia
//UPDATE tabla SET campoAModificar=valor -> en todos los registros va a modificar ese campo con ese valor

//DELETE -> eliminar registros 
//DELETE FROM  tabla WHERE referencia -> solo elimina el/los registros que tienen esa referencia
//si no coloco el WHERE en el delete, elimino TODOS los registros de la tabla OJOOO



//JOIN 

//proxima clase : JOIN- clave foranea - modelado de DB (cardinalidad) - buscar bff vs api
//ejercitacion 