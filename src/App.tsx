import React from "react";
import PDFForm from "./components/PDFForm";
import PDFDownload from "./components/PDFDownloads";
import "./App.css";

function App() {
  return (
    <div>
      <h1 className="text-center">Chelita Software - Generador de PDFs</h1>
      <div className="bg-light min-vh-50 d-flex flex-row align-items-center">
        <PDFForm />
        <PDFDownload />
      </div>
    </div>
  );
}

export default App;
