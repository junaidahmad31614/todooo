import { TodoList } from "@/components/todo-list"
import { CheckSquare } from "lucide-react"

export default function Page() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
      <div className="container max-w-4xl py-8">
        <header className="mb-8 text-center">
          <div className="mb-4 inline-flex items-center justify-center rounded-full bg-primary/10 p-3">
            <CheckSquare className="h-8 w-8 text-primary" />
          </div>
          <h1 className="text-4xl font-bold tracking-tight text-balance">Todo App</h1>
          <p className="mt-2 text-lg text-muted-foreground text-balance">Stay organized and get things done</p>
        </header>

        <main>
          <TodoList />
        </main>
      </div>
    </div>
  )
}
