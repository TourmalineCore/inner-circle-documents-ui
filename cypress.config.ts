import { defineConfig } from 'cypress'
import { downloadFile } from 'cypress-downloadfile/lib/addPlugin'
import { rm } from 'fs'

// eslint-disable-next-line import/no-default-export  
export default defineConfig({
  e2e: {  
    viewportWidth: 1200,  
    viewportHeight: 660,
    specPattern: `cypress/e2e/**/*.cy.js`,
    baseUrl: `https://tourmalinecore.github.io/React-Admin-Template`,
    video: false,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    setupNodeEvents(on, config) {},
  },
  component: {  
    video: false,
    devServer: {
      framework: `react`,
      bundler: `vite`,
    },
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    setupNodeEvents(on, config) {
      on(`task`, {
        downloadFile, 
      }),
      on(`task`, {
        deleteFolder(folderName) {
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          return new Promise((resolve, reject) => {
            rm(folderName, {
              maxRetries: 10,
              recursive: true, 
            }, () => {
              resolve(null)
            })
          })
        },
      })
    },
  },
})
