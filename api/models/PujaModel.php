<?php
class PujaModel
{
    public $enlace;
    public function __construct()
    {
        $this->enlace = new MySqlConnect();
    }
    /*Listar */
    public function all()
    {
        $usuarioM =new UsuarioModel(); 
        //Consulta sql
        $vSql = "SELECT * FROM puja;";

        //Ejecutar la consulta
        $vResultado = $this->enlace->ExecuteSQL($vSql);

        if (!empty($vResultado) && is_array($vResultado)) {
            for ($i = 0; $i < count($vResultado); $i++) {
                $vResultado[$i]->usuario = $usuarioM->get($vResultado[$i]->id_usuario);
                unset($vResultado[$i]->id_usuario);
            }
        }
        // Retornar el objeto
        return $vResultado;
    }
    /*Obtener */
    public function get($id)
    {
        $usuarioM =new UsuarioModel(); 
        //Consulta sql
        $vSql = "SELECT * FROM puja where id_puja=$id";

        //Ejecutar la consulta
        $vResultado = $this->enlace->ExecuteSQL($vSql);

        if(!empty($vResultado)){
            $vResultado=$vResultado[0];
            // Usuario
            $vResultado->usuario=$usuarioM->get($vResultado->id_usuario);
            unset($vResultado->id_usuario);	
        }
        // Retornar el objeto
        return $vResultado;
    }

    public function pujasPorSubasta($id)
    {
        $usuarioM = new UsuarioModel(); 

        // Consulta sql
        $vSql = "SELECT * 
                FROM puja
                WHERE id_subasta = $id
                ORDER BY fecha_hora DESC;";

        // Ejecutar la consulta
        $vResultado = $this->enlace->ExecuteSQL($vSql);

        if (!empty($vResultado) && is_array($vResultado)) {
            for ($i = 0; $i < count($vResultado); $i++) {
                $vResultado[$i]->usuario = $usuarioM->get($vResultado[$i]->id_usuario);
                unset($vResultado[$i]->id_usuario);
            }
        }

    // Retornar resultado
    return $vResultado;
}
    }
