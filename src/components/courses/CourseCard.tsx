import * as React from 'react';
import { Link } from 'react-router-dom';
import type { Course } from '@/types';

/**
 * Props del CourseCard
 */
interface CourseCardProps {
  /** Datos del curso a renderizar */
  course: Course;
}

/** SVG ilustraciones inline por índice de color */
const CourseThumbnail = ({ color, seed }: { color: string; seed: number }): React.JSX.Element => {
  const illustrations = [
    // Ilustración 0 — computadora + elementos flotantes
    <svg key="0" viewBox="0 0 280 140" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <rect width="280" height="140" fill={color} opacity="0.15"/>
      <rect width="280" height="140" fill="url(#g0)"/>
      <defs>
        <linearGradient id="g0" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.3"/>
          <stop offset="100%" stopColor={color} stopOpacity="0.05"/>
        </linearGradient>
      </defs>
      {/* Monitor */}
      <rect x="90" y="30" width="100" height="65" rx="6" fill={color} opacity="0.6"/>
      <rect x="95" y="35" width="90" height="52" rx="3" fill="white" opacity="0.9"/>
      <rect x="130" y="95" width="20" height="8" rx="2" fill={color} opacity="0.5"/>
      <rect x="110" y="103" width="60" height="4" rx="2" fill={color} opacity="0.3"/>
      {/* Elementos flotantes */}
      <circle cx="50" cy="50" r="18" fill={color} opacity="0.2"/>
      <circle cx="240" cy="90" r="14" fill={color} opacity="0.15"/>
      <rect x="220" y="25" width="25" height="25" rx="5" fill={color} opacity="0.25" transform="rotate(20 232 37)"/>
      <circle cx="70" cy="100" r="10" fill={color} opacity="0.18"/>
      {/* Líneas de código en pantalla */}
      <rect x="102" y="42" width="50" height="3" rx="1.5" fill={color} opacity="0.4"/>
      <rect x="102" y="49" width="35" height="3" rx="1.5" fill={color} opacity="0.3"/>
      <rect x="102" y="56" width="60" height="3" rx="1.5" fill={color} opacity="0.4"/>
      <rect x="102" y="63" width="28" height="3" rx="1.5" fill={color} opacity="0.25"/>
      <rect x="102" y="70" width="45" height="3" rx="1.5" fill={color} opacity="0.35"/>
    </svg>,

    // Ilustración 1 — gráfica + estadísticas
    <svg key="1" viewBox="0 0 280 140" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <rect width="280" height="140" fill={color} opacity="0.12"/>
      <defs>
        <linearGradient id="g1" x1="0" y1="1" x2="0" y2="0">
          <stop offset="0%" stopColor={color} stopOpacity="0.5"/>
          <stop offset="100%" stopColor={color} stopOpacity="0.1"/>
        </linearGradient>
      </defs>
      {/* Barras de gráfica */}
      <rect x="60" y="90" width="25" height="35" rx="4" fill={color} opacity="0.4"/>
      <rect x="95" y="65" width="25" height="60" rx="4" fill={color} opacity="0.55"/>
      <rect x="130" y="50" width="25" height="75" rx="4" fill={color} opacity="0.65"/>
      <rect x="165" y="70" width="25" height="55" rx="4" fill={color} opacity="0.5"/>
      <rect x="200" y="80" width="25" height="45" rx="4" fill={color} opacity="0.4"/>
      {/* Línea de tendencia */}
      <polyline points="72,85 107,60 142,45 177,65 212,72" fill="none" stroke={color} strokeWidth="2.5" strokeOpacity="0.7" strokeLinecap="round" strokeLinejoin="round"/>
      {/* Círculos en los puntos */}
      {[[72,85],[107,60],[142,45],[177,65],[212,72]].map(([cx,cy], i) => (
        <circle key={i} cx={cx} cy={cy} r="4" fill="white" stroke={color} strokeWidth="2" opacity="0.9"/>
      ))}
      {/* Etiqueta */}
      <rect x="90" y="15" width="100" height="22" rx="11" fill={color} opacity="0.15"/>
      <rect x="100" y="22" width="30" height="8" rx="4" fill={color} opacity="0.4"/>
      <rect x="138" y="22" width="40" height="8" rx="4" fill={color} opacity="0.3"/>
      {/* Elementos de fondo */}
      <circle cx="245" cy="25" r="20" fill={color} opacity="0.1"/>
      <circle cx="30" cy="115" r="15" fill={color} opacity="0.1"/>
    </svg>,

    // Ilustración 2 — base de datos / servidor
    <svg key="2" viewBox="0 0 280 140" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <rect width="280" height="140" fill={color} opacity="0.1"/>
      <defs>
        <linearGradient id="g2" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.25"/>
          <stop offset="100%" stopColor={color} stopOpacity="0.05"/>
        </linearGradient>
      </defs>
      {/* Cilindros de BD */}
      <ellipse cx="140" cy="45" rx="40" ry="12" fill={color} opacity="0.5"/>
      <rect x="100" y="45" width="80" height="28" fill={color} opacity="0.35"/>
      <ellipse cx="140" cy="73" rx="40" ry="12" fill={color} opacity="0.45"/>
      <rect x="100" y="73" width="80" height="20" fill={color} opacity="0.28"/>
      <ellipse cx="140" cy="93" rx="40" ry="12" fill={color} opacity="0.4"/>
      {/* Indicadores laterales */}
      <circle cx="115" cy="59" r="4" fill="white" opacity="0.8"/>
      <circle cx="115" cy="83" r="4" fill="white" opacity="0.6"/>
      {/* Líneas de conexión */}
      <line x1="195" y1="59" x2="235" y2="40" stroke={color} strokeWidth="2" strokeOpacity="0.4" strokeDasharray="4 3"/>
      <circle cx="238" cy="38" r="8" fill={color} opacity="0.3"/>
      <line x1="195" y1="83" x2="235" y2="100" stroke={color} strokeWidth="2" strokeOpacity="0.4" strokeDasharray="4 3"/>
      <circle cx="238" cy="102" r="8" fill={color} opacity="0.3"/>
      {/* Fondo decorativo */}
      <circle cx="40" cy="40" r="25" fill={color} opacity="0.08"/>
      <circle cx="30" cy="105" r="15" fill={color} opacity="0.1"/>
    </svg>,

    // Ilustración 3 — código / desarrollo web
    <svg key="3" viewBox="0 0 280 140" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <rect width="280" height="140" fill={color} opacity="0.1"/>
      {/* Ventana de editor */}
      <rect x="50" y="20" width="180" height="105" rx="8" fill="white" opacity="0.15"/>
      <rect x="50" y="20" width="180" height="22" rx="8" fill={color} opacity="0.4"/>
      <rect x="50" y="34" width="180" height="8" fill={color} opacity="0.4"/>
      {/* Círculos de botón */}
      <circle cx="63" cy="31" r="4" fill="white" opacity="0.6"/>
      <circle cx="76" cy="31" r="4" fill="white" opacity="0.5"/>
      <circle cx="89" cy="31" r="4" fill="white" opacity="0.4"/>
      {/* Líneas de código con colores */}
      {[
        { x: 65, w: 45, op: 0.7, color2: '#fff' },
        { x: 75, w: 80, op: 0.5, color2: color },
        { x: 65, w: 35, op: 0.6, color2: '#fff' },
        { x: 85, w: 60, op: 0.45, color2: color },
        { x: 65, w: 90, op: 0.55, color2: '#fff' },
        { x: 65, w: 40, op: 0.5, color2: color },
      ].map((l, i) => (
        <rect key={i} x={l.x} y={50 + i * 11} width={l.w} height="5" rx="2.5" fill={l.color2} opacity={l.op}/>
      ))}
      {/* Elementos flotantes */}
      <circle cx="248" cy="35" r="18" fill={color} opacity="0.15"/>
      <rect x="20" y="60" width="20" height="20" rx="4" fill={color} opacity="0.2" transform="rotate(15 30 70)"/>
      <circle cx="25" cy="110" r="12" fill={color} opacity="0.15"/>
      <rect x="240" y="100" width="22" height="22" rx="5" fill={color} opacity="0.18" transform="rotate(-10 251 111)"/>
    </svg>,
  ];

  return illustrations[seed % illustrations.length];
};

/**
 * CourseCard — Tarjeta de curso PROING
 * Miniatura ilustrada superior · código + nombre · docente · barra de progreso
 */
export default function CourseCard({ course }: CourseCardProps): React.JSX.Element {
  const seed = parseInt(course.id.replace(/\D/g, ''), 10) || 0;

  return (
    <Link
      to={`/courses/${course.id}`}
      className="group flex flex-col overflow-hidden rounded-2xl bg-white transition-all duration-200"
      style={{
        border: '1px solid #E8EDF5',
        boxShadow: '0 1px 4px rgba(7,14,26,0.06)',
        textDecoration: 'none',
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLAnchorElement).style.transform = 'translateY(-3px)';
        (e.currentTarget as HTMLAnchorElement).style.boxShadow = `0 8px 24px rgba(7,14,26,0.12), 0 0 0 2px ${course.color}40`;
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLAnchorElement).style.transform = 'translateY(0)';
        (e.currentTarget as HTMLAnchorElement).style.boxShadow = '0 1px 4px rgba(7,14,26,0.06)';
      }}
      aria-label={`Ir al curso ${course.name}`}
    >
      {/* Thumbnail ilustrado */}
      <div
        className="relative overflow-hidden"
        style={{ height: '170px', background: `${course.color}10` }}
      >
        <CourseThumbnail color={course.color} seed={seed} />

        {/* Badge código — arriba derecha */}
        <span
          className="absolute right-3 top-3 rounded-lg px-2 py-0.5 font-mono text-[10px] font-bold text-white"
          style={{
            background: course.color,
            boxShadow: `0 2px 8px ${course.color}50`,
          }}
        >
          {course.code}
        </span>

        {/* Indicador de progreso en la miniatura */}
        <div className="absolute bottom-0 left-0 right-0 h-1" style={{ background: 'rgba(255,255,255,0.2)' }}>
          <div
            className="h-full transition-all duration-700"
            style={{ width: `${course.progress}%`, background: course.color }}
          />
        </div>
      </div>

      {/* Info del curso */}
      <div className="flex flex-1 flex-col p-5">
        {/* Nombre del curso */}
        <h3
          className="text-base font-bold leading-snug text-navy transition-colors group-hover:text-electric-600 line-clamp-2"
          style={{ fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif" }}
        >
          {course.name}
        </h3>

        {/* Docente */}
        <p className="mt-1.5 text-sm text-slate-500 truncate">
          {course.teacherName}
        </p>

        {/* Sección + periodo */}
        <div className="mt-2.5 flex items-center gap-2">
          <span
            className="rounded-lg px-2.5 py-1 font-mono text-xs font-bold"
            style={{ background: `${course.color}12`, color: course.color }}
          >
            {course.section}
          </span>
          <span className="font-mono text-xs text-slate-400">{course.term}</span>
        </div>

        {/* Barra de avance */}
        <div className="mt-4">
          <div className="mb-1.5 flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
              Avance
            </span>
            <span className="font-mono text-xs font-bold" style={{ color: course.color }}>
              {course.progress}%
            </span>
          </div>
          <div className="h-2 w-full overflow-hidden rounded-full" style={{ background: '#EBF0F5' }}>
            <div
              className="h-full rounded-full transition-all duration-700"
              style={{
                width: `${course.progress}%`,
                background: `linear-gradient(90deg, ${course.color} 0%, ${course.color}aa 100%)`,
              }}
            />
          </div>
        </div>
      </div>
    </Link>
  );
}
