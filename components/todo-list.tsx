"use client"

import { useState } from "react"
import { TodoItem } from "@/components/todo-item"
import { AddTodoDialog } from "@/components/add-todo-dialog"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CheckCircle2, Circle, ListTodo } from "lucide-react"
import type { Todo } from "@/lib/types"

export function TodoList() {
  const [todos, setTodos] = useState<Todo[]>([])
  const [filter, setFilter] = useState<"all" | "active" | "completed">("all")

  const handleAddTodo = async (todoData: {
    title: string
    description: string
    priority: string
    category: string
  }) => {
    const newTodo: Todo = {
      id: crypto.randomUUID(),
      title: todoData.title,
      description: todoData.description,
      completed: false,
      priority: todoData.priority as "low" | "medium" | "high",
      category: todoData.category,
      createdAt: new Date(),
      updatedAt: new Date(),
    }
    setTodos([newTodo, ...todos])
  }

  const handleToggleTodo = async (id: string, completed: boolean) => {
    setTodos(todos.map((todo) => (todo.id === id ? { ...todo, completed, updatedAt: new Date() } : todo)))
  }

  const handleDeleteTodo = async (id: string) => {
    setTodos(todos.filter((todo) => todo.id !== id))
  }

  const filteredTodos = todos.filter((todo) => {
    if (filter === "active") return !todo.completed
    if (filter === "completed") return todo.completed
    return true
  })

  const stats = {
    total: todos.length,
    active: todos.filter((t) => !t.completed).length,
    completed: todos.filter((t) => t.completed).length,
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="space-y-1">
          <h2 className="text-2xl font-bold tracking-tight">My Tasks</h2>
          <p className="text-sm text-muted-foreground">
            {stats.active} active, {stats.completed} completed
          </p>
        </div>
        <AddTodoDialog onAdd={handleAddTodo} />
      </div>

      <Tabs value={filter} onValueChange={(v) => setFilter(v as typeof filter)}>
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="all" className="gap-2">
            <ListTodo className="h-4 w-4" />
            All ({stats.total})
          </TabsTrigger>
          <TabsTrigger value="active" className="gap-2">
            <Circle className="h-4 w-4" />
            Active ({stats.active})
          </TabsTrigger>
          <TabsTrigger value="completed" className="gap-2">
            <CheckCircle2 className="h-4 w-4" />
            Completed ({stats.completed})
          </TabsTrigger>
        </TabsList>
      </Tabs>

      <div className="space-y-3">
        {filteredTodos.length === 0 ? (
          <div className="rounded-lg border border-dashed p-12 text-center">
            <ListTodo className="mx-auto h-12 w-12 text-muted-foreground/50" />
            <h3 className="mt-4 font-semibold">No tasks found</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              {filter === "all" ? "Get started by creating your first task" : `No ${filter} tasks`}
            </p>
          </div>
        ) : (
          filteredTodos.map((todo) => (
            <TodoItem key={todo.id} todo={todo} onToggle={handleToggleTodo} onDelete={handleDeleteTodo} />
          ))
        )}
      </div>
    </div>
  )
}
