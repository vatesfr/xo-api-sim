// Add Vates types to the project
import type { XoVm, XoHost, XoPool } from '@vates/types'

// Example usage of mock types
import { createMockVm, createMockHost } from './xo-utils'

// Create mock objects using our simplified utility
const exampleVm = createMockVm('vm-1')
const exampleHost = createMockHost('host-1')

// These objects maintain basic compatibility with XO types
// while avoiding the complexity of branded types


// This file demonstrates that we can use the actual XO types from the repo
