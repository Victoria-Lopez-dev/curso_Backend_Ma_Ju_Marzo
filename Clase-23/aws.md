# 🚀: Amazon Web Services (AWS)

Es una plataforma de servicios en la nube que ofrece infraestructura, herramientas y servicios escalables bajo demanda. Permite a los desarrolladores construir, desplegar y escalar aplicaciones sin necesidad de administrar servidores físicos.

## 🔧 Servicios más útiles y populares para desarrolladores:

### ☁️ EC2 (Elastic Compute Cloud)

    Proporciona servidores virtuales (instancias) para ejecutar aplicaciones como si fueran máquinas físicas, pero en la nube.

### 📦 S3 (Simple Storage Service)

    Almacenamiento de objetos escalable. Ideal para guardar archivos estáticos, backups, imágenes, videos, etc.

### 🛠️ Lambda

    Servicio de computación sin servidor (serverless). Permite ejecutar código en respuesta a eventos sin aprovisionar servidores.

### 📡 API Gateway

    Crea y gestiona APIs REST o WebSocket que se integran fácilmente con Lambda u otros servicios.

### 🧱 RDS (Relational Database Service)

    Bases de datos SQL como MySQL, PostgreSQL, y más, gestionadas automáticamente (respaldo, escalado, etc.).

### 📊 CloudWatch

    Monitorización y logs de tus aplicaciones y recursos en AWS.

### 🔐 IAM (Identity and Access Management)

    Control de acceso y gestión de permisos de usuarios y servicios.

### 🚚 CodePipeline / CodeBuild / CodeDeploy

    Servicios CI/CD para automatizar el flujo de integración y entrega continua.

### 🌍 Route 53

    Servicio DNS altamente disponible y escalable.

### 🧠 Cognito

    Autenticación de usuarios, ideal para apps web y móviles.

## ⚠️: Aspectos importantes a tener en cuenta al usar AWS:

### 💸 Costos invisibles

    AWS cobra por uso, lo que es genial... pero si dejás una instancia EC2 encendida, funciones Lambda en bucle o S3 con mucho tráfico de salida, los costos pueden escalar rápidamente.

> 👉 Usá la calculadora de precios y configurá presupuestos y alarmas en AWS Billing.

### 🔐 Seguridad ante todo (IAM)

    No uses tu cuenta root para trabajar. Creá usuarios con permisos limitados mediante IAM. Aplicá el principio de mínimos privilegios.

> 👉 Activá MFA (autenticación de dos factores) siempre.

### 📦 Gestión de recursos y automatización

    A medida que crecen los servicios en uso, puede volverse caótico. Usá herramientas como CloudFormation o Terraform para definir infraestructura como código.

### 🗺️ Regiones y zonas de disponibilidad

    Elegí correctamente la región más cercana a tus usuarios, ya que afecta latencia y costos.

### 🧪 Ambientes separados

    Mantené entornos separados para desarrollo, testing y producción. No desarrolles directamente en producción.

### 🚫 Evitar vendor lock-in

    Algunos servicios como Lambda o DynamoDB están muy atados al ecosistema AWS. Si querés mantener portabilidad, considerá bien tus elecciones de arquitectura.

### 📜 Logs y monitoreo desde el principio

    Activá CloudWatch y configurá alarmas para detectar errores, sobrecostos o comportamiento inusual en tus recursos
