import * as React from 'react';
import { NavLink, Outlet, Link, useParams } from 'react-router-dom';
import { LayoutList, ClipboardList, ChevronRight } from 'lucide-react';
import { mockCourses } from '@/mocks/db';
import { cn } from '@/utils/cn';

interface CourseNavItem {
  to: string;
  label: string;
  icon: React.ElementType;
}

const COURSE_NAV: CourseNavItem[] = [
  { to: '', label: 'Módulos', icon: LayoutList },
  { to: 'assignments', label: 'Tareas', icon: ClipboardList },
];

/**
 * Layout secundario del curso — PROING Portal Académico.
 * Solo accesos esenciales de esta fase: Módulos y Tareas.
 * Breadcrumb: Cursos > [Nombre] > Módulos
 */
export default function CourseLayout(): React.JSX.Element {
  const { courseId } = useParams<{ courseId: string }>();
  const course = React.useMemo(() => mockCourses.find((c) => c.id === courseId), [courseId]);

  const [mobileNavOpen, setMobileNavOpen] = React.useState<boolean>(false);

  if (!course) {
    return (
      <div className="p-6 sm:p-8">
        <nav aria-label="Breadcrumb" className="mb-6">
          <ol className="flex items-center gap-1.5 text-sm text-slate-500">
            <li>
              <Link to="/" className="hover:text-slate-900 hover:underline">
                Cursos
              </Link>
            </li>
            <ChevronRight className="h-4 w-4 text-slate-400" aria-hidden="true" />
            <li className="font-medium text-slate-700">Curso no encontrado</li>
          </ol>
        </nav>
        <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-10 text-center">
          <p className="text-sm font-semibold text-slate-700">Curso no encontrado</p>
          <p className="mt-1 text-sm text-slate-500">Verifica el ID: {courseId}</p>
          <Link to="/" className="mt-4 inline-block text-sm font-bold text-slate-900 hover:underline">
            Volver al Tablero →
          </Link>
        </div>
      </div>
    );
  }

  const basePath = `/courses/${course.id}`;

  return (
    <div className="min-h-[calc(100vh-72px)] bg-slate-50/70">
      {/* Breadcrumb superior */}
      <div className="border-b border-slate-200/80 bg-white">
        <div className="mx-auto max-w-[1600px] px-4 py-3 sm:px-6">
          <nav aria-label="Breadcrumb">
            <ol className="flex flex-wrap items-center gap-1.5 text-sm">
              <li>
                <Link to="/" className="font-medium text-slate-700 hover:text-slate-900 hover:underline">
                  Cursos
                </Link>
              </li>
              <ChevronRight className="h-4 w-4 shrink-0 text-slate-400" aria-hidden="true" />
              <li>
                <Link to={basePath} className="font-medium text-slate-700 hover:text-slate-900 hover:underline">
                  {course.name}
                </Link>
              </li>
              <ChevronRight className="h-4 w-4 shrink-0 text-slate-400" aria-hidden="true" />
              <li className="font-semibold text-slate-900" aria-current="page">
                Módulos
              </li>
            </ol>
          </nav>

          <div className="mt-3 flex flex-wrap items-center gap-3">
            <span
              className="inline-flex h-2 w-2 rounded-full"
              style={{ backgroundColor: course.color }}
              aria-hidden="true"
            />
            <h1 className="text-lg font-bold leading-tight text-slate-900 sm:text-xl">{course.name}</h1>
            <span className="hidden text-sm text-slate-400 sm:inline">·</span>
            <span className="text-xs font-semibold tracking-widest text-slate-500">
              {course.code} · {course.section} · {course.term}
            </span>
            <span className="ml-auto hidden items-center gap-2 text-xs text-slate-500 sm:inline-flex">
              <span className="h-1.5 w-16 overflow-hidden rounded-full bg-slate-100">
                <span
                  className="block h-full rounded-full"
                  style={{ width: `${course.progress}%`, backgroundColor: course.color }}
                />
              </span>
              {course.progress}%
            </span>
          </div>
        </div>
      </div>

      {/* Toggle móvil */}
      <div className="border-b border-slate-200/80 bg-white lg:hidden">
        <div className="mx-auto max-w-[1600px] px-4 sm:px-6">
          <button
            type="button"
            onClick={() => setMobileNavOpen((v) => !v)}
            aria-expanded={mobileNavOpen}
            aria-controls="course-secondary-nav"
            className="flex w-full items-center justify-between py-3 text-sm font-semibold text-slate-900"
          >
            <span className="inline-flex items-center gap-2">
              <LayoutList className="h-4 w-4 text-slate-500" />
              Menú del curso
            </span>
            <ChevronRight
              className={cn('h-4 w-4 text-slate-400 transition-transform', mobileNavOpen && 'rotate-90')}
              aria-hidden="true"
            />
          </button>
        </div>
      </div>

      <div className="mx-auto flex max-w-[1600px] flex-col lg:flex-row">
        {/* Menú secundario — solo Módulos y Tareas */}
        <aside
          id="course-secondary-nav"
          className={cn(
            'shrink-0 border-b border-slate-200/80 bg-white lg:w-[240px] lg:border-b-0 lg:border-r',
            mobileNavOpen ? 'block' : 'hidden lg:block',
          )}
          aria-label="Navegación del curso"
        >
          <nav className="p-2 lg:sticky lg:top-0 lg:p-3">
            <p className="hidden px-3 pb-2 pt-1 text-[11px] font-bold uppercase tracking-widest text-slate-400 lg:block">
              Navegación
            </p>
            <ul className="flex gap-1 overflow-x-auto lg:flex-col lg:overflow-visible" role="list">
              {COURSE_NAV.map((item) => {
                const to = item.to ? `${basePath}/${item.to}` : basePath;
                const isIndex = item.to === '';
                return (
                  <li key={item.label} className="shrink-0 lg:shrink">
                    <NavLink
                      to={to}
                      end={isIndex}
                      onClick={() => setMobileNavOpen(false)}
                      className={({ isActive }) =>
                        cn(
                          'flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors',
                          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-900 focus-visible:ring-offset-2',
                          isActive ? 'bg-slate-950 text-white shadow-sm' : 'text-slate-700 hover:bg-slate-50',
                        )
                      }
                      style={({ isActive }) =>
                        isActive ? { borderLeft: `3px solid ${course.color}`, paddingLeft: '9px' } : undefined
                      }
                    >
                      <item.icon className="h-4 w-4 shrink-0" aria-hidden="true" />
                      {item.label}
                    </NavLink>
                  </li>
                );
              })}
            </ul>
            <div className="mt-4 hidden rounded-xl border border-slate-200/80 bg-slate-50 p-3 lg:block">
              <p className="text-xs font-semibold text-slate-700">{course.teacherName}</p>
              <p className="mt-0.5 text-xs text-slate-500">Docente principal · Portal Académico</p>
            </div>
          </nav>
        </aside>

        <div className="min-w-0 flex-1">
          <div className="p-4 sm:p-6">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
}
