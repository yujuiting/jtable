const { name } = require('./package.json');

module.exports = {
  name,
  readme: 'readme.md',
  mode: 'modules',
  stripInternal: true,
  out: 'docs',
  exclude: '**/*+(index|.spec|.e2e).ts',
};
