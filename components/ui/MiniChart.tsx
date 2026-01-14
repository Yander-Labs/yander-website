"use client";

import { useMemo } from "react";

interface MiniChartProps {
  data: number[];
  width?: number;
  height?: number;
  color?: string;
  fillOpacity?: number;
  strokeWidth?: number;
  showDot?: boolean;
  trend?: "up" | "down" | "neutral";
}

export function MiniChart({
  data,
  width = 60,
  height = 24,
  color,
  fillOpacity = 0.15,
  strokeWidth = 1.5,
  showDot = true,
  trend,
}: MiniChartProps) {
  const { path, fillPath, lastPoint, strokeColor, fillColor } = useMemo(() => {
    if (data.length < 2) return { path: "", fillPath: "", lastPoint: null, strokeColor: "", fillColor: "" };

    const min = Math.min(...data);
    const max = Math.max(...data);
    const range = max - min || 1;
    const padding = 2;

    const points = data.map((value, index) => ({
      x: padding + (index / (data.length - 1)) * (width - padding * 2),
      y: padding + ((max - value) / range) * (height - padding * 2),
    }));

    // Create smooth curve using bezier curves
    let pathD = `M ${points[0].x} ${points[0].y}`;
    for (let i = 1; i < points.length; i++) {
      const prev = points[i - 1];
      const curr = points[i];
      const cp1x = prev.x + (curr.x - prev.x) / 3;
      const cp2x = prev.x + (2 * (curr.x - prev.x)) / 3;
      pathD += ` C ${cp1x} ${prev.y}, ${cp2x} ${curr.y}, ${curr.x} ${curr.y}`;
    }

    // Fill path
    const fillD = `${pathD} L ${points[points.length - 1].x} ${height} L ${points[0].x} ${height} Z`;

    // Determine color based on trend
    const autoTrend = trend || (data[data.length - 1] > data[0] ? "up" : data[data.length - 1] < data[0] ? "down" : "neutral");
    const baseColor = color || (autoTrend === "up" ? "#10b981" : autoTrend === "down" ? "#ef4444" : "#6b7280");

    return {
      path: pathD,
      fillPath: fillD,
      lastPoint: points[points.length - 1],
      strokeColor: baseColor,
      fillColor: baseColor,
    };
  }, [data, width, height, color, trend]);

  if (data.length < 2) return null;

  return (
    <svg width={width} height={height} className="overflow-visible">
      {/* Gradient fill under the line */}
      <defs>
        <linearGradient id={`gradient-${strokeColor}`} x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor={fillColor} stopOpacity={fillOpacity} />
          <stop offset="100%" stopColor={fillColor} stopOpacity={0} />
        </linearGradient>
      </defs>

      {/* Fill area */}
      <path
        d={fillPath}
        fill={`url(#gradient-${strokeColor})`}
      />

      {/* Line */}
      <path
        d={path}
        fill="none"
        stroke={strokeColor}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* End dot */}
      {showDot && lastPoint && (
        <>
          <circle
            cx={lastPoint.x}
            cy={lastPoint.y}
            r={3}
            fill="white"
            stroke={strokeColor}
            strokeWidth={1.5}
          />
          <circle
            cx={lastPoint.x}
            cy={lastPoint.y}
            r={1.5}
            fill={strokeColor}
          />
        </>
      )}
    </svg>
  );
}

interface MiniBarChartProps {
  data: number[];
  width?: number;
  height?: number;
  color?: string;
  barWidth?: number;
  gap?: number;
}

export function MiniBarChart({
  data,
  width = 48,
  height = 20,
  color = "#6b7280",
  barWidth = 4,
  gap = 2,
}: MiniBarChartProps) {
  const bars = useMemo(() => {
    if (data.length === 0) return [];

    const max = Math.max(...data);
    const range = max || 1;

    return data.map((value, index) => ({
      x: index * (barWidth + gap),
      height: (value / range) * height,
      y: height - (value / range) * height,
    }));
  }, [data, height, barWidth, gap]);

  return (
    <svg width={width} height={height}>
      {bars.map((bar, index) => (
        <rect
          key={index}
          x={bar.x}
          y={bar.y}
          width={barWidth}
          height={bar.height}
          rx={1}
          fill={color}
          opacity={0.3 + (index / data.length) * 0.7}
        />
      ))}
    </svg>
  );
}

interface ScoreIndicatorProps {
  score: number;
  maxScore?: number;
  size?: "sm" | "md" | "lg";
  showLabel?: boolean;
}

export function ScoreIndicator({
  score,
  maxScore = 10,
  size = "md",
  showLabel = false,
}: ScoreIndicatorProps) {
  const percentage = (score / maxScore) * 100;
  const color = score <= 3 ? "#10b981" : score <= 6 ? "#f59e0b" : "#ef4444";

  const dimensions = {
    sm: { width: 32, height: 4 },
    md: { width: 48, height: 5 },
    lg: { width: 64, height: 6 },
  };

  const { width, height } = dimensions[size];

  return (
    <div className="flex items-center gap-2">
      <div
        className="rounded-full overflow-hidden bg-gray-100"
        style={{ width, height }}
      >
        <div
          className="h-full rounded-full transition-all duration-500"
          style={{
            width: `${percentage}%`,
            backgroundColor: color,
          }}
        />
      </div>
      {showLabel && (
        <span
          className="text-xs font-semibold"
          style={{ color }}
        >
          {score}
        </span>
      )}
    </div>
  );
}
