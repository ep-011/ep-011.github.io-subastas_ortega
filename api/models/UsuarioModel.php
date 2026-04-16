<?php

use Firebase\JWT\JWT;

class UsuarioModel
{
	public $enlace;
	public function __construct()
	{

		$this->enlace = new MySqlConnect();
	}

	public function all()
	{
		//Consulta sql
		$vSql = "SELECT * FROM usuario;";
	
		$rolM = new RolModel();
		$estado = new EstadoUsuarioModel();
		//Ejecutar la consulta
		$vResultado = $this->enlace->ExecuteSQL($vSql);
			if (!empty($vResultado) && is_array($vResultado)) {
            for ($i = 0; $i <= count($vResultado) - 1; $i++) {

			// El rol //
			$vResultado[$i]->rol = $rolM->get($vResultado[$i]->id_rol);
			unset($vResultado[$i]->id_rol);	

			// El estado //
			$vResultado[$i]->estado = $estado->get($vResultado[$i]->id_estado_usuario);
			unset($vResultado[$i]->id_estado_usuario);	
            }
        }
		// Retornar el objeto
		return $vResultado;
	}

	public function get($id)
	{
		$rolM = new RolModel();
		$estado = new EstadoUsuarioModel();
		//Consulta sql
		$vSql = "SELECT * FROM usuario where id_usuario=$id";
		//Ejecutar la consulta
		$vResultado = $this->enlace->ExecuteSQL($vSql);
		if ($vResultado) {
			$vResultado = $vResultado[0];
			$rol = $rolM->getRolUsuario($id);
			$vResultado->rol = $rol;
			unset($vResultado->id_rol);	

			$vResultado->estado = $estado->get($vResultado->id_estado_usuario);
			unset($vResultado->id_estado_usuario);	

			// Retornar el objeto
			return $vResultado;
		} else {
			return null;
		}
	}

	public function listaVendedores()
	{
		$vSql = "SELECT * FROM usuario 
		WHERE id_usuario = 2;";
	
		$rolM = new RolModel();
		$estado = new EstadoUsuarioModel();
		//Ejecutar la consulta
		$vResultado = $this->enlace->ExecuteSQL($vSql);
			if (!empty($vResultado) && is_array($vResultado)) {
            for ($i = 0; $i <= count($vResultado) - 1; $i++) {

			// El rol //
			$vResultado[$i]->rol = $rolM->get($vResultado[$i]->id_rol);
			unset($vResultado[$i]->id_rol);	

			// El estado //
			$vResultado[$i]->estado = $estado->get($vResultado[$i]->id_estado_usuario);
			unset($vResultado[$i]->id_estado_usuario);	
            }
        }
		// Retornar el objeto
		return $vResultado;
	}

public function pujasDelUsuario($id)
	{
		//Consulta sql
		$vSql = "SELECT COUNT(*) AS cantidad_pujas
				FROM puja
				WHERE id_usuario = $id;";
		//Ejecutar la consulta
		$vResultado = $this->enlace->ExecuteSQL($vSql);
		// Retornar el objeto
		return $vResultado;
	}

public function SubastasCreadas($id)
	{
		//Consulta sql
		$vSql = "SELECT COUNT(*) AS cantidad_subastas
				FROM subasta
				WHERE id_vendedor = $id;";
		//Ejecutar la consulta
		$vResultado = $this->enlace->ExecuteSQL($vSql);
		// Retornar el objeto
		return $vResultado;
	}

public function update($objeto)
	{
		$idUsuario = $objeto->id_usuario;
	//Consulta sql
        $sql = "UPDATE usuario SET 
			correo = '$objeto->correo',
			nombre = '$objeto->nombre',
			apellido1 = '$objeto->apellido1',
			apellido2 = '$objeto->apellido2'
			WHERE id_usuario = $objeto->id_usuario";

        //Ejecutar la consulta
        $cResults = $this->enlace->executeSQL_DML($sql);

        return $this->get($idUsuario);
	}

public function delete($objeto)
	{
		$cambio = 0;
		if($objeto->estado->id_estado_usuario == 1){
			$cambio = 2;
		}
		if($objeto->estado->id_estado_usuario == 2){
			$cambio = 1;
		}
	//Consulta sql
        $sql = "UPDATE usuario SET 
				id_estado_usuario = $cambio
				WHERE id_usuario = $objeto->id_usuario";

        //Ejecutar la consulta
        $cResults = $this->enlace->executeSQL_DML($sql);

        return $this->get($objeto->id_usuario);
	}

}
