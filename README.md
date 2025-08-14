# PRUEBA TÉCNICA - DESARROLLADOR JUNIOR

## Descripción del proyecto

Este proyecto es una aplicación para la gestión de proveedores, que simula un escenario real de los sistemas de Kratt.
Permite que un **administrador** inicie sesión, genere un **token JWT** y gestione proveedores de manera segura.

Funcionalidades principales:
- **Login de administrador** con autenticación JWT válida por 1 hora.
- **Gestión de proveedores** registrar, actualizar, eliminar, visualizar y filtrar proveedores por nombre o tipo.
- Almacenamiento de datos en una **base de datos MySQL**.

> Todas las funcionalidades protegidas requieren un token JWT válido.

---

## Estructura del proyecto

```text
project-root/
├─ backend/                 # Servidor Node.js + TypeScript
│   ├─ db/                  # Scripts de base de datos (creación de tablas, inserts iniciales)
│   ├─ helpers/             # Funciones auxiliares (ej: hash de contraseñas, validaciones)
│   ├─ middlewares/         # Middlewares de Express (ej: autenticación JWT, manejo de errores)
│   ├─ queries/             # Consultas SQL organizadas por entidades
│   ├─ types/               # Definiciones de tipos TypeScript para el backend
│   └─ index.ts             # Punto de entrada del servidor
│
├─ frontend/                # Aplicación React + Vite
│   ├─ public/              # Archivos públicos estáticos (imagenes, iconos)
│   ├─ src/                 # Código fuente de la aplicación
│   │   ├─ components/      # Componentes reutilizables de UI
│   │   ├─ context/         # Contextos de React para manejo global de estado
│   │   ├─ features/        # Funcionalidades específicas organizadas por dominio
│   │   ├─ helpers/         # Funciones auxiliares (ej: formateo, validaciones)
│   │   ├─ hooks/           # Hooks personalizados de React
│   │   ├─ pages/           # Vistas completas o páginas de la aplicación
│   │   ├─ reducers/        # Reducers para manejo de estado global con useReducer
│   │   ├─ scss/            # Archivos de estilos SCSS
│   │   └─ types/           # Definiciones de tipos TypeScript para el frontend
│
├─ README.md                # README general del proyecto
└─ .gitignore               # Archivos y carpetas ignoradas por Git

```
 
---

## Stack utilizado

- **Frontend:** React + Vite, TypeScript
- **Backend:** Node.js, Express, TypeScript
- **Base de datos:** MySQL
- **Autenticación:** JWT

---

## Variables de entorno

- **Backend:** archivo `.env` dentro de `backend/`con credenciales de la base de datos y `JWT_SECRET`.
- **Frontend:** archivo `.env` dentro de `frontend/` con `VITE_URL_API` apuntando a la URL del backend.

> Con esto, el frontend y backend reconocerán automáticamente sus variables de entorno sin necesidad de modificar el código. 

---

## Cómo levantar el proyecto

1. **Backend**
```bash
cd backend
npm install
npm run build
npm start
```

2. **Frontend**
```bash
cd frontend
npm install
npm run dev
```

3. Abrir el navegador: `http://localhost:5173`

> Instrucciones más detalladas en el README de cada carpeta.

---

## Usuario de prueba

- **Correo:** admin@kratt.com
- **Contraseña:** admin2025

> Este usuario ya está registrado en la base de datos y tiene permisos de administrador. 

---

