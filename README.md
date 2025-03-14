# Frontend - XP earns

## Requisitos

- Node.js (versão recomendada: 18+)
- Vite (gerenciado pelo `package.json`)
- Arquivo `.env` para configuração da API

## Instalação e Configuração

1. Clone o repositório:
   ```sh
   git clone https://github.com/ronerog/frontend-waffle
   cd frontend-the-news
   ```

2. Instale as dependências:
   ```sh
   npm install
   ```

3. Configure o arquivo `.env`:
   Crie um arquivo `.env` na raiz do projeto e adicione:
   ```env
   VITE_API_URL= Link da sua API
   ```

4. Execute a aplicação em modo desenvolvimento:
   ```sh
   npm run dev
   ```

5. Para criar a build para produção:
   ```sh
   npm run build
   ```

6. Para visualizar a build antes de hospedar:
   ```sh
   npm run preview
   ```

O frontend estará rodando por padrão em `http://localhost:5173`. Caso esteja hospedado na Vercel, acesse pelo link configurado no deploy.

