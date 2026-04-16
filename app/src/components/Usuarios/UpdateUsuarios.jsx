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
import { Card, CardContent } from "@/components/ui/card";


// icons
import { Plus, Save, ArrowLeft } from "lucide-react";

// servicios
import UsuarioService from "../../services/UsuarioService";
import RolService from "../../services/RolService";
import EstadoUsuarioService from "../../services/EstadoUsuarioService";


// componentes reutilizables
//import { CustomMultiSelect } from "../ui/custom/custom-multiple-select"; // select multi con chips
//import { ActorsForm } from "./Form/ActorsForm";
//import { CustomSelect } from "../ui/custom/custom-select";
//import { CustomInputField } from "../ui/custom/custom-input-field";

export function UpdateUsuarios() {
  const navigate = useNavigate();
  const { id } = useParams(); // 
  //Guardar pelicula a modificar
  const [dataUsuario, setDataUsuario] = useState([]);

  /*** Estados para selects y preview de imagen ***/
  const [dataUsuarios, setDataUsuarios] = useState([]);
  const [dataRoles, setDataRoles] = useState([]);
  const [dataEstados, setDataEstados] = useState([]);
  const [error, setError] = useState("");


  /*** Esquema de validación Yup ***/
  const UsuarioSchema = yup.object({
    nombre: yup
      .string()
      .required("El nombre es requerido")
      .min(1, "Casilla nombre vacía"),
    apellido1: yup
      .string()
      .required("El primer apellido es requerido")
      .min(1, "Casilla primer apellido vacía"),
    apellido2: yup
      .string()
      .required("El segundo apellido es requerido")
      .min(1, "Casilla segundo apellido vacía"),
    correo: yup
      .string()
      .required("El correo es requerido")
      .min(1, "Casilla correo vacía")
      .matches(
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
      "Debe ingresar un correo válido"
      ),
  });

  /*** React Hook Form ***/
  const { control, handleSubmit, reset, formState: { errors } } = useForm({
    defaultValues: {
      id_usuario: "",
      nombre: "",
      apellido1: "",
      apellido2: "",
      correo: "",
    },
    resolver: yupResolver(UsuarioSchema),
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "usuarios",
  });

  /*** Cargar selects y datos de la película al montar ***/
  useEffect(() => {
    const fetchData = async () => {
      try {
        const rolRes = await RolService.getRol();
        const estadosRes = await EstadoUsuarioService.getEstadoUsuario();
        const usuarioRes = await UsuarioService.getUsuarioById(id);
        // Si la petición es exitosa, se guardan los datos
        setDataRoles(rolRes.data.data || []);
        setDataEstados(estadosRes.data.data || []);
        setDataUsuarios(usuarioRes.data.data || {});
        //Asignar al formulario la Pelicula a actualizar
        if (usuarioRes.data) {
          const usuario = usuarioRes.data.data
          console.log(usuario)
          reset({
            id_usuario: usuario.id_usuario,
            nombre: usuario.nombre,
            apellido1: usuario.apellido1,
            apellido2: usuario.apellido2,
            correo: usuario.correo,
            cedula: usuario.cedula,
            contrasena: usuario.contrasena,
            id_rol: usuario.rol.id_rol,
            id_estado_usuario: usuario.estado.id_estado_usuario,
            fecha_registro: usuario.fecha_registro
          })
        }
      } catch (err) {
        // Si el error no es por cancelación, se registra
        if (err.name !== "AbortError") setError(err.message);
      }
    };
    fetchData();
  }, []);


  /*** Submit ***/
  const onSubmit = async (dataForm) => {
    try {
      // isValid es async y recibe los datos
      const isValid = await UsuarioSchema.isValid(dataForm);
      if (!isValid) return;

      const response = await UsuarioService.updateUsuario(dataForm);
      //notificación
      if (response.data) {      
        //Notificar
        toast.success(`Usuario actualizado ${response.data.data.id_usuario} - 
          ${response.data.data.nombre} ${response.data.data.apellido1}`,
          { duration: 3000 }
        )
        //Redireccionar a la lista
        navigate("/usuarios/table")
      } else if (response.error) {
        setError(response.error)
      }

    } catch (err) {
  console.error("Error completo:", err);
  console.error("Respuesta backend:", err.response?.data);
  setError("Error al actualizar usuario");
    }
  };

  if (error) return <p className="text-red-600">{error}</p>;

  return (
  <Card className="mx-auto w-full max-w-5xl border-border/60 shadow-lg">
    <CardContent className="p-8">
      <div className="mb-8">
        <h2 className="text-3xl font-bold tracking-tight text-foreground">
          Actualizar Usuario
        </h2>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        {/* Información editable */}
        <section className="rounded-2xl border border-border/60 bg-muted/20 p-6 shadow-sm">
          <div className="mb-5">
            <h3 className="text-lg font-semibold text-foreground">
              Información Personal.
            </h3>
          </div>

          <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
            {/* Nombre */}
            <div className="space-y-2">
              <Label htmlFor="nombre">Nombre</Label>
              <Controller
                name="nombre"
                control={control}
                render={({ field }) => (
                  <Input
                    {...field}
                    id="nombre"
                    placeholder="Ingrese el nombre"
                  />
                )}
              />
              {errors.nombre && (
                <p className="text-sm text-red-500">{errors.nombre.message}</p>
              )}
            </div>

            {/* Primer apellido */}
            <div className="space-y-2">
              <Label htmlFor="apellido1">Primer Apellido</Label>
              <Controller
                name="apellido1"
                control={control}
                render={({ field }) => (
                  <Input
                    {...field}
                    id="apellido1"
                    placeholder="Ingrese el primer apellido"
                  />
                )}
              />
              {errors.apellido1 && (
                <p className="text-sm text-red-500">{errors.apellido1.message}</p>
              )}
            </div>

            {/* Segundo apellido */}
            <div className="space-y-2">
              <Label htmlFor="apellido2">Segundo Apellido</Label>
              <Controller
                name="apellido2"
                control={control}
                render={({ field }) => (
                  <Input
                    {...field}
                    id="apellido2"
                    placeholder="Ingrese el segundo apellido"
                  />
                )}
              />
              {errors.apellido2 && (
                <p className="text-sm text-red-500">{errors.apellido2.message}</p>
              )}
            </div>

            {/* Correo */}
            <div className="space-y-2">
              <Label htmlFor="correo">Correo</Label>
              <Controller
                name="correo"
                control={control}
                render={({ field }) => (
                  <Input
                    {...field}
                    id="correo"
                    type="email"
                    placeholder="Ingrese el correo"
                  />
                )}
              />
              {errors.correo && (
                <p className="text-sm text-red-500">{errors.correo.message}</p>
              )}
            </div>
          </div>
        </section>

        {/* Información no editable */}
        <section className="rounded-2xl border border-border/60 bg-background p-6 shadow-sm">
          <div className="mb-5">
            <h3 className="text-lg font-semibold text-foreground">
              Información del sistema
            </h3>
          </div>

          <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
            {/* ID Usuario */}
            <div className="space-y-2">
              <Label htmlFor="id_usuario">ID Usuario</Label>
              <Controller
                name="id_usuario"
                control={control}
                render={({ field }) => (
                  <Input
                    {...field}
                    id="id_usuario"
                    readOnly
                    disabled
                    className="bg-muted text-muted-foreground"
                  />
                )}
              />
            </div>

            {/* Cédula */}
            <div className="space-y-2">
              <Label htmlFor="cedula">Cédula</Label>
              <Controller
                name="cedula"
                control={control}
                render={({ field }) => (
                  <Input
                    {...field}
                    id="cedula"
                    readOnly
                    disabled
                    className="bg-muted text-muted-foreground"
                  />
                )}
              />
            </div>

            {/* Rol */}
            <div className="space-y-2">
              <Label htmlFor="rol">Rol</Label>
              <Input
                id="rol"
                value={dataUsuarios?.rol?.nombre || ""}
                readOnly
                disabled
                className="bg-muted text-muted-foreground"
              />
            </div>

            {/* Estado */}
            <div className="space-y-2">
              <Label htmlFor="estado">Estado</Label>
              <Input
                id="estado"
                value={dataUsuarios?.estado?.nombre || ""}
                readOnly
                disabled
                className="bg-muted text-muted-foreground"
              />
            </div>

          </div>
        </section>

        {/* Botones */}
        <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-between">
          <Button
            type="button"
            variant="outline"
            className="flex items-center gap-2"
            onClick={() => navigate(-1)}
          >
            <ArrowLeft className="h-4 w-4" />
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
    </CardContent>
  </Card>
);
}
