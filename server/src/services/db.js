const pg = require("pg");

const config = {
  user: "wandersonchaves", //this is the db user credential
  database: "wandersonchaves",
  password: "toor",
  port: 5432,
  max: 10, // max number of clients in the pool
};

const pool = new pg.Pool(config);

pool.on("connect", () => {
  console.log("connected to the Database");
});

const createTables = () => {
  const clientsTable = `
    CREATE TABLE IF NOT EXISTS
    clients(
      id SERIAL PRIMARY KEY,
      name VARCHAR(128) NOT NULL,
      email VARCHAR(128) NOT NULL,
      phone VARCHAR(128) NOT NULL,
      coordinate_x FLOAT NOT NULL,
      coordinate_y FLOAT NOT NULL
    )
  `;

  pool
    .query(clientsTable)
    .then((res) => {
      console.log("Tabela de clientes criada com sucesso");
      pool.end();
    })
    .catch((err) => {
      console.error("Erro ao criar tabela de clientes:", err);
      pool.end();
    });
};

//export pool and createTables to be accessible  from an where within the application
module.exports = {
  createTables,
  pool,
};

require("make-runnable");
