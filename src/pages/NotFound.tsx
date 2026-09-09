import * as React from 'react';
import { Link } from 'react-router-dom';

export default function NotFound(): React.JSX.Element {
  return (
    <div className="flex min-h-[50vh] flex-col items-center justify-center p-6 text-center">
      <h1 className="text-2xl font-bold text-[#1a202c]">404 — Página no encontrada</h1>
      <p className="mt-2 text-sm text-gray-500">La ruta solicitada no existe.</p>
      <Link to="/" className="mt-4 text-sm font-semibold text-[#1976D2] hover:underline">
        Volver al inicio
      </Link>
    </div>
  );
}
