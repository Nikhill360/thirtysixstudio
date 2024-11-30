import { useEffect, useRef, useState } from "react"
import canvasImages from "./canvasimages"
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'



// const Canvas = () => {
function Canvas({ details }) {
    const scale = window.devicePixelRatio
    const { startIndex, numImages, duration, size, top, left, zIndex } = details;
    const [index, setIndex] = useState({ value: startIndex })
    const canvasRef = useRef(null);

    useGSAP(() => {
        gsap.to(index, {
            value: startIndex + numImages - 1,
            duration: duration,
            ease: 'linear',
            repeat: -1,
            onUpdate: () => {
                setIndex({ value: Math.round(index.value) })
            },
        })
    })

    useEffect(() => {
        const canvas = canvasRef.current;
        const context = canvas.getContext('2d');
        const image = new Image();
        image.src = canvasImages[index.value];
        image.onload = () => {
            canvas.width = canvas.offsetWidth * scale;
            canvas.height = canvas.offsetHeight * scale;
            canvas.style.width = canvas.offsetWidth + "px";
            canvas.style.height = canvas.offsetHeight + "px";

            context.scale(scale, scale);

            context.drawImage(image, 0, 0, canvas.offsetWidth, canvas.offsetHeight);
        };
    }, [index]);

    return (
        <canvas 
        data-scroll
        data-scroll-speed={
            Math.random().toFixed(1)
        }
        ref={canvasRef}
         className="absolute" 
         style={{
            width: `${size * 1.4}px`,
            height: `${size * 1.4}px`,
            top: `${top}%`,
            left: `${left}%`,
            zIndex: `${zIndex}`,
        }} id="canvas">

        </canvas>
    )
}
// }

export default Canvas