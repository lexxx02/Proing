/**
 * PROING LMS — Datos mock
 * Portal Académico · Sin simulaciones de PDFs / Zoom / foros calificados.
 * Ubicación: src/mocks/db.ts
 */
import type { User, Course, CourseModule, Assignment } from '@/types';

// ---------------------------------------------------------------------------
// Usuario activo
// ---------------------------------------------------------------------------

export const currentUser: User = {
  id: 'user-01',
  name: 'Mateo Alejandro Morales',
  email: 'u24108592@utp.edu.pe',
  avatarUrl: '',
  role: 'student',
};

// ---------------------------------------------------------------------------
// Cursos — 4 cursos con colores institucionales
// ---------------------------------------------------------------------------

export const mockCourses: Course[] = [
  {
    id: 'course-01',
    code: 'ISW-301',
    name: 'Curso Prueba 1',
    term: '2026-II',
    section: 'A-SW31',
    color: '#D32F2F',
    teacherName: 'Ing. Roberto Salazar',
    progress: 68,
  },
  {
    id: 'course-02',
    code: 'GPRO-202',
    name: 'Curso Prueba 2',
    term: '2026-II',
    section: 'B-GP22',
    color: '#1976D2',
    teacherName: 'Mg. Claudia Méndez',
    progress: 45,
  },
  {
    id: 'course-03',
    code: 'BDA-401',
    name: 'Curso Prueba 3',
    term: '2026-II',
    section: 'C-BD14',
    color: '#388E3C',
    teacherName: 'Dr. Luis Fernández',
    progress: 82,
  },
  {
    id: 'course-04',
    code: 'DWF-501',
    name: 'Curso Prueba 4',
    term: '2026-II',
    section: 'D-WF05',
    color: '#F57C00',
    teacherName: 'Ing. Mariana Torres',
    progress: 54,
  },
];

// ---------------------------------------------------------------------------
// Módulos — vacío elegante: el contenido se publica por el docente
// No se simulan sílabos PDF, videos, enlaces Zoom ni foros.
// ---------------------------------------------------------------------------

/**
 * Lista vacía intencionalmente.
 * `CourseModules.tsx` renderiza el estado "Contenido del Curso en Preparación"
 * cuando no hay módulos. Mantiene tipado CourseModule[] sin mocks ficticios.
 */
export const mockModules: CourseModule[] = [];

// ---------------------------------------------------------------------------
// Por Hacer — 3 entregas próximas (Dashboard) — se mantiene para Tablero
// Sin notas calculadas ni badges ficticios de calificación.
// ---------------------------------------------------------------------------

export const mockTodoAssignments: Assignment[] = [
  {
    id: 'assign-02-01',
    courseId: 'course-01',
    title: 'Tarea: Refactorizar código aplicando SOLID (Entrega PDF + Repo)',
    dueDate: '2026-09-10T23:59:00-05:00',
    weight: 15,
    maxScore: 20,
    status: 'pending',
  },
  {
    id: 'assign-03-02',
    courseId: 'course-01',
    title: 'Quiz: Principios de Arquitectura Hexagonal',
    dueDate: '2026-09-14T21:00:00-05:00',
    weight: 10,
    maxScore: 20,
    status: 'pending',
  },
  {
    id: 'assign-03-01',
    courseId: 'course-01',
    title: 'Avance Proyecto: Propuesta de Arquitectura Limpia (Grupo)',
    dueDate: '2026-09-15T23:59:00-05:00',
    weight: 20,
    maxScore: 20,
    status: 'pending',
  },
];
