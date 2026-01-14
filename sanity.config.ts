import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { schemaTypes } from './sanity/schemaTypes'

export default defineConfig({
  name: 'yander-blog',
  title: 'Yander Blog',
  projectId: 's3r1d2vt',
  dataset: 'production',
  basePath: '/studio',
  plugins: [structureTool()],
  schema: { types: schemaTypes }
})
