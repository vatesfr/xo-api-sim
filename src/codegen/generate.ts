#!/usr/bin/env node

import { promises as fs } from 'fs'
import path from 'path'
import { execSync } from 'child_process'

async function generateRoutes() {
  console.log('Generating routes from swagger.json...')
  
  // Create output directory
  const outputDir = path.join(__dirname, '../api')
  await fs.mkdir(outputDir, { recursive: true })
  
  // Run openapi-typescript-codegen
  try {
    execSync(`npx openapi-typescript-codegen --input ${path.join(__dirname, '../../swagger.json')} \
      --output ${outputDir} \
      --client none \
      --useOptions \
      --useUnionTypes`, 
      { stdio: 'inherit' }
    )
    
    console.log('Route generation complete!')
  } catch (error) {
    console.error('Error generating routes:', error)
    process.exit(1)
  }
}

generateRoutes()
