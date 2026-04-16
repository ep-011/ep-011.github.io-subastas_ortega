<?php
class ObjetoCategoriaModel
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
        $vSql = "SELECT * FROM objeto_categoria;";

        //Ejecutar la consulta
        $vResultado = $this->enlace->ExecuteSQL($vSql);

        // Retornar el objeto
        return $vResultado;
    }

    /*Obtener */
    public function get($id)
    {
        //Consulta sql
        $vSql = "SELECT c.id_categoria , c.nombre 
            FROM categoria c , objeto_categoria oc
            where oc.id_categoria = c.id_categoria and oc.id_objeto =$id";

        //Ejecutar la consulta
        $vResultado = $this->enlace->ExecuteSQL($vSql);
        // Retornar el objeto
        return $vResultado;
    }
}
