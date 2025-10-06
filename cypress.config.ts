import { defineConfig } from 'cypress';
import { downloadFile } from 'cypress-downloadfile/lib/addPlugin';
import { rm } from 'fs'

export default defineConfig({
  e2e: {
    viewportWidth: 1200,
    viewportHeight: 660,
    specPattern: 'cypress/e2e/**/*.cy.js',
    baseUrl: 'https://tourmalinecore.github.io/React-Admin-Template',
    video: false,
    setupNodeEvents(on, config) {},
  },
  component: {
    video: false,
    devServer: {
      framework: 'react',
      bundler: 'vite',
    },
    setupNodeEvents(on, config) {
      on('task', { downloadFile }),
      on('task', {
        deleteFolder(folderName) {
            return new Promise((resolve, reject) => {
              rm(folderName, { maxRetries: 10, recursive: true }, () => {
                  resolve(null)
              })
            })
        },
      })
    }
  },
});
