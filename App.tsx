import React, { useState, useEffect } from 'react';
import { 
  Menu, 
  Search, 
  Crown, 
  User, 
  ChevronRight, 
  Camera, 
  ChefHat, 
  Clock, 
  BarChart, 
  PlayCircle,
  Ruler,
  Minus,
  Plus,
  Lock,
  ThumbsUp,
  MessageSquare,
  Check,
  AlertTriangle,
  ArrowRight,
  Star,
  Loader2
} from 'lucide-react';

// --- Components ---

const Header = () => (
  <header className="bg-kiwi-green text-white sticky top-0 z-50 shadow-md">
    <div className="flex items-center justify-between px-4 h-14">
      <div className="flex items-center gap-4">
        <button className="p-1">
          <Menu size={28} />
        </button>
        <div className="text-2xl font-bold tracking-tight font-sans">
          kiwilimón
        </div>
      </div>
      <div className="flex items-center">
        <div className="bg-white text-kiwi-green p-2 h-14 w-12 flex items-center justify-center border-b-4 border-kiwi-green shadow-sm z-10 relative top-[2px]">
          <Crown size={24} />
        </div>
        <button className="p-3">
          <Search size={24} />
        </button>
        <button className="p-3 relative">
          <div className="bg-white rounded-full p-1 text-kiwi-green">
            <User size={20} fill="currentColor" />
          </div>
          <span className="absolute top-2 right-1 bg-red-500 text-white text-[10px] font-bold px-1.5 rounded-full border border-kiwi-green">1</span>
        </button>
      </div>
    </div>
  </header>
);

const Breadcrumbs = () => (
  <div className="bg-[#f4f4f4] px-4 py-2 text-xs text-gray-500 flex flex-wrap items-center gap-1 font-sans overflow-x-hidden whitespace-nowrap">
    <span>Inicio</span>
    <ChevronRight size={12} />
    <span>Recetas</span>
    <ChevronRight size={12} />
    <span>Recetas para Adelgazar</span>
    <ChevronRight size={12} />
    <span className="text-kiwi-green truncate max-w-[150px]">Gelatina Reductora</span>
  </div>
);

const RecipeTitle = () => (
  <div className="px-4 py-6 bg-white">
    <h1 className="text-2xl md:text-3xl font-bold text-gray-800 uppercase font-sans mb-4">
      Gelatina Reductora
    </h1>
    <div className="mb-4">
      <div className="text-lg text-gray-700 leading-relaxed font-sans">
        Receta utilizada por celebridades como Kelly Clarkson, Kim Kardashian y la influencer mexicana Gomita para bajar de 3 a 5 kg cada 7 días sin dieta, sin medicamentos y sin gimnasio. Esta receta se volvió viral en todo internet después de que Gomita revelara este secreto y sorprendiera a sus fans.
      </div>
    </div>
    <div className="text-xs text-gray-400 italic">
      Receta enviada por: <span className="text-kiwi-green font-bold">Dra. Patricia Fernandez</span>
      <br />
      Publicada: 16-12-2025
    </div>
  </div>
);

const MediaSection = () => (
  <div className="relative w-full aspect-video bg-gray-200 group cursor-pointer overflow-hidden">
    <img 
      src="https://picsum.photos/800/450?random=2" 
      alt="Gelatina Reductora" 
      className="w-full h-full object-cover"
    />
    <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/30 transition-all">
      <PlayCircle size={64} className="text-white opacity-90" fill="rgba(0,0,0,0.5)" />
    </div>
    <div className="absolute top-4 left-4">
      <div className="bg-kiwi-green text-white px-3 py-4 flex flex-col items-center justify-center text-xs font-bold leading-tight w-20 h-16 shadow-lg">
        <Camera size={20} className="mb-1" />
        <span className="text-[10px] text-center uppercase leading-none">Sube tu Foto</span>
      </div>
    </div>
    <div className="absolute top-4 right-0">
       <div className="bg-gray-500/80 text-white px-3 py-2 text-xl font-bold">
        1
       </div>
    </div>
  </div>
);

const RatingBar = () => (
  <div className="bg-white py-3 border-b border-gray-200 flex justify-center items-center gap-2 sticky top-0 z-40 shadow-sm">
    <span className="text-gray-500 font-bold">5</span>
    <div className="flex text-kiwi-green">
      {[1, 2, 3, 4, 5].map((i) => (
        <svg key={i} className="w-5 h-5 fill-current" viewBox="0 0 24 24">
          <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/>
        </svg>
      ))}
    </div>
    <div className="h-4 w-px bg-gray-300 mx-1"></div>
    <span className="text-gray-400 italic text-sm">3958 comentarios</span>
  </div>
);

// --- Quiz Component ---

const LoadingStep = ({ onComplete }: { onComplete: () => void }) => {
  const [loadingStep, setLoadingStep] = useState(0);
  const [progress, setProgress] = useState(0);
  const loadingMessages = [
    "Analizando sus respuestas...",
    "Calculando su Índice de Masa Corporal...",
    "Verificando su tipo metabólico...",
    "Generando su plan personalizado..."
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) return 100;
        return prev + 1;
      });
    }, 35); // Approx 3.5 seconds total

    const messageInterval = setInterval(() => {
      setLoadingStep(prev => (prev + 1) % loadingMessages.length);
    }, 900);

    const timeout = setTimeout(() => {
      onComplete();
    }, 4000);

    return () => {
      clearInterval(interval);
      clearInterval(messageInterval);
      clearTimeout(timeout);
    };
  }, [onComplete]);

  return (
    <div className="flex flex-col items-center justify-center py-10 px-4">
      <div className="relative mb-8">
        <Loader2 size={64} className="text-kiwi-green animate-spin" />
        <div className="absolute inset-0 flex items-center justify-center font-bold text-xs text-kiwi-green">
          {progress}%
        </div>
      </div>
      
      <h3 className="text-xl font-bold text-gray-800 mb-2 text-center animate-pulse">
        {loadingMessages[loadingStep]}
      </h3>
      <p className="text-gray-500 text-sm text-center">
        Por favor espere un momento...
      </p>

      <div className="w-full bg-gray-200 rounded-full h-2.5 mt-8">
        <div 
          className="bg-kiwi-green h-2.5 rounded-full transition-all duration-300 ease-out" 
          style={{ width: `${progress}%` }}
        ></div>
      </div>
    </div>
  );
};

const QuizButton = ({ children, onClick }: { children?: React.ReactNode, onClick: () => void }) => (
  <button 
    onClick={onClick}
    className="w-full bg-white border border-gray-300 text-gray-700 font-medium py-3 px-4 rounded-lg shadow-sm hover:bg-gray-50 hover:border-kiwi-green hover:text-kiwi-green transition-all mb-3 text-left flex items-center justify-between group"
  >
    {children}
    <ChevronRight size={18} className="text-gray-300 group-hover:text-kiwi-green" />
  </button>
);

const ContinueButton = ({ onClick }: { onClick: () => void }) => (
  <button 
    onClick={onClick}
    className="w-full bg-kiwi-green text-white font-bold py-3 px-4 rounded-lg shadow-md hover:bg-kiwi-dark-green transition-all mt-4 flex items-center justify-center gap-2 uppercase"
  >
    Continuar <ArrowRight size={20} />
  </button>
);

const QuizFlow = ({ step, nextStep, onComplete }: { step: number, nextStep: () => void, onComplete: () => void }) => {
  const [sliderValue, setSliderValue] = useState(50); // reused for generic sliders
  const [selectedBenefits, setSelectedBenefits] = useState<string[]>([]);

  // Reset slider defaults for next steps if needed when step changes
  useEffect(() => {
    if (step === 10) setSliderValue(70); // Default weight (Step 10)
    if (step === 11) setSliderValue(165); // Default height (Step 11)
    if (step === 12) setSliderValue(60); // Default goal (Step 12)
    
    // Scroll to top of ingredients/quiz area on step change
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [step]);

  const toggleBenefit = (benefit: string) => {
    if (selectedBenefits.includes(benefit)) {
      setSelectedBenefits(prev => prev.filter(b => b !== benefit));
    } else {
      setSelectedBenefits(prev => [...prev, benefit]);
    }
  };

  const RangeStep = ({ title, min, max, unit, labelStart, labelEnd, note }: any) => {
    // Calculate percentage for the custom background gradient fill
    const percentage = ((sliderValue - min) / (max - min)) * 100;

    return (
      <div className="py-2">
        <h3 className="text-xl font-bold text-gray-800 mb-2">{title}</h3>
        {note && <p className="text-sm text-gray-500 mb-6">{note}</p>}
        
        <div className="flex justify-center mb-8">
          <div className="text-5xl font-bold text-kiwi-green">
            {sliderValue} <span className="text-xl text-gray-400 font-normal">{unit}</span>
          </div>
        </div>

        <div className="relative w-full flex items-center">
          <input 
            type="range" 
            min={min} 
            max={max} 
            value={sliderValue} 
            onChange={(e) => setSliderValue(Number(e.target.value))}
            className="w-full h-12 appearance-none bg-transparent cursor-pointer focus:outline-none touch-none
              [&::-webkit-slider-thumb]:appearance-none 
              [&::-webkit-slider-thumb]:w-8 
              [&::-webkit-slider-thumb]:h-8 
              [&::-webkit-slider-thumb]:bg-kiwi-green 
              [&::-webkit-slider-thumb]:rounded-full 
              [&::-webkit-slider-thumb]:shadow-lg 
              [&::-webkit-slider-thumb]:border-4 
              [&::-webkit-slider-thumb]:border-white
              
              [&::-moz-range-thumb]:w-8 
              [&::-moz-range-thumb]:h-8 
              [&::-moz-range-thumb]:bg-kiwi-green 
              [&::-moz-range-thumb]:border-4 
              [&::-moz-range-thumb]:border-white
              [&::-moz-range-thumb]:rounded-full"
            style={{
              backgroundImage: `linear-gradient(to right, #85c440 0%, #85c440 ${percentage}%, #e5e7eb ${percentage}%, #e5e7eb 100%)`,
              backgroundSize: '100% 8px',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat'
            }}
          />
        </div>
        
        <div className="flex justify-between text-xs text-gray-400 mt-2 font-bold uppercase">
          <span>{labelStart}</span>
          <span>{labelEnd}</span>
        </div>

        <div className="mt-8 flex items-center gap-2 text-sm text-gray-600 bg-gray-50 p-3 rounded border border-gray-100">
          <Check size={16} className="text-kiwi-green" />
          Ajustaremos la dosis ideal para tu cuerpo.
        </div>

        <ContinueButton onClick={nextStep} />
      </div>
    );
  };

  switch (step) {
    case 1:
      return (
        <div>
          <h3 className="text-xl font-bold text-gray-800 mb-2">¿Cuántos kilos deseas perder?</h3>
          <p className="text-sm text-gray-500 mb-6">Con base en tu respuesta, veremos si estás apta para eliminar grasa de forma acelerada.</p>
          <QuizButton onClick={nextStep}>Hasta 5 kg</QuizButton>
          <QuizButton onClick={nextStep}>De 6 a 10 kg</QuizButton>
          <QuizButton onClick={nextStep}>De 11 a 15 kg</QuizButton>
          <QuizButton onClick={nextStep}>De 16 a 20 kg</QuizButton>
          <QuizButton onClick={nextStep}>Más de 20 kg</QuizButton>
        </div>
      );
    case 2:
      return (
        <div>
          <h3 className="text-xl font-bold text-gray-800 mb-6">¿Cómo clasificarías tu cuerpo hoy?</h3>
          <QuizButton onClick={nextStep}>Regular</QuizButton>
          <QuizButton onClick={nextStep}>Flácido</QuizButton>
          <QuizButton onClick={nextStep}>Sobrepeso</QuizButton>
          <QuizButton onClick={nextStep}>Obeso</QuizButton>
        </div>
      );
    case 3:
      return (
        <div>
          <h3 className="text-xl font-bold text-gray-800 mb-6">¿En qué zona de tu cuerpo te gustaría reducir más grasa?</h3>
          <QuizButton onClick={nextStep}>Región de las Caderas</QuizButton>
          <QuizButton onClick={nextStep}>Región de los Muslos</QuizButton>
          <QuizButton onClick={nextStep}>Región del Abdomen (barriga)</QuizButton>
          <QuizButton onClick={nextStep}>Región de los Glúteos</QuizButton>
          <QuizButton onClick={nextStep}>Región de los Brazos</QuizButton>
        </div>
      );
    case 4:
      return (
        <div>
          <h3 className="text-xl font-bold text-gray-800 mb-6">¿Realmente estás feliz con tu apariencia?</h3>
          <QuizButton onClick={nextStep}>No, porque me siento con sobrepeso</QuizButton>
          <QuizButton onClick={nextStep}>Sí, pero sé que puedo mejorar mi salud</QuizButton>
          <QuizButton onClick={nextStep}>No, me gustaría bajar de peso para mejorar mi bienestar</QuizButton>
        </div>
      );
    case 5:
      return (
        <div>
          <h3 className="text-xl font-bold text-gray-800 mb-6">¿Qué es lo que más te impide bajar de peso?</h3>
          <QuizButton onClick={nextStep}>Falta de tiempo – Rutina agitada</QuizButton>
          <QuizButton onClick={nextStep}>Autocontrol – Dificultad para resistir las tentaciones</QuizButton>
          <QuizButton onClick={nextStep}>Finanzas – Considerar que lo saludable es caro</QuizButton>
        </div>
      );
    case 6:
      return (
        <div>
          <h3 className="text-xl font-bold text-gray-800 mb-6">¿Cómo afecta tu peso a tu vida?</h3>
          <QuizButton onClick={nextStep}>Evito tomarme fotos porque me da vergüenza</QuizButton>
          <QuizButton onClick={nextStep}>Mi pareja ya no me mira con deseo como antes</QuizButton>
          <QuizButton onClick={nextStep}>Evito reuniones sociales porque no me siento bien</QuizButton>
          <QuizButton onClick={nextStep}>Ninguna de las opciones</QuizButton>
        </div>
      );
    case 7:
      const benefitsOptions = [
        "Bajar de peso sin esfuerzo y sin efecto rebote",
        "Dormir más profundamente",
        "Tener más energía y disposición durante el día",
        "Aumentar la autoestima y la confianza",
        "Reducir el estrés y la ansiedad"
      ];

      return (
        <div>
          <h3 className="text-xl font-bold text-gray-800 mb-2">¿Cuáles de estos beneficios te gustaría tener?</h3>
          <p className="text-sm text-gray-500 mb-6">Personalizaremos tu receta para maximizar los resultados.</p>
          
          <div className="space-y-3 mb-6">
            {benefitsOptions.map((option, idx) => {
              const isSelected = selectedBenefits.includes(option);
              return (
                <button 
                  key={idx}
                  onClick={() => toggleBenefit(option)}
                  className={`w-full bg-white border ${isSelected ? 'border-kiwi-green ring-1 ring-kiwi-green' : 'border-gray-300'} text-gray-700 font-medium py-3 px-4 rounded-lg shadow-sm hover:bg-gray-50 transition-all text-left flex items-center gap-3 group`}
                >
                  <div className={`w-5 h-5 rounded border ${isSelected ? 'bg-kiwi-green border-kiwi-green' : 'border-gray-300'} flex items-center justify-center transition-colors shrink-0`}>
                    {isSelected && <Check size={14} className="text-white" />}
                  </div>
                  <span className={isSelected ? 'text-kiwi-green font-bold' : ''}>{option}</span>
                </button>
              );
            })}
          </div>

          <ContinueButton onClick={nextStep} />
        </div>
      );
    case 8:
      return (
        <div className="py-2">
          <h3 className="text-xl font-bold text-gray-800 mb-4 text-center leading-tight">
            ¡Conoce la Receta Personalizada de la Gelatina Reductora que está ayudando a celebridades y a miles de mujeres comunes a adelgazar sin gastar una fortuna en farmacia!
          </h3>
          <p className="text-gray-600 text-sm text-center mb-4">
            Esta receta es <span className="font-bold">10 veces más potente</span> que el Mounjaro y el Ozempic juntos...
          </p>
          <p className="text-gray-600 text-sm text-center mb-6">
            Controla tu apetito, acelera tu metabolismo y te ayuda a <span className="underline text-blue-600 font-medium">eliminar grasa de forma rápida y eficaz</span>.
          </p>

          <ContinueButton onClick={nextStep} />

          <div className="my-8 border-t border-gray-200"></div>

          <h3 className="text-xl font-bold text-gray-800 mb-4 text-center uppercase">
            ¿CÓMO FUNCIONA LA RECETA DE LA GELATINA REDUCTORA?
          </h3>

          {/* Image Placeholder */}
          <div className="w-full aspect-square bg-gray-100 rounded-lg flex items-center justify-center mb-6 border-2 border-dashed border-gray-300">
            <div className="text-center text-gray-400 p-4">
              <Camera size={40} className="mx-auto mb-2 opacity-50" />
              <span className="font-bold text-sm">Espacio para Imagen del Ciclo</span>
            </div>
          </div>

          <p className="text-gray-700 text-sm text-center mb-4 leading-relaxed">
            Los componentes de la Receta Personalizada de la Gelatina Reductora siguen actuando mientras duermes, <span className="font-bold">activando tus células quemadoras de grasa</span> y acelerando la producción natural de GLP-1.
          </p>

          <p className="text-gray-700 text-sm text-center mb-6 leading-relaxed">
            Esto mantiene tu metabolismo quemando grasa <span className="font-bold">hasta 10 veces más rápido</span> durante el sueño.
          </p>

          <ContinueButton onClick={nextStep} />
        </div>
      );
    case 9:
      return (
        <div className="py-2">
           <h3 className="text-xl font-bold text-gray-800 mb-6 text-center leading-tight">
             Resultados de quienes ya están usando la Receta Personalizada de la Gelatina Reductora
           </h3>

           {/* Gomita */}
           <div className="mb-6">
             <div className="w-full aspect-[4/3] bg-gray-200 rounded-lg flex items-center justify-center mb-4 text-gray-400 border-2 border-dashed border-gray-300">
               <span className="font-bold text-sm">Foto Antes / Después (Gomita)</span>
             </div>
             <p className="text-gray-700 italic mb-3 text-sm leading-relaxed">
               "Ya había intentado de todo para adelgazar, pero nada funcionaba realmente. Después de empezar a usar la receta de la Gelatina Reductora en mi día a día, perdí 8 kilos en solo 17 días — sin cambiar nada en mi alimentación. Ahora me siento más ligera, más bonita y con una confianza que no sentía desde hacía años."
             </p>
             <div className="font-bold text-gray-900 text-sm">— Gomita / Influenciadora Mexicana</div>
             <div className="flex items-center gap-2 mt-1">
               <div className="flex text-yellow-400 gap-0.5">
                 {[1,2,3,4,5].map(i => <Star key={i} size={12} fill="currentColor" />)}
               </div>
             </div>
           </div>

           <ContinueButton onClick={nextStep} />

           <div className="my-8 border-t border-gray-200"></div>

           {/* Fernanda */}
           <div className="mb-8">
             <div className="w-full aspect-[4/3] bg-gray-200 rounded-lg flex items-center justify-center mb-4 text-gray-400 border-2 border-dashed border-gray-300">
               <span className="font-bold text-sm">Foto Antes / Después (Fernanda)</span>
             </div>
             <p className="text-gray-700 italic mb-3 text-sm leading-relaxed">
               "Después de mi embarazo, mi abdomen no volvía a la normalidad y me sentía muy frustrada. Probé esta receta sin mucha fe, pero los resultados fueron increíbles. En 3 semanas mi vientre está plano y he bajado 9 kilos. ¡Por fin volví a usar mi ropa de antes!"
             </p>
             <div className="font-bold text-gray-900 text-sm">— Fernanda Rodríguez — Ciudad de México</div>
             <div className="flex items-center gap-2 mt-1">
               <div className="flex text-yellow-400 gap-0.5">
                 {[1,2,3,4,5].map(i => <Star key={i} size={12} fill="currentColor" />)}
               </div>
             </div>
           </div>

           {/* Mariana */}
           <div className="mb-6">
             <div className="w-full aspect-[4/3] bg-gray-200 rounded-lg flex items-center justify-center mb-4 text-gray-400 border-2 border-dashed border-gray-300">
               <span className="font-bold text-sm">Foto Antes / Después (Mariana)</span>
             </div>
             <p className="text-gray-700 italic mb-3 text-sm leading-relaxed">
               "Siempre luché con mi peso y me sentía cansada todo el tiempo. Desde que empecé con la receta de la Gelatina Reductora, logré bajar 15 kilos en 2 semanas. No tuve que hacer dietas extremas ni pasar hambre. Hoy tengo más energía, mi ropa me queda mejor y me siento orgullosa de mi misma."
             </p>
             <div className="font-bold text-gray-900 text-sm">— Mariana López - Buenos Aires</div>
             <div className="flex items-center gap-2 mt-1">
               <div className="flex text-yellow-400 gap-0.5">
                 {[1,2,3,4,5].map(i => <Star key={i} size={12} fill="currentColor" />)}
               </div>
             </div>
           </div>

           <ContinueButton onClick={nextStep} />
        </div>
      );
    case 10:
      return (
        <RangeStep 
          title="¿Cuál es tu peso actual?" 
          note="¡Comencemos! Esto nos ayuda a personalizar tu receta."
          min={50} max={150} unit="kg" labelStart="50 kg" labelEnd="150 kg"
        />
      );
    case 11:
      return (
        <RangeStep 
          title="¿Cuál es tu estatura?" 
          note="Calcularemos la dosis exacta de los ingredientes para tu cuerpo."
          min={140} max={200} unit="cm" labelStart="140 cm" labelEnd="200 cm"
        />
      );
    case 12:
      return (
        <RangeStep 
          title="¿Cuál es tu peso objetivo?" 
          note="¡Casi listo! Esto nos ayuda a definir tu meta."
          min={40} max={120} unit="kg" labelStart="40 kg" labelEnd="120 kg"
        />
      );
    case 13:
      return (
        <div>
          <h3 className="text-xl font-bold text-gray-800 mb-2">¿Cuántos vasos de agua bebes al día?</h3>
          <p className="text-sm text-gray-500 mb-6">Tu nivel de hidratación también influye en tu pérdida de peso.</p>
          <QuizButton onClick={nextStep}>Solo bebo café o té</QuizButton>
          <QuizButton onClick={nextStep}>1–2 vasos al día</QuizButton>
          <QuizButton onClick={nextStep}>2–6 vasos al día</QuizButton>
          <QuizButton onClick={nextStep}>Más de 6 vasos</QuizButton>
        </div>
      );
    case 14:
      return <LoadingStep onComplete={nextStep} />;
    case 15:
      return (
        <div className="py-2">
          <div className="flex items-center gap-2 text-red-600 font-bold text-xl mb-4">
            <AlertTriangle size={24} />
            ¡ATENCIÓN!
          </div>
          <p className="text-gray-800 mb-6 leading-relaxed">
            Según tus respuestas, tu cuerpo está en modo <span className="font-bold bg-yellow-100 px-1">ACUMULACIÓN DE GRASA</span>. Si no actúas HOY, esta situación tiende a <span className="font-bold text-red-600">EMPEORAR</span>.
          </p>
          
          {/* BMI Visual */}
          <div className="mb-8 flex flex-col items-center w-full">
            <div className="text-gray-600 text-lg mb-1 font-sans">Tu IMC:</div>
            <div className="text-5xl font-bold text-[#f97316] tracking-tighter">25.7</div>
            
            <div className="w-full relative mt-10 px-1">
                 {/* Pointer Container */}
                 <div className="absolute bottom-full mb-1 flex flex-col items-center transform -translate-x-1/2 transition-all duration-1000" style={{ left: '55%' }}>
                    <span className="text-[#f97316] text-sm font-bold mb-0 leading-none">Tú hoy</span>
                    <div className="w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-[8px] border-t-[#f97316] mt-1"></div>
                 </div>

                 {/* The Bar */}
                 <div className="flex w-full h-8 rounded-lg overflow-hidden text-[10px] md:text-xs font-bold text-white text-center leading-8 shadow-inner">
                    <div className="bg-[#4285F4] flex-1 border-r border-white/20 flex items-center justify-center">Bajo peso</div>
                    <div className="bg-[#34A853] flex-1 border-r border-white/20 flex items-center justify-center">Normal</div>
                    <div className="bg-[#f97316] flex-1 border-r border-white/20 flex items-center justify-center">Sobrepeso</div>
                    <div className="bg-[#EA4335] flex-1 flex items-center justify-center">Obesidad</div>
                 </div>
            </div>
          </div>

          <h4 className="font-bold text-gray-900 mb-2">¡Tus células quemagrasas pueden estar dormidas y saboteando tu metabolismo sin que te des cuenta!</h4>
          <p className="text-sm text-gray-600 mb-4 leading-relaxed">
             Incluso si estás en un peso normal, tu cuerpo podría estar desactivando las células quemagrasas del intestino, lo que ralentiza tu metabolismo.
          </p>

          <div className="space-y-2 mb-6">
            <div className="flex gap-2 items-start text-sm text-gray-700">
               <div className="min-w-1.5 w-1.5 h-1.5 bg-red-500 rounded-full mt-1.5"></div>
               <p>Metabolismo lento y dificultad para adelgazar aunque comas poco</p>
            </div>
            <div className="flex gap-2 items-start text-sm text-gray-700">
               <div className="min-w-1.5 w-1.5 h-1.5 bg-red-500 rounded-full mt-1.5"></div>
               <p>Cansancio constante y sensación de hinchazón</p>
            </div>
            <div className="flex gap-2 items-start text-sm text-gray-700">
               <div className="min-w-1.5 w-1.5 h-1.5 bg-red-500 rounded-full mt-1.5"></div>
               <p>Acumulación de grasa en zonas específicas del cuerpo, especialmente en el abdomen</p>
            </div>
          </div>

          <div className="bg-green-50 border border-green-200 p-4 rounded-lg mb-4">
             <p className="text-sm text-gray-800 font-medium leading-relaxed">
               Con la <span className="text-kiwi-green font-bold">Receta Personalizada de la Gelatina Reductora</span>, tu cuerpo acelera la quema de grasa de forma natural. La combinación ideal de ingredientes puede reactivar las células quemagrasas.
             </p>
          </div>

          <p className="text-center text-gray-600 text-sm font-medium mb-2">Mira la transformación de Rosana.</p>
          <ContinueButton onClick={nextStep} />
        </div>
      );
    case 16:
      return (
        <div className="py-2">
           <h3 className="text-xl font-bold text-gray-800 mb-8 text-center leading-tight">¿Estás lista para transformar tu cuerpo y tu salud?</h3>
           
           <div className="flex items-center justify-center gap-1 mb-8">
             {/* Left Card */}
             <div className="bg-red-50 border border-red-200 p-3 rounded-xl text-center flex-1 min-w-0 shadow-sm h-full flex flex-col justify-between">
                <div className="text-red-500 font-bold text-[10px] mb-3 uppercase tracking-wide leading-tight min-h-[2.5em] flex items-center justify-center">SIN LA RECETA PERSONALIZADA</div>
                <div className="space-y-2 text-[10px] text-gray-600 font-medium">
                   <div className="flex justify-between items-center border-b border-red-100 pb-1">
                      <span>Metabolismo:</span> <span className="font-bold text-red-600">Lento</span>
                   </div>
                   <div className="flex justify-between items-center border-b border-red-100 pb-1">
                      <span>Estrés:</span> <span className="font-bold text-red-600">Alto</span>
                   </div>
                   <div className="flex justify-between items-center border-b border-red-100 pb-1">
                      <span>Energía:</span> <span className="font-bold text-red-600">Bajo</span>
                   </div>
                   <div className="flex justify-between items-center pt-0.5">
                      <span>Riesgo:</span> <span className="font-bold text-red-600">Altísimos</span>
                   </div>
                </div>
             </div>
             
             {/* Arrow */}
             <div className="text-gray-400 shrink-0 z-10 -mx-1">
               <ArrowRight size={24} />
             </div>
             
             {/* Right Card */}
             <div className="bg-white border-2 border-[#8CC63F] p-3 rounded-xl text-center shadow-lg flex-1 min-w-0 transform scale-105 z-0 h-full flex flex-col justify-between">
                <div className="text-[#8CC63F] font-bold text-[10px] mb-3 uppercase tracking-wide leading-tight min-h-[2.5em] flex items-center justify-center">CON LA RECETA PERSONALIZADA</div>
                <div className="space-y-2 text-[10px] text-gray-600 font-medium">
                   <div className="flex justify-between items-center border-b border-gray-100 pb-1">
                      <span>Metabolismo:</span> <span className="font-bold text-[#8CC63F]">Acelerado</span>
                   </div>
                   <div className="flex justify-between items-center border-b border-gray-100 pb-1">
                      <span>Estrés:</span> <span className="font-bold text-[#8CC63F]">Bajo</span>
                   </div>
                   <div className="flex justify-between items-center border-b border-gray-100 pb-1">
                      <span>Energía:</span> <span className="font-bold text-[#8CC63F]">Fuerte</span>
                   </div>
                   <div className="flex justify-between items-center pt-0.5">
                      <span>Riesgo:</span> <span className="font-bold text-[#8CC63F]">Muy bajo</span>
                   </div>
                </div>
             </div>
           </div>

           <p className="text-center text-gray-600 mb-4 text-sm font-medium">
             Haz clic en el botón de abajo para recibir tu Receta Personalizada
           </p>

           <button 
             onClick={nextStep}
             className="w-full bg-kiwi-green text-white font-bold py-3 px-4 rounded-lg shadow-md hover:bg-kiwi-dark-green transition-all mt-4 flex items-center justify-center gap-2 uppercase text-sm"
           >
             ACCEDER A LA RECETA PERSONALIZADA <ArrowRight size={20} />
           </button>
        </div>
      );
    case 17:
      return (
        <div className="py-4 text-center">
           <h3 className="text-lg font-bold text-gray-800 mb-4 uppercase leading-snug">
            MIRA ESTE VIDEO DONDE LA DRA. PATRICIA FERNANDEZ EXPLICA CÓMO USAR TU RECETA
           </h3>
           <div className="w-full aspect-video bg-black rounded-lg flex items-center justify-center relative overflow-hidden shadow-lg group cursor-pointer">
              <img src="https://picsum.photos/800/450?random=8" className="w-full h-full object-cover opacity-60" alt="Video thumbnail" />
              <div className="absolute inset-0 flex items-center justify-center">
                 <PlayCircle size={64} className="text-white fill-kiwi-green group-hover:scale-110 transition-transform" />
              </div>
           </div>
           <div className="mt-6 bg-yellow-50 border border-yellow-200 p-4 rounded-lg text-sm text-yellow-800">
             <p className="font-bold">¡Importante!</p>
             <p>Ve el video completo para liberar tu receta personalizada.</p>
           </div>
        </div>
      );
    default:
      return null;
  }
};

const Ingredients = ({ isQuizActive, onStartQuiz }: { isQuizActive: boolean, onStartQuiz: () => void }) => {
  const [servings, setServings] = useState(4);
  const [step, setStep] = useState(1);
  const totalSteps = 17; // Updated from 16 to 17
  
  // Dynamic progress logic:
  // Using power 0.8 provides a smoother curve that is less aggressive at start than sqrt (0.5).
  // Step 1 starts around 18-19% instead of nearly 40%.
  // Decelerates as steps increase.
  const ratio = step / totalSteps;
  const progressPercent = Math.min(100, Math.round(10 + 90 * Math.pow(ratio, 0.8)));

  // Expanded list to create background texture
  const ingredients = [
    { name: "1 taza de yoghurt estilo griego Fage® Total 0%" },
    { name: "90 gramos de mantequilla sin sal" },
    { name: "1 cucharada de vinagre" },
    { name: "1 cucharada de azúcar mascabado" },
    { name: "1 cucharada de cayena" },
    { name: "1/2 taza de agua purificada" },
    { name: "2 sobres de grenetina natural" },
    { name: "Jugo de 1 limón fresco" }
  ];

  return (
    <div className="bg-white px-4 py-6 relative">
      <div className="border-b border-gray-100 pb-2 mb-6">
        <div className="flex justify-between items-end">
          <h2 className="text-2xl font-serif italic text-gray-800">
            Ingredientes
          </h2>
          {/* Always Visible Measurements */}
          <div className="flex items-center gap-4 text-gray-500 text-xs">
            <div className="flex flex-col items-center">
              <Ruler size={20} className="mb-1" />
              <span>Medidas</span>
            </div>
            <div className="flex flex-col items-center">
              <div className="font-bold text-xl leading-none mb-1 text-gray-700">{servings}</div>
              <span>Porciones</span>
            </div>
          </div>
        </div>
        
        {isQuizActive && (
          <div className="mt-3 flex items-center justify-between gap-3 animate-fade-in">
             <span className="text-gray-500 font-sans text-sm font-medium whitespace-nowrap">Personalizando tu receta</span>
             <div className="flex-1 h-3 bg-gray-100 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-kiwi-green transition-all duration-700 ease-out"
                  style={{ width: `${progressPercent}%` }}
                ></div>
             </div>
          </div>
        )}
      </div>

      <div className="relative min-h-[300px]">
        {isQuizActive ? (
          <QuizFlow step={step} nextStep={() => setStep(s => s + 1)} onComplete={() => {}} />
        ) : (
          <>
            {/* Blurred Ingredients List */}
            <div className="filter blur-[2px] select-none opacity-80 pointer-events-none">
              <div className="flex items-center gap-3 mb-4 py-2">
                <div className="w-6 h-6 rounded-full border border-gray-400"></div>
                <span className="text-gray-900 italic font-medium">Seleccionar todos los ingredientes</span>
              </div>

              <div className="space-y-4">
                {ingredients.map((ing, idx) => (
                  <div key={idx} className="flex items-center gap-3">
                     <div className="w-6 h-6 rounded-full border border-gray-400 flex-shrink-0 bg-gray-100"></div>
                     <span className="text-gray-900 font-medium text-sm leading-tight flex-1">{ing.name}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Overlay Card */}
            <div className="absolute inset-0 z-10 flex items-center justify-center p-4">
              <div className="bg-white rounded-xl shadow-2xl border-2 border-gray-100 p-6 max-w-sm w-full text-center transform transition-transform">
                <p className="text-gray-700 text-sm font-sans mb-4 leading-relaxed">
                  <span className="font-bold text-gray-900">Atención:</span> Las cantidades de los ingredientes de esta receta deben personalizarse para cada tipo de cuerpo y rutina para un máximo efecto adelgazante.
                </p>
                <p className="text-gray-500 text-xs mb-5 font-medium">
                  Haz clic abajo y personalizaremos tu receta exclusiva.
                </p>
                <button 
                  onClick={onStartQuiz}
                  className="bg-kiwi-green hover:bg-kiwi-dark-green text-white font-bold py-3 px-4 rounded w-full flex items-center justify-center gap-2 transition-colors uppercase text-sm shadow-md"
                >
                  PERSONALIZAR MI RECETA <ChevronRight size={16} strokeWidth={3} />
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

const Preparation = () => (
  <div className="bg-white px-4 py-6 mt-4">
    <div className="flex flex-wrap justify-between items-center mb-6 border-b border-gray-100 pb-2">
      <h2 className="text-2xl font-serif italic text-gray-800">Preparación</h2>
      <div className="flex items-center gap-3 text-xs text-gray-500">
        <div className="flex items-center gap-1"><ChefHat size={16} /> 20 mins</div>
        <span>|</span>
        <div className="flex items-center gap-1"><Clock size={16} /> 5 mins</div>
        <span>|</span>
        <div className="flex items-center gap-1"><BarChart size={16} className="rotate-90" /> Baja</div>
      </div>
    </div>

    {/* Locked Content - Compacted */}
    <div className="bg-[#f2f2f2] rounded-lg py-6 px-4 flex flex-col items-center justify-center text-center text-gray-500 border border-gray-200">
      <div className="mb-2 text-gray-400">
        <Lock size={20} />
      </div>
      <p className="text-sm font-medium leading-snug max-w-[280px]">
        Personaliza tu receta en el botón de arriba para ver la preparación.
      </p>
    </div>
  </div>
);

const CommentsSection = () => {
  const [visibleCount, setVisibleCount] = useState(3);

  const commentsData = [
    {
      id: 1,
      name: "Susana Pérez",
      initial: "S",
      color: "bg-green-500",
      time: "Hace 4 horas",
      content: "Sabe muy rica, nada que ver con otros remedios que saben feo. ¡Me encantó!",
      likes: 89,
    },
    {
      id: 2,
      name: "Claudia Rodríguez",
      initial: "C",
      color: "bg-purple-500",
      time: "Hace 5 horas",
      content: "Me siento mucho más desinflamada del abdomen. Gracias Dra. Patricia por compartir.",
      likes: 210,
    },
    {
      id: 3,
      name: "Patsy López",
      initial: "P",
      color: "bg-red-500",
      time: "Hace 1 dia",
      content: "¿Se puede tomar en la noche? A mí me funcionó de maravilla en ayunas.",
      likes: 56,
    },
    {
      id: 4,
      name: "Lupita Martinez",
      initial: "L",
      color: "bg-orange-500",
      time: "Hace 1 día",
      content: "100% recomendada. Fácil de preparar y los ingredientes son sencillos.",
      likes: 112,
    },
    {
      id: 5,
      name: "Mariana Costa",
      initial: "M",
      color: "bg-blue-500",
      time: "Hace 1 día",
      content: "Tenía miedo de que fuera difícil de seguir con el trabajo, pero me llevo la gelatina en un tupper y listo.",
      likes: 45,
    },
    {
      id: 6,
      name: "Fernanda G.",
      initial: "F",
      color: "bg-pink-500",
      time: "Hace 2 días",
      content: "Yo pensé que era puro cuento, pero mi ropa ya me queda más floja. ¡Gracias por compartir!",
      likes: 78,
    },
    {
      id: 7,
      name: "Roberto Méndez",
      initial: "R",
      color: "bg-teal-500",
      time: "Hace 2 días",
      content: "A mi esposa le encantó el sabor y ya se nota el cambio. La preparamos juntos.",
      likes: 33,
    },
    {
      id: 8,
      name: "Ana S.",
      initial: "A",
      color: "bg-indigo-500",
      time: "Hace 2 días",
      content: "¿Alguien sabe si los niños pueden probarla? Se ve deliciosa.",
      likes: 12,
    },
    {
      id: 9,
      name: "Carmen Ruiz",
      initial: "C",
      color: "bg-indigo-600",
      time: "Hace 3 días",
      content: "Excelente receta, muy fácil de seguir y efectiva.",
      likes: 15,
    },
  ];

  return (
    <div className="bg-white px-4 py-6 mt-4 pb-20">
      <div className="flex justify-between items-center mb-6 border-b border-gray-100 pb-2">
        <h2 className="text-2xl font-serif italic text-gray-800">Comentarios</h2>
        <div className="flex items-center gap-1 text-xs text-gray-500">
           <span className="font-bold">5.0</span>
           <Star size={12} className="text-kiwi-green fill-current" />
           <span>(3958)</span>
        </div>
      </div>

      <div className="space-y-6">
        {commentsData.slice(0, visibleCount).map((comment) => (
          <div key={comment.id} className="flex gap-4">
            <div className={`w-10 h-10 rounded-full ${comment.color} flex items-center justify-center text-white font-bold shrink-0 text-sm`}>
              {comment.initial}
            </div>
            <div className="flex-1">
              <div className="flex justify-between items-start mb-1">
                <span className="font-bold text-gray-900 text-sm">{comment.name}</span>
                <span className="text-xs text-gray-400">{comment.time}</span>
              </div>
              <p className="text-gray-700 text-sm leading-relaxed mb-2">
                {comment.content}
              </p>
              <div className="flex items-center gap-4 text-xs text-gray-400 font-medium">
                <button className="flex items-center gap-1 hover:text-kiwi-green transition-colors">
                  <ThumbsUp size={14} /> 
                  <span>Útil ({comment.likes})</span>
                </button>
                <button className="flex items-center gap-1 hover:text-kiwi-green transition-colors">
                  <MessageSquare size={14} />
                  <span>Responder</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {visibleCount < commentsData.length && (
        <button 
          onClick={() => setVisibleCount(prev => Math.min(prev + 3, commentsData.length))}
          className="w-full py-3 mt-6 text-kiwi-green font-bold text-sm border border-kiwi-green rounded-lg hover:bg-green-50 transition-colors uppercase"
        >
          Ver más comentarios
        </button>
      )}
    </div>
  );
};

const App = () => {
  const [isQuizActive, setIsQuizActive] = useState(false);

  return (
    <div className="min-h-screen bg-[#f4f4f4] max-w-md mx-auto shadow-2xl overflow-hidden font-sans">
      {!isQuizActive && <Header />}
      <div className="pb-20">
        {!isQuizActive && (
          <>
            <Breadcrumbs />
            <RecipeTitle />
            <MediaSection />
          </>
        )}
        <RatingBar />
        <Ingredients isQuizActive={isQuizActive} onStartQuiz={() => setIsQuizActive(true)} />
        <Preparation />
        <CommentsSection />
      </div>
    </div>
  );
};

export default App;