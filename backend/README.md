# Backend - PRUEBA TÉCNICA

## Requisitos previos 
- Node.js v18+
- npm v9+
- MySQL

---

## Instalación de dependencias

Acceder a la carpeta backend e instalamos las dependencias.

```bash
  cd backend
  npm install
```

---

## Variables de entorno

Crear un archivo ```.env``` con la siguiente informacion.

```ini
    DB_HOST=localhost  
    DB_USER=root
    DB_PASS=1234
    DB_NAME=prueba_tecnica
    JWT_SECRET=una_clave_secreta
```
*Nota: los datos que deben ser ingresados son tus credenciales de la base de datos. En el caso de JWT_SECRET debes colocar la clave que tu deseas.*

---

## Compilar TypeScript a JavaScript

Ejecutar el siguiente comando en la terminal para compilar los archivos.

```bash
    npm run build
```

*Esto generará los archivos JS en la carpeta dist.*

---

## Iniciar el servidor

Una vez generados los archivos JS, ejecutamos el siguiente comando para iniciar el servidor.

```bash
    npm start
```

- El servidor se ejecutará por defecto en el puerto 4000.
- Luego de iniciar el servidor, abre `http://localhost:4000` para confirmar que funciona.

--- 

## Scripts útiles

- ``` npm run build ``` -> Compila TS a JS en la carpeta dist.
- ``` npm start ``` -> Iniciar el servidor desde dist.

---

## Base de Datos

- Ejecutar el script SQL que se encuentra en  ```/db/script.sql``` para crear la base de datos, tabla de usuarios, proveedores y tipo de proveedor.
- El usuario administrador ya tiene la contraseña hasheada.
- Existe un helper en ```/helpers/hashPassword.ts``` para hashear nuevas contraseñas, unicamente se reemplaza la contraseña que se desea hashear.

---

## Notas adicionales

-- Todas las rutas de proveedores (```/api/suppliers```, ```/api/add-supplier```, etc.) requiren un **token JWT válido** para poder ejecutarse.


