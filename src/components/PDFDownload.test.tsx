import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import PDFDownload from "./PDFDownloads";
import * as pdfService from "../service/pdfService";
import App from "../App";

// Mockear la función del servicio
jest.mock("../service/pdfService", () => ({
  getPDF: jest.fn(),
}));

describe("PDFDownload Component", () => {
  test("shows success notification when document is found", async () => {
    (pdfService.getPDF as jest.Mock).mockResolvedValueOnce({
      success: true,
      document_b64: "mock-pdf-data",
    });
    
    const { container } = render(<PDFDownload />);
    console.log(container.innerHTML); // Opcional: depurar DOM generado

    const input = container.querySelector(
      'input[placeholder="Ingresa el código del documento"]'
    );
    expect(input).toBeInTheDocument(); // Asegúrate de que el input existe
    fireEvent.change(input!, { target: { value: "VALID_CODE" } });

    const button = screen.getByText(/Obtener PDF/i);
    fireEvent.click(button);

    await waitFor(() => {
      expect(
        screen.getByText(/Documento obtenido correctamente/i)
      ).toBeInTheDocument();
    });
  });

  


});
