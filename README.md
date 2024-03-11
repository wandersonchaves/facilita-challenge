# Projeto de Gestão de Clientes

Este projeto é uma aplicação web para gerenciamento de clientes de uma empresa, incluindo funcionalidades de cadastro, visualização e otimização de rotas de atendimento. A aplicação é dividida em duas partes: frontend e backend.

## Requisitos do Sistema

Antes de configurar e executar o projeto localmente, certifique-se de ter instalado em sua máquina o Node.js e o PostgreSQL.

## Configuração e Execução

Siga os passos abaixo para configurar e executar o projeto localmente:

### 1. Clonar o Repositório

Clone este repositório para o seu ambiente de desenvolvimento:

```bash
git clone git@github.com:wandersonchaves/facilita-challenge.git
```

### 2. Configurar o Banco de Dados

Antes de executar o servidor, crie a estrutura da tabela no banco de dados PostgreSQL. Certifique-se de ter o PostgreSQL instalado e em execução. Em seguida, execute o seguinte comando na raiz do projeto:

```bash
npm run create
```

### 3. Configurar o Backend

Navegue até o diretório do servidor:

```bash
cd server
```

Instale as dependências:

```bash
npm install
```

Inicie o servidor:

```bash
npm run dev
```

O servidor estará em execução em [http://localhost:3000](http://localhost:3000).

### 4. Configurar o Frontend

Navegue até o diretório do cliente:

```bash
cd client
```

Instale as dependências:

```bash
npm install
```

Inicie o aplicativo frontend:

```bash
npm run dev
```

O aplicativo estará disponível em [http://localhost:5173](http://localhost:5173).

## Uso

Após configurar e executar o projeto, você pode acessar a aplicação através do navegador usando o endereço [http://localhost:5173](http://localhost:5173). A partir daí, você pode realizar operações de cadastro, visualização e otimização de rotas de atendimento de clientes.

### DDL (Data Definition Language) da tabela do banco de dados

```sql
CREATE TABLE clientes (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    phone VARCHAR(20) NOT NULL,
    coordinate_x NUMERIC NOT NULL,
    coordinate_y NUMERIC NOT NULL
);
```

Este é o script SQL para criar a tabela `clients` no banco de dados. A tabela possui os seguintes campos:

- `id`: Um número de identificação único para cada cliente (chave primária).
- `name`: O nome do cliente.
- `email`: O endereço de e-mail do cliente (único).
- `phone`: O número de telefone do cliente.
- `coordinate_x`: A coordenada X do cliente no mapa.
- `coordinate_y`: A coordenada Y do cliente no mapa.

Certifique-se de executar este script SQL em seu banco de dados para configurar a tabela antes de usar o aplicativo. O comando no passo 2 já se encarrega de realizar todo esse trabalho.

**Explicação das Escolhas e Abordagens:**

1. Utilização do React e Tailwind CSS:
   - React para o frontend.
   - Tailwind CSS para estilização.

2. Backend com Node.js e Express:
   - Node.js e Express para o backend.
   - Implementação de APIs RESTful.

3. Uso de Banco de Dados PostgreSQL:
   - PostgreSQL como banco de dados.
   - Tabela de clientes e suas vantagens.

4. API para Cálculo de Rotas:
   - API foi implementada para calcular a rota ótima.
   - Otimização de rotas para a eficiência no atendimento aos clientes.

## Contribuição

Contribuições são bem-vindas! Sinta-se à vontade para fazer fork do repositório, abrir issues e enviar pull requests para melhorar este projeto.
