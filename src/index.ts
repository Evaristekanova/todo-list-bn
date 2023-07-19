import { ApolloServer } from "apollo-server";
import { context } from "./context/context";

// 1
import { schema } from "./schema/schema";
export const server = new ApolloServer({
  schema,
  context,
});

const port = 3000;
// 2
server.listen({ port }).then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
