import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import SubastaService from "@/services/SubastaService";
import { LoadingGrid } from "../ui/custom/LoadingGrid";
import { EmptyState } from "../ui/custom/EmptyState";
import { ErrorAlert } from "../ui/custom/ErrorAlert";
import CardsSubasta from "./CardsSubasta";

export default function ListSubasta() {
    const { tipo } = useParams();

    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                let response;

                if (tipo === "1") {
                    response = await SubastaService.getActivas();
                } 
                if (tipo === "2") {
                    response = await SubastaService.getInactivas();
                } 
                if (tipo === "3") {
                    response = await SubastaService.getSubastas();
                } 

                if (response.data.success) {
                    setData(response.data);
                } else {
                    setError(response.data.message);
                }

            } catch (err) {
                if (err.name !== "AbortError") setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [tipo]);

    if (loading) return <LoadingGrid type="grid" />;
    if (error) return <ErrorAlert title="Error al cargar subastas" message={error} />;
    if (!data || data.data.length === 0)
        return <EmptyState message="No se encontraron subastas." />;

    return (
        <div className="mx-auto max-w-7xl px-4 sm:px-6 py-8">
            <CardsSubasta data={data.data} />
        </div>
    );
}