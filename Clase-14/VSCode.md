# 🛠️ Extensiones Recomendadas para VSCode en Programación

Instalar extensiones en **Visual Studio Code** mejora la productividad, organización y legibilidad del código.

---

## 🎨 **Mejoras Visuales y Organización**

### 1. **Material Icon Theme** ([Link](https://marketplace.visualstudio.com/items/?itemName=PKief.material-icon-theme))

- 📌 **Qué hace**: Agrega iconos intuitivos a archivos y carpetas en el explorador, facilitando la identificación de tipos de archivo (HTML, CSS, JS, etc.).
- 🎯 **Beneficio**: Navegación visual más rápida en proyectos complejos.

### 2. **Colorize** ([Link](https://marketplace.visualstudio.com/items/?itemName=kamikillerto.vscode-colorize))

- 📌 **Qué hace**: Muestra un fondo de color junto a valores hexadecimales, RGB o HSL en el código.
- 🎯 **Beneficio**: Identifica colores rápidamente sin abrir herramientas externas.

---

## ✨ **Autocompletado y Formateo**

### 3. **Auto Complete Tag** ([Link](https://marketplace.visualstudio.com/items/?itemName=formulahendry.auto-complete-tag))

- 📌 **Qué hace**: Cierra automáticamente etiquetas HTML/XML y sincroniza apertura/cierre.
- 🎯 **Beneficio**: Evita errores de sintaxis y ahorra tiempo.

### 4. **Prettier - Code Formatter** ([Link](https://marketplace.visualstudio.com/items/?itemName=esbenp.prettier-vscode))

- 📌 **Qué hace**: Formatea automáticamente el código al guardar (soporta JS, HTML, CSS, etc.).
- 🎯 **Beneficio**: Mantiene un estilo consistente en el proyecto.

### 5. **ESLint** ([Link](https://marketplace.visualstudio.com/items/?itemName=dbaeumer.vscode-eslint))

- 📌 **Qué hace**: Detecta errores y estilos inconsistentes en JavaScript/TypeScript.
- 🎯 **Beneficio**: Mejora la calidad del código siguiendo buenas prácticas.

---

## ⚡ **Productividad y Control de Versiones**

### 6. **GitLens** ([Link](https://marketplace.visualstudio.com/items/?itemName=eamodio.gitlens))

- 📌 **Qué hace**: Muestra quién hizo cambios en cada línea, historial de commits y diferencias.
- 🎯 **Beneficio**: Facilita el trabajo en equipo con Git.

### 7. **Bottom Terminal** ([Link](https://marketplace.visualstudio.com/items/?itemName=fuadpashayev.bottom-terminal))

- 📌 **Qué hace**: Mueve la terminal integrada a la parte inferior de la ventana (como en otros IDEs).
- 🎯 **Beneficio**: Acceso más ergonómico sin cambiar ventanas.

---

## 🌈 **Configurar Brackets Coloridos en VSCode**

Para activar colores en los corchetes (`brackets`), sigue estos pasos:

1. Abre **VSCode** y presiona `Ctrl + ,` (Windows/Linux) o `Cmd + ,` (Mac) para abrir **Settings**.
2. Haz clic en el ícono de "**Open Settings (JSON)**" (esquina superior derecha).
3. Agrega este código al archivo `settings.json`:
   ```
   {
       "editor.bracketPairColorization.enabled": true,
       "editor.guides.bracketPairs": "active"
   }
   ```
4. Guarda el archivo (`Ctrl + S`). Los brackets ahora tendrán colores únicos por nivel de anidación.

---

### 🚀 **Conclusión**

Estas extensiones optimizan tu flujo de trabajo, desde autocompletado hasta control de versiones. ¡Instálalas y disfruta de una experiencia de codificación más fluida!

> **Tip**: Reinicia VSCode después de instalar las extensiones para aplicar cambios correctamente.
