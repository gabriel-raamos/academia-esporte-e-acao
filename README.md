# Projeto da academia Esporte e Ação

Esse projeto tem o propósito de ser um site para a academia Esporte e Ação, que se localiza em Guaratinguetá, e deverá permitir que os usuários se cadastrem, que façam o pagamento para ingressar na academia, e que vejam os treinos que deverão ser montados por intrutores.

## Configuração do projeto

Para que a aplicação funcione, deverão ser seguidas algumas etapas:

### Clonar o projeto

Primeiro, você precisa clonar o repositório para o seu ambiente local. Para isso, utilize o seguinte comando:

```bash
git clone git@github.com:gabriel-raamos/pi-academia.git
```

Agora utilize um editor de código que seja de sua preferência.

### Instalar dependências

Ter o Node.js no sistema é algo essencial. Navegue até a raiz do projeto e execute o seguinte comando para que todas as dependências sejam instaladas:

```bash
npm install
```

### Variáveis de ambiente

Crie um arquivo chamado `.env` na raiz do projeto e adicione as seguintes variáveis de ambiente:

```makefile
MONGO_URL=urlmongo
ACCESS_TOKEN_SECRET=secret
```

### Inicializar

Para inicializar o servidor Mongoose e o React, utilize o comando abaixo:

```bash
npm run start-everything
```

## Conclusão

Esta aplicação conta com um backend que se baseia em uma API do MongoDB utilizando o Node.js e um front baseado em React e TailwindCSS. Ela oferece recursos de registro e autenticação de usuários, visualização de treinos por parte dos clientes e, por parte dos administradores, visualização dos pagamentos e dos usuário.