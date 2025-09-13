import React, { useEffect, useRef } from 'react';
import { pdfjs } from 'pdfjs-dist';

// Configure the worker path for PDF.js
pdfjs.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

const PDFViewer = ({ fileUrl }) => {
    const canvasRef = useRef(null);

    useEffect(() => {
        const loadPDF = async () => {
            const loadingTask = pdfjs.getDocument(fileUrl);
            const pdf = await loadingTask.promise;
            const page = await pdf.getPage(1); // Get the first page

            const viewport = page.getViewport({ scale: 1 });
            const canvas = canvasRef.current;
            const context = canvas.getContext('2d');
            canvas.height = viewport.height;
            canvas.width = viewport.width;

            const renderContext = {
                canvasContext: context,
                viewport: viewport,
            };
            await page.render(renderContext).promise;
        };

        loadPDF();
    }, [fileUrl]);

    return <canvas ref={canvasRef} />;
};


<PDFViewer fileUrl={doc.fileUrl} />
