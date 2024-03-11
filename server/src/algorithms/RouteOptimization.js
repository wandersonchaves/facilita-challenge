// Função para calcular a distância entre dois pontos (coordenadas)
const calculateDistance = (coordinate1, coordinate2) => {
  // Aqui você pode implementar o cálculo da distância euclidiana, por exemplo
  const distanceX = coordinate2.x - coordinate1.x;
  const distanceY = coordinate2.y - coordinate1.y;
  return Math.sqrt(distanceX * distanceX + distanceY * distanceY);
};

// Função para calcular a rota otimizada usando o algoritmo do Caixeiro Viajante (TSP)
const calculateRoute = (coordinatesClients) => {
  // Inicialize as variáveis necessárias
  let bestRoute = null;
  let lowerDistance = Infinity;

  // Função auxiliar para calcular a distância total de uma rota
  const calculateTotalDistance = (route) => {
    let totalDistance = 0;
    for (let i = 0; i < route.length - 1; i++) {
      totalDistance += calculateDistance(route[i], route[i + 1]);
    }
    return totalDistance;
  };

  // Função auxiliar para permutar as coordenadas dos clientes
  const permutar = (coordinates, start) => {
    if (start === coordinates.length - 1) {
      const currentDistance = calculateTotalDistance(coordinates);
      if (currentDistance < lowerDistance) {
        lowerDistance = currentDistance;
        bestRoute = [...coordinates];
      }
    } else {
      for (let i = start; i < coordinates.length; i++) {
        [coordinates[start], coordinates[i]] = [
          coordinates[i],
          coordinates[start],
        ];
        permutar(coordinates, start + 1);
        [coordinates[start], coordinates[i]] = [
          coordinates[i],
          coordinates[start],
        ];
      }
    }
  };

  // Chame a função auxiliar para encontrar a melhor rota
  permutar(coordinatesClients, 0);

  // Retorne a melhor rota encontrada
  return bestRoute;
};

// Exporte a função para ser utilizada em outras partes da aplicação
module.exports = { calculateRoute };
