// Run nps scripts in parallel using concurrently
function parallel(scripts, killOthers = false) {
  const names = scripts.join(',');
  const quotedScripts = `"nps ${scripts.join('" "nps ')}"`;
  const killFlag = killOthers ? '--kill-others ' : '';
  return `concurrently ${killFlag} --prefix "[{name}]" --names "${names}" ${quotedScripts}`;
}

// Main scripts files, please use description field
const scripts = {
  default: {
    default: {
      description: 'Run webpack and server in watch mode',
      script: 'NODE_ENV=development nodemon ./lib/server.js'
    }
  },

  server: {
    default: {
      description: 'Run server with watch enabled',
      script: 'NODE_ENV=development nodemon ./lib/server.js'
    },
    run: {
      description: 'Run the compiled version',
      script: 'node ./lib/server.js'
    }
  },

  clean: {
    default: {
      description: 'Clean all folders',
      script: parallel(['clean.publicJS', 'clean.publicCSS', 'clean.report'])
    },

    report: {
      description: 'Clean /report folder',
      script: 'rimraf report/**/*'
    }
  }
};

module.exports = { scripts };
