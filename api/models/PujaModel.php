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

public function create($objeto)
{
    $sql = "INSERT INTO puja (id_subasta, id_usuario, monto, fecha_hora)
            VALUES ($objeto->id_subasta, $objeto->id_usuario, $objeto->monto, NOW())";

    $idPuja = $this->enlace->executeSQL_DML_last($sql);

    if (!$idPuja) {
        throw new Exception("No se pudo registrar la puja");
    }

    return $this->get($idPuja);
}

public function getPujaMayor($id_subasta)
{
    // Consulta para obtener la puja de mayor monto
    $sql = "SELECT * 
            FROM puja 
            WHERE id_subasta = $id_subasta 
            ORDER BY monto DESC 
            LIMIT 1";

    $resultado = $this->enlace->ExecuteSQL($sql);

    if (empty($resultado)) {
        return null; // No hay pujas
    }

    $puja = $resultado[0];
    return $puja;
}

public function registrarPuja($puja)
{
    $subastaM = new SubastaModel();
    $subasta = $subastaM->get($puja->id_subasta);

    if (!$subasta) {
        throw new Exception("La subasta no existe");
    }

    // cierre // 
    $fechaActual = new DateTime();
    $fechaCierre = new DateTime($subasta->fecha_cierre);

    // fecha // 
    if ($fechaActual >= $fechaCierre) {
        $subastaM->finalizar($subasta);
        throw new Exception("La subasta ya finalizó");
    }

    // Validar estado //
    if ($subasta->estado->id_estado_subasta != 2) {
        throw new Exception("La subasta no está activa");
    }

    // Validar que el usuario no sea el vendedor //
    if ($puja->id_usuario == $subasta->vendedor->id_usuario) {
        throw new Exception("No se puede pujar en su propia subasta");
    }

    // Obtener puja mayor actual //  
    $pujaMayor = $this->getPujaMayor($puja->id_subasta);
    $montoActual = $pujaMayor ? $pujaMayor->monto : $subasta->precio_base;
    $incrementoMinimo = $subasta->incremento_minimo;

    // Validar monto mayor a la puja actual // 
    if ($puja->monto <= $montoActual) {
        throw new Exception("El monto debe ser mayor al monto más alto ofrecido");
    }

    // Validar incremento mínimo // 
    if (($puja->monto - $montoActual) < $incrementoMinimo) {
        throw new Exception("El monto no cumple con el incremento mínimo");
    }

    // Registrar puja // 
    $puja = $this->create($puja);

    if (!$puja) {
        throw new Exception("No se pudo registrar la puja");
    }

    // Obtener estado actualizado // 
    $pujaMayorActualizada = $this->getPujaMayor($subasta->id_subasta);
    $subasta->id_puja_ganadora = $pujaMayorActualizada->id_puja;
    $subastaM->setGanador($subasta);
    $subastaActualizada = $subastaM->get($subasta->id_subasta);

    return [
        "puja" => $puja,
        "puja_lider" => $pujaMayorActualizada,
        "subasta" => $subastaActualizada
    ];
}

    }
