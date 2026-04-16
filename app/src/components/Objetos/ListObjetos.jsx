import { useEffect, useState } from "react";
import ObjetoService from "@/services/ObjetoService";
import { LoadingGrid } from "../ui/custom/LoadingGrid";
import { EmptyState } from "../ui/custom/EmptyState";
import { ErrorAlert } from "../ui/custom/ErrorAlert";
import CardsObjeto from "./CardsObjeto";
import { useParams } from "react-router-dom";

export function ListObjeto({ idShopRental = 1}) {
    const { idUsuario } = useParams();
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        const fetchData = async (idShopRental) => {
            try {
                const response = await ObjetoService.getObjetos();
                // Si la petición es exitosa, se guardan los datos
                console.log(response.data)
                setData(response.data);
                if(!response.data.success){
                    setError(response.data.message)
                }
            } catch (err) {
                // Si el error no es por cancelación, se registra
                if (err.name !== "AbortError") setError(err.message);
            } finally {
                // Independientemente del resultado, se actualiza el loading
                setLoading(false);
            }
        };
        fetchData(idShopRental)
    }, [idShopRental]);


    if (loading) return <LoadingGrid type="grid" />;
    if (error) return <ErrorAlert title="Error al cargar objetos" message={error} />;
    if (!data || data.data.length === 0)
        return <EmptyState message="No se encontraron objetos." />;

    return (
        <div className="mx-auto max-w-7xl p-6">
        {data && (
        <CardsObjeto data={data.data} isShopping idUsuario={idUsuario} />
        )}
        </div>
    );
}