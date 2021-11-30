require('esbuild')
  .build({
    bundle: true,
    treeShaking: true,
    entryPoints: [
      'src/index.ts',
      'src/modules/api.ts',
      'src/modules/helpers.ts',
      'src/modules/queries.ts',
      'src/modules/scripts.ts',
    ],
    entryNames: '[name]',
    outdir: 'dist',
    platform: 'node',
    target: 'node10',
    external: [
      'semi',
    ],
  }).catch(() => process.exit(1))
