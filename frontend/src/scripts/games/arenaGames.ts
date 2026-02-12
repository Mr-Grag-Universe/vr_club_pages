import teamForceVideo from '@/assets/videos/team_force.mp4'
import spaceWarVideo from '@/assets/videos/space_war.mp4'
import elevatorsVideo from '@/assets/videos/elevators.mp4'
import portalsVideo from '@/assets/videos/portals.mp4'

import teamForceThumb from '@/assets/videos/thumb/team_force.jpg'
import spaceWarThumb from '@/assets/videos/thumb/space_war.jpg'
import elevatorsThumb from '@/assets/videos/thumb/elevators.jpg'
import portalsThumb from '@/assets/videos/thumb/portals.jpg'

import teamForceImg1 from '@/assets/images/games/arena/jpg/1.jpg'
import teamForceImg2 from '@/assets/images/games/arena/jpg/7.jpg'
import teamForceImg3 from '@/assets/images/games/arena/jpg/3.jpg'

import spaceWarImg1 from '@/assets/images/games/arena/jpg/2.jpg'
import spaceWarImg2 from '@/assets/images/games/arena/jpg/5.jpg'

import portalsImg1 from '@/assets/images/games/library/arena/portals-1.jpg'
import portalsImg2 from '@/assets/images/games/library/arena/portals-2.jpg'
import portalsImg3 from '@/assets/images/games/library/arena/portals-3.jpg'

import elevatorsImg1 from '@/assets/images/games/library/arena/elevators-1.jpg'
import elevatorsImg2 from '@/assets/images/games/library/arena/elevators-2.jpg'
import elevatorsImg3 from '@/assets/images/games/library/arena/elevators-3.jpg'

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
    features: ['12 карт', 'Реалистичное оружие'],
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
    features: ['Sci-Fi обстановка', 'Телепорты'],
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
    features: ['Вертикальный геймплей', 'Реалистичное оружие', 'Лифты'],
    videoUrl: elevatorsVideo,
    thumbnail: elevatorsThumb,
    screenshots: [
      elevatorsImg1,
      elevatorsImg2,
      elevatorsImg3
    ],
    color: '#10b981'
  },
  {
    id: 'portals',
    name: 'Portals',
    genre: 'Arcade Shooter',
    description: 'Аркадный шутер с лифтами и телепортами',
    features: ['Вертикальный геймплей', 'Аркадная механика', 'Телепорты', 'Оружие на локации'],
    videoUrl: portalsVideo,
    thumbnail: portalsThumb,
    screenshots: [
      portalsImg1,
      portalsImg2,
      portalsImg3
    ],
    color: '#f59e0b'
  }
]