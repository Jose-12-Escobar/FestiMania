# FestiMania: Sistema de Gestión de Festivales

## Tecnologías Usadas:
- **Backend**: Spring Boot
- **Frontend**: Angular con PrimeNG
- **Base de Datos**: MongoDB
- **Control de versiones**: Git

## 🚀 Instrucciones de Instalación y Ejecución

### Base de datos
- La base de datos se encuentra alojada en MongoDB Atlas.
- La cadena de conexión está incluida en el `application.properties`.

### Clonar o descargar el Repositorio
- git clone https://github.com/Jose-12-Escobar/FestiMania.git
  
### Configuración del Backend (Spring Boot)

**Requisitos Previos:**
- Java 17+ (JDK)
- Maven
  
**Instalación de Dependencias:**
- Navega al directorio backend y ejecuta el comando para instalar las dependencias de Maven: `mvn clean install`
- También puedes hacerlo desde el IDE.
  
**Ejecución del Backend:**
- Una vez instaladas las dependencias, inicia el servidor con el siguiente comando: `mvn spring-boot:run`
- También se puede hacer desde el IDE instalando el plugin Spring Tools 4 y ejecutando el proyecto como una Spring Boot app.
- El backend se ejecutará en http://localhost:8080

### Configuración del Frontend (Angular con PrimeNG)

**Requisitos Previos:**
- Node.js (versión 16.14.0 o superior)
- Angular CLI (instalar con npm install -g @angular/cli)
- Instalación de Dependencias: `npm install`

**Ejecución del Frontend:**
- Ejecuta el siguiente comando para iniciar el servidor: `ng serve`

### Inicio de sesión

**Una vez arrancada la aplicación:**
- La aplicación está programada para tener un único usuario administrador ("ROLE_ADMIN"), que será el primero en registrarse. El resto de los usuarios tendrán el rol de usuario ("ROLE_USER").
1. Usuario administrador:
   - Nombre de usuario: jesco
   - Email: jesco@gmail.com
   - Contraseña: 12341234
   
2. Usuario user:
   - Nombre de usuario: luisito
   - Email: luis@gmail.com
   - Contraseña: 12341234
