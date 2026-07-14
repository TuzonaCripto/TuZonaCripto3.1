import React, { useState } from 'react';
import { Lesson } from '../types';
import { GraduationCap, Award, BookOpen, Check, AlertCircle, HelpCircle, CheckCircle2, ChevronRight } from 'lucide-react';

interface CriptoLabProps {
  onEarnTzc: (amount: number) => void;
  userTzcBalance: number;
}

export const MOCK_LESSONS: Lesson[] = [
  {
    id: 'l1',
    title: 'Introducción a Bitcoin y la Economía P2P',
    description: 'Aprende los fundamentos del dinero digital descentralizado, qué es el consenso blockchain y cómo funciona una red de igual a igual.',
    category: 'Blockchain',
    pointsReward: 15,
    completed: false,
    questions: [
      {
        question: '¿Quién publicó el whitepaper original de Bitcoin en el año 2008?',
        options: [
          'Satoshi Nakamoto',
          'Vitalik Buterin',
          'Charlie Lee',
          'Nick Szabo'
        ],
        answerIndex: 0
      },
      {
        question: '¿Cuál es el suministro máximo programado de monedas Bitcoin que existirá jamás?',
        options: [
          '100 millones de BTC',
          '21 millones de BTC',
          '84 millones de BTC',
          'Suministro infinito con inflación fija'
        ],
        answerIndex: 1
      }
    ]
  },
  {
    id: 'l2',
    title: 'Smart Contracts y la red Ethereum',
    description: 'Descubre el concepto de contratos inteligentes programables de código abierto y cómo habilitan aplicaciones financieras descentralizadas.',
    category: 'DeFi',
    pointsReward: 25,
    completed: false,
    questions: [
      {
        question: '¿Qué es un Contrato Inteligente (Smart Contract)?',
        options: [
          'Un contrato físico escaneado por una máquina de oficina',
          'Un programa de software que se ejecuta de forma autónoma en una blockchain bajo reglas predefinidas',
          'Una base de datos relacional centralizada en la nube',
          'Un acuerdo verbal protegido por firma tradicional'
        ],
        answerIndex: 1
      },
      {
        question: '¿Qué máquina virtual se encarga de procesar los códigos de operación en Ethereum?',
        options: [
          'JVM (Java Virtual Machine)',
          'EVM (Ethereum Virtual Machine)',
          'V8 Engine',
          'WASM Runtime'
        ],
        answerIndex: 1
      }
    ]
  },
  {
    id: 'l3',
    title: 'Seguridad Operativa y Autocustodia (Wallets)',
    description: 'Claves para mantener tus fondos a salvo utilizando billeteras no custodiales, protegiendo tus llaves privadas y evitando estafas de phishing.',
    category: 'Seguridad',
    pointsReward: 30,
    completed: false,
    questions: [
      {
        question: '¿Qué representa tu frase semilla de recuperación (Seed Phrase)?',
        options: [
          'Tu nombre de usuario para iniciar sesión en una web',
          'La clave criptográfica principal que genera y da acceso a todas tus llaves privadas de fondos',
          'Un método opcional que se puede borrar sin perder nada',
          'El número de soporte técnico para recuperar tu contraseña'
        ],
        answerIndex: 1
      },
      {
        question: '¿A quién debes revelar tu frase semilla o llaves privadas?',
        options: [
          'Al soporte oficial de TuZonaCripto',
          'A tu banco tradicional',
          'A nadie bajo ninguna circunstancia',
          'Al administrador del nodo validador de red'
        ],
        answerIndex: 2
      }
    ]
  }
];

export default function CriptoLab({ onEarnTzc, userTzcBalance }: CriptoLabProps) {
  const [lessons, setLessons] = useState<Lesson[]>(MOCK_LESSONS);
  const [activeLessonId, setActiveLessonId] = useState<string | null>(null);

  // Active quiz state
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOptionIdx, setSelectedOptionIdx] = useState<number | null>(null);
  const [showAnswerResult, setShowAnswerResult] = useState(false);
  const [quizScore, setQuizScore] = useState(0);
  const [quizCompleted, setQuizCompleted] = useState(false);

  const activeLesson = lessons.find(l => l.id === activeLessonId);

  const startLesson = (id: string) => {
    setActiveLessonId(id);
    setCurrentQuestionIndex(0);
    setSelectedOptionIdx(null);
    setShowAnswerResult(false);
    setQuizScore(0);
    setQuizCompleted(false);
  };

  const handleSelectOption = (idx: number) => {
    if (showAnswerResult) return;
    setSelectedOptionIdx(idx);
  };

  const handleNextOrSubmit = () => {
    if (!activeLesson) return;

    if (!showAnswerResult) {
      // Validate option chosen
      if (selectedOptionIdx === null) {
        alert('Por favor selecciona una opción.');
        return;
      }

      // Check if correct
      const isCorrect = selectedOptionIdx === activeLesson.questions[currentQuestionIndex].answerIndex;
      if (isCorrect) {
        setQuizScore(prev => prev + 1);
      }
      setShowAnswerResult(true);
    } else {
      // Go to next question or complete
      if (currentQuestionIndex + 1 < activeLesson.questions.length) {
        setCurrentQuestionIndex(prev => prev + 1);
        setSelectedOptionIdx(null);
        setShowAnswerResult(false);
      } else {
        // Complete Quiz
        setQuizCompleted(true);
        const allCorrect = quizScore + (selectedOptionIdx === activeLesson.questions[currentQuestionIndex].answerIndex ? 1 : 0) === activeLesson.questions.length;

        if (allCorrect) {
          // Give Reward!
          onEarnTzc(activeLesson.pointsReward);
          // Mark lesson completed
          setLessons(prev => prev.map(l => l.id === activeLesson.id ? { ...l, completed: true } : l));
        }
      }
    }
  };

  return (
    <div className="bg-neutral-950 p-6 rounded-2xl border border-neutral-800 space-y-8" id="criptolab_module">
      {/* Header */}
      <div className="border-b border-neutral-800 pb-5 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-white tracking-tight flex items-center gap-2">
            <span className="w-2.5 h-6 bg-red-600 rounded-full inline-block"></span>
            CriptoLab Hub (Academia)
          </h2>
          <p className="text-neutral-400 text-sm mt-1">
            Centro de capacitación integral gamificado. ¡Aprende conceptos Web3 y gana tokens $TZC directos!
          </p>
        </div>

        {/* User tokens balance display */}
        <div className="bg-neutral-900 border border-neutral-800 px-4 py-2.5 rounded-xl flex items-center gap-2 self-start md:self-auto">
          <Award className="w-5 h-5 text-red-500" />
          <div className="text-left">
            <span className="text-[10px] text-neutral-400 block font-semibold uppercase">Recompensas acumuladas</span>
            <span className="text-sm font-mono font-black text-white">{userTzcBalance.toFixed(2)} $TZC</span>
          </div>
        </div>
      </div>

      {!activeLessonId ? (
        // List of courses + Info Banner
        <div className="space-y-8">
          {/* Hero Visual Banner */}
          <div className="relative h-48 md:h-60 rounded-xl overflow-hidden border border-neutral-800">
            <img
              src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&q=80&w=1200"
              alt="CriptoLab Digital Learning"
              className="w-full h-full object-cover filter brightness-45 saturate-120"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent flex flex-col justify-end p-6">
              <span className="text-[10px] bg-red-600 text-white font-bold uppercase tracking-wider px-2.5 py-1 rounded-md w-max mb-2">
                Aprende y Gana (Learn-to-Earn)
              </span>
              <h3 className="text-white text-xl md:text-2xl font-black tracking-tight">
                Impulsa tus Conocimientos Web3 y Finanzas Libres
              </h3>
              <p className="text-neutral-300 text-xs mt-1 max-w-xl">
                La educación es la clave de la adopción masiva. Completa los cuestionarios interactivos de TuZonaCripto para desbloquear recompensas directas y reales en tu wallet no-custodial.
              </p>
            </div>
          </div>

          {/* Program Details: What, How, Benefits */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
            {/* ¿Qué es? */}
            <div className="bg-neutral-900/60 p-5 rounded-xl border border-neutral-800/80 space-y-3">
              <div className="w-10 h-10 rounded-lg bg-red-950/40 border border-red-900/30 flex items-center justify-center text-red-500 font-bold">
                🎓
              </div>
              <h4 className="text-white font-bold text-sm">¿Qué es CriptoLab?</h4>
              <p className="text-xs text-neutral-400 leading-relaxed">
                Es la división educativa descentralizada de <strong className="text-white">TuZonaCripto</strong>. Ofrecemos lecciones guiadas por profesionales para empoderar financieramente a los ciudadanos mediante el uso responsable de criptomonedas.
              </p>
            </div>

            {/* ¿Cómo funciona? */}
            <div className="bg-neutral-900/60 p-5 rounded-xl border border-neutral-800/80 space-y-3">
              <div className="w-10 h-10 rounded-lg bg-red-950/40 border border-red-900/30 flex items-center justify-center text-red-500 font-bold">
                🧠
              </div>
              <h4 className="text-white font-bold text-sm">¿Cómo funciona?</h4>
              <ul className="text-xs text-neutral-400 space-y-2 leading-relaxed">
                <li className="flex items-start gap-1.5">
                  <span className="text-emerald-500 font-bold shrink-0">1.</span>
                  <span>Selecciona cualquiera de las lecciones disponibles abajo.</span>
                </li>
                <li className="flex items-start gap-1.5">
                  <span className="text-emerald-500 font-bold shrink-0">2.</span>
                  <span>Lee el contenido y responde las preguntas de opción múltiple del quiz interactivo.</span>
                </li>
                <li className="flex items-start gap-1.5">
                  <span className="text-emerald-500 font-bold shrink-0">3.</span>
                  <span>Obtén el 100% de aciertos para reclamar e importar tokens $TZC a tu wallet real de forma instantánea.</span>
                </li>
              </ul>
            </div>

            {/* Beneficios */}
            <div className="bg-neutral-900/60 p-5 rounded-xl border border-neutral-800/80 space-y-3">
              <div className="w-10 h-10 rounded-lg bg-red-950/40 border border-red-900/30 flex items-center justify-center text-red-500 font-bold">
                ⚡
              </div>
              <h4 className="text-white font-bold text-sm">Beneficios Clave</h4>
              <ul className="text-xs text-neutral-400 space-y-2 leading-relaxed">
                <li className="flex items-center gap-2">
                  <span className="text-emerald-500 font-bold">✓</span>
                  <span><strong>Monetiza tu Aprendizaje:</strong> Obtén fondos reales para usar en CriptoMap.</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-emerald-500 font-bold">✓</span>
                  <span><strong>Prevención de Fraudes:</strong> Aprende a proteger tus llaves privadas de forma práctica.</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-emerald-500 font-bold">✓</span>
                  <span><strong>Currículum Web3:</strong> Adquiere credenciales de conocimiento validadas on-chain.</span>
                </li>
              </ul>
            </div>
          </div>

          <p className="text-xs uppercase font-bold tracking-wider text-neutral-500 text-left pt-2 border-t border-neutral-900">Capítulos Educativos Disponibles</p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {lessons.map((lesson) => (
              <div key={lesson.id} className="bg-neutral-900 rounded-xl border border-neutral-800 p-5 flex flex-col justify-between text-left space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-[10px] bg-red-950/40 text-red-400 border border-red-900/40 px-2 py-0.5 rounded-md font-mono">
                      {lesson.category}
                    </span>
                    {lesson.completed && (
                      <span className="text-[9px] bg-emerald-950/40 text-emerald-400 border border-emerald-900/30 px-2 py-0.5 rounded-full font-bold flex items-center gap-1">
                        <Check className="w-3 h-3" /> Completado
                      </span>
                    )}
                  </div>
                  <h3 className="text-white font-bold text-sm leading-tight">{lesson.title}</h3>
                  <p className="text-xs text-neutral-400 line-clamp-3 leading-relaxed">{lesson.description}</p>
                </div>

                <div className="border-t border-neutral-800 pt-3 flex items-center justify-between">
                  <div className="text-left">
                    <span className="text-[9px] text-neutral-500 block">Premio</span>
                    <span className="text-xs font-mono font-bold text-red-500 flex items-center gap-1">
                      🛡️ +{lesson.pointsReward} TZC
                    </span>
                  </div>
                  <button
                    onClick={() => startLesson(lesson.id)}
                    className="bg-red-600 hover:bg-red-700 text-white text-xs font-bold px-3 py-2 rounded-lg transition flex items-center gap-1 cursor-pointer"
                  >
                    {lesson.completed ? 'Repasar' : 'Iniciar'}
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-neutral-900/60 p-4 rounded-xl border border-neutral-800 text-left flex gap-3.5 max-w-xl">
            <GraduationCap className="w-8 h-8 text-red-500 shrink-0" />
            <div>
              <h4 className="text-white font-semibold text-xs">Aprende y Gana (Learn to Earn)</h4>
              <p className="text-[11px] text-neutral-400 leading-normal mt-1">
                La economía digital necesita educación. El token $TZC funciona como incentivo directo para que completes los quizzes educativos y demuestres tus conocimientos on-chain. ¡Prueba los cuestionarios y gasta tus tokens en el directorio!
              </p>
            </div>
          </div>
        </div>
      ) : (
        // Active Quiz details
        <div className="bg-neutral-900 p-6 rounded-xl border border-neutral-800 max-w-2xl mx-auto text-left">
          <div className="flex items-center justify-between border-b border-neutral-800 pb-3.5 mb-5">
            <div>
              <span className="text-[9px] text-red-500 font-bold uppercase block tracking-wider">Cuestionario Académico</span>
              <h3 className="text-white font-bold text-sm mt-0.5">{activeLesson?.title}</h3>
            </div>
            <button
              onClick={() => setActiveLessonId(null)}
              className="text-xs text-neutral-400 hover:text-white transition cursor-pointer"
            >
              Volver a Cursos
            </button>
          </div>

          {!quizCompleted && activeLesson ? (
            <div className="space-y-5">
              {/* Question card */}
              <div className="space-y-3">
                <div className="flex justify-between text-xs text-neutral-400">
                  <span>Pregunta {currentQuestionIndex + 1} de {activeLesson.questions.length}</span>
                  <span className="font-mono text-red-500">+{activeLesson.pointsReward} TZC en juego</span>
                </div>
                <h4 className="text-sm font-bold text-white leading-relaxed">
                  {activeLesson.questions[currentQuestionIndex].question}
                </h4>
              </div>

              {/* Options choices */}
              <div className="space-y-2">
                {activeLesson.questions[currentQuestionIndex].options.map((option, idx) => {
                  let borderStyle = 'border-neutral-800 hover:border-neutral-700 bg-neutral-950 text-neutral-300';

                  if (selectedOptionIdx === idx) {
                    borderStyle = 'border-red-600 bg-red-950/10 text-white';
                  }

                  if (showAnswerResult) {
                    const isCorrectOption = idx === activeLesson.questions[currentQuestionIndex].answerIndex;
                    if (isCorrectOption) {
                      borderStyle = 'border-emerald-500 bg-emerald-950/20 text-emerald-400 font-semibold';
                    } else if (selectedOptionIdx === idx) {
                      borderStyle = 'border-red-600 bg-red-950/20 text-red-400';
                    } else {
                      borderStyle = 'border-neutral-800 bg-neutral-950 opacity-50 text-neutral-400';
                    }
                  }

                  return (
                    <button
                      key={idx}
                      onClick={() => handleSelectOption(idx)}
                      disabled={showAnswerResult}
                      className={`w-full text-left p-3.5 rounded-xl border text-xs transition flex items-center justify-between cursor-pointer ${borderStyle}`}
                    >
                      <span>{option}</span>
                      {showAnswerResult && idx === activeLesson.questions[currentQuestionIndex].answerIndex && (
                        <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Feedback text */}
              {showAnswerResult && (
                <div className="p-3.5 rounded-lg text-xs leading-normal flex gap-2 border bg-neutral-950 border-neutral-800">
                  {selectedOptionIdx === activeLesson.questions[currentQuestionIndex].answerIndex ? (
                    <>
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      <p className="text-emerald-400"><strong>¡Respuesta Correcta!</strong> Excelente análisis técnico.</p>
                    </>
                  ) : (
                    <>
                      <AlertCircle className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
                      <p className="text-red-400">
                        <strong>Respuesta Incorrecta.</strong> La respuesta correcta era: <em>{activeLesson.questions[currentQuestionIndex].options[activeLesson.questions[currentQuestionIndex].answerIndex]}</em>.
                      </p>
                    </>
                  )}
                </div>
              )}

              {/* Action buttons */}
              <button
                onClick={handleNextOrSubmit}
                className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-2.5 rounded-xl text-xs transition cursor-pointer text-center block"
              >
                {showAnswerResult
                  ? (currentQuestionIndex + 1 < activeLesson.questions.length ? 'Siguiente Pregunta' : 'Finalizar Cuestionario')
                  : 'Enviar Respuesta'
                }
              </button>
            </div>
          ) : (
            // Quiz finished overview
            <div className="text-center py-6 space-y-5">
              <Award className="w-16 h-16 text-red-500 mx-auto" />
              <div>
                <h3 className="font-bold text-white text-base">¡Cuestionario Concluido!</h3>
                <p className="text-xs text-neutral-400 mt-1">
                  Has respondido correctamente las preguntas de la lección de capacitación.
                </p>
              </div>

              <div className="bg-neutral-950 p-4 rounded-lg border border-neutral-800 inline-block text-left min-w-xs space-y-1.5 font-mono text-xs">
                <div className="flex justify-between text-neutral-400">
                  <span>Puntos Ganados:</span>
                  <span className="text-red-500 font-bold">+{activeLesson?.pointsReward} TZC</span>
                </div>
                <div className="flex justify-between text-neutral-400">
                  <span>Calificación:</span>
                  <span className="text-white font-bold">{quizScore} / {activeLesson?.questions.length} correctas</span>
                </div>
              </div>

              <div className="flex gap-2 justify-center max-w-sm mx-auto">
                <button
                  onClick={() => startLesson(activeLessonId!)}
                  className="flex-1 bg-neutral-950 hover:bg-neutral-900 border border-neutral-800 text-neutral-300 py-2 rounded-lg text-xs transition cursor-pointer"
                >
                  Repetir Quiz
                </button>
                <button
                  onClick={() => setActiveLessonId(null)}
                  className="flex-1 bg-red-600 hover:bg-red-700 text-white font-bold py-2 rounded-lg text-xs transition cursor-pointer"
                >
                  Volver al Hub
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
