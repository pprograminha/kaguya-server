import { mergeResolvers } from '@graphql-tools/merge';
import { loadFilesSync } from '@graphql-tools/load-files';
import { graphQLConfig } from '@config/graphql';

const mergePath = loadFilesSync(graphQLConfig.paths.resolvers);

const resolvers = mergeResolvers(mergePath);

export { resolvers };
