import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
    schema: 'https://gql.dev.sajankumarv.tech/graphql',
    documents: ['src/**/*.{ts,tsx}'],
    generates: {
        './src/libs/__generated__/': {
            preset: 'client',
            plugins: [],
            config: {
                useTypeImports: true,
            },
            presetConfig: {
                gqlTagName: 'gql',
            },
        },
    },
    ignoreNoDocuments: true,
};

export default config;
