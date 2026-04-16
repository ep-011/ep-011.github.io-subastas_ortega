import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ObjetoService from "@/services/ObjetoService";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { LoadingGrid } from "@/components/ui/custom/LoadingGrid";
import { ErrorAlert } from "@/components/ui/custom/ErrorAlert";
import { EmptyState } from "@/components/ui/custom/EmptyState";
import { Mail, Shield, Lock, ArrowLeft, Power, ImageIcon } from "lucide-react";
const BASE_URL = import.meta.env.VITE_BASE_URL + "uploads";

export default function DetailObjeto() {
    const navigate = useNavigate();
    const { id } = useParams();
    const [objeto, setData] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
        try {
            const response = await ObjetoService.getObjetoById(id);

// console.log("RESPUESTA getUsuarioById:", response.data);
            if (response.data.success && response.data.data) {
            setData(response.data.data);
            } else {
            setError("No se encontró el usuario solicitado.");
            }
        } catch (err) {
            if (err.name !== "AbortError") setError(err.message);
        } finally {
            setLoading(false);
        }
        };
        fetchData();
    }, [id]);

    if (loading) return <LoadingGrid count={1} type="grid" />;
    if (error) return <ErrorAlert title="Error al cargar usuario." message={error} />;
    if (!objeto) return <EmptyState message="No se encontró el usuario solicitado." />;

    return (
        
        <div className="mx-auto w-full max-w-5xl px-4 sm:px-6 py-10">
    {/* CONTENEDOR TIPO “REPORTE” */}
    <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-lg">
        {/* ENCABEZADO */}
        <div className="px-8 py-8 text-center bg-gradient-to-r from-background via-card to-background border-b border-border">
        <div className="mx-auto mb-4 inline-flex items-center gap-2 rounded-full border border-border bg-muted/30 px-4 py-2 text-xs tracking-[0.28em] uppercase text-muted-foreground">
            <span className="h-2 w-2 rounded-full bg-[color:var(--color-accent)]" />
            Información del Objeto
        </div>

        <h1 className="font-serif text-3xl md:text-4xl font-bold tracking-tight text-foreground">
            {objeto.nombre}
        </h1>
    
    <div className="relative mx-auto w-full max-w-xs aspect-[4/3] bg-muted/30 flex items-center justify-center overflow-hidden">
        {objeto.imagen?.url ? (
            <img
            src={`${BASE_URL}/${objeto.imagen.url}`}
            alt={objeto.nombre}
            className="max-h-full max-w-full object-contain"
            />
        ) : (
            <div className="flex items-center justify-center text-muted-foreground">
            <ImageIcon className="h-10 w-10 opacity-60" />
            </div>
        )}
    </div>

        <p className="mt-3 text-sm md:text-base text-muted-foreground">
            Descripción:{" "}
            <span className="text-foreground font-semibold">{objeto.descripcion}</span>
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
                <div className="text-left">
                    <h2 className="font-serif text-lg font-semibold text-foreground">
                    Vendedor
                    </h2>
                    <p className="text-xs tracking-widest uppercase text-muted-foreground">
                    Información principal
                    </p>
                </div>
                </div>
                <div className="mt-5 space-y-2 text-left">
                <p className="text-sm text-muted-foreground">Vendedor</p>
                <a  className="inline-flex items-center gap-2 font-medium text-foreground"
                >
                    {objeto.vendedor.nombre} {objeto.vendedor.apellido1} {objeto.vendedor.apellido2}
                    
                </a>
                </div>
                <div className="mt-5 space-y-2 text-left">
                <p className="text-sm text-muted-foreground">Identificación</p>
                <a  className="inline-flex items-center gap-2 font-medium text-foreground"
                >
                    {objeto.vendedor.cedula}
                </a>
                </div>
                <div className="mt-5 space-y-2 text-left">
                <p className="text-sm text-muted-foreground">Correo Electrónico</p>
                <a  className="inline-flex items-center gap-2 font-medium text-foreground"
                >
                    {objeto.vendedor.correo}
                </a>
                </div>

            </section>

            {/* ESTADO Y ROL */}
            <section className="rounded-xl border border-border bg-background/40 p-6 shadow-sm">
                <div className="flex items-center gap-3 pb-4 border-b border-border/60">
                <div className="h-10 w-10 rounded-xl border border-border bg-muted/30 grid place-items-center">
                    <Shield className="h-5 w-5 text-[color:var(--color-accent)]" />
                </div>
                <div className="text-left">
                    <h2 className="font-serif text-lg font-semibold text-foreground">
                    Estado y Condición
                    </h2>
                    <p className="text-xs tracking-widest uppercase text-muted-foreground">
                    Calidad
                    </p>
                </div>
                </div>

                <div className="mt-5 grid gap-4 text-left">
                <div className="rounded-lg border border-border bg-muted/20 p-4">
                    <p className="text-xs tracking-widest uppercase text-muted-foreground">
                    Valoración del objeto (1-10):
                    </p>
                    <div className="mt-2 flex items-center gap-2">
                    <span className="h-2.5 w-2.5 rounded-full bg-[color:var(--color-accent)]" />
                    <p className="font-semibold text-foreground">
                        {objeto.condicion?.id_condicion_objeto} - {objeto.condicion?.nombre}
                    </p>
                    </div>
                </div>

                <div className="rounded-lg border border-border bg-muted/20 p-4">
                    <p className="text-xs tracking-widest uppercase text-muted-foreground">
                    Estado del objeto
                    </p>
                    <p className="mt-2 font-semibold text-foreground">
                    {objeto.estado?.nombre}
                    </p>
                </div>
                <div className="rounded-lg border border-border bg-muted/20 p-4">
                    <p className="text-xs tracking-widest uppercase text-muted-foreground">
                    Fecha de Registro
                    </p>
                    <p className="mt-2 font-semibold text-foreground">
                    {new Date(objeto.fecha_registro).toLocaleString("es-CR", {
                            day: "2-digit",
                            month: "2-digit",
                            year: "numeric",
                            hour: "2-digit",
                            minute: "2-digit",
                            hour12: true
                            })}
                    </p>
                </div>

                </div>
            </section>
            </div>

            {/* Categorias */}
            <section className="rounded-xl border border-border bg-background/40 p-6 shadow-sm">
            <div className="flex items-center gap-3 pb-4 border-b border-border/60">
                <div className="h-10 w-10 rounded-xl border border-border bg-muted/30 grid place-items-center">
                <Lock className="h-5 w-5 text-[color:var(--color-accent)]" />
                </div>
                <div className="text-left">
                <h3 className="font-serif text-lg font-semibold text-foreground">
                    Categorias 
                </h3>
                <p className="text-xs tracking-widest uppercase text-muted-foreground">
                </p>
                </div>

                
            </div>
            <CardContent>
                {objeto.categorias.map((element) => (
                    <div key={element.id} className="mt-2 flex items-center gap-2">
                        <span className="h-2.5 w-2.5 rounded-full bg-[color:var(--color-accent)]" />
                        <p className="font-semibold text-foreground">
                            {element.nombre}
                        </p>
                    </div>
                ))}
            </CardContent>

            </section>

            {/* ACCIONES */}
            <div className="flex flex-col-reverse sm:flex-row items-stretch sm:items-center justify-end gap-3 pt-2">
            <Button
                variant="outline"
                className="border-border bg-transparent hover:bg-muted/30"
                onClick={() => navigate(-1)}
            >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Regresar
            </Button>
            </div>
        </CardContent>
        </Card>
    </div>
    </div>
    );
    }