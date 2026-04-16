import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import toast from "react-hot-toast";
import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
    TooltipProvider,
} from "@/components/ui/tooltip";
import { Clock, Info, Pencil, ImageIcon, Plus, Trash } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import SubastaService from "../../services/SubastaService";
import ObjetoService from "@/services/ObjetoService";
import { useEffect, useState } from "react";

CardsObjeto.propTypes = {
    data: PropTypes.array,
    idUsuario: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

export default function CardsObjeto({ data, idUsuario }) {
    const BASE_URL = import.meta.env.VITE_BASE_URL + "uploads";
    const navigate = useNavigate();
    const [objetos, setObjetos] = useState([]);

    useEffect(() => {
        setObjetos(Array.isArray(data) ? data : []);
    }, [data]);

    const ToggleEstado = async (objeto) => {
        try {
            const response = await ObjetoService.deleteObjeto(objeto);

            if (response.data?.success) {
                const estabaActivo = objeto.estado?.id_estado_objeto == 1;

                toast.success(
                    estabaActivo
                        ? "Objeto desactivado correctamente"
                        : "Objeto activado correctamente",
                    { duration: 5000 }
                );

                setObjetos((prev) =>
                    prev.map((item) =>
                        item.id_objeto === objeto.id_objeto
                            ? {
                                    ...item,
                                    estado: {
                                        ...item.estado,
                                        id_estado_objeto: estabaActivo ? 2 : 1,
                                        nombre: estabaActivo ? "Inactivo" : "Activo",
                                    },
                                }
                            : item
                    )
                );
            } else {
                toast.error(response.data?.message || "No se pudo actualizar el estado");
            }
        } catch (err) {
            console.error(err);
            toast.error("Ocurrió un error al cambiar el estado del objeto");
        }
    };

    return (
        <div className="grid gap-6 p-4 sm:grid-cols-2 lg:grid-cols-3">
            <div className="w-full h-full flex items-center justify-center min-h-[400px]">
                <Link
                    to={`/objeto/create/${idUsuario}`}
                    className="cursor-pointer flex flex-col items-center justify-center
                    w-48 h-48 rounded-2xl border
                    hover:bg-accent hover:text-white
                    transition-all shadow-md"
                >
                    <Plus className="w-10 h-10 mb-2" />
                    <span className="font-semibold">Agregar</span>
                </Link>
            </div>
            {objetos.map((item) => (
                <Card
                    key={item.id_objeto}
                    className="flex flex-col overflow-hidden border-border bg-card shadow-md hover:shadow-lg transition"
                >
                    <CardHeader className="text-center border-b border-border bg-muted/20">
                        <CardTitle className="text-lg font-serif font-semibold text-foreground">
                            {item.nombre}
                        </CardTitle>
                    </CardHeader>

                    <div className="relative w-full aspect-[4/3] bg-muted/30 flex items-center justify-center overflow-hidden">
                        {item.imagen?.url ? (
                            <img
                                src={`${BASE_URL}/${item.imagen.url}`}
                                alt={item.nombre}
                                className="max-h-full max-w-full object-contain"
                            />
                        ) : (
                            <div className="flex items-center justify-center text-muted-foreground">
                                <ImageIcon className="h-10 w-10 opacity-60" />
                            </div>
                        )}
                    </div>

                    <CardContent className="flex-1 space-y-3 pt-4">
                        <p className="flex items-center gap-2 text-sm text-muted-foreground">
                            <Clock className="h-4 w-4 text-[color:var(--color-accent)]" />
                            {item.condicion?.nombre}
                        </p>

                        <p className="text-sm text-muted-foreground">
                            Estado:{" "}
                            <span className="text-foreground font-medium">
                                {item.estado?.nombre}
                            </span>
                        </p>
                    </CardContent>

                    <div className="flex justify-end gap-2 border-t border-border p-3">
                        <TooltipProvider>
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <Button asChild size="icon" variant="outline" className="size-8">
                                        <Link to={`/objetos/detail/${item.id_objeto}`}>
                                            <Info className="h-4 w-4" />
                                        </Link>
                                    </Button>
                                </TooltipTrigger>
                                <TooltipContent>Ver detalle</TooltipContent>
                            </Tooltip>
                        </TooltipProvider>

                        <TooltipProvider>
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <Button
                            size="icon"
                            className="size-8 bg-[color:var(--color-primary)] text-primary-foreground hover:opacity-90"
                            onClick={async () => {
                                try {
                                    if (item.estado?.id_estado_objeto != 1) {
                                        toast.error("El objeto no está activo, no se puede editar");
                                        return;
                                    }

                                const response = await SubastaService.getSubastaByObjeto(item.id_objeto);
                                const subasta = response.data?.data?.data;

                                if (subasta?.estado?.id_estado_subasta == 2) {
                                    toast.error("El objeto ya se encuentra en una subasta activa");
                                    return;
                                }

                                    navigate(`/objetos/edit/${item.id_objeto}`);
                                } catch (error) {
                                    console.error(error);
                                    toast.error("No se pudo validar la subasta del objeto");
                                }
                            }}
                        >
                            <Pencil className="h-4 w-4" />
                        </Button>
                                </TooltipTrigger>
                                <TooltipContent>Editar Objeto</TooltipContent>
                            </Tooltip>
                        </TooltipProvider>

                        <TooltipProvider>
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        onClick={() => ToggleEstado(item)}
                                    >
                                        <Trash
                                            className={`h-4 w-4 ${
                                                item.estado?.id_estado_objeto == 1
                                                    ? "text-destructive"
                                                    : "text-green-600"
                                            }`}
                                        />
                                    </Button>
                                </TooltipTrigger>
                                <TooltipContent>
                                    {item.estado?.id_estado_objeto == 1 ? "Desactivar" : "Activar"}
                                </TooltipContent>
                            </Tooltip>
                        </TooltipProvider>
                        
                    </div>
                </Card>
            ))}

            <div className="w-full h-full flex items-center justify-center min-h-[400px]">
                <Link
                    to={`/objeto/create/${idUsuario}`}
                    className="cursor-pointer flex flex-col items-center justify-center
                    w-48 h-48 rounded-2xl border
                    hover:bg-accent hover:text-white
                    transition-all shadow-md"
                >
                    <Plus className="w-10 h-10 mb-2" />
                    <span className="font-semibold">Agregar</span>
                </Link>
            </div>
        </div>
    );
}
