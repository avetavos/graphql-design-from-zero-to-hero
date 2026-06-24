import { describe, it, expect } from 'vitest';
import { buildJsSrcdoc, buildNodeProject } from '../src/components/node-runner';

describe('buildJsSrcdoc', () => {
  it('embeds the user code and an output sink', () => {
    const doc = buildJsSrcdoc("console.log('hi')");
    expect(doc).toContain("console.log('hi')");
    expect(doc).toContain('__out');
    expect(doc).toContain('console.log');
  });
  it('neutralizes a nested </script> in user code', () => {
    expect(buildJsSrcdoc("var s='</script>'")).not.toContain("'</script>'");
  });
});

describe('buildNodeProject', () => {
  it('puts the lesson code at schema.ts with a node template', () => {
    const code = "export const typeDefs = `type Query { hello: String }`;";
    const p = buildNodeProject(code);
    expect(p.files['schema.ts']).toBe(code);
    expect(p.template).toBe('node');
    expect(p.files['package.json']).toContain('"type": "module"');
  });
  it('generates a GraphQL Yoga server entry that imports the schema', () => {
    const p = buildNodeProject('');
    expect(p.files['package.json']).toContain('graphql-yoga');
    expect(p.files['index.ts']).toContain('createYoga');
    expect(p.files['index.ts']).toContain("from './schema'");
    expect(p.files['README.md']).toBeTruthy();
  });
});
