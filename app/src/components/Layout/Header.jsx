"use client";

import { useState } from "react";
import { Link } from "react-router-dom";
import {
  ChartArea,
  Filter,
  Wrench,
  LogIn,
  UserPlus,
  LogOut,
  Menu,
  X,
  ChevronDown,
  User,
  Gavel,
  Hammer,
  Tags,
  Heart,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import {
  Menubar,
  MenubarMenu,
  MenubarTrigger,
  MenubarContent,
  MenubarItem,
} from "@/components/ui/menubar";
import { Sheet, SheetTrigger, SheetContent } from "@/components/ui/sheet";

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);

  const isAuthenticated = false;
  const clearUser = () => {};
  const totalItems = 0;

  const userEmail = "Invitado";
  const id_user = 2;

  const navItems = [
    { title: "Ver subastas activas", href: "/subasta/lista/1", icon: <Hammer className="h-4 w-4" />, show: true },
    { title: "Ver subastas inactivas", href: "/subasta/lista/2", icon: <Hammer className="h-4 w-4" />, show: true },
    { title: "Ver todas", href: "/subasta/lista/3", icon: <Wrench className="h-4 w-4" />, show: true },
    { title: "Prueba Pusher", href: "/test/realtime", icon: <Hammer className="h-4 w-4" />, show: true },
  ];

  const mantItems = [
    { title: "Objetos", href: "objeto/lista/" + id_user , icon: <Tags className="h-4 w-4" />, show: true },
    { title: "Usuarios", href: "usuarios/table/", icon: <Wrench className="h-4 w-4" />, show: true },
    { title: "Subastas", href: "/subasta/misubasta/" + id_user, icon: <Wrench className="h-4 w-4" />, show: true },
  ];


    const userItems = [
      {
        title: "Login",
        href: "/user/login",
        icon: <LogIn className="h-4 w-4" />,
        show: !isAuthenticated,
      },
      {
        title: "Registrarse",
        href: "/user/create",
        icon: <UserPlus className="h-4 w-4" />,
        show: !isAuthenticated,
      },
      {
        title: "Logout",
        href: "#logout",
        icon: <LogOut className="h-4 w-4" />,
        show: isAuthenticated,
        action: clearUser,
      },
    ];

  return (
    <header className="w-full fixed top-0 left-0 z-50 backdrop-blur-xl bg-gradient-to-r from-background/80 via-background/60 to-background/80 border-b border-border shadow-lg">
      <div className="flex items-center justify-between px-6 py-3 max-w-[1280px] mx-auto text-foreground">
        {/* Logo */}
        <Link
          to="/"
          className="flex items-center gap-2 text-xl font-semibold tracking-wide hover:opacity-90 transition"
        >
          <Gavel className="h-6 w-6 text-[color:var(--color-accent)]" />
          <span className="hidden sm:inline font-serif">Ortega's Auction</span>
        </Link>

        {/*  Menú */}
        <div className="hidden md:flex flex-1 justify-center">
          <Menubar className="w-auto bg-transparent border-none shadow-none space-x-6">
            {/* Subastas */}
            <MenubarMenu>
              <MenubarTrigger className="text-foreground font-medium flex items-center gap-1 hover:text-[color:var(--color-accent)] transition">
                <Hammer className="h-4 w-4" /> Subastas
                <ChevronDown className="h-3 w-3" />
              </MenubarTrigger>

              <MenubarContent className="bg-card/85 backdrop-blur-md border-border shadow-md">
                {navItems
                  .filter((item) => item.show)
                  .map((item) => (
                    <Link
                      key={item.href}
                      to={item.href}
                      className="flex items-center gap-2 py-2 px-3 text-foreground/90 hover:bg-muted rounded-md transition"
                    >
                      {item.icon} {item.title}
                    </Link>
                  ))}
              </MenubarContent>
            </MenubarMenu>

            {/* Catálogos */}
            <MenubarMenu>
              <MenubarTrigger className="text-foreground font-medium flex items-center gap-1 hover:text-[color:var(--color-accent)] transition">
                <Tags className="h-4 w-4" /> Mantenimientos
                <ChevronDown className="h-3 w-3" />
              </MenubarTrigger>

              <MenubarContent className="bg-card/85 backdrop-blur-md border-border shadow-md">
                {mantItems
                  .filter((item) => item.show)
                  .map((item) => (
                    <Link
                      key={item.href}
                      to={item.href}
                      className="flex items-center gap-2 py-2 px-3 text-foreground/90 hover:bg-muted rounded-md transition"
                    >
                      {item.icon} {item.title}
                    </Link>
                  ))}
              </MenubarContent>
            </MenubarMenu>

            {/* Usuario */}
            <MenubarMenu>
              <MenubarTrigger className="text-foreground font-medium flex items-center gap-1 hover:text-[color:var(--color-accent)] transition">
                <User className="h-4 w-4" /> {userEmail}
                <ChevronDown className="h-3 w-3" />
              </MenubarTrigger>

              <MenubarContent className="bg-card/85 backdrop-blur-md border-border shadow-md">
                {userItems
                  .filter((i) => i.show)
                  .map((item) => (
                    <MenubarItem key={item.href} asChild>
                      <Link
                        to={item.href}
                        onClick={() => item.action && item.action()}
                        className="flex items-center gap-2 py-2 px-3 rounded-md text-sm hover:bg-muted transition"
                      >
                        {item.icon} {item.title}
                      </Link>
                    </MenubarItem>
                  ))}
              </MenubarContent>
            </MenubarMenu>
          </Menubar>
        </div>

        {/* -------- Watchlist + Menú móvil -------- */}
        <div className="flex items-center gap-4">
          <Link to="/watchlist" className="relative hover:opacity-80">
            <Heart className="h-6 w-6" />
            <Badge className="absolute -top-2 -right-3 rounded-full px-2 py-0 text-xs font-semibold bg-[color:var(--color-accent)] text-accent-foreground">
              {totalItems}
            </Badge>
          </Link>

          {/* Menú móvil */}
          <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
            <SheetTrigger asChild>
              <button className="md:hidden inline-flex items-center justify-center p-2 rounded-lg bg-card/60 border border-border hover:bg-card transition">
                {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </SheetTrigger>

            <SheetContent
              side="left"
              className="bg-background/85 text-foreground backdrop-blur-lg w-72 border-r border-border"
            >
              <nav className="mt-8 px-4 space-y-6">
                <div>
                  <Link to="/" className="flex items-center gap-2 text-lg font-semibold">
                    <Gavel className="text-[color:var(--color-accent)]" />{" "}
                    <span className="font-serif">Ortega's Auction</span>
                  </Link>
                  <p className="mt-1 text-xs text-muted-foreground">LO MEJOR EN LA INDUSTRIA MUSICAL</p>
                </div>

                <div>
                  <h4 className="mb-2 text-lg font-semibold flex items-center gap-2">
                    <Hammer /> Subastas
                  </h4>
                  {navItems.map((item) => (
                    <Link
                      key={item.href}
                      to={item.href}
                      onClick={() => setMobileOpen(false)}
                      className="flex items-center gap-2 py-2 px-3 rounded-md text-foreground/90 hover:bg-muted transition"
                    >
                      {item.icon} {item.title}
                    </Link>
                  ))}
                </div>

                <div>
                  <h4 className="mb-2 text-lg font-semibold flex items-center gap-2">
                    <Tags /> Mantenimientos
                  </h4>
                  {mantItems.map((item) => (
                    <Link
                      key={item.href}
                      to={item.href}
                      onClick={() => setMobileOpen(false)}
                      className="flex items-center gap-2 py-2 px-3 rounded-md text-foreground/90 hover:bg-muted transition"
                    >
                      {item.icon} {item.title}
                    </Link>
                  ))}
                </div>

                <div>
                  <h4 className="mb-2 text-lg font-semibold flex items-center gap-2">
                    <User /> {userEmail}
                  </h4>
                  {userItems.map((item) =>
                    item.show ? (
                      <Link
                        key={item.href}
                        to={item.href}
                        onClick={() => {
                          if (item.action) item.action();
                          setMobileOpen(false);
                        }}
                        className="flex items-center gap-2 py-2 px-3 rounded-md text-foreground/90 hover:bg-muted transition"
                      >
                        {item.icon} {item.title}
                      </Link>
                    ) : null
                  )}
                </div>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}