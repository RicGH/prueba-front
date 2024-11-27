import axios from 'axios';

// Define la URL base del backend
const API_URL = 'http://127.0.0.1:8000';

// Define los tipos para las respuestas y las solicitudes
export interface PDFData {
    nombre: string;
    apellido: string;
    edad: string;
    telefono: string;
    correo: string;
}

export interface CreatePDFResponse {
    success: boolean;
    document_code: string;
}

export interface GetPDFResponse {
    success: boolean;
    document_b64: string;
}

// Servicio para crear un PDF
export const createPDF = async (data: PDFData): Promise<CreatePDFResponse> => {
    const response = await axios.post<CreatePDFResponse>(`${API_URL}/create`, data);
    return response.data;
};

// Servicio para obtener un PDF
export const getPDF = async (code: string): Promise<GetPDFResponse> => {
    const response = await axios.get<GetPDFResponse>(`${API_URL}/document/${code}`);
    return response.data;
};
