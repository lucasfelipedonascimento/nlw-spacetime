# Descrição

Este código é um exemplo básico de um servidor HTTP usando o framework [Fastify](https://www.fastify.io/), que retorna dados de usuários armazenados em um banco de dados utilizando a ORM [Prisma](https://www.prisma.io/).

# Instalação e Execução

Antes de executar o código, você precisa instalar as dependências necessárias. Certifique-se de ter o Node.js instalado em sua máquina. Em seguida, execute o seguinte comando no terminal:

Para executar o servidor, execute o seguinte comando no terminal:

O servidor será iniciado e estará disponível em `http://localhost:3333/users`. Quando você acessar esse endpoint, uma lista de usuários será retornada em formato JSON.

# Como funciona o código

O código começa importando o framework Fastify e a biblioteca PrismaClient, que é usada para acessar o banco de dados. Em seguida, o código cria uma instância do objeto Fastify e uma instância do objeto PrismaClient.

O código define uma rota `/users` que retorna uma lista de usuários armazenados no banco de dados. A rota é definida como uma função assíncrona, que usa o método `prisma.user.findMany()` para buscar todos os usuários no banco de dados e retorná-los.

Finalmente, o servidor é iniciado na porta `3333` usando o método `app.listen()` do Fastify. Quando o servidor é iniciado com sucesso, uma mensagem é exibida no console indicando a URL onde o servidor está sendo executado.
