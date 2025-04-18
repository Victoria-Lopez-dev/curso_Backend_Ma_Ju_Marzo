# Base de datos
## Relacionales :
     SQL ,
     almacena info en forma de tablas (campos -registros),
     MySQL -MariaDB
     nuestro equipo en un servidor (local)
     XAMPP - phpMyAdmin || Workbench
     estructuras -rigidas 
     todos los campos del registro deben estar completos 
CRUD -> INSERT , SELECT,UPDATE,DELETE

## No relacionales:

    NoSQL - Not only SQL
    almacena la informacion en documentos "tipo JSON" (BSON),
    - colecciones-> archiso BSON en donde almacenamos la informacion - paralelismo con SQL : tablas 
    - documentos -> la informacion en si (objetos ) compuestos por un par clave-propiedad/valor

    la informacion agregada en los documentos es mas flexible que con DB relacionales(podemos obviar algun par clave/valor o agregar en algunos documentos y en otros no ) : Schema Free

    Me va a mostrar a la DB solamente si tiene una coleccion creada

### Que necesitamos  para DB no relacionales (de manera local)

MongoDB es como el XAMPP de SQL
MongoDB -> sistema de DB no relacional (NoSQL)
Mongosh - Mongo shell -> plataforma donde poder ejecutar codigo de DB no relacional

Compass -> GUI(Graphic User Interface) de la DB no relacional - programa para poder manipular DB de mongo ( como phpMyAdmin en MySQL)


### Para correr MongoDB en nuestros equipo

- abro una terminal y tiro el comando mongod (no la cerramos mientras querramos correr mongo)
- abro una nueva terminal y tiro el comando mongosh 
una vez finalizado su uso pulso control+C en la terminal de mongosh y de mongd para pausar su ejecucion 

## Metodos de MongoDB Shell 

### show dbs
nos muestra todas las bases de datos que se encuentran en este servidor local

### db
nos muestra la base de datos en la que nos encontramos actualmente 

### use
nos permite crear una DB y trasladarnos a esta; en caso que la misma exista simplemente nos traslada a dicha DB

### db.createCollection(nombreColeccion)
nos permite crear una coleccion dentro de la DB 

### db.nombreColeccion.insertOne({propiedad:valor,propiedad:valor}) 
##  db.nombreColeccion.insert([{propiedad:valor,propiedad:valor}])
nos permite ingresar uno o varios documentos a la coleccion que indiquemos (siempre estando posicionados dentro de la DB correcta)

### db.nombreColeccion.find({filtro}) 
## db.nombreColeccion.findOne({filtro}) 
metodos que nos permiten ver colecciones:

find()-> todos los documentos que cumplan con ese filtro
findOne() -> el primer documento que encuentre con ese filtro

si no coloco nada entre los parentesis, me trae todos los documentos de esa coleccion 

# filtro -> propiedad/clave:valor 
# operadores 

$eq -> igual a (===)
$gt -> mayor a (>)
$gte -> mayor o igual a (>=)
$lt -> menor a (<)
$lte->menor o igual a (<=)

## sintaxis ->{propiedad/clave:{$operador :valor}}

$regex -> buscar un patron de texto 

## sintaxis ->{propiedad/clave:{$regex :valor}} o {propiedad/clave:{$regex :valor,$options:"i"}}

$options:"i" -> que sea insensible a minusculas y mayusculas


## operadores logicos 
$and
$or
$not

## sintaxis -> {$opLogico :[{propiedad/clave:valor},{propiedad/clave:valor}]}


## db.coleccion.updateMany({filtro},{$ref:{propiedad/clave:valor,propiedad/clave:valor,...}})
## db.coleccion.updateOne({filtro},{$ref:{propiedad/clave:valor,propiedad/clave:valor,...}})

## $ref 
$set -> agregar un nuevo clase/propiedad al documento
$unset -> sacar un clase/propiedad de un documento 

si lo que quiero es que en el/los  documento/s se produzca el agregar un nuevo campo y eliminar otro , puedo hacerlo 

{filtro},[{$ref:{propiedad/clave:valor}},{$ref:{propiedad/clave:valor}}]}

## replaceOne

## CRUD 

operaciones basicas de una DB que puede ejecutar con la informacion que maneja 
C .R.U.D
C = Create (crear)
R= Read (Leer)
U= Update (Actualizar)
D= Delete (Eliminar)


# proxima clase (clase 10):
- repasar operadores 
- repasar update complejo
- delete 
- ejercicios 