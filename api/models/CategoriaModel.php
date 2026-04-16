<?php
class CategoriaModel
{
    public $enlace;
    public function __construct()
    {
        $this->enlace = new MySqlConnect();
    }
    /*Listar */
    public function all()
    {
        //Consulta sql
        $vSql = "SELECT * FROM categoria;";

        //Ejecutar la consulta
        $vResultado = $this->enlace->ExecuteSQL($vSql);

        // Retornar el objeto
        return $vResultado;
    }

    /*Obtener */
    public function get($id)
    {
        //Consulta sql
         // Consulta sql
    $vSql = "SELECT * FROM categoria WHERE id_categoria = $id";

    // Ejecutar la consulta
    $vResultado = $this->enlace->ExecuteSQL($vSql);

    // Validar resultado
    if (empty($vResultado) || !is_array($vResultado)) {
        return null;
    }

    // Retornar el objeto
    return $vResultado[0];
    }


}