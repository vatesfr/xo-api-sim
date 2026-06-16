// Simple in-memory data store for mock data
export class MockDataStore {
  private data: Record<string, any[]>

  constructor(initialData: Record<string, any[]> = {}) {
    this.data = { ...initialData }
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
