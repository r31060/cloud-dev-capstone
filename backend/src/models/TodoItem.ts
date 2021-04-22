export interface TodoItem {
  userId: string
  todoId: string
  createdAt: string
  name: string
  dueDate: string
  rating: string
  credit: string
  frequency: string
  done: boolean
  attachmentUrl?: string
}
