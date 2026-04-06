import { useEffect, useRef, useState } from "react"
import canvasImages from "./canvasimages"
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'

function Canvas({ details }) {
    const scale = window.devicePixelRatio
    const { startIndex, numImages, duration, size, top, left, zIndex } = details;
    const [currentFrame, setCurrentFrame] = useState(startIndex);
    const canvasRef = useRef(null);
    const imagesRef = useRef([]);
    const animationRef = useRef(null);

    // Mouse parallax state
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

    useEffect(() => {
        const handleMouseMove = (e) => {
            const x = (e.clientX / window.innerWidth - 0.5) * 20;
            const y = (e.clientY / window.innerHeight - 0.5) * 20;
            setMousePos({ x, y });
        };
        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    // Preload images
    useEffect(() => {
        let isMounted = true;
        const preloadImages = async () => {
            const imagePromises = canvasImages.map((src, i) => {
                return new Promise((resolve) => {
                    const img = new Image();
                    img.onload = () => {
                        if (isMounted) imagesRef.current[i] = img;
                        resolve(img);
                    };
                    img.src = src;
                });
            });
            await Promise.all(imagePromises);
        };
        preloadImages();
        return () => { isMounted = false; };
    }, []);

    useGSAP(() => {
        animationRef.current = gsap.to({}, {
            duration: duration,
            ease: 'none',
            repeat: -1,
            onUpdate: function() {
                const progress = this.progress();
                const frameIndex = Math.floor(progress * numImages);
                const actualIndex = (startIndex + frameIndex) % canvasImages.length;
                setCurrentFrame(actualIndex);
            },
        });

        // Hover scale effect
        gsap.to(canvasRef.current, {
            scale: 1.1,
            duration: 1,
            repeat: -1,
            yoyo: true,
            ease: "power1.inOut"
        });
    }, [startIndex, numImages, duration]);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const context = canvas.getContext('2d');
        const canvasWidth = size * 1.8;
        const canvasHeight = size * 1.8;
        
        canvas.width = canvasWidth * scale;
        canvas.height = canvasHeight * scale;
        canvas.style.width = canvasWidth + "px";
        canvas.style.height = canvasHeight + "px";

        context.scale(scale, scale);
        context.clearRect(0, 0, canvasWidth, canvasHeight);

        const currentImage = imagesRef.current[currentFrame];
        if (currentImage) {
            context.drawImage(currentImage, 0, 0, canvasWidth, canvasHeight);
        }
    }, [currentFrame, size, scale]);

    return (
        <canvas 
            data-scroll
            data-scroll-speed={Math.random().toFixed(1)}
            ref={canvasRef}
            className="absolute transition-transform duration-500 ease-out pointer-events-none" 
            style={{
                width: `${size * 1.8}px`,
                height: `${size * 1.8}px`,
                top: `${top}%`,
                left: `${left}%`,
                zIndex: `${zIndex}`,
                transform: `translate(${mousePos.x}px, ${mousePos.y}px)`
            }} 
            id="canvas"
        />
    )
}

export default Canvas