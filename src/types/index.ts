/**
 * PROING LMS — Contratos centrales
 * Ubicación: src/types/index.ts
 * Stack: React 18+ / TypeScript strict (cero `any`)
 */

// ---------------------------------------------------------------------------
// User & Roles
// ---------------------------------------------------------------------------

/** Rol global del usuario en el LMS */
export type UserRole = 'admin' | 'teacher' | 'student';

/**
 * Usuario autenticado del sistema
 */
export interface User {
  /** Identificador único (ej. "user-01") */
  id: string;
  /** Nombre completo para mostrar */
  name: string;
  /** Email institucional (@proing.edu.pe) */
  email: string;
  /** URL del avatar (puede ser placeholder) */
  avatarUrl: string;
  /** Rol que determina permisos y vistas */
  role: UserRole;
}

// ---------------------------------------------------------------------------
// Course
// ---------------------------------------------------------------------------

/**
 * Curso del Dashboard tipo Canvas Card
 */
export interface Course {
  /** Identificador único (ej. "course-01") */
  id: string;
  /** Código corto (ej. "ISW-301") */
  code: string;
  /** Nombre largo del curso */
  name: string;
  /** Periodo académico (ej. "2026-II") */
  term: string;
  /** Sección / grupo (ej. "A-SW31", "T1AP") */
  section: string;
  /** Color vivo del card en HEX (ej. "#D32F2F") */
  color: string;
  /** Nombre del docente principal */
  teacherName: string;
  /** Avance del estudiante 0–100 */
  progress: number;
}

// ---------------------------------------------------------------------------
// Materials & Assignments
// ---------------------------------------------------------------------------

/** Tipo de recurso dentro de un módulo */
export type MaterialType = 'pdf' | 'link' | 'video' | 'zoom';

/**
 * Recurso de aprendizaje dentro de un módulo semanal
 */
export interface MaterialItem {
  id: string;
  title: string;
  type: MaterialType;
  /** URL del recurso (Drive, YouTube, Zoom, etc.) */
  url: string;
  /** Duración (ej. "45 min") o tamaño (ej. "2.4 MB") — opcional */
  durationOrSize?: string;
}

/** Estado de entrega de una tarea */
export type AssignmentStatus = 'pending' | 'submitted' | 'graded';

/**
 * Tarea / entregable evaluable
 */
export interface Assignment {
  id: string;
  courseId: string;
  title: string;
  /** Fecha límite en ISO 8601 */
  dueDate: string;
  /** Peso en la nota final (0–100) */
  weight: number;
  /** Puntaje máximo */
  maxScore: number;
  /** Estado actual para el usuario autenticado */
  status: AssignmentStatus;
  /** Calificación obtenida (solo si status === 'graded') */
  score?: number;
}

/**
 * Módulo semanal de un curso (Semana 1, Semana 2, …)
 */
export interface CourseModule {
  id: string;
  courseId: string;
  /** Número de semana (1-indexed) */
  weekNumber: number;
  title: string;
  materials: MaterialItem[];
  assignments: Assignment[];
}

// ---------------------------------------------------------------------------
// Announcement
// ---------------------------------------------------------------------------

/**
 * Anuncio del curso (estilo Canvas Announcements)
 */
export interface Announcement {
  id: string;
  courseId: string;
  title: string;
  author: string;
  /** Fecha de publicación ISO 8601 */
  date: string;
  /** Resumen breve para listado */
  excerpt: string;
  /** Contenido completo (puede ser HTML/Markdown) */
  content: string;
}
