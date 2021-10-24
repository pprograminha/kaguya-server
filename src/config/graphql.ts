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
  paths: {
    typeDefs: path.resolve(rootPath, '*.gql'),
    resolvers: path.resolve(rootPath, '*.resolvers.ts'),
  },
};

export { graphQLConfig };
