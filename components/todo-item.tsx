"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { MoreVertical, Trash2 } from "lucide-react"
import { cn } from "@/lib/utils"
import type { Todo } from "@/lib/types"

interface TodoItemProps {
  todo: Todo
  onToggle: (id: string, completed: boolean) => Promise<void>
  onDelete: (id: string) => Promise<void>
}

export function TodoItem({ todo, onToggle, onDelete }: TodoItemProps) {
  const [isLoading, setIsLoading] = useState(false)

  const handleToggle = async () => {
    setIsLoading(true)
    try {
      await onToggle(todo.id, !todo.completed)
    } finally {
      setIsLoading(false)
    }
  }

  const handleDelete = async () => {
    setIsLoading(true)
    try {
      await onDelete(todo.id)
    } finally {
      setIsLoading(false)
    }
  }

  const priorityColors = {
    low: "bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-300",
    medium: "bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-300",
    high: "bg-red-100 text-red-700 dark:bg-red-950 dark:text-red-300",
  }

  return (
    <div
      className={cn(
        "group flex items-start gap-4 rounded-lg border bg-card p-4 transition-all hover:shadow-md",
        todo.completed && "opacity-60",
      )}
    >
      <Checkbox checked={todo.completed} onCheckedChange={handleToggle} disabled={isLoading} className="mt-1" />
      <div className="flex-1 space-y-2">
        <div className="flex items-start justify-between gap-2">
          <h3 className={cn("font-semibold leading-relaxed text-pretty", todo.completed && "line-through")}>
            {todo.title}
          </h3>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 opacity-0 transition-opacity group-hover:opacity-100"
                disabled={isLoading}
              >
                <MoreVertical className="h-4 w-4" />
                <span className="sr-only">Open menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={handleDelete} className="text-red-600">
                <Trash2 className="mr-2 h-4 w-4" />
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        {todo.description && <p className="text-sm text-muted-foreground leading-relaxed">{todo.description}</p>}
        <div className="flex flex-wrap items-center gap-2">
          <Badge variant="secondary" className="text-xs">
            {todo.category}
          </Badge>
          <Badge className={cn("text-xs", priorityColors[todo.priority])}>{todo.priority}</Badge>
        </div>
      </div>
    </div>
  )
}
