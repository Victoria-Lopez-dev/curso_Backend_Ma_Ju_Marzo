# 🐳 Proyecto Docker con MySQL, MongoDB y Mongo Express

Este proyecto utiliza **Docker** para levantar un entorno de desarrollo con las siguientes tecnologías:

- 🐬 **MySQL 5.7** con phpMyAdmin
- 🍃 **MongoDB 4.4** con Mongo Express

## 📋 Requisitos Previos

Asegúrate de tener instalado:

- [Docker](https://docs.docker.com/get-docker/) 🐳
- [Docker Compose](https://docs.docker.com/compose/install/) 🎭

## 📂 Estructura del Proyecto

```plaintext
.
├── docker-compose.yml
├── mysql-data/    # Volumen persistente para MySQL
└── mongo_data/    # Volumen persistente para MongoDB
```

## 🚀 Iniciar el Proyecto

1. Teniendo creado el archivo de docker-compose.yml (al final hay un ejemplo)
2. Ejecuta:

   ```bash
   docker-compose up -d
   ```

   El flag `-d` ejecuta los contenedores en segundo plano.

3. Verifica que los servicios estén activos:

   ```bash
   docker-compose ps
   ```

   Deberías ver:

   - `mysql_db` (MySQL)
   - `phpmyadmin` (PHPMyAdmin)
   - `mongodb` (MongoDB)
   - `mongo-express` (Mongo Express)

## 🔌 Acceso a los Servicios

### 1. **MySQL & phpMyAdmin**

- **phpMyAdmin URL**: [http://localhost:8080](http://localhost:8080) 🌐
- **Credenciales**:
  - 🔑 **Usuario root**: `root` / `rootpass`
  - 🔑 **Usuario dev**: `dev_user` / `devpass`
  - 🗃️ **Base de datos**: `dev_db`

**Conectar directamente**:

```bash
docker exec -it mysql_db mysql -u dev_user -pdevpass
```

### 2. **MongoDB & Mongo Express**

- **Mongo Express URL**: [http://localhost:8081](http://localhost:8081) 🌐
- **Credenciales**:
  - 🔑 **Usuario**: `mongoexpress` / `mexpassword` (para Mongo Express)
  - 🔑 **Admin MongoDB**: `root` / `mongopassword`

**Conectar directamente**:

```bash
docker exec -it mongodb mongo -u root -pmongopassword --authenticationDatabase admin
```

## ⏹️ Detener los Contenedores

- 🛑 Para solo apagar los contenedores sin eliminarlos, usá:

  ```bash
  docker-compose stop
  ```

- Detener y eliminar contenedores (mantiene volúmenes):

  ```bash
  docker-compose down
  ```

- Eliminar todo (incluyendo volúmenes):
  ```bash
  docker-compose down -v
  ```

## 🚀 Para volver a encenderlos después:

```bash
docker-compose start
```

## 💾 Persistencia de Datos

- **MySQL**: Datos guardados en `./mysql-data/`
- **MongoDB**: Datos guardados en `./mongo_data/`

## ⚠️ Notas Importantes

1. 🔒 Cambia las contraseñas en `docker-compose.yml` para entornos de producción.
2. 🌍 Los puertos expuestos son:
   - `3306` (MySQL)
   - `8080` (phpMyAdmin)
   - `27017` (MongoDB)
   - `8081` (Mongo Express)
3. 🛑 Si tienes conflictos con puertos, modifícalos en el archivo `docker-compose.yml`.

---

### `docker-compose.yml` completo con mysql, phpmyadmin, mongo y mongo-express

> en la imagen se esta usando la version antigua de `mysql:5.7` para usar la ultima existente simplemente dejar escrito `mysql`

```
services:
  mysql:
    image: mysql:5.7
    restart: always
    container_name: mysql_db
    environment:
      - MYSQL_DATABASE=dev_db
      - MYSQL_USER=dev_user
      - MYSQL_PASSWORD=devpass
      - MYSQL_ROOT_PASSWORD=rootpass
    ports:
      - "3306:3306"
    volumes:
      - ./mysql-data:/var/lib/mysql  # ✅ bind mount

  phpmyadmin:
    image: phpmyadmin/phpmyadmin
    restart: always
    ports:
      - "8080:80"
    environment:
      - PMA_HOST=mysql
      - MYSQL_ROOT_PASSWORD=rootpass
    depends_on:
      - mysql

  mongo:
    image: mongo:4.4
    container_name: mongodb
    restart: unless-stopped
    environment:
      MONGO_INITDB_ROOT_USERNAME: root
      MONGO_INITDB_ROOT_PASSWORD: mongopassword
      MONGO_INITDB_DATABASE: admin
    volumes:
      - ./mongo_data:/data/db
    ports:
      - "27017:27017"

  mongo-express:
    image: mongo-express
    restart: unless-stopped
    container_name: mongo-express
    environment:
      ME_CONFIG_MONGODB_SERVER: mongo
      ME_CONFIG_MONGODB_ADMINUSERNAME: root
      ME_CONFIG_MONGODB_ADMINPASSWORD: mongopassword
      ME_CONFIG_MONGODB_PORT: '27017'
      ME_CONFIG_BASICAUTH_USERNAME: mongoexpress
      ME_CONFIG_BASICAUTH_PASSWORD: mepassword
    ports:
      - "8081:8081"
    links:
      - mongo
    depends_on:
      - mongo

volumes: {}
```
