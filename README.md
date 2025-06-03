# PDF AutoInjector Web

Proyecto web desarrollado para automatizar la generación de archivos PDF a partir de una plantilla editable y un archivo Excel con datos. Desplegado con Docker y orientado a su uso en redes internas empresariales.

## 📌 Funcionalidades

- **Login seguro con JWT**
- **Dos roles de usuario**:
  - `admin`: gestiona los archivos ZIP generados (descarga, renombrado, eliminación)
  - `operador`: genera PDFs o actualiza códigos LER mediante Excel
- **Carga de archivos Excel + plantilla PDF**
- **Generación automática de PDFs**
- **Compresión en ZIP de los PDFs generados**
- **Panel de administración visual**
- **Eliminación automática de archivos ZIP tras 15 días**
- **Selector de tema claro / oscuro**
- **Interfaz moderna y minimalista**

---

## 🧱 Estructura del proyecto

```bash
PDF-AUTOINJECTOR-WEB/
│
├── backend/                  # Servidor Express.js con lógica y rutas API
│   ├── controllers/          # Controladores de autenticación
│   ├── middleware/           # Validación JWT y roles
│   ├── routes/               # Rutas: login, LER, ZIP
│   ├── utils/                # Función para limpieza de archivos antiguos
│   ├── uploads/              # Archivos Excel y PDFs temporales
│   ├── generated/            # PDFs y ZIPs generados
│   ├── index.js              # Servidor principal
│   └── Dockerfile            # Imagen personalizada del backend
│
├── frontend/                 # Archivos HTML + JS (sin framework)
│   ├── login.html            # Login con validación y tema
│   ├── dashboard.html        # Panel para operador
│   ├── admin-dashboard.html  # Panel para administrador
│
├── database/
│   └── init.sql              # Script SQL para inicialización de usuarios
│
├── docker-compose.yml        # Orquestador de servicios: backend, frontend, DB
└── README.md                 # Este documento
````

---

## 🚀 Despliegue

### Requisitos

* Docker
* Docker Compose

### Comandos

```bash
# Clonar el repositorio
git clone https://github.com/itMarrones/pdf-autoinjector-web
cd PDF-AUTOINJECTOR-WEB

# Iniciar todos los servicios
docker-compose up --build
```

Servicios activos:

| Servicio    | URL                                            |
| ----------- | ---------------------------------------------- |
| Frontend    | [http://localhost](http://localhost)           |
| Backend API | [http://localhost:4000](http://localhost:4000) |
| phpMyAdmin  | [http://localhost:8081](http://localhost:8081) |

---

## 👥 Usuarios predeterminados

| Rol      | Usuario  |
| -------- | -------- |
| admin    | aa0000a  |
| operador | operador |

> ⚠️ Todos los datos están cifrados con bcrypt en la base de datos.

---

## 🧹 Limpieza automática

Cada día, un proceso elimina:

* ZIPs con más de 15 días
* Carpetas temporales usadas para PDFs

---

## 📄 Licencia

Uso privado para entorno empresarial.
