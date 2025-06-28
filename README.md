⚖️ Sistema de Automatización y Análisis Documental Legal con IA
Este proyecto es un sistema integral diseñado para automatizar el procesamiento y análisis de documentos legales utilizando inteligencia artificial avanzada. Combina un robusto backend en FastAPI con capacidades de OCR, PLN y generación de texto con Gemini, y un frontend interactivo construido con React.

✨ Características Principales
Extracción de Texto Avanzada: Procesa documentos PDF (nativos y escaneados) utilizando OCR (Tesseract + PyMuPDF) para convertir contenido visual en texto editable.

Procesamiento de Lenguaje Natural (PLN):

Clasificación Documental: Identifica automáticamente el tipo de documento legal (ej., Demanda, Sentencia, Contrato) utilizando clasificación "Zero-Shot".

Extracción de Información Clave (NER): Identifica y extrae automáticamente entidades importantes como fechas, nombres de personas, organizaciones y ubicaciones.

Generación de Informes Legales con IA (Gemini):

Utiliza el modelo gemini-pro de Google AI para analizar el texto extraído y generar un informe legal estructurado y conciso, siguiendo un esqueleto predefinido.

Permite la inclusión de datos del abogado (nombre, número de colegiatura) directamente en la solicitud API para personalizar el informe.

Generación de Reportes PDF Dinámicos: Crea un archivo PDF final que consolida toda la información procesada:

Detalles del archivo original.

Resultados de la clasificación y extracción de entidades.

El informe legal estructurado generado por la IA.

El texto completo extraído del documento original.

Frontend Intuitivo con React: Ofrece una interfaz de usuario para interactuar fácilmente con el backend, subir documentos y visualizar los resultados.

🚀 Cómo Empezar
Este proyecto se divide en dos partes principales: el Backend (FastAPI) y el Frontend (React).

💻 1. Configuración del Backend (FastAPI)
1.1. Prerrequisitos
Asegúrate de tener instalado lo siguiente:

Python 3.9+: Descargar Python

pip: Gestor de paquetes de Python (viene con Python).

Tesseract OCR: Motor OCR utilizado para extraer texto de imágenes. Instalación de Tesseract OCR

Para Windows: Es crucial añadir el directorio bin de Tesseract a tu variable de entorno PATH.

Poppler: Librería de utilidades para PDF, necesaria para pdf2image. Descargar Poppler para Windows y añadir la carpeta bin a tu PATH.

Modelo de spaCy en Español:

python -m spacy download es_core_news_lg

1.2. Configuración del Entorno
Clona el Repositorio:

git clone <URL_DEL_REPOSITORIO>
cd RPA-Judicial # O el nombre de tu carpeta de proyecto

Crea un Entorno Virtual:

python -m venv venv

Activa el Entorno Virtual:

Windows:

venv\Scripts\activate

macOS/Linux:

source venv/bin/activate

Crea un archivo .env:
En la raíz de tu proyecto (junto a main.py), crea un archivo llamado .env y añade tus variables de entorno:

GEMINI_API_KEY="TU_CLAVE_API_DE_GEMINI"

GEMINI_API_KEY: Obtén tu clave de API desde Google AI Studio.

1.3. Instalación de Dependencias Python
Con el entorno virtual activado, instala las dependencias:

pip install -r requirements.txt
# O manualmente:
# pip install fastapi uvicorn python-multipart pydantic reportlab Pillow pytesseract pdf2image spacy transformers

1.4. Ejecutar el Backend
Una vez que todas las dependencias estén instaladas, puedes iniciar el servidor FastAPI:

uvicorn main:app --reload

El backend estará disponible en http://127.0.0.1:8000.

Puedes acceder a la documentación interactiva de la API (Swagger UI) en http://127.0.0.1:8000/docs. Aquí podrás probar directamente los endpoints.

🌐 2. Configuración del Frontend (React)
2.1. Prerrequisitos
Node.js: Descargar Node.js (incluye npm).

npm (Node Package Manager) o yarn.

2.2. Instalación de Dependencias
Navega a la carpeta de tu frontend:

cd RPA-FRONTEND

Instala las dependencias de Node.js:

npm install
# O si usas yarn:
# yarn install

2.3. Ejecutar el Frontend
Inicia la aplicación React:

npm run dev
# O si usas yarn:
# yarn dev

El frontend se abrirá en tu navegador (normalmente http://localhost:5173 o similar). Asegúrate de que esté configurado para apuntar al backend de FastAPI (http://127.0.0.1:8000).

📊 Endpoints de la API (Backend)
GET /: Mensaje de bienvenida.

POST /api/v1/process-document: Procesa un PDF para extraer texto, clasificar y obtener información clave, y generar un resumen IA. Devuelve un JSON.

POST /api/v1/generate-report-pdf: Recibe un PDF y datos del abogado, usa el endpoint /process-document internamente, genera un informe legal estructurado en PDF y lo devuelve para descarga.

🛠️ Estructura del Proyecto
RPA-Judicial/
├── main.py                     # Aplicación FastAPI principal, endpoints
├── requirements.txt            # Dependencias de Python
├── .env                        # Variables de entorno (API Keys)
├── core/
│   ├── ai/
│   │   └── gemini.py           # Interacción con la API de Google Gemini
│   ├── document_processor/
│   │   ├── extractor.py        # Extracción de texto de PDF (PyMuPDF + Tesseract/OCR)
│   │   └── nlp.py              # Procesamiento de Lenguaje Natural (spaCy, Hugging Face)
│   └── report_generator.py     # Generación del informe PDF estructurado (ReportLab)
├── prompts/
│   └── system_prompt.md        # Prompt para guiar la IA de Gemini
└── RPA-FRONTEND/               # Carpeta del proyecto React
    ├── ...                     # Archivos y carpetas del frontend

💡 Próximos Pasos / Mejoras Potenciales
Autenticación y Autorización: Implementar un sistema de usuarios (ej., JWT) para asegurar los endpoints de la API.

Manejo de Errores Avanzado: Logging más detallado y respuestas de error más específicas.

Asincronía y Tareas en Segundo Plano: Para el procesamiento de documentos muy grandes, considerar usar Celery o similar para tareas asíncronas y evitar que las peticiones HTTP se bloqueen.

Despliegue (Deployment): Configurar el despliegue de la aplicación a un entorno de producción (ej., Google Cloud, AWS, Heroku).

Más Tipos de Documentos y Entidades: Ampliar las categorías de clasificación y las entidades a extraer.

Mejora del Frontend: Más características UI/UX, visualización interactiva de datos.

Configuración de Tesseract/Poppler: Para un despliegue más fácil, buscar soluciones que no requieran la instalación manual de Tesseract/Poppler en el servidor (ej., usar contenedores Docker o servicios en la nube específicos para OCR).

¡Disfruta de tu sistema de automatización legal!