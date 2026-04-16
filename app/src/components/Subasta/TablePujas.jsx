import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
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
import { Edit, Plus, Trash2, ArrowLeft, Info } from "lucide-react";
import PujasService from "@/services/PujasService";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { LoadingGrid } from "../ui/custom/LoadingGrid";
import { ErrorAlert } from "../ui/custom/ErrorAlert";
import { EmptyState } from "../ui/custom/EmptyState";

// Headers de la tabla
//map = foreach

const pujasColumns = [

    { key: "usuario", label: "Realizado Por: " },
    { key: "oferta", label: "Oferta: " },
    { key: "fecha", label: "Fecha realizada:" },
];

export default function TablePujas() {
    const [pujas, setPujas] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const { id } = useParams();
    const navigate = useNavigate();
    useEffect(() => {
        const fetchData = async () => {
        try {
            const response = await PujasService.getPujasPorSubasta(id);
            console.log(response);
            const result = response.data;
            console.log(result);

            if (result.success) {
            setPujas(result.data || []);
            } else {
            setError(result.message || "Error desconocido");
            }
        } catch (err) {
            setError(err.message || "Error al conectar con el servidor");
        } finally {
            setLoading(false);
        }
        };
        fetchData();
    }, []);

    if (loading) return <LoadingGrid type="grid" />;
    if (error) return <ErrorAlert title="Error al cargar Pujas." message={error} />;
    if (pujas.length === 0) return <EmptyState message="No se encontraron Pujas." />;

    return (
        <div className="container mx-auto py-8">
        <div className="flex items-center justify-between mb-6">
            
        </div>

        <div className="rounded-md border">
            <Table>
            <TableHeader className="bg-primary/50">
                <TableRow>
                {pujasColumns.map((col) => (
                    <TableHead key={col.key} className="text-left font-semibold">
                    {col.label}
                    </TableHead>
                ))}
                </TableRow>
            </TableHeader>

            <TableBody>
                {pujas.map((puja) => (
                    <TableRow key={puja.id_puja}>
                    <TableCell className="font-medium">
                        {puja.usuario?.nombre} {puja.usuario?.apellido1} {puja.usuario?.apellido2}
                    </TableCell>

                    <TableCell>{puja.monto}</TableCell>

                    <TableCell>
                        {new Date(puja.fecha_hora).toLocaleString("es-CR", {
                                                day: "2-digit",
                                                month: "2-digit",
                                                year: "numeric",
                                                hour: "2-digit",
                                                minute: "2-digit",
                                                hour12: true
                                            })}

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