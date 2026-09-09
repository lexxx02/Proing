import * as React from 'react';
import { Bell, ChevronDown, Menu, User } from 'lucide-react';
import { currentUser } from '@/mocks/db';

interface TopHeaderProps {
  onOpenMobileMenu?: () => void;
}

/**
 * TopHeader — Barra superior fija totalmente responsiva
 * Adaptada para escritorio (left-[88px]), tablet y móviles.
 */
export default function TopHeader({ onOpenMobileMenu }: TopHeaderProps): React.JSX.Element {
  return (
    <header
      className="fixed left-0 right-0 top-0 z-30 flex h-[64px] items-center justify-between px-4 md:left-[220px] md:h-[72px] md:px-8"
      style={{
        background: '#FFFFFF',
        borderBottom: '1px solid #E8EDF5',
        boxShadow: '0 1px 4px rgba(7,14,26,0.05)',
      }}
    >
      {/* Izquierda: botón menú móvil (agrandado) + logo PROING en móvil */}
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={onOpenMobileMenu}
          aria-label="Abrir menú de navegación"
          className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-slate-100/90 text-slate-800 transition-all hover:bg-slate-200 active:scale-95 border border-slate-200/80 focus-visible:outline-none md:hidden cursor-pointer"
        >
          <Menu className="h-6 w-6 text-slate-800" strokeWidth={2.2} />
        </button>

        <div className="flex items-center gap-2 md:hidden">
          <img src="/logo.png" alt="PROING" className="h-8 w-auto object-contain" />
          <span className="text-xs font-black tracking-tight text-navy">PROING</span>
        </div>
      </div>

      {/* Derecha: notificaciones + usuario */}
      <div className="flex items-center gap-2.5 sm:gap-4">
        {/* Campana de Notificaciones */}
        <button
          type="button"
          aria-label="Ver notificaciones"
          className="relative flex h-9 w-9 items-center justify-center rounded-xl text-slate-500 transition-colors hover:bg-slate-100 hover:text-slate-700 sm:h-10 sm:w-10"
        >
          <Bell className="h-5 w-5" strokeWidth={1.75} />
          <span
            className="absolute -right-0.5 -top-0.5 flex h-4 w-4 items-center justify-center rounded-full text-[10px] font-bold text-white shadow-xs"
            style={{ background: '#E53040' }}
          >
            2
          </span>
        </button>

        {/* Separador vertical */}
        <div className="h-6 w-px bg-slate-200 sm:h-7" />

        {/* Info de Usuario (con icono de usuario en vez de foto) */}
        <button
          type="button"
          className="flex items-center gap-2 sm:gap-3 rounded-xl px-1.5 py-1 transition-colors hover:bg-slate-50"
          aria-label="Menú de usuario"
        >
          <div className="hidden text-right leading-tight sm:block">
            <p
              className="text-sm font-bold text-navy"
              style={{ fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif" }}
            >
              {currentUser.name.split(' ').slice(0, 2).join(' ')}
            </p>
            <p className="text-xs font-semibold capitalize text-slate-400">
              {currentUser.role === 'student'
                ? 'Estudiante'
                : currentUser.role === 'teacher'
                ? 'Docente'
                : 'Administrador'}
            </p>
          </div>
          <span className="relative">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#06B6D4] text-white shadow-xs sm:h-10 sm:w-10 border border-white/20">
              <User className="h-5 w-5 text-white" strokeWidth={2} />
            </div>
            <span
              className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full border-2 border-white bg-emerald-500"
            />
          </span>
          <ChevronDown className="h-4 w-4 text-slate-400" strokeWidth={2} />
        </button>
      </div>
    </header>
  );
}
