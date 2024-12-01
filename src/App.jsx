import "./index.css"
import Canvas from "./canvas"
import data from "./data"
import LocomotiveScroll from 'locomotive-scroll';
import { useEffect, useRef, useState } from 'react';

function App() {
    const[showCanvas,setShowCanvas]= useState(false);
    const headingref = useRef(null);

    useEffect(() => {
        headingref.current.addEventListener('click', () => {
            setShowCanvas(!showCanvas);
        });
        const locomotiveScroll = new LocomotiveScroll();
    }, [showCanvas]);

    return (
        <>
            {/* page 1 */}
            <div className="w-full min-h-screen relative  helvetika_now_display">

                {showCanvas && data[0].map((canvasdets, index) => (
                    <Canvas details={canvasdets} />
                ))}

                <div className="w-full min-h-screen relative text-white">
                    {/* nav bar */}
                    <nav className="flex justify-between items-center p-4">
                        <div className="text-lg font-regular">ThirtySix Studio</div>
                        <ul className="flex space-x-4">
                            {["Home", "About", "Project", "Contact"].map((link, index) => (
                                <li key={index} className="hover:text-gray-300">
                                    <a href={`#${link}`}>{link}</a>
                                </li>
                            ))}
                        </ul>
                    </nav>

                    <div className="textcontainer w-full px-[20%]">
                        <div className="text w-[40%]">
                            <h3 className="text-3xl">At Thirtysixstudio, we build immersive digital experiences for brands with a purpose.</h3>
                            <p className="text-md w-[80%] font-normal mt-10">We’re a boutique production studio focused on design, motion, and creative technology, constantly reimagining what digital craft can do for present-time ads and campaigns.</p>
                            <p className="text-md font-normal mt-10">Scroll</p>


                        </div>
                    </div>
                    <div className="w-full absolute ml-20 bottom-20 left-0">
                        <h1 ref={headingref} className="text-[18rem] font-normal relative tracking-tight leading-none">Thirtysixstudio</h1>
                    </div>
                </div>
            </div>

            {/* page 2 */}
            <div className="w-full min-h-screen relative flex items-center text-white helvetika_now_display">
            
            
            {showCanvas &&
             data[1].map((canvasdets, index) => (
                    <Canvas details={canvasdets} />
                ))}


                <div className="left w-1/2 font-bold text-md  relative pl-24">
                    <h2>01-- WHAT WE DO</h2>
                </div>

                <div className="textcontainer relative  w-full px-10 md:px-[20%]">
                    <div className="text w-full max-w-[80%] pt-10 md:pt-20 mx-auto">
                        <h3 className="text-3xl leading-snug">
                            We aim to revolutionize digital production in the advertising space, bringing your ideas to life.
                        </h3>
                        <p className="text-md font-normal mt-6 leading-relaxed">
                            As a contemporary studio, we use cutting-edge design practices and the latest technologies to deliver seamless digital work.
                        </p>
                        <p className="text-md font-normal mt-6 leading-relaxed">
                            Our commitment to creativity, innovation, and simplicity, paired with our agile approach, ensures your journey with us is smooth and enjoyable from start to finish.
                        </p>
                    </div>
                </div>
            </div>

        </>
    );
}
export default App;
