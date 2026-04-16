import { useEffect, useState } from "react";
import { useForm, Controller, useFieldArray } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";

// shadcn/ui
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

// icons
import { Plus, Save, ArrowLeft } from "lucide-react";

// servicios
import UsuarioService from "../../services/UsuarioService";
import CategoriaService from "../../services/CategoriaService";
import CondicionObjetoService from "../../services/CondicionObjetoService";
import EstadoObjetoService from "../../services/EstadoObjetoService";
import ObjetoCategoriaService from "../../services/EstadoObjetoService";
import ObjetoService from "../../services/ObjetoService";
import ImagenService from "../../services/ImagenService";

// componentes reutilizables
import { CustomMultiSelect } from "../ui/custom/custom-multiple-select"; // select multi con chips
import { CustomSelect } from "../ui/custom/custom-select";

export function CreateObjeto() {
    const navigate = useNavigate();
    const { idUsuario } = useParams();

    /*** Estados para selects y preview de imagen ***/
    const [dataCategorias, setDataCategorias] = useState([]);
    const [dataCondiciones, setDataCondiciones] = useState([]);
    const [file, setFile] = useState(null);
    const [fileURL, setFileURL] = useState(null);
    const [error, setError] = useState("");


    /*** Esquema de validación Yup ***/
    const objetoSchema= yup.object({
        nombre: yup
            .string()
            .required('Nombre del objeto requerido')
            .min(1,'El nombre no puede estar vacío'),
        descripcion: yup 
            .string()
            .required('Descripción requerida')
            .min(20,'La descripción no cumple el mínimo requerido'),
        id_condicion_objeto: yup 
        .number() 
        .typeError('Asigne una condición para el objeto') 
        .required('Se requiere condición'), 
        categorias: yup
        .array().
        min(1, 'Se requiere categoría (1 mínimo)'), 

    })

    /*** React Hook Form ***/
    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm({
        defaultValues: {
        nombre: "",
        descripcion: "",
        id_vendedor: Number(idUsuario),
        id_condicion_objeto: null,
        categorias: [],
        },
        resolver:yupResolver(objetoSchema)
    });

    /*** Manejo de imagen ***/
    const handleChangeImage = (e) => {
        const selectedFile = e.target.files?.[0];
        if (selectedFile) {
        setFile(selectedFile);
        setFileURL(URL.createObjectURL(selectedFile));
        }
    };

    /***Listados de carga en el formulario ***/
    useEffect(()=>{
        const fechData=async()=>{
        try {
            //Lista de categorias
            const categoriasRes= await CategoriaService.getCategoria();
            //Lista de actores
            const condicionRes= await CondicionObjetoService.getCondicionObjeto()
            // Si la petición es exitosa, se guardan los datos 
            setDataCategorias(categoriasRes.data.data || []); 
            setDataCondiciones(condicionRes.data.data || []); 

        } catch (error) {
            console.log(error)
            if(error.name != "AbortError") setError(error.message)
        }
        }
        fechData()
    },[])

    /*** Submit ***/
    const onSubmit = async (dataForm) => {
        if (!file) {
        toast.error("Se debe incluir una imagen para el objeto.");
        return;
        }

        try {
        console.log(dataForm)
        if (objetoSchema.isValid()) { 
            //Verificar datos del formulario 
            console.log(dataForm);
            //Crear pelicula en el API 
            const response= await ObjetoService.createObjeto(dataForm);
            if(response.data){
            //archivo FormData
            const formData=new FormData()
            formData.append("file",file)
            formData.append("id_objeto",response.data.data.id_objeto)
            //Guardar
            await ImagenService.createImage(formData)
            //Notificar
            toast.success(`Objeto creado ${response.data.data.id_objeto} - ${response.data.data.nombre}`,
                {duration: 3000}
            )
            //Redireccionar a la lista
            navigate(`/objeto/lista/${idUsuario}`)
            }else if(response.error){
            setError(response.error)
            }

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
        <h2 className="text-2xl font-bold mb-6">Crear Película</h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">

    {/* Nombre */}
            <div>
            <Label className="block mb-1 text-sm font-medium" htmlFor="title">Nombre</Label>
            {/* Controller entrada nombre*/}
            <Controller name="nombre" control={control} render={({field})=>
                <Input {...field} id="nombre" placeholder="Ingrese el nombre del objeto" />
            }/>
            {/* Error entrada nombre */}
            {errors.nombre && <p className="text-sm text-red-500">{errors.nombre.message}</p>}
            </div>

    {/* Descripcion */}
            <div>
            <Label className="block mb-1 text-sm font-medium" htmlFor="title">Descripción</Label>
            {/* Controller entrada descripcion */}
            <Controller name="descripcion" control={control} render={({field})=>
                <Input {...field} id="descripcion" placeholder="Ingrese la descripcion del objeto" />
            }/>
            {/* Error entrada descripcion */}
            {errors.descripcion && <p className="text-sm text-red-500">{errors.descripcion.message}</p>}
            </div>

    {/* Condicion */}
            <div>
            <Label className="block mb-1 text-sm font-medium">Condición del Objeto (Escala de calificación 1 - 10)</Label>
            {/* Controller entrada condicion */}
            <Controller name="id_condicion_objeto" control={control} render={({field})=> 
                <CustomSelect
                field={field}
                data={dataCondiciones}
                label="Condicion"
                getOptionLabel={(condicion)=>`${condicion.id_condicion_objeto} - ${condicion.nombre}`}
                getOptionValue={(condicion)=> condicion.id_condicion_objeto} 
                error={errors.id_condicion_objeto?.message}
                />
            } />
            </div>
            
    {/* Categorias */}
            <div>
            {/* Controller entrada categorias */}
            <Controller name="categorias" control={control} render={({field})=> 
                <CustomMultiSelect
                field={field}
                data={dataCategorias}
                label="Categorías "
                getOptionLabel={(item)=>item.nombre}
                getOptionValue={(item)=> item.id_categoria} 
                error={errors.categorias?.message}
                placeholder="Seleccione categorías"
                />
            } />
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
                    <p className="text-sm text-muted-foreground">Haz clic o arrastra una imagen</p>
                    <p className="text-xs text-muted-foreground">(jpg, png, máximo 5MB)</p>
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
                variant="default" // sólido
                className="flex items-center gap-2 bg-accent text-white"
                onClick={() => navigate(-1)}
            >
                <ArrowLeft className="w-4 h-4" />
                Regresar
            </Button>
            {/* Botón Guardar */}
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