/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { 
  Radar, CheckCircle2, HelpCircle, 
  Sparkles, AlertCircle, ArrowRight, RotateCcw, Eye, Radio, Compass
} from 'lucide-react';
import { Team, CoordinateQuestion, QuestionSetMode } from '../types/game';
import { getQuestionsForStage } from '../data/questions';
import { soundEngine } from '../utils/sound';
import { StageSidebar } from './StageSidebar';
import { StageVideoModal } from './StageVideoModal';
import { CoordinateInputBox } from './CoordinateInputBox';

interface Stage1Props {
  teams: Team[];
  activeTeamId: string | null;
  onSelectTeam: (teamId: string) => void;
  onAwardPoints: (teamId: string, pts: number) => void;
  onAdjustPoints: (teamId: string, delta: number) => void;
  onResetAllScores: () => void;
  onCompleteStage1: () => void;
  onBackToMap: () => void;
  shuffleQuestions?: boolean;
  questionSetMode?: QuestionSetMode;
}

export const Stage1Tracking: React.FC<Stage1Props> = ({
  teams,
  activeTeamId,
  onSelectTeam,
  onAwardPoints,
  onAdjustPoints,
  onResetAllScores,
  onCompleteStage1,
  onBackToMap,
  shuffleQuestions = false,
  questionSetMode = 'standard',
}) => {
  const questionsList: CoordinateQuestion[] = useMemo(() => {
    const list = [...getQuestionsForStage(1, questionSetMode)];
    if (shuffleQuestions) {
      for (let i = list.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [list[i], list[j]] = [list[j], list[i]];
      }
    }
    return list;
  }, [shuffleQuestions, questionSetMode]);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [completedTaskIds, setCompletedTaskIds] = useState<string[]>([]);
  const [completedDetails, setCompletedDetails] = useState<{
    [partId: string]: { teamName: string; coords: string };
  }>({});
  const [isSolutionShown, setIsSolutionShown] = useState(false);
  const [isHintShown, setIsHintShown] = useState(false);
  const [isIntroModalOpen, setIsIntroModalOpen] = useState(false);

  const currentQ = questionsList[currentIndex] || questionsList[0];

  // Start background music on mount, pause when leaving
  useEffect(() => {
    soundEngine.playStageBGM();
    return () => {
      soundEngine.pauseStageBGM();
    };
  }, []);

  // Reset hint/solution when changing question
  useEffect(() => {
    setIsSolutionShown(false);
    setIsHintShown(false);
  }, [currentIndex]);

  const allCompleted = questionsList.every((q) => completedTaskIds.includes(q.id));

  const handleTaskPartSuccess = (partId: string, teamId: string, coordsStr: string) => {
    const t = teams.find((team) => team.id === teamId);
    setCompletedDetails((prev) => ({
      ...prev,
      [partId]: { teamName: t ? t.name : 'Đội', coords: coordsStr },
    }));

    if (!completedTaskIds.includes(currentQ.id)) {
      const nextCompleted = [...completedTaskIds, currentQ.id];
      setCompletedTaskIds(nextCompleted);

      if (nextCompleted.length === questionsList.length) {
        soundEngine.playFanfare();
        confetti({
          particleCount: 100,
          spread: 80,
          origin: { y: 0.5 },
        });
      }
    }
  };

  // Fixed radar signal blip positions for exactly 3 signals
  const radarSignals = [
    { top: '30%', left: '68%', label: 'Tín hiệu 1' },
    { top: '65%', left: '32%', label: 'Tín hiệu 2' },
    { top: '42%', left: '25%', label: 'Tín hiệu 3' },
  ];

  return (
    <div className="relative min-h-[calc(100vh-68px)] flex flex-col justify-between p-3 sm:p-5 xl:p-6 w-full max-w-[1780px] mx-auto z-10">
      {/* Intro Briefing Modal */}
      {isIntroModalOpen && (
        <StageVideoModal
          stage={1}
          onClose={() => setIsIntroModalOpen(false)}
        />
      )}

      {/* Main 2-Column Responsive Layout */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-4 items-stretch flex-1">
        {/* Left Interactive Mission Area (8 cols) */}
        <div className="xl:col-span-8 flex flex-col justify-between gap-4 panel-cosmic rounded-3xl p-4 sm:p-6 border border-cyan-500/40 shadow-2xl">
          {/* Top Stage Bar */}
          <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-cyan-500/30">
            <div>
              <div className="flex items-center gap-2 text-cyan-300 text-xs font-black uppercase tracking-wider">
                <Radar className="w-4 h-4 text-cyan-400 animate-spin" />
                <span>CHẶNG 1: TRUY VẾT TÀU UFO (9 PHÚT)</span>
                <span className="px-2 py-0.5 rounded-md bg-cyan-950/80 border border-cyan-400/50 text-[10px] text-amber-300">
                  {completedTaskIds.length}/{questionsList.length} TÍN HIỆU
                </span>
              </div>
              <h2 className="text-base sm:text-lg font-black text-white mt-1">
                {currentQ.signalName}
              </h2>
            </div>

            {/* 3 Task Selector Tabs */}
            <div className="flex items-center gap-2">
              {questionsList.map((q, idx) => {
                const isCompleted = completedTaskIds.includes(q.id);
                const isCurrent = idx === currentIndex;
                return (
                  <button
                    key={q.id}
                    onClick={() => {
                      soundEngine.playClick();
                      setCurrentIndex(idx);
                    }}
                    className={`px-3.5 py-1.5 rounded-xl font-black text-xs flex items-center gap-1.5 transition-all cursor-pointer ${
                      isCurrent
                        ? 'bg-cyan-400 text-slate-950 shadow-[0_0_15px_#22d3ee] scale-105'
                        : isCompleted
                          ? 'bg-emerald-600 text-white shadow'
                          : 'bg-slate-800 text-slate-300 border border-slate-700 hover:text-white hover:border-cyan-400'
                    }`}
                  >
                    {isCompleted && <CheckCircle2 className="w-3.5 h-3.5 text-white" />}
                    <span>Tín hiệu {idx + 1}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Center Content: Split Radar Graphic (4 cols) & Coordinate Problem (8 cols) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-stretch flex-1">
            {/* Visual Radar Screen (4 cols) */}
            <div className="lg:col-span-4 panel-cosmic rounded-2xl border border-cyan-500/30 p-3.5 flex flex-col justify-between items-center text-center shadow-xl">
              <div className="w-full flex items-center justify-between text-xs text-slate-300 font-bold mb-1">
                <span className="text-cyan-300 flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
                  RADAR ĐỊNH VỊ KHÔNG GIAN
                </span>
                <span className="bg-slate-900 px-2 py-0.5 rounded-full border border-slate-700 text-amber-300 font-mono text-xs">
                  {completedTaskIds.length}/3 Tín hiệu
                </span>
              </div>

              {/* Circular Hologram Radar */}
              <div className="relative w-48 h-48 sm:w-56 sm:h-56 xl:w-64 xl:h-64 rounded-full border-2 border-cyan-400/50 bg-[#020716] overflow-hidden my-auto shadow-[0_0_30px_rgba(34,211,238,0.25)]">
                <div className="absolute inset-4 rounded-full border border-cyan-400/20" />
                <div className="absolute inset-10 rounded-full border border-cyan-400/25" />
                <div className="absolute inset-18 rounded-full border border-cyan-400/30" />
                <div className="absolute top-0 bottom-0 left-1/2 w-[1px] bg-cyan-400/30" />
                <div className="absolute left-0 right-0 top-1/2 h-[1px] bg-cyan-400/30" />

                {/* Rotating Sweep */}
                <div
                  className="absolute inset-0 animate-radar origin-center pointer-events-none"
                  style={{
                    background:
                      'conic-gradient(from 0deg at 50% 50%, rgba(34, 211, 238, 0.45) 0deg, transparent 65deg, transparent 360deg)',
                  }}
                />

                {/* 3 Coordinate Signal Blips */}
                {questionsList.map((q, idx) => {
                  const isDone = completedTaskIds.includes(q.id);
                  const isCur = idx === currentIndex;
                  const pos = radarSignals[idx] || { top: '50%', left: '50%' };
                  return (
                    <div
                      key={q.id}
                      style={{ top: pos.top, left: pos.left }}
                      onClick={() => setCurrentIndex(idx)}
                      className={`absolute -translate-x-1/2 -translate-y-1/2 cursor-pointer transition-all ${
                        isDone ? 'scale-125' : isCur ? 'scale-110' : 'opacity-80 hover:opacity-100'
                      }`}
                    >
                      <div
                        className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-black border-2 shadow-lg ${
                          isDone
                            ? 'bg-emerald-400 border-white text-slate-950 animate-pulse shadow-[0_0_15px_#10b981]'
                            : isCur
                              ? 'bg-cyan-400 border-white text-slate-950 animate-ping shadow-[0_0_15px_#22d3ee]'
                              : 'bg-red-500/80 border-red-300 text-white'
                        }`}
                      >
                        {idx + 1}
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Trajectory Status */}
              <div className="w-full p-2.5 rounded-xl bg-slate-950/80 border border-slate-700 text-left text-xs text-slate-300 space-y-1">
                <div className="flex justify-between">
                  <span className="text-slate-400">Trạng thái:</span>
                  <span className={allCompleted ? 'text-emerald-400 font-black' : 'text-cyan-300 font-bold'}>
                    {allCompleted ? '✓ Khóa đường bay UFO' : 'Đang quét sóng radar'}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Tọa độ giải mã:</span>
                  <span className="text-amber-300 font-mono font-bold">
                    {completedTaskIds.length} / 3 Vectơ
                  </span>
                </div>
              </div>
            </div>

            {/* Coordinate Problem & Interactive Input (8 cols) */}
            <div className="lg:col-span-8 panel-cosmic rounded-2xl border border-cyan-500/40 p-4 xl:p-5 flex flex-col justify-between shadow-xl space-y-4">
              <div className="space-y-3">
                {/* Badge & Context */}
                <div className="flex items-center justify-between gap-2">
                  <span className="px-3 py-1 rounded-lg bg-blue-950 border border-cyan-400/50 text-cyan-300 font-black text-xs uppercase tracking-wider">
                    {currentQ.subtitle || `Tín hiệu ${currentIndex + 1} / 3`}
                  </span>
                  <span className="text-xs font-black font-mono text-amber-300 bg-amber-950/80 border border-amber-500/50 px-3 py-1 rounded-lg">
                    +{currentQ.points} ĐIỂM
                  </span>
                </div>

                <div className="p-3 rounded-xl bg-cyan-950/40 border border-cyan-500/30 space-y-1">
                  <p className="text-xs text-cyan-200 font-medium">
                    📌 {currentQ.contextDesc}
                  </p>
                  <h3 className="text-sm sm:text-base font-black text-white text-high-contrast">
                    {currentQ.questionText}
                  </h3>
                </div>

                {/* Coordinate Input Box */}
                {currentQ.parts.map((part) => {
                  const isDone = completedTaskIds.includes(currentQ.id);
                  const detail = completedDetails[part.id];
                  return (
                    <CoordinateInputBox
                      key={part.id}
                      id={part.id}
                      label={part.label}
                      expected={part.expected}
                      points={part.points}
                      teams={teams}
                      activeTeamId={activeTeamId}
                      onSelectTeam={onSelectTeam}
                      onAwardPoints={onAwardPoints}
                      isCompleted={isDone}
                      completedInfo={detail}
                      onSuccess={() =>
                        handleTaskPartSuccess(
                          part.id,
                          activeTeamId || '',
                          `(${part.expected.x}; ${part.expected.y}; ${part.expected.z})`
                        )
                      }
                    />
                  );
                })}

                {/* Hint Box */}
                {isHintShown && (
                  <div className="p-3.5 rounded-xl bg-amber-950/60 border border-amber-500/50 text-amber-200 text-xs sm:text-sm font-medium animate-fadeIn">
                    <strong className="text-amber-300 block mb-1">💡 GỢI Ý GIẢI TOÁN:</strong>
                    {currentQ.hint}
                  </div>
                )}

                {/* Solution Box */}
                {isSolutionShown && (
                  <div className="p-4 rounded-xl bg-slate-900 border border-cyan-400/60 text-slate-100 text-xs sm:text-sm font-mono whitespace-pre-line leading-relaxed shadow-xl animate-fadeIn">
                    <strong className="text-cyan-300 block mb-1.5 font-sans font-black uppercase">
                      📖 LỜI GIẢI CHI TIẾT DÀNH CHO GIÁO VIÊN:
                    </strong>
                    {currentQ.solution}
                  </div>
                )}
              </div>

              {/* Bottom Mission Actions */}
              <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-cyan-500/30">
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      soundEngine.playClick();
                      setIsHintShown(!isHintShown);
                    }}
                    className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-amber-300 border border-amber-500/40 text-xs font-bold transition-colors flex items-center gap-1.5"
                  >
                    <HelpCircle className="w-4 h-4" />
                    <span>{isHintShown ? 'Ẩn gợi ý' : 'Gợi ý'}</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      soundEngine.playClick();
                      setIsSolutionShown(!isSolutionShown);
                    }}
                    className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-cyan-300 border border-cyan-500/40 text-xs font-bold transition-colors flex items-center gap-1.5"
                  >
                    <Eye className="w-4 h-4" />
                    <span>{isSolutionShown ? 'Ẩn lời giải' : 'Hiện lời giải'}</span>
                  </button>
                </div>

                {/* Next Task or Advance to Stage 2 Button */}
                {allCompleted ? (
                  <button
                    type="button"
                    onClick={() => {
                      soundEngine.playUnlock();
                      onCompleteStage1();
                    }}
                    className="px-6 py-3 rounded-2xl bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-500 hover:from-emerald-500 hover:to-cyan-400 text-white font-black text-sm tracking-wider shadow-[0_0_30px_rgba(16,185,129,0.8)] animate-pulse flex items-center gap-2 cursor-pointer"
                  >
                    <Sparkles className="w-4 h-4 text-amber-300" />
                    <span>TIẾN VÀO CHẶNG 2: ĐỘT NHẬP UFO</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                ) : (
                  currentIndex < questionsList.length - 1 && (
                    <button
                      type="button"
                      onClick={() => {
                        soundEngine.playClick();
                        setCurrentIndex(currentIndex + 1);
                      }}
                      className="px-5 py-2.5 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-slate-950 font-black text-xs flex items-center gap-1.5 transition-all shadow cursor-pointer"
                    >
                      <span>Tín hiệu tiếp theo</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  )
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Right Stage Sidebar: Timer, Scoreboard & Adjustment (4 cols) */}
        <div className="xl:col-span-4 flex flex-col justify-between">
          <StageSidebar
            teams={teams}
            activeTeamId={activeTeamId}
            onSelectTeam={onSelectTeam}
            onAdjustPoints={onAdjustPoints}
            onResetAllScores={onResetAllScores}
            initialTimeSeconds={540} // 9 minutes
            onToggleShowSolution={() => setIsSolutionShown(!isSolutionShown)}
            isSolutionShown={isSolutionShown}
            onToggleShowHint={() => setIsHintShown(!isHintShown)}
            isHintShown={isHintShown}
            onBackToMap={onBackToMap}
            onNextQuestion={() => {
              if (currentIndex < questionsList.length - 1) {
                setCurrentIndex(currentIndex + 1);
              }
            }}
            showNextButton={currentIndex < questionsList.length - 1}
            nextButtonLabel="Tín hiệu tiếp"
          />
        </div>
      </div>
    </div>
  );
};
