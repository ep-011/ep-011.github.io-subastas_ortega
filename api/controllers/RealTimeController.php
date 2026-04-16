<?php

require_once __DIR__ . '/../vendor/autoload.php';

use Pusher\Pusher;

class realtime {

    public function test() {

        $options = [
            'cluster' => 'us2',
            'useTLS' => true
        ];

        $pusher = new Pusher(
            '4985d5a6019b1c31e2aa',
            'fcb1b77a3bfd03cd1c93',
            '2138376',
            $options
        );

        $data = [
            'valor' => rand(100, 999),
            'fecha' => date("Y-m-d H:i:s")
        ];

        $pusher->trigger('test-channel', 'valor-actualizado', $data);

        echo json_encode([
            "success" => true,
            "message" => "Evento enviado",
            "data" => $data
        ]);
    }
}