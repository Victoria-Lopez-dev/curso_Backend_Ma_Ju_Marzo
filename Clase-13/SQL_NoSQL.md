
# 📚 Bases de Datos SQL vs NoSQL

Este documento explica **cuándo conviene usar SQL o NoSQL** a través de ejemplos prácticos y sencillos.

---

## 📋 ¿Cuándo usar SQL?

**Usa una base de datos SQL cuando:**
- Tus datos tienen **estructura fija** (tablas bien definidas).
- Necesitas **transacciones seguras** (consistencia estricta).
- Hay **relaciones claras** entre datos.

**Ejemplos prácticos:**
- **Banco**: Cuentas bancarias y transferencias.
- **E-commerce**: Productos, clientes y órdenes.
- **Sistema de reservas**: Vuelos, hoteles y asientos.

✅ SQL asegura que **los datos siempre estén correctos** incluso en caso de errores.

---

## 📋 ¿Cuándo usar NoSQL?

**Usa una base de datos NoSQL cuando:**
- Tus datos son **flexibles** o **cambian frecuentemente**.
- Necesitas **escala masiva** agregando más servidores.
- Priorizas **velocidad y volumen** sobre consistencia estricta.

**Ejemplos prácticos:**
- **Red social**: Publicaciones, comentarios y likes.
- **IoT**: Millones de eventos de sensores.
- **Apps móviles**: Chats en tiempo real.

✅ NoSQL permite **crecer rápido y manejar grandes volúmenes** de datos flexibles.

---

## 📊 Tabla Comparativa

| Característica         | SQL (Relacional)                                  | NoSQL (No Relacional)                             |
|-------------------------|----------------------------------------------------|--------------------------------------------------|
| 📋 Estructura           | Tablas con filas y columnas (estructura fija)    | Documentos, clave-valor, grafos, columnas (flexible) |
| 🔗 Relaciones           | Fáciles de modelar y controlar                   | Más difícil o no necesarias                    |
| ⚖️ Consistencia         | Alta (ACID: atómico, consistente, aislado, durable) | Eventual o personalizada                       |
| ⚡ Escalabilidad         | Vertical (potenciar un servidor)                 | Horizontal (sumar servidores)                  |
| 🚀 Velocidad             | Puede ser más lento en cargas masivas             | Muy rápido para grandes volúmenes              |
| 🏦 Casos ideales        | Bancos, ERPs, E-commerce                          | Redes sociales, IoT, Big Data, gaming           |
| 🛠️ Ejemplos populares   | MySQL, PostgreSQL, MariaDB, OracleDB              | MongoDB, Firebase, Cassandra, Redis             |

---
