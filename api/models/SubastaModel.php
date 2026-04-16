<?php
class SubastaModel
{
    public $enlace;
    public function __construct()
    {
        $this->enlace = new MySqlConnect();
    }
    /*Listar */
public function all()
{
    
        $objetoM = new ObjetoModel();
        $usuarioM = new UsuarioModel(); 
        $estadoM = new EstadoSubastaModel();
        $pujaM = new PujaModel();

        $vSql = "SELECT * FROM subasta;";
        $vResultado = $this->enlace->ExecuteSQL($vSql);

        if (!empty($vResultado) && is_array($vResultado)) {
            for ($i = 0; $i < count($vResultado); $i++) {
                    // objeto
                    $vResultado[$i]->objeto = $objetoM->get($vResultado[$i]->id_objeto);
                    unset($vResultado[$i]->id_objeto);

                    // vendedor
                    $vResultado[$i]->vendedor = $usuarioM->get($vResultado[$i]->id_vendedor);
                    unset($vResultado[$i]->id_vendedor);

                    // estado
                    $vResultado[$i]->estado = $estadoM->get($vResultado[$i]->id_estado_subasta);
                    unset($vResultado[$i]->id_estado_subasta);

                    // ganador
                    unset($vResultado[$i]->id_ganador);

                    // puja ganadora
                    if ($vResultado[$i]->id_puja_ganadora != null) {
                        $vResultado[$i]->puja_ganadora = $pujaM->get($vResultado[$i]->id_puja_ganadora);
                    }else{
                    unset($vResultado[$i]->id_puja_ganadora);
                    }
            }
        }

        return $vResultado;

    } 


    /*Obtener */
    public function get($id)
    {
        $objetoM = new ObjetoModel();
        $usuarioM =new UsuarioModel(); 
        $estadoM = new EstadoSubastaModel();
        $pujaM = new PujaModel();
        //Consulta sql
        $vSql = "SELECT * FROM subasta where id_subasta=$id";

        //Ejecutar la consulta
        $vResultado = $this->enlace->ExecuteSQL($vSql);

        if(!empty($vResultado)){
            $vResultado=$vResultado[0];
                // objeto
                $vResultado->objeto=$objetoM->get($vResultado->id_objeto);
                unset($vResultado->id_objeto);	

                // vendedor 
                $vResultado->vendedor = $usuarioM->get($vResultado->id_vendedor);
                unset($vResultado->id_vendedor);	 
            
                // estado
                $vResultado->estado= $estadoM->get($vResultado->id_estado_subasta);
                unset($vResultado->id_estado_subasta);

                // puja
                if($vResultado->id_puja_ganadora != null){
                $vResultado->puja_ganadora= $pujaM->get($vResultado->id_puja_ganadora);
                unset($vResultado->id_puja_ganadora);
                }
            }

        // Retornar el objeto
        return $vResultado;
    }

   public function getSubastaDeUnObjeto($idObjeto)
{
    $objetoM = new ObjetoModel();
    $usuarioM = new UsuarioModel(); 
    $estadoM = new EstadoSubastaModel();
    $pujaM = new PujaModel();

    // Consulta sql
    $vSql = "SELECT * FROM subasta WHERE id_objeto = $idObjeto";

    // Ejecutar la consulta
    $vResultado = $this->enlace->ExecuteSQL($vSql);

    // Si no hay resultados, retornar null
    if (empty($vResultado)) {
        return null;
    }

    $vResultado = $vResultado[0];

    // objeto
    $vResultado->objeto = $objetoM->get($vResultado->id_objeto);
    unset($vResultado->id_objeto);

    // vendedor 
    $vResultado->vendedor = $usuarioM->get($vResultado->id_vendedor);
    unset($vResultado->id_vendedor);

    // estado
    $vResultado->estado = $estadoM->get($vResultado->id_estado_subasta);
    unset($vResultado->id_estado_subasta);

    // puja ganadora
    if ($vResultado->id_puja_ganadora != null) {
        $vResultado->puja_ganadora = $pujaM->get($vResultado->id_puja_ganadora);
    }
    unset($vResultado->id_puja_ganadora);

    return $vResultado;
}

    public function Subastas_activas()
{
    $objetoM = new ObjetoModel();
    $usuarioM = new UsuarioModel(); 
    $estadoM = new EstadoSubastaModel();
    $pujaM = new PujaModel();

    $vSql = "SELECT * FROM subasta WHERE id_estado_subasta = 2;";

    $vResultado = $this->enlace->ExecuteSQL($vSql);

    if (!empty($vResultado) && is_array($vResultado)) {
        for ($i = 0; $i < count($vResultado); $i++) {

            // objeto
            $vResultado[$i]->objeto = $objetoM->get($vResultado[$i]->id_objeto);
            unset($vResultado[$i]->id_objeto);

            // vendedor
            $vResultado[$i]->vendedor = $usuarioM->get($vResultado[$i]->id_vendedor);
            unset($vResultado[$i]->id_vendedor);

            // estado
            $vResultado[$i]->estado = $estadoM->get($vResultado[$i]->id_estado_subasta);
            unset($vResultado[$i]->id_estado_subasta);

            // puja ganadora
            if ($vResultado[$i]->id_puja_ganadora != null) {
                $vResultado[$i]->puja_ganadora = $pujaM->get($vResultado[$i]->id_puja_ganadora);
            }
            unset($vResultado[$i]->id_puja_ganadora);
        }
    }

    return $vResultado;
}


    public function Subastas_inactivas()
{
    $objetoM = new ObjetoModel();
    $usuarioM = new UsuarioModel(); 
    $estadoM = new EstadoSubastaModel();
    $pujaM = new PujaModel();

    $vSql = "SELECT * FROM subasta WHERE id_estado_subasta = 3 || id_estado_subasta = 4;";

    $vResultado = $this->enlace->ExecuteSQL($vSql);

    if (!empty($vResultado) && is_array($vResultado)) {
        for ($i = 0; $i < count($vResultado); $i++) {

            // objeto
            $vResultado[$i]->objeto = $objetoM->get($vResultado[$i]->id_objeto);
            unset($vResultado[$i]->id_objeto);

            // vendedor
            $vResultado[$i]->vendedor = $usuarioM->get($vResultado[$i]->id_vendedor);
            unset($vResultado[$i]->id_vendedor);

            // estado
            $vResultado[$i]->estado = $estadoM->get($vResultado[$i]->id_estado_subasta);
            unset($vResultado[$i]->id_estado_subasta);

            // ganador
            unset($vResultado[$i]->id_ganador);

            // puja ganadora
            if ($vResultado[$i]->id_puja_ganadora != null) {
                $vResultado[$i]->puja_ganadora = $pujaM->get($vResultado[$i]->id_puja_ganadora);
            }
            unset($vResultado[$i]->id_puja_ganadora);
        }
    }

    return $vResultado;
}

public function miSubastas($id)
{
    $objetoM = new ObjetoModel();
    $usuarioM = new UsuarioModel(); 
    $estadoM = new EstadoSubastaModel();
    $pujaM = new PujaModel();

    $vSql = "SELECT * FROM subasta WHERE id_vendedor= $id;";

    $vResultado = $this->enlace->ExecuteSQL($vSql);

    if (!empty($vResultado) && is_array($vResultado)) {
        for ($i = 0; $i < count($vResultado); $i++) {

            // objeto
            $vResultado[$i]->objeto = $objetoM->get($vResultado[$i]->id_objeto);
            unset($vResultado[$i]->id_objeto);

            // vendedor
            $vResultado[$i]->vendedor = $usuarioM->get($vResultado[$i]->id_vendedor);
            unset($vResultado[$i]->id_vendedor);

            // estado
            $vResultado[$i]->estado = $estadoM->get($vResultado[$i]->id_estado_subasta);
            unset($vResultado[$i]->id_estado_subasta);

            // ganador
            unset($vResultado[$i]->id_ganador);

            // puja ganadora
            if ($vResultado[$i]->id_puja_ganadora != null) {
                $vResultado[$i]->puja_ganadora = $pujaM->get($vResultado[$i]->id_puja_ganadora);
            }
            unset($vResultado[$i]->id_puja_ganadora);
        }
    }

    return $vResultado;
}
    
public function cantidad_pujas($id)
    {
        //Consulta sql
        $vSql = "SELECT COUNT(*) AS total_pujas
                    FROM puja
                    WHERE id_subasta = $id;";

        //Ejecutar la consulta
        $vResultado = $this->enlace->ExecuteSQL($vSql);

        // Retornar el objeto
        return $vResultado;
    }

    public function create($objeto)
	{
		//Consulta sql
        //Identificador autoincrementable
        $sql = "insert into subasta (`id_objeto`, `id_vendedor`,
                                    `fecha_inicio`, `fecha_cierre`, `precio_base`, 
                                    `incremento_minimo`, `id_estado_subasta`) " .
                "Values (
                '$objeto->id_objeto',
                '$objeto->id_vendedor',
                '$objeto->fecha_inicio', 
                '$objeto->fecha_cierre',
                '$objeto->precio_base',
                '$objeto->incremento_minimo',
                '1')";

        //Obtener ultimo insert
        $idObjeto = $this->enlace->executeSQL_DML_last($sql);
        //Retornar objeto
        return $this->get($idObjeto);
	}

    public function update($objeto)
	{
        $id = $objeto->id_subasta;
	//Consulta sql
        $sql = "UPDATE subasta SET 
                fecha_inicio = '$objeto->fecha_inicio', 
                fecha_cierre = '$objeto->fecha_cierre',
                precio_base = '$objeto->precio_base',
                incremento_minimo ='$objeto->incremento_minimo' 
			WHERE id_subasta= $id";

        //Ejecutar la consulta
        $idObjeto = $this->enlace->executeSQL_DML($sql);

        //Retornar objeto
        return $this->get($id);
	}

    public function delete($objeto)
	{
		
	//Consulta sql
        $sql = "UPDATE subasta SET 
				id_estado_subasta = 4
				WHERE id_subasta = $objeto->id_subasta";

        //Ejecutar la consulta
        $cResults = $this->enlace->executeSQL_DML($sql);

        return $this->get($objeto->id_subasta);
	}
    
    public function publicar($objeto)
	{
		
	//Consulta sql
        $sql = "UPDATE subasta SET 
				id_estado_subasta = 2
				WHERE id_subasta = $objeto->id_subasta";

        //Ejecutar la consulta
        $cResults = $this->enlace->executeSQL_DML($sql);

        return $this->get($objeto->id_subasta);
	}


}