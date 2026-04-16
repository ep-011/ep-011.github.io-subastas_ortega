import { useEffect, useState } from "react";
import Pusher from "pusher-js";
import RealtimeService from "@/services/RealTimeService";

function TestRealtime() {
  const [valor, setValor] = useState(100);
  const [fecha, setFecha] = useState("");
  const [estadoConexion, setEstadoConexion] = useState("Conectando...");

  useEffect(() => {
    const pusher = new Pusher("4985d5a6019b1c31e2aa", {
      cluster: "us2",
    });

    const channel = pusher.subscribe("test-channel");

    pusher.connection.bind("connected", () => {
      setEstadoConexion("Conectado a Pusher");
    });

    pusher.connection.bind("error", () => {
      setEstadoConexion("Error de conexión");
    });

    channel.bind("valor-actualizado", (data) => {
      setValor(data.valor);
      setFecha(data.fecha);
    });

    return () => {
      channel.unbind_all();
      pusher.unsubscribe("test-channel");
      pusher.disconnect();
    };
  }, []);

  const simularEvento = async () => {
    try {
      await RealtimeService.testEvento();
    } catch (error) {
      console.error("Error al emitir evento:", error);
    }
  };

  return (
    <div className="p-6 max-w-xl mx-auto space-y-4">
      <h1 className="text-2xl font-bold">Prueba de tiempo real con Pusher</h1>

      <p className="text-sm">Estado: {estadoConexion}</p>

      <div className="border rounded-xl p-4 space-y-2 shadow-sm">
        <p className="text-lg font-medium">Valor actual: {valor}</p>
        <p className="text-sm text-gray-500">
          Última actualización: {fecha || "Sin cambios aún"}
        </p>
      </div>

      <button
        onClick={simularEvento}
        className="px-4 py-2 rounded-lg bg-black text-white"
      >
        Simular actualización
      </button>
    </div>
  );
}

export default TestRealtime;