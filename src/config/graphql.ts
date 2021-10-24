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
const envrionment = process.env.NODE_ENV || 'development';
const graphQLConfig = {
  paths: {
    typeDefs: path.resolve(rootPath, '*.gql'),
    resolvers: path.resolve(
      rootPath,
      envrionment === 'production' ? '*.resolvers.js' : '*.resolvers.ts',
    ),
  },
};

export { graphQLConfig };
