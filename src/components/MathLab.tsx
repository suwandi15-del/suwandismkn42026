import React, { useState } from 'react';
import { MaterialModule, NavPage } from '../types';
import { 
  Sparkles, 
  HelpCircle, 
  CheckCircle2, 
  XCircle, 
  ArrowRight, 
  Sliders, 
  Layers, 
  BookOpen, 
  Calculator, 
  Lightbulb,
  Gamepad2,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface MathLabProps {
  materials: MaterialModule[];
  onNavigate: (page: NavPage) => void;
  onMaterialCompleted: (materialId: string) => void;
  completedMaterials: string[];
}

export const MathLab: React.FC<MathLabProps> = ({
  materials,
  onNavigate,
  onMaterialCompleted,
  completedMaterials
}) => {
  const [activeModuleId, setActiveModuleId] = useState<string>(materials[0]?.id || 'mat-1');
  const [selectedPracticeOption, setSelectedPracticeOption] = useState<number | null>(null);
  const [practiceSubmitted, setPracticeSubmitted] = useState<boolean>(false);
  const [showSolutionSteps, setShowSolutionSteps] = useState<boolean>(true);

  // Interactive Parabola Sandbox state
  const [coeffA, setCoeffA] = useState<number>(1);
  const [coeffB, setCoeffB] = useState<number>(2);
  const [coeffC, setCoeffC] = useState<number>(-3);

  const activeModule = materials.find((m) => m.id === activeModuleId) || materials[0];

  // Mathematical calculations for the interactive parabola
  const D = coeffB * coeffB - 4 * coeffA * coeffC;
  let root1: number | null = null;
  let root2: number | null = null;

  if (D > 0 && coeffA !== 0) {
    root1 = (-coeffB + Math.sqrt(D)) / (2 * coeffA);
    root2 = (-coeffB - Math.sqrt(D)) / (2 * coeffA);
  } else if (D === 0 && coeffA !== 0) {
    root1 = -coeffB / (2 * coeffA);
    root2 = root1;
  }

  const vertexX = coeffA !== 0 ? -coeffB / (2 * coeffA) : 0;
  const vertexY = coeffA !== 0 ? coeffA * vertexX * vertexX + coeffB * vertexX + coeffC : 0;

  // Generate SVG path points for the parabola in [-10, 10] range
  const width = 440;
  const height = 300;
  const scaleX = 20; // 1 unit = 20px
  const scaleY = 14;
  const originX = width / 2;
  const originY = height / 2 + 30; // slightly offset down for nice parabola vertex

  const mapX = (x: number) => originX + x * scaleX;
  const mapY = (y: number) => originY - y * scaleY;

  const points: string[] = [];
  for (let x = -10; x <= 10; x += 0.25) {
    const y = coeffA * x * x + coeffB * x + coeffC;
    if (Math.abs(y) <= 25) {
      points.push(`${mapX(x)},${mapY(y)}`);
    }
  }
  const svgPathData = points.length > 1 ? `M ${points.join(' L ')}` : '';

  const handlePracticeSubmit = () => {
    if (selectedPracticeOption === null) return;
    setPracticeSubmitted(true);
    if (selectedPracticeOption === activeModule.interactivePractice.correctIndex) {
      onMaterialCompleted(activeModule.id);
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.7 }
      });
    }
  };

  const handleSelectModule = (id: string) => {
    setActiveModuleId(id);
    setSelectedPracticeOption(null);
    setPracticeSubmitted(false);
  };

  return (
    <div className="space-y-8 py-4 sm:py-6 max-w-6xl mx-auto">
      
      {/* Top Banner */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-xs font-bold text-amber-400">
            <Sparkles className="w-4 h-4" />
            <span>LABORATORIUM MATEMATIKA INTERAKTIF · 6 MODUL UTAMA</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-heading font-extrabold text-white">
            Eksplorasi Konsep & Kurva Persamaan Kuadrat
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed">
            Eksperimen dengan rumus, geser nilai koefisien parabola secara langsung, pelajari contoh bertahap, dan pecahkan latihan terarah dengan bimbingan Pak Suwandi.
          </p>
        </div>

        <button
          onClick={() => onNavigate('tantangan')}
          className="px-4 py-2.5 bg-purple-600 hover:bg-purple-500 text-white font-bold rounded-xl text-xs flex items-center gap-2 shadow shrink-0 transition-colors"
        >
          <Gamepad2 className="w-4 h-4" />
          <span>Uji di Tantangan Game</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      {/* Interactive Parabola Visualizer Sandbox Card */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 shadow-xl space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 pb-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-2xl bg-blue-500/20 text-blue-400 border border-blue-500/30">
              <Sliders className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-heading font-bold text-white text-lg">
                Simulator Dinamis Parabola: y = ax² + bx + c
              </h3>
              <p className="text-xs text-slate-400">
                Geser slider di bawah untuk melihat bagaimana nilai a, b, dan c mengubah kurva dan akar-akarnya
              </p>
            </div>
          </div>

          {/* Current equation badge */}
          <div className="bg-slate-950 border border-amber-400/50 px-4 py-2 rounded-xl text-sm font-math font-bold text-amber-300 shadow">
            y = {coeffA === 1 ? '' : coeffA === -1 ? '-' : `${coeffA}`}x²
            {coeffB >= 0 ? ` + ${coeffB}x` : ` - ${Math.abs(coeffB)}x`}
            {coeffC >= 0 ? ` + ${coeffC}` : ` - ${Math.abs(coeffC)}`}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Controls Sliders */}
          <div className="lg:col-span-5 space-y-5 bg-slate-950/60 p-5 rounded-2xl border border-slate-800">
            
            {/* Slider a */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between text-xs font-semibold">
                <span className="text-blue-300">Koefisien a (Kelengkungan & Arah)</span>
                <span className="font-mono text-amber-400 font-bold">{coeffA}</span>
              </div>
              <input
                type="range"
                min="-3"
                max="3"
                step="0.5"
                value={coeffA}
                onChange={(e) => {
                  const val = parseFloat(e.target.value);
                  setCoeffA(val === 0 ? (e.target.valueAsNumber > coeffA ? 0.5 : -0.5) : val);
                }}
                className="w-full accent-blue-500 cursor-pointer"
              />
              <span className="text-[11px] text-slate-400 block">
                {coeffA > 0 ? 'a > 0: Parabola terbuka ke ATAS (memiliki titik minimum)' : 'a < 0: Parabola terbuka ke BAWAH (memiliki titik maksimum)'}
              </span>
            </div>

            {/* Slider b */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between text-xs font-semibold">
                <span className="text-emerald-300">Koefisien b (Pergeseran Horizontal)</span>
                <span className="font-mono text-amber-400 font-bold">{coeffB}</span>
              </div>
              <input
                type="range"
                min="-6"
                max="6"
                step="1"
                value={coeffB}
                onChange={(e) => setCoeffB(parseInt(e.target.value, 10))}
                className="w-full accent-emerald-500 cursor-pointer"
              />
              <span className="text-[11px] text-slate-400 block">
                Sumbu Simetri: x = -b / 2a = {vertexX.toFixed(2)}
              </span>
            </div>

            {/* Slider c */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between text-xs font-semibold">
                <span className="text-yellow-300">Konstanta c (Titik Potong Sumbu-Y)</span>
                <span className="font-mono text-amber-400 font-bold">{coeffC}</span>
              </div>
              <input
                type="range"
                min="-8"
                max="8"
                step="1"
                value={coeffC}
                onChange={(e) => setCoeffC(parseInt(e.target.value, 10))}
                className="w-full accent-yellow-500 cursor-pointer"
              />
              <span className="text-[11px] text-slate-400 block">
                Memotong sumbu-Y di titik (0, {coeffC})
              </span>
            </div>

            {/* Live Diskriminan & Nature of Roots */}
            <div className="pt-3 border-t border-slate-800 space-y-2 text-xs">
              <div className="flex items-center justify-between">
                <span className="text-slate-300 font-semibold">Diskriminan D = b² - 4ac:</span>
                <span className="font-math font-bold text-amber-300 text-sm">
                  ({coeffB})² - 4({coeffA})({coeffC}) = {D}
                </span>
              </div>

              <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
                <span className="font-bold text-white block">
                  {D > 0 && '🟢 Memiliki 2 Akar Real Berbeda (Memotong sumbu-X di 2 titik)'}
                  {D === 0 && '🟡 Memiliki 2 Akar Real Kembar (Menyinggung sumbu-X di 1 titik)'}
                  {D < 0 && '🔴 Tidak Memiliki Akar Real (Melayang / tidak menyentuh sumbu-X)'}
                </span>
                {root1 !== null && root2 !== null && (
                  <p className="font-math text-emerald-400 font-semibold">
                    {D > 0
                      ? `x₁ = ${root1.toFixed(2)},  x₂ = ${root2.toFixed(2)}`
                      : `x₁ = x₂ = ${root1.toFixed(2)}`}
                  </p>
                )}
              </div>
            </div>

          </div>

          {/* Canvas SVG Graph */}
          <div className="lg:col-span-7 flex flex-col items-center">
            <div className="w-full bg-slate-950 border border-slate-800 rounded-2xl p-4 shadow-inner relative overflow-hidden flex items-center justify-center">
              <svg width={width} height={height} className="overflow-visible select-none max-w-full">
                {/* Background Grid Lines */}
                {[-8, -6, -4, -2, 2, 4, 6, 8].map((val) => (
                  <g key={`grid-x-${val}`}>
                    <line
                      x1={mapX(val)}
                      y1={10}
                      x2={mapX(val)}
                      y2={height - 10}
                      stroke="#1e293b"
                      strokeWidth="1"
                    />
                    <text
                      x={mapX(val)}
                      y={mapY(0) + 14}
                      fill="#64748b"
                      fontSize="9"
                      textAnchor="middle"
                    >
                      {val}
                    </text>
                  </g>
                ))}

                {[-6, -4, -2, 2, 4, 6, 8].map((val) => (
                  <g key={`grid-y-${val}`}>
                    <line
                      x1={10}
                      y1={mapY(val)}
                      x2={width - 10}
                      y2={mapY(val)}
                      stroke="#1e293b"
                      strokeWidth="1"
                    />
                    <text
                      x={originX - 10}
                      y={mapY(val) + 3}
                      fill="#64748b"
                      fontSize="9"
                      textAnchor="end"
                    >
                      {val}
                    </text>
                  </g>
                ))}

                {/* X Axis */}
                <line
                  x1={10}
                  y1={mapY(0)}
                  x2={width - 10}
                  y2={mapY(0)}
                  stroke="#94a3b8"
                  strokeWidth="2"
                />
                <text x={width - 18} y={mapY(0) - 6} fill="#cbd5e1" fontSize="11" fontWeight="bold">
                  X
                </text>

                {/* Y Axis */}
                <line
                  x1={originX}
                  y1={10}
                  x2={originX}
                  y2={height - 10}
                  stroke="#94a3b8"
                  strokeWidth="2"
                />
                <text x={originX + 8} y={20} fill="#cbd5e1" fontSize="11" fontWeight="bold">
                  Y
                </text>

                {/* Parabola Curve */}
                {svgPathData && (
                  <path
                    d={svgPathData}
                    fill="none"
                    stroke="#38bdf8"
                    strokeWidth="3.5"
                    strokeLinecap="round"
                  />
                )}

                {/* Vertex Point */}
                {Math.abs(vertexX) <= 10 && Math.abs(vertexY) <= 15 && (
                  <g>
                    <circle
                      cx={mapX(vertexX)}
                      cy={mapY(vertexY)}
                      r="5"
                      fill="#f43f5e"
                      stroke="#ffffff"
                      strokeWidth="1.5"
                    />
                    <text
                      x={mapX(vertexX)}
                      y={mapY(vertexY) + (coeffA > 0 ? 16 : -10)}
                      fill="#fb7185"
                      fontSize="10"
                      textAnchor="middle"
                      fontWeight="bold"
                    >
                      Puncak ({vertexX.toFixed(1)}, {vertexY.toFixed(1)})
                    </text>
                  </g>
                )}

                {/* Root 1 Intersection Dot */}
                {root1 !== null && Math.abs(root1) <= 10 && (
                  <g>
                    <circle
                      cx={mapX(root1)}
                      cy={mapY(0)}
                      r="6"
                      fill="#eab308"
                      stroke="#ffffff"
                      strokeWidth="2"
                    />
                    <text
                      x={mapX(root1)}
                      y={mapY(0) - 10}
                      fill="#facc15"
                      fontSize="10"
                      fontWeight="bold"
                      textAnchor="middle"
                    >
                      x₁ ({root1.toFixed(1)})
                    </text>
                  </g>
                )}

                {/* Root 2 Intersection Dot */}
                {root2 !== null && D > 0 && Math.abs(root2) <= 10 && (
                  <g>
                    <circle
                      cx={mapX(root2)}
                      cy={mapY(0)}
                      r="6"
                      fill="#eab308"
                      stroke="#ffffff"
                      strokeWidth="2"
                    />
                    <text
                      x={mapX(root2)}
                      y={mapY(0) - 10}
                      fill="#facc15"
                      fontSize="10"
                      fontWeight="bold"
                      textAnchor="middle"
                    >
                      x₂ ({root2.toFixed(1)})
                    </text>
                  </g>
                )}
              </svg>
            </div>
            <div className="flex items-center gap-4 text-xs text-slate-400 pt-2">
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-yellow-400" /> Akar-Akar (Titik Potong X)
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-rose-500" /> Titik Puncak
              </span>
            </div>
          </div>

        </div>
      </div>

      {/* 6 Core Modules Navigation Tabs */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-xs uppercase font-extrabold tracking-wider text-slate-400 flex items-center gap-2">
            <Layers className="w-4 h-4 text-amber-400" />
            6 MODUL MATERI PERSAMAAN KUADRAT
          </h3>
          <span className="text-xs text-emerald-400 font-semibold">
            {completedMaterials.length} dari {materials.length} Modul Tuntas
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5">
          {materials.map((mod) => {
            const isActive = mod.id === activeModuleId;
            const isDone = completedMaterials.includes(mod.id);
            return (
              <button
                key={mod.id}
                onClick={() => handleSelectModule(mod.id)}
                className={`p-3 rounded-2xl border text-left transition-all relative overflow-hidden flex flex-col justify-between ${
                  isActive
                    ? 'bg-blue-600 border-amber-400 text-white shadow-lg'
                    : 'bg-slate-900 border-slate-800 text-slate-300 hover:border-slate-700 hover:text-white'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between text-[10px] font-bold pb-1">
                    <span>MODUL {mod.number}</span>
                    {isDone && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />}
                  </div>
                  <h4 className="font-heading font-bold text-xs line-clamp-2">
                    {mod.title}
                  </h4>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Active Module Details & Educational Content */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-8 shadow-xl">
        
        {/* Module Header */}
        <div className="space-y-2 border-b border-slate-800 pb-5">
          <div className="flex items-center gap-2 text-xs font-bold text-amber-400">
            <span>MODUL {activeModule.number} DARI 6</span>
            <span>·</span>
            <span>{activeModule.subtitle}</span>
          </div>
          <h3 className="text-2xl sm:text-3xl font-heading font-extrabold text-white">
            {activeModule.title}
          </h3>
          <p className="text-sm text-slate-300 leading-relaxed max-w-3xl">
            {activeModule.summary}
          </p>
        </div>

        {/* Key Formula Spotlight */}
        {activeModule.keyFormula && (
          <div className="bg-gradient-to-r from-blue-950 via-slate-950 to-indigo-950 border border-blue-500/40 rounded-2xl p-5 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="space-y-1 text-center sm:text-left">
              <span className="text-[10px] font-bold text-blue-300 uppercase tracking-wider">
                Rumus Kunci & Kaidah Utama
              </span>
              <p className="text-lg sm:text-xl font-math font-bold text-amber-300">
                {activeModule.keyFormula}
              </p>
            </div>
            <div className="p-2.5 rounded-xl bg-blue-500/20 text-blue-400 border border-blue-400/30">
              <Calculator className="w-6 h-6" />
            </div>
          </div>
        )}

        {/* Content Paragraphs */}
        <div className="space-y-3">
          <h4 className="font-heading font-bold text-white text-base flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-emerald-400" />
            <span>Penjelasan Konsep</span>
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {activeModule.content.map((paragraph, idx) => (
              <div
                key={idx}
                className="p-4 rounded-2xl bg-slate-800/40 border border-slate-700/60 text-xs sm:text-sm text-slate-200 leading-relaxed flex items-start gap-3"
              >
                <span className="w-5 h-5 rounded-md bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                  {idx + 1}
                </span>
                <span>{paragraph}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Real-World Context SMK Callout */}
        <div className="p-4 rounded-2xl bg-amber-400/10 border border-amber-400/30 flex items-start gap-3.5">
          <div className="p-2 rounded-xl bg-amber-400/20 text-amber-300 shrink-0 mt-0.5">
            <Lightbulb className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[11px] font-bold text-amber-300 uppercase tracking-wider">
              Koneksi Nyata Bidang Kejuruan SMK:
            </span>
            <p className="text-xs sm:text-sm text-slate-200 leading-relaxed mt-0.5">
              {activeModule.contextualSMK}
            </p>
          </div>
        </div>

        {/* Sample Problem & Step-by-Step Solution */}
        {activeModule.sampleProblems.map((prob, idx) => (
          <div key={idx} className="bg-slate-950 border border-slate-800 rounded-2xl p-5 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2 text-xs font-bold text-amber-300">
                <HelpCircle className="w-4 h-4" />
                <span>CONTOH SOAL BERTAHAP #{idx + 1}</span>
              </div>
              <button
                onClick={() => setShowSolutionSteps(!showSolutionSteps)}
                className="text-xs text-slate-400 hover:text-white flex items-center gap-1 font-semibold"
              >
                <span>{showSolutionSteps ? 'Sembunyikan Langkah' : 'Lihat Langkah'}</span>
                {showSolutionSteps ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
              </button>
            </div>

            <p className="text-sm font-semibold text-white">
              {prob.question}
            </p>

            {showSolutionSteps && (
              <div className="space-y-2 pt-2 border-t border-slate-900">
                <span className="text-[11px] font-bold text-emerald-400 uppercase tracking-wider">
                  Langkah-Langkah Penyelesaian Sistematis:
                </span>
                <div className="space-y-1.5 pl-2 border-l-2 border-emerald-500/40">
                  {prob.steps.map((st, sIdx) => (
                    <p key={sIdx} className="text-xs text-slate-300 font-mono">
                      {st}
                    </p>
                  ))}
                </div>
                <div className="pt-2">
                  <div className="p-3 rounded-xl bg-emerald-950/40 border border-emerald-500/30 text-xs font-bold text-emerald-300">
                    Kesimpulan: {prob.solution}
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}

        {/* Interactive Practice at the bottom */}
        <div className="bg-slate-950/90 border border-amber-400/40 rounded-2xl p-6 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-xs font-bold text-amber-400">
              <CheckCircle2 className="w-4 h-4" />
              <span>LATIHAN INTERAKTIF SINGKAT</span>
            </div>
            {completedMaterials.includes(activeModule.id) && (
              <span className="text-xs font-bold text-emerald-400 flex items-center gap-1">
                <CheckCircle2 className="w-4 h-4" /> Modul Ini Telah Tuntas
              </span>
            )}
          </div>

          <p className="text-sm font-semibold text-white">
            {activeModule.interactivePractice.question}
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {activeModule.interactivePractice.options.map((opt, optIdx) => {
              const isSelected = selectedPracticeOption === optIdx;
              const isCorrect = optIdx === activeModule.interactivePractice.correctIndex;
              let btnClass = 'bg-slate-900 border-slate-800 text-slate-200 hover:border-slate-700';

              if (practiceSubmitted) {
                if (isCorrect) {
                  btnClass = 'bg-emerald-950/80 border-emerald-500 text-emerald-200 font-bold';
                } else if (isSelected && !isCorrect) {
                  btnClass = 'bg-rose-950/80 border-rose-500 text-rose-200';
                }
              } else if (isSelected) {
                btnClass = 'bg-blue-900/60 border-amber-400 text-white font-bold';
              }

              return (
                <button
                  key={optIdx}
                  onClick={() => !practiceSubmitted && setSelectedPracticeOption(optIdx)}
                  disabled={practiceSubmitted}
                  className={`p-3.5 rounded-xl border text-left text-xs sm:text-sm transition-all flex items-center gap-3 ${btnClass}`}
                >
                  <span className="w-6 h-6 rounded-lg bg-slate-800 flex items-center justify-center font-bold text-xs shrink-0">
                    {String.fromCharCode(65 + optIdx)}
                  </span>
                  <span>{opt}</span>
                </button>
              );
            })}
          </div>

          {!practiceSubmitted ? (
            <div className="flex justify-end pt-2">
              <button
                onClick={handlePracticeSubmit}
                disabled={selectedPracticeOption === null}
                className="px-5 py-2.5 bg-amber-400 hover:bg-amber-300 disabled:opacity-40 text-slate-950 font-bold rounded-xl text-xs transition-colors shadow"
              >
                Periksa Jawaban
              </button>
            </div>
          ) : (
            <div className="space-y-3 pt-3 border-t border-slate-800">
              <div
                className={`p-4 rounded-xl text-xs sm:text-sm font-medium flex items-start gap-3 ${
                  selectedPracticeOption === activeModule.interactivePractice.correctIndex
                    ? 'bg-emerald-950/60 border border-emerald-500/50 text-emerald-300'
                    : 'bg-rose-950/60 border border-rose-500/50 text-rose-300'
                }`}
              >
                {selectedPracticeOption === activeModule.interactivePractice.correctIndex ? (
                  <CheckCircle2 className="w-5 h-5 shrink-0 text-emerald-400" />
                ) : (
                  <XCircle className="w-5 h-5 shrink-0 text-rose-400" />
                )}
                <div>
                  <p className="font-bold">
                    {selectedPracticeOption === activeModule.interactivePractice.correctIndex
                      ? 'Luar biasa, jawabanmu tepat!'
                      : 'Belum tepat. Coba perhatikan pembahasannya di bawah ini:'}
                  </p>
                  <p className="pt-1 text-slate-200">
                    {activeModule.interactivePractice.explanation}
                  </p>
                </div>
              </div>

              {/* Next module button */}
              <div className="flex justify-end gap-3 pt-2">
                <button
                  onClick={() => {
                    setPracticeSubmitted(false);
                    setSelectedPracticeOption(null);
                  }}
                  className="px-4 py-2 bg-slate-800 text-slate-300 rounded-xl text-xs hover:bg-slate-700"
                >
                  Coba Ulang Latihan
                </button>
                {activeModule.number < 6 && (
                  <button
                    onClick={() => {
                      const next = materials.find((m) => m.number === activeModule.number + 1);
                      if (next) handleSelectModule(next.id);
                    }}
                    className="px-5 py-2 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl text-xs flex items-center gap-1.5 shadow"
                  >
                    <span>Lanjut ke Modul {activeModule.number + 1}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>
          )}

        </div>

      </div>

    </div>
  );
};
