import "./index.css"
import Canvas from "./canvas"
import data from "./data"
import LocomotiveScroll from 'locomotive-scroll';
import { useEffect } from 'react';



function App() {
    useEffect(() => {
        const locomotiveScroll = new LocomotiveScroll();
    }, []);
    return (
        <>
            <div className="w-full min-h-screen relative  ">

                {data[0].map((canvasdets, index) => (
                    <Canvas details={canvasdets} />
                ))}
            </div>

            {/* <div className="w-full min-h-screen relative  ">

                {data[1].map((canvasdets, index) => (
                    <Canvas details={canvasdets} />
                ))}
            </div>
            <div className="w-full min-h-screen relative ">

                {data[2].map((canvasdets, index) => (
                    <Canvas details={canvasdets} />
                ))}
            </div>
            <div className="w-full min-h-screen relative ">

                {data[3].map((canvasdets, index) => (
                    <Canvas details={canvasdets} />
                ))}
            </div> */}
        </>



    );
}
export default App;
