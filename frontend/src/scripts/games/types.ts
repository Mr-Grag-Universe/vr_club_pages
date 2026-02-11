// Если хочешь типы в отдельном файле
export interface ArenaGame {
  id: string
  name: string
  genre: string
  description: string
  features: string[]
  videoUrl: string
  screenshots: string[]
  color: string
}

export interface ZoneGame {
  id: number
  name: string
  genre: string
  steamUrl: string
  image: string
  actionText?: string
}