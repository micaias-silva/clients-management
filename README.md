# Contacts Management

Contacts Management é uma aplicação web que gerencia os contatos associados aos clientes armazenados no banco de dados.

## Instalação

A aplicação é dividida em duas partes, portanto a instalação deve ser feita separadamente para cada sub-estrutura do projeto.

### Frontend

```Bash
$ cd frontend
$ npm i # Ou `npm install`
$ cd ..
```

### Backend

```Bash
$ cd backend
$ npm i # ou npm install
$ cd ..
```

## Configuração do Ambiente

O Backend da aplicação possui algumas credenciais que devem ser inseridas antes da execução no arquivo de configurações **.env**

### Referência

```Bash
MONGO_INITDB_ROOT_USERNAME= # Usuário do Banco de Dados
MONGO_INITDB_ROOT_PASSWORD= # Senha do usuário
MONGO_INITDB_DATABASE=      # Nome do banco de Dados

HOST=               # Host onde o banco está hospedado
DB_PORT=            # Porta onde o banco de dados está hospedado
SECRET_KEY=         # Chave secreta para autenticação

DATABASE_URL=       # Url do banco dados
```

## Execução (Dev)

Ambas as partes do projeto devem ser executadas em modo de desenvolvimento separadamente.

### Frontend

```Bash
$ cd frontend
$ npm run start:dev
```

### Backend

```Bash
$ cd backend
$ npm run start:dev
```

## Endpoints (Backend)

### Clients

- `GET /clients` - Lista todos so clientes
- `GET /clients/:id` - Lista todos os dados de um único cliente
- `POST /clients` - Criação de um cliente
- `PATCH /clients/:id` - Atualização dos dados de um cliente
- `DELETE /clients/:id` - Deleta os dados de um cliente

### Contacts

- `GET /contacts` - Lista todos os contatos de um cliente
- `GET /contacts/:id` - Lista todos os dados de um único contato
- `POST /contacts` - Criação de um contato para um cliente autenticado
- `PATCH /clients/:id` - Atualização dos dados de um contato que pertence ao cliente
- `DELETE /clients/:id` - Deleta os dados de um contato que pertence a um cliente

### Auth

- `POST /auth/login` - Faz o login de um cliente
- `POST /auth/authenticate` - Valida um token
