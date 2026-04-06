import { useState, useEffect } from 'react';
import canvasImages from '../canvasimages';

const imageCache = {};
let preloadingStarted = false;
let preloadingPromise = null;

// Only these images are required to hide the loading screen
const CRITICAL_IMAGES_COUNT = 150; 

const preloadBatch = (urls, startIndex = 0) => {
    return Promise.all(urls.map((src, i) => {
        const actualIndex = startIndex + i;
        if (imageCache[actualIndex]) return Promise.resolve(imageCache[actualIndex]);

        return new Promise((resolve) => {
            const img = new Image();
            img.onload = () => {
                imageCache[actualIndex] = img;
                resolve(img);
            };
            img.onerror = () => {
                resolve(null);
            };
            img.src = src;
        });
    }));
};

export const useImagePreloader = () => {
    const [loaded, setLoaded] = useState(Object.keys(imageCache).length >= CRITICAL_IMAGES_COUNT);

    useEffect(() => {
        if (!preloadingStarted) {
            preloadingStarted = true;
            
            // 1. Load CRITICAL images first
            preloadBatch(canvasImages.slice(0, CRITICAL_IMAGES_COUNT), 0)
                .then(() => {
                    setLoaded(true);
                    
                    // 2. Load the REST in larger background batches for performance
                    const rest = canvasImages.slice(CRITICAL_IMAGES_COUNT);
                    const CHUNK_SIZE = 100;
                    
                    const loadRest = async () => {
                        for (let i = 0; i < rest.length; i += CHUNK_SIZE) {
                            const chunk = rest.slice(i, i + CHUNK_SIZE);
                            await preloadBatch(chunk, CRITICAL_IMAGES_COUNT + i);
                            // Brief pause to allow browser to handle UL/UI threads
                            await new Promise(r => setTimeout(r, 50));
                        }
                    };
                    
                    loadRest();
                });
        }
    }, []);

    return { loaded };
};

export const getCachedImage = (index) => imageCache[index];
