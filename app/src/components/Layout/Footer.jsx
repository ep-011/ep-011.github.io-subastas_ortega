import React from "react";
import { Gavel } from "lucide-react";

export function Footer() {
  return (
    <footer className="w-full bg-card border-t border-border text-foreground px-6 py-10 shadow-inner">
      <div className="w-full max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* -------- Navegación -------- */}
        <div>
          <h4 className="font-serif text-sm mb-3">Explorar</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li className="hover:text-foreground transition cursor-pointer">Subastas activas</li>
            <li className="hover:text-foreground transition cursor-pointer">Categorías</li>
          </ul>
        </div>

      <div>
          <h4 className="font-serif text-sm mb-3">Ingenieria del Software - 2026 </h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li className="hover:text-foreground transition cursor-pointer">Autor</li>
          </ul>
        </div>

        {/* -------- Cuenta -------- */}
        <div>
          <h4 className="font-serif text-sm mb-3">Cuenta</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li className="hover:text-foreground transition cursor-pointer">Mi perfil</li>
            <li className="hover:text-foreground transition cursor-pointer">Mis pujas</li>
            <li className="hover:text-foreground transition cursor-pointer">Publicar objeto</li>
          </ul>
        </div>
      </div>
      
    </footer>
  );
}