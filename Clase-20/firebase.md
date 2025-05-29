# 🧠 Dominios, Hosting y Firebase

## 🎯 Objetivos:

- Comprender qué son los dominios y los diferentes tipos de dominios.
- Conocer las opciones de hosting web y su importancia.
- Comprender cómo utilizar Cloud Firestore.
- Desarrollar y desplegar una aplicación web con Firebase.

---

### 🌐 ¿Qué es un dominio?

    Un dominio es el nombre único que identifica a un sitio web en Internet, como "ejemplo.com". Permite a los usuarios acceder fácilmente a una página sin recordar una dirección IP.

#### 🧩 ¿Cuáles son los tipos de dominio?

    - Dominios genéricos (gTLD): `.com`, `.net`, `.org`
    - Dominios geográficos (ccTLD): `.ar`, `.es`, `.us`
    - Dominios nuevos (nTLD): `.dev`, `.app`, `.tech`

#### 🔗 ¿Qué es el DNS?

    El DNS (Sistema de Nombres de Dominio) es el sistema que traduce los nombres de dominio en direcciones IP para que los navegadores puedan cargar los sitios web.

#### 🛒 ¿Dónde se puede registrar un dominio?

En sitios como:

- [Hostinger](https://www.hostinger.com/)
- [GoDaddy](https://www.godaddy.com/)
- [Google Domains](https://domains.google/)
- [Namecheap](https://www.namecheap.com/)

### 🏠 Opciones de Hosting

#### 🖥️ ¿Qué es el hosting?

    Es el servicio que permite almacenar y publicar archivos de un sitio web para que sean accesibles en Internet.

#### 📦 ¿Qué tipos de hosting existen?

- Hosting compartido
- VPS (Servidor Privado Virtual)
- Hosting dedicado - Hosting en la nube (Cloud)

#### 🤔 ¿Qué diferencias hay entre Netlify, Vercel, Firebase Hosting y GitHub Pages?

- **Netlify / Vercel:** fáciles de usar con frontend frameworks.
- **Firebase Hosting:** ideal para apps que también usan Firestore, Auth, etc.
- **GitHub Pages:** útil para sitios estáticos y repos públicos.

### 🔥 Introducción a Firebase y Firestore

> [Firebase](https://firebase.google.com/)

#### 🔥 ¿Qué es Firebase?

    Es una plataforma de desarrollo de aplicaciones web y móviles que ofrece servicios como base de datos, autenticación, almacenamiento y hosting.

#### 🧱 ¿Qué es Cloud Firestore?

    Es una base de datos NoSQL en tiempo real que almacena datos en documentos y colecciones, accesible desde frontend y backend.

#### 🧭 ¿Cómo se estructura Firestore?

    Los datos se organizan en colecciones → documentos → campos. Cada documento puede contener datos anidados y referencias a otras colecciones.

> Muy similar a lo que vimos de mongo

### 🧪 Aplicación Web con Firestore

#### 🔗 ¿Cómo se conecta una app con Firestore?

1.  Importar Firebase SDK.
2.  Inicializar la app con configuración del proyecto.
3.  Usar métodos como `getDocs`, `onSnapshot`, `addDoc`.

#### ✏️ ¿Qué funciones básicas se pueden realizar con Firestore?

- Crear documentos (`addDoc`)
- Leer documentos (`getDocs`, `onSnapshot`)
- Actualizar (`updateDoc`)
- Eliminar (`deleteDoc`)

### 🚀 Despliegue con Firebase Hosting

#### 🧰 ¿Qué es Firebase Hosting?

Es un servicio de hosting para aplicaciones web estáticas o SPA, rápido y seguro, con HTTPS y CDN incluidos.

#### 🔌 ¿Qué pasos se siguen para desplegar?

1. Instalar CLI: `npm install -g firebase-tools`
2. Login: `firebase login`
3. Inicializar proyecto: `firebase init`
4. Desplegar: `firebase deploy`

#### 📁 ¿Qué archivo controla la configuración del despliegue?

`firebase.json` define la carpeta pública y reglas del hosting. `public/index.html` es el punto de entrada de la app.

### 🎯 Desafío Final

    	Construí una mini app de "notas" con HTML + JS que permita agregar y mostrar notas desde Firestore, y desplegala con Firebase Hosting.

✅ Requisitos

- Conexión a Firestore
- Guardar notas en una colección "notas"
- Mostrar notas en tiempo real
- Deploy exitoso en Firebase Hosting
