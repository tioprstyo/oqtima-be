import express from 'express';
import morgan from 'morgan';
import db from './modules/db';
import { ApolloServer } from 'apollo-server-express';
import { ApolloServerPluginDrainHttpServer } from 'apollo-server-core';
import http from 'http';
import schema from './graphql/schema';
import resolvers from './graphql/resolvers';

const app = express();
app.use(morgan('dev')); // logger

app.get('/', async (req, res) => {
  const cardData = await db.cardData.findMany();
  res.json(cardData);
});

const startServer = async () => {
  const port = Number(process.env.PORT ?? 8080);
  const httpServer = http.createServer(app);
  const server = new ApolloServer({
    typeDefs: schema,
    resolvers: resolvers,
    context: async ({ req }) => ({ token: req.headers.token }),
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
  });
  await server.start();
  server.applyMiddleware({ app });
  await new Promise<void>((resolve) => httpServer.listen({ port, host: '0.0.0.0' }, resolve));
  console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`);
};
startServer()

// app.listen(port, '0.0.0.0', () => {
//   console.log(`Server running at http://localhost:${port}`);
// });
