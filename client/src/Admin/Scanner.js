// import React, { useState } from 'react';
// import QrScanner from 'qr-scanner';
// import Navbar from "../Logins/ANavbar"

// const QRScanner = () => {
//     const [scanner, setScanner] = useState(null);
//     const [tokens, setTokens] = useState([]);
//     const [showConfirmation, setShowConfirmation] = useState(false);

//     // Initialize QR scanner
//     React.useEffect(() => {
//         const videoElem = document.getElementById('qr-video');
//         const newScanner = new QrScanner(videoElem, (result) => handleScan(result));
//         setScanner(newScanner);

//         return () => {
//             newScanner.stop();
//         };
//     }, []);

//     // Handle QR code scan
//     const handleScan = (result) => {
//         if (result) {
//             const currentDate = new Date();
//             const dateString = currentDate.toISOString(); // Convert date to ISO string format
//             const timeString = currentDate.toLocaleTimeString(); // Get time string
//             const scannedData = { _id: result.data, date: dateString, time: timeString };
//             setTokens((prevTokens) => [...prevTokens, scannedData]);
//             setShowConfirmation(true);
//             setTimeout(() => {
//                 setShowConfirmation(false);
//             }, 2000); // Reset showConfirmation after 2 seconds
//         }
//     };

//     // Send tokens to backend
//     const sendTokensToBackend = async (e) => {
//         try {
//             e.preventDefault();
//             console.log(tokens)
//             const response = await fetch('/api/tokens', {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json',
//                 },
//                 body: JSON.stringify({ tokens }),
//             });
//             const data = await response.json();
//             console.log('Backend response:', data);
//         } catch (error) {
//             console.error('Error sending tokens to backend:', error);
//         }
//     };

//     return (
//         <>
//             <Navbar />
//             <div>
//                 <video id="qr-video" />
//                 <button onClick={sendTokensToBackend} disabled={tokens.length === 0}>
//                     Send Tokens to Backend
//                 </button>
//                 <ul>
//                     {tokens.map((token, index) => (
//                         <li key={index}>
//                             <p>Token: {token._id}</p>
//                             <p>Date: {token.date}</p>
//                             <p>Time: {token.time}</p>
//                         </li>
//                     ))}
//                 </ul>
//                 {showConfirmation && <p>QR code scanned successfully!</p>}
//             </div>
//         </>
//     );
// };

// export default QRScanner;
import React, { useState, useEffect } from 'react';
import QrScanner from 'qr-scanner';
import Navbar from "../Logins/ANavbar";

const QRScanner = () => {
    const [scanner, setScanner] = useState(null);
    const [tokens, setTokens] = useState([]);
    const [showConfirmation, setShowConfirmation] = useState(false);

    useEffect(() => {
        const initializeScanner = async () => {
            const videoElem = document.getElementById('qr-video');
            try {
                const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } });
                videoElem.srcObject = stream;
                const newScanner = new QrScanner(videoElem, handleScan);
                setScanner(newScanner);
                newScanner.start();
            } catch (error) {
                console.error('Error accessing camera:', error);
            }
        };

        initializeScanner();

        return () => {
            if (scanner) {
                scanner.destroy(); // Use 'destroy()' instead of 'stop()' to properly clean up the scanner
            }
        };
    }, [scanner]);

    const handleScan = (result) => {
        if (result) {
            const currentDate = new Date();
            const dateString = currentDate.toISOString();
            const timeString = currentDate.toLocaleTimeString();
            const scannedData = { _id: result.data, date: dateString, time: timeString };
            setTokens((prevTokens) => [...prevTokens, scannedData]);
            setShowConfirmation(true);
            setTimeout(() => {
                setShowConfirmation(false);
            }, 2000);
        }
    };

    const sendTokensToBackend = async (e) => {
        try {
            e.preventDefault();
            console.log(tokens);
            const response = await fetch('/api/tokens', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ tokens }),
            });
            const data = await response.json();
            console.log('Backend response:', data);
        } catch (error) {
            console.error('Error sending tokens to backend:', error);
        }
    };

    return (
        <>
            <Navbar />
            <div>
                <video id="qr-video" autoPlay playsInline style={{ width: '100%', maxWidth: '600px' }} />
                <button onClick={sendTokensToBackend} disabled={tokens.length === 0}>
                    Send Tokens to Backend
                </button>
                <ul>
                    {tokens.map((token, index) => (
                        <li key={index}>
                            <p>Token: {token._id}</p>
                            <p>Date: {token.date}</p>
                            <p>Time: {token.time}</p>
                        </li>
                    ))}
                </ul>
                {showConfirmation && <p>QR code scanned successfully!</p>}
            </div>
        </>
    );
};

export default QRScanner;
