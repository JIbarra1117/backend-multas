# Proyecto Backend Multas

Este proyecto implementa una arquitectura de **estructura limpia** para gestionar un sistema de multas.

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

- **application/**: Contiene los casos de uso que representan la lógica de negocio.
- **domain/**: Define las entidades y los contratos de repositorios.
- **infrastructure/**: Implementa adaptadores, controladores, rutas y conexiones a la base de datos.
- **config/**: Archivos de configuración global del proyecto.
- **index.ts**: Archivo principal que inicia la aplicación.

## Comandos Utilizados

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

## Notas Adicionales

- Asegúrate de configurar correctamente el archivo `.env` para las variables de entorno.
- Usa `nodemon` para reiniciar automáticamente el servidor durante el desarrollo.

¡Contribuye y mejora este proyecto siguiendo las mejores prácticas de desarrollo!
