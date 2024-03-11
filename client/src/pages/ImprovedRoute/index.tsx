import { LatLngTuple } from "leaflet";
import { useEffect, useState } from "react";
import {
  CircleMarker,
  MapContainer,
  Marker,
  Polyline,
  Popup,
  TileLayer,
} from "react-leaflet";

interface ClientCoordinates {
  x: number;
  y: number;
}

export function ImprovedRoute() {
  const [polyline, setPolyline] = useState<LatLngTuple[]>([]);

  useEffect(() => {
    // Função para buscar as coordenadas otimizadas dos clientes na API
    async function fetchOptimizedRoute() {
      try {
        const response = await fetch("http://localhost:3000/improved-route");
        if (!response.ok) {
          throw new Error("Erro ao buscar a rota otimizada");
        }
        const data: ClientCoordinates[] = await response.json();

        // Construir o polyline a partir das coordenadas dos clientes
        const initialPosition: LatLngTuple = [0, 0];
        const finalPosition: LatLngTuple = [0, 0];
        const newPolyline = [
          initialPosition,
          ...data.map((item) => [item.x, item.y] as LatLngTuple),
          finalPosition,
        ];

        // Atualizar o estado de polyline
        setPolyline(newPolyline);
      } catch (error) {
        console.error(error);
      }
    }

    // Chamada da função ao montar o componente
    fetchOptimizedRoute();
  }, []);

  return (
    <main className="flex flex-col items-center">
      <div className="w-full h-96">
        <MapContainer center={[0, 0]} zoom={6} scrollWheelZoom={false}>
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          <div>
            {polyline.map((position, index) => (
              <CircleMarker
                key={new Date().getTime()}
                center={position}
                pathOptions={{ color: "red" }}
              >
                <Popup>{index + 1}</Popup>
              </CircleMarker>
            ))}
          </div>

          <Polyline pathOptions={{ color: "lime" }} positions={polyline} />

          <Marker position={[0, 0]}>
            <Popup>
              A pretty CSS3 popup. <br /> Easily customizable.
            </Popup>
          </Marker>
        </MapContainer>
      </div>
    </main>
  );
}
