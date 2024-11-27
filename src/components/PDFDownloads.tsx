import React, { useState } from 'react';
import { getPDF } from '../service/pdfService';
import { ToastContainer, toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

const PDFDownload: React.FC = () => {
    const [code, setCode] = useState<string>('');
    const [pdfData, setPdfData] = useState<string | null>(null);

    const handleFetchPDF = async () => {
        try {
            const response = await getPDF(code);

            if (response.success) {
                setPdfData(response.document_b64);
                toast.success('Documento obtenido correctamente.');
            } else {
                setPdfData("");
                toast.error('Documento no encontrado. Verifica el código.');
            }
        } catch (error) {
            console.error('Error obteniendo el PDF:', error);

            setPdfData("");
            toast.error('Ocurrió un error al obtener el PDF.');
        }
    };

    const handleDownload = () => {
        if (!pdfData) return;

        const link = document.createElement('a');
        link.href = `data:application/pdf;base64,${pdfData}`;
        link.download = `${code}.pdf`;
        link.click();
    };

    return (
        <div className="container mt-5">
            <ToastContainer />
            <div className="card shadow">
                <div className="card-header text-center bg-secondary text-white">
                    <h3>Descargar PDF</h3>
                </div>
                <div className="card-body">
                    <div className="mb-3">
                        <label htmlFor="code" className="form-label">
                            Código del Documento
                        </label>
                        <input
                            type="text"
                            id="code"
                            className="form-control"
                            placeholder="Ingresa el código del documento"
                            value={code}
                            onChange={(e) => setCode(e.target.value)}
                        />
                    </div>
                    <button
                        onClick={handleFetchPDF}
                        className="btn btn-secondary w-100 mb-3"
                    >
                        Obtener PDF
                    </button>
                    {pdfData && (
                        <button
                            onClick={handleDownload}
                            className="btn btn-success w-100"
                        >
                            Descargar PDF
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default PDFDownload;
