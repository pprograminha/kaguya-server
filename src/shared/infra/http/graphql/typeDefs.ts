import { mergeTypeDefs } from '@graphql-tools/merge';
import { loadFilesSync } from '@graphql-tools/load-files';
import { graphQLConfig } from '@config/graphql';

const mergePath = loadFilesSync(graphQLConfig.typeDefs.path);

const typeDefs = mergeTypeDefs(mergePath);

export { typeDefs };
