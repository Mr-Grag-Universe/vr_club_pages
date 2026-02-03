import teamForceVideo from '@/assets/videos/team_force.mp4'
import spaceWarVideo from '@/assets/videos/space_war.mp4'
import elevatorsVideo from '@/assets/videos/elevators.mp4'
import portalsVideo from '@/assets/videos/portals.mp4'

import teamForceAudio from '@/assets/videos/audio/team_force.mp4'
import spaceWarAudio from '@/assets/videos/audio/space_war.mp4'
import elevatorsAudio from '@/assets/videos/audio/elevators.mp4'
import portalsAudio from '@/assets/videos/audio/portals.mp4'

import teamForceThumb from '@/assets/videos/thumb/team_force.jpg'
import spaceWarThumb from '@/assets/videos/thumb/space_war.jpg'
import elevatorsThumb from '@/assets/videos/thumb/elevators.jpg'
import portalsThumb from '@/assets/videos/thumb/portals.jpg'

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

export const arenaGames: ArenaGame[] = [
  {
    id: 'team-force',
    name: 'Team Force',
    genre: 'Tactical Shooter',
    description: 'Командный шутер а-ля Counter-Strike. 12 карт для полного разнообразия',
    features: ['До 10 игроков', '12 карт', 'PvP', 'Свободное перемещение'],
    videoUrl: teamForceVideo,
    screenshots: [
      '/images/arena/team-force-1.jpg',
      '/images/arena/team-force-2.jpg',
      '/images/arena/team-force-3.jpg'
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
    screenshots: [
      '/images/arena/star-force-1.jpg',
      '/images/arena/star-force-2.jpg'
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
    screenshots: [
      '/images/arena/portals-1.jpg',
      '/images/arena/portals-2.jpg'
    ],
    color: '#f59e0b'
  }
]