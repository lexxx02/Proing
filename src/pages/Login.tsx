import * as React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Eye, EyeOff, GraduationCap, BookOpen, Shield, ArrowRight, CheckCircle2 } from 'lucide-react';
import type { UserRole } from '@/types';

/**
 * Pantalla de Login — PROING LMS Premium
 *
 * Split-screen: izquierda branding oscuro con mesh gradient + features
 * Derecha: formulario limpio con selector de rol visual intuitivo.
 * Al submit redirige a `/dashboard`.
 *
 * Principio de intuitividad: cada campo tiene label claro, placeholder
 * descriptivo, y los roles se explican con descripción de una línea.
 */
export default function Login(): React.JSX.Element {
  const navigate = useNavigate();

  const [email, setEmail] = React.useState<string>('valeria.quispe@proing.edu.pe');
  const [password, setPassword] = React.useState<string>('password123');
  const [role, setRole] = React.useState<UserRole>('student');
  const [showPassword, setShowPassword] = React.useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = React.useState<boolean>(false);
  const [error, setError] = React.useState<string | null>(null);

  const roles: Array<{
    id: UserRole;
    label: string;
    description: string;
    icon: React.ElementType;
    color: string;
  }> = [
    {
      id: 'student',
      label: 'Alumno',
      description: 'Accede a tus cursos y entregas',
      icon: GraduationCap,
      color: '#3B7BFF',
    },
    {
      id: 'teacher',
      label: 'Docente',
      description: 'Gestiona cursos y calificaciones',
      icon: BookOpen,
      color: '#0891B2',
    },
    {
      id: 'admin',
      label: 'Admin',
      description: 'Panel de administración',
      icon: Shield,
      color: '#7C3AED',
    },
  ];

  const handleRoleSelect = React.useCallback((nextRole: UserRole): void => {
    setRole(nextRole);
    setError(null);
    if (nextRole === 'student') {
      setEmail('valeria.quispe@proing.edu.pe');
    } else if (nextRole === 'teacher') {
      setEmail('roberto.salazar@proing.edu.pe');
    } else {
      setEmail('admin@proing.edu.pe');
    }
    setPassword('password123');
  }, []);

  const handleSubmit = React.useCallback(
    (e: React.FormEvent<HTMLFormElement>): void => {
      e.preventDefault();
      setError(null);

      if (!email.includes('@')) {
        setError('Ingresa un correo institucional válido (@proing.edu.pe)');
        return;
      }
      if (password.length < 6) {
        setError('La contraseña debe tener al menos 6 caracteres');
        return;
      }

      setIsSubmitting(true);

      try {
        window.localStorage.setItem('proing:role', role);
        window.localStorage.setItem('proing:email', email);
      } catch {
        // silenciar si localStorage no disponible
      }

      window.setTimeout(() => {
        navigate('/dashboard', { replace: true });
      }, 600);
    },
    [email, password, role, navigate],
  );

  const selectedRole = roles.find((r) => r.id === role)!;

  return (
    <div className="min-h-screen lg:grid lg:grid-cols-2" style={{ background: '#F4F6FA' }}>

      {/* ================== Panel izquierdo — Branding ================== */}
      <div
        className="relative hidden flex-col justify-between overflow-hidden p-10 lg:flex"
        style={{ background: 'linear-gradient(145deg, #070E1A 0%, #0F1F3D 50%, #162845 100%)' }}
      >
        {/* Mesh gradient decorativo */}
        <div
          className="pointer-events-none absolute inset-0"
          aria-hidden="true"
          style={{
            background: `
              radial-gradient(at 15% 25%, rgba(59,123,255,0.15) 0px, transparent 50%),
              radial-gradient(at 85% 75%, rgba(229,48,64,0.10) 0px, transparent 45%),
              radial-gradient(at 50% 50%, rgba(15,31,61,0.5) 0px, transparent 70%)
            `,
          }}
        />
        {/* Grid de puntos */}
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.05]"
          aria-hidden="true"
          style={{
            backgroundImage: 'radial-gradient(circle, #ffffff 1px, transparent 1px)',
            backgroundSize: '28px 28px',
          }}
        />
        {/* Orbe decorativo superior derecha */}
        <div
          className="pointer-events-none absolute -right-32 -top-32 h-96 w-96 rounded-full opacity-20"
          aria-hidden="true"
          style={{ background: 'radial-gradient(circle, #3B7BFF, transparent 70%)' }}
        />
        {/* Orbe decorativo inferior izquierda */}
        <div
          className="pointer-events-none absolute -bottom-32 -left-16 h-80 w-80 rounded-full opacity-15"
          aria-hidden="true"
          style={{ background: 'radial-gradient(circle, #E53040, transparent 70%)' }}
        />

        {/* Logo PROING */}
        <div className="relative z-10 flex items-center gap-3">
          <div
            className="flex h-11 w-11 items-center justify-center rounded-2xl"
            style={{
              background: 'linear-gradient(135deg, #E53040 0%, #C41E2D 100%)',
              boxShadow: '0 4px 16px rgba(229,48,64,0.4)',
            }}
          >
            <GraduationCap className="h-6 w-6 text-white" strokeWidth={1.75} />
          </div>
          <div>
            <p
              className="text-sm font-extrabold tracking-[0.2em] text-white"
              style={{ fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif" }}
            >
              PROING
            </p>
            <p className="text-[10px] font-semibold uppercase tracking-widest text-white/50">
              Campus Virtual LMS
            </p>
          </div>
        </div>

        {/* Contenido central */}
        <div className="relative z-10">
          <h1
            className="text-4xl font-black leading-tight tracking-tight text-white xl:text-5xl"
            style={{ fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif" }}
          >
            Aprende sin
            <br />
            <span
              className="bg-clip-text text-transparent"
              style={{ backgroundImage: 'linear-gradient(90deg, #3B7BFF, #60A5FA)' }}
            >
              límites.
            </span>
          </h1>
          <p className="mt-5 max-w-sm text-sm leading-relaxed text-white/60">
            Accede a tus cursos, módulos semanales, tareas y sesiones Zoom
            desde un solo lugar. Tu campus siempre disponible.
          </p>

          {/* Features — con checkmarks verdes para legibilidad inmediata */}
          <div className="mt-8 space-y-3">
            {[
              { text: 'Módulos semanales con PDF, video y Zoom', icon: BookOpen },
              { text: 'Seguimiento de progreso en tiempo real',  icon: GraduationCap },
              { text: 'Entregas, calificaciones y anuncios',     icon: Shield },
            ].map((f) => (
              <div key={f.text} className="flex items-center gap-3">
                <CheckCircle2
                  className="h-4 w-4 shrink-0"
                  strokeWidth={2}
                  style={{ color: '#3B7BFF' }}
                />
                <span className="text-sm text-white/70">{f.text}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Footer institucional */}
        <div className="relative z-10 flex items-center justify-between text-xs text-white/30">
          <span>© 2026 PROING · Campus Virtual</span>
          <span>2026-II</span>
        </div>
      </div>

      {/* ================== Panel derecho — Formulario ================== */}
      <div className="flex min-h-screen flex-col bg-white">
        {/* Header móvil */}
        <div
          className="flex items-center gap-2.5 border-b px-6 py-4 lg:hidden"
          style={{ borderColor: '#E8EDF5' }}
        >
          <div
            className="flex h-8 w-8 items-center justify-center rounded-xl"
            style={{ background: 'linear-gradient(135deg, #E53040, #C41E2D)' }}
          >
            <GraduationCap className="h-4 w-4 text-white" strokeWidth={1.75} />
          </div>
          <div>
            <span
              className="text-sm font-bold text-navy"
              style={{ fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif" }}
            >
              PROING
            </span>
            <span className="ml-1.5 text-xs text-slate-400">Campus Virtual</span>
          </div>
        </div>

        <div className="flex flex-1 items-center justify-center px-6 py-10 sm:px-10">
          <div className="w-full max-w-[420px]">

            {/* Título del formulario */}
            <div className="mb-8">
              <h2
                className="text-2xl font-black text-navy"
                style={{ fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif" }}
              >
                Iniciar sesión
              </h2>
              <p className="mt-1.5 text-sm text-slate-500">
                Usa tu correo institucional PROING para continuar.
              </p>
            </div>

            {/* Selector de rol — visual y auto-explicativo */}
            <div className="mb-6">
              <p className="mb-3 text-xs font-bold uppercase tracking-widest text-slate-400">
                ¿Cómo vas a ingresar?
              </p>
              <div className="grid grid-cols-3 gap-2">
                {roles.map((r) => {
                  const isSelected = role === r.id;
                  return (
                    <button
                      key={r.id}
                      type="button"
                      onClick={() => handleRoleSelect(r.id)}
                      aria-pressed={isSelected}
                      className="flex flex-col items-center gap-1.5 rounded-2xl p-3 text-center transition-all duration-200"
                      style={isSelected ? {
                        background: `${r.color}12`,
                        border: `2px solid ${r.color}`,
                        boxShadow: `0 4px 16px ${r.color}20`,
                      } : {
                        background: '#F4F6FA',
                        border: '2px solid transparent',
                      }}
                    >
                      <span
                        className="flex h-9 w-9 items-center justify-center rounded-xl transition-all"
                        style={isSelected ? {
                          background: r.color,
                          boxShadow: `0 4px 12px ${r.color}40`,
                        } : {
                          background: '#E8EDF5',
                        }}
                      >
                        <r.icon
                          className="h-4 w-4"
                          strokeWidth={1.75}
                          style={{ color: isSelected ? '#fff' : '#94A3B8' }}
                        />
                      </span>
                      <span
                        className="text-xs font-bold leading-none"
                        style={{ color: isSelected ? r.color : '#64748B' }}
                      >
                        {r.label}
                      </span>
                    </button>
                  );
                })}
              </div>
              <p className="mt-2.5 text-xs text-slate-400 text-center">
                {selectedRole.description}
              </p>
            </div>

            {/* Formulario */}
            <form onSubmit={handleSubmit} className="space-y-4" noValidate>
              {/* Campo correo */}
              <div className="space-y-1.5">
                <label
                  htmlFor="email"
                  className="text-sm font-semibold text-slate-700"
                >
                  Correo institucional
                </label>
                <input
                  id="email"
                  type="email"
                  autoComplete="email"
                  placeholder="usuario@proing.edu.pe"
                  value={email}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
                  required
                  className="h-11 w-full rounded-xl px-4 text-sm text-navy transition-all focus:outline-none"
                  style={{
                    background: '#F4F6FA',
                    border: '1.5px solid #DDE2ED',
                    color: '#0F1F3D',
                  }}
                  onFocus={(e) => {
                    e.currentTarget.style.borderColor = '#3B7BFF';
                    e.currentTarget.style.background = '#fff';
                    e.currentTarget.style.boxShadow = '0 0 0 3px rgba(59,123,255,0.1)';
                  }}
                  onBlur={(e) => {
                    e.currentTarget.style.borderColor = '#DDE2ED';
                    e.currentTarget.style.background = '#F4F6FA';
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                  aria-describedby={error ? 'login-error' : undefined}
                />
              </div>

              {/* Campo contraseña */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <label
                    htmlFor="password"
                    className="text-sm font-semibold text-slate-700"
                  >
                    Contraseña
                  </label>
                  <Link
                    to="/forgot-password"
                    className="text-xs font-semibold transition-colors hover:underline"
                    style={{ color: '#3B7BFF' }}
                  >
                    ¿Olvidaste tu contraseña?
                  </Link>
                </div>
                <div className="relative">
                  <input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    autoComplete="current-password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
                    required
                    className="h-11 w-full rounded-xl px-4 pr-11 text-sm text-navy transition-all focus:outline-none"
                    style={{
                      background: '#F4F6FA',
                      border: '1.5px solid #DDE2ED',
                    }}
                    onFocus={(e) => {
                      e.currentTarget.style.borderColor = '#3B7BFF';
                      e.currentTarget.style.background = '#fff';
                      e.currentTarget.style.boxShadow = '0 0 0 3px rgba(59,123,255,0.1)';
                    }}
                    onBlur={(e) => {
                      e.currentTarget.style.borderColor = '#DDE2ED';
                      e.currentTarget.style.background = '#F4F6FA';
                      e.currentTarget.style.boxShadow = 'none';
                    }}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((v) => !v)}
                    aria-label={showPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'}
                    aria-pressed={showPassword}
                    className="absolute right-3 top-1/2 inline-flex h-7 w-7 -translate-y-1/2 items-center justify-center rounded-lg text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-600"
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4" aria-hidden="true" />
                    ) : (
                      <Eye className="h-4 w-4" aria-hidden="true" />
                    )}
                  </button>
                </div>
              </div>

              {/* Error message */}
              {error && (
                <p
                  id="login-error"
                  role="alert"
                  className="rounded-xl px-4 py-3 text-sm font-medium"
                  style={{
                    background: '#FEF0F1',
                    border: '1px solid #FBAFB5',
                    color: '#C41E2D',
                  }}
                >
                  {error}
                </p>
              )}

              {/* Botón submit */}
              <button
                type="submit"
                id="login-submit"
                disabled={isSubmitting}
                aria-busy={isSubmitting}
                className="mt-2 flex h-12 w-full items-center justify-center gap-2 rounded-xl text-sm font-bold text-white transition-all duration-200 disabled:opacity-70"
                style={{
                  background: isSubmitting
                    ? '#3B7BFF'
                    : 'linear-gradient(135deg, #3B7BFF 0%, #1A5CE8 100%)',
                  boxShadow: '0 4px 16px rgba(59,123,255,0.35)',
                }}
                onMouseEnter={(e) => {
                  if (!isSubmitting) {
                    (e.currentTarget as HTMLButtonElement).style.transform = 'translateY(-1px)';
                    (e.currentTarget as HTMLButtonElement).style.boxShadow = '0 6px 20px rgba(59,123,255,0.45)';
                  }
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLButtonElement).style.transform = 'translateY(0)';
                  (e.currentTarget as HTMLButtonElement).style.boxShadow = '0 4px 16px rgba(59,123,255,0.35)';
                }}
              >
                {isSubmitting ? (
                  <span className="inline-flex items-center gap-2">
                    <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                    Ingresando…
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-2">
                    Entrar al campus
                    <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </span>
                )}
              </button>
            </form>

            {/* Términos + soporte */}
            <p className="mt-6 text-center text-xs leading-relaxed text-slate-400">
              Al continuar aceptas los{' '}
              <a href="#" className="font-semibold text-slate-600 underline hover:text-navy">
                Términos
              </a>
              {' '}y{' '}
              <a href="#" className="font-semibold text-slate-600 underline hover:text-navy">
                Privacidad
              </a>{' '}
              de PROING LMS.
            </p>

            <div
              className="mt-6 rounded-xl px-4 py-3 text-center text-xs text-slate-400"
              style={{ background: '#F4F6FA', border: '1px solid #E8EDF5' }}
            >
              ¿Problemas para acceder?{' '}
              <a
                href="mailto:soporte@proing.edu.pe"
                className="font-semibold text-slate-600 hover:underline"
              >
                soporte@proing.edu.pe
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
