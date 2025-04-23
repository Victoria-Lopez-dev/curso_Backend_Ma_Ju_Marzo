 ## manual de comandos de  Mongo
 https://www.mongodb.com/docs/manual/reference/method/js-collection/
 
 ## DB -> base de datos dentro de un servidor 
 ## colecciones -> archivos que contienen la informacion ( como las tablas en SQL)
 ## documentos -> la informacion almacenada en la coleccion (como los registros en SQL)

 # CRUD ( Create - Reed - Update - Delete) en Mongo

# agregar documentos a una coleccion
- db.nombreColeccion.insertOne({propiedad:valor,propiedad:valor}) 
-  db.nombreColeccion.insert([{propiedad:valor,propiedad:valor}])
-  db.nombreColeccion.insertMany([{propiedad:valor,propiedad:valor}])


# buscar - leer documentos a una coleccion
- db.nombreColeccion.findOne({filtro}) 
- db.nombreColeccion.find({filtro}) 
 - db.nombreColeccion.find() 



# actualizar uno o varios documentos  de una coleccion 

- db.nombreColeccion.updateOne({filtro},modificacion)
- db.nombreColeccion.updateMany({filtro},modificacion)

## modificacion -> {$ref:{propieda:valor}} ;


## "$ref" 
 $set  (agregar una propiedad/valor a un documento - modificar una ya existente) 
 $unset (sacar una propiedad a un documento)


## ejemplo

- db.segundaColeccion.updateOne({nombre:"Pepe"},{$set:{correo:"pepe@correo.com"}})

dentro de "segundaColeccion" estamos actualizando el documento con nombre "Pepe", agregandole la propiedad "correo" con su valor correspondiente


- db.segundaColeccion.updateOne({edad:33},{$set:{nombre:"Julia"}})
dentro de "segundaColeccion" estamos modificando la propiedad nombre del documento con edad 33 (reconoce que si ya existe la propiedad,modifica su valor)

- db.segundaColeccion.updateOne({edad:22},{$unset:{propiedad:'valor'}})
dentro de "segundaColeccion" estamos eliminando del documento que tiene de edad 22, la propiedad llamada "propiedad"


- db.segundaColeccion.updateOne({edad:22},[{$unset:{propiedad:'valor'},{$set:{regular:true}}]})

dentro de "segundaColeccion" estamos actualizando el documento que tiene como edad 22, sacandole la propiedad "propiedad" y agregando la propiedad "regular" con su valor correspondiente

## si quiero cambiar un documento entero por otro 
db.nombreColeccion.replaceOne({filtro},{nuevoDocumento})

# eliminar uno o varios documentos de una coleccion 
- db.nombreColeccion.deleteOne({filtro})
- db.nombreColeccion.deleteMany({filtro})

