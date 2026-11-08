/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { Component, ErrorInfo, ReactNode } from 'react';
import { AlertTriangle, RotateCcw, Home } from 'lucide-react';

interface Props {
  children: ReactNode;
  fallbackScreen?: () => void;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
  }

  public handleReset = () => {
    this.setState({ hasError: false, error: null });
    if (this.props.fallbackScreen) {
      this.props.fallbackScreen();
    } else {
      window.location.reload();
    }
  };

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-[60vh] flex flex-col items-center justify-center p-6 text-center z-50">
          <div className="panel-cosmic max-w-lg w-full p-8 rounded-3xl border-2 border-red-500/60 shadow-[0_0_50px_rgba(239,68,68,0.4)] space-y-5">
            <div className="w-16 h-16 rounded-2xl bg-red-950/80 border border-red-500 text-red-400 mx-auto flex items-center justify-center shadow-lg">
              <AlertTriangle className="w-8 h-8" />
            </div>

            <div className="space-y-2">
              <h2 className="text-xl font-black text-white">ĐÃ CÓ SỰ CỐ TẢI GIAO DIỆN</h2>
              <p className="text-xs sm:text-sm text-slate-300 font-medium">
                {this.state.error?.message || 'Không thể hiển thị màn hình này.'}
              </p>
            </div>

            <div className="flex items-center justify-center gap-3 pt-2">
              <button
                type="button"
                onClick={this.handleReset}
                className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 font-black text-xs sm:text-sm flex items-center gap-2 shadow-lg hover:brightness-110 cursor-pointer"
              >
                <RotateCcw className="w-4 h-4" />
                <span>THỬ LẠI</span>
              </button>
              <button
                type="button"
                onClick={() => {
                  window.location.href = window.location.pathname;
                }}
                className="px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs sm:text-sm flex items-center gap-2 border border-slate-600 cursor-pointer"
              >
                <Home className="w-4 h-4 text-cyan-300" />
                <span>VỀ TRANG CHỦ</span>
              </button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
