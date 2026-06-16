import { createMockVm, createMockHost } from './xo-utils'
import { v4 as uuid } from 'uuid'

// Simple in-memory data store for mock data
export class MockDataStore {
  private data: Record<string, any[]> = {}
  
  constructor() {
    // Initialize with some sample data
    this.addResource('vms', [
      createMockVm(uuid(), 'Ubuntu 22.04'),
      createMockVm(uuid(), 'Debian 12'),
      createMockVm(uuid(), 'Windows Server 2022')
    ])
    
    this.addResource('hosts', [
      createMockHost(uuid(), 'XCP-ng Host 1'),
      createMockHost(uuid(), 'XCP-ng Host 2')
    ])
  }
  
  addResource(resourceName: string, items: any[]) {
    this.data[resourceName] = items
  }
  
  getResource(resourceName: string) {
    return this.data[resourceName] || []
  }
  
  findById(resourceName: string, id: string) {
    const resource = this.data[resourceName]
    return resource?.find(item => item.id === id)
  }
  
  addItem(resourceName: string, item: any) {
    if (!this.data[resourceName]) {
      this.data[resourceName] = []
    }
    this.data[resourceName].push(item)
    return item
  }
  
  updateItem(resourceName: string, id: string, updates: any) {
    const resource = this.data[resourceName]
    const index = resource?.findIndex(item => item.id === id)
    if (index !== undefined && index !== -1) {
      resource[index] = { ...resource[index], ...updates }
      return resource[index]
    }
    return null
  }
  
  deleteItem(resourceName: string, id: string) {
    const resource = this.data[resourceName]
    const index = resource?.findIndex(item => item.id === id)
    if (index !== undefined && index !== -1) {
      const [deleted] = resource.splice(index, 1)
      return deleted
    }
    return null
  }
}

// Singleton instance for the application
export const dataStore = new MockDataStore()
