# Sistema de Biblioteca

## Como rodar

### Banco de dados (Postgres via Docker)
```
cd backend
docker compose up -d
```

### Backend (Spring Boot + Gradle + Java 25)
```
cd backend
gradle bootRun
```
(ou importe a pasta `backend` como projeto Gradle na sua IDE e rode a classe `BibliotecaApplication`)

A API sobe em `http://localhost:8080`.

### Frontend (React + Vite)
```
cd frontend
npm install
npm run dev
```

O frontend sobe em `http://localhost:5173`.

## Deploy

Os arquivos necessários para o deploy já estão no projeto. Não envie arquivos `.env` ao GitHub: use os exemplos `backend/.env.example` e `frontend/.env.example` apenas como referência.

### 1. Banco (Supabase)

Crie um projeto PostgreSQL no Supabase e guarde a URI de conexão. No Render, configure estas variáveis no serviço do backend:

```
SPRING_DATASOURCE_URL=jdbc:postgresql://HOST:5432/postgres
SPRING_DATASOURCE_USERNAME=postgres
SPRING_DATASOURCE_PASSWORD=SUA_SENHA
```

### 2. Backend (Render)

Publique a pasta `backend` como um **Web Service** com runtime **Docker**. Se mantiver backend e frontend no mesmo repositório, defina `backend` como **Root Directory** no Render. O `Dockerfile` compila a aplicação Gradle com Java 25 e a aplicação usa automaticamente a porta definida pelo Render (`PORT`). Após publicar o frontend, inclua também:

```
APP_CORS_ALLOWED_ORIGINS=https://seu-projeto.vercel.app
```

Para autorizar mais de uma origem, separe as URLs por vírgula. O backend fica disponível em `https://SEU-SERVICO.onrender.com/api`.

### 3. Frontend (Vercel)

Importe a pasta `frontend` como projeto Vite. Se mantiver backend e frontend no mesmo repositório, defina `frontend` como **Root Directory** na Vercel. Em **Environment Variables**, configure antes do deploy:

```
VITE_API_URL=https://SEU-SERVICO.onrender.com
```

Não acrescente `/api` nem uma barra ao final: o projeto acrescenta `/api` automaticamente. Depois que a Vercel gerar a URL final, use-a em `APP_CORS_ALLOWED_ORIGINS` no Render e faça um novo deploy do backend.

## Atividade

Este sistema tem bugs propositais no backend e no frontend, além de pontos que podem
ser melhorados (boas práticas, validações, tratamento de erro, etc). Naveguem pelas telas,
testem os fluxos (cadastrar livro, emprestar, devolver) e façam uma lista do que encontrarem.
