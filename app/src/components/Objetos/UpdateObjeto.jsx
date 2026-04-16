import { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";

// shadcn/ui
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";

// icons
import { Save, ArrowLeft } from "lucide-react";

// servicios
import CategoriaService from "../../services/CategoriaService";
import CondicionObjetoService from "../../services/CondicionObjetoService";
import ObjetoService from "../../services/ObjetoService";
import ImagenService from "../../services/ImagenService";

// componentes reutilizables
import { CustomMultiSelect } from "../ui/custom/custom-multiple-select";
import { CustomSelect } from "../ui/custom/custom-select";

export function UpdateObjeto() {
    const navigate = useNavigate();
    const { id } = useParams();


    const BASE_URL_IMAGE = import.meta.env.VITE_BASE_URL + "uploads";

    const [dataCategorias, setDataCategorias] = useState([]);
    const [dataCondiciones, setDataCondiciones] = useState([]);
    const [file, setFile] = useState(null);
    const [fileURL, setFileURL] = useState(null);
    const [error, setError] = useState("");

    const objetoSchema = yup.object({
        nombre: yup
            .string()
            .required("Nombre del objeto requerido")
            .min(1, "El nombre no puede estar vacío"),
        descripcion: yup
            .string()
            .required("Descripción requerida")
            .min(20, "La descripción no cumple el mínimo requerido"),
        id_condicion_objeto: yup
            .number()
            .typeError("Asigne una condición para el objeto")
            .required("Se requiere condición"),
        categorias: yup
            .array()
            .of(yup.number())
            .min(1, "Se requiere categoría (1 mínimo)"),
    });

    const {
        control,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm({
        defaultValues: {
            id_objeto: "",
            nombre: "",
            descripcion: "",
            id_estado_objeto: "",
            id_vendedor: "",
            id_condicion_objeto: null,
            categorias: [],
        },
        resolver: yupResolver(objetoSchema),
    });

    const handleChangeImage = (e) => {
        const selectedFile = e.target.files?.[0];
        if (selectedFile) {
            setFile(selectedFile);
            setFileURL(URL.createObjectURL(selectedFile));
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const categoriasRes = await CategoriaService.getCategoria();
                const condicionRes = await CondicionObjetoService.getCondicionObjeto();
                const objetoRes = await ObjetoService.getObjetoById(id);

                setDataCategorias(categoriasRes.data.data || []);
                setDataCondiciones(condicionRes.data.data || []);

                if (objetoRes.data?.data) {
                    const objeto = objetoRes.data.data;

                    reset({
                        id_objeto: objeto.id_objeto,
                        nombre: objeto.nombre,
                        descripcion: objeto.descripcion,
                        id_estado_objeto: objeto.estado?.id_estado_objeto,
                        id_vendedor: objeto.vendedor?.id_usuario,
                        id_condicion_objeto: objeto.condicion?.id_condicion_objeto,
                        categorias: objeto.categorias?.map(c => c.id_categoria),
                    });

                    if (objeto.imagen?.url) {
                        setFileURL(`${BASE_URL_IMAGE}/${objeto.imagen.url}`);
                    }
                }
            } catch (err) {
                console.error(err);
                if (err.name !== "AbortError") {
                    setError("Error al cargar los datos del objeto");
                }
            }
        };

        fetchData();
    }, [id, reset, BASE_URL_IMAGE]);

    const onSubmit = async (dataForm) => {
        try {
            const isValid = await objetoSchema.isValid(dataForm);
            if (!isValid) return;

            const response = await ObjetoService.updateObjeto(dataForm);

            if (response.data?.data) {
                if (file) {
                    const formData = new FormData();
                    formData.append("file", file);
                    formData.append("id_objeto", response.data.data.id_objeto);

                    await ImagenService.createImage(formData);
                }

                toast.success(
                    `Objeto actualizado ${response.data.data.id_objeto} - ${response.data.data.nombre}`,
                    { duration: 3000 }
                );

                navigate(`/objeto/lista/${dataForm.id_vendedor}`);
            } else if (response.error) {
                setError(response.error);
            }
        } catch (err) {
            console.error("ERROR COMPLETO:", err);
            console.error("STATUS:", err?.response?.status);
            console.error("RESPUESTA BACKEND:", err?.response?.data);
            console.error("MENSAJE BACKEND:", err?.response?.data?.message);
            setError("Error al actualizar objeto");
        }
    };

    if (error) return <p className="text-red-600">{error}</p>;

    return (
        <Card className="p-6 max-w-5xl mx-auto">
            <h2 className="text-2xl font-bold mb-6">Actualizar Objeto</h2>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                {/* Nombre */}
                <div>
                    <Label className="block mb-1 text-sm font-medium" htmlFor="nombre">
                        Nombre
                    </Label>
                    <Controller
                        name="nombre"
                        control={control}
                        render={({ field }) => (
                            <Input {...field} id="nombre" placeholder="Ingrese el nombre del objeto" />
                        )}
                    />
                    {errors.nombre && (
                        <p className="text-sm text-red-500">{errors.nombre.message}</p>
                    )}
                </div>

                {/* Descripción */}
                <div>
                    <Label className="block mb-1 text-sm font-medium" htmlFor="descripcion">
                        Descripción
                    </Label>
                    <Controller
                        name="descripcion"
                        control={control}
                        render={({ field }) => (
                            <Input {...field} id="descripcion" placeholder="Ingrese la descripción del objeto" />
                        )}
                    />
                    {errors.descripcion && (
                        <p className="text-sm text-red-500">{errors.descripcion.message}</p>
                    )}
                </div>

                {/* Condición */}
                <div>
                    <Label className="block mb-1 text-sm font-medium">
                        Condición del Objeto (Escala de calificación 1 - 10)
                    </Label>
                    <Controller
                        name="id_condicion_objeto"
                        control={control}
                        render={({ field }) => (
                            <CustomSelect
                                field={field}
                                data={dataCondiciones}
                                label="Condición"
                                getOptionLabel={(condicion) =>
                                    `${condicion.id_condicion_objeto} - ${condicion.nombre}`
                                }
                                getOptionValue={(condicion) =>
                                    Number(condicion.id_condicion_objeto)
                                }
                                error={errors.id_condicion_objeto?.message}
                            />
                        )}
                    />
                </div>

                {/* Categorías */}
                <div>
                    <Controller
                        name="categorias"
                        control={control}
                        render={({ field }) => (
                            <CustomMultiSelect
                                field={field}
                                data={dataCategorias}
                                label="Categorías"
                                getOptionLabel={(item) => item.nombre}
                                getOptionValue={(item) => Number(item.id_categoria)}
                                error={errors.categorias?.message}
                                placeholder="Seleccione categorías"
                            />
                        )}
                    />
                </div>

                {/* Imagen */}
                <div className="mb-6">
                    <Label htmlFor="image" className="block mb-1 text-sm font-medium">
                        Imagen
                    </Label>

                    <div
                        className="relative w-56 h-56 border-2 border-dashed border-muted/50 rounded-lg flex items-center justify-center cursor-pointer overflow-hidden hover:border-primary transition-colors"
                        onClick={() => document.getElementById("image").click()}
                    >
                        {!fileURL && (
                            <div className="text-center px-4">
                                <p className="text-sm text-muted-foreground">
                                    Haz clic o arrastra una imagen
                                </p>
                                <p className="text-xs text-muted-foreground">
                                    (jpg, png, máximo 5MB)
                                </p>
                            </div>
                        )}

                        {fileURL && (
                            <img
                                src={fileURL}
                                alt="preview"
                                className="w-full h-full object-contain rounded-lg shadow-sm"
                            />
                        )}
                    </div>

                    <input
                        type="file"
                        id="image"
                        className="hidden"
                        accept="image/*"
                        onChange={handleChangeImage}
                    />
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