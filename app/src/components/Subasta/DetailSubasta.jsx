import { Link } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import SubastaService from "@/services/SubastaService";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { LoadingGrid } from "@/components/ui/custom/LoadingGrid";
import { ErrorAlert } from "@/components/ui/custom/ErrorAlert";
import { EmptyState } from "@/components/ui/custom/EmptyState";
import {
    ArrowLeft,
    ImageIcon,
    Package,
    Shield,
    CalendarDays,
    BadgeDollarSign,
    Gavel,
} from "lucide-react";

const BASE_URL = import.meta.env.VITE_BASE_URL + "uploads";

export default function DetailSubasta() {
    const navigate = useNavigate();
    const { id } = useParams();
    const [subasta, setData] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const [cantidadPujas, setCantidadPujas] = useState(0);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await SubastaService.getSubastaById(id);
                
                const responsePujas = await SubastaService.getCantidadPujas(id);
                if (responsePujas.data.success) 
                setCantidadPujas(Number(responsePujas.data.data?.[0]?.total_pujas ?? 0));
                if (response.data.success && response.data.data) {
                    setData(response.data.data);
                } else {
                    setError("No se encontró la subasta solicitada.");
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
    if (error) return <ErrorAlert title="Error al cargar subasta." message={error} />;
    if (!subasta) return <EmptyState message="No se encontró la subasta solicitada." />;
    return (
        
        <div className="mx-auto w-full max-w-5xl px-4 sm:px-6 py-10">
            <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-lg">
                {/* ENCABEZADO */}
                <div className="px-8 py-8 text-center bg-gradient-to-r from-background via-card to-background border-b border-border">
                    <div className="mx-auto mb-4 inline-flex items-center gap-2 rounded-full border border-border bg-muted/30 px-4 py-2 text-xs tracking-[0.28em] uppercase text-muted-foreground">
                        <span className="h-2 w-2 rounded-full bg-[color:var(--color-accent)]" />
                        Detalle de la Subasta
                    </div>

                    <div className="relative mx-auto mt-6 w-full max-w-xs aspect-[4/3] bg-muted/30 flex items-center justify-center overflow-hidden rounded-xl border border-border">
                        {subasta.objeto?.imagen?.url ? (
                            <img
                                src={`${BASE_URL}/${subasta.objeto.imagen.url}`}
                                alt={subasta.objeto?.nombre}
                                className="h-full w-full object-contain"
                            />
                        ) : (
                            <div className="flex items-center justify-center text-muted-foreground">
                                <ImageIcon className="h-10 w-10 opacity-60" />
                            </div>
                        )}
                    </div>
                </div>

                {/* CUERPO */}
                <Card className="rounded-none border-0 shadow-none bg-transparent">
                    <CardContent className="p-8 space-y-8">
                        <div className="grid gap-6 lg:grid-cols-2">
                            {/* INFORMACIÓN DEL OBJETO */}
                            <section className="rounded-xl border border-border bg-background/40 p-6 shadow-sm">
                                <div className="flex items-center gap-3 pb-4 border-b border-border/60">
                                    <div className="h-10 w-10 rounded-xl border border-border bg-muted/30 grid place-items-center">
                                        <Package className="h-5 w-5 text-[color:var(--color-accent)]" />
                                    </div>
                                    <div className="text-left">
                                        <h2 className="font-serif text-lg font-semibold text-foreground">
                                            Información del Objeto
                                        </h2>
                                        <p className="text-xs tracking-widest uppercase text-muted-foreground">
                                            Datos principales
                                        </p>
                                    </div>
                                </div>

                                <div className="mt-5 space-y-4 text-left">
                                    <div>
                                        <p className="text-sm text-muted-foreground">Nombre</p>
                                        <p className="font-medium text-foreground">
                                            {subasta.objeto.nombre}
                                        </p>
                                    </div>

                                    <div>
                                        <p className="text-sm text-muted-foreground">Condición</p>
                                        <p className="font-medium text-foreground">
                                            {subasta.objeto.condicion.nombre}
                                        </p>
                                    </div>

                                    <div>
                                        <p className="text-sm text-muted-foreground">Categorías</p>
                                        <div>
                                            <div className="mt-2 space-y-2">
                                                {subasta.objeto.categorias?.map((element) => (
                                                <div key={element.id_categoria} className="flex items-center gap-2">
                                                    <span className="h-2.5 w-2.5 rounded-full bg-[color:var(--color-accent)]" />
                                                    <p className="font-semibold text-foreground">
                                                    {element.nombre}
                                                    </p>
                                                </div>
                                                ))}
                                            </div>

                                        </div>
                                    </div>
                                </div>
                            </section>

                            {/* DATOS DE LA SUBASTA */}
                            <section className="rounded-xl border border-border bg-background/40 p-6 shadow-sm">
                                <div className="flex items-center gap-3 pb-4 border-b border-border/60">
                                    <div className="h-10 w-10 rounded-xl border border-border bg-muted/30 grid place-items-center">
                                        <Shield className="h-5 w-5 text-[color:var(--color-accent)]" />
                                    </div>
                                    <div className="text-left">
                                        <h2 className="font-serif text-lg font-semibold text-foreground">
                                            Datos Completos de la Subasta
                                        </h2>
                                        <p className="text-xs tracking-widest uppercase text-muted-foreground">
                                            Información general
                                        </p>
                                    </div>
                                </div>

                                <div className="mt-5 grid gap-4 text-left">
                                    <div className="rounded-lg border border-border bg-muted/20 p-4">
                                        <div className="flex items-start gap-3">
                                            <CalendarDays className="mt-0.5 h-4 w-4 text-[color:var(--color-accent)]" />
                                            <div>
                                                <p className="text-xs tracking-widest uppercase text-muted-foreground">
                                                    Fecha de inicio
                                                </p>
                                            <p className="mt-2 font-semibold text-foreground">
                                            {new Date(subasta.fecha_inicio).toLocaleString("es-CR", {
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
                                    </div>

                                    <div className="rounded-lg border border-border bg-muted/20 p-4">
                                        <div className="flex items-start gap-3">
                                            <CalendarDays className="mt-0.5 h-4 w-4 text-[color:var(--color-accent)]" />
                                            <div>
                                                <p className="text-xs tracking-widest uppercase text-muted-foreground">
                                                    Fecha de cierre
                                                </p>
                                                <p className="mt-2 font-semibold text-foreground">
                                                
                                            {new Date(subasta.fecha_cierre).toLocaleString("es-CR", {
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
                                    </div>

                                    <div className="rounded-lg border border-border bg-muted/20 p-4">
                                        <div className="flex items-start gap-3">
                                            <BadgeDollarSign className="mt-0.5 h-4 w-4 text-[color:var(--color-accent)]" />
                                            <div>
                                                <p className="text-xs tracking-widest uppercase text-muted-foreground">
                                                    Precio base
                                                </p>
                                                <p className="mt-2 font-semibold text-foreground">
                                                    {subasta.precio_base} ₡ 
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="rounded-lg border border-border bg-muted/20 p-4">
                                        <div className="flex items-start gap-3">
                                            <BadgeDollarSign className="mt-0.5 h-4 w-4 text-[color:var(--color-accent)]" />
                                            <div>
                                                <p className="text-xs tracking-widest uppercase text-muted-foreground">
                                                    Incremento mínimo
                                                </p>
                                                <p className="mt-2 font-semibold text-foreground">
                                                    {subasta.incremento_minimo} ₡ 
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="rounded-lg border border-border bg-muted/20 p-4">
                                        <div className="flex items-start gap-3">
                                            <Shield className="mt-0.5 h-4 w-4 text-[color:var(--color-accent)]" />
                                            <div>
                                                <p className="text-xs tracking-widest uppercase text-muted-foreground">
                                                    Estado actual
                                                </p>
                                                <p className="mt-2 font-semibold text-foreground">
                                                    {subasta.estado.nombre}
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="rounded-lg border border-border bg-muted/20 p-4">
                                        <div className="flex items-start gap-3">
                                            <Gavel className="mt-0.5 h-4 w-4 text-[color:var(--color-accent)]" />
                                            <div>
                                                <p className="text-xs tracking-widest uppercase text-muted-foreground">
                                                    Cantidad total de pujas
                                                </p>
                                                <p className="mt-2 font-semibold text-foreground">
                                                    {cantidadPujas}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </section>
                        </div>

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

                                <Button
                                    asChild
                                    className="bg-[color:var(--color-primary)] text-[color:var(--color-primary-foreground)] hover:opacity-95"
                                    >
                                    <Link to={`/puja/table/${subasta.id_subasta}`}>
                                        Ver pujas
                                    </Link>
                                </Button>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}