import React, { useState } from 'react';
import { PDFData, createPDF } from '../service/pdfService';

const PDFForm: React.FC = () => {
    const [formData, setFormData] = useState<PDFData>({
        nombre: '',
        apellido: '',
        edad: '',
        telefono: '',
        correo: '',
    });

    const [errors, setErrors] = useState({
        nombre: '',
        apellido: '',
        edad: '',
        telefono: '',
        correo: '',
    });

    const [documentCode, setDocumentCode] = useState<string | null>(null);

    const validate = (): boolean => {
        const newErrors = {
            nombre: '',
            apellido: '',
            edad: '',
            telefono: '',
            correo: '',
        };
        let isValid = true;

        if (!formData.nombre.trim()) {
            newErrors.nombre = 'El nombre es obligatorio.';
            isValid = false;
        }
        if (!formData.apellido.trim()) {
            newErrors.apellido = 'El apellido es obligatorio.';
            isValid = false;
        }
        if (!formData.edad.trim() || isNaN(Number(formData.edad))) {
            newErrors.edad = 'La edad debe ser un número válido.';
            isValid = false;
        }
        if (!formData.telefono.trim() || formData.telefono.length < 10) {
            newErrors.telefono = 'El teléfono debe tener al menos 10 dígitos.';
            isValid = false;
        }
        if (!formData.correo.trim() || !/^[^\s@]+@[^\s@]+\.[a-zA-Z]{2,}$/.test(formData.correo)) {
            newErrors.correo = 'Debe ser un correo electrónico válido.';
            isValid = false;
        }

        setErrors(newErrors);
        return isValid;
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!validate()) {
            return;
        }

        try {
            const response = await createPDF(formData);
            setDocumentCode(response.document_code);
        } catch (error) {
            console.error('Error creando el PDF:', error);
        }
    };

    return (
        <div className="container mt-5">
            <div className="card shadow">
                <div className="card-header text-center bg-primary text-white">
                    <h3>Generar PDF</h3>
                </div>
                <div className="card-body">
                    <form onSubmit={handleSubmit}>
                        {Object.keys(formData).map((key) => (
                            <div className="mb-3" key={key}>
                                <label htmlFor={key} className="form-label">
                                    {key.charAt(0).toUpperCase() + key.slice(1)}
                                </label>
                                <input
                                    id={key}
                                    type={key === 'edad' || key === 'telefono' ? 'number' : 'text'}
                                    className={`form-control ${errors[key as keyof typeof errors] ? 'is-invalid' : ''}`}
                                    value={(formData as any)[key]}
                                    onChange={(e) =>
                                        setFormData({ ...formData, [key]: e.target.value })
                                    }
                                />
                                {errors[key as keyof typeof errors] && (
                                    <div className="invalid-feedback">
                                        {errors[key as keyof typeof errors]}
                                    </div>
                                )}
                            </div>
                        ))}
                        <button type="submit" className="btn btn-primary w-100">
                            Generar PDF
                        </button>
                    </form>
                </div>
                {documentCode && (
                    <div className="card-footer text-center bg-success text-white mt-3">
                        <h5>Código del Documento: {documentCode}</h5>
                    </div>
                )}
            </div>
        </div>
    );
};

export default PDFForm;
