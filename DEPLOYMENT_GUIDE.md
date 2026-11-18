# 🚀 Guía de Despliegue en Hosting Gratuito - PILATES KINÉSICO

Este proyecto está construido con arquitectura **Zero Dependencies** en Node.js estándar. Es liviano, ultra rápido de iniciar y 100% compatible con cualquier servicio de hosting en la nube gratuito.

---

## 🌟 Opción 1: Render.com (Recomendado - 100% Gratis con Backend Completo)

Render ofrece un plan gratuito que incluye SSL (HTTPS), dominio público y ejecución nativa de Node.js sin necesidad de tarjeta de crédito.

### Pasos para desplegar en Render en 3 minutos:

1. **Subir tu proyecto a GitHub**:
   - Crea un repositorio en tu cuenta de GitHub (ejemplo: `pk-pilates-studio`).
   - Sube la carpeta del proyecto a ese repositorio:
     ```bash
     git init
     git add .
     git commit -m "PILATES KINÉSICO v7 con Padrón de Alumnos y Grilla SigueFit"
     git branch -M main
     git remote add origin https://github.com/TU_USUARIO/pk-pilates-studio.git
     git push -u origin main
     ```

2. **Crear tu Web Service en Render**:
   - Ingresa a [https://render.com](https://render.com) y crea tu cuenta gratuita (puedes iniciar sesión con tu cuenta de GitHub).
   - Haz clic en el botón azul **"New +"** y selecciona **"Web Service"**.
   - Conecta tu repositorio de GitHub `pk-pilates-studio`.

3. **Configurar el servicio**:
   - **Name**: `pk-pilates-studio` (o el nombre que elijas)
   - **Language**: `Node`
   - **Branch**: `main`
   - **Region**: Selecciona la más cercana (ej: `Oregon (US West)` o `Frankfurt`)
   - **Build Command**: Dejar vacío o poner `npm test`
   - **Start Command**: `npm start`
   - **Instance Type**: Seleccionar **Free** ($0 / month)

4. **Hacer clic en "Deploy Web Service"**:
   - ¡Listo! En menos de 60 segundos Render compilará tu aplicación y te otorgará tu enlace seguro oficial con candado verde:
     `https://pk-pilates-studio.onrender.com`

---

## ⚡ Opción 2: Railway.app (Alternativa Rápida)

1. Ingresa a [https://railway.app](https://railway.app).
2. Conecta tu GitHub y selecciona el repositorio `pk-pilates-studio`.
3. Railway detectará automáticamente el archivo `package.json` y ejecutará `npm start`.
4. En **Settings** -> **Domains**, haz clic en **"Generate Domain"** para obtener tu enlace público gratuito (ej: `https://pk-pilates-studio.up.railway.app`).

---

## 📱 Opción 3: Despliegue Estático en Vercel o Netlify (Modo PWA Local)

Si deseas alojarlo como una aplicación puramente cliente (PWA estática) donde los datos se guardan en el navegador de cada usuario:
1. Conecta tu repositorio en [Vercel](https://vercel.com) o [Netlify](https://netlify.com).
2. Framework Preset: **Other**.
3. Output Directory: `.` (la raíz).
4. La aplicación funcionará en Modo Local PWA con sincronización automática en `localStorage`.

---

## 🔒 Variables y Clave de Seguridad en Producción

- **PIN por Defecto del Panel ABM**: `2026`.
- Puedes cambiar el PIN en cualquier momento desde el panel de control o configurando la variable de entorno `ADMIN_PIN`.
