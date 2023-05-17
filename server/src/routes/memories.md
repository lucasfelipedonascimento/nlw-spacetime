## Função memoriesRoutes

A função memoriesRoutes é uma função que recebe como parâmetro uma instância do FastifyInstance, que é um framework web que permite a criação de aplicações web com alta performance.

#### GET /memories

O método GET na rota **/memories** retorna uma **lista de memórias ordenadas** por **data de criação**, em ordem **crescente**. A lista de memórias é obtida a partir do banco de dados utilizando o ORM Prisma. A função map é utilizada para transformar as memórias em um objeto com as propriedades id, coverUrl e excerpt, sendo **excerpt** uma substring do conteúdo das memórias.

```tsx
app.get("/memories", async () => {
  const memories = await prisma.memory.findMany({
    orderBy: {
      createdAt: "asc",
    },
  });

  return memories.map((memory) => {
    return {
      id: memory.id,
      coverUrl: memory.coverUrl,
      excerpt: memory.content.substring(0, 115).concat("..."),
    };
  });
});
```

#### GET /memories/:id

O método GET na rota **/memories/:id** retorna uma única memória, indentificada pelo parâmetro **id** informado na URL.

```tsx
app.get("/memories/:id", async (request) => {
  const paramsSchema = z.object({
    id: z.string().uuid(),
  });

  const { id } = paramsSchema.parse(request.params);

  const memory = await prisma.memory.findUniqueOrThrow({
    where: {
      id,
    },
  });

  return memory;
});
```

#### POST /memories

O método POST na rota **/memories** cria uma nova memória no banco de dados. O corpo da requisição deve conter as propriedades **content, isPublic e coverUrl**. O valor de isPublic é opcional e por padrão é **false**. A função create do Prisma é utilizada para inserir a nova memória no banco de dados.

#### PUT /memories/:id

O método PUT na rota **/memories/:id** atualiza uma memória existente no banco de dados. O **id** da memória a ser atualizada é **informado na URL**. O corpo da requisição deve conter as propriedades **content, isPublic e coverUrl**. O valor de isPublic é opcional e por padrão é **false**. A função update do Prisma é utilizada para atualizar a memória no banco de dados.

```tsx
app.put("/memories/:id", async (request) => {
  const paramsSchema = z.object({
    id: z.string().uuid(),
  });

  const { id } = paramsSchema.parse(request.params);

  const bodySchema = z.object({
    content: z.string(),
    isPublic: z.coerce.boolean().default(false),
    coverUrl: z.string(),
  });

  const { content, isPublic, coverUrl } = bodySchema.parse(request.body);

  const memory = await prisma.memory.update({
    where: {
      id,
    },

    data: {
      content,
      coverUrl,
      isPublic,
    },
  });

  return memory;
});
```

#### DELETE /memories/:id

O método DELETE na rota **/memories/:id** deleta uma memória existente no banco de dados. O **id** da memória a ser deletada é **informado na URL**. A função delete do Prisma é utilizada para deletar a memória no banco de dados.

```tsx
app.delete("/memories/:id", async (request) => {
  const paramsSchema = z.object({
    id: z.string().uuid(),
  });

  const { id } = paramsSchema.parse(request.params);

  await prisma.memory.delete({
    where: {
      id,
    },
  });
});
```
