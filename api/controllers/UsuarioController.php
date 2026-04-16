<?php
//Cargar todos los paquetes
require_once "vendor/autoload.php";

use Firebase\JWT\JWT;

class usuario
{
    //Listar en el API
    public function index()
    {
        $response = new Response();
        //Obtener el listado del Modelo
        $usuario = new UsuarioModel();
        $result = $usuario->all();
        //Dar respuesta
        $response->toJSON($result);
    }
    public function get($param)
    {
        $response = new Response();
        $usuario = new UsuarioModel();
        $result = $usuario->get($param);
        //Dar respuesta
        $response->toJSON($result);
    }

    public function vendedores()
    {
        $response = new Response();
        //Obtener el listado del Modelo
        $usuario = new UsuarioModel();
        $result = $usuario->listaVendedores();
        //Dar respuesta
        $response->toJSON($result);
    }

    public function pujasDelUsuario($param)
    {
        $response = new Response();
        $usuario = new UsuarioModel();
        $result = $usuario->pujasDelUsuario($param);
        //Dar respuesta
        $response->toJSON($result);
    }

    public function SubastasCreadas($param)
    {
        $response = new Response();
        $usuario = new UsuarioModel();
        $result = $usuario->SubastasCreadas($param);
        //Dar respuesta
        $response->toJSON($result);
    }

    public function update()
    {
        try {
            $request = new Request();
            $response = new Response();
            //Obtener json enviado
            $inputJSON = $request->getJSON();
            //Instancia del modelo
            $usuario = new UsuarioModel();
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
            $usuario = new UsuarioModel();
            //Acción del modelo a ejecutar
            $result = $usuario->delete($inputJSON);
            //Dar respuesta
            $response->toJSON($result);
        } catch (Exception $e) {
            $response->toJSON($result);
            handleException($e);
        }
    }

    
}
