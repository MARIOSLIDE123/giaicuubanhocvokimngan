/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { Check, X, Send, Award, AlertCircle, Sparkles } from 'lucide-react';
import { Coordinate3D, Team } from '../types/game';
import { soundEngine } from '../utils/sound';

interface CoordinateInputBoxProps {
  id: string;
  label: string;
  expected: Coordinate3D;
  points: number;
  teams: Team[];
  activeTeamId: string | null;
  onSelectTeam: (teamId: string) => void;
  onAwardPoints: (teamId: string, pts: number) => void;
  isCompleted?: boolean;
  completedInfo?: { teamName: string; coords: string };
  onSuccess?: () => void;
}

export const CoordinateInputBox: React.FC<CoordinateInputBoxProps> = ({
  id,
  label,
  expected,
  points,
  teams,
  activeTeamId,
  onSelectTeam,
  onAwardPoints,
  isCompleted = false,
  completedInfo,
  onSuccess,
}) => {
  const [valX, setValX] = useState('');
  const [valY, setValY] = useState('');
  const [valZ, setValZ] = useState('');
  const [feedback, setFeedback] = useState<{
    status: 'idle' | 'correct' | 'wrong';
    message: string;
  }>({ status: 'idle', message: '' });

  // Reset local state when id changes
  useEffect(() => {
    setValX('');
    setValY('');
    setValZ('');
    setFeedback({ status: 'idle', message: '' });
  }, [id]);

  const activeTeam = teams.find((t) => t.id === activeTeamId);

  // Helper to parse coordinate numbers supporting commas and negatives
  const parseCoord = (str: string): number | null => {
    const cleaned = str.trim().replace(/,/g, '.');
    if (!cleaned) return null;
    const n = Number(cleaned);
    return isNaN(n) ? null : n;
  };

  const handleConfirm = () => {
    if (isCompleted || feedback.status === 'correct') return;

    if (!activeTeamId || !activeTeam) {
      soundEngine.playWrong();
      setFeedback({
        status: 'wrong',
        message: '⚠️ Vui lòng chọn đội trả lời trước khi xác nhận!',
      });
      return;
    }

    const numX = parseCoord(valX);
    const numY = parseCoord(valY);
    const numZ = parseCoord(valZ);

    if (numX === null || numY === null || numZ === null) {
      soundEngine.playWrong();
      setFeedback({
        status: 'wrong',
        message: '⚠️ Vui lòng nhập đầy đủ cả ba tọa độ x, y, z hợp lệ!',
      });
      return;
    }

    const isMatchX = Math.abs(numX - expected.x) < 0.001;
    const isMatchY = Math.abs(numY - expected.y) < 0.001;
    const isMatchZ = Math.abs(numZ - expected.z) < 0.001;

    if (isMatchX && isMatchY && isMatchZ) {
      soundEngine.playCorrect();
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.65 },
      });
      onAwardPoints(activeTeam.id, points);
      setFeedback({
        status: 'correct',
        message: `🎉 CHÍNH XÁC: (${expected.x}; ${expected.y}; ${expected.z}) · +${points} ĐIỂM CHO ${activeTeam.name}!`,
      });
      onSuccess?.();
    } else {
      soundEngine.playWrong();
      setFeedback({
        status: 'wrong',
        message: `❌ CHƯA CHÍNH XÁC (${numX}; ${numY}; ${numZ})! Mời đội khác giành quyền trả lời!`,
      });
    }
  };

  const isDone = isCompleted || feedback.status === 'correct';

  return (
    <div
      className={`rounded-2xl p-4 transition-all duration-300 border ${
        isDone
          ? 'bg-emerald-950/40 border-emerald-400/60 shadow-[0_0_25px_rgba(16,185,129,0.25)]'
          : feedback.status === 'wrong'
            ? 'bg-red-950/30 border-red-500/50 shadow-[0_0_20px_rgba(239,68,68,0.2)]'
            : 'bg-[#040e2b]/85 border-cyan-500/40 shadow-xl'
      }`}
    >
      {/* Header: Label and Points */}
      <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-pulse" />
          <h4 className="text-sm sm:text-base font-black text-white uppercase tracking-wide">
            {label}
          </h4>
        </div>
        <span className="px-3 py-1 rounded-full text-xs font-black font-mono bg-amber-950/80 text-amber-300 border border-amber-500/50 flex items-center gap-1 shadow">
          <Award className="w-3.5 h-3.5 text-amber-400" />
          +{points} ĐIỂM
        </span>
      </div>

      {/* Answering Team Selector Bar */}
      {!isDone && (
        <div className="mb-3.5 p-2 rounded-xl bg-slate-900/90 border border-slate-700/80 flex flex-wrap items-center justify-between gap-2">
          <div className="text-[11px] font-bold text-slate-300 flex items-center gap-1.5">
            <span>ĐỘI TRẢ LỜI:</span>
            {activeTeam ? (
              <span
                className="px-2.5 py-0.5 rounded-md font-black text-xs shadow"
                style={{
                  backgroundColor: `${activeTeam.color}35`,
                  color: activeTeam.accentColor,
                  border: `1px solid ${activeTeam.accentColor}80`,
                }}
              >
                {activeTeam.name}
              </span>
            ) : (
              <span className="text-amber-400 italic">Chưa chọn đội</span>
            )}
          </div>

          {/* Quick Team Chips */}
          <div className="flex items-center gap-1.5 flex-wrap">
            {teams.map((t) => {
              const isSelected = t.id === activeTeamId;
              return (
                <button
                  key={t.id}
                  type="button"
                  onClick={() => {
                    soundEngine.playClick();
                    onSelectTeam(t.id);
                  }}
                  className={`px-2.5 py-1 rounded-lg text-[11px] font-black transition-all ${
                    isSelected
                      ? 'text-white shadow-md scale-105 ring-2 ring-white/80'
                      : 'text-slate-300 hover:text-white bg-slate-800/80 hover:bg-slate-700'
                  }`}
                  style={{
                    backgroundColor: isSelected ? t.color : undefined,
                  }}
                >
                  {t.name}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* 3 Coordinate Inputs (X, Y, Z) */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {/* Coordinate X */}
        <div className="flex flex-col gap-1">
          <label className="text-[11px] font-black uppercase text-cyan-300 tracking-wider flex items-center justify-between">
            <span>Tọa độ x (Hoành độ)</span>
          </label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-cyan-400 font-mono font-bold text-sm">
              x =
            </span>
            <input
              type="text"
              disabled={isDone}
              value={isDone ? (completedInfo?.coords ? completedInfo.coords.split(';')[0]?.replace(/[()]/g, '').trim() : expected.x) : valX}
              onChange={(e) => setValX(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleConfirm()}
              placeholder="Nhập x..."
              className="w-full pl-10 pr-3 py-2.5 rounded-xl bg-slate-950/90 border border-cyan-500/40 text-amber-300 font-mono font-black text-base sm:text-lg focus:outline-none focus:border-cyan-300 focus:ring-2 focus:ring-cyan-400/50 disabled:opacity-90 disabled:bg-slate-900 shadow-inner"
            />
          </div>
        </div>

        {/* Coordinate Y */}
        <div className="flex flex-col gap-1">
          <label className="text-[11px] font-black uppercase text-cyan-300 tracking-wider flex items-center justify-between">
            <span>Tọa độ y (Tung độ)</span>
          </label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-cyan-400 font-mono font-bold text-sm">
              y =
            </span>
            <input
              type="text"
              disabled={isDone}
              value={isDone ? (completedInfo?.coords ? completedInfo.coords.split(';')[1]?.replace(/[()]/g, '').trim() : expected.y) : valY}
              onChange={(e) => setValY(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleConfirm()}
              placeholder="Nhập y..."
              className="w-full pl-10 pr-3 py-2.5 rounded-xl bg-slate-950/90 border border-cyan-500/40 text-amber-300 font-mono font-black text-base sm:text-lg focus:outline-none focus:border-cyan-300 focus:ring-2 focus:ring-cyan-400/50 disabled:opacity-90 disabled:bg-slate-900 shadow-inner"
            />
          </div>
        </div>

        {/* Coordinate Z */}
        <div className="flex flex-col gap-1">
          <label className="text-[11px] font-black uppercase text-cyan-300 tracking-wider flex items-center justify-between">
            <span>Tọa độ z (Cao độ)</span>
          </label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-cyan-400 font-mono font-bold text-sm">
              z =
            </span>
            <input
              type="text"
              disabled={isDone}
              value={isDone ? (completedInfo?.coords ? completedInfo.coords.split(';')[2]?.replace(/[()]/g, '').trim() : expected.z) : valZ}
              onChange={(e) => setValZ(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleConfirm()}
              placeholder="Nhập z..."
              className="w-full pl-10 pr-3 py-2.5 rounded-xl bg-slate-950/90 border border-cyan-500/40 text-amber-300 font-mono font-black text-base sm:text-lg focus:outline-none focus:border-cyan-300 focus:ring-2 focus:ring-cyan-400/50 disabled:opacity-90 disabled:bg-slate-900 shadow-inner"
            />
          </div>
        </div>
      </div>

      {/* Confirmation and Status */}
      <div className="mt-3.5 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        {/* Feedback message */}
        <div className="flex-1">
          {feedback.status !== 'idle' && (
            <div
              className={`p-2.5 rounded-xl text-xs sm:text-sm font-black flex items-center gap-2 ${
                feedback.status === 'correct'
                  ? 'bg-emerald-900/60 text-emerald-300 border border-emerald-500/60 animate-bounce'
                  : 'bg-red-950/80 text-red-300 border border-red-500/60'
              }`}
            >
              {feedback.status === 'correct' ? (
                <Check className="w-5 h-5 shrink-0 text-emerald-400" />
              ) : (
                <AlertCircle className="w-5 h-5 shrink-0 text-red-400" />
              )}
              <span>{feedback.message}</span>
            </div>
          )}

          {isCompleted && completedInfo && feedback.status === 'idle' && (
            <div className="p-2.5 rounded-xl text-xs sm:text-sm font-black bg-emerald-900/60 text-emerald-300 border border-emerald-500/60 flex items-center gap-2">
              <Check className="w-5 h-5 shrink-0 text-emerald-400" />
              <span>
                ĐÃ GIẢI MÃ: {completedInfo.coords} · {completedInfo.teamName} ghi +{points} điểm!
              </span>
            </div>
          )}
        </div>

        {/* Action Button */}
        {!isDone ? (
          <button
            type="button"
            onClick={handleConfirm}
            className="px-6 py-3 rounded-xl bg-gradient-to-r from-orange-600 via-amber-600 to-yellow-500 hover:from-orange-500 hover:to-yellow-400 text-white font-black text-sm tracking-wider shadow-lg hover:shadow-[0_0_20px_rgba(245,158,11,0.7)] active:scale-95 transition-all flex items-center justify-center gap-2 shrink-0 border border-white/60 cursor-pointer"
          >
            <Send className="w-4 h-4 text-white" />
            <span>XÁC NHẬN ĐÁP ÁN</span>
          </button>
        ) : (
          <div className="px-5 py-2.5 rounded-xl bg-emerald-900/80 border border-emerald-400 text-emerald-300 font-black text-xs uppercase flex items-center gap-2 shadow">
            <Sparkles className="w-4 h-4 text-amber-300" />
            <span>ĐÃ MỞ KHÓA TỌA ĐỘ</span>
          </div>
        )}
      </div>
    </div>
  );
};
