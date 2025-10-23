import React, { useContext, useRef } from 'react';
import { QRCodeCanvas } from 'qrcode.react';
import { Offering } from '../types';
import { ThemeContext } from '../context/ThemeContext';

interface QRCodeModalProps {
    isOpen: boolean;
    onClose: () => void;
    offering: Offering;
}

const QRCodeModal: React.FC<QRCodeModalProps> = ({ isOpen, onClose, offering }) => {
    const themeContext = useContext(ThemeContext);
    const theme = themeContext?.theme || 'light';
    const qrCodeRef = useRef<HTMLCanvasElement>(null);

    if (!isOpen) return null;

    const qrCodeValue = `${window.location.origin}/#/view-services/${offering.organizationId}`;
    const qrCodeBgColor = theme === 'dark' ? '#1f2937' : '#ffffff';
    const qrCodeFgColor = theme === 'dark' ? '#f3f4f6' : '#111827';

    const handlePrint = () => {
        const canvas = qrCodeRef.current;
        if (!canvas) return;

        const printWindow = window.open('', '_blank');
        if (!printWindow) return;

        printWindow.document.write(`
            <html>
                <head>
                    <title>QR Code - ${offering.name}</title>
                    <style>
                        body { text-align: center; font-family: Arial, sans-serif; margin: 20px; }
                        h1 { color: #333; }
                        .qr-container { margin: 20px; display: inline-block; }
                        .info { margin-top: 20px; font-size: 14px; color: #666; }
                    </style>
                </head>
                <body>
                    <h1>${offering.name}</h1>
                    <div class="qr-container">
                        <img src="${canvas.toDataURL()}" alt="QR Code" style="max-width: 300px;" />
                    </div>
                    <div class="info">
                        <p>Scan this QR code to view all services and join the queue</p>
                        <p>Organization: ${offering.name}</p>
                        <p>Service: ${offering.description}</p>
                        <p>Duration: ${offering.duration} minutes</p>
                    </div>
                </body>
            </html>
        `);
        printWindow.document.close();
        printWindow.print();
    };

    return (
         <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center p-4" onClick={onClose}>
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-xl text-center" onClick={e => e.stopPropagation()}>
                <h2 className="text-xl font-bold mb-2">QR Code for {offering.name}</h2>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">Customers can scan this to view all services and join the queue.</p>
                <div className="p-4 bg-white inline-block rounded-md">
                    <QRCodeCanvas
                        ref={qrCodeRef}
                        value={qrCodeValue}
                        size={200}
                        bgColor={qrCodeBgColor}
                        fgColor={qrCodeFgColor}
                        level={"H"}
                        includeMargin={true}
                    />
                </div>
                <div className="mt-6 flex gap-3 justify-center">
                    <button onClick={handlePrint} className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700">
                        Print QR Code
                    </button>
                    <button onClick={onClose} className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700">
                        Close
                    </button>
                </div>
            </div>
        </div>
    );
};
export default QRCodeModal;
