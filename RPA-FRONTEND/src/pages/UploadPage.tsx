import React, { useState } from "react";
import { Dialog } from "@headlessui/react";

export default function UploadPage() {
  const [file, setFile] = useState<File | null>(null);
  const [lawyerName, setLawyerName] = useState("");
  const [lawyerId, setLawyerId] = useState("");
  const [lawyerDni, setLawyerDni] = useState("");
  const [clientName, setClientName] = useState("");

  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [summary, setSummary] = useState<string | null>(null);

  const validateFields = () => {
    if (!file || !lawyerName || !lawyerId || !lawyerDni || !clientName) {
      showModal("Todos los campos y el archivo son obligatorios.");
      return false;
    }
    if (!/^\d+$/.test(lawyerId)) {
      showModal("La colegiatura debe ser numérica.");
      return false;
    }
    if (!/^\d{8}$/.test(lawyerDni)) {
      showModal("El DNI debe tener exactamente 8 dígitos.");
      return false;
    }
    return true;
  };

  const showModal = (msg: string, isLoading: boolean = false) => {
    setModalMessage(msg);
    setLoading(isLoading); // Establece el estado de carga al mostrar el modal
    setModalOpen(true);
  };

  const closeModal = () => setModalOpen(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFile(e.target.files?.[0] || null);
  };

  const handleGeneratePDF = async () => {
    if (!validateFields()) return;

    const formData = new FormData();
    formData.append("file", file!);

    const queryParams = new URLSearchParams({
      lawyer_name: lawyerName,
      lawyer_id: lawyerId,
      lawyer_dni: lawyerDni,
      client_name: clientName,
    });

    setLoading(true);
    setProgress(0); // Reiniciar el progreso al inicio
    showModal("Generando reporte, por favor espera...", true); // Indicar que hay carga al abrir el modal

    let intervalId: number | null = null; // Para almacenar el ID del intervalo

    try {
      // Simular el avance de la barra de carga hasta un 90%
      const totalSimulatedSteps = 20; // Número de pasos simulados
      const delayBetweenSteps = 150; // Retraso en milisegundos entre cada paso
      let currentSimulatedProgress = 0;

      intervalId = setInterval(() => {
        currentSimulatedProgress += (90 / totalSimulatedSteps); // Aumentar el progreso
        setProgress(Math.min(Math.round(currentSimulatedProgress), 90)); // Redondear y no exceder 90%
        if (currentSimulatedProgress >= 90) {
          if (intervalId) clearInterval(intervalId); // Limpiar el intervalo si alcanza el 90%
        }
      }, delayBetweenSteps);

      const res = await fetch(
        `http://localhost:8000/api/v1/generate-report-pdf?${queryParams}`,
        {
          method: "POST",
          body: formData,
        }
      );

      if (intervalId) clearInterval(intervalId); // Asegurarse de limpiar el intervalo si la respuesta es rápida

      if (!res.ok) {
        const errText = await res.text();
        throw new Error(errText);
      }

      const blob = await res.blob();
      const originalName = file!.name.replace(/\.pdf$/i, "");
      const filename = `reporte_${originalName}.pdf`;

      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = filename;
      a.click();
      window.URL.revokeObjectURL(url);

      setSummary("✅ Reporte generado y descargado exitosamente.");
      showModal("Reporte generado y descargado exitosamente."); // Actualizar mensaje del modal al éxito
      setProgress(100); // Establecer 100% al finalizar
      setFile(null);
      setLawyerName("");
      setLawyerId("");
      setLawyerDni("");
      setClientName("");
    } catch (err: any) {
      if (intervalId) clearInterval(intervalId); // Limpiar el intervalo en caso de error
      showModal(`❌ Error al generar PDF: ${err.message}`);
      setProgress(0); // Reiniciar el progreso en caso de error
      console.error(err);
    } finally {
      // setLoading(false) se maneja ahora cuando el modal se cierra o se muestra el mensaje final
      // La carga se desactiva cuando se muestra el mensaje final o el error en showModal
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-3xl bg-white shadow-xl rounded-lg p-8 space-y-8">
        <h1 className="text-3xl font-bold text-blue-700 text-center">
          Procesador de Documentos Judiciales
        </h1>

        {/* Formulario */}
        <div className="grid gap-4">
          <div>
            <label
              htmlFor="file-upload"
              className="block text-center cursor-pointer bg-blue-100 text-blue-800 font-medium py-2 px-4 rounded hover:bg-blue-200 border border-dashed border-blue-400"
            >
              {file ? `📄 ${file.name}` : "Haz clic aquí para seleccionar un archivo PDF"}
            </label>
            <input
              id="file-upload"
              type="file"
              accept=".pdf"
              onChange={handleFileChange}
              className="hidden"
            />
          </div>

          <input
            placeholder="Nombre del abogado"
            value={lawyerName}
            onChange={(e) => setLawyerName(e.target.value)}
            className="border border-gray-300 p-2 rounded"
          />
          <input
            placeholder="Número de colegiatura"
            value={lawyerId}
            onChange={(e) => setLawyerId(e.target.value)}
            className="border border-gray-300 p-2 rounded"
          />
          <input
            placeholder="DNI del abogado"
            value={lawyerDni}
            onChange={(e) => setLawyerDni(e.target.value)}
            className="border border-gray-300 p-2 rounded"
          />
          <input
            placeholder="Nombre del cliente"
            value={clientName}
            onChange={(e) => setClientName(e.target.value)}
            className="border border-gray-300 p-2 rounded"
          />

          <button
            onClick={handleGeneratePDF}
            disabled={loading}
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 disabled:opacity-50"
          >
            {loading ? "Procesando..." : "Generar y Descargar Reporte PDF"}
          </button>
        </div>

        {/* Resultado */}
        {summary && (
          <div className="mt-4 p-4 bg-green-100 text-green-800 rounded border border-green-300 text-sm">
            {summary}
          </div>
        )}
      </div>

      {/* Modal */}
      <Dialog open={modalOpen} onClose={closeModal} className="fixed z-50 inset-0 overflow-y-auto">
        {/* Cambiado bg-black bg-opacity-30 a bg-gray-500 bg-opacity-40 para un gris translúcido */}
        <div className="flex items-center justify-center min-h-screen px-4 bg-gray-500 bg-opacity-40">
          <Dialog.Panel className="bg-white w-full max-w-lg p-8 rounded-xl shadow-2xl text-center space-y-4">
            <Dialog.Title className="text-2xl font-bold text-gray-800">
              {loading ? "Procesando Solicitud" : "Notificación"}
            </Dialog.Title>
            <Dialog.Description className="text-gray-600 text-base">
              {modalMessage}
            </Dialog.Description>

            {loading && (
              <div className="w-full bg-gray-200 rounded-full h-2.5 mt-4">
                <div
                  className="bg-blue-600 h-2.5 rounded-full transition-all duration-100 ease-linear" // Añadido transition
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
            )}

            {!loading && (
              <button
                onClick={closeModal}
                className="mt-4 px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 text-sm"
              >
                Cerrar
              </button>
            )}
          </Dialog.Panel>
        </div>
      </Dialog>
    </div>
  );
}