import React from "react";
import fondo from "../../assets/fondo.png";

export function Home() {
  return (
    <div className="relative isolate w-full h-screen flex items-center justify-center text-center overflow-hidden">
      {/* Fondo */}
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `url(${fondo})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          filter: "brightness(0.6) contrast(1.05)",
        }}
      />

      {/* Overlay */}
      <div className="absolute inset-0 z-0 bg-black/50" />

      {/* Contenido */}
      <div className="relative z-10 px-4 max-w-3xl text-white">
        {/* Badge vintage */}
        <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-black/25 px-4 py-2 text-xs tracking-widest uppercase backdrop-blur-sm">
          <span className="h-2 w-2 rounded-full bg-[color:var(--color-accent)]" />
          LO MEJOR EN LA INDUSTRIA MUSICAL
        </div>

        <h1 className="mt-6 text-5xl md:text-6xl font-serif font-bold tracking-tight mb-4 drop-shadow-lg">
          Puja por piezas únicas y exclusivas.
        </h1>

        <p className="text-lg md:text-xl text-white/85 mb-8 drop-shadow">
          Instrumentos, accesorios y coleccionables cómo: <br /> Guitarras, bajos,
          amplificadores, pedales, cuerdas, casetes y <br />lo mejor en la industria musical, 
          lo encuentras en Ortega's Auction.
        </p>

        {/* Botones */}
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <a
            href="/auctions"
            className="px-7 py-3 rounded-lg font-semibold shadow-lg transition
                       bg-[color:var(--color-primary)] text-[color:var(--color-primary-foreground)]
                       hover:opacity-95"
          >
            Ver Subastas
          </a>

          <a
            href="/auctions/create"
            className="px-7 py-3 rounded-lg font-semibold shadow-lg transition
                       border border-white/15 bg-black/25 text-white
                       hover:bg-black/35"
          >
            Iniciar sesión
          </a>
        </div>

      
        <div className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-3 text-left">
          <div className="rounded-xl border border-white/10 bg-black/20 p-4 backdrop-blur-sm">
            <p className="text-xs tracking-widest uppercase text-white/70">En vivo</p>
            <p className="mt-1 font-serif text-lg">Subastas activas</p>
            <p className="mt-1 text-sm text-white/75">
              Pujas en tiempo real.
            </p>
          </div>

          <div className="rounded-xl border border-white/10 bg-black/20 p-4 backdrop-blur-sm">
            <p className="text-xs tracking-widest uppercase text-white/70">Calificación</p>
            <p className="mt-1 font-serif text-lg">Condición 1–10</p>
            <p className="mt-1 text-sm text-white/75">
              Transparencia total en el estado del artículo.
            </p>
          </div>

          <div className="rounded-xl border border-white/10 bg-black/20 p-4 backdrop-blur-sm">
            <p className="text-xs tracking-widest uppercase text-white/70">Seguridad</p>
            <p className="mt-1 font-serif text-lg">Confianza</p>
            <p className="mt-1 text-sm text-white/75">
              Resultados con acceso público.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

