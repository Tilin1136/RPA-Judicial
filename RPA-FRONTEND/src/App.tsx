import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import UploadPage from "./pages/UploadPage.tsx"; // crea esta página
import NotFound from "./pages/NotFound.tsx"; // opcional

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Redirige automáticamente de "/" a "/upload" */}
        <Route path="/" element={<Navigate to="/upload" replace />} />

        {/* Página principal */}
        <Route path="/upload" element={<UploadPage />} />
        <Route path="*" element={<UploadPage />} />
        {/* Página 404 (opcional) */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}
