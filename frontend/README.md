# Frontend - PRUEBA TÉCNICA

## Requisitos previos
- Node.js v18+
- npm v9+

---

## Instalación de dependencias

Acceder a la carpeta `frontend` e instalar las dependencias:

```bash
  cd frontend
  npm install
```

---

## Variables de entorno

Si el frontend necesita comunicarse con el backend, crea un archivo `.env` en la raíz de esta carpeta con la URL de la API:

```ini
VITE_URL_API=http://localhost:4000
```

> Ajusta `VITE_URL_API` según la ruta donde tengas levantado el backend, de preferencia que sea `http://localhost:4000` ya que es el puerto que establecimos para el servidor en el backend.
> *Nota:* No es necesario modificar el código para cambiar URL de la API. El proyecto usa esta variable de forma global, por lo que con solo editar el archivo `.env` se actualizará en todas las peticiones automáticamente. 



---

## Iniciar el servidor de desarrollo

Ejecuta el siguiente comando:

```bash
npm run dev
```

> El proyecto se ejecutará por defecto en `http://localhost:5173` (Puerto de Vite).
> Abre la URL en tu navegador para ver la aplicación.

## Scripts útiles

- `npm run dev` -> Iniciar el servidor de desarrollo.
- `npm run build` -> Genera la versión optimizada para producción en la carpeta `dist`. 
- `npm run preview` -> Previsualiza la aplicación ya compilada.

---

## Notas adicionales

- Asegúrate de que el backend esté en ejecución antes de probar las funciones que dependen de la API. 
- Si usas autenticación, guarda el token JWT en el localStorage. 



