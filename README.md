# ⚖️ Sistema de Automatización y Análisis Documental Legal con IA

Este proyecto es un sistema integral diseñado para automatizar el procesamiento y análisis de documentos legales utilizando inteligencia artificial avanzada. Combina un robusto backend en FastAPI con capacidades de OCR, PLN y generación de texto con Gemini, y un frontend interactivo construido con React.

---

## ✨ Características Principales

### 🔍 Extracción de Texto Avanzada
Procesa documentos PDF (nativos y escaneados) utilizando OCR (Tesseract + PyMuPDF) para convertir contenido visual en texto editable.

### 🧠 Procesamiento de Lenguaje Natural (PLN)

- **Clasificación Documental**: Identifica automáticamente el tipo de documento legal (ej., Demanda, Sentencia, Contrato) utilizando clasificación *Zero-Shot*.
- **Extracción de Información Clave (NER)**: Identifica y extrae automáticamente entidades importantes como fechas, nombres de personas, organizaciones y ubicaciones.

### 📝 Generación de Informes Legales con IA (Gemini)

- Utiliza el modelo `gemini-pro` de Google AI para analizar el texto extraído y generar un informe legal estructurado y conciso, siguiendo un esqueleto predefinido.
- Permite la inclusión de datos del abogado (nombre, número de colegiatura) directamente en la solicitud API para personalizar el informe.

### 📄 Generación de Reportes PDF Dinámicos

Crea un archivo PDF final que consolida toda la información procesada:

- Detalles del archivo original.
- Resultados de la clasificación y extracción de entidades.
- El informe legal estructurado generado por la IA.
- El texto completo extraído del documento original.

### 💻 Frontend Intuitivo con React

Ofrece una interfaz de usuario para interactuar fácilmente con el backend, subir documentos y visualizar los resultados.

---

## 🚀 Cómo Empezar

Este proyecto se divide en dos partes principales: el **Backend (FastAPI)** y el **Frontend (React)**.

---

## 💻 1. Configuración del Backend (FastAPI)

### 1.1. Prerrequisitos

Asegúrate de tener instalado lo siguiente:

- Python 3.9+: [Descargar Python](https://www.python.org/downloads/)
- `pip`: Gestor de paquetes de Python (viene con Python).
- **Tesseract OCR**: Motor OCR utilizado para extraer texto de imágenes.  
  👉 [Instalación de Tesseract OCR](https://github.com/tesseract-ocr/tesseract)
  - En Windows: añade el directorio `bin` de Tesseract a la variable de entorno `PATH`.

- **Poppler**: Librería de utilidades para PDF, necesaria para `pdf2image`.  
  👉 [Descargar Poppler para Windows](http://blog.alivate.com.au/poppler-windows/)

### 1.2. Configuración del Entorno

Clona el repositorio:


git clone <URL_DEL_REPOSITORIO>
cd RPA-Judicial  # O el nombre de tu carpeta de proyecto

python -m venv venv

# En Windows:
venv\Scripts\activate

# En macOS/Linux:
source venv/bin/activate

Crea un archivo .env en la raíz del proyecto (junto a main.py):
GEMINI_API_KEY="TU_CLAVE_API_DE_GEMINI"

## 1.3. Instalación de Dependencias Python
pip install -r requirements.txt
# O manualmente:
# pip install fastapi uvicorn python-multipart pydantic reportlab Pillow pytesseract pdf2image spacy transformers

## 1.4. Ejecutar el Backend:
uvicorn main:app --reload

Accede a la API: http://127.0.0.1:8000
Swagger UI: http://127.0.0.1:8000/docs

## 🌐 2. Configuración del Frontend (React)
# 2.1. Prerrequisitos
Node.js (incluye npm)

npm o yarn

## 2.2. Instalación de Dependencias
cd RPA-FRONTEND
npm install
# o
# yarn install

## 2.3. Ejecutar el Frontend
npm run dev
# o
# yarn dev

Abre: http://localhost:5173
Asegúrate de que apunte al backend: http://127.0.0.1:8000
```bash




