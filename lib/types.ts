export interface Todo {
  id: string
  title: string
  description?: string
  completed: boolean
  priority: "low" | "medium" | "high"
  category: string
  createdAt: Date
  updatedAt: Date
}
