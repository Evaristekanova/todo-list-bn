import {
  objectType,
  extendType,
  nonNull,
  stringArg,
  booleanArg,
  intArg,
} from "nexus";

export const TodoQuery = objectType({
  name: "Todo",
  definition(t) {
    t.nonNull.int("id");
    t.nonNull.string("title");
    t.nonNull.boolean("done");
  },
});

export const Query = extendType({
  type: "Query",
  definition(t) {
    t.nonNull.list.nonNull.field("todos", {
      type: "Todo",
      resolve: (_, __, { prisma }) => {
        return prisma.todo.findMany();
      },
    });
  },
});

export const Mutation = extendType({
  type: "Mutation",
  definition(t) {
    t.nonNull.field("createTodo", {
      type: "Todo",
      args: {
        title: nonNull(stringArg()),
      },
      resolve: (_, { title }, { prisma }) => {
        return prisma.todo.create({
          data: {
            title,
          },
        });
      },
    });

    t.nonNull.field("updateTodo", {
      type: "Todo",
      args: {
        id: nonNull(intArg()),
      },
      resolve: async(_, { id }, { prisma }) => {
        const todo = await prisma.todo.findUnique({
          where: {
            id: id,
          },
        });

        if (!todo) {
          throw new Error(`Todo with ID ${id} not found`);
        }

        return await prisma.todo.update({
          where: {
            id: id,
          },
          data: {
            done: !todo.done, // Toggle the value of the "done" field
          },
        });
      },
    });

    t.nonNull.field("deleteTodo", {
      type: "Todo",
      args: {
        id: nonNull(intArg()),
      },
      resolve: async (_, { id }, { prisma }) => {
        return await prisma.todo.delete({
          where: {
            id: id,
          }
        });
      }
    });
  },
});
