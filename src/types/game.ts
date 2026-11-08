/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type ScreenState = 
  | 'WELCOME' 
  | 'SETUP_TEAMS' 
  | 'ROADMAP' 
  | 'STAGE_1' 
  | 'STAGE_2' 
  | 'STAGE_3' 
  | 'VICTORY';

export interface Team {
  id: string;
  name: string;
  color: string;       // HEX color
  accentColor: string; // Complementary highlight
  icon: string;        // 'rocket' | 'planet' | 'comet' | 'star' | 'satellite' | 'ufo'
  score: number;
  correctAnswers: number;
  tasksCompleted: number;
}

export type TaskDifficulty = 'Nhận biết' | 'Thông hiểu' | 'Vận dụng' | 'Vận dụng cao';

export interface Coordinate3D {
  x: number;
  y: number;
  z: number;
}

export interface CoordinatePart {
  id: string;
  label: string;          // e.g. "Tọa độ vectơ a - b" hoặc "Tọa độ trung điểm M"
  expected: Coordinate3D;
  points: number;
  explanation?: string;
}

export interface CoordinateQuestion {
  id: string;
  stage: 1 | 2 | 3;
  taskNumber: number;
  signalName: string;     // e.g. "TÍN HIỆU 1 – VÍ DỤ 1a"
  subtitle?: string;      // e.g. "Ví dụ 1 (Ý 1)"
  contextDesc: string;    // e.g. "Trong không gian Oxyz, cho hai vectơ a = (2; 1; 5) và b = (2; 2; 1)."
  questionText: string;   // e.g. "Tìm tọa độ vectơ a - b"
  difficulty: TaskDifficulty;
  defaultTimeSeconds: number;
  points: number;
  parts: CoordinatePart[];
  hint: string;
  solution: string;
}

export type QuestionSetMode = 'standard' | 'backup';

export interface GameSettings {
  soundEnabled: boolean;
  voiceEnabled: boolean;
  soundVolume: number;
  shuffleQuestions: boolean;
  questionSetMode: QuestionSetMode; // 'standard' (Bộ câu hỏi gốc theo Slide) | 'backup' (Bộ câu hỏi tương tự dự phòng)
  timerDurations: {
    stage1: number; // default 540s (9 min)
    stage2: number; // default 720s (12 min)
    stage3: number; // default 660s (11 min)
  };
  pointsConfig: {
    stage1Item: number; // 10
    stage2Item: number; // 20
    stage3Midpoint: number; // 10
    stage3Centroid: number; // 10
    stage3PointC: number;   // 20
    stealBonus: number;     // 5
  };
}

export interface GameProgress {
  stage1CompletedTasks: string[]; // question ids
  stage2UnlockedLocks: number;    // 0 to 1
  stage3MasterKeys: number;       // 0 to 2
  activeStage: 1 | 2 | 3;
  stage1Done: boolean;
  stage2Done: boolean;
  stage3Done: boolean;
}
