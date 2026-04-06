import { useEffect, useRef, useState, useMemo } from "react"
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { getCachedImage } from './hooks/useImagePreloader'

function Canvas({ details }) {
    const scale = window.devicePixelRatio || 1;
    const { startIndex, numImages, duration, size, top, left, zIndex } = details;
    const [currentFrame, setCurrentFrame] = useState(startIndex);
    const canvasRef = useRef(null);
    const animationRef = useRef(null);
    const [isVisible, setIsVisible] = useState(false);
    const [isImageReady, setIsImageReady] = useState(false);

    // Intersection Observer for performance
    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                setIsVisible(entry.isIntersecting);
            },
            { threshold: 0.1, rootMargin: '50% 0px' } // Pre-activate 50% early
        );

        if (canvasRef.current) observer.observe(canvasRef.current);
        return () => observer.disconnect();
    }, []);

    useGSAP(() => {
        if (!isVisible) {
            if (animationRef.current) animationRef.current.pause();
            return;
        }

        if (animationRef.current) {
            animationRef.current.play();
        } else {
            animationRef.current = gsap.to({}, {
                duration: duration,
                ease: 'none',
                repeat: -1,
                onUpdate: function() {
                    const progress = this.progress(); 
                    const frameIndex = Math.floor(progress * numImages);
                    const actualIndex = (startIndex + frameIndex) % 1052; // Max frames based on data
                    setCurrentFrame(actualIndex);
                },
            });

            gsap.to(canvasRef.current, {
                scale: 1.05,
                duration: 2,
                repeat: -1,
                yoyo: true,
                ease: "power1.inOut"
            });
        }
    }, [isVisible, startIndex, numImages, duration]);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas || !isVisible) return;

        const currentImage = getCachedImage(currentFrame);
        if (!currentImage) {
            setIsImageReady(false);
            return;
        }

        setIsImageReady(true);
        const context = canvas.getContext('2d', { alpha: true });
        const canvasWidth = size * 1.6;
        const canvasHeight = size * 1.6;
        
        if (canvas.width !== canvasWidth * scale) {
            canvas.width = canvasWidth * scale;
            canvas.height = canvasHeight * scale;
            canvas.style.width = canvasWidth + "px";
            canvas.style.height = canvasHeight + "px";
            context.scale(scale, scale);
        }

        context.clearRect(0, 0, canvasWidth, canvasHeight);
        context.drawImage(currentImage, 0, 0, canvasWidth, canvasHeight);
    }, [currentFrame, size, scale, isVisible]);

    return (
        <canvas 
            ref={canvasRef}
            className="absolute transition-opacity duration-1000 ease-in-out pointer-events-none" 
            style={{
                top: `${top}%`,
                left: `${left}%`,
                zIndex: `${zIndex}`,
                opacity: (isVisible && isImageReady) ? 1 : 0
            }} 
            id="canvas"
        />
    )
}

export default Canvas