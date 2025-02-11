import React, { useState, useEffect, useRef } from 'react';
import '../styles/map.css';
import Navbar from './Navbar';

const Map = () => {
    const [modalData, setModalData] = useState({ title: '', src: '', type: '' });
    const [isLoading, setIsLoading] = useState(false);
    const [scale, setScale] = useState(1);
    const [translate, setTranslate] = useState({ x: 0, y: 0 });
    const [isDragging, setIsDragging] = useState(false);
    const [startPoint, setStartPoint] = useState({ x: 0, y: 0 });
    const containerRef = useRef(null);

    useEffect(() => {
        const handleImageLoad = () => setIsLoading(false);

        if (modalData.type === 'image' && modalData.src) {
            const img = new Image();
            img.src = modalData.src;
            img.onload = handleImageLoad;
        }

        return () => {
            if (modalData.type === 'image' && modalData.src) {
                const img = new Image();
                img.src = '';
                img.onload = null;
            }
        };
    }, [modalData]);

    const handleButtonClick = (event) => {
        const { image, pdf, title } = event.currentTarget.dataset;
        if (image) {
            setModalData({ title, src: image, type: 'image' });
            setIsLoading(true);
        } else if (pdf) {
            setModalData({ title, src: pdf, type: 'pdf' });
        }
    };

    const handleCloseModal = () => {
        setModalData({ title: '', src: '', type: '' });
        setIsLoading(false);
    };

    const handleWheel = (e) => {
        e.preventDefault();
        const newScale = Math.min(Math.max(scale + e.deltaY * -0.01, 1), 5);
        setScale(newScale);
    };

    const handleMouseDown = (e) => {
        setIsDragging(true);
        setStartPoint({ x: e.clientX, y: e.clientY });
    };

    const handleMouseMove = (e) => {
        if (isDragging) {
            const dx = e.clientX - startPoint.x;
            const dy = e.clientY - startPoint.y;
            setTranslate({ x: translate.x + dx, y: translate.y + dy });
            setStartPoint({ x: e.clientX, y: e.clientY });
        }
    };

    const handleMouseUp = () => {
        setIsDragging(false);
    };

    return (
        <div>
            <Navbar />
            <div className="c">
                <div className="image-container" ref={containerRef} onWheel={handleWheel} onMouseDown={handleMouseDown} onMouseMove={handleMouseMove} onMouseUp={handleMouseUp}>
                    <img
                        id="zoomable-image"
                        src="https://gqigzlhhq52zhk09.public.blob.vercel-storage.com/RAIT-ALikXhHeypEJhvLjZhCGZ3gwlfQ6xy.jpg"
                        alt="Zoomable Image"
                        style={{ transform: `scale(${scale}) translate(${translate.x}px, ${translate.y}px)` }}
                    />
                    {/* Add more buttons as needed */}
                    {scale === 1 && (
                        <>
                            <button className="round-button" data-image="https://gqigzlhhq52zhk09.public.blob.vercel-storage.com/photos/solar-YbrWiYB9VxXAZFvhiU92oY2tzGfP6B.jpg" data-title="Terrace" style={{ top: '68%', left: '14.5%' }} onClick={handleButtonClick}></button>
                            {/* Other buttons */}
                        </>
                    )}
                </div>
            </div>

            {/* Image Modal */}
            {modalData.type === 'image' && (
                <div className="image-modal" style={{ display: 'flex' }}>
                    <div className="image-modal-content">
                        <h2>{modalData.title}</h2>
                        {isLoading && <div className="loading-spinner"></div>}
                        {!isLoading && <img src={modalData.src} alt="Zoomed Image" />}
                        <button className="image-close-btn" onClick={handleCloseModal}>Close</button>
                    </div>
                </div>
            )}

            {/* PDF Modal */}
            {modalData.type === 'pdf' && (
                <div className="pdf-modal" style={{ display: 'flex' }}>
                    <div className="pdf-modal-content">
                        <h2>{modalData.title}</h2>
                        <iframe src={modalData.src} frameBorder="0" title={modalData.title}></iframe>
                        <button className="pdf-close-btn" onClick={handleCloseModal}>Close</button>
                    </div>
                </div>
            )}

            <div style={{ margin: '20px', marginRight: 'auto' }}>
                <h2>Ancient Lore</h2>
                <p>Mysterious AVLA MC markings have been spotted in some classrooms</p>
                <p>
                    <a href="https://gqigzlhhq52zhk09.public.blob.vercel-storage.com/avla1-ogO1vynFUFEaPdSVtMVnqCuSbwCaPl.jpg" target="_blank" rel="noopener noreferrer">View Image 1</a>
                    and <a href="https://gqigzlhhq52zhk09.public.blob.vercel-storage.com/avla2-eItVwjhhwbO9EtpPi4pVXpltKfI4AL.jpg" target="_blank" rel="noopener noreferrer">View Image 2</a>
                </p>
            </div>
        </div>
    );
};

export default Map;