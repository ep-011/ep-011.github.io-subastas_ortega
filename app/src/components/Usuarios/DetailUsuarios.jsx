import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import UsuarioService from "@/services/UsuarioService";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { LoadingGrid } from "@/components/ui/custom/LoadingGrid";
import { ErrorAlert } from "@/components/ui/custom/ErrorAlert";
import { EmptyState } from "@/components/ui/custom/EmptyState";
import { Mail, Shield, Lock, ArrowLeft } from "lucide-react";

export default function DetailUsuarios() {
    const navigate = useNavigate();
    const { id } = useParams();

    const [usuario, setUsuario] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    const [cantidadPujas, setCantidadPujas] = useState(0);
    const [subastasCreadas, setSubastasCreadas] = useState(0);

    useEffect(() => {
        const fetchData = async () => {
            try {

                // Obtener usuario
                const response = await UsuarioService.getUsuarioById(id);

                if (!response.data.success || !response.data.data) {
                    setError("No se encontró el usuario solicitado.");
                    return;
                }

                const usuarioData = response.data.data;
                setUsuario(usuarioData);

                // Obtener pujas del usuario
                const pujasResponse = await UsuarioService.getPujasDelUsuario(usuarioData.id_usuario);

                setCantidadPujas(
                    pujasResponse.data?.data?.[0]?.cantidad_pujas ?? 0
                );

                // Obtener subastas creadas
                const subastasResponse = await UsuarioService.getSubastasCreadas(usuarioData.id_usuario);

                setSubastasCreadas(
                    subastasResponse.data?.data?.[0]?.cantidad_subastas ?? 0
                );

            } catch (err) {
                setError(err.message || "Error al conectar con el servidor");
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [id]);

    if (loading) return <LoadingGrid count={1} type="grid" />;
    if (error) return <ErrorAlert title="Error al cargar usuario." message={error} />;
    if (!usuario) return <EmptyState message="No se encontró el usuario solicitado." />;

    return (
        <div className="mx-auto w-full max-w-5xl px-4 sm:px-6 py-10">

            <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-lg">

                {/* ENCABEZADO */}
                <div className="px-8 py-8 text-center bg-gradient-to-r from-background via-card to-background border-b border-border">
                    <div className="mx-auto mb-4 inline-flex items-center gap-2 rounded-full border border-border bg-muted/30 px-4 py-2 text-xs tracking-[0.28em] uppercase text-muted-foreground">
                        <span className="h-2 w-2 rounded-full bg-[color:var(--color-accent)]" />
                        Información del usuario
                    </div>

                    <h1 className="font-serif text-3xl md:text-4xl font-bold tracking-tight text-foreground">
                        {usuario.nombre} {usuario.nombre2} {usuario.apellido1} {usuario.apellido2}
                    </h1>

                    <p className="mt-3 text-sm md:text-base text-muted-foreground">
                        Número de Cédula:
                        <span className="text-foreground font-semibold"> {usuario.cedula}</span>
                    </p>
                </div>

                {/* CUERPO */}
                <Card className="rounded-none border-0 shadow-none bg-transparent">
                    <CardContent className="p-8 space-y-8">

                        <div className="grid gap-6 lg:grid-cols-2">

                            {/* CONTACTO */}
                            <section className="rounded-xl border border-border bg-background/40 p-6 shadow-sm">
                                <div className="flex items-center gap-3 pb-4 border-b border-border/60">
                                    <div className="h-10 w-10 rounded-xl border border-border bg-muted/30 grid place-items-center">
                                        <Mail className="h-5 w-5 text-[color:var(--color-accent)]" />
                                    </div>

                                    <div>
                                        <h2 className="font-serif text-lg font-semibold text-foreground">
                                            Contacto
                                        </h2>
                                        <p className="text-xs tracking-widest uppercase text-muted-foreground">
                                            Información principal
                                        </p>
                                    </div>
                                </div>

                                <div className="mt-5">
                                    <p className="text-sm text-muted-foreground">Correo Electrónico</p>
                                    <p className="font-medium text-foreground">
                                        {usuario.correo}
                                    </p>
                                </div>
                            </section>

                            {/* ESTADO Y ROL */}
                            <section className="rounded-xl border border-border bg-background/40 p-6 shadow-sm">
                                <div className="flex items-center gap-3 pb-4 border-b border-border/60">
                                    <div className="h-10 w-10 rounded-xl border border-border bg-muted/30 grid place-items-center">
                                        <Shield className="h-5 w-5 text-[color:var(--color-accent)]" />
                                    </div>

                                    <div>
                                        <h2 className="font-serif text-lg font-semibold text-foreground">
                                            Estado & Rol
                                        </h2>
                                        <p className="text-xs tracking-widest uppercase text-muted-foreground">
                                            Acceso y condición
                                        </p>
                                    </div>
                                </div>

                                <div className="mt-5 grid gap-4">

                                    <div className="rounded-lg border border-border bg-muted/20 p-4">
                                        <p className="text-xs tracking-widest uppercase text-muted-foreground">
                                            Estado
                                        </p>

                                        <p className="mt-2 font-semibold text-foreground">
                                            {usuario.estado?.nombre}
                                        </p>
                                    </div>

                                    <div className="rounded-lg border border-border bg-muted/20 p-4">
                                        <p className="text-xs tracking-widest uppercase text-muted-foreground">
                                            Rol
                                        </p>

                                        <p className="mt-2 font-semibold text-foreground">
                                            {usuario.rol?.nombre}
                                        </p>
                                    </div>

                                </div>
                            </section>
                        </div>

                        {/* HISTORIAL */}
                        <section className="rounded-xl border border-border bg-background/40 p-6 shadow-sm">

                            <div className="flex items-center gap-3 pb-4 border-b border-border/60">
                                <div className="h-10 w-10 rounded-xl border border-border bg-muted/30 grid place-items-center">
                                    <Lock className="h-5 w-5 text-[color:var(--color-accent)]" />
                                </div>

                                <div>
                                    <h3 className="font-serif text-lg font-semibold text-foreground">
                                        Historial de actividad
                                    </h3>
                                </div>
                            </div>

                            <div className="mt-5 grid gap-4 sm:grid-cols-2">

                                {usuario.rol?.id_rol == 1 && (
                                    <div className="rounded-xl border border-border bg-muted/20 p-5">
                                        <p className="text-xs tracking-widest uppercase text-muted-foreground">
                                            Pujas realizadas
                                        </p>

                                        <p className="mt-2 font-serif text-3xl font-bold text-foreground">
                                            {cantidadPujas}
                                        </p>
                                    </div>
                                )}

                                {usuario.rol?.id_rol == 2 && (
                                    <div className="rounded-xl border border-border bg-muted/20 p-5">
                                        <p className="text-xs tracking-widest uppercase text-muted-foreground">
                                            Subastas creadas
                                        </p>

                                        <p className="mt-2 font-serif text-3xl font-bold text-foreground">
                                            {subastasCreadas}
                                        </p>
                                    </div>
                                )}

                                <div className="rounded-xl border border-border bg-muted/20 p-5">
                                    <p className="text-xs tracking-widest uppercase text-muted-foreground">
                                        Fecha de registro
                                    </p>

                                    <p className="mt-2 font-serif text-xl font-semibold text-foreground">
                                        {new Date(usuario.fecha_registro).toLocaleString("es-CR")}
                                    </p>
                                </div>

                            </div>
                        </section>

                        {/* BOTONES */}
                        <div className="flex justify-end gap-3 pt-2">

                            <Button
                                variant="outline"
                                onClick={() => navigate(-1)}
                            >
                                <ArrowLeft className="h-4 w-4 mr-2" />
                                Regresar
                            </Button>

                            <Button>
                                Actualizar datos
                            </Button>

                        </div>

                    </CardContent>
                </Card>

            </div>

        </div>
    );
}