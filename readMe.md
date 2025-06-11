API Agenda - README
API RESTful para gerenciamento de compromissos com autenticação JWT, controle de usuários e permissões de administrador.

Tecnologias

Node.js + TypeScript
Express
Prisma ORM + SQLite
JWT para autenticação
bcryptjs para hash de senhas
Zod para validação de dados

Rodando o projeto
Clone o repositório e instale as dependências:

git clone <seu-repo-url>
cd <pasta-do-projeto>
npm install

Configure as variáveis de ambiente criando um arquivo .env na raiz com:

PORT=3000
JWT_SECRET=ChaveSuperSecreta
Execute as migrações do Prisma para criar o banco:

bash
Copiar
Editar
npx prisma migrate dev --name init
Rode a seed para criar o usuário admin:

bash
Copiar
Editar
npx ts-node prisma/seed.ts
Inicie o servidor:

bash
Copiar
Editar
npm run dev
Servidor rodando em http://localhost:3000.

Endpoints principais

Usuários
POST /users/register — Registrar usuário comum (não admin)

POST /users/login — Login e obtenção do token JWT

A partir daqui as rotas de usuário requerem autenticação e permissão de administrador:

GET /users — Listar todos os usuários (admin)

GET /users/:id — Obter usuário por ID (admin)

PUT /users/:id — Atualizar usuário (admin)

DELETE /users/:id — Deletar usuário (admin)

Compromissos (Appointments)
Todas as rotas de compromissos requerem autenticação (qualquer usuário logado)

POST /appointments — Criar compromisso

GET /appointments — Listar compromissos do usuário logado

GET /appointments/:id — Obter compromisso por ID (se for do usuário)

PUT /appointments/:id — Atualizar compromisso (se for do usuário)

DELETE /appointments/:id — Deletar compromisso (se for do usuário)

Simulando o usuário admin
Use o email admin@example.com e senha admin123 para o login do admin criado pela seed.

Após login, copie o token JWT retornado e utilize no header das requisições autenticadas:

makefile
Copiar
Editar
Authorization: Bearer <token>
Scripts úteis
npm run dev — inicia o servidor em modo desenvolvimento (com nodemon)

npx prisma migrate dev --name <nome> — executa migração

npx ts-node prisma/seed.ts — executa a seed para criar o admin