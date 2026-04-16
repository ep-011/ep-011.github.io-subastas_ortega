import { useEffect, useState } from "react";
import { useForm, Controller, useWatch } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import { format } from "date-fns";
import { es } from "date-fns/locale";

// shadcn/ui
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

// icons
import { Save, ArrowLeft, CalendarIcon } from "lucide-react";

// servicios
import ObjetoService from "../../services/ObjetoService";
import SubastaService from "../../services/SubastaService";

export function CreateSubasta() {
    const navigate = useNavigate();
    const { id } = useParams();

    const [dataObjetos, setDataObjetos] = useState([]);
    const [error, setError] = useState("");

    const subastaSchema = yup.object({
        fecha_inicio: yup
            .date()
            .typeError("Se requiere una fecha de inicio válida")
            .required("Se requiere una fecha de inicio"),

        fecha_cierre: yup
            .date()
            .typeError("Se requiere una fecha de cierre válida")
            .required("Se requiere una fecha de cierre")
            .test(
                "fecha-cierre-mayor",
                "La fecha de cierre debe ser mayor a la fecha de inicio",
                function (value) {
                    const { fecha_inicio } = this.parent;
                    if (!fecha_inicio || !value) return true;
                    return new Date(value) > new Date(fecha_inicio);
                }
            ),

        precio_base: yup
            .number()
            .typeError("Ingrese un precio base válido")
            .required("Se requiere un precio base")
            .moreThan(0, "El precio base debe ser mayor a 0"),

        incremento_minimo: yup
            .number()
            .typeError("Ingrese un incremento mínimo válido")
            .required("Se requiere un incremento mínimo")
            .moreThan(0, "El incremento mínimo debe ser mayor a 0"),

        id_objeto: yup
            .number()
            .typeError("Seleccione un objeto")
            .required("Se requiere un objeto"),
    });

    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm({
        defaultValues: {
            fecha_inicio: null,
            fecha_cierre: null,
            precio_base: "",
            incremento_minimo: "",
            id_objeto: "",
        },
        resolver: yupResolver(subastaSchema),
    });

    const fechaInicio = useWatch({
        control,
        name: "fecha_inicio",
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const objetosRes = await ObjetoService.getObjetos();
                setDataObjetos(objetosRes.data.data || []);
            } catch (error) {
                console.log(error);
                if (error.name !== "AbortError") setError(error.message);
            }
        };

        fetchData();
    }, []);

    const formatoFecha = (date) => {
        if (!date) return null;

        const localDate = new Date(date);
        localDate.setHours(8, 0, 0, 0);

        const year = localDate.getFullYear();
        const month = String(localDate.getMonth() + 1).padStart(2, "0");
        const day = String(localDate.getDate()).padStart(2, "0");
        const hours = String(localDate.getHours()).padStart(2, "0");
        const minutes = String(localDate.getMinutes()).padStart(2, "0");
        const seconds = String(localDate.getSeconds()).padStart(2, "0");

        return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
    };

   const onSubmit = async (dataForm) => {
    try {
        const payload = {
            ...dataForm,
            id_vendedor: Number(id),
            id_objeto: Number(dataForm.id_objeto),
            precio_base: Number(dataForm.precio_base),
            incremento_minimo: Number(dataForm.incremento_minimo),
            fecha_inicio: formatoFecha(dataForm.fecha_inicio),
            fecha_cierre: formatoFecha(dataForm.fecha_cierre),
        };

        const objetoSeleccionado = dataObjetos.find(
            (item) => item.id_objeto == payload.id_objeto
        );

        if (objetoSeleccionado?.estado?.id_estado_objeto != 1) {
            toast.error("El objeto no está activo, no se puede usar en una subasta");
            return;
        }

        const subastaResponse = await SubastaService.getSubastaByObjeto(payload.id_objeto);
        const subasta = subastaResponse.data?.data?.data;

        if (subasta?.estado?.id_estado_subasta == 2) {
            toast.error("El objeto ya se encuentra en una subasta activa");
            return;
        }

        const response = await SubastaService.createSubasta(payload);

        if (response.data) {
            toast.success(`Subasta #${response.data.data.id_subasta} creada`, {
                duration: 5000,
            });
            navigate(`/subasta/misubasta/${id}`);
        } else if (response.error) {
            setError(response.error);
        }
    } catch (err) {
        console.error("ERROR COMPLETO:", err);
        console.error("STATUS:", err?.response?.status);
        console.error("RESPUESTA BACKEND:", err?.response?.data);
        console.error("MENSAJE BACKEND:", err?.response?.data?.message);
    }
};

    if (error) return <p className="text-red-600">{error}</p>;

    return (
        <Card className="p-6 max-w-5xl mx-auto">
            <h2 className="text-2xl font-bold mb-6">Crear Subasta</h2>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">

                {/* Objeto */}
                <div>
                    <Label className="block mb-1 text-sm font-medium">Objeto</Label>
                    <Controller
                        name="id_objeto"
                        control={control}
                        render={({ field }) => (
                            <Select
                                value={field.value ? String(field.value) : ""}
                                onValueChange={(value) => field.onChange(value)}
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Seleccione un objeto" />
                                </SelectTrigger>
                                <SelectContent>
                                    {dataObjetos.map((objeto) => (
                                        <SelectItem
                                            key={objeto.id_objeto}
                                            value={objeto.id_objeto}
                                        >
                                            {objeto.nombre}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        )}
                    />
                    {errors.id_objeto && (
                        <p className="text-sm text-red-500">{errors.id_objeto.message}</p>
                    )}
                </div>

<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
    <div>
        {/* Fecha inicio */}
                <div>
                    <Label className="block mb-1 text-sm font-medium">Fecha de inicio</Label>
                    <Controller
                        name="fecha_inicio"
                        control={control}
                        render={({ field }) => (
                            <Popover>
                                <PopoverTrigger asChild>
                                    <Button
                                        type="button"
                                        variant="outline"
                                        className="w-full justify-start text-left font-normal"
                                    >
                                        <CalendarIcon className="mr-2 h-4 w-4" />
                                        {field.value
                                            ? format(field.value, "PPP", { locale: es })
                                            : "Seleccione una fecha"}
                                    </Button>
                                </PopoverTrigger>
                                <PopoverContent className="w-auto p-0" align="start">
                                    <Calendar
                                        mode="single"
                                        selected={field.value}
                                        onSelect={field.onChange}
                                        disabled={(date) => {
                                            const today = new Date();
                                            today.setHours(0, 0, 0, 0);
                                            return date < today;
                                        }}
                                        initialFocus
                                    />
                                </PopoverContent>
                            </Popover>
                        )}
                    />
                    {errors.fecha_inicio && (
                        <p className="text-sm text-red-500">{errors.fecha_inicio.message}</p>
                    )}
                </div>
    </div>
    <div>
        {/* Fecha cierre */}
                <div>
                    <Label className="block mb-1 text-sm font-medium">Fecha de cierre</Label>
                    <Controller
                        name="fecha_cierre"
                        control={control}
                        render={({ field }) => (
                            <Popover>
                                <PopoverTrigger asChild>
                                    <Button
                                        type="button"
                                        variant="outline"
                                        className="w-full justify-start text-left font-normal"
                                    >
                                        <CalendarIcon className="mr-2 h-4 w-4" />
                                        {field.value
                                            ? format(field.value, "PPP", { locale: es })
                                            : "Seleccione una fecha"}
                                    </Button>
                                </PopoverTrigger>
                                <PopoverContent className="w-auto p-0" align="start">
                                    <Calendar
                                        mode="single"
                                        selected={field.value}
                                        onSelect={field.onChange}
                                        disabled={(date) => {
                                            const today = new Date();
                                            today.setHours(0, 0, 0, 0);

                                            if (!fechaInicio) return date < today;

                                            const fechaMinima = new Date(fechaInicio);
                                            fechaMinima.setHours(0, 0, 0, 0);

                                            return date <= fechaMinima;
                                        }}
                                        initialFocus
                                    />
                                </PopoverContent>
                            </Popover>
                        )}
                    />
                    {errors.fecha_cierre && (
                        <p className="text-sm text-red-500">{errors.fecha_cierre.message}</p>
                    )}
                </div>
            </div>
        </div>

                {/* Precio base */}
                <div>
                    <Label className="block mb-1 text-sm font-medium" htmlFor="precio_base">
                        Precio base
                    </Label>
                    <Controller
                        name="precio_base"
                        control={control}
                        render={({ field }) => (
                            <Input
                                {...field}
                                id="precio_base"
                                type="number"
                                step="1000"
                                placeholder="Ingrese el precio base"
                                onChange={(e) =>
                                    field.onChange(
                                        e.target.value === "" ? "" : Number(e.target.value)
                                    )
                                }
                            />
                        )}
                    />
                    {errors.precio_base && (
                        <p className="text-sm text-red-500">{errors.precio_base.message}</p>
                    )}
                </div>

                {/* Incremento mínimo */}
                <div>
                    <Label className="block mb-1 text-sm font-medium" htmlFor="incremento_minimo">
                        Incremento mínimo
                    </Label>
                    <Controller
                        name="incremento_minimo"
                        control={control}
                        render={({ field }) => (
                            <Input
                                {...field}
                                id="incremento_minimo"
                                type="number"
                                step="1000"
                                placeholder="Ingrese el incremento mínimo"
                                onChange={(e) =>
                                    field.onChange(
                                        e.target.value === "" ? "" : Number(e.target.value)
                                    )
                                }
                            />
                        )}
                    />
                    {errors.incremento_minimo && (
                        <p className="text-sm text-red-500">
                            {errors.incremento_minimo.message}
                        </p>
                    )}
                </div>

                <div className="flex justify-between gap-4 mt-6">
                    <Button
                        type="button"
                        variant="default"
                        className="flex items-center gap-2 bg-accent text-white"
                        onClick={() => navigate(-1)}
                    >
                        <ArrowLeft className="w-4 h-4" />
                        Regresar
                    </Button>

                    <Button
                        type="submit"
                        className="flex items-center gap-2 bg-accent text-white hover:bg-accent/90"
                    >
                        <Save className="h-4 w-4" />
                        Guardar cambios
                    </Button>
                </div>
            </form>
        </Card>
    );
}
