const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const { pool } = require("./services/db");
const { calculateImprovedRoute } = require("./controllers/RouteController");

const app = express();
const port = process.env.PORT || 3000;

// Configuração do middleware CORS
app.use(
  cors({
    origin: "http://localhost:5173", // Permitir apenas solicitações deste domínio
  })
);

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:5173");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Rota de boas-vindas
app.get("/", (req, res) => {
  res.send("Bem-vindo ao Facilita Jurídico");
});

// Rota para listar todos os clientes
app.get("/clients", async (req, res) => {
  try {
    const client = await pool.connect();
    const query = "SELECT * FROM clients";
    const result = await client.query(query);
    client.release();
    if (result.rows.length < 1) {
      return res.status(404).json({
        status: "Falha",
        message: "Nenhuma informação de cliente encontrada",
      });
    }
    res.status(200).json({
      status: "Sucesso",
      message: "Informações dos clientes recuperadas",
      clients: result.rows,
    });
  } catch (error) {
    console.error("Erro ao listar clientes:", error);
    res.status(500).json({ error: "Erro interno do servidor" });
  }
});

// Rota para adicionar um novo cliente
app.post("/clients", async (req, res) => {
  try {
    const { name, email, phone, coordinate_x, coordinate_y } = req.body;
    const query =
      "INSERT INTO clients(name, email, phone, coordinate_x, coordinate_y) VALUES($1, $2, $3, $4, $5) RETURNING *";
    const values = [name, email, phone, coordinate_x, coordinate_y];
    const client = await pool.connect();
    const result = await client.query(query, values);
    client.release();
    res.status(201).json({
      status: "Sucesso",
      message: "Cliente adicionado com sucesso",
      client: result.rows[0],
    });
  } catch (error) {
    console.error("Erro ao adicionar cliente:", error);
    res.status(500).json({ error: "Erro interno do servidor" });
  }
});

// Rota para calcular a rota otimizada
app.get("/improved-route", async (req, res) => {
  try {
    // Chama a função do controlador para calcular a rota otimizada
    const improvedRoute = await calculateImprovedRoute();

    // Retorna a rota otimizada como resposta
    res.json(improvedRoute);
  } catch (error) {
    console.error("Erro ao calcular rota otimizada:", error);
    res.status(500).json({ error: "Erro interno do servidor" });
  }
});

app.listen(port, () => {
  console.log(`Servidor em execução em http://127.0.0.1:${port}`);
});
