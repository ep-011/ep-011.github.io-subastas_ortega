<?php
//Cargar todos los paquetes
require_once "vendor/autoload.php";

use Firebase\JWT\JWT;

class puja
{
    //Listar en el API
    public function index()
    {
        $response = new Response();
        //Obtener el listado del Modelo
        $usuario = new PujaModel();
        $result = $usuario->all();
        //Dar respuesta
        $response->toJSON($result);
    }
    public function get($param)
    {
        $response = new Response();
        $usuario = new PujaModel();
        $result = $usuario->get($param);
        //Dar respuesta
        $response->toJSON($result);
    }

    public function pujasPorSubasta($param)
    {
        $response = new Response();
        $usuario = new PujaModel();
        $result = $usuario->pujasPorSubasta($param);
        //Dar respuesta
        $response->toJSON($result);
    }

   public function registrar()
{
    $response = new Response();

    try {
        $request = new Request();
        $inputJSON = $request->getJSON();

        $puja = new PujaModel();
        $result = $puja->registrarPuja($inputJSON);

        $response->toJSON([
            "success" => true,
            "message" => "Puja realizada",
            "data" => $result
        ]);

    } catch (Exception $e) {
        $response->toJSON([
            "success" => false,
            "message" => $e->getMessage(),
            "data" => null
        ]);
    }
}

}