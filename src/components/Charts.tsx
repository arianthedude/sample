// Lightweight dependency-free SVG charts.

export function Donut({ data, size = 160, thickness = 22 }: {
  data: { label: string; value: number; color: string }[]; size?: number; thickness?: number
}) {
  const total = data.reduce((a, d) => a + d.value, 0) || 1
  const r = (size - thickness) / 2
  const c = 2 * Math.PI * r
  let offset = 0
  return (
    <div className="flex items-center gap-5">
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="shrink-0">
        <g transform={`rotate(-90 ${size / 2} ${size / 2})`}>
          <circle cx={size / 2} cy={size / 2} r={r} fill="none" strokeWidth={thickness} className="stroke-ink-100 dark:stroke-ink-800" />
          {data.map((d, i) => {
            const len = (d.value / total) * c
            const el = (
              <circle key={i} cx={size / 2} cy={size / 2} r={r} fill="none" stroke={d.color} strokeWidth={thickness}
                strokeDasharray={`${len} ${c - len}`} strokeDashoffset={-offset} strokeLinecap="butt" />
            )
            offset += len
            return el
          })}
        </g>
        <text x="50%" y="50%" textAnchor="middle" dominantBaseline="central" className="fill-ink-800 dark:fill-ink-100 font-semibold" style={{ fontSize: size * 0.16 }}>
          {total}
        </text>
        <text x="50%" y="50%" dy={size * 0.1} textAnchor="middle" dominantBaseline="central" className="fill-ink-400" style={{ fontSize: size * 0.06 }}>total</text>
      </svg>
      <div className="space-y-2 min-w-0">
        {data.map((d, i) => (
          <div key={i} className="flex items-center gap-2.5 text-sm">
            <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ background: d.color }} />
            <span className="text-ink-600 dark:text-ink-300 truncate">{d.label}</span>
            <span className="ml-auto font-medium text-ink-800 dark:text-ink-100 tabular-nums">{d.value}</span>
            <span className="text-ink-400 text-xs tabular-nums w-10 text-right">{Math.round((d.value / total) * 100)}%</span>
          </div>
        ))}
      </div>
    </div>
  )
}

export function Bars({ data, height = 180 }: { data: { label: string; value: number; color?: string }[]; height?: number }) {
  const max = Math.max(...data.map(d => d.value), 1)
  return (
    <div className="flex items-end gap-2.5" style={{ height }}>
      {data.map((d, i) => {
        const h = (d.value / max) * (height - 28)
        return (
          <div key={i} className="flex-1 flex flex-col items-center gap-2 min-w-0">
            <div className="flex-1 flex items-end w-full justify-center">
              <div className="w-full max-w-[34px] rounded-t-lg transition-all hover:opacity-80"
                style={{ height: h, background: d.color || '#2563eb' }}
                title={`${d.label}: ${d.value}`}>
                <div className="text-[10px] text-white font-medium text-center pt-1 tabular-nums">{d.value}</div>
              </div>
            </div>
            <span className="text-[11px] text-ink-500 dark:text-ink-400 truncate w-full text-center">{d.label}</span>
          </div>
        )
      })}
    </div>
  )
}

export function LineChart({ data, height = 180, color = '#2563eb' }: { data: { label: string; value: number }[]; height?: number; color?: string }) {
  const max = Math.max(...data.map(d => d.value), 1)
  const w = 600
  const h = height
  const pad = 24
  const stepX = (w - pad * 2) / (data.length - 1 || 1)
  const pts = data.map((d, i) => [pad + i * stepX, h - pad - (d.value / max) * (h - pad * 2)] as const)
  const path = pts.map((p, i) => `${i === 0 ? 'M' : 'L'}${p[0]},${p[1]}`).join(' ')
  const area = `${path} L${pts[pts.length - 1][0]},${h - pad} L${pts[0][0]},${h - pad} Z`
  return (
    <svg viewBox={`0 0 ${w} ${h}`} className="w-full" style={{ height }}>
      <defs>
        <linearGradient id="lc" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.25" />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </linearGradient>
      </defs>
      {[0.25, 0.5, 0.75, 1].map((f, i) => (
        <line key={i} x1={pad} x2={w - pad} y1={h - pad - f * (h - pad * 2)} y2={h - pad - f * (h - pad * 2)} className="stroke-ink-100 dark:stroke-ink-800" strokeWidth="1" />
      ))}
      <path d={area} fill="url(#lc)" />
      <path d={path} fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
      {pts.map((p, i) => (
        <g key={i}>
          <circle cx={p[0]} cy={p[1]} r="3.5" fill="white" stroke={color} strokeWidth="2" />
          <text x={p[0]} y={h - 6} textAnchor="middle" className="fill-ink-400" style={{ fontSize: 10 }}>{data[i].label}</text>
        </g>
      ))}
    </svg>
  )
}

export function Sparkline({ data, color = '#2563eb', width = 120, height = 36 }: { data: number[]; color?: string; width?: number; height?: number }) {
  const max = Math.max(...data, 1)
  const min = Math.min(...data, 0)
  const range = max - min || 1
  const step = width / (data.length - 1 || 1)
  const pts = data.map((v, i) => [i * step, height - ((v - min) / range) * height] as const)
  const path = pts.map((p, i) => `${i === 0 ? 'M' : 'L'}${p[0]},${p[1]}`).join(' ')
  return (
    <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`}>
      <path d={path} fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}
