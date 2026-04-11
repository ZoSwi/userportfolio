import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

/**
 * Performance Monitor
 * - Real-time FPS monitoring
 * - Memory usage tracking
 * - Performance warnings
 * - Debug information
 */
const PerformanceMonitor = ({ visible = false }) => {
  const [stats, setStats] = useState({
    fps: 60,
    memory: 0,
    renderTime: 0,
    frameCount: 0,
  });

  useEffect(() => {
    let frameCount = 0;
    let lastTime = performance.now();
    let fps = 60;
    let frameTime = 0;

    const updateStats = () => {
      frameCount++;
      const currentTime = performance.now();
      const deltaTime = currentTime - lastTime;

      if (deltaTime >= 1000) {
        fps = Math.round((frameCount * 1000) / deltaTime);
        frameCount = 0;
        lastTime = currentTime;
      }

      // Memory usage (if available)
      let memory = 0;
      if (performance.memory) {
        memory = (performance.memory.usedJSHeapSize / 1048576).toFixed(2);
      }

      frameTime = deltaTime.toFixed(2);

      setStats({
        fps,
        memory,
        renderTime: frameTime,
        frameCount,
      });

      requestAnimationFrame(updateStats);
    };

    const raf = requestAnimationFrame(updateStats);

    return () => cancelAnimationFrame(raf);
  }, []);

  if (!visible) return null;

  const fpsColor =
    stats.fps >= 55 ? "text-green-400" : stats.fps >= 30 ? "text-yellow-400" : "text-red-400";

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="fixed top-20 right-6 z-[1000] pointer-events-auto"
    >
      <div className="rounded-lg border border-accent/40 bg-surface/90 backdrop-blur-xl p-4 w-64 shadow-lg">
        <h3 className="text-xs font-semibold text-accent mb-3 uppercase tracking-widest">
          Performance Monitor
        </h3>

        <div className="space-y-2 text-xs font-mono">
          <div className="flex justify-between items-center">
            <span className="text-muted">FPS:</span>
            <span className={`font-bold ${fpsColor}`}>{stats.fps}</span>
          </div>

          <div className="flex justify-between items-center">
            <span className="text-muted">Frame Time:</span>
            <span className="text-accent">{stats.renderTime}ms</span>
          </div>

          {stats.memory > 0 && (
            <div className="flex justify-between items-center">
              <span className="text-muted">Memory:</span>
              <span className="text-accent">{stats.memory}MB</span>
            </div>
          )}

          {/* Visual FPS bar */}
          <div className="mt-3 pt-3 border-t border-white/10">
            <div className="text-xs text-muted mb-1">Performance:</div>
            <div className="w-full h-2 bg-surface/50 rounded-full overflow-hidden">
              <motion.div
                animate={{ width: `${(stats.fps / 60) * 100}%` }}
                transition={{ duration: 0.1 }}
                className={`h-full rounded-full transition-colors ${
                  stats.fps >= 55
                    ? "bg-gradient-to-r from-green-500 to-green-400"
                    : stats.fps >= 30
                      ? "bg-gradient-to-r from-yellow-500 to-yellow-400"
                      : "bg-gradient-to-r from-red-500 to-red-400"
                }`}
              />
            </div>
          </div>
        </div>

        <p className="text-xs text-muted/50 mt-3 text-center">
          Press Ctrl+Shift+M to toggle
        </p>
      </div>
    </motion.div>
  );
};

export default PerformanceMonitor;
