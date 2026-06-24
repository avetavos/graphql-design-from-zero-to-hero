export type StackBlitzProject = {
  title: string;
  description: string;
  template: 'node';
  files: Record<string, string>;
};

export function buildJsSrcdoc(code: string): string {
  const safe = code.replace(/<\/script/gi, '<\\/script');
  return (
    '<!doctype html><html><head><meta charset="utf-8">' +
    '<style>body{font-family:ui-monospace,SFMono-Regular,monospace;font-size:.85rem;margin:.6rem;white-space:pre-wrap;color:#111;background:#fff}</style></head>' +
    '<body><pre id="__out"></pre><script>(async function(){' +
    'var o=document.getElementById("__out");' +
    'function f(a){try{return typeof a==="object"?JSON.stringify(a):String(a)}catch(e){return String(a)}}' +
    'function w(){o.textContent+=Array.prototype.map.call(arguments,f).join(" ")+"\\n";}' +
    'console.log=w;console.info=w;console.warn=w;console.error=w;console.debug=w;' +
    'window.onerror=function(m){w("Error: "+m);return true;};' +
    'try{\n' + safe + '\n}catch(e){w("Error: "+((e&&e.message)||e));}' +
    '})();</script></body></html>'
  );
}

/**
 * Builds a minimal GraphQL Yoga (TypeScript) StackBlitz project so that
 * "Open in StackBlitz" runs a real GraphQL API over node http.
 *
 * Lesson-code convention:
 *   The lesson `code` is written to `schema.ts` and MUST export
 *   `typeDefs` (SDL string) and `resolvers` (a resolver map). The
 *   generated `index.ts` entry imports those two named exports, builds an
 *   executable schema with `createSchema`, serves it with `createYoga`, and
 *   mounts it on a node `http` server. Authors only ever edit the schema;
 *   the server wiring stays fixed. If a lesson omits one of the exports the
 *   starter still type-checks because `index.ts` references them directly.
 *
 * The function name and signature (`buildNodeProject(code: string)`) are kept
 * identical to the original so `NodeRunner.tsx` needs no change.
 */
export function buildNodeProject(code: string): StackBlitzProject {
  const indexTs = [
    "import { createServer } from 'node:http';",
    "import { createYoga, createSchema } from 'graphql-yoga';",
    "import { typeDefs, resolvers } from './schema';",
    '',
    '// Wiring is fixed — edit schema.ts (typeDefs + resolvers), not this file.',
    'const yoga = createYoga({',
    '  schema: createSchema({ typeDefs, resolvers }),',
    '});',
    '',
    'const server = createServer(yoga);',
    'const port = Number(process.env.PORT) || 4000;',
    'server.listen(port, () => {',
    "  console.log(`GraphQL API ready at http://localhost:${port}/graphql`);",
    '});',
    '',
  ].join('\n');

  const readme = [
    '# GraphQL Design — From Zero to Hero (runnable example)',
    '',
    'A minimal [GraphQL Yoga](https://the-guild.dev/graphql/yoga-server) server in TypeScript.',
    '',
    '## Run',
    '',
    '```bash',
    'npm install',
    'npm run dev',
    '```',
    '',
    'Then open the GraphiQL playground at <http://localhost:4000/graphql>.',
    '',
    '## How the lesson code slots in',
    '',
    '`schema.ts` is the lesson file. It must export:',
    '',
    '- `typeDefs` — your SDL as a string (or array of strings)',
    '- `resolvers` — the resolver map matching that SDL',
    '',
    '`index.ts` imports both, builds an executable schema with `createSchema`,',
    'and serves it with `createYoga` over node `http`. You only edit `schema.ts`.',
    '',
  ].join('\n');

  return {
    title: 'GraphQL Yoga example',
    description: 'GraphQL Design — From Zero to Hero — runnable GraphQL API',
    template: 'node',
    files: {
      'package.json': JSON.stringify(
        {
          name: 'graphql-yoga-example',
          type: 'module',
          scripts: {
            dev: 'tsx watch index.ts',
            start: 'tsx index.ts',
          },
          dependencies: {
            graphql: '^16.9.0',
            'graphql-yoga': '^5.7.0',
          },
          devDependencies: {
            tsx: '^4.19.0',
            typescript: '^5.6.0',
          },
        },
        null,
        2,
      ),
      'tsconfig.json': JSON.stringify(
        {
          compilerOptions: {
            target: 'ES2022',
            module: 'ES2022',
            moduleResolution: 'bundler',
            strict: true,
            esModuleInterop: true,
            skipLibCheck: true,
          },
        },
        null,
        2,
      ),
      'schema.ts': code,
      'index.ts': indexTs,
      'README.md': readme,
    },
  };
}
