# Proyecto Backend Multas

Este proyecto implementa una arquitectura de **estructura limpia** para gestionar un sistema de multas.

## ✅ Funcionalidades Principales

- **Autenticación de Usuarios** con JWT (Login, Registro).
- **Creación de Multas** con una descripción obligatoria.
- **Aprobación de Multas** por al menos dos usuarios antes de ser aceptadas.
- **Protección de Rutas** mediante autenticación JWT.
- **Manejo de Errores** con middleware centralizado.
- **Documentación** con Swagger disponible en: [http://localhost:5000/api-docs](http://localhost:5000/api-docs).

## ✅ Endpoints Disponibles

### 📌 Autenticación (`/api/auth`)

| Método | Ruta                  | Descripción                                |
|--------|-----------------------|--------------------------------------------|
| POST   | `/api/auth/register`  | Registra un nuevo usuario (admin/usuario). |
| POST   | `/api/auth/login`     | Inicia sesión y devuelve un JWT.           |

### 📌 Multas (`/api/multas`)

| Método | Ruta                          | Descripción                                |
|--------|-------------------------------|--------------------------------------------|
| POST   | `/api/multas/create`          | Crea una nueva multa (requiere autenticación). |
| POST   | `/api/multas/approve/:multaId`| Aprueba una multa (requiere autenticación). |

## ✅ Arquitectura

- **`src/application/usecases/`**: Casos de uso (lógica de negocio).
- **`src/domain/entities/`**: Modelos de datos (User, Multa).
- **`src/domain/repositories/`**: Interfaces de acceso a datos.
- **`src/infrastructure/repositories/`**: Implementación de repositorios en MySQL.
- **`src/infrastructure/controllers/`**: Controladores HTTP.
- **`src/infrastructure/routes/`**: Rutas de Express.
- **`src/infrastructure/middleware/`**: Middleware de autenticación y manejo de errores.
- **`src/config/`**: Configuración de base de datos y Swagger.

## Estructura del Proyecto

```plaintext
backend-multas/
│── src/
│   ├── application/          # Casos de uso (lógica de negocio)
│   │   ├── usecases/
│   │   │   ├── CreateMulta.ts
│   │   │   ├── ApproveMulta.ts
│   │   │   ├── AuthenticateUser.ts
│   │   │   ├── RegisterUser.ts
│   ├── domain/               # Modelos y entidades
│   │   ├── entities/
│   │   │   ├── Multa.ts
│   │   │   ├── User.ts
│   │   ├── repositories/
│   │   │   ├── IMultaRepository.ts
│   │   │   ├── IUserRepository.ts
│   ├── infrastructure/       # Adaptadores y conexiones
│   │   ├── database/
│   │   │   ├── MySQLConnection.ts
│   │   ├── repositories/
│   │   │   ├── MultaRepository.ts
│   │   │   ├── UserRepository.ts
│   │   ├── routes/
│   │   │   ├── authRoutes.ts
│   │   │   ├── multaRoutes.ts
│   │   ├── controllers/
│   │   │   ├── AuthController.ts
│   │   │   ├── MultaController.ts
│   ├── config/               # Configuración global
│   │   ├── db.ts
│   │   ├── env.ts
│   ├── index.ts              # Punto de entrada
│── .env
│── package.json
│── tsconfig.json
│── README.md
```

### Descripción de Carpetas

- **`application/`**: Contiene los casos de uso que representan la lógica de negocio.
- **`domain/`**: Define las entidades y los contratos de repositorios.
- **`infrastructure/`**: Implementa adaptadores, controladores, rutas y conexiones a la base de datos.
- **`config/`**: Archivos de configuración global del proyecto.
- **`index.ts`**: Archivo principal que inicia la aplicación.

## ✅ Comandos Utilizados

### Crear el Proyecto

```bash
mkdir backend-multas && cd backend-multas
npm init -y
```

### Instalar TypeScript y Herramientas Necesarias

```bash
npm install express cors dotenv mysql2 jsonwebtoken bcryptjs
npm install --save-dev typescript ts-node @types/node @types/express @types/cors @types/jsonwebtoken @types/bcryptjs nodemon
npm install swagger-ui-express
npm install --save-dev @types/swagger-ui-express
```

### Inicializar TypeScript

```bash
npx tsc --init
```

## ✅ Notas Adicionales

- Configura correctamente el archivo `.env` para las variables de entorno.
- Usa `nodemon` para reiniciar automáticamente el servidor durante el desarrollo.

## ✅ Tecnologías Utilizadas

- **Node.js + Express.js** 🚀
- **TypeScript** 🏗️
- **MySQL** 🗄️
- **JWT** para autenticación 🔐
- **Bcrypt.js** para encriptación de contraseñas 🔑
- **Swagger** para documentación 📄
- **Docker (opcional)** 🐳

¡Contribuye y mejora este proyecto siguiendo las mejores prácticas de desarrollo!
