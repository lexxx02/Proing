import * as React from 'react';
import { Link } from 'react-router-dom';
import {
  ChevronDown,
  ChevronRight,
  CheckSquare,
  ArrowRight,
  Clock,
  AlertCircle,
} from 'lucide-react';
import { mockCourses, mockTodoAssignments } from '@/mocks/db';
import CourseCard from '@/components/courses/CourseCard';
import { cn } from '@/utils/cn';

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

/**
 * Formats an ISO date string to a short, human-readable label
 * relative to the current date (e.g. "Hoy", "Mañana", "Viernes 11").
 */
function formatDueDate(isoDate: string): string {
  const date = new Date(isoDate);
  const now = new Date();

  const diffMs = date.getTime() - now.getTime();
  const diffDays = Math.ceil(diffMs / (1000 * 60 * 60 * 24));

  const dayNames = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
  const dayName = dayNames[date.getDay()];

  if (diffDays <= 0) return 'Hoy';
  if (diffDays === 1) return 'Mañana';
  return `${dayName} ${date.getDate()}`;
}

/**
 * Returns a color-coding config based on urgency (days until due).
 */
function getUrgencyConfig(isoDate: string): {
  dotColor: string;
  label: string;
  bgTint: string;
} {
  const date = new Date(isoDate);
  const now = new Date();
  const diffMs = date.getTime() - now.getTime();
  const diffDays = Math.ceil(diffMs / (1000 * 60 * 60 * 24));

  if (diffDays <= 1) {
    return { dotColor: '#EF4444', label: 'Entrega pendiente', bgTint: 'bg-red-50' };
  }
  if (diffDays <= 4) {
    return { dotColor: '#F59E0B', label: 'Evaluación', bgTint: 'bg-amber-50' };
  }
  return { dotColor: '#3B82F6', label: 'Proyecto grupal', bgTint: 'bg-blue-50' };
}

// ---------------------------------------------------------------------------
// Activity Item Sub-component
// ---------------------------------------------------------------------------

/** Props for a single activity row */
interface ActivityItemProps {
  /** Assignment title */
  title: string;
  /** ISO due date */
  dueDate: string;
  /** Whether this is the last item (no bottom border) */
  isLast: boolean;
}

/**
 * ActivityItem — A single row in the weekly activities card
 */
function ActivityItem({ title, dueDate, isLast }: ActivityItemProps): React.JSX.Element {
  const urgency = getUrgencyConfig(dueDate);
  const formattedDate = formatDueDate(dueDate);

  return (
    <div
      className={cn(
        'flex items-center gap-3 px-5 py-3.5 transition-colors hover:bg-slate-50/80',
        !isLast && 'border-b border-slate-100',
      )}
    >
      {/* Urgency dot */}
      <div
        className="h-2.5 w-2.5 shrink-0 rounded-full"
        style={{ backgroundColor: urgency.dotColor }}
        aria-hidden="true"
      />

      {/* Text content */}
      <div className="flex-1 min-w-0">
        <span
          className="block text-[10px] font-bold uppercase tracking-wider"
          style={{ color: urgency.dotColor }}
        >
          {urgency.label}
        </span>
        <p
          className="mt-0.5 text-sm font-semibold leading-snug text-slate-800 truncate"
          style={{ fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif" }}
        >
          {title}
        </p>
        <div className="mt-1 flex items-center gap-1.5 text-xs text-slate-400">
          <Clock className="h-3 w-3" strokeWidth={2} />
          <span>Vence: {formattedDate}</span>
        </div>
      </div>

      {/* Chevron affordance */}
      <ChevronRight className="h-4 w-4 shrink-0 text-slate-300" strokeWidth={2} />
    </div>
  );
}

// ---------------------------------------------------------------------------
// Dashboard
// ---------------------------------------------------------------------------

/**
 * Dashboard — PROING LMS
 *
 * Layout superior: Banner publicitario (8 cols) + Actividades semanales (4 cols)
 * Sección inferior: Grid de cursos full-width con filtro por período.
 */
export default function Dashboard(): React.JSX.Element {
  const [period, setPeriod] = React.useState<string>('Periodo actual');

  return (
    <div className="flex min-h-screen flex-col bg-[#F4F6FA]">
      {/* ====================== FILA SUPERIOR: BANNER + ACTIVIDADES ====================== */}
      <div className="w-full shrink-0 px-4 py-4 sm:px-6 md:px-8 md:py-6">
        <div className="grid grid-cols-1 gap-5 lg:grid-cols-12">
          {/* ---- BANNER PUBLICITARIO (8 cols en desktop) ---- */}
          <div className="lg:col-span-8">
            <div
              className="relative w-full overflow-hidden rounded-2xl shadow-md"
              style={{ minHeight: '260px' }}
            >
              {/* Background image */}
              <img
                src="/hero-banner.jpg"
                alt="Banner PROING - Formando profesionales que construyen el futuro"
                className="absolute inset-0 h-full w-full object-cover object-center"
                draggable={false}
              />

              {/* Gradient overlay for text legibility */}
              <div
                className="absolute inset-0"
                style={{
                  background:
                    'linear-gradient(100deg, rgba(6,21,48,0.92) 0%, rgba(6,21,48,0.78) 45%, rgba(6,21,48,0.35) 70%, rgba(6,21,48,0.10) 100%)',
                }}
              />

              {/* Overlay content */}
              <div className="relative z-10 flex h-full min-h-[260px] flex-col justify-center px-7 py-7 sm:px-10 sm:py-8">
                {/* Logo + subtitle */}
                <div className="mb-3 flex items-center gap-3">
                  <img
                    src="/logo.png"
                    alt="PROING"
                    className="h-10 w-auto object-contain drop-shadow-md"
                  />
                  <span
                    className="text-[11px] font-bold uppercase tracking-[0.15em] text-white/80"
                    style={{ fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif" }}
                  >
                    Ingeniería Civil · Arquitectura
                  </span>
                </div>

                {/* Headline */}
                <h2
                  className="max-w-md text-2xl font-extrabold leading-tight text-white sm:text-3xl"
                  style={{ fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif" }}
                >
                  Construye{' '}
                  <span className="italic text-sky-300">tu futuro</span>
                  <br />
                  profesional
                </h2>

                {/* Description */}
                <p className="mt-3 max-w-sm text-sm leading-relaxed text-slate-200/90">
                  Cursos especializados en Ingeniería Civil y Arquitectura.
                  Aprende, desarrolla proyectos y lleva tus conocimientos a la práctica.
                </p>

                {/* CTA */}
                <div className="mt-5">
                  <Link
                    to="/courses"
                    className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-bold text-white shadow-lg transition-all duration-200 hover:bg-blue-500 hover:shadow-blue-500/30 active:scale-[0.97]"
                    style={{ fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif" }}
                  >
                    Ver mis cursos
                    <ArrowRight className="h-4 w-4" strokeWidth={2.5} />
                  </Link>
                </div>

                {/* Decorative dots (bottom) */}
                <div className="absolute bottom-5 left-1/2 flex -translate-x-1/2 gap-2" aria-hidden="true">
                  <span className="h-2 w-6 rounded-full bg-white/60" />
                  <span className="h-2 w-2 rounded-full bg-white/30" />
                  <span className="h-2 w-2 rounded-full bg-white/30" />
                </div>
              </div>
            </div>
          </div>

          {/* ---- ACTIVIDADES ESTA SEMANA (4 cols en desktop) ---- */}
          <div className="lg:col-span-4">
            <div
              className="flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm"
              style={{ minHeight: '260px' }}
            >
              {/* Header */}
              <div className="flex items-center justify-between bg-[#0A162B] px-5 py-3.5">
                <div className="flex items-center gap-2.5">
                  <CheckSquare className="h-4.5 w-4.5 text-white/90" strokeWidth={2} />
                  <h2
                    className="text-[15px] font-bold tracking-tight text-white"
                    style={{ fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif" }}
                  >
                    Actividades esta semana
                  </h2>
                </div>
                <button
                  type="button"
                  className="flex items-center gap-1 text-xs font-semibold text-sky-400 transition-colors hover:text-sky-300"
                >
                  Ver todas
                  <ArrowRight className="h-3.5 w-3.5" strokeWidth={2} />
                </button>
              </div>

              {/* Activity items */}
              <div className="flex flex-1 flex-col">
                {mockTodoAssignments.length > 0 ? (
                  mockTodoAssignments.map((assignment, index) => (
                    <ActivityItem
                      key={assignment.id}
                      title={assignment.title}
                      dueDate={assignment.dueDate}
                      isLast={index === mockTodoAssignments.length - 1}
                    />
                  ))
                ) : (
                  <div className="flex flex-1 flex-col items-center justify-center gap-2 px-5 py-8 text-center">
                    <AlertCircle className="h-8 w-8 text-slate-300" strokeWidth={1.5} />
                    <p className="text-sm font-medium text-slate-400">
                      No hay actividades pendientes esta semana
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ====================== SECCIÓN MIS CURSOS (FULL-WIDTH) ====================== */}
      <div className="mx-auto w-full max-w-7xl px-4 py-2 sm:px-6 md:px-8">
        <section>
          {/* Header sección */}
          <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <h1
              className="text-xl font-bold text-navy md:text-2xl"
              style={{ fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif" }}
            >
              Mis cursos
            </h1>

            <div className="flex items-center gap-2.5">
              <label
                htmlFor="period-filter"
                className="text-xs font-semibold text-slate-500 whitespace-nowrap sm:text-sm"
              >
                Filtrar por período
              </label>
              <div className="relative flex-1 sm:flex-none">
                <select
                  id="period-filter"
                  value={period}
                  onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setPeriod(e.target.value)}
                  className="h-9 w-full appearance-none rounded-xl border pl-3 pr-8 text-xs font-semibold text-slate-700 transition-all focus:outline-none focus:ring-2 focus:ring-blue-400/20 sm:h-10 sm:w-auto sm:pl-4 sm:pr-10 sm:text-sm"
                  style={{
                    background: '#fff',
                    border: '1.5px solid #DDE2ED',
                    minWidth: '150px',
                  }}
                >
                  <option>Periodo actual</option>
                  <option>2026-II</option>
                  <option>2026-I</option>
                  <option>2025-II</option>
                </select>
                <ChevronDown
                  className="pointer-events-none absolute right-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400"
                  strokeWidth={2}
                />
              </div>
            </div>
          </div>

          {/* Divisor de grupo de cursos */}
          <div className="mb-5 flex items-center gap-3">
            <div className="h-px flex-1 bg-slate-200" />
            <span className="shrink-0 text-[11px] font-semibold text-slate-400 sm:text-xs">
              2026 – Ciclo 2 Agosto PREG (001) (Actual)
            </span>
            <div className="h-px flex-1 bg-slate-200" />
          </div>

          {/* Grid de CourseCards: 1 col en móvil, 2 cols en tablet/desktop */}
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {mockCourses.map((course, i) => (
              <div
                key={course.id}
                className="animate-slide-up"
                style={{ animationDelay: `${i * 70}ms`, animationFillMode: 'both' }}
              >
                <CourseCard course={course} />
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
