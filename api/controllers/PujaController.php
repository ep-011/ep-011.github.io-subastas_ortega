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

}