<?php
class ObjetoModel
{
    public $enlace;
    public function __construct()
    {
        $this->enlace = new MySqlConnect();
    }
    /*Listar */
    public function all()
    {
    $imagenM = new ImagenModel();
    $categoriaM = new CategoriaModel();
    $usuarioM =new UsuarioModel(); 
    $estadoM = new EstadoObjetoModel();
    $condicionM = new CondicionObjetoModel();

    $vSql = "SELECT * FROM objeto;";
    $vResultado = $this->enlace->ExecuteSQL($vSql);

    if (!empty($vResultado) && is_array($vResultado)) {
        for ($i = 0; $i < count($vResultado); $i++) {
            //Vendedor 
            $vResultado[$i]->vendedor = $usuarioM->get($vResultado[$i]->id_vendedor);
            unset($vResultado[$i]->id_vendedor);
            // Condicion 
            $vResultado[$i]->condicion = $condicionM->get($vResultado[$i]->id_condicion_objeto);
            unset($vResultado[$i]->id_condicion_objeto);	
            // estado
            $vResultado[$i]->estado = $estadoM->get($vResultado[$i]->id_estado_objeto);
            unset($vResultado[$i]->id_estado_objeto);
            // Imagen
            $vResultado[$i]->imagen = $imagenM->getImageObjeto($vResultado[$i]->id_objeto);
            // Categorías
            $vResultado[$i]->categorias = $categoriaM->get($vResultado[$i]->id_objeto);
        }
    }
    return $vResultado;
    }

    /*Obtener */
    public function get($id)
    {
        $usuarioM =new UsuarioModel(); 
        $estadoM = new EstadoObjetoModel();
        $condicionM = new CondicionObjetoModel();
        $objetocategoriaM = new ObjetoCategoriaModel();
        $imagenM = new ImagenModel();
        //Consulta sql
        $vSql = "SELECT * FROM objeto where id_objeto=$id";

        //Ejecutar la consulta
        $vResultado = $this->enlace->ExecuteSQL($vSql);

        if(!empty($vResultado)){
            $vResultado=$vResultado[0];
            //Vendedor 
            $vResultado->vendedor=$usuarioM->get($vResultado->id_vendedor);
            unset($vResultado->id_vendedor);	        
            // Condicion 
            $vResultado->condicion= $condicionM->get($vResultado->id_condicion_objeto);
            unset($vResultado->id_condicion_objeto);	
            // estado
            $vResultado->estado= $estadoM->get($vResultado->id_estado_objeto);
            unset($vResultado->id_estado_objeto);
            //Categorias
            $vResultado->categorias=$objetocategoriaM->get($id);    
            //Imagen
            $vResultado->imagen=$imagenM->getImageObjeto($vResultado->id_objeto);
        }
        // Retornar el objeto
        return $vResultado;
    }

    public function create($objeto)
	{
		//Consulta sql
        //Identificador autoincrementable
        $sql = "Insert into objeto (nombre, descripcion, fecha_registro, 
                id_vendedor, id_estado_objeto, id_condicion_objeto) " .
                "Values ('$objeto->nombre','$objeto->descripcion', NOW(), 
                '$objeto->id_vendedor','1','$objeto->id_condicion_objeto')";

        //Obtener ultimo insert
        $idObjeto = $this->enlace->executeSQL_DML_last($sql);

        //--- Categorias ---
        foreach ($objeto->categorias as $value) {
            $sql = "Insert into objeto_categoria(id_objeto, id_categoria)" .
                " Values($idObjeto, $value)";
            $vCategorias = $this->enlace->executeSQL_DML($sql);
        }
        //Retornar objeto
        return $this->get($idObjeto);
	}

    public function update($objeto)
	{
        $id = $objeto->id_objeto;
	//Consulta sql
        $sql = "UPDATE objeto SET 
			nombre = '$objeto->nombre',
			descripcion = '$objeto->descripcion',
			id_estado_objeto = '$objeto->id_estado_objeto',
			id_condicion_objeto = '$objeto->id_condicion_objeto'
			WHERE id_objeto = $objeto->id_objeto";

        //Ejecutar la consulta
        $idObjeto = $this->enlace->executeSQL_DML($sql);

        $sql = "Delete from objeto_categoria where id_objeto=$objeto->id_objeto";
        $vResultadoD = $this->enlace->executeSQL_DML($sql);
        //Insertar categorias 
        foreach ($objeto->categorias as $item) {
            $sql = "Insert into objeto_categoria(id_objeto,id_categoria)" .
                " Values($objeto->id_objeto, $item)";
            $vResultadoG = $this->enlace->executeSQL_DML($sql);
        }
        //Retornar objeto
        return $this->get($id);
	}

    public function delete($objeto)
	{
		$cambio = 0;
		if($objeto->estado->id_estado_objeto == 1){
			$cambio = 2;
		}
		if($objeto->estado->id_estado_objeto == 2){
			$cambio = 1;
		}
	//Consulta sql
        $sql = "UPDATE objeto SET 
				id_estado_objeto = $cambio
				WHERE id_objeto = $objeto->id_objeto";

        //Ejecutar la consulta
        $cResults = $this->enlace->executeSQL_DML($sql);

        return $this->get($objeto->id_objeto);
	}

}