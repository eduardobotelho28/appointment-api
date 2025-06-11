# 📅 API Agenda

API RESTful para gerenciamento de compromissos com autenticação JWT, controle de usuários e permissões de administrador.

---

## 🚀 Tecnologias

- **Node.js + TypeScript**
- **Express**
- **Prisma ORM + SQLite**
- **JWT** para autenticação
- **bcryptjs** para hash de senhas
- **Zod** para validação de dados

---

## ⚙️ Rodando o projeto

### 1. Clone o repositório e instale as dependências:

```bash
git clone https://github.com/eduardobotelho28/appointment-api
cd appointment-api
npm install
```

### 2. Configure as variáveis de ambiente

Crie um arquivo `.env` na raiz do projeto com o seguinte conteúdo:

```
PORT=3000
JWT_SECRET=ChaveSuperSecreta
```

### 3. Execute as migrações do Prisma para criar o banco

```bash
npx prisma migrate dev --name init
```

### 4. Rode a seed para criar o usuário admin

```bash
npx ts-node prisma/seed.ts
```

### 5. Inicie o servidor

```bash
npm run dev
```

Servidor rodando em: [http://localhost:3000](http://localhost:3000)

---

## 🔗 Endpoints principais

### 👤 Usuários

- `POST /users/register` — Registrar usuário comum (não admin)  
- `POST /users/login` — Login e obtenção do token JWT

**As rotas abaixo requerem autenticação e permissão de administrador:**

- `GET /users` — Listar todos os usuários (admin)  
- `GET /users/:id` — Obter usuário por ID (admin)  
- `PUT /users/:id` — Atualizar usuário (admin)  
- `DELETE /users/:id` — Deletar usuário (admin)  

### 📆 Compromissos (Appointments)

**Todas as rotas requerem autenticação (qualquer usuário logado):**

- `POST /appointments` — Criar compromisso  
- `GET /appointments` — Listar compromissos do usuário logado  
- `GET /appointments/:id` — Obter compromisso por ID (se for do usuário)  
- `PUT /appointments/:id` — Atualizar compromisso (se for do usuário)  
- `DELETE /appointments/:id` — Deletar compromisso (se for do usuário)  

---

## 🧪 Simulando o usuário admin

Use o seguinte login criado pela seed:

- **Email:** `admin@example.com`  
- **Senha:** `admin123`

Após login, copie o token JWT retornado e use nas requisições autenticadas:

```
Authorization: Bearer <token>
```

---

## 📜 Scripts úteis

```bash
npm run dev                     # Inicia o servidor em modo desenvolvimento (com nodemon)
npx prisma migrate dev --name <nome>   # Executa uma nova migração
npx ts-node prisma/seed.ts     # Executa a seed para criar o admin
```
