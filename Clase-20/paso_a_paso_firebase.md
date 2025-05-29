# 🧪 Desafío Final Paso a Paso: App de Notas + Firebase Hosting

## **Objetivo:**

    Crear una aplicación web simple que permita agregar notas, almacenarlas en Cloud Firestore y desplegarla con Firebase Hosting.

---

### 🪜 Paso 1: Crear un nuevo proyecto en Firebase

1. Ve a https://console.firebase.google.com

2. Clic en "Agregar proyecto"

3. Ponle un nombre (por ejemplo: app-notas)

4. Desactiva Google Analytics si no lo vas a usar

5. Crea el proyecto y espera la confirmación

---

### 🪜 Paso 2: Configurar Firestore

1. En el dashboard del proyecto, ve a "Cloud Firestore"

2. Clic en "Crear base de datos"

3. Selecciona modo de prueba y región

4. Crea una colección inicial llamada notas si querés probar desde la consola

---

### 🪜 Paso 3: Estructura del proyecto web

1. Instalar CLI:

```bash
npm install -g firebase-tools
```

2. Login:

```bash
firebase login
```

3. Inicializá tu proyecto:

```bash
firebase init
```

- Elegí Hosting

- Usá public/ como carpeta

- Elegí no configurar como SPA (a menos que uses routing)

4. Inicializar proyecto:

```bash
firebase init
```

Crea el cambia index.html con un formulario simple:

```html
<!DOCTYPE html>
<html lang="es">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>📝 Notas App con Firebase</title>
    <link
      rel="stylesheet"
      href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css"
    />
  </head>
  <body>
    <h1>📝 Mis Notas (Cloud Firestore)</h1>

    <form id="note-form">
      <input
        type="text"
        id="note-title"
        placeholder="Título de la nota"
        required
      />
      <textarea
        id="note-content"
        placeholder="Contenido..."
        required
      ></textarea>
      <button type="submit"><i class="fa fa-plus"></i> Agregar Nota</button>
    </form>

    <div id="notes-container"></div>

    <script type="module" src="./firebase.js"></script>
    <script type="module" src="./app.js"></script>
  </body>
</html>
```

---

### 🪜 Paso 4: Configurar Firebase en tu frontend

1. Crea el archivo `firebase.js`
2. Ve a "Configuración del proyecto" > "Agregar app web"
3. Copiá el fragmento de configuración Firebase y pegalo en `firebase.js`

```js
import { initializeApp } from 'https://www.gstatic.com/firebasejs/11.8.1/firebase-app.js';
import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  updateDoc,
  doc,
  Timestamp,
  getDoc,
} from 'https://www.gstatic.com/firebasejs/11.8.1/firebase-firestore.js';

const firebaseConfig = {
  apiKey: '',
  authDomain: '',
  projectId: '',
  storageBucket: '',
  messagingSenderId: '',
  appId: '',
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const notesRef = collection(db, 'notas');

export const saveNote = async (title, content, noteId = null) => {
  const note = {
    titulo: title,
    contenido: content,
    fecha: Timestamp.fromDate(new Date()),
  };
  if (noteId) {
    const noteDoc = doc(db, 'notas', noteId);

    await updateDoc(noteDoc, note);
  } else {
    await addDoc(notesRef, note);
  }
};

export const getNotes = async () => {
  const querySnapshot = await getDocs(notesRef);
  const result = [];
  querySnapshot.forEach((docSnap) => {
    const note = docSnap.data();
    const id = docSnap.id;

    result.push({
      id,
      note,
    });
  });

  return result;
};

export const getNote = () => {
  return getDoc(notesRef);
};

export const deleteNote = async (id) => {
  const noteDoc = doc(db, 'notas', id);
  await deleteDoc(noteDoc);
};
```

---

### 🪜 Paso 5: Agregar nuevas notas

En tu app.js, agregá:

```js
import { saveNote, getNotes, deleteNote } from './firebase.js';

// 🧹 Función para renderizar todas las notas (una sola vez)
async function renderNotes() {
  const notesContainer = document.getElementById('notes-container');
  notesContainer.innerHTML = ''; // Limpiar antes de renderizar

  const data = await getNotes();

  data.forEach((d) => {
    const noteEl = document.createElement('div');
    noteEl.className = 'note';
    noteEl.innerHTML = `
      <strong>${d.note.titulo}</strong>
      <p>${d.note.contenido}</p>
      <i class="fa fa-pencil edit" title="Editar" data-id="${d.id}"></i>
      <i class="fa fa-trash fa-danger" title="Eliminar" data-id="${d.id}"></i>
    `;

    // Eliminar nota
    noteEl.querySelector('.fa-trash').addEventListener('click', async () => {
      try {
        await deleteNote(d.id);
        renderNotes(); // Recargar después de eliminar
      } catch (error) {
        console.error('Error al eliminar nota:', error);
      }
    });

    // Editar nota
    noteEl.querySelector('.edit').addEventListener('click', () => {
      document.getElementById('note-title').value = d.note.titulo;
      document.getElementById('note-content').value = d.note.contenido;
      document.getElementById('note-form').setAttribute('data-id', d.id);
      document.querySelector('button').innerHTML =
        '<i class="fa fa-save"></i> Actualizar Nota';
    });

    notesContainer.appendChild(noteEl);
  });
}

document.addEventListener('DOMContentLoaded', () => {
  const noteForm = document.getElementById('note-form');
  renderNotes(); // ⚡ Carga inicial

  noteForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const title = document.getElementById('note-title').value;
    const content = document.getElementById('note-content').value;
    const noteId = noteForm.getAttribute('data-id');

    try {
      await saveNote(title, content, noteId);

      if (noteId) {
        noteForm.removeAttribute('data-id');
      }
      noteForm.reset();
      document.querySelector('button').innerHTML =
        '<i class="fa fa-plus"></i> Agregar Nota';
      renderNotes(); // 🔄 Refrescar después de agregar/editar
    } catch (error) {
      console.error('Error al guardar nota:', error);
    }
  });
});
```

---

### 🪜 Paso 6: Desplegar con Firebase Hosting

```bash
firebase deploy
```

Tu app estará disponible en una URL como:
https://app-notas-[ID].web.app
