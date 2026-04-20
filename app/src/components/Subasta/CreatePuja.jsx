import { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";

import { useUser } from "@/hooks/useUser";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import SubastaService from "@/services/SubastaService";
import PujasService from "@/services/PujasService";
import RealTimeService from "@/services/RealTimeService";

const BASE_URL = import.meta.env.VITE_BASE_URL + "uploads";

export default function CreatePuja() {
    const { id } = useParams();
    const navigate = useNavigate();
    const { user } = useUser();

    const [subasta, setSubasta] = useState(null);
    const [pujas, setPujas] = useState([]);
    const [tiempo, setTiempo] = useState("");
    const [eraLider, setEraLider] = useState(false);

    const { control, handleSubmit, reset } = useForm({
        defaultValues: { monto: "" },
    });

    // 🔹 Cargar subasta
    const cargarSubasta = async () => {
        try {
            const res = await SubastaService.getSubastaById(id);
            setSubasta(res.data?.data || null);
        } catch (error) {
            console.error(error);
            setSubasta(null);
        }
    };

    // 🔹 Cargar pujas
    const fetchPujas = async () => {
        try {
            const response = await PujasService.getPujasPorSubasta(id);
            const items = response.data?.data?.items;
            setPujas(Array.isArray(items) ? items : []);
        } catch (error) {
            console.error(error);
            setPujas([]);
        }
    };

    // ✅ CARGA INICIAL
    useEffect(() => {
        cargarSubasta();
        fetchPujas();
    }, [id]);

    // 🔹 Inicializar si soy líder
    useEffect(() => {
        if (!subasta || !user) return;

        const liderActual = subasta?.puja_ganadora?.usuario?.id_usuario;
        setEraLider(liderActual === user.id_usuario);

    }, [subasta, user]);

    // 🔹 Contador de tiempo
    useEffect(() => {
        if (!subasta) return;

        const interval = setInterval(() => {
            const ahora = new Date();
            const cierre = new Date(subasta.fecha_cierre.replace(" ", "T"));
            const diff = cierre - ahora;

            if (diff <= 0) {
                setTiempo("Finalizada");
                clearInterval(interval);
                return;
            }

            const h = Math.floor(diff / 3600000);
            const m = Math.floor((diff % 3600000) / 60000);
            const s = Math.floor((diff % 60000) / 1000);

            setTiempo(`${h}h ${m}m ${s}s`);
        }, 1000);

        return () => clearInterval(interval);
    }, [subasta]);

    // 🔹 Tiempo real
    useEffect(() => {
        const channel = RealTimeService.subscribe(`subasta-${id}`);

        const onPujaRegistrada = (data) => {
            const nuevaSubasta = data?.subasta;

            if (nuevaSubasta) {
                const liderActual = nuevaSubasta?.puja_ganadora?.usuario?.id_usuario;
                const yo = user?.id_usuario;

                const ahoraSoyLider = liderActual === yo;

                // 🔥 Notificación si pierde liderazgo
                if (eraLider && !ahoraSoyLider) {
                    toast("Puja ha sido superada", { icon: "⚠️" });
                }

                setEraLider(ahoraSoyLider);
                setSubasta(nuevaSubasta);
            }

            const items = data?.pujas?.items;
            if (Array.isArray(items)) {
                setPujas(items);
            }
        };

        const onSubastaFinalizada = (data) => {
                if (data?.subasta) {
                    setSubasta(data.subasta);
                } else {
                    cargarSubasta();
                }

                toast("Subasta finalizada");
            };

        channel.bind("puja-registrada", onPujaRegistrada);
        channel.bind("subasta-finalizada", onSubastaFinalizada);

        return () => {
            channel.unbind("puja-registrada", onPujaRegistrada);
            channel.unbind("subasta-finalizada", onSubastaFinalizada);
            RealTimeService.unsubscribe(`subasta-${id}`);
        };
    }, [id, eraLider, user]);

    // 🔹 Formateo fecha
    const formatearFechaHora = (fecha) => {
        if (!fecha) return "Sin fecha";

        const f = new Date(fecha.replace(" ", "T"));

        return f.toLocaleString("es-CR", {
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
        });
    };

    // 🔹 Registrar puja
    const onSubmit = async (data) => {
        if (!user) {
            toast.error("Debe iniciar sesión");
            return;
        }

        try {
            const payload = {
                id_subasta: Number(id),
                id_usuario: Number(user.id_usuario),
                monto: Number(data.monto),
            };

            const response = await PujasService.RegistrarPuja(payload);
            const result = response.data?.data;

            if (!result?.success) {
                toast.error(result?.message || "No se pudo registrar la puja");
                return;
            }

            toast.success(result?.message || "Puja realizada");
            reset();

        } catch (err) {
            console.error("Error real:", err);

            toast.error(
                err?.response?.data?.message ||
                "Error al registrar la puja"
            );
        }
    };


    if (!subasta) return <p className="text-center mt-10">Cargando...</p>;

    return (
        <div className="max-w-7xl mx-auto p-6 grid grid-cols-1 xl:grid-cols-3 gap-6">
            <div className="xl:col-span-2 space-y-6">

                <Card className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="w-full h-[300px] bg-gray-100 rounded-lg overflow-hidden">
                        <img
                            src={
                                subasta.objeto?.imagen?.url
                                    ? `${BASE_URL}/${subasta.objeto.imagen.url}`
                                    : "/placeholder.jpg"
                            }
                            alt="objeto"
                            className="w-full h-full object-cover"
                        />
                    </div>

                    <div className="space-y-3">
                        <h2 className="text-2xl font-bold">{subasta.objeto?.nombre}</h2>
                        <p><b>Descripción:</b> {subasta.objeto?.descripcion}</p>
                        <p><b>Condición:</b> {subasta.objeto?.condicion?.nombre}</p>
                        <p><b>Vendedor:</b> {subasta.vendedor?.nombre}</p>
                        <p className="text-orange-600 font-semibold">
                            Tiempo restante: {tiempo}
                        </p>
                    </div>
                </Card>

                <Card className="p-6 space-y-4">
                    <h2 className="text-xl font-bold">Historial de pujas</h2>

                    {!Array.isArray(pujas) || pujas.length === 0 ? (
                        <p className="text-sm text-gray-500">No hay pujas todavía.</p>
                    ) : (
                        <div className="space-y-3">
                            {pujas.map((puja) => (
                                <div
                                    key={puja.id_puja}
                                    className="border rounded-lg p-4 flex flex-col md:flex-row md:items-center md:justify-between gap-2"
                                >
                                    <div>
                                        <p className="font-semibold">
                                            {puja.usuario?.nombre || "Usuario desconocido"}
                                        </p>
                                        <p className="text-sm text-gray-500">
                                            {formatearFechaHora(puja.fecha_hora)}
                                        </p>
                                    </div>

                                    <div className="text-right">
                                        <p className="font-bold text-green-600">
                                            ₡{Number(puja.monto).toLocaleString("es-CR")}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </Card>

            </div>

            <div className="space-y-6">

                <Card className="p-6 space-y-3">
                    <h2 className="text-xl font-bold">Subasta</h2>
                    <p><b>Precio base:</b> ₡{Number(subasta.precio_base).toLocaleString("es-CR")}</p>
                    <p><b>Incremento mínimo:</b> ₡{Number(subasta.incremento_minimo).toLocaleString("es-CR")}</p>

                    <p className="text-green-600 font-semibold">
                        Puja más alta actual: ₡
                        {Number(subasta.puja_ganadora?.monto || 0).toLocaleString("es-CR")}
                    </p>

                    <p>
                        <b>Usuario líder:</b>{" "}
                        {subasta.puja_ganadora?.usuario?.nombre || "Sin líder todavía"}
                    </p>

                    <p><b>Estado:</b> {subasta.estado?.nombre}</p>
                </Card>

                <Card className="p-6 space-y-4">
                    <h2 className="text-xl font-bold">Nueva Puja</h2>

                    {!user ? (
                        <p>Debe iniciar sesión</p>
                    ) : subasta.estado?.id_estado_subasta == 3 ? (
                        <p className="text-red-500">Subasta finalizada</p>
                    ) : (
                        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="monto">Monto</Label>
                                <Controller
                                    name="monto"
                                    control={control}
                                    render={({ field }) => (
                                        <Input
                                            id="monto"
                                            {...field}
                                            type="number"
                                            placeholder="Ingrese monto"
                                        />
                                    )}
                                />
                            </div>

                            <Button className="w-full">Realizar Puja</Button>
                        </form>
                    )}
                </Card>

            </div>
        </div>
    );
}