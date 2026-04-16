import React, { useEffect, useState } from "react";
import SubastaService from "@/services/SubastaService";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
    TooltipProvider,
} from "@/components/ui/tooltip";
import {
    MapPin,
    Clock,
    Phone,
    Mail,
    Info,
    ImageIcon,
} from "lucide-react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

CardsSubasta.propTypes = {
    data: PropTypes.array,
};

export default function CardsSubasta({ data }) {
    const BASE_URL = import.meta.env.VITE_BASE_URL + "uploads";
    const [cantidadPujas, setCantidadesPujas] = useState({});

    useEffect(() => {
        if (!data) return;

        const obtenerPujas = async () => {
            let pujas = {};

            for (let i = 0; i < data.length; i++) {
                const item = data[i];
                const response = await SubastaService.getCantidadPujas(item.id_subasta);

                pujas[item.id_subasta] = response.data.data[0].total_pujas;
            }

            setCantidadesPujas(pujas);
        };

        obtenerPujas();
    }, [data]);

    return (
        <div className="space-y-8">
            {data &&
                data.map((item) => (
                    <Card
                        key={item.id_subasta}
                        className="overflow-hidden border-border bg-card shadow-sm"
                    >
                        <CardContent className="p-0">
                            <div className="border-b border-border px-6 py-5">
                                <h2 className="text-center font-serif text-xl font-bold uppercase tracking-wide text-foreground">
                                    Subasta de {item.objeto.nombre}
                                </h2>
                            </div>

                            <div className="grid gap-6 p-6 lg:grid-cols-[minmax(280px,420px)_1fr] lg:items-center">
                                {/* Imagen */}
                                <div className="relative w-full aspect-[4/3] bg-muted/30 flex items-center justify-center overflow-hidden">
                                    {item.objeto?.imagen?.url ? (
                                        <img
                                            src={`${BASE_URL}/${item.objeto.imagen.url}`}
                                            alt={item.objeto.nombre}
                                            className="h-full w-full object-contain"
                                        />
                                    ) : (
                                        <div className="flex items-center justify-center text-muted-foreground">
                                            <ImageIcon className="h-12 w-12 opacity-60" />
                                        </div>
                                    )}
                                </div>

                                {/* Información */}
                                <div className="space-y-4">
                                    <div className="flex items-start gap-3 border-b border-border/70 pb-3">
                                        <MapPin className="mt-0.5 h-5 w-5 text-[color:var(--color-accent)]" />
                                        <div>
                                            <p className="text-sm font-bold uppercase tracking-wide text-foreground">
                                                Cantidad de Pujas
                                            </p>
                                            <p className="text-lg text-muted-foreground">
                                                {cantidadPujas[item.id_subasta] || 0}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex items-start gap-3 border-b border-border/70 pb-3">
                                        <Clock className="mt-0.5 h-5 w-5 text-[color:var(--color-accent)]" />
                                        <div>
                                            <p className="text-sm font-bold uppercase tracking-wide text-foreground">
                                                Fecha de Cierre:
                                            </p>
                                            <p className="text-lg text-muted-foreground">
                                            {new Date(item.fecha_cierre).toLocaleString("es-CR", {
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

                                    <div className="flex items-start gap-3 border-b border-border/70 pb-3">
                                        <Phone className="mt-0.5 h-5 w-5 text-[color:var(--color-accent)]" />
                                        <div>
                                            <p className="text-sm font-bold uppercase tracking-wide text-foreground">
                                                Estado de la Subasta:
                                            </p>
                                            <p className="text-lg text-muted-foreground">
                                                {item.estado.nombre}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex justify-center pt-2 lg:justify-start">
                                        <TooltipProvider>
                                            <Tooltip>
                                                <TooltipTrigger asChild>
                                                    <Link to={`/subasta/detail/${item.id_subasta}`}>
                                                        <Button
                                                            variant="link"
                                                            className="px-0 font-bold uppercase tracking-wide text-[color:var(--color-accent)]"
                                                        >
                                                            Ver Detalle
                                                            <Info className="ml-2 h-4 w-4" />
                                                        </Button>
                                                    </Link>
                                                </TooltipTrigger>
                                                <TooltipContent>Ver detalle de la subasta</TooltipContent>
                                            </Tooltip>
                                        </TooltipProvider>
                                    </div>
                                    
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                ))}
        </div>
    );
}