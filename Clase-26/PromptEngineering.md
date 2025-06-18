# 🧠 Prompt Engineering

Ejemplo del [chat](https://chatgpt.com/share/6852039f-9530-800d-9e58-40a0d27634e6) de la clase 26

## 📌 ¿Qué es Prompt Engineering?

Es el arte de diseñar instrucciones (prompts) efectivas para obtener respuestas útiles de modelos de lenguaje como ChatGPT. Aplicado al backend, permite generar código, documentación y automatizar tareas rápidamente.

## 🤔 ¿Por qué es importante?

Los modelos de IA no "piensan" como humanos, sino que generan respuestas basadas en patrones aprendidos. Un buen prompt ayuda a guiar al modelo para que dé mejores resultados.

### 🧩 Partes de un Prompt

1. 📚 Contexto (opcional, pero útil)

   - Proporciona información previa para que el modelo entienda la situación o necesidad.
   - Ejemplo: “Soy desarrollador backend y quiero automatizar procesos.”

2. 🎯 Instrucción clara

   - Qué querés que haga el modelo, expresado en forma directa, imperativa.
   - Ejemplo: “Generá una función que se conecte a MongoDB.”

3. 📌 Formato de salida deseado (opcional, pero mejora resultados)
   - Le indica al modelo cómo querés que te devuelva la información.
   - Ejemplo: “En formato de snippet de código con comentarios.”

---

### ✅ EJEMPLO SIMPLE

🔹 Prompt:

> “Explicá qué es una API como si fuera para alguien que recién empieza en programación.”

🔸 Partes:

- 🎯 Instrucción clara: “Explicá qué es una API…”
- No tiene contexto ni formato de salida, pero funciona bien por ser una petición concreta.

---

### 🔍 EJEMPLO COMPLEJO

🔹 Prompt:

> “Actuá como un experto en Node.js y Express. Quiero que me ayudes a optimizar un endpoint que recibe datos JSON y los guarda en MongoDB. Mostrame el código optimizado, explicá por qué esos cambios mejoran el rendimiento y devolvelo en un formato markdown con los bloques de código bien etiquetados.”

🔸 Partes:

- 📚 Contexto: “Actuá como un experto en Node.js y Express.”
- 🎯 Instrucción: “Ayudame a optimizar un endpoint…”
- 📌 Formato: “Código optimizado + explicación + formato markdown.”

---

Un poco de Magia

```
# MISSION

Act as Professor Synapse, a conductor of expert agents. Your job is to support me in accomplishing my goals by gathering context, then you MUST init:

**Synapse_CoR** =

“<emoji>: I am an expert in [role&domain]. I know [context]. I will reason step-by-step to determine the best course of action to achieve [goal]. I can use [tools] and [relevant frameworks] to help in this process. I will help you accomplish your goal by following these steps: [reasoned steps] My task ends when [completion]. [first step, question]”

# INSTRUCTIONS

🧙🏾‍♂️, gather context, relevant information and clarify my goals by asking questions
Once confirmed you are MANDATED to init Synapse_CoR
🧙🏾‍♂ and [emoji] support me until goal is complete

# COMMANDS

/start=🧙🏾‍♂️,introduce and begin with step one

/ts=🧙🏾‍♂️,summon (Synapse_CoR*3) town square debate

# PERSONA

-curious, inquisitive, encouraging

-use emojis to express yourself

# RULES

-End every output with a question or reasoned next step.

-You are MANDATED to start every output with “🧙🏾‍♂️:” or “[emoji]:” to indicate who is speaking

– After init organize every output

    “🧙🏾‍♂️: [aligning on my goal]



    [emoji]: [actionable response].”

-🧙🏾‍♂️, you are MANDATED to init Synapse_CoR after context is gathered.

– You MUST Prepend EVERY Output with a reflective inner monologue in a markdown code block reasoning through what to do next prior to responding.

– Always answer in SPANISH
```

| Componente                          | Valor                                                                                                    |
| ----------------------------------- | -------------------------------------------------------------------------------------------------------- |
| **🎭 Rol definido**                 | "Professor Synapse" como conductor de agentes expertos. Esto da personalidad clara y propósito.          |
| **🎯 Misión explícita**             | “Tu trabajo es ayudarme a lograr mis objetivos reuniendo contexto…”                                      |
| **🧠 Flujo de trabajo**             | Primero preguntas, luego `init: Synapse_CoR`, después soporte activo.                                    |
| **📜 Reglas claras**                | Uso obligatorio de encabezados, emojis, reflexión previa en markdown, idioma español.                    |
| **🧙🏾‍♂️ Estilo inmersivo**             | Instrucciones como “/start” o “/ts” permiten una experiencia tipo RPG o sistema de agentes.              |
| **👥 Estructura dual de respuesta** | Una parte reflexiva, otra de acción (alineación + ejecución). Muy poderoso para pensamiento estratégico. |

---

### 🧠 ¿QUÉ ES Synapse_CoR?

🔬 **Definición rápida**:

    	Es un molde o plantilla que obliga al modelo a asumir el rol de un experto específico, describir su conocimiento, herramientas, y un plan detallado de acción para ayudarte a cumplir un objetivo.

📌 **“CoR” = Chain of Reasoning**:

    	Significa que el experto no solo responde, sino que piensa paso a paso, justifica sus acciones y planifica cómo resolver el problema.

📡 **“Synapse” = conexión activa entre agentes expertos**:

    	Sugiere una red de expertos que pueden ser convocados dinámicamente con este formato.

### 🎯 ¿PARA QUÉ SIRVE Synapse_CoR?

- 📋 Estandariza el comportamiento del modelo

- 🧑‍🔬 Lo obliga a razonar y planear

- 🛠️ Declara explícitamente su caja de herramientas

- 📍 Define cuándo su tarea termina

- 🎯 Te devuelve control: no responde por responder, sino con dirección.

---

### 🧩 ¿Qué son los COMMANDS?

```txt
# COMMANDS

/start=🧙🏾‍♂️,introduce and begin with step one

/ts=🧙🏾‍♂️,summon (Synapse_CoR*3) town square debate
```

> Estos son comandos simbólicos, no funciones reales como en una shell, sino gatillos semánticos que vos podés usar dentro de la conversación para indicarle al modelo que inicie una acción específica bajo las reglas definidas por tu prompt.

### 🔧 ¿Cómo se usan?

🔹 **1. Se usan manualmente, por vos (el usuario)**

    Estos comandos están diseñados para que vos los escribas literalmente en el chat, y al reconocerlos, yo (como agente) interpreto lo que deben hacer, gracias a la instrucción previa del prompt.

✳️ Ejemplo:

```txt
/start
```

Y eso activa el siguiente flujo:

- El 🧙🏾‍♂️ hace una introducción al estilo Profesor Synapse

- Comienza con preguntas para recolectar contexto

- Luego invoca un Synapse_CoR con base en lo que necesita

🔹 2. No se usan automáticamente ni internamente entre agentes

    A diferencia de una app con sistema real de ejecución de comandos, en ChatGPT esto no está “parseado” automáticamente, así que:

- No se ejecutan si los escribís en otro lugar que no sea el chat

- No se activan solos a menos que vos los uses

- No hay un sistema de "event listeners" internos como en bots

> Son simples **_etiquetas_** estructuradas que te dan un **lenguaje de control** sobre cómo interactuar con el sistema.

---

### 🧠 ¿Por qué es útil esta lógica?

- Te da control semántico: podés iniciar un flujo sin dar todo el contexto de nuevo

- Es escalable: podés definir más comandos como /reset, /debug, /compare, etc.

- Estás creando una especie de CLI conversacional para inteligencia artificial
