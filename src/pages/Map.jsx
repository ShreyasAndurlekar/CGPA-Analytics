import React, { useState, useEffect } from 'react';
import Navbar from './Navbar';
import '../styles/map.css';

const Map = () => {
    const [scale, setScale] = useState(1);
    const [isZoomed, setIsZoomed] = useState(false);
    const [imageModalVisible, setImageModalVisible] = useState(false);
    const [pdfModalVisible, setPdfModalVisible] = useState(false);
    const [modalImageSrc, setModalImageSrc] = useState('');
    const [modalPdfSrc, setModalPdfSrc] = useState('');
    const [modalTitle, setModalTitle] = useState('');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const container = document.querySelector('.image-container');
        const image = document.getElementById('zoomable-image');

        const handleWheel = (e) => {
            e.preventDefault();
            const delta = e.deltaY * -0.01;
            const newScale = Math.min(Math.max(1, scale + delta), 5);
            setScale(newScale);
            updateImageTransform(e, newScale);
        };

        const handleMouseMove = (e) => {
            if (scale > 1) {
                updateImageTransform(e, scale);
            }
        };

        const updateImageTransform = (e, currentScale) => {
            const rect = container.getBoundingClientRect();
            const x = (e.clientX - rect.left) / rect.width;
            const y = (e.clientY - rect.top) / rect.height;

            image.style.transformOrigin = `${x * 100}% ${y * 100}%`;
            image.style.transform = `scale(${currentScale})`;

            setIsZoomed(currentScale > 1);
            container.style.cursor = currentScale > 1 ? 'move' : 'default';

            const buttons = document.querySelectorAll('.round-button');
            buttons.forEach(button => {
                button.style.display = currentScale > 1 ? 'none' : 'block';
            });
        };

        container.addEventListener('wheel', handleWheel);
        container.addEventListener('mousemove', handleMouseMove);

        return () => {
            container.removeEventListener('wheel', handleWheel);
            container.removeEventListener('mousemove', handleMouseMove);
        };
    }, [scale]);

    const handleButtonClick = (imageSrc, pdfSrc, title) => {
        if (imageSrc) {
            setModalImageSrc(imageSrc);
            setModalTitle(title);
            setLoading(true); // Show loading spinner
            setImageModalVisible(true);

            const img = new Image();
            img.src = imageSrc;
            img.onload = () => {
                setLoading(false); // Hide loading spinner once the image is loaded
            };
        } else if (pdfSrc) {
            setModalPdfSrc(pdfSrc);
            setModalTitle(title);
            setPdfModalVisible(true);
        }
    };

    const closeImageModal = () => {
        setImageModalVisible(false);
        setModalImageSrc('');
        setLoading(false);
    };

    const closePdfModal = () => {
        setPdfModalVisible(false);
        setModalPdfSrc('');
    };

    return (
        <div>
            <Navbar />
            <div className="c">
                <div className="image-container">
                    <img id="zoomable-image" src="https://gqigzlhhq52zhk09.public.blob.vercel-storage.com/RAIT-ALikXhHeypEJhvLjZhCGZ3gwlfQ6xy.jpg" alt="Zoomable Image" />
                    {[
                         { "image": "https://gqigzlhhq52zhk09.public.blob.vercel-storage.com/photos/solar-YbrWiYB9VxXAZFvhiU92oY2tzGfP6B.jpg", "title": "Terrace", "top": "68%", "left": "14.5%" },
                         { "image": "https://gqigzlhhq52zhk09.public.blob.vercel-storage.com/photos/rainsgalore-T8vzeIJtbQYlnJZM3nH7h3cr0FjqYp.jpg", "title": "Peaceful Rains", "top": "25%", "left": "36%" },
                         { "pdf": "https://gqigzlhhq52zhk09.public.blob.vercel-storage.com/Beware-Uir2OAqjMvXsHOYYYw5HRaIRH6B8MK.pdf", "title": "Beware", "top": "22%", "left": "37%" },
                         { "image": "https://gqigzlhhq52zhk09.public.blob.vercel-storage.com/photos/2-mvm0mZ7S1MR55VkkhusYQbMtEIB6rv.jpg", "title": "Chronological Order #2", "top": "27%", "left": "37%" },
                         { "image": "https://gqigzlhhq52zhk09.public.blob.vercel-storage.com/photos/udaan-SFGsidquSuvctUtamNhP08AccSJYDe.jpg", "title": "Early Dawn of Udaan 2024", "bottom": "30%", "right": "1%" },
                         { "image": "https://gqigzlhhq52zhk09.public.blob.vercel-storage.com/photos/tiredcat-TRf31ZTmACVkyu6CxWpCBM8O5RLoL4.jpg", "title": "Too Many Writeups...", "bottom": "40%", "right": "63%" },
                         { "image": "https://gqigzlhhq52zhk09.public.blob.vercel-storage.com/photos/topview-eIdDoOrdHzKFEZ0XIAIaR3wW7QsTPR.jpg", "title": "The Summer of 2023", "bottom": "70%", "left": "10%" },
                         { "image": "https://gqigzlhhq52zhk09.public.blob.vercel-storage.com/photos/terrace-fwTfrdzb4tF7N3LkxJKiloh644IflU.jpg", "title": "Navi Mumbai Heights", "bottom": "66%", "left": "1%" },
                         { "image": "https://gqigzlhhq52zhk09.public.blob.vercel-storage.com/photos/resort-O0iQGP8U0XVhwzPUL0E9cJ5yTzVhTd.jpg", "title": "MBA Pool", "bottom": "56%", "left": "6%" },
                         { "image": "https://gqigzlhhq52zhk09.public.blob.vercel-storage.com/photos/avgday-BbyR7joY9m7hdKroer2jklnGpKvvsR.jpg", "title": "Just Casually Playing Mobile Games in Class", "bottom": "32%", "left": "53%" },
                         { "image": "https://gqigzlhhq52zhk09.public.blob.vercel-storage.com/photos/cat1-SADJNsi4J4zKKlXkX2Zuu3v4NXPqfc.jpg", "title": "A Peaceful Night in Nerul", "bottom": "78%", "right": "1%" },
                         { "image": "https://gqigzlhhq52zhk09.public.blob.vercel-storage.com/photos/lab-HGF3IpuA74sxmh9prLjQQl7ehsBR6L.jpg", "title": "While The World Drowns Away", "top": "72%", "left": "13%" },
                         { "image": "https://gqigzlhhq52zhk09.public.blob.vercel-storage.com/photos/612a-z8s5VTOYPS3XcS9ki6qrw6nliRqBQD.jpg", "title": "Time To Go Home", "top": "60%", "left": "14.5%" },
                         { "image": "https://gqigzlhhq52zhk09.public.blob.vercel-storage.com/photos/walkpath-VCdSFYr8ua9fpmn3miFqgLiAVuRoXT.jpg", "title": "Rains #1", "bottom": "96%", "left": "6%" },
                         { "image": "https://gqigzlhhq52zhk09.public.blob.vercel-storage.com/photos/walkpath2-zIFZ3gim8difiQZIl5DvugKDh5Ymkx.jpg", "title": "Rains #2", "bottom": "96%", "left": "4%" },
                         { "image": "https://gqigzlhhq52zhk09.public.blob.vercel-storage.com/photos/lightrain-STRHuuZeuYFLWt5EqllRkFU0aB6Nue.jpg", "title": "Rains #3", "bottom": "93%", "left": "1%" },
                         { "image": "https://gqigzlhhq52zhk09.public.blob.vercel-storage.com/photos/starry_knight-PQfAr63dt0OJNZlijFRvf8GIUd85HU.jpg", "title": "Dead of the Night", "bottom": "97%", "left": "2%" },
                         { "image": "https://gqigzlhhq52zhk09.public.blob.vercel-storage.com/photos/lr2-cgMNHYe9iRo1tZ61hYgKD0PjoEm9r6.jpg", "title": "Mud", "bottom": "94%", "left": "2%" },
                         { "image": "https://gqigzlhhq52zhk09.public.blob.vercel-storage.com/photos/rat-tWgBFmTkEMGOVzQZi7I4RE6ABLSFC1.jpg", "title": "Javed the Juinagar Rat", "bottom": "96%", "left": "8%" },
                         { "image": "https://gqigzlhhq52zhk09.public.blob.vercel-storage.com/photos/disturbing-IEhmXlk23HKgy0Hu4IquXbULHj5HvS.jpg", "title": "Unsettling Image", "bottom": "90%", "left": "0%" },
                         { "image": "https://gqigzlhhq52zhk09.public.blob.vercel-storage.com/photos/potato-9VLo2Vzaz70jSewVsoeDbaHJRJd1KW.jpg", "title": "Sad Little Piece of Potato", "bottom": "32%", "left": "56%" },
                         { "image": "https://gqigzlhhq52zhk09.public.blob.vercel-storage.com/photos/tired-onIehsNq5lMDcSyPLiDsVHJ8XT9A6f.jpg", "title": "Nap Time", "bottom": "40%", "left": "56%" },
                         { "image": "https://gqigzlhhq52zhk09.public.blob.vercel-storage.com/photos/horizon-qoNRdZqSGvlgVYlAuswo1vv6HC0ec7.jpg", "title": "Dusk of Horizon 2024", "bottom": "78%", "right": "20%" },
                         { "image": "https://gqigzlhhq52zhk09.public.blob.vercel-storage.com/photos/3-eGaT8vSecjtn9J5ZvyqukbjPNd9ZX2.jpg", "title": "Chronological Order #3", "bottom": "85%", "right": "88%" },
                         { "image": "https://gqigzlhhq52zhk09.public.blob.vercel-storage.com/photos/sleepingcat-Vrp0eey5wBB3sCAhbZaW1nEkQ2yQFs.jpg", "title": "curl -X GET 'SLEEP'", "bottom": "48%", "right": "70%" },
                         { "image": "https://gqigzlhhq52zhk09.public.blob.vercel-storage.com/gooner-ZqrKtCjoAPtzGgqR95x0YeEdoka7GU.jpg", "title": "Gooner Markings", "bottom": "33%", "right": "72%" },
                         { "image": "https://gqigzlhhq52zhk09.public.blob.vercel-storage.com/20230227_183859-1AY3mbBu0rFokr8gjro6CPsFlw24N9.jpg", "title": "End of a semester", "bottom": "30%", "right": "72%" },
                         { "image": "https://gqigzlhhq52zhk09.public.blob.vercel-storage.com/20221216_113130-Oc04bD2pXBPoYMcaf0ZyfHdBEba3Cd.jpg", "title": "Welcome to DY", "bottom": "30%", "right": "74%" }
                    ].map((button, index) => (
                        <button
                            key={index}
                            className="round-button"
                            style={{ top: button.top, left: button.left, bottom: button.bottom, right: button.right }}
                            onClick={() => handleButtonClick(button.image, button.pdf, button.title)}
                        ></button>
                    ))}
                </div>
            </div>

            {imageModalVisible && (
                <div className="image-modal" style={{ display: 'flex' }}>
                    <div className="image-modal-content">
                        <h2>{modalTitle}</h2>
                        {loading && <div className="loading-spinner"></div>} {/* Show loading spinner */}
                        <img
                            src={modalImageSrc}
                            alt="Zoomed Image"
                            style={{ display: loading ? 'none' : 'block' }} // Hide image while loading
                        />
                        <button className="image-close-btn" onClick={closeImageModal}>Close</button>
                    </div>
                </div>
            )}

            {pdfModalVisible && (
                <div className="pdf-modal" style={{ display: 'flex' }}>
                    <div className="pdf-modal-content">
                        <h2>{modalTitle}</h2>
                        <iframe src={modalPdfSrc} style={{ display: 'block' }} frameBorder="0"></iframe>
                        <button className="pdf-close-btn" onClick={closePdfModal}>Close</button>
                    </div>
                </div>
            )}

            <div style={{ margin: '20px', marginRight: 'auto' }}>
                <h2>Zoom in to scroll and click on blue buttons for street view</h2>
                <p>Mysterious AVLA MC markings have been spotted in some classrooms</p>
                <p>
                    <a href="https://gqigzlhhq52zhk09.public.blob.vercel-storage.com/avla1-ogO1vynFUFEaPdSVtMVnqCuSbwCaPl.jpg" target="_blank">AVLA</a>
                    {' '}{' '}
                    <a href="https://gqigzlhhq52zhk09.public.blob.vercel-storage.com/avla2-eItVwjhhwbO9EtpPi4pVXpltKfI4AL.jpg" target="_blank">MC</a>
                </p>
            </div>
        </div>
    );
};

export default Map;