<?php
//Cargar todos los paquetes
require_once "vendor/autoload.php";

use Firebase\JWT\JWT;

class subasta
{
    //Listar en el API
    public function index()
    {
        $response = new Response();
        //Obtener el listado del Modelo
        $usuario = new SubastaModel();
        $result = $usuario->all();
        //Dar respuesta
        $response->toJSON($result);
    }
    public function get($param)
    {
        $response = new Response();
        $usuario = new SubastaModel();
        $result = $usuario->get($param);
        //Dar respuesta
        $response->toJSON($result);
    }

    public function subastaPorObjeto($param)
{
    $response = new Response();
    $subastaM = new SubastaModel();
    $result = $subastaM->getSubastaDeUnObjeto($param);

    $response->toJSON([
        "success" => true,
        "status" => 200,
        "message" => "Solicitud exitosa",
        "data" => $result
    ]);
}

    public function activas()
    {
        $response = new Response();
        $usuario = new SubastaModel();
        $result = $usuario->Subastas_activas();
        //Dar respuesta
        $response->toJSON($result);
    }

    public function inactivas()
    {
        $response = new Response();
        $usuario = new SubastaModel();
        $result = $usuario->Subastas_inactivas();
        //Dar respuesta
        $response->toJSON($result);
    }

    public function misSubastas($id)
    {
        $response = new Response();
        $usuario = new SubastaModel();
        $result = $usuario->miSubastas($id);
        //Dar respuesta
        $response->toJSON($result);
    }

    public function cantidad_pujas($param)
    {
        $response = new Response();
        $usuario = new SubastaModel();
        $result = $usuario->cantidad_pujas($param);
        //Dar respuesta
        $response->toJSON($result);
    }


    public function create()
    {
        try {
            $request = new Request();
            $response = new Response();
            //Obtener json enviado
            $inputJSON = $request->getJSON();
            //Instancia del modelo
            $usuario = new SubastaModel();
            //Acción del modelo a ejecutar
            $result = $usuario->create($inputJSON);
            //Dar respuesta
            $response->toJSON($result);
        } catch (Exception $e) {
            $response->toJSON($result);
            handleException($e);
            
        }
    }

    public function update()
    {
        try {
            $request = new Request();
            $response = new Response();
            //Obtener json enviado
            $inputJSON = $request->getJSON();
            //Instancia del modelo
            $usuario = new SubastaModel();
            //Acción del modelo a ejecutar
            $result = $usuario->update($inputJSON);
            //Dar respuesta
            $response->toJSON($result);
        } catch (Exception $e) {
            $response->toJSON($result);
            handleException($e);
            
        }
    }

    public function delete()
    {
        try {
            $request = new Request();
            $response = new Response();
            //Obtener json enviado
            $inputJSON = $request->getJSON();
            //Instancia del modelo
            $usuario = new SubastaModel();
            //Acción del modelo a ejecutar
            $result = $usuario->delete($inputJSON);
            //Dar respuesta
            $response->toJSON($result);
        } catch (Exception $e) {
            $response->toJSON($result);
            handleException($e);
        }
    }

    public function publicar()
    {
        try {
            $request = new Request();
            $response = new Response();
            //Obtener json enviado
            $inputJSON = $request->getJSON();
            //Instancia del modelo
            $usuario = new SubastaModel();
            //Acción del modelo a ejecutar
            $result = $usuario->publicar($inputJSON);
            //Dar respuesta
            $response->toJSON($result);
        } catch (Exception $e) {
            $response->toJSON($result);
            handleException($e);
        }
    }
}