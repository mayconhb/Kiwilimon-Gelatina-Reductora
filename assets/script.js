(function() {
    console.log("App script starting...");

    // --- State Management ---
    const state = {
        step: 1,
        sliderValue: 50,
        selectedBenefits: [],
        visibleComments: 3,
        isQuizActive: false,
        totalSteps: 17
    };

    // --- Data ---
    const commentsData = [
        { id: 1, name: "Susana Pérez", initial: "S", color: "bg-green-500", time: "Hace 4 horas", content: "Sabe muy rica, nada que ver con otros remedios que saben feo. ¡Me encantó!", likes: 89 },
        { id: 2, name: "Claudia Rodríguez", initial: "C", color: "bg-purple-500", time: "Hace 5 horas", content: "Me siento mucho más desinflamada del abdomen. Gracias Dra. Patricia por compartir.", likes: 210 },
        { id: 3, name: "Patsy López", initial: "P", color: "bg-red-500", time: "Hace 1 dia", content: "¿Se puede tomar en la noche? A mí me funcionó de maravilla en ayunas.", likes: 56 },
        { id: 4, name: "Lupita Martinez", initial: "L", color: "bg-orange-500", time: "Hace 1 día", content: "100% recomendada. Fácil de preparar y los ingredientes son sencillos.", likes: 112 },
        { id: 5, name: "Mariana Costa", initial: "M", color: "bg-blue-500", time: "Hace 1 día", content: "Tenía miedo de que fuera difícil de seguir con el trabajo, pero me llevo la gelatina en un tupper y listo.", likes: 45 },
        { id: 6, name: "Fernanda G.", initial: "F", color: "bg-pink-500", time: "Hace 2 días", content: "Yo pensé que era puro cuento, pero mi ropa ya me queda más floja. ¡Gracias por compartir!", likes: 78 },
        { id: 7, name: "Roberto Méndez", initial: "R", color: "bg-teal-500", time: "Hace 2 días", content: "A mi esposa le encantó el sabor y ya se nota el cambio. La preparamos juntos.", likes: 33 },
        { id: 8, name: "Ana S.", initial: "A", color: "bg-indigo-500", time: "Hace 2 días", content: "¿Alguien sabe si los niños pueden probarla? Se ve deliciosa.", likes: 12 },
        { id: 9, name: "Carmen Ruiz", initial: "C", color: "bg-indigo-600", time: "Hace 3 días", content: "Excelente receta, muy fácil de seguir y efectiva.", likes: 15 },
    ];

    // --- Icons ---
    const icons = {
        chevronRight: `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-gray-300 group-hover:text-kiwi-green"><path d="m9 18 6-6-6-6"/></svg>`,
        arrowRight: `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>`,
        check: `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-kiwi-green"><polyline points="20 6 9 17 4 12"/></svg>`,
        checkWhite: `<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-white"><polyline points="20 6 9 17 4 12"/></svg>`,
        camera: `<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="mx-auto mb-2 opacity-50"><path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z"/><circle cx="12" cy="13" r="3"/></svg>`,
        star: `<svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>`,
        alertTriangle: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/><line x1="12" x2="12" y1="9" y2="13"/><line x1="12" x2="12.01" y1="17" y2="17"/></svg>`,
        thumbsUp: `<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M7 10v12"/><path d="M15 5.88 14 10h5.83a2 2 0 0 1 1.92 2.56l-2.33 8A2 2 0 0 1 17.5 22H4a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2h2.76a2 2 0 0 0 1.79-1.11L12 2h0a3.13 3.13 0 0 1 3 3.88Z"/></svg>`,
        messageSquare: `<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>`,
        loader: `<svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-kiwi-green animate-spin"><path d="M21 12a9 9 0 1 1-6.219-8.56"/></svg>`,
        playCircle: `<svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-white fill-kiwi-green group-hover:scale-110 transition-transform"><circle cx="12" cy="12" r="10"/><polygon points="10 8 16 12 10 16 10 8"/></svg>`
    };

    let dom = {};

    // --- Core Functions (Hoisted) ---

    // We assign these to window so HTML inline onclick handlers can find them.
    window.startQuiz = function() {
        console.log("startQuiz called");
        state.isQuizActive = true;
        if(dom.staticTop) dom.staticTop.style.display = 'none';
        if(dom.staticIngredients) dom.staticIngredients.style.display = 'none';
        if(dom.quizContainer) {
            dom.quizContainer.classList.remove('hidden');
            dom.quizContainer.style.display = 'block'; // Force display
        }
        if(dom.progressContainer) {
            dom.progressContainer.classList.remove('hidden');
            dom.progressContainer.style.display = 'flex'; // Force display
        }
        window.scrollTo({ top: 0, behavior: 'smooth' });
        renderStep();
    };

    window.nextStep = function() {
        if (state.step < state.totalSteps) {
            state.step++;
            updateProgress();
            renderStep();
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    };

    window.goToVideoPage = function() {
        state.step = 17;
        state.isQuizActive = true;
        if(dom.staticTop) dom.staticTop.style.display = 'none';
        if(dom.staticIngredients) dom.staticIngredients.style.display = 'none';
        if(dom.quizContainer) {
            dom.quizContainer.classList.remove('hidden');
            dom.quizContainer.style.display = 'block';
        }
        if(dom.progressContainer) {
            dom.progressContainer.classList.remove('hidden');
            dom.progressContainer.style.display = 'flex';
        }
        updateProgress();
        renderStep();
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    window.toggleBenefit = function(btn, option) {
        if (state.selectedBenefits.includes(option)) {
            state.selectedBenefits = state.selectedBenefits.filter(b => b !== option);
        } else {
            state.selectedBenefits.push(option);
        }
        renderStep(); 
    };
    
    // --- Rendering Logic ---

    function updateProgress() {
        if (!dom.progressBar) return;
        const ratio = state.step / state.totalSteps;
        const progressPercent = Math.min(100, Math.round(10 + 90 * Math.pow(ratio, 0.8)));
        dom.progressBar.style.width = `${progressPercent}%`;
    }

    function renderStep() {
        const container = dom.quizContainer;
        if (!container) return;
        
        container.innerHTML = ''; 

        if (state.step === 10) state.sliderValue = 70;
        if (state.step === 11) state.sliderValue = 165;
        if (state.step === 12) state.sliderValue = 60;

        let content = '';

        switch(state.step) {
            case 1:
                content = `
                    <h3 class="text-xl font-bold text-gray-800 mb-2">¿Cuántos kilos deseas perder?</h3>
                    <p class="text-sm text-gray-500 mb-6">Con base en tu respuesta, veremos si estás apta para eliminar grasa de forma acelerada.</p>
                    ${renderQuizButton('Hasta 5 kg')}
                    ${renderQuizButton('De 6 a 10 kg')}
                    ${renderQuizButton('De 11 a 15 kg')}
                    ${renderQuizButton('De 16 a 20 kg')}
                    ${renderQuizButton('Más de 20 kg')}
                `;
                break;
            case 2:
                content = `
                    <h3 class="text-xl font-bold text-gray-800 mb-6">¿Cómo clasificarías tu cuerpo hoy?</h3>
                    ${renderQuizButton('Regular')}
                    ${renderQuizButton('Flácido')}
                    ${renderQuizButton('Sobrepeso')}
                    ${renderQuizButton('Obeso')}
                `;
                break;
            case 3:
                content = `
                    <h3 class="text-xl font-bold text-gray-800 mb-6">¿En qué zona de tu cuerpo te gustaría reducir más grasa?</h3>
                    ${renderQuizButton('Región de las Caderas')}
                    ${renderQuizButton('Región de los Muslos')}
                    ${renderQuizButton('Región del Abdomen (barriga)')}
                    ${renderQuizButton('Región de los Glúteos')}
                    ${renderQuizButton('Región de los Brazos')}
                `;
                break;
            case 4:
                content = `
                    <h3 class="text-xl font-bold text-gray-800 mb-6">¿Realmente estás feliz con tu apariencia?</h3>
                    ${renderQuizButton('No, porque me siento con sobrepeso')}
                    ${renderQuizButton('Sí, pero sé que puedo mejorar mi salud')}
                    ${renderQuizButton('No, me gustaría bajar de peso para mejorar mi bienestar')}
                `;
                break;
            case 5:
                content = `
                    <h3 class="text-xl font-bold text-gray-800 mb-6">¿Qué es lo que más te impide bajar de peso?</h3>
                    ${renderQuizButton('Falta de tiempo – Rutina agitada')}
                    ${renderQuizButton('Autocontrol – Dificultad para resistir las tentaciones')}
                    ${renderQuizButton('Finanzas – Considerar que lo saludable es caro')}
                `;
                break;
            case 6:
                content = `
                    <h3 class="text-xl font-bold text-gray-800 mb-6">¿Cómo afecta tu peso a tu vida?</h3>
                    ${renderQuizButton('Evito tomarme fotos porque me da vergüenza')}
                    ${renderQuizButton('Mi pareja ya no me mira con deseo como antes')}
                    ${renderQuizButton('Evito reuniones sociales porque no me siento bien')}
                    ${renderQuizButton('Ninguna de las opciones')}
                `;
                break;
            case 7:
                content = renderBenefitsStep();
                break;
            case 8:
                content = `
                    <div class="py-2">
                        <h3 class="text-xl font-bold text-gray-800 mb-4 text-center leading-tight">
                            ¡Conoce la Receta Personalizada de la Gelatina Reductora que está ayudando a celebridades y a miles de mujeres comunes a adelgazar sin gastar una fortuna en farmacia!
                        </h3>
                        <p class="text-gray-600 text-sm text-center mb-4">
                            Esta receta es <span class="font-bold">10 veces más potente</span> que el Mounjaro y el Ozempic juntos...
                        </p>
                        <p class="text-gray-600 text-sm text-center mb-6">
                            Controla tu apetito, acelera tu metabolismo y te ayuda a <span class="underline text-blue-600 font-medium">eliminar grasa de forma rápida y eficaz</span>.
                        </p>
                        ${renderContinueButton()}
                        <div class="my-8 border-t border-gray-200"></div>
                        <h3 class="text-xl font-bold text-gray-800 mb-4 text-center uppercase">
                            ¿CÓMO FUNCIONA LA RECETA DE LA GELATINA REDUCTORA?
                        </h3>
                        <div class="w-full mb-6">
                            <img src="assets/media/protocolo-gelatina.png" alt="Cómo funciona la Gelatina Reductora" class="w-full rounded-lg">
                        </div>
                        <p class="text-gray-700 text-sm text-center mb-4 leading-relaxed">
                            Los componentes de la Receta Personalizada de la Gelatina Reductora siguen actuando mientras duermes, <span class="font-bold">activando tus células quemadoras de grasa</span> y acelerando la producción natural de GLP-1.
                        </p>
                        <p class="text-gray-700 text-sm text-center mb-6 leading-relaxed">
                            Esto mantiene tu metabolismo quemando grasa <span class="font-bold">hasta 10 veces más rápido</span> durante el sueño.
                        </p>
                        ${renderContinueButton()}
                    </div>
                `;
                break;
            case 9:
                content = renderTestimonialsStep();
                break;
            case 10:
                content = renderRangeStep("¿Cuál es tu peso actual?", "¡Comencemos! Esto nos ayuda a personalizar tu receta.", 50, 150, "kg", "50 kg", "150 kg");
                break;
            case 11:
                content = renderRangeStep("¿Cuál es tu estatura?", "Calcularemos la dosis exacta de los ingredientes para tu cuerpo.", 140, 200, "cm", "140 cm", "200 cm");
                break;
            case 12:
                content = renderRangeStep("¿Cuál es tu peso objetivo?", "¡Casi listo! Esto nos ayuda a definir tu meta.", 40, 120, "kg", "40 kg", "120 kg");
                break;
            case 13:
                content = `
                    <div>
                        <h3 class="text-xl font-bold text-gray-800 mb-2">¿Cuántos vasos de agua bebes al día?</h3>
                        <p class="text-sm text-gray-500 mb-6">Tu nivel de hidratación también influye en tu pérdida de peso.</p>
                        ${renderQuizButton('Solo bebo café o té')}
                        ${renderQuizButton('1–2 vasos al día')}
                        ${renderQuizButton('2–6 vasos al día')}
                        ${renderQuizButton('Más de 6 vasos')}
                    </div>
                `;
                break;
            case 14:
                content = renderLoadingStep();
                break;
            case 15:
                content = `
                    <div class="py-2">
                        <div class="flex items-center gap-2 text-red-600 font-bold text-xl mb-4">
                            ${icons.alertTriangle}
                            ¡ATENCIÓN!
                        </div>
                        <p class="text-gray-800 mb-6 leading-relaxed">
                            Según tus respuestas, tu cuerpo está en modo <span class="font-bold bg-yellow-100 px-1">ACUMULACIÓN DE GRASA</span>. Si no actúas HOY, esta situación tiende a <span class="font-bold text-red-600">EMPEORAR</span>.
                        </p>
                        
                        <div class="mb-8 flex flex-col items-center w-full">
                            <div class="text-gray-600 text-lg mb-1 font-sans">Tu IMC:</div>
                            <div class="text-5xl font-bold text-[#f97316] tracking-tighter">25.7</div>
                            
                            <div class="w-full relative mt-10 px-1">
                                <div class="absolute bottom-full mb-1 flex flex-col items-center transform -translate-x-1/2 transition-all duration-1000" style="left: 55%">
                                    <span class="text-[#f97316] text-sm font-bold mb-0 leading-none">Tú hoy</span>
                                    <div class="w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-[8px] border-t-[#f97316] mt-1"></div>
                                </div>

                                <div class="flex w-full h-8 rounded-lg overflow-hidden text-[10px] md:text-xs font-bold text-white text-center leading-8 shadow-inner">
                                    <div class="bg-[#4285F4] flex-1 border-r border-white/20 flex items-center justify-center">Bajo peso</div>
                                    <div class="bg-[#34A853] flex-1 border-r border-white/20 flex items-center justify-center">Normal</div>
                                    <div class="bg-[#f97316] flex-1 border-r border-white/20 flex items-center justify-center">Sobrepeso</div>
                                    <div class="bg-[#EA4335] flex-1 flex items-center justify-center">Obesidad</div>
                                </div>
                            </div>
                        </div>

                        <h4 class="font-bold text-gray-900 mb-2">¡Tus células quemagrasas pueden estar dormidas y saboteando tu metabolismo sin que te des cuenta!</h4>
                        <p class="text-sm text-gray-600 mb-4 leading-relaxed">
                        Incluso si estás en un peso normal, tu cuerpo podría estar desactivando las células quemagrasas del intestino, lo que ralentiza tu metabolismo.
                        </p>

                        <div class="space-y-2 mb-6">
                            <div class="flex gap-2 items-start text-sm text-gray-700">
                            <div class="min-w-1.5 w-1.5 h-1.5 bg-red-500 rounded-full mt-1.5"></div>
                            <p>Metabolismo lento y dificultad para adelgazar aunque comas poco</p>
                            </div>
                            <div class="flex gap-2 items-start text-sm text-gray-700">
                            <div class="min-w-1.5 w-1.5 h-1.5 bg-red-500 rounded-full mt-1.5"></div>
                            <p>Cansancio constante y sensación de hinchazón</p>
                            </div>
                            <div class="flex gap-2 items-start text-sm text-gray-700">
                            <div class="min-w-1.5 w-1.5 h-1.5 bg-red-500 rounded-full mt-1.5"></div>
                            <p>Acumulación de grasa en zonas específicas del cuerpo, especialmente en el abdomen</p>
                            </div>
                        </div>

                        <div class="bg-green-50 border border-green-200 p-4 rounded-lg mb-4">
                            <p class="text-sm text-gray-800 font-medium leading-relaxed">
                            Con la <span class="text-kiwi-green font-bold">Receta Personalizada de la Gelatina Reductora</span>, tu cuerpo acelera la quema de grasa de forma natural. La combinación ideal de ingredientes puede reactivar las células quemagrasas.
                            </p>
                        </div>

                        <h3 class="text-xl font-bold text-gray-800 mb-4 text-center uppercase">Mira la transformación de Rosana</h3>
                        <div class="w-full mb-6">
                            <img src="assets/media/resultado-rosana.webp" alt="Transformación de Rosana - Antes y Después" class="w-full rounded-lg">
                        </div>
                        ${renderContinueButton()}
                    </div>
                `;
                break;
            case 16:
                content = `
                    <div class="py-2">
                    <h3 class="text-xl font-bold text-gray-800 mb-6 text-center leading-tight">¿Estás lista para transformar tu cuerpo y tu salud?</h3>
                    
                    <div class="w-full mb-6">
                        <img src="assets/media/resultado-nereide.webp" alt="Transformación - Antes y Después" class="w-full rounded-lg">
                    </div>
                    
                    <div class="flex items-center justify-center gap-1 mb-8">
                        <div class="bg-red-50 border border-red-200 p-3 rounded-xl text-center flex-1 min-w-0 shadow-sm h-full flex flex-col justify-between">
                            <div class="text-red-500 font-bold text-[10px] mb-3 uppercase tracking-wide leading-tight min-h-[2.5em] flex items-center justify-center">SIN LA RECETA PERSONALIZADA</div>
                            <div class="space-y-2 text-[10px] text-gray-600 font-medium">
                            <div class="flex justify-between items-center border-b border-red-100 pb-1">
                                <span>Metabolismo:</span> <span class="font-bold text-red-600">Lento</span>
                            </div>
                            <div class="flex justify-between items-center border-b border-red-100 pb-1">
                                <span>Estrés:</span> <span class="font-bold text-red-600">Alto</span>
                            </div>
                            <div class="flex justify-between items-center border-b border-red-100 pb-1">
                                <span>Energía:</span> <span class="font-bold text-red-600">Bajo</span>
                            </div>
                            <div class="flex justify-between items-center pt-0.5">
                                <span>Riesgo:</span> <span class="font-bold text-red-600">Altísimos</span>
                            </div>
                            </div>
                        </div>
                        
                        <div class="text-gray-400 shrink-0 z-10 -mx-1">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
                        </div>
                        
                        <div class="bg-white border-2 border-[#8CC63F] p-3 rounded-xl text-center shadow-lg flex-1 min-w-0 transform scale-105 z-0 h-full flex flex-col justify-between">
                            <div class="text-[#8CC63F] font-bold text-[10px] mb-3 uppercase tracking-wide leading-tight min-h-[2.5em] flex items-center justify-center">CON LA RECETA PERSONALIZADA</div>
                            <div class="space-y-2 text-[10px] text-gray-600 font-medium">
                            <div class="flex justify-between items-center border-b border-gray-100 pb-1">
                                <span>Metabolismo:</span> <span class="font-bold text-[#8CC63F]">Acelerado</span>
                            </div>
                            <div class="flex justify-between items-center border-b border-gray-100 pb-1">
                                <span>Estrés:</span> <span class="font-bold text-[#8CC63F]">Bajo</span>
                            </div>
                            <div class="flex justify-between items-center border-b border-gray-100 pb-1">
                                <span>Energía:</span> <span class="font-bold text-[#8CC63F]">Fuerte</span>
                            </div>
                            <div class="flex justify-between items-center pt-0.5">
                                <span>Riesgo:</span> <span class="font-bold text-[#8CC63F]">Muy bajo</span>
                            </div>
                            </div>
                        </div>
                    </div>

                    <p class="text-center text-gray-600 mb-4 text-sm font-medium">
                        Haz clic en el botón de abajo para recibir tu Receta Personalizada
                    </p>

                    <button onclick="nextStep()" class="w-full bg-kiwi-green text-white font-bold py-3 px-4 rounded-lg shadow-md hover:bg-kiwi-dark-green transition-all mt-4 flex items-center justify-center gap-2 uppercase text-sm">
                        ACCEDER A LA RECETA PERSONALIZADA ${icons.arrowRight}
                    </button>
                    </div>
                `;
                break;
            case 17:
                content = `
                    <div class="py-4 text-center">
                    <h3 class="text-lg font-bold text-gray-800 mb-4 uppercase leading-snug">
                        MIRA ESTE VIDEO DONDE LA DRA. PATRICIA FERNANDEZ EXPLICA CÓMO USAR TU RECETA
                    </h3>
                    <div id="ifr_69432bd756803cfbd7054996_wrapper" style="margin: 0 auto; width: 100%; max-width: 400px;">
                        <div style="position: relative; padding: 152.59259259259258% 0 0 0;" id="ifr_69432bd756803cfbd7054996_aspect">
                            <iframe frameborder="0" allowfullscreen src="about:blank" id="ifr_69432bd756803cfbd7054996" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;" referrerpolicy="origin" onload="this.onload=null, this.src='https://scripts.converteai.net/32feb844-35ec-4ff2-a2f5-d9b02098dece/players/69432bd756803cfbd7054996/v4/embed.html'+(location.search||'?')+'&vl='+encodeURIComponent(location.href)"></iframe>
                        </div>
                    </div>
                    <a id="cta-button" href="https://pay.hotmart.com/I103092154N?off=8pqi3d4c&checkoutMode=10" class="mt-6 w-full bg-kiwi-green text-white font-bold py-3 px-4 rounded-lg shadow-md hover:bg-kiwi-dark-green transition-all flex items-center justify-center gap-2 uppercase text-sm" style="display:none;">
                        ACCEDER A LA RECETA PERSONALIZADA ${icons.arrowRight}
                    </a>
                    </div>
                `;
                break;
        }

        container.innerHTML = content;

        if (state.step >= 10 && state.step <= 12) {
            setupRangeSlider();
        }
        if (state.step === 14) {
            setupLoadingLogic();
        }
        if (state.step === 17) {
            let buttonShown = false;
            let accumulatedWatchTime = 0;
            let lastUpdateTime = null;
            let isPlaying = false;
            
            window.addEventListener('message', function handleVturbMessage(event) {
                if (buttonShown) return;
                
                try {
                    const data = typeof event.data === 'string' ? JSON.parse(event.data) : event.data;
                    
                    // Detectar eventos de play/pause da VTurb
                    if (data.type === 'play' || data.type === 'playing' || data.event === 'play' || data.event === 'playing') {
                        isPlaying = true;
                        lastUpdateTime = Date.now();
                        console.log('VTurb: Video started playing');
                    }
                    
                    if (data.type === 'pause' || data.event === 'pause') {
                        isPlaying = false;
                        lastUpdateTime = null;
                        console.log('VTurb: Video paused. Total watched:', accumulatedWatchTime.toFixed(1), 's');
                    }
                    
                    // Evento de timeupdate - acumular tempo apenas se o vídeo está tocando
                    if (data.type === 'videoTimeUpdate' && data.payload) {
                        const now = Date.now();
                        
                        // Se não sabemos se está tocando, assumir que está (para retrocompatibilidade)
                        if (lastUpdateTime === null) {
                            isPlaying = true;
                            lastUpdateTime = now;
                            console.log('VTurb: First timeupdate, assuming video is playing');
                        }
                        
                        // Acumular tempo apenas se o vídeo está tocando
                        if (isPlaying && lastUpdateTime !== null) {
                            const elapsed = (now - lastUpdateTime) / 1000;
                            // Limitar a incrementos razoáveis (máximo 1 segundo por update)
                            if (elapsed > 0 && elapsed < 2) {
                                accumulatedWatchTime += elapsed;
                            }
                            lastUpdateTime = now;
                        }
                        
                        console.log('VTurb watched:', accumulatedWatchTime.toFixed(1), 's');
                        
                        if (accumulatedWatchTime >= 490) {
                            buttonShown = true;
                            const ctaButton = document.getElementById('cta-button');
                            if (ctaButton) {
                                ctaButton.style.display = 'flex';
                            }
                            console.log('VTurb: Button shown after 10 seconds of watch time');
                            window.removeEventListener('message', handleVturbMessage);
                        }
                    }
                } catch (e) {}
            });
        }
    }

    // --- Template Helpers ---

    function renderQuizButton(text) {
        return `
            <button onclick="nextStep()" class="w-full bg-white border border-gray-300 text-gray-700 font-medium py-3 px-4 rounded-lg shadow-sm hover:bg-gray-50 hover:border-kiwi-green hover:text-kiwi-green transition-all mb-3 text-left flex items-center justify-between group">
                ${text}
                ${icons.chevronRight}
            </button>
        `;
    }

    function renderContinueButton() {
        return `
            <button onclick="nextStep()" class="w-full bg-kiwi-green text-white font-bold py-3 px-4 rounded-lg shadow-md hover:bg-kiwi-dark-green transition-all mt-4 flex items-center justify-center gap-2 uppercase">
                Continuar ${icons.arrowRight}
            </button>
        `;
    }

    function renderBenefitsStep() {
        const options = [
            "Bajar de peso sin esfuerzo y sin efecto rebote",
            "Dormir más profundamente",
            "Tener más energía y disposición durante el día",
            "Aumentar la autoestima y la confianza",
            "Reducir el estrés y la ansiedad"
        ];

        const buttonsHtml = options.map(option => {
            const isSelected = state.selectedBenefits.includes(option);
            return `
                <button onclick="toggleBenefit(this, '${option}')" class="w-full bg-white border ${isSelected ? 'border-kiwi-green ring-1 ring-kiwi-green' : 'border-gray-300'} text-gray-700 font-medium py-3 px-4 rounded-lg shadow-sm hover:bg-gray-50 transition-all text-left flex items-center gap-3 group">
                    <div class="w-5 h-5 rounded border ${isSelected ? 'bg-kiwi-green border-kiwi-green' : 'border-gray-300'} flex items-center justify-center transition-colors shrink-0">
                        ${isSelected ? icons.checkWhite : ''}
                    </div>
                    <span class="${isSelected ? 'text-kiwi-green font-bold' : ''}">${option}</span>
                </button>
            `;
        }).join('');

        return `
            <div>
                <h3 class="text-xl font-bold text-gray-800 mb-2">¿Cuáles de estos beneficios te gustaría tener?</h3>
                <p class="text-sm text-gray-500 mb-6">Personalizaremos tu receta para maximizar los resultados.</p>
                <div class="space-y-3 mb-6" id="benefits-container">
                    ${buttonsHtml}
                </div>
                ${renderContinueButton()}
            </div>
        `;
    }

    function renderTestimonialsStep() {
        const stars = `<div class="flex text-yellow-400 gap-0.5">${icons.star.repeat(5)}</div>`;
        return `
            <div class="py-2">
                <h3 class="text-xl font-bold text-gray-800 mb-6 text-center leading-tight">
                    Resultados de quienes ya están usando la Receta Personalizada de la Gelatina Reductora
                </h3>
                <!-- Testimonials HTML omitted for brevity but logic is same as before -->
                 <!-- Gomita -->
                <div class="mb-6">
                    <div class="w-full mb-4">
                        <img src="assets/media/resultado-gomita.webp" alt="Resultado Gomita - Antes y Después" class="w-full rounded-lg">
                    </div>
                    <p class="text-gray-700 italic mb-3 text-sm leading-relaxed">
                    "Ya había intentado de todo para adelgazar, pero nada funcionaba realmente. Después de empezar a usar la receta de la Gelatina Reductora en mi día a día, perdí 8 kilos en solo 17 días — sin cambiar nada en mi alimentación. Ahora me siento más ligera, más bonita y con una confianza que no sentía desde hacía años."
                    </p>
                    <div class="font-bold text-gray-900 text-sm">— Gomita / Influenciadora Mexicana</div>
                    <div class="flex items-center gap-2 mt-1">${stars}</div>
                </div>
                ${renderContinueButton()}
                <div class="my-8 border-t border-gray-200"></div>
                 <!-- Fernanda -->
                <div class="mb-8">
                    <div class="w-full mb-4">
                        <img src="assets/media/resultado-fernanda.webp" alt="Resultado Fernanda - Antes y Después" class="w-full rounded-lg">
                    </div>
                    <p class="text-gray-700 italic mb-3 text-sm leading-relaxed">
                    "Después de mi embarazo, mi abdomen no volvía a la normalidad y me sentía muy frustrada. Probé esta receta sin mucha fe, pero los resultados fueron increíbles. En 3 semanas mi vientre está plano y he bajado 9 kilos. ¡Por fin volví a usar mi ropa de antes!"
                    </p>
                    <div class="font-bold text-gray-900 text-sm">— Fernanda Rodríguez — Ciudad de México</div>
                    <div class="flex items-center gap-2 mt-1">${stars}</div>
                </div>
                ${renderContinueButton()}
            </div>
        `;
    }

    function renderRangeStep(title, note, min, max, unit, labelStart, labelEnd) {
        const percentage = ((state.sliderValue - min) / (max - min)) * 100;
        const gradient = `linear-gradient(to right, #85c440 0%, #85c440 ${percentage}%, #e5e7eb ${percentage}%, #e5e7eb 100%)`;

        return `
            <div class="py-2">
                <h3 class="text-xl font-bold text-gray-800 mb-2">${title}</h3>
                ${note ? `<p class="text-sm text-gray-500 mb-6">${note}</p>` : ''}
                
                <div class="flex justify-center mb-8">
                    <div class="text-5xl font-bold text-kiwi-green">
                        <span id="slider-display">${state.sliderValue}</span> <span class="text-xl text-gray-400 font-normal">${unit}</span>
                    </div>
                </div>

                <div class="relative w-full flex items-center">
                    <input 
                        type="range" 
                        id="range-input"
                        class="w-full h-12 appearance-none bg-transparent cursor-pointer focus:outline-none touch-none accent-kiwi-green"
                        min="${min}" 
                        max="${max}" 
                        value="${state.sliderValue}" 
                        style="background-image: ${gradient}; background-size: 100% 8px; background-position: center; background-repeat: no-repeat;"
                    />
                </div>
                
                <div class="flex justify-between text-xs text-gray-400 mt-2 font-bold uppercase">
                    <span>${labelStart}</span>
                    <span>${labelEnd}</span>
                </div>

                <div class="mt-8 flex items-center gap-2 text-sm text-gray-600 bg-gray-50 p-3 rounded border border-gray-100">
                    ${icons.check}
                    Ajustaremos la dosis ideal para tu cuerpo.
                </div>

                ${renderContinueButton()}
            </div>
        `;
    }

    function setupRangeSlider() {
        const input = document.getElementById('range-input');
        const display = document.getElementById('slider-display');
        if (input && display) {
            input.addEventListener('input', (e) => {
                const val = Number(e.target.value);
                state.sliderValue = val;
                display.textContent = val;
                const min = Number(input.min);
                const max = Number(input.max);
                const percentage = ((val - min) / (max - min)) * 100;
                input.style.backgroundImage = `linear-gradient(to right, #85c440 0%, #85c440 ${percentage}%, #e5e7eb ${percentage}%, #e5e7eb 100%)`;
            });
        }
    }

    function renderLoadingStep() {
        return `
            <div class="flex flex-col items-center justify-center py-10 px-4">
                <div class="relative mb-8">
                    ${icons.loader}
                    <div id="loading-percent" class="absolute inset-0 flex items-center justify-center font-bold text-xs text-kiwi-green">
                        0%
                    </div>
                </div>
                
                <h3 id="loading-message" class="text-xl font-bold text-gray-800 mb-2 text-center animate-pulse">
                    Analizando sus respuestas...
                </h3>
                <p class="text-gray-500 text-sm text-center">
                    Por favor espere un momento...
                </p>

                <div class="w-full bg-gray-200 rounded-full h-2.5 mt-8">
                    <div 
                        id="loading-bar-fill"
                        class="bg-kiwi-green h-2.5 rounded-full transition-all duration-300 ease-out" 
                        style="width: 0%"
                    ></div>
                </div>
            </div>
        `;
    }

    function setupLoadingLogic() {
        let progress = 0;
        let msgIndex = 0;
        const messages = [
            "Analizando sus respuestas...",
            "Calculando su Índice de Masa Corporal...",
            "Verificando su tipo metabólico...",
            "Generando su plan personalizado..."
        ];

        const percentEl = document.getElementById('loading-percent');
        const msgEl = document.getElementById('loading-message');
        const fillEl = document.getElementById('loading-bar-fill');

        const progressInterval = setInterval(() => {
            if (progress >= 100) {
                progress = 100;
            } else {
                progress++;
            }
            if(percentEl) percentEl.textContent = `${progress}%`;
            if(fillEl) fillEl.style.width = `${progress}%`;
        }, 35);

        const msgInterval = setInterval(() => {
            msgIndex = (msgIndex + 1) % messages.length;
            if(msgEl) msgEl.textContent = messages[msgIndex];
        }, 900);

        setTimeout(() => {
            clearInterval(progressInterval);
            clearInterval(msgInterval);
            nextStep();
        }, 4000);
    }

    // --- Comments Logic ---

    function renderComments() {
        if (!dom.commentsList) return;
        
        dom.commentsList.innerHTML = commentsData.slice(0, state.visibleComments).map(c => `
            <div class="flex gap-4">
                <div class="w-10 h-10 rounded-full ${c.color} flex items-center justify-center text-white font-bold shrink-0 text-sm">
                    ${c.initial}
                </div>
                <div class="flex-1">
                    <div class="flex justify-between items-start mb-1">
                        <span class="font-bold text-gray-900 text-sm">${c.name}</span>
                        <span class="text-xs text-gray-400">${c.time}</span>
                    </div>
                    <p class="text-gray-700 text-sm leading-relaxed mb-2">
                        ${c.content}
                    </p>
                    <div class="flex items-center gap-4 text-xs text-gray-400 font-medium">
                        <button class="flex items-center gap-1 hover:text-kiwi-green transition-colors">
                            ${icons.thumbsUp}
                            <span>Útil (${c.likes})</span>
                        </button>
                        <button class="flex items-center gap-1 hover:text-kiwi-green transition-colors">
                            ${icons.messageSquare}
                            <span>Responder</span>
                        </button>
                    </div>
                </div>
            </div>
        `).join('');

        if (state.visibleComments >= commentsData.length && dom.loadMoreBtn) {
            dom.loadMoreBtn.style.display = 'none';
        }
    }

    window.loadMoreComments = function() {
        state.visibleComments = Math.min(state.visibleComments + 3, commentsData.length);
        renderComments();
    };

    // --- Initialization ---

    function init() {
        try {
            dom = {
                staticTop: document.getElementById('static-top-content'),
                staticIngredients: document.getElementById('static-ingredients-view'),
                startQuizBtn: document.getElementById('start-quiz-btn'),
                quizContainer: document.getElementById('quiz-container'),
                progressContainer: document.getElementById('quiz-progress-container'),
                progressBar: document.getElementById('quiz-progress-bar'),
                commentsList: document.getElementById('comments-list'),
                loadMoreBtn: document.getElementById('load-more-comments')
            };

            // Attach Listeners
            if (dom.startQuizBtn) {
                dom.startQuizBtn.addEventListener('click', window.startQuiz);
                console.log("Attached start quiz listener");
            }
            
            if (dom.loadMoreBtn) {
                dom.loadMoreBtn.addEventListener('click', window.loadMoreComments);
            }

            // Initial Render
            if (dom.commentsList) {
                renderComments();
                console.log("Rendered comments");
            }
        } catch (e) {
            console.error("Init failed:", e);
        }
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

})();