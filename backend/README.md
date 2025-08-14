# Backend - PRUEBA TÉCNICA

## Requisitos previos 
- Node.js v18+
- npm v9+
- MySQL

---

## Instalación de dependencias

Acceder a la carpeta `backend` e instalar las dependencias:

```bash
  cd backend
  npm install
```

---

## Variables de entorno

Crear un archivo `.env` en la raíz de esta carpeta con la siguiente información:

```ini
    DB_HOST=localhost  
    DB_USER=root
    DB_PASS=1234
    DB_NAME=prueba_tecnica
    JWT_SECRET=una_clave_secreta
```

> - Los datos deben coincidir con tus credenciales de base de datos.
> - Para JWT_SECRET, coloca la clave que desees usar.

---

## Compilar TypeScript a JavaScript

Ejecutar el siguiente comando en la terminal para compilar los archivos:

```bash
    npm run build
```

*Esto generará los archivos JS en la carpeta dist.*

---

## Iniciar el servidor de desarrollo

Una vez generados los archivos JS, ejecutamos el siguiente comando para iniciar el servidor:

```bash
    npm start
```

- El servidor se ejecutará por defecto en el puerto 4000.
- Luego de iniciar el servidor, abre `http://localhost:4000` para confirmar que funciona.

--- 

## Scripts útiles

- `npm run build` -> Compila TS a JS en la carpeta dist.
- `npm start` -> Iniciar el servidor desde dist.

---

## Base de Datos

- Ejecutar el script SQL que se encuentra en  [db/script.sql](db/script.sql) para crear la base de datos, tabla de usuarios, proveedores y tipo de proveedor.
- El usuario administrador ya tiene la contraseña hasheada.
- Existe un helper en [helpers/hashPassword.ts](helpers/hashPassword.ts) para hashear nuevas contraseñas, únicamente reemplaza la contraseña que se desea hashear.

---

## API y Postman

Se incluye una colección de Postman con todos los endpoints listos para probar: login, listar, proveedores, agregar y filtrar por nombre o tipo.

### Abrir colección en Postman
[Edwin Soto's Workspace - Postman](https://edwinsoto-392155.postman.co/workspace/Edwin-Soto's-Workspace~27674111-be1e-47ff-88a5-40eefe1baa3b/request/46486862-6d6f9a4d-2d34-43e9-92b5-63fda6dea40f?action=share&creator=46486862&ctx=documentation&active-environment=46486862-fb6825e7-3f64-44a5-8e2e-97f7b3006503)

---

### Uso del workspace

1. Selecciona el **environment** importado desde el workspace en la esquina superior derecha de Postman.  
2. Ejecuta primero el endpoint **Login** para generar el token automáticamente en la variable `{{token}}`.  
3. Todos los demás endpoints usarán `{{token}}` en el header `Authorization` automáticamente.  

---

### Headers requeridos

- `Authorization: Bearer {{token}}` → para todos los endpoints protegidos.  
- `Content-Type: application/json` → para endpoints que envían body (`POST /add-supplier`).  

---

### Endpoints principales

1. Login administrador

**POST /api/login**

Body (JSON):

```json
{
  "email": "admin@kratt.com",
  "password": "123456"
}
```

2. Listar Proveedores

**GET /api/suppliers**

**Respuesta de ejemplo:**

```json
{
  "success": true,
  "data": [
    {
      "id_supplier": 1,
      "company_name": "ProveedorX",
      "contact_person": "Juan Perez",
      "email": "juan@proveedor.com",
      "id_type": 1,
      "NIT": "12345678",
      "phone": "5555-5555",
      "city": "Ciudad",
      "created_at": "2025-08-14T12:00:00.000Z"
    }
  ]
}
```

3. Agregar Proveedor
**POST /api/add-suppliers**

**Body (JSON):**

```json
{
  "company_name": "ProveedorX",
  "contact_person": "Juan Perez",
  "email": "juan@proveedor.com",
  "id_type": 1,
  "NIT": "12345678",
  "phone": "5555-5555",
  "city": "Ciudad"
}
```
> `id_supplier` y `created_at` se generan automáticamente en el backend. 

4. Filtrar proveedor por nombre

**GET /api/suppliers/search-by-name?company_name=ProveedorX**

5. Filtrar proveedor por tipo
**GET /api/suppliers/search-by-type?id_type=1**

---

### Tips Postman

- Crear un **Enviroment** con la variable `token`.
- Usar `{{token}}` en todos los headers `Authorization`.

---

### Notas adicionales

- Todas las rutas de proveedores (```/api/suppliers```, ```/api/add-supplier```, etc.) requieren un **token JWT válido** para poder ejecutarse.
- Asegúrate que la base de datos esté creada y el backend en ejecución antes de probar la API.
