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
import { Edit, Plus, Trash2, ArrowLeft, Info, Power } from "lucide-react";
import UsuarioService from "@/services/UsuarioService";
import { useEffect, useState } from "react";
import { LoadingGrid } from "../ui/custom/LoadingGrid";
import { ErrorAlert } from "../ui/custom/ErrorAlert";
import { EmptyState } from "../ui/custom/EmptyState";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
// Headers de la tabla
//map = foreach
const usuarioColumns = [

    { key: "nombre", label: "Nombre Completo" },
    { key: "rol", label: "Rol" },
    { key: "estado", label: "Estado" },
    { key: "opciones", label: "Opciones" },
];

export default function TableUsuarios() {
    const [usuarios, setUsuarios] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    // Para actualizar la tabla //
    const fetchUsuarios = async () => {
    try {
        setLoading(true);
        setError(null);

        const response = await UsuarioService.getUsuarios();
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
    fetchUsuarios();
        }, []);

        const ToggleEstado = async (user) => {
            try {
            const response = await UsuarioService.deleteUsuario(user);

            if (response.data?.success) {
                const estabaActivo = user.estado?.id_estado_usuario == 1;

                toast.success(
                estabaActivo
                    ? "Usuario desactivado correctamente"
                    : "Usuario activado correctamente",
                { duration: 4000 }
                );

                await fetchUsuarios();
            } else {
                toast.error(response.data?.message || "No se pudo actualizar el estado");
            }
            } catch (err) {
            console.error(err);
            toast.error("Ocurrió un error al cambiar el estado del usuario");
            }
        };



    if (loading) return <LoadingGrid type="grid" />;
    if (error) return <ErrorAlert title="Error al cargar usuarios." message={error} />;
    if (usuarios.length === 0) return <EmptyState message="No se encontraron usuarios." />;

    return (
        <div className="container mx-auto py-8">
        <div className="flex items-center justify-between mb-6">
            <h1 className="text-3xl font-bold tracking-tight">Listado de Usuarios.</h1>

            <TooltipProvider>
            <Tooltip>
                <TooltipTrigger asChild>
                <Button asChild variant="outline" size="icon" className="text-primary">
                    <Link to="">
                    <Plus className="h-4 w-4" />
                    </Link>
                </Button>
                </TooltipTrigger>
                <TooltipContent>Añadir usuario</TooltipContent>
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
                <TableRow key={user.id_usuario}>
                    <TableCell className="font-medium">
                    {user.nombre} {user.nombre2} {user.apellido1} {user.apellido2}
                    </TableCell>
                    <TableCell>{user.rol.nombre}</TableCell>
                    <TableCell>{user.estado.nombre}</TableCell>

                    <TableCell className="flex justify-start items-center gap-1">
                    <TooltipProvider>
                        <Tooltip>
                        <TooltipTrigger asChild>
                            <Button asChild variant="ghost" size="icon">
                            <Link to={`/usuarios/detail/${user.id_usuario}`}>
                                <Info className="h-4 w-4 text-destructive" />
                            </Link>
                            </Button>
                        </TooltipTrigger>
                        <TooltipContent>Detalle</TooltipContent>
                        </Tooltip>
                    </TooltipProvider>

                    <TooltipProvider>
                        <Tooltip>
                        <TooltipTrigger asChild>
                            <Button asChild variant="ghost" size="icon">
                            <Link to={`/usuarios/edit/${user.id_usuario}`}>
                                <Edit className="h-4 w-4 text-destructive" />
                            </Link>
                            </Button>
                        </TooltipTrigger>
                        <TooltipContent>Actualizar</TooltipContent>
                        </Tooltip>
                    </TooltipProvider>

                    <TooltipProvider>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => ToggleEstado(user)}
                            >
                            <Power
                                className={`h-4 w-4 ${
                                user.estado?.id_estado_usuario == 1
                                    ? "text-destructive"
                                    : "text-green-600"
                                }`}
                            />
                            </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                            {user.estado?.id_estado_usuario == 1 ? "Desactivar" : "Activar"}
                        </TooltipContent>
                        </Tooltip>
                    </TooltipProvider>


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