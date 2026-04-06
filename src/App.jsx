import "./index.css"
import Canvas from "./canvas"
import data from "./data"
import LocomotiveScroll from 'locomotive-scroll';
import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useImagePreloader } from './hooks/useImagePreloader'

gsap.registerPlugin(ScrollTrigger);

function App() {
    const [showCanvas, setShowCanvas] = useState(false);
    const { loaded } = useImagePreloader();
    const cursorRef = useRef(null);
    const cursorFollowerRef = useRef(null);

    useEffect(() => {
        const locomotiveScroll = new LocomotiveScroll();

        // Custom Cursor Logic
        const moveCursor = (e) => {
            gsap.to(cursorRef.current, { x: e.clientX, y: e.clientY, duration: 0.1 });
            gsap.to(cursorFollowerRef.current, { x: e.clientX, y: e.clientY, duration: 0.3 });
        };
        window.addEventListener('mousemove', moveCursor);

        // Section Reveal Logic with ScrollTrigger
        gsap.utils.toArray("section").forEach((section) => {
            gsap.fromTo(section, 
                { opacity: 0, y: 50 }, 
                { 
                    opacity: 1, 
                    y: 0, 
                    duration: 1.5, 
                    ease: "power2.out", 
                    scrollTrigger: {
                        trigger: section,
                        start: "top 80%",
                        toggleActions: "play none none reverse"
                    }
                }
            );
        });

        return () => {
            window.removeEventListener('mousemove', moveCursor);
            locomotiveScroll.destroy();
        };
    }, []);

    if (!loaded) {
        return (
            <div className="fixed inset-0 bg-black flex items-center justify-center z-[9999] font-mono">
                <div className="text-center">
                    <h2 className="text-4xl font-bold tracking-tighter animate-pulse mb-4 text-gradient">THIRTYSIX®</h2>
                    <p className="text-xs opacity-50 uppercase tracking-[0.5em]">Optimizing Experience...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-black text-white selection:bg-white selection:text-black">
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
                        <h1 onClick={() => setShowCanvas(!showCanvas)} className="hero-heading text-[12vw] md:text-[15vw] font-bold tracking-tighter leading-[0.8] cursor-pointer hover:italic transition-all duration-500">
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
                            <p className="text-xl font-light leading-relaxed">As a contemporary studio, we use cutting-edge design practices and the latest technologies to deliver seamless digital work.</p>
                            <p className="text-xl font-light leading-relaxed">Our commitment to creativity, innovation, and simplicity ensures your journey with us is smooth and enjoyable.</p>
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

                {/* Clients Section */}
                <section className="relative w-full py-24 px-10 md:px-24">
                    <div className="canvas-container absolute inset-0 pointer-events-none">
                        {showCanvas && data[3].map((canvasdets, index) => (
                            <Canvas key={`clients-${index}`} details={canvasdets} />
                        ))}
                    </div>
                    <div className="flex flex-col md:flex-row items-center justify-between opacity-30 gap-12 flex-wrap">
                        {["NIKE", "APPLE", "ADIDAS", "SONY", "LEVIS"].map((client, i) => (
                            <span key={i} className="text-4xl md:text-6xl font-black italic tracking-tighter">{client}</span>
                        ))}
                    </div>
                </section>

                {/* Work Section */}
                <section id="Work" className="relative w-full min-h-screen py-24 px-10 md:px-24">
                    <div className="canvas-container absolute inset-0 pointer-events-none">
                        {showCanvas && data[7].map((canvasdets, index) => (
                            <Canvas key={`work-${index}`} details={canvasdets} />
                        ))}
                    </div>
                    <div className="flex flex-col md:flex-row justify-between items-end mb-20">
                        <h2 className="text-6xl md:text-8xl font-bold tracking-tighter">OUR WORK</h2>
                        <p className="text-sm opacity-50 uppercase tracking-widest mt-4 md:mt-0">Selected Projects 2023-2024</p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {[{ title: "ZENTRY", category: "Brand Identity" }, { title: "RETHINK", category: "Motion Graphics" }, { title: "FLUX", category: "Web Experience" }, { title: "NOVA", category: "Digital Product" }].map((work, i) => (
                            <div key={i} className="group relative aspect-video overflow-hidden glass border-white/5 cursor-pointer">
                                <div className="absolute inset-0 bg-white translate-y-full group-hover:translate-y-0 transition-transform duration-700 ease-in-out"></div>
                                <div className="relative z-10 p-8 flex flex-col justify-end h-full">
                                    <h4 className="text-3xl font-bold group-hover:text-black transition-colors duration-500">{work.title}</h4>
                                    <p className="text-sm opacity-50 group-hover:text-black group-hover:opacity-100 transition-all duration-500">{work.category}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Process Section */}
                <section id="Studio" className="relative w-full min-h-screen py-24 px-10 md:px-24 bg-zinc-950">
                    <div className="canvas-container absolute inset-0 pointer-events-none">
                        {showCanvas && data[5].map((canvasdets, index) => (
                            <Canvas key={`process-${index}`} details={canvasdets} />
                        ))}
                    </div>
                    <div className="max-w-3xl">
                        <span className="text-sm font-mono opacity-50 mb-4 block">02 — HOW WE WORK</span>
                        <h2 className="text-4xl md:text-6xl font-medium leading-tight mb-16">A streamlined approach to <span className="text-gradient">complex</span> problems.</h2>
                        <div className="space-y-12">
                            {[{ step: "01", title: "Discovery", desc: "We dive deep into your brand DNA to find the unique angle." }, { step: "02", title: "Strategy", desc: "Setting the roadmap for a successful digital execution." }, { step: "03", title: "Execution", desc: "Crafting every pixel and frame with meticulous care." }].map((item, i) => (
                                <div key={i} className="flex gap-8 items-start border-l border-white/10 pl-8 hover:border-white transition-colors duration-500">
                                    <span className="text-xl font-mono opacity-30">{item.step}</span>
                                    <div><h4 className="text-2xl font-bold mb-2">{item.title}</h4><p className="opacity-60">{item.desc}</p></div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Culture Section */}
                <section className="relative w-full min-h-screen flex flex-col justify-center py-24 px-10 md:px-24">
                    <div className="canvas-container absolute inset-0 pointer-events-none">
                        {showCanvas && data[6].map((canvasdets, index) => (
                            <Canvas key={`culture-${index}`} details={canvasdets} />
                        ))}
                    </div>
                    <div className="text-center md:text-left">
                        <h2 className="text-[15vw] font-bold tracking-tighter leading-none mb-8 opacity-20">STUDIO</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-20">
                            <div></div>
                            <div className="space-y-8">
                                <p className="text-2xl font-light leading-relaxed">We believe in the power of small, agile teams. Our studio is built on collaboration, transparency, and a relentless pursuit of quality.</p>
                                <button className="px-8 py-4 border border-white hover:bg-white hover:text-black transition-all duration-500 text-sm uppercase tracking-widest">Join the Team</button>
                            </div>
                        </div>
                    </div>
                </section>

                {/* News/Journal Section */}
                <section id="News" className="relative w-full min-h-screen py-24 px-10 md:px-24 bg-zinc-950">
                    <div className="canvas-container absolute inset-0 pointer-events-none">
                        {showCanvas && data[9].map((canvasdets, index) => (
                            <Canvas key={`news-${index}`} details={canvasdets} />
                        ))}
                    </div>
                    <div className="mb-20"><h2 className="text-6xl md:text-8xl font-bold tracking-tighter">JOURNAL</h2></div>
                    <div className="space-y-12">
                        {[{ date: "MAR 2024", title: "The Future of Motion in Digital Ads" }, { date: "FEB 2024", title: "Why Boutique Studios are Outpacing Giants" }, { date: "JAN 2024", title: "Introducing THIRTYSIX® AI Lab" }].map((post, i) => (
                            <div key={i} className="flex flex-col md:flex-row justify-between items-start md:items-center py-8 border-b border-white/10 group cursor-pointer">
                                <h4 className="text-3xl md:text-4xl font-medium group-hover:pl-4 transition-all duration-500">{post.title}</h4>
                                <span className="text-sm opacity-50 mt-4 md:mt-0">{post.date}</span>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Final CTA/Footer Top */}
                <section className="relative w-full py-48 px-10 md:px-24">
                    <div className="canvas-container absolute inset-0 pointer-events-none">
                        {showCanvas && data[1].map((canvasdets, index) => (
                            <Canvas key={`final-${index}`} details={canvasdets} />
                        ))}
                    </div>
                    <div className="text-center max-w-4xl mx-auto">
                        <h2 className="text-5xl md:text-7xl font-bold tracking-tighter mb-12">READY TO <span className="text-gradient">THINK</span> DIFFERENTLY?</h2>
                        <button className="px-12 py-6 bg-white text-black text-lg font-bold uppercase tracking-widest hover:bg-transparent hover:text-white border border-white transition-all duration-500">Start a Project</button>
                    </div>
                </section>

                {/* Contact Section */}
                <section id="Contact" className="relative w-full h-[60vh] flex flex-col justify-center items-center text-center px-10">
                    <div className="canvas-container absolute inset-0 pointer-events-none">
                        {showCanvas && data[1].map((canvasdets, index) => (
                            <Canvas key={`contact-${index}`} details={canvasdets} />
                        ))}
                    </div>
                    <h2 className="text-5xl md:text-8xl font-bold tracking-tighter mb-8">LET'S CREATE</h2>
                    <a href="mailto:hello@thirtysix.studio" className="text-xl md:text-2xl border-b border-white pb-2 hover:opacity-50 transition-opacity">hello@thirtysix.studio</a>
                </section>
            </main>

            <footer className="p-10 border-t border-white/10 flex flex-col md:flex-row justify-between items-center text-xs opacity-50 uppercase tracking-widest gap-4">
                <p>&copy; 2024 THIRTYSIX STUDIO. ALL RIGHTS RESERVED.</p>
                <div className="flex space-x-8"><span>INSTAGRAM</span><span>TWITTER</span><span>LINKEDIN</span></div>
            </footer>
        </div>
    );
}

export default App;
