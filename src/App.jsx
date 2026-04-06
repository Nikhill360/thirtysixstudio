import "./index.css"
import Canvas from "./canvas"
import data from "./data"
import LocomotiveScroll from 'locomotive-scroll';
import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

function App() {
    const [showCanvas, setShowCanvas] = useState(false);
    const containerRef = useRef(null);
    const cursorRef = useRef(null);
    const cursorFollowerRef = useRef(null);

    useEffect(() => {
        const locomotiveScroll = new LocomotiveScroll();

        // Custom Cursor Logic
        const moveCursor = (e) => {
            gsap.to(cursorRef.current, {
                x: e.clientX,
                y: e.clientY,
                duration: 0.1
            });
            gsap.to(cursorFollowerRef.current, {
                x: e.clientX,
                y: e.clientY,
                duration: 0.3
            });
        };

        window.addEventListener('mousemove', moveCursor);

        // Header click to toggle canvas
        const heading = document.querySelector('.hero-heading');
        if (heading) {
            heading.addEventListener('click', () => {
                setShowCanvas(!showCanvas);
                gsap.fromTo(".canvas-container", { opacity: 0 }, { opacity: 1, duration: 1 });
            });
        }

        return () => {
            window.removeEventListener('mousemove', moveCursor);
            locomotiveScroll.destroy();
        };
    }, [showCanvas]);

    return (
        <div ref={containerRef} className="bg-black text-white selection:bg-white selection:text-black">
            {/* Custom Cursor */}
            <div ref={cursorRef} className="custom-cursor fixed top-0 left-0 -translate-x-1/2 -translate-y-1/2 hidden md:block"></div>
            <div ref={cursorFollowerRef} className="custom-cursor-follower fixed top-0 left-0 -translate-x-1/2 -translate-y-1/2 hidden md:block"></div>

            {/* Navigation */}
            <nav className="fixed top-0 left-0 w-full z-50 flex justify-between items-center p-8 mix-blend-difference">
                <div className="text-xl font-bold tracking-tighter">THIRTYSIX®</div>
                <ul className="flex space-x-8 text-sm font-medium tracking-widest uppercase">
                    {["Work", "Studio", "News", "Contact"].map((link, index) => (
                        <li key={index} className="group relative overflow-hidden">
                            <a href={`#${link}`} className="inline-block transition-transform duration-300 group-hover:-translate-y-full">{link}</a>
                            <a href={`#${link}`} className="absolute left-0 top-full transition-transform duration-300 group-hover:-translate-y-full">{link}</a>
                        </li>
                    ))}
                </ul>
            </nav>

            <main>
                {/* Hero Section */}
                <section className="relative w-full min-h-screen flex flex-col justify-center px-10 md:px-24">
                    <div className="canvas-container absolute inset-0 pointer-events-none">
                        {showCanvas && data[0].map((canvasdets, index) => (
                            <Canvas key={`hero-${index}`} details={canvasdets} />
                        ))}
                    </div>

                    <div className="relative z-10 max-w-4xl">
                        <h3 className="text-xl md:text-2xl font-light mb-8 opacity-70">
                            At Thirtysixstudio, we build immersive digital experiences for brands with a purpose.
                        </h3>
                        <p className="text-lg md:text-xl max-w-2xl font-light leading-relaxed mb-12">
                            We're a boutique production studio focused on design, motion, and creative technology, constantly reimagining what digital craft can do for present-time ads and campaigns.
                        </p>
                    </div>

                    <div className="absolute bottom-10 left-10 md:left-24">
                        <h1 className="hero-heading text-[12vw] md:text-[15vw] font-bold tracking-tighter leading-[0.8] cursor-pointer hover:italic transition-all duration-500">
                            THIRTYSIX
                        </h1>
                    </div>
                </section>

                {/* About Section */}
                <section className="relative w-full min-h-screen flex items-center py-24 px-10 md:px-24">
                    <div className="canvas-container absolute inset-0 pointer-events-none">
                        {showCanvas && data[1].map((canvasdets, index) => (
                            <Canvas key={`about-${index}`} details={canvasdets} />
                        ))}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-20 items-center">
                        <div className="relative overflow-hidden">
                            <span className="text-sm font-mono opacity-50 mb-4 block">01 — WHAT WE DO</span>
                            <h2 className="text-4xl md:text-6xl font-medium leading-tight mb-8">
                                We aim to <span className="text-gradient">revolutionize</span> digital production.
                            </h2>
                        </div>
                        <div className="space-y-6 opacity-80">
                            <p className="text-xl font-light leading-relaxed">
                                As a contemporary studio, we use cutting-edge design practices and the latest technologies to deliver seamless digital work.
                            </p>
                            <p className="text-xl font-light leading-relaxed">
                                Our commitment to creativity, innovation, and simplicity, paired with our agile approach, ensures your journey with us is smooth and enjoyable.
                            </p>
                        </div>
                    </div>
                </section>

                {/* Services/Feature Section */}
                <section className="relative w-full min-h-screen py-24 px-10 md:px-24 bg-zinc-950">
                    <div className="canvas-container absolute inset-0 pointer-events-none">
                        {showCanvas && data[2].map((canvasdets, index) => (
                            <Canvas key={`services-${index}`} details={canvasdets} />
                        ))}
                    </div>

                    <div className="mb-20">
                        <h2 className="text-[10vw] font-bold tracking-tighter opacity-10">SERVICES</h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                        {[
                            { title: "Design", desc: "Crafting visual languages that resonate." },
                            { title: "Motion", desc: "Bringing static ideas to life with rhythm." },
                            { title: "Tech", desc: "Developing robust digital architectures." }
                        ].map((service, i) => (
                            <div key={i} className="glass p-10 border-white/5 group hover:bg-white hover:text-black transition-colors duration-500">
                                <h4 className="text-2xl font-bold mb-4">{service.title}</h4>
                                <p className="opacity-60 group-hover:opacity-100 transition-opacity">{service.desc}</p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Contact Section */}
                <section className="relative w-full h-[80vh] flex flex-col justify-center items-center text-center px-10">
                    <div className="canvas-container absolute inset-0 pointer-events-none">
                        {showCanvas && data[3].map((canvasdets, index) => (
                            <Canvas key={`contact-${index}`} details={canvasdets} />
                        ))}
                    </div>
                    <h2 className="text-5xl md:text-8xl font-bold tracking-tighter mb-8">LET'S CREATE</h2>
                    <a href="mailto:hello@thirtysix.studio" className="text-xl md:text-2xl border-b border-white pb-2 hover:opacity-50 transition-opacity">
                        hello@thirtysix.studio
                    </a>
                </section>
            </main>

            <footer className="p-10 border-t border-white/10 flex flex-col md:flex-row justify-between items-center text-xs opacity-50 uppercase tracking-widest gap-4">
                <p>&copy; 2024 THIRTYSIX STUDIO. ALL RIGHTS RESERVED.</p>
                <div className="flex space-x-8">
                    <span>INSTAGRAM</span>
                    <span>TWITTER</span>
                    <span>LINKEDIN</span>
                </div>
            </footer>
        </div>
    );
}
export default App;

