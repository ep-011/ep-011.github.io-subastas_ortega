import { Link } from "react-router-dom";
import {
    Table,
    TableHeader,
    TableBody,
    TableRow,
    TableHead,
    TableCell,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";
import { Edit, Plus, Trash2, ArrowLeft, Info, ArrowUp } from "lucide-react";
import UsuarioService from "@/services/UsuarioService";
import { useEffect, useState } from "react";
import { LoadingGrid } from "../ui/custom/LoadingGrid";
import { ErrorAlert } from "../ui/custom/ErrorAlert";
import { EmptyState } from "../ui/custom/EmptyState";
import { useNavigate, useParams } from "react-router-dom";
import SubastaService from "@/services/SubastaService";
import toast from "react-hot-toast";
// Headers de la tabla
//map = foreach
const usuarioColumns = [

    { key: "subasta", label: "Código" },
    { key: "objeto", label: "Objeto" },
    { key: "estado", label: "Estado" },
    { key: "opciones", label: "Opciones" },
];

export default function TableUsuarios() {
    const { id } = useParams();
    const [usuarios, setUsuarios] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    const fetchSubastas = async () => {
        try {
            const response = await SubastaService.getMisSubastas(id);
            const result = response.data;

            if (result.success) {
                setUsuarios(result.data || []);
            } else {
                setError(result.message || "Error desconocido");
            }
        } catch (err) {
            setError(err.message || "Error al conectar con el servidor");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchSubastas();
    }, [id]);

    const ToggleEstadoSubasta = async (user) => {
        try {
            const pujasResponse = await SubastaService.getCantidadPujas(user.id_subasta);
            const subastaResponse = await SubastaService.getSubastaById(user.id_subasta);

            const totalPujas = Number(pujasResponse?.data?.data?.[0]?.total_pujas || 0);
            const subasta = subastaResponse?.data?.data;

            if (!subasta) {
                toast.error("No se pudo obtener la información de la subasta");
                return;
            }

            const ahora = new Date();
            const fechaInicio = new Date(subasta.fecha_inicio);

            if (ahora >= fechaInicio) {
                toast.error("La subasta ya inició, no se puede cancelar");
                return;
            }

            if (totalPujas > 0) {
                toast.error("La subasta ya tiene pujas registradas, no se puede cancelar");
                return;
            }

            const response = await SubastaService.deleteSubasta(subasta);

            if (response.data?.success) {
                toast.success("Subasta cancelada correctamente", {
                    duration: 4000,
                });

                await fetchSubastas();
            } else {
                toast.error(response.data?.message || "No se pudo cancelar la subasta");
            }
        } catch (error) {
            console.error(error);
            toast.error("No se pudo validar la subasta");
        }
    };

    const PublicarSubasta = async (user) => {
    try {
        const pujasResponse = await SubastaService.getCantidadPujas(user.id_subasta);
        const subastaResponse = await SubastaService.getSubastaById(user.id_subasta);

        const totalPujas = Number(pujasResponse?.data?.data?.[0]?.total_pujas || 0);
        const subasta = subastaResponse?.data?.data;

        if (!subasta) {
            toast.error("No se pudo obtener la información de la subasta");
            return;
        }

        const ahora = new Date();
        const fechaInicio = new Date(subasta.fecha_inicio);
        const estadoSubasta = Number(subasta?.estado?.id_estado_subasta);

        if (estadoSubasta !== 1) {
            toast.error("La subasta no está en estado válido para publicar");
            return;
        }

        if (ahora >= fechaInicio) {
            toast.error("La fecha de inicio ya pasó, no se puede publicar");
            return;
        }

        if (totalPujas > 0) {
            toast.error("La subasta ya tiene pujas, no se puede publicar");
            return;
        }

        const response = await SubastaService.publicarSubasta(subasta);

        if (response.data?.success) {
            toast.success("Subasta publicada correctamente", {
                duration: 4000,
            });

            await fetchSubastas();
        } else {
            toast.error(response.data?.message || "No se pudo publicar la subasta");
        }
    } catch (error) {
        console.error(error);
        toast.error("Error al publicar la subasta");
    }
};

    if (loading) return <LoadingGrid type="grid" />;
    if (error) return <ErrorAlert title="Error al cargar subastas." message={error} />;
    if (usuarios.length === 0) return <EmptyState message="No se encontraron subastas." />;

    return (
        <div className="container mx-auto py-8">
            <div className="flex items-center justify-between mb-6">
                <h1 className="text-3xl font-bold tracking-tight">Listado de Subastas.</h1>

                <TooltipProvider>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Button asChild variant="outline" size="icon" className="text-primary">
                                <Link to={`/subasta/create/${id}`}>
                                    <Plus className="h-4 w-4" />
                                </Link>
                            </Button>
                        </TooltipTrigger>
                        <TooltipContent>Añadir Subasta</TooltipContent>
                    </Tooltip>
                </TooltipProvider>
            </div>

            <div className="rounded-md border">
                <Table>
                    <TableHeader className="bg-primary/50">
                        <TableRow>
                            {usuarioColumns.map((col) => (
                                <TableHead key={col.key} className="text-left font-semibold">
                                    {col.label}
                                </TableHead>
                            ))}
                        </TableRow>
                    </TableHeader>

                    <TableBody>
                        {usuarios.map((user) => (
                            <TableRow key={user.id_subasta}>
                                <TableCell className="font-medium">
                                    Subasta #{user.id_subasta}
                                </TableCell>
                                <TableCell>{user.objeto.nombre}</TableCell>
                                <TableCell>{user.estado.nombre}</TableCell>

                                <TableCell className="w-0">
                                    <div className="flex w-fit items-center gap-3 whitespace-nowrap">

                                        {/* Detalle */}
                                        <TooltipProvider>
                                            <Tooltip>
                                                <TooltipTrigger asChild>
                                                    <Button asChild variant="ghost" size="icon">
                                                        <Link to={`/subasta/detail/${user.id_subasta}`}>
                                                            <Info className="h-4 w-4 text-destructive" />
                                                        </Link>
                                                    </Button>
                                                </TooltipTrigger>
                                                <TooltipContent>Detalle</TooltipContent>
                                            </Tooltip>
                                        </TooltipProvider>

                                        {/* Editar */}
                                        <TooltipProvider>
                                            <Tooltip>
                                                <TooltipTrigger asChild>
                                                    <Button
                                                        variant="ghost"
                                                        size="icon"
                                                        onClick={async () => {
                                                            try {
                                                                const [pujasResponse, subastaResponse] = await Promise.all([
                                                                    SubastaService.getCantidadPujas(user.id_subasta),
                                                                    SubastaService.getSubastaById(user.id_subasta),
                                                                ]);

                                                                const totalPujas = Number(pujasResponse?.data?.data?.[0]?.total_pujas || 0);
                                                                const subasta = subastaResponse?.data?.data;

                                                                if (!subasta) {
                                                                    toast.error("No se pudo obtener la subasta");
                                                                    return;
                                                                }

                                                                const ahora = new Date();
                                                                const fechaInicio = new Date(subasta.fecha_inicio);
                                                                const fechaCierre = new Date(subasta.fecha_cierre);
                                                                const estadoSubasta = Number(subasta?.estado?.id_estado_subasta);

                                                                if (estadoSubasta === 3 || ahora > fechaCierre) {
                                                                    toast.error("La subasta ya finalizó, no se puede editar");
                                                                    return;
                                                                }

                                                                if (ahora >= fechaInicio) {
                                                                    toast.error("La subasta ya inició, no se puede editar");
                                                                    return;
                                                                }

                                                                if (totalPujas > 0) {
                                                                    toast.error("La subasta ya tiene pujas, no se puede editar");
                                                                    return;
                                                                }

                                                                navigate(`/subasta/update/${user.id_subasta}`);
                                                            } catch (error) {
                                                                console.error(error);
                                                                toast.error("No se pudo validar la subasta");
                                                            }
                                                        }}
                                                    >
                                                        <Edit className="h-4 w-4 text-primary" />
                                                    </Button>
                                                </TooltipTrigger>
                                                <TooltipContent>Actualizar</TooltipContent>
                                            </Tooltip>
                                        </TooltipProvider>

                                        {/* Cancelar */}
                                        <TooltipProvider>
                                            <Tooltip>
                                                <TooltipTrigger asChild>
                                                    <Button
                                                        variant="ghost"
                                                        size="icon"
                                                        onClick={() => ToggleEstadoSubasta(user)}
                                                    >
                                                        <Trash2 className="h-4 w-4 text-destructive" />
                                                    </Button>
                                                </TooltipTrigger>
                                                <TooltipContent>Cancelar</TooltipContent>
                                            </Tooltip>
                                        </TooltipProvider>

                                        {user.estado.id_estado_subasta == 1 && (
                                            <TooltipProvider>
                                                <Tooltip>
                                                    <TooltipTrigger asChild>
                                                        <Button
                                                            size="sm"
                                                            className="ml-1 flex items-center gap-2 bg-accent text-white hover:bg-accent/90"
                                                            onClick={() => PublicarSubasta(user)}
                                                        >
                                                            <ArrowUp className="w-4 h-4" />
                                                            Publicar
                                                        </Button>
                                                    </TooltipTrigger>
                                                    <TooltipContent>Publicar subasta</TooltipContent>
                                                </Tooltip>
                                            </TooltipProvider>
                                        )}


                                    </div>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>

            <Button
                type="button"
                className="flex items-center gap-2 bg-accent text-white hover:bg-accent/90 mt-6"
                onClick={() => navigate(-1)}
            >
                <ArrowLeft className="w-4 h-4" />
                Regresar
            </Button>
        </div>
    );
}