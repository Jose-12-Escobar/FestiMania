# FestiMania: Sistema de Gestión de Festivales
1. Tecnologías Usadas:
_ Backend: Spring Boot
_ Frontend: Angular con PrimeNG
_ Base de Datos: MongoDB
_ Control de versiones: Git

🚀 Instrucciones de Instalación y Ejecución
1. La base de datos se encuantra alojada en MongoDB Atlas
   a. La cadena de conexión está incluida en el application.properties

2. Clonar o descargar el Repositorio
   git clone https://github.com/Jose-12-Escobar/FestiMania.git
   
3. Configuración del Backend (Spring Boot)
  a. Requisitos Previos
     .Java 17+ (JDK)
     .Maven
  b. Instalación de Dependencias
     .Navega al directorio backend y ejecuta el comando para instalar las dependencias de Maven: mvn clean install o desde el IDE
  c. Ejecución del Backend
     .Una vez instaladas las dependencias, puedes iniciar el servidor con el siguiente comando: mvn spring-boot:run
     o desde el IDE instalando el plugin Spring Tools 4 y luego ejecutando el proyecto como una app spring boot
     .El backend se ejecutará en http://localhost:8080

4. Configuración del Frontend (Angular con PrimeNG)
   a. Requisitos Previos
     .Node.js (versión 16.14.0 o superior)
     .Angular CLI (instalar con npm install -g @angular/cli)
   b. Instalación de Dependencias
     .npm install o (npm i)
   c. Ejecución del Frontend
     .Ejecuta el siguiente comando para iniciar el servidor ng serve

5. Inicio de sesión una vez arrancada la aplicación.
   a.La aplicacion esta programada para tener solo un usuariuo administrador ("ROLE_ADMIN") que sera el primero en registrarse, el resto de los usuarios seran rol user ("ROLE_USER")
   b. Usuario administrador:
       Nombre de usuario: jesco
       Email: jesco@gmail.com
       Contraseña: 12341234
   c Usuario user:
       Nombre de usuario: luisito
       Email: luis@gmail.com
       Contraseña: 12341234
