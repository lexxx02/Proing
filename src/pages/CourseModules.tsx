import * as React from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  ChevronDown,
  ChevronUp,
  Megaphone,
  BookOpen,
  ArrowLeft,
  FileText,
  Video,
  ClipboardList,
  ExternalLink,
} from 'lucide-react';
import { mockCourses } from '@/mocks/db';

/**
 * CourseModules — Vista de módulos / contenido de un curso
 * Diseño PROING LMS:
 *  - Header breadcrumb con link "Volver a cursos" y nombre del curso
 *  - Sub-navegación horizontal (Sílabo, Contenido, Evaluaciones, Tareas, Foros, Notas, Anuncios, Zoom)
 *  - Banner aviso docente en fondo azul oscuro (#0A162B)
 *  - Acordeón "Información del curso" (Foro de Consultas, Bibliografía Base, Bibliografía)
 *  - Listado "Total de semanas (18)" con barra azul vertical de acento
 */
export default function CourseModules(): React.JSX.Element {
  const { id } = useParams<{ id: string }>();
  const course = mockCourses.find((c) => c.id === id) || mockCourses[0];

  const [bannerOpen, setBannerOpen] = React.useState<boolean>(true);
  const [infoOpen, setInfoOpen] = React.useState<boolean>(true);
  const [openWeek, setOpenWeek] = React.useState<number | null>(1);
  const [openInfoSubItem, setOpenInfoSubItem] = React.useState<string | null>(null);
  const [activeTab, setActiveTab] = React.useState<string>('Contenido');

  const tabs: string[] = ['Contenido'];

  const infoItems = [
    {
      id: 'foro',
      title: 'Foro de Consultas',
      content: 'Espacio destinado para realizar consultas sobre las sesiones de aprendizaje y trabajos.',
    },
    {
      id: 'biblio-base',
      title: 'Bibliografía Base',
      content: 'Texto guía principal y lecturas obligatorias recomendadas para el desarrollo de la asignatura.',
    },
    {
      id: 'biblio-comp',
      title: 'Bibliografía',
      content: 'Material complementario, repositorios digitales y enlaces de consulta adicionales.',
    },
  ];

  const totalWeeks = 18;

  return (
    <div className="min-h-screen w-full bg-[#F4F6FA]">
      {/* ====== BREADCRUMB / HEADER SUPERIOR ====== */}
      <div className="border-b border-slate-200/80 bg-white px-4 py-3.5 md:px-8">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center gap-2.5 text-sm">
          <Link
            to="/courses"
            className="flex items-center gap-1.5 font-semibold text-[#1A60E8] transition-colors hover:underline"
          >
            <ArrowLeft className="h-4 w-4 stroke-[2.25]" />
            Volver a cursos
          </Link>
          <span className="text-slate-300">|</span>
          <span className="font-semibold text-slate-800">
            {course.name}
          </span>
        </div>
      </div>

      {/* ====== SUB-NAVEGACIÓN HORIZONTAL (TABS) ====== */}
      <div className="border-b border-slate-200 bg-white px-4 md:px-8 shadow-2xs">
        <div className="mx-auto flex max-w-6xl overflow-x-auto gap-8 scrollbar-hide">
          {tabs.map((tab) => {
            const isActive = activeTab === tab;
            return (
              <button
                key={tab}
                type="button"
                onClick={() => setActiveTab(tab)}
                className={`relative py-3.5 text-sm font-semibold transition-colors whitespace-nowrap ${isActive ? 'text-[#1A60E8]' : 'text-slate-600 hover:text-slate-900'
                  }`}
              >
                {tab}
                {isActive && (
                  <span className="absolute bottom-0 left-0 right-0 h-[3px] rounded-t-full bg-[#1A60E8]" />
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* ====== CONTENIDO PRINCIPAL ====== */}
      <div className="mx-auto max-w-6xl px-4 py-6 md:px-8 md:py-8">
        {/* ====== BANNER AVISO DOCENTE (FONDO AZUL OSCURO) ====== */}
        {bannerOpen && (
          <div className="mb-6 flex items-start justify-between gap-4 rounded-xl bg-[#0A162B] p-4 text-white shadow-md md:p-5">
            <div className="flex items-start gap-3.5">
              <Megaphone className="mt-0.5 h-5 w-5 shrink-0 text-white" strokeWidth={2} />
              <p className="text-xs leading-relaxed md:text-sm text-slate-100">
                Las sesiones en vivo se transmiten vía Zoom y quedan grabadas en la plataforma.{' '}
                <strong className="font-bold text-white">
                  Recuerda que todas las clases y actividades son 100% virtuales
                </strong>
                , incluyendo evaluaciones, tareas, trabajos prácticos, así como las consultas e interacciones con tu docente.
              </p>
            </div>
            <button
              type="button"
              onClick={() => setBannerOpen(false)}
              className="rounded-lg p-1 text-white/80 transition-colors hover:bg-white/10 hover:text-white"
              aria-label="Cerrar aviso"
            >
              <ChevronUp className="h-5 w-5" />
            </button>
          </div>
        )}

        {/* ====== INFORMACIÓN DEL CURSO (CARD ACORDEÓN) ====== */}
        <div className="mb-8 overflow-hidden rounded-xl border border-slate-200 bg-white shadow-xs">
          <button
            type="button"
            onClick={() => setInfoOpen(!infoOpen)}
            className="flex w-full items-center justify-between px-5 py-4 text-left transition-colors hover:bg-slate-50/60"
            aria-expanded={infoOpen}
          >
            <div className="flex items-center gap-3">
              <BookOpen className="h-5 w-5 text-slate-800" strokeWidth={2} />
              <span className="text-base font-bold text-slate-900">
                Información del curso
              </span>
            </div>
            {infoOpen ? (
              <ChevronUp className="h-5 w-5 text-slate-600" />
            ) : (
              <ChevronDown className="h-5 w-5 text-slate-600" />
            )}
          </button>

          {infoOpen && (
            <div className="divide-y divide-slate-100 border-t border-slate-100">
              {infoItems.map((item) => {
                const isSubOpen = openInfoSubItem === item.id;
                return (
                  <div key={item.id} className="bg-white">
                    <button
                      type="button"
                      onClick={() => setOpenInfoSubItem(isSubOpen ? null : item.id)}
                      className="flex w-full items-center justify-between px-6 py-3.5 text-left text-sm font-medium text-slate-800 transition-colors hover:bg-slate-50/60"
                    >
                      <span>{item.title}</span>
                      <ChevronDown
                        className={`h-4 w-4 text-slate-500 transition-transform ${isSubOpen ? 'rotate-180' : ''
                          }`}
                      />
                    </button>
                    {isSubOpen && (
                      <div className="bg-slate-50/50 px-6 py-3 text-xs leading-relaxed text-slate-600 border-t border-slate-100">
                        <p>{item.content}</p>
                        <a
                          href="#"
                          className="mt-2 inline-flex items-center gap-1.5 font-semibold text-[#1A60E8] hover:underline"
                        >
                          Ver recurso completo <ExternalLink className="h-3 w-3" />
                        </a>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* ====== SECCIÓN: TOTAL DE SEMANAS ====== */}
        <div className="mb-4">
          <h2 className="text-lg font-bold text-slate-900 mb-4">
            Total de semanas ({totalWeeks})
          </h2>

          <div className="space-y-3">
            {Array.from({ length: totalWeeks }, (_, i) => i + 1).map((weekNum) => {
              const weekStr = weekNum.toString().padStart(2, '0');
              const isExpanded = openWeek === weekNum;

              return (
                <div
                  key={weekNum}
                  className="relative overflow-hidden rounded-xl border border-slate-200 bg-white shadow-xs transition-all"
                >
                  <button
                    type="button"
                    onClick={() => setOpenWeek(isExpanded ? null : weekNum)}
                    className="flex w-full items-center justify-between px-6 py-4 text-left transition-colors hover:bg-slate-50/60 relative"
                    aria-expanded={isExpanded}
                  >
                    {/* Barra de acento azul vertical a la izquierda */}
                    <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-[#1A60E8]" />

                    <span className="pl-2 text-base font-bold text-slate-900">
                      Semana {weekStr}
                    </span>

                    {isExpanded ? (
                      <ChevronUp className="h-5 w-5 text-slate-600" />
                    ) : (
                      <ChevronDown className="h-5 w-5 text-slate-600" />
                    )}
                  </button>

                  {/* Contenido desplegable de la semana */}
                  {isExpanded && (
                    <div className="border-t border-slate-100 px-6 py-4 bg-slate-50/30">
                      <p className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3">
                        Material de la Semana {weekStr}
                      </p>
                      <div className="space-y-2">
                        <a
                          href="#"
                          className="flex items-center gap-3 rounded-lg border border-slate-200/70 bg-white p-3 text-xs font-semibold text-slate-700 shadow-2xs hover:border-[#1A60E8] hover:text-[#1A60E8] transition-all"
                        >
                          <FileText className="h-4 w-4 text-[#1A60E8]" />
                          <span>Guía de Aprendizaje - Semana {weekStr}</span>
                          <span className="ml-auto rounded-md bg-slate-100 px-2 py-0.5 text-[10px] text-slate-500 font-mono">
                            PDF
                          </span>
                        </a>

                        <a
                          href="#"
                          className="flex items-center gap-3 rounded-lg border border-slate-200/70 bg-white p-3 text-xs font-semibold text-slate-700 shadow-2xs hover:border-[#1A60E8] hover:text-[#1A60E8] transition-all"
                        >
                          <Video className="h-4 w-4 text-emerald-600" />
                          <span>Grabación de Clase Sincrónica</span>
                          <span className="ml-auto rounded-md bg-slate-100 px-2 py-0.5 text-[10px] text-slate-500 font-mono">
                            ZOOM
                          </span>
                        </a>

                        <a
                          href="#"
                          className="flex items-center gap-3 rounded-lg border border-slate-200/70 bg-white p-3 text-xs font-semibold text-slate-700 shadow-2xs hover:border-[#1A60E8] hover:text-[#1A60E8] transition-all"
                        >
                          <ClipboardList className="h-4 w-4 text-amber-600" />
                          <span>Laboratorio Práctico & Tarea</span>
                          <span className="ml-auto rounded-md bg-amber-50 text-amber-700 border border-amber-200 px-2 py-0.5 text-[10px] font-bold">
                            PENDIENTE
                          </span>
                        </a>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
