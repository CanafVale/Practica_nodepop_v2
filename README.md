# Nodepop - Web de compraventa de productos de segunda mano 

Aplicación web desarrollada en Node.js con EJS y MongoDB (Atlas), que permite a los usuarios publicar y gestionar productos de segunda mano.

---

## ¿Cómo ejecutar el proyecto?

1. **Clona el repositorio**:
   ```bash
   git clone <url-del-repositorio>
   cd practica_nodepop
   ```

2. **Instala las dependencias**:
   ```bash
   npm install
   ```

3. **Crea un archivo `.env`** en la raíz del proyecto con tu conexión a MongoDB Atlas:
   ```
   MONGODB_URI=mongodb+srv://<usuario>:<contraseña>@<tu-cluster>.mongodb.net/?retryWrites=true&w=majority
   ```

4. **Inicializa la base de datos con usuarios y productos de prueba**:
   ```bash
   npm run initdb
   ```

5. **Arranca la aplicación**:
   ```bash
   npm run dev
   ```
   La app estará disponible en: [http://localhost:3000](http://localhost:3000)

---

## Funcionalidades implementadas

- **Login y Logout**
- **Listado de productos propios**
- **Creación y eliminación de productos**
- **Control de acceso mediante sesión**
- **Imágenes de productos almacenadas localmente**

## Funcionalidades a implementar a futuro 
- **Filtro de productos por usuario**
- **Paginación**
---

## Usuarios de prueba

Tras inicializar la base de datos, se crean los siguientes usuarios de prueba:

| Email              | Contraseña |
|--------------------|------------|
| demo@example.com   | 1234       |
| user@example.com   | 1234       |

---

## Estructura del proyecto

```
.
├── controllers/         // Lógica de rutas (login, home, productos)
├── lib/                 // Middleware de sesión y conexión Mongo
├── models/              // Esquemas Mongoose
├── public/              // Archivos estáticos (CSS, imágenes)
├── views/               // Plantillas EJS
├── .env                 // Variables de entorno
├── app.js               // Configuración de la app
├── initDB.js            // Script de inicialización de la BD
├── server.js            // Entrada de la app
```

---

## Notas adicionales

- Cada usuario solo puede ver o borrar sus propios productos.
- Las fotos se leen desde la carpeta `/public/images`, el usuario debe introducir solo el nombre del archivo (`iphone.jpg`, etc.).
- No se han añadido validaciones avanzadas ni subida de archivos (por simplicidad).
- No se han incluido tests unitarios.