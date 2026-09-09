import * as React from 'react';
import { Outlet } from 'react-router-dom';
import GlobalSidebar from '@/components/layout/GlobalSidebar';
import TopHeader from '@/components/layout/TopHeader';

/**
 * RootLayout — Layout global responsivo para PROING LMS
 * Maneja el estado del menú móvil, padding adaptable y barra de navegación.
 */
export default function RootLayout(): React.JSX.Element {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState<boolean>(false);

  return (
    <div className="min-h-screen bg-[#F4F6FA]">
      <GlobalSidebar
        isOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
      />

      {/* Zona principal derecha */}
      <div className="flex min-h-screen flex-col md:pl-[220px]">
        {/* Top header fijo */}
        <TopHeader onOpenMobileMenu={() => setMobileMenuOpen(true)} />

        {/* Main content — adaptado en padding según móvil o escritorio */}
        <main
          id="main-content"
          className="flex-1 pt-[64px] pb-[60px] md:pt-[72px] md:pb-0"
          tabIndex={-1}
        >
          <Outlet />
        </main>
      </div>
    </div>
  );
}
