import path from 'path';

const rootPath = path.resolve(
  __dirname,
  '..',
  'modules',
  '**',
  'infra',
  'http',
  'graphql',
);

const graphQLConfig = {
  typeDefs: {
    path: path.resolve(rootPath, '*.gql'),
  },
  resolvers: {
    path: path.resolve(rootPath, '*.resolvers.ts'),
  },
};

export { graphQLConfig };
