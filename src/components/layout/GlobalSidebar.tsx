import * as React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import {
  ArrowLeft,
  Home,
  BookOpen,
  Calendar,
  ClipboardList,
  Award,
  Library,
  User,
} from 'lucide-react';
import { currentUser } from '@/mocks/db';
import { cn } from '@/utils/cn';

// ---------------------------------------------------------------------------
// Navigation items
// ---------------------------------------------------------------------------

/** Single navigation entry in the sidebar */
interface NavItem {
  /** Unique identifier for the nav item */
  id: string;
  /** Route path */
  to: string;
  /** Visible label */
  label: string;
  /** Lucide icon component */
  icon: React.ElementType;
  /** Optional notification badge count */
  badge?: number;
}

const NAV_ITEMS: NavItem[] = [
  { id: 'inicio', to: '/courses', label: 'Inicio', icon: Home },
  { id: 'cursos', to: '/courses', label: 'Mis cursos', icon: BookOpen },
  { id: 'calendario', to: '#calendario', label: 'Calendario', icon: Calendar },
  { id: 'actividades', to: '#actividades', label: 'Actividades', icon: ClipboardList, badge: 3 },
  { id: 'certificados', to: '#certificados', label: 'Certificados', icon: Award },
  { id: 'biblioteca', to: '#biblioteca', label: 'Biblioteca', icon: Library },
];

// ---------------------------------------------------------------------------
// Blueprint SVG decoration (bottom section)
// ---------------------------------------------------------------------------

/**
 * BlueprintDecoration — Subtle architectural/engineering SVG artwork
 * for the bottom of the sidebar. Evokes civil engineering & architecture.
 */
function BlueprintDecoration(): React.JSX.Element {
  return (
    <div className="relative mt-auto overflow-hidden">
      {/* Inspirational text */}
      <div className="relative z-10 px-5 pt-5 pb-3">
        <p
          className="text-[13px] font-semibold leading-snug text-white/90"
          style={{ fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif" }}
        >
          La ingeniería
          <br />
          construye hoy
          <br />
          el mundo de
          <br />
          mañana
        </p>
      </div>

      {/* Blueprint SVG */}
      <div className="relative h-[120px] w-full opacity-[0.35]">
        <svg
          viewBox="0 0 220 120"
          xmlns="http://www.w3.org/2000/svg"
          className="absolute inset-0 h-full w-full"
          preserveAspectRatio="xMidYMax slice"
          aria-hidden="true"
        >
          {/* Grid pattern */}
          <defs>
            <pattern id="bp-grid" width="20" height="20" patternUnits="userSpaceOnUse">
              <path d="M 20 0 L 0 0 0 20" fill="none" stroke="rgba(59,123,255,0.15)" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="220" height="120" fill="url(#bp-grid)" />

          {/* Ground line */}
          <line x1="0" y1="105" x2="220" y2="105" stroke="rgba(59,123,255,0.5)" strokeWidth="1" />

          {/* Building 1 — tall */}
          <rect x="20" y="30" width="40" height="75" fill="none" stroke="rgba(59,123,255,0.6)" strokeWidth="1" />
          {/* Windows building 1 */}
          <rect x="26" y="38" width="8" height="6" fill="rgba(59,123,255,0.2)" stroke="rgba(59,123,255,0.4)" strokeWidth="0.5" />
          <rect x="38" y="38" width="8" height="6" fill="rgba(59,123,255,0.2)" stroke="rgba(59,123,255,0.4)" strokeWidth="0.5" />
          <rect x="26" y="50" width="8" height="6" fill="rgba(59,123,255,0.2)" stroke="rgba(59,123,255,0.4)" strokeWidth="0.5" />
          <rect x="38" y="50" width="8" height="6" fill="rgba(59,123,255,0.2)" stroke="rgba(59,123,255,0.4)" strokeWidth="0.5" />
          <rect x="26" y="62" width="8" height="6" fill="rgba(59,123,255,0.2)" stroke="rgba(59,123,255,0.4)" strokeWidth="0.5" />
          <rect x="38" y="62" width="8" height="6" fill="rgba(59,123,255,0.2)" stroke="rgba(59,123,255,0.4)" strokeWidth="0.5" />
          <rect x="26" y="74" width="8" height="6" fill="rgba(59,123,255,0.2)" stroke="rgba(59,123,255,0.4)" strokeWidth="0.5" />
          <rect x="38" y="74" width="8" height="6" fill="rgba(59,123,255,0.2)" stroke="rgba(59,123,255,0.4)" strokeWidth="0.5" />
          <rect x="26" y="86" width="8" height="6" fill="rgba(59,123,255,0.2)" stroke="rgba(59,123,255,0.4)" strokeWidth="0.5" />
          <rect x="38" y="86" width="8" height="6" fill="rgba(59,123,255,0.2)" stroke="rgba(59,123,255,0.4)" strokeWidth="0.5" />
          {/* Door building 1 */}
          <rect x="33" y="96" width="12" height="9" fill="rgba(59,123,255,0.15)" stroke="rgba(59,123,255,0.5)" strokeWidth="0.5" />

          {/* Building 2 — mid */}
          <rect x="68" y="50" width="35" height="55" fill="none" stroke="rgba(59,123,255,0.5)" strokeWidth="1" />
          {/* Windows building 2 */}
          <rect x="73" y="56" width="6" height="5" fill="rgba(59,123,255,0.15)" stroke="rgba(59,123,255,0.35)" strokeWidth="0.5" />
          <rect x="83" y="56" width="6" height="5" fill="rgba(59,123,255,0.15)" stroke="rgba(59,123,255,0.35)" strokeWidth="0.5" />
          <rect x="93" y="56" width="6" height="5" fill="rgba(59,123,255,0.15)" stroke="rgba(59,123,255,0.35)" strokeWidth="0.5" />
          <rect x="73" y="66" width="6" height="5" fill="rgba(59,123,255,0.15)" stroke="rgba(59,123,255,0.35)" strokeWidth="0.5" />
          <rect x="83" y="66" width="6" height="5" fill="rgba(59,123,255,0.15)" stroke="rgba(59,123,255,0.35)" strokeWidth="0.5" />
          <rect x="93" y="66" width="6" height="5" fill="rgba(59,123,255,0.15)" stroke="rgba(59,123,255,0.35)" strokeWidth="0.5" />
          <rect x="73" y="76" width="6" height="5" fill="rgba(59,123,255,0.15)" stroke="rgba(59,123,255,0.35)" strokeWidth="0.5" />
          <rect x="83" y="76" width="6" height="5" fill="rgba(59,123,255,0.15)" stroke="rgba(59,123,255,0.35)" strokeWidth="0.5" />
          <rect x="93" y="76" width="6" height="5" fill="rgba(59,123,255,0.15)" stroke="rgba(59,123,255,0.35)" strokeWidth="0.5" />
          <rect x="73" y="86" width="6" height="5" fill="rgba(59,123,255,0.15)" stroke="rgba(59,123,255,0.35)" strokeWidth="0.5" />
          <rect x="83" y="86" width="6" height="5" fill="rgba(59,123,255,0.15)" stroke="rgba(59,123,255,0.35)" strokeWidth="0.5" />
          <rect x="93" y="86" width="6" height="5" fill="rgba(59,123,255,0.15)" stroke="rgba(59,123,255,0.35)" strokeWidth="0.5" />

          {/* Building 3 — short wide */}
          <rect x="110" y="65" width="45" height="40" fill="none" stroke="rgba(59,123,255,0.5)" strokeWidth="1" />
          {/* Horizontal bands */}
          <line x1="110" y1="75" x2="155" y2="75" stroke="rgba(59,123,255,0.3)" strokeWidth="0.5" />
          <line x1="110" y1="85" x2="155" y2="85" stroke="rgba(59,123,255,0.3)" strokeWidth="0.5" />
          <line x1="110" y1="95" x2="155" y2="95" stroke="rgba(59,123,255,0.3)" strokeWidth="0.5" />
          {/* Windows */}
          <rect x="115" y="69" width="5" height="4" fill="rgba(59,123,255,0.2)" stroke="rgba(59,123,255,0.35)" strokeWidth="0.5" />
          <rect x="124" y="69" width="5" height="4" fill="rgba(59,123,255,0.2)" stroke="rgba(59,123,255,0.35)" strokeWidth="0.5" />
          <rect x="133" y="69" width="5" height="4" fill="rgba(59,123,255,0.2)" stroke="rgba(59,123,255,0.35)" strokeWidth="0.5" />
          <rect x="142" y="69" width="5" height="4" fill="rgba(59,123,255,0.2)" stroke="rgba(59,123,255,0.35)" strokeWidth="0.5" />

          {/* Crane */}
          <line x1="175" y1="105" x2="175" y2="15" stroke="rgba(59,123,255,0.4)" strokeWidth="1.2" />
          <line x1="175" y1="15" x2="210" y2="15" stroke="rgba(59,123,255,0.4)" strokeWidth="1" />
          <line x1="175" y1="15" x2="160" y2="15" stroke="rgba(59,123,255,0.4)" strokeWidth="1" />
          {/* Crane cable */}
          <line x1="200" y1="15" x2="200" y2="40" stroke="rgba(59,123,255,0.3)" strokeWidth="0.5" strokeDasharray="2,2" />
          {/* Crane hook */}
          <path d="M197,40 Q200,46 203,40" fill="none" stroke="rgba(59,123,255,0.4)" strokeWidth="0.8" />
          {/* Crane support lines */}
          <line x1="175" y1="15" x2="170" y2="35" stroke="rgba(59,123,255,0.25)" strokeWidth="0.5" />
          <line x1="175" y1="15" x2="180" y2="35" stroke="rgba(59,123,255,0.25)" strokeWidth="0.5" />

          {/* Dimension lines (architectural detail) */}
          <line x1="5" y1="30" x2="5" y2="105" stroke="rgba(59,123,255,0.2)" strokeWidth="0.5" />
          <line x1="3" y1="30" x2="7" y2="30" stroke="rgba(59,123,255,0.2)" strokeWidth="0.5" />
          <line x1="3" y1="105" x2="7" y2="105" stroke="rgba(59,123,255,0.2)" strokeWidth="0.5" />
        </svg>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Sidebar props
// ---------------------------------------------------------------------------

interface GlobalSidebarProps {
  /** Whether the mobile drawer is open (controlled by RootLayout) */
  isOpen?: boolean;
  /** Callback to close the mobile drawer */
  onClose?: () => void;
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

/**
 * GlobalSidebar — Navegación lateral principal de PROING LMS
 *
 * Desktop: sidebar fija de 220px con fondo azul marino profundo.
 * Móvil: drawer deslizable con overlay y botón de cierre.
 *
 * Incluye logo, 6 items de navegación con iconos lucide-react,
 * badge de notificaciones, estados active/hover, y decoración
 * tipo blueprint de ingeniería civil en la parte inferior.
 */
export default function GlobalSidebar(props: GlobalSidebarProps): React.JSX.Element {
  const location = useLocation();

  const isRouteActive = React.useCallback(
    (item: NavItem): boolean => {
      // Items with hash routes are never "active" based on location
      if (item.to.startsWith('#')) return false;

      // "Inicio" — active on dashboard/home pages (not inside a specific course)
      if (item.id === 'inicio') {
        return (
          location.pathname === '/' ||
          location.pathname === '/courses' ||
          location.pathname.startsWith('/dashboard')
        );
      }

      // "Mis cursos" — active when viewing a specific course
      if (item.id === 'cursos') {
        return location.pathname.startsWith('/courses/');
      }

      return location.pathname === item.to;
    },
    [location.pathname],
  );

  // Mobile drawer state
  const [internalOpen, setInternalOpen] = React.useState<boolean>(false);
  const isControlled = typeof props.isOpen === 'boolean';
  const isOpen = isControlled ? (props.isOpen as boolean) : internalOpen;

  const handleClose = React.useCallback(() => {
    if (isControlled) props.onClose?.();
    else setInternalOpen(false);
  }, [isControlled, props]);

  // Escape to close mobile drawer
  React.useEffect(() => {
    const onKey = (e: KeyboardEvent): void => {
      if (e.key === 'Escape') handleClose();
    };
    if (isOpen) document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [isOpen, handleClose]);

  // Shared nav item renderer
  const renderNavItem = (item: NavItem, isMobile: boolean): React.JSX.Element => {
    const active = isRouteActive(item);
    const isHashLink = item.to.startsWith('#');

    const classes = cn(
      'group relative flex items-center gap-3.5 rounded-lg px-4 py-3 text-[14px] font-medium transition-all duration-200',
      active
        ? 'bg-[#1A60E8]/20 text-white'
        : 'text-white/65 hover:bg-white/[0.06] hover:text-white/90',
      isMobile && 'py-3.5 text-[15px]',
    );

    const inner = (
      <>
        {/* Active indicator bar */}
        {active && (
          <span className="absolute left-0 top-1/2 h-7 w-[3px] -translate-y-1/2 rounded-r-full bg-[#3B7BFF]" />
        )}
        <item.icon
          className={cn(
            'h-[20px] w-[20px] shrink-0 transition-colors duration-200',
            active ? 'text-[#5B9AFF]' : 'text-white/50 group-hover:text-white/80',
          )}
          strokeWidth={active ? 2.2 : 1.8}
          aria-hidden="true"
        />
        <span className="leading-none">{item.label}</span>

        {/* Notification badge */}
        {item.badge && item.badge > 0 && (
          <span className="ml-auto flex h-5 w-5 items-center justify-center rounded-full bg-[#E53040] text-[10px] font-bold text-white shadow-sm">
            {item.badge}
          </span>
        )}
      </>
    );

    if (isHashLink) {
      return (
        <button
          key={item.id}
          type="button"
          className={cn(classes, 'w-full cursor-default opacity-70')}
          tabIndex={0}
        >
          {inner}
        </button>
      );
    }

    return (
      <NavLink
        key={item.id}
        to={item.to}
        onClick={isMobile ? handleClose : undefined}
        aria-current={active ? 'page' : undefined}
        className={classes}
      >
        {inner}
      </NavLink>
    );
  };

  return (
    <>
      {/* ==================== DESKTOP SIDEBAR (220px) ==================== */}
      <aside
        aria-label="Navegación global PROING"
        className="hidden md:fixed md:inset-y-0 md:left-0 md:z-40 md:flex md:w-[220px] md:flex-col"
        style={{
          background: 'linear-gradient(180deg, #061530 0%, #051124 40%, #040D1E 100%)',
          boxShadow: '3px 0 20px rgba(0,0,0,0.35)',
        }}
      >
        {/* Logo section */}
        <div className="flex shrink-0 flex-col items-center px-3 pt-4 pb-2">
          <NavLink
            to="/courses"
            className="flex flex-col items-center transition-transform duration-200 hover:scale-[1.03]"
            aria-label="PROING - Ir al inicio"
          >
            <img
              src="/logo.png"
              alt="PROING"
              className="h-[130px] w-auto object-contain drop-shadow-xl"
            />
          </NavLink>
        </div>

        {/* Separator */}
        <div className="mx-5 h-px bg-white/[0.08]" />

        {/* Navigation items */}
        <nav className="flex-1 overflow-y-auto px-3 pt-4 pb-2" aria-label="Secciones principales">
          <div className="flex flex-col gap-1">
            {NAV_ITEMS.map((item) => renderNavItem(item, false))}
          </div>
        </nav>

        {/* Blueprint decoration at bottom */}
        <BlueprintDecoration />
      </aside>

      {/* ==================== MOBILE: OVERLAY ==================== */}
      {isOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs transition-opacity md:hidden"
          onClick={handleClose}
          aria-hidden="true"
        />
      )}

      {/* ==================== MOBILE: DRAWER ==================== */}
      <aside
        aria-label="Menú de navegación móvil"
        className={cn(
          'fixed inset-y-0 left-0 z-50 flex w-[280px] max-w-[85vw] flex-col transition-transform duration-300 ease-out md:hidden',
        )}
        style={{
          background: 'linear-gradient(180deg, #061530 0%, #051124 40%, #040D1E 100%)',
          transform: isOpen ? 'translateX(0)' : 'translateX(-100%)',
          boxShadow: isOpen ? '12px 0 32px rgba(0,0,0,0.6)' : 'none',
        }}
      >
        {/* Mobile header: user info + close button */}
        <div className="flex items-start justify-between border-b border-white/10 px-5 pb-5 pt-7">
          <div className="flex items-center gap-3">
            <div className="relative flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#06B6D4] text-white border-2 border-white/20 shadow-xs">
              <User className="h-5 w-5 text-white" strokeWidth={2} />
            </div>
            <div className="flex flex-col">
              <h2
                className="text-[15px] font-bold leading-tight text-white"
                style={{ fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif" }}
              >
                ¡Hola {currentUser.name.split(' ')[0]}!
              </h2>
              <span className="mt-0.5 text-xs font-normal text-slate-300/80">
                {currentUser.email}
              </span>
            </div>
          </div>

          <button
            type="button"
            onClick={handleClose}
            aria-label="Cerrar menú"
            className="flex h-9 w-9 items-center justify-center rounded-lg text-white transition-colors hover:bg-white/10 active:scale-95"
          >
            <ArrowLeft className="h-5 w-5 text-white" strokeWidth={2} />
          </button>
        </div>

        {/* Mobile logo */}
        <div className="flex items-center justify-center py-4">
          <img src="/logo.png" alt="PROING" className="h-20 w-auto object-contain drop-shadow-md" />
        </div>

        {/* Separator */}
        <div className="mx-5 h-px bg-white/[0.08]" />

        {/* Mobile nav items */}
        <nav className="flex-1 overflow-y-auto px-3 pt-4 pb-2" aria-label="Opciones del menú">
          <div className="flex flex-col gap-1">
            {NAV_ITEMS.map((item) => renderNavItem(item, true))}
          </div>
        </nav>

        {/* Blueprint decoration (mobile) */}
        <BlueprintDecoration />
      </aside>
    </>
  );
}
