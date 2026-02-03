export interface ZoneGame {
  id: number
  name: string
  genre: string
  steamUrl: string
  image: string
  actionText?: string  // Опционально, если захочешь вернуть кастомные тексты
}

export const zonesGames: ZoneGame[] = [
  {
    id: 1,
    name: 'Half-Life: Alyx',
    genre: 'Action',
    steamUrl: 'https://store.steampowered.com/app/546560/HalfLife_Alyx/',
    image: '/images/games/hla.jpg',
    actionText: 'ACTIVATE'
  },
  {
    id: 2,
    name: 'Beat Saber',
    genre: 'Rhythm',
    steamUrl: 'https://store.steampowered.com/app/620980/Beat_Saber/',
    image: '/images/games/beat_saber.jpg',
    actionText: 'LAUNCH'
  },
  {
    id: 3,
    name: 'Pavlov VR',
    genre: 'Shooter',
    steamUrl: 'https://store.steampowered.com/app/555160/Pavlov_VR/',
    image: '/images/games/pavlov.jpg',
    actionText: 'CONNECT'
  },
  {
    id: 4,
    name: 'Superhot VR',
    genre: 'Puzzle',
    steamUrl: 'https://store.steampowered.com/app/617830/SUPERHOT_VR/',
    image: '/images/games/superhot.jpg',
    actionText: 'RUN'
  },
  {
    id: 5,
    name: 'Vacation Simulator',
    genre: 'Simulation',
    steamUrl: 'https://store.steampowered.com/app/726830/Vacation_Simulator/',
    image: '/images/games/vacation_sim.jpg',
    actionText: 'INITIALIZE'
  },
  {
    id: 6,
    name: 'Elven Assassin',
    genre: 'Tower Defense',
    steamUrl: 'https://store.steampowered.com/app/503770/Elven_Assassin/',
    image: '/images/games/elven_assasin.jpg',
    actionText: 'DEPLOY'
  },
  {
    id: 7,
    name: 'Phasmophobia',
    genre: 'Horror',
    steamUrl: 'https://store.steampowered.com/app/739630/Phasmophobia/',
    image: '/images/games/phasmo.jpg',
    actionText: 'ENTER'
  },
  {
    id: 8,
    name: 'Serious Sam 3: BFE',
    genre: 'Action-Shooter',
    steamUrl: 'https://store.steampowered.com/app/567670/Serious_Sam_3_VR_BFE/',
    image: '/images/games/serious_sam.jpg',
    actionText: 'SHOOT'
  },
  // ... добавь остальные 32+ игры по аналогии
]

// Опционально: можно добавить категории для фильтров
export const gameGenres = [
  'All',
  'Action',
  'Shooter',
  'Horror',
  'Rhythm',
  'Puzzle',
  'Simulation',
  'Tower Defense',
  'Fighting',
  'Adventure'
] as const

export type GameGenre = typeof gameGenres[number]