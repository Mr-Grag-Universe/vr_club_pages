import teamForceVideo from '@/assets/videos/team_force.mp4'
import spaceWarVideo from '@/assets/videos/space_war.mp4'
import elevatorsVideo from '@/assets/videos/elevators.mp4'
import portalsVideo from '@/assets/videos/portals.mp4'

import teamForceThumb from '@/assets/videos/thumb/team_force.jpg'
import spaceWarThumb from '@/assets/videos/thumb/space_war.jpg'
import elevatorsThumb from '@/assets/videos/thumb/elevators.jpg'
import portalsThumb from '@/assets/videos/thumb/portals.jpg'

import teamForceImg1 from '@/assets/images/games/arena/1.jpg'
import teamForceImg2 from '@/assets/images/games/arena/7.jpg'
import teamForceImg3 from '@/assets/images/games/arena/3.jpg'

import spaceWarImg1 from '@/assets/images/games/arena/2.jpg'
import spaceWarImg2 from '@/assets/images/games/arena/5.jpg'

export interface ArenaGame {
  id: string
  name: string
  genre: string
  description: string
  features: string[]
  videoUrl: string
  thumbnail: string  // Добавлено превью
  screenshots: string[]
  color: string
}

export const arenaGames: ArenaGame[] = [
  {
    id: 'team-force',
    name: 'Team Force',
    genre: 'Tactical Shooter',
    description: 'Командный шутер а-ля Counter-Strike. 12 карт для полного разнообразия',
    features: ['До 10 игроков', '12 карт', 'PvP', 'Свободное перемещение'],
    videoUrl: teamForceVideo,
    thumbnail: teamForceThumb,
    screenshots: [
      teamForceImg1,
      teamForceImg2,
      teamForceImg3
    ],
    color: '#ef4444'
  },
  {
    id: 'star-force',
    name: 'Star Force',
    genre: 'Space Shooter',
    description: 'Космический шутер в далекой-далекой галактике. Телепорты в наличии',
    features: ['Sci-Fi обстановка', 'Телепорты', 'PvE/PvP', 'Zero-G бои'],
    videoUrl: spaceWarVideo,
    thumbnail: spaceWarThumb,
    screenshots: [
      spaceWarImg1,
      spaceWarImg2
    ],
    color: '#8b5cf6'
  },
  {
    id: 'elevators',
    name: 'Elevators',
    genre: 'Vertical Shooter',
    description: 'Многоэтажный шутер с перемещениями между этажами и зданиями',
    features: ['Вертикальный геймплей', 'Динамичные бои', 'Кооператив', 'Лифты'],
    videoUrl: elevatorsVideo,
    thumbnail: elevatorsThumb,
    screenshots: [
      '/images/arena/elevators-1.jpg',
      '/images/arena/elevators-2.jpg'
    ],
    color: '#10b981'
  },
  {
    id: 'portals',
    name: 'Portals',
    genre: 'Arcade Shooter',
    description: 'Аркадный шутер с лифтами и телепортами',
    features: ['Аркадная механика', 'Телепорты', 'Быстрые сессии', 'Power-ups'],
    videoUrl: portalsVideo,
    thumbnail: portalsThumb,
    screenshots: [
      '/images/arena/portals-1.jpg',
      '/images/arena/portals-2.jpg'
    ],
    color: '#f59e0b'
  }
]