import React, { useEffect, useRef, useState } from 'react';
import { Html5QrcodeScanner } from 'html5-qrcode';

interface QRScannerProps {
    onScanSuccess: (decodedText: string) => void;
    onScanError?: (error: string) => void;
}

const QRScanner: React.FC<QRScannerProps> = ({ onScanSuccess, onScanError }) => {
    const scannerRef = useRef<Html5QrcodeScanner | null>(null);
    const [isScanning, setIsScanning] = useState(false);

    useEffect(() => {
        if (!scannerRef.current) {
            scannerRef.current = new Html5QrcodeScanner(
                'qr-reader',
                {
                    fps: 10,
                    qrbox: { width: 250, height: 250 },
                    aspectRatio: 1.0,
                },
                false
            );
        }

        const scanner = scannerRef.current;

        scanner.render(
            (decodedText) => {
                onScanSuccess(decodedText);
                setIsScanning(false);
                scanner.clear().catch(console.error);
            },
            (error) => {
                if (onScanError) {
                    onScanError(error);
                }
            }
        );

        setIsScanning(true);

        return () => {
            if (scanner) {
                scanner.clear().catch(console.error);
            }
        };
    }, [onScanSuccess, onScanError]);

    const stopScanning = () => {
        if (scannerRef.current) {
            scannerRef.current.clear().catch(console.error);
            setIsScanning(false);
        }
    };

    return (
        <div className="qr-scanner-container">
            <div id="qr-reader" className="w-full max-w-md mx-auto"></div>
            {isScanning && (
                <button
                    onClick={stopScanning}
                    className="mt-4 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
                >
                    Stop Scanning
                </button>
            )}
        </div>
    );
};

export default QRScanner;