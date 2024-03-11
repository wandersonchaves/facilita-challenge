// Importe a pool de conexão com o banco de dados
const { pool } = require("./db");

// Função para obter as coordenadas dos clientes do banco de dados
const getCoordinatesClients = async () => {
  try {
    // Estabeleça uma conexão com o banco de dados
    const client = await pool.connect();

    // Consulta SQL para obter as coordenadas dos clientes
    const query = "SELECT id, coordinate_x, coordinate_y FROM clients";

    // Execute a consulta SQL
    const result = await client.query(query);

    // Libere a conexão com o banco de dados
    client.release();

    // Mapeie o resultado da consulta para um formato adequado
    const coordinatesClients = result.rows.map((client) => ({
      id: client.id,
      x: client.coordinate_x,
      y: client.coordinate_y,
    }));

    // Retorne as coordenadas dos clientes
    return coordinatesClients;
  } catch (error) {
    // Se ocorrer um erro, lance-o para ser tratado no controlador que chamou esta função
    throw error;
  }
};

// Exporte a função para ser utilizada em outras partes da aplicação
module.exports = { getCoordinatesClients };
