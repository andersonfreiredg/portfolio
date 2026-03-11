/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */
import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Instagram, ExternalLink, X } from 'lucide-react';

const projectsData = [
  {
    id: 'work-1',
    title: 'Identidade',
    client: 'NEXUS TECH',
    year: '2025',
    image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop'
  },
  {
    id: 'work-2',
    title: 'Editorial',
    client: 'REVISTA VANGUARDA',
    year: '2024',
    image: 'https://images.unsplash.com/photo-1586075010923-2dd4570fb338?q=80&w=2400&auto=format&fit=crop'
  },
  {
    id: 'work-3',
    title: 'UX/UI',
    client: 'FINTECH APP',
    year: '2025',
    image: 'https://images.unsplash.com/photo-1614850523459-c2f4c699c52e?q=80&w=2670&auto=format&fit=crop'
  },
  {
    id: 'work-4',
    title: 'Embalagem',
    client: 'CAFÉ ORIGEM',
    year: '2024',
    image: 'https://images.unsplash.com/photo-1559525839-b184a4d698c7?q=80&w=2670&auto=format&fit=crop'
  }
];

const slides = [
  { id: 'home', type: 'hero' },
  { id: 'about', type: 'about' },
  ...projectsData.slice(0, 3).map(p => ({ ...p, type: 'project' })),
  { id: 'contact', type: 'contact' }
];

const transition = { duration: 1.2, ease: [0.76, 0, 0.24, 1] };

const slideVariants = {
  enter: (direction: number) => ({
    y: direction > 0 ? '100%' : '-100%',
    filter: 'blur(20px)',
    opacity: 0,
  }),
  center: {
    y: 0,
    filter: 'blur(0px)',
    opacity: 1,
    transition
  },
  exit: (direction: number) => ({
    y: direction < 0 ? '100%' : '-100%',
    filter: 'blur(20px)',
    opacity: 0,
    transition
  })
};

function Preloader({ onComplete }: { onComplete: () => void }) {
  const [counter, setCounter] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCounter((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(onComplete, 500);
          return 100;
        }
        return prev + Math.floor(Math.random() * 12) + 1;
      });
    }, 40);
    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <motion.div
      className="fixed inset-0 z-[100] bg-[#050505] text-white flex flex-col items-center justify-center cursor-none"
      exit={{ y: '-100%', transition: { duration: 1.2, ease: [0.76, 0, 0.24, 1] } }}
    >
      <div className="font-display font-bold text-[20vw] md:text-[15vw] leading-none tracking-tighter mix-blend-difference">
        {Math.min(counter, 100)}%
      </div>
      <div className="absolute bottom-10 text-[10px] tracking-[0.3em] uppercase animate-pulse opacity-50">
        Carregando Experiência
      </div>
    </motion.div>
  );
}

function CustomCursor() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (!window.matchMedia('(pointer: fine)').matches) return;
    setIsVisible(true);

    const updateMousePosition = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName.toLowerCase() === 'a' || 
        target.tagName.toLowerCase() === 'button' || 
        target.closest('a') || 
        target.closest('button')
      ) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    window.addEventListener('mousemove', updateMousePosition);
    window.addEventListener('mouseover', handleMouseOver);

    return () => {
      window.removeEventListener('mousemove', updateMousePosition);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, []);

  if (!isVisible) return null;

  return (
    <motion.div
      className="fixed top-0 left-0 bg-white rounded-full pointer-events-none z-[9999] mix-blend-difference flex items-center justify-center"
      animate={{
        x: mousePosition.x - (isHovering ? 24 : 8),
        y: mousePosition.y - (isHovering ? 24 : 8),
        width: isHovering ? 48 : 16,
        height: isHovering ? 48 : 16,
      }}
      transition={{ type: 'spring', stiffness: 500, damping: 28, mass: 0.5 }}
    />
  );
}

function ProjectsGallery({ onClose }: { onClose: () => void }) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: '100%' }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: '100%' }}
      transition={{ duration: 1, ease: [0.76, 0, 0.24, 1] }}
      className="absolute inset-0 w-full h-full bg-[#050505] z-40 overflow-y-auto pt-32 px-6 md:px-20 pb-20"
    >
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 border-b border-white/20 pb-8 gap-8 md:gap-0">
          <h2 className="text-[12vw] md:text-[6vw] leading-none font-display font-bold uppercase tracking-tighter">
            Projetos <br className="md:hidden" /><span className="stroke-text italic">Selecionados</span>
          </h2>
          <button 
            onClick={onClose}
            className="group flex items-center gap-3 text-xs md:text-sm tracking-[0.2em] uppercase hover:text-gray-400 transition-colors cursor-none mb-2"
          >
            <X className="w-5 h-5 group-hover:rotate-90 transition-transform duration-500" />
            Voltar
          </button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24">
          {projectsData.map((project, idx) => (
            <motion.div 
              key={project.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: idx * 0.1 }}
              className="group cursor-none"
            >
              <div className="w-full aspect-[4/5] overflow-hidden mb-6 relative bg-white/5">
                <div className="absolute inset-0 bg-black/40 group-hover:bg-transparent transition-colors duration-700 z-10" />
                <img 
                  src={project.image} 
                  alt={project.title} 
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-1000 ease-[0.76,0,0.24,1]"
                />
              </div>
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-2xl md:text-4xl font-display font-bold uppercase mb-2">{project.title}</h3>
                  <p className="text-[10px] tracking-[0.2em] uppercase text-white/50">{project.client}</p>
                </div>
                <span className="text-xs font-mono text-white/50">{project.year}</span>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-32 text-center border-t border-white/20 pt-16">
          <h3 className="text-2xl md:text-4xl font-display font-bold uppercase mb-6">Gostou do que viu?</h3>
          <button 
            onClick={onClose}
            className="text-xs md:text-sm tracking-[0.2em] uppercase border border-white/30 px-8 py-4 rounded-full hover:bg-white hover:text-black transition-colors duration-500 cursor-none"
          >
            Vamos conversar
          </button>
        </div>
      </div>
    </motion.div>
  );
}

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [view, setView] = useState<'slider' | 'gallery'>('slider');
  const [[page, direction], setPage] = useState([0, 0]);
  const isAnimating = useRef(false);

  const paginate = (newDirection: number) => {
    if (isLoading || view !== 'slider') return;
    setPage((prev) => {
      const [currentPage] = prev;
      const newPage = currentPage + newDirection;
      if (newPage >= 0 && newPage < slides.length) {
        isAnimating.current = true;
        setTimeout(() => {
          isAnimating.current = false;
        }, 1200);
        return [newPage, newDirection];
      }
      return prev;
    });
  };

  useEffect(() => {
    let touchStartY = 0;

    const handleWheel = (e: WheelEvent) => {
      if (isAnimating.current || isLoading || view !== 'slider') return;
      if (Math.abs(e.deltaY) < 40) return;

      if (e.deltaY > 0) {
        paginate(1);
      } else {
        paginate(-1);
      }
    };

    const handleTouchStart = (e: TouchEvent) => {
      if (view !== 'slider') return;
      touchStartY = e.touches[0].clientY;
    };

    const handleTouchEnd = (e: TouchEvent) => {
      if (isAnimating.current || isLoading || view !== 'slider') return;
      const touchEndY = e.changedTouches[0].clientY;
      const deltaY = touchStartY - touchEndY;

      if (deltaY > 50) {
        paginate(1);
      } else if (deltaY < -50) {
        paginate(-1);
      }
    };

    window.addEventListener('wheel', handleWheel, { passive: false });
    window.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('touchend', handleTouchEnd, { passive: true });

    return () => {
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchend', handleTouchEnd);
    };
  }, [isLoading, view]);

  const slide = slides[page];

  return (
    <div className="relative w-full h-screen bg-[#050505] text-white overflow-hidden font-sans selection:bg-white selection:text-black cursor-none">
      <CustomCursor />
      
      <AnimatePresence mode="wait">
        {isLoading && <Preloader key="preloader" onComplete={() => setIsLoading(false)} />}
      </AnimatePresence>

      {/* Noise Overlay */}
      <div className="fixed inset-0 opacity-[0.04] pointer-events-none z-50" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")' }}></div>

      {/* Header */}
      <header className="fixed top-0 left-0 w-full p-5 md:p-10 flex justify-between items-center z-50 mix-blend-difference text-white pointer-events-none">
        <div className="font-display font-bold text-xl md:text-2xl tracking-widest uppercase">AF.</div>
        <div className="text-[8px] md:text-xs tracking-[0.1em] md:tracking-[0.2em] uppercase flex items-center gap-2 md:gap-3">
          <span className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-white animate-pulse"></span>
          <span className="hidden sm:inline">Disponível para projetos</span>
          <span className="sm:hidden">Disponível</span>
        </div>
      </header>

      {/* Progress Controls - Only show in slider view */}
      <AnimatePresence>
        {view === 'slider' && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed right-4 md:right-10 top-1/2 -translate-y-1/2 z-50 flex flex-col gap-3 md:gap-4 mix-blend-difference"
          >
            {slides.map((_, i) => (
              <button
                key={i}
                onClick={() => {
                  if (isAnimating.current || i === page || isLoading) return;
                  const dir = i > page ? 1 : -1;
                  isAnimating.current = true;
                  setPage([i, dir]);
                  setTimeout(() => isAnimating.current = false, 1200);
                }}
                className={`transition-all duration-500 rounded-full cursor-none ${i === page ? 'h-8 md:h-12 bg-white w-1 md:w-1.5' : 'h-2 md:h-3 bg-white/30 hover:bg-white/60 w-1 md:w-1.5'}`}
                aria-label={`Ir para slide ${i + 1}`}
              />
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Scroll Hint - Only show in slider view */}
      <AnimatePresence>
        {view === 'slider' && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 0.6 }} exit={{ opacity: 0 }}
            className="fixed bottom-4 md:bottom-10 left-1/2 -translate-x-1/2 z-50 mix-blend-difference text-white flex flex-col items-center gap-2 md:gap-3 pointer-events-none"
          >
            <span className="hidden md:block text-[10px] tracking-[0.3em] uppercase">Role para explorar</span>
            <div className="w-[1px] h-8 md:h-10 bg-white/30 overflow-hidden relative">
              <motion.div
                className="w-full h-1/2 bg-white absolute top-0"
                animate={{ y: ['-100%', '200%'] }}
                transition={{ repeat: Infinity, duration: 1.5, ease: 'linear' }}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content */}
      {!isLoading && (
        <>
          <AnimatePresence initial={false} custom={direction}>
            {view === 'slider' && (
              <motion.div
                key={page}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                className="absolute inset-0 w-full h-full flex items-center justify-center"
              >
                {slide.type === 'hero' && (
                  <div className="relative w-full h-full flex flex-col items-center justify-center px-4">
                    <motion.h1 
                      initial={{ y: 50, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ duration: 1, delay: 0.2, ease: [0.76, 0, 0.24, 1] }}
                      className="text-[11vw] md:text-[14vw] leading-[0.85] md:leading-[0.8] font-display font-bold uppercase tracking-tighter text-center"
                    >
                      Anderson
                    </motion.h1>
                    <motion.h1 
                      initial={{ y: 50, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ duration: 1, delay: 0.3, ease: [0.76, 0, 0.24, 1] }}
                      className="text-[11vw] md:text-[14vw] leading-[0.85] md:leading-[0.8] font-display font-bold uppercase tracking-tighter text-center stroke-text italic ml-6 md:ml-32"
                    >
                      Freire
                    </motion.h1>
                    <motion.div 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 1, delay: 0.8 }}
                      className="mt-10 md:mt-16 flex items-center gap-3 md:gap-6"
                    >
                      <div className="w-6 md:w-16 h-[1px] bg-white/50"></div>
                      <p className="tracking-[0.2em] md:tracking-[0.5em] uppercase text-[9px] md:text-sm font-medium">Designer Gráfico</p>
                      <div className="w-6 md:w-16 h-[1px] bg-white/50"></div>
                    </motion.div>
                  </div>
                )}

                {slide.type === 'about' && (
                  <div className="relative w-full h-full flex flex-col items-center justify-center px-6 md:px-20">
                    <motion.div
                      initial={{ opacity: 0, y: 50 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 1, delay: 0.2, ease: [0.76, 0, 0.24, 1] }}
                      className="max-w-5xl"
                    >
                      <h2 className="text-[8vw] md:text-[4.5vw] leading-[1.1] font-display font-medium uppercase text-center md:text-left">
                        Transformando ideias complexas em experiências visuais <span className="stroke-text italic font-bold">memoráveis</span>.
                      </h2>
                    </motion.div>
                    
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 1, delay: 0.6 }}
                      className="mt-16 md:mt-24 flex flex-col md:flex-row items-center md:items-start justify-between w-full max-w-5xl gap-8 md:gap-0"
                    >
                      <div className="flex flex-col items-center md:items-start gap-2">
                        <span className="text-[10px] tracking-[0.3em] uppercase text-white/50">Foco</span>
                        <span className="text-xs md:text-sm tracking-widest uppercase">Branding & UX/UI</span>
                      </div>
                      <div className="flex flex-col items-center md:items-start gap-2">
                        <span className="text-[10px] tracking-[0.3em] uppercase text-white/50">Base</span>
                        <span className="text-xs md:text-sm tracking-widest uppercase">Brasil, SP</span>
                      </div>
                      <div className="flex flex-col items-center md:items-start gap-2">
                        <span className="text-[10px] tracking-[0.3em] uppercase text-white/50">Abordagem</span>
                        <span className="text-xs md:text-sm tracking-widest uppercase">Minimalista & Brutalista</span>
                      </div>
                    </motion.div>
                  </div>
                )}

                {slide.type === 'project' && (
                  <div className="relative w-full h-full flex items-center justify-center">
                    <motion.div
                      className="w-[75vw] md:w-[40vw] h-[55vh] md:h-[70vh] relative z-10 overflow-hidden"
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ duration: 1.2, delay: 0.2, ease: [0.76, 0, 0.24, 1] }}
                    >
                      <motion.img
                        src={slide.image}
                        className="w-full h-full object-cover"
                        alt={slide.title}
                        initial={{ scale: 1.3 }}
                        animate={{ scale: 1 }}
                        transition={{ duration: 1.5, ease: [0.76, 0, 0.24, 1] }}
                      />
                    </motion.div>

                    <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none z-20 px-4">
                      <motion.h2
                        className="text-[10vw] md:text-[12vw] leading-[0.85] md:leading-[0.8] font-display font-bold uppercase text-center text-white mix-blend-difference w-full"
                        initial={{ y: 100, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 1, delay: 0.4, ease: [0.76, 0, 0.24, 1] }}
                      >
                        {slide.title}
                      </motion.h2>
                    </div>

                    <motion.div 
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 1, delay: 0.8 }}
                      className="absolute bottom-8 left-5 md:bottom-16 md:left-16 z-30 pointer-events-auto"
                    >
                      <button 
                        onClick={() => setView('gallery')}
                        className="flex items-center gap-3 md:gap-4 text-[9px] md:text-xs tracking-[0.2em] md:tracking-[0.3em] uppercase font-medium text-white group hover:text-gray-300 transition-colors cursor-none"
                      >
                        <span className="w-6 md:w-16 h-[1px] bg-white group-hover:w-12 md:group-hover:w-24 transition-all duration-500"></span>
                        Ver Projetos
                      </button>
                    </motion.div>
                  </div>
                )}

                {slide.type === 'contact' && (
                  <div className="relative w-full h-full flex flex-col items-center justify-center px-4">
                    <motion.h2 
                      initial={{ y: 50, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ duration: 1, delay: 0.2, ease: [0.76, 0, 0.24, 1] }}
                      className="text-[10vw] md:text-[8vw] leading-[0.9] font-display font-bold uppercase text-center mb-12 md:mb-24"
                    >
                      Vamos criar<br/>algo <span className="stroke-text italic">incrível</span>
                    </motion.h2>

                    <motion.div 
                      initial={{ y: 30, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ duration: 1, delay: 0.4, ease: [0.76, 0, 0.24, 1] }}
                      className="flex flex-col md:flex-row gap-6 md:gap-20 items-center"
                    >
                      <a href="https://instagram.com/andersonfreiredg" target="_blank" rel="noreferrer" className="group flex items-center gap-3 md:gap-4 text-xl md:text-4xl font-display font-bold uppercase hover:text-gray-400 transition-colors cursor-none">
                        <Instagram className="w-6 h-6 md:w-12 md:h-12 group-hover:-rotate-12 transition-transform" />
                        Instagram
                      </a>
                      <a href="https://behance.com/andersonfreire" target="_blank" rel="noreferrer" className="group flex items-center gap-3 md:gap-4 text-xl md:text-4xl font-display font-bold uppercase hover:text-gray-400 transition-colors cursor-none">
                        <ExternalLink className="w-6 h-6 md:w-12 md:h-12 group-hover:rotate-12 transition-transform" />
                        Behance
                      </a>
                    </motion.div>
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>

          <AnimatePresence>
            {view === 'gallery' && (
              <ProjectsGallery onClose={() => setView('slider')} />
            )}
          </AnimatePresence>
        </>
      )}
    </div>
  );
}
