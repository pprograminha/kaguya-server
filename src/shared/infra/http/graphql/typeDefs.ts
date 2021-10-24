import { mergeTypeDefs } from '@graphql-tools/merge';
import { loadFilesSync } from '@graphql-tools/load-files';
import { graphQLConfig } from '@config/graphql';

const mergePath = loadFilesSync(graphQLConfig.paths.typeDefs);

const typeDefs = mergeTypeDefs(mergePath);

export { typeDefs };
