export interface ZoneGame {
  id: number
  name: string
  genre: string
  steamUrl: string
  image: string
  actionText?: string,
  available?: boolean,
}

export const zonesGames: ZoneGame[] = [
  {
    id: 1,
    name: 'Beat Saber',
    genre: 'Rhythm',
    steamUrl: 'https://store.steampowered.com/app/620980/Beat_Saber/',
    image: 'beat_saber.jpg',
    actionText: 'LAUNCH',
    available: true,
  },
  {
    id: 2,
    name: 'The Blu',
    genre: 'Experience',
    steamUrl: 'https://store.steampowered.com/app/451520/The_Blu/',
    image: 'the_blu.jpg',
    actionText: 'DIVE',
    available: true,
  },
  {
    id: 3,
    name: 'Elven Assassin',
    genre: 'Tower Defense',
    steamUrl: 'https://store.steampowered.com/app/503770/Elven_Assassin/',
    image: 'elven_assassin.jpg',
    actionText: 'DEPLOY',
    available: true,
  },
  {
    id: 4,
    name: 'Serious Sam 3: BFE',
    genre: 'Action-Shooter',
    steamUrl: 'https://store.steampowered.com/app/567670/Serious_Sam_3_VR_BFE/',
    image: 'serious_sam.jpg',
    actionText: 'SHOOT',
    available: true,
  },
  {
    id: 5,
    name: 'Richie\'s Plank Experience',
    genre: 'Experience',
    steamUrl: 'https://store.steampowered.com/app/517160/Richies_Plank_Experience/',
    image: 'richies_plank.jpg',
    actionText: 'WALK',
    available: true,
  },
  {
    id: 6,
    name: 'Superhot VR',
    genre: 'Puzzle',
    steamUrl: 'https://store.steampowered.com/app/322500/SUPERHOT/',
    image: 'superhot.jpg',
    actionText: 'RUN',
    available: true,
  },
  {
    id: 7,
    name: 'Job Simulator',
    genre: 'Simulation',
    steamUrl: 'https://store.steampowered.com/app/448280/Job_Simulator/',
    image: 'job_simulator.jpg',
    actionText: 'WORK',
    available: true,
  },
  {
    id: 8,
    name: 'Vacation Simulator',
    genre: 'Simulation',
    steamUrl: 'https://store.steampowered.com/app/726830/Vacation_Simulator/',
    image: 'vacation_sim.jpg',
    actionText: 'RELAX',
    available: true,
  },
  {
    id: 9,
    name: 'Fruit Ninja VR',
    genre: 'Arcade',
    steamUrl: 'https://store.steampowered.com/app/486780/Fruit_Ninja_VR/',
    image: 'fruit_ninja.jpg',
    actionText: 'SLICE',
    available: true,
  },
  {
    id: 10,
    name: 'Minecraft VR',
    genre: 'Sandbox',
    steamUrl: 'https://www.minecraft.net/',
    image: '/images/games/minecraft.jpg',
    actionText: 'BUILD'
  },
  {
    id: 11,
    name: 'Spider-Man: Far From Home',
    genre: 'Action',
    steamUrl: 'https://store.steampowered.com/app/1067800/SpiderMan_Far_From_Home_Virtual_Reality_Experience/',
    image: '/images/games/spiderman_ffh.jpg',
    actionText: 'SWING'
  },
  {
    id: 12,
    name: 'Rick and Morty: Virtual Rick-ality',
    genre: 'Adventure',
    steamUrl: 'https://store.steampowered.com/app/469610/Rick_and_Morty_Virtual_Rickality/',
    image: 'rick_morty.jpg',
    actionText: 'WUBBA'
  },
  {
    id: 13,
    name: 'Among Us VR',
    genre: 'Social',
    steamUrl: 'https://store.steampowered.com/app/1849900/Among_Us_VR/',
    image: '/images/games/among_us.jpg',
    actionText: 'SUSPECT'
  },
  {
    id: 14,
    name: 'Cooking Simulator VR',
    genre: 'Simulation',
    steamUrl: 'https://store.steampowered.com/app/1358140/Cooking_Simulator_VR/',
    image: 'cooking_sim.jpg',
    actionText: 'COOK',
    available: true,
  },
  {
    id: 15,
    name: 'Guns and Stories: Bulletproof VR',
    genre: 'Shooter',
    steamUrl: 'https://store.steampowered.com/app/544610/Guns_and_Stories_Bulletproof_VR/',
    image: '/images/games/guns_stories.jpg',
    actionText: 'DRAW',
    available: true,
  },
  {
    id: 16,
    name: 'Tilt Brush',
    genre: 'Creative',
    steamUrl: 'https://store.steampowered.com/app/327140/Tilt_Brush/',
    image: '//tilt_brush.jpg',
    actionText: 'PAINT'
  },
  {
    id: 17,
    name: 'Home - Spacewalk',
    genre: 'Experience',
    steamUrl: 'https://store.steampowered.com/app/610080/Home_A_Drone_Simulator/',
    image: '//home_spacewalk.jpg',
    actionText: 'FLOAT'
  },
  {
    id: 18,
    name: 'Loco Dojo',
    genre: 'Party',
    steamUrl: 'https://store.steampowered.com/app/667800/Loco_Dojo/',
    image: 'loco_dojo.jpg',
    actionText: 'PLAY',
    available: true,
  },
  {
    id: 19,
    name: 'Blaston',
    genre: 'Action',
    steamUrl: 'https://store.steampowered.com/app/1427890/Blaston/',
    image: 'blaston.jpg',
    actionText: 'DUEL',
    available: true,
  },
  {
    id: 20,
    name: 'Creed: Rise to Glory',
    genre: 'Fighting',
    steamUrl: 'https://store.steampowered.com/app/804490/Creed_Rise_to_Glory/',
    image: '//creed.jpg',
    actionText: 'FIGHT'
  },
  {
    id: 21,
    name: 'Gorilla Tag',
    genre: 'Social',
    steamUrl: 'https://store.steampowered.com/app/1533390/Gorilla_Tag/',
    image: 'gorilla_tag.jpg',
    actionText: 'CLIMB',
    available: true,
  },
  {
    id: 22,
    name: 'Pistol Whip',
    genre: 'Rhythm-Shooter',
    steamUrl: 'https://store.steampowered.com/app/1079800/Pistol_Whip/',
    image: 'pistol_whip.jpg',
    actionText: 'SHOOT'
  },
  {
    id: 23,
    name: 'Space Pirate Trainer',
    genre: 'Arcade',
    steamUrl: 'https://store.steampowered.com/app/418650/Space_Pirate_Trainer/',
    image: 'space_pirate.jpg',
    actionText: 'TRAIN',
    available: true,
  },
  {
    id: 24,
    name: 'Eagle Flight',
    genre: 'Simulation',
    steamUrl: 'https://store.steampowered.com/app/408110/Eagle_Flight/',
    image: '//eagle_flight.jpg',
    actionText: 'FLY'
  },
  {
    id: 25,
    name: 'GORN',
    genre: 'Fighting',
    steamUrl: 'https://store.steampowered.com/app/578170/GORN/',
    image: 'gorn.jpg',
    actionText: 'CRUSH',
    available: true,
  },
  {
    id: 26,
    name: 'Fancy Skiing 2',
    genre: 'Sports',
    steamUrl: 'https://store.steampowered.com/app/931090/Fancy_Skiing_VR/',
    image: '/images/games/fancy_skiing.jpg',
    actionText: 'SKI'
  },
  {
    id: 27,
    name: 'Hellsplit: Arena',
    genre: 'Fighting',
    steamUrl: 'https://store.steampowered.com/app/1039880/Hellsplit_Arena/',
    image: 'hellsplit.jpg',
    actionText: 'SLAY'
  },
  {
    id: 28,
    name: 'Until You Fall',
    genre: 'RPG',
    steamUrl: 'https://store.steampowered.com/app/858260/Until_You_Fall/',
    image: 'until_you_fall.jpg',
    actionText: 'RISE',
    available: true,
  },
  {
    id: 29,
    name: 'Drunkn Bar Fight',
    genre: 'Party',
    steamUrl: 'https://store.steampowered.com/app/528550/Drunkn_Bar_Fight/',
    image: 'drunkn_bar.jpg',
    actionText: 'BRAWL',
    available: true,
  },
  {
    id: 30,
    name: 'Private Property',
    genre: 'Shooter',
    steamUrl: 'https://store.steampowered.com/app/1420590/Private_Property/',
    image: '//private_property.jpg',
    actionText: 'DEFEND'
  },
  {
    id: 31,
    name: 'Arizona Sunshine',
    genre: 'Zombie-Shooter',
    steamUrl: 'https://store.steampowered.com/app/342180/Arizona_Sunshine/',
    image: '//arizona_sunshine.jpg',
    actionText: 'SURVIVE',
    available: true,
  },
  {
    id: 32,
    name: 'Arizona Sunshine 2',
    genre: 'Zombie-Shooter',
    steamUrl: 'https://store.steampowered.com/app/1540210/Arizona_Sunshine_2/',
    image: '//arizona_sunshine_2.jpg',
    actionText: 'SURVIVE',
    available: true,
  },
  {
    id: 33,
    name: 'After the Fall',
    genre: 'Zombie-Shooter',
    steamUrl: 'https://store.steampowered.com/app/751630/After_the_Fall/',
    image: '//after_the_fall.jpg',
    actionText: 'FREEZE'
  },
  {
    id: 34,
    name: 'The Walking Dead: Saints & Sinners',
    genre: 'Survival',
    steamUrl: 'https://store.steampowered.com/app/916840/The_Walking_Dead_Saints__Sinners/',
    image: 'walking_dead.jpg',
    actionText: 'SURVIVE'
  },
  {
    id: 35,
    name: 'Half-Life: Alyx',
    genre: 'Action',
    steamUrl: 'https://store.steampowered.com/app/546560/HalfLife_Alyx/',
    image: 'hla.jpg',
    actionText: 'ACTIVATE',
    available: true,
  },
  {
    id: 36,
    name: 'Boneworks & Bonelab',
    genre: 'Physics',
    steamUrl: 'https://store.steampowered.com/app/823500/BONEWORKS/',
    image: 'boneworks.jpg',
    actionText: 'PHYSICS',
    available: true,
  },
  {
    id: 37,
    name: 'STRIDE',
    genre: 'Parkour',
    steamUrl: 'https://store.steampowered.com/app/1292040/STRIDE/',
    image: 'stride.jpg',
    actionText: 'RUN',
    available: true,
  },
  {
    id: 38,
    name: 'Breachers',
    genre: 'Tactical-Shooter',
    steamUrl: 'https://store.steampowered.com/app/1922010/Breachers/',
    image: 'breachers.jpg',
    actionText: 'BREACH',
    available: true,
  },
  {
    id: 39,
    name: 'SURV1V3',
    genre: 'Zombie-Shooter',
    steamUrl: 'https://store.steampowered.com/app/722180/SURV1V3/',
    image: 'surv1v3.jpg',
    actionText: 'ENDURE',
    available: true,
  },
  {
    id: 40,
    name: 'Pavlov VR',
    genre: 'Shooter',
    steamUrl: 'https://store.steampowered.com/app/555160/Pavlov_VR/',
    image: 'pavlov.jpg',
    actionText: 'CONNECT',
    available: true,
  },
  {
    id: 41,
    name: 'PayDay 2 VR',
    genre: 'Action',
    steamUrl: 'https://store.steampowered.com/app/218620/PAYDAY_2/',
    image: 'payday2.jpg',
    actionText: 'HEIST',
    available: true,
  },
  {
    id: 42,
    name: 'Warhammer 40,000: Battle Sister',
    genre: 'Action',
    steamUrl: 'https://store.steampowered.com/app/1340990/Warhammer_40000_Battle_Sister/',
    image: '//warhammer.jpg',
    actionText: 'PURGE'
  },
  {
    id: 43,
    name: 'Phasmophobia',
    genre: 'Horror',
    steamUrl: 'https://store.steampowered.com/app/739630/Phasmophobia/',
    image: 'phasmo.jpg',
    actionText: 'ENTER',
    available: true,
  },
  {
    id: 44,
    name: 'Propagation VR',
    genre: 'Horror',
    steamUrl: 'https://store.steampowered.com/app/1363430/Propagation_VR/',
    image: 'propagation.jpg',
    actionText: 'HIDE'
  },
  {
    id: 45,
    name: 'The Forest VR',
    genre: 'Survival',
    steamUrl: 'https://store.steampowered.com/app/242760/The_Forest/',
    image: 'the_forest.jpg',
    actionText: 'CRAFT'
  },
  {
    id: 46,
    name: 'Forwarded',
    genre: 'Horror',
    steamUrl: '',
    image: '//forwarded.jpg',
    actionText: 'ESCAPE'
  },
  {
    id: 47,
    name: 'Don\'t Knock Twice',
    genre: 'Horror',
    steamUrl: '',
    image: '//dont_knock.jpg',
    actionText: 'KNOCK'
  },
  {
    id: 48,
    name: 'Five Nights at Freddy\'s: Help Wanted',
    genre: 'Horror',
    steamUrl: 'https://store.steampowered.com/app/732690/Five_Nights_at_Freddys_Help_Wanted/',
    image: 'fnaf.jpg',
    actionText: 'WATCH',
    available: true,
  }
]

// Категории для фильтров
export const gameGenres = [
  'Все',
  'Rhythm',
  'Experience',
  'Tower Defense',
  'Action-Shooter',
  'Puzzle',
  'Simulation',
  'Arcade',
  'Sandbox',
  'Action',
  'Adventure',
  'Social',
  'Creative',
  'Party',
  'Fighting',
  'Rhythm-Shooter',
  'Sports',
  'RPG',
  'Zombie-Shooter',
  'Survival',
  'Physics',
  'Parkour',
  'Tactical-Shooter',
  'Horror'
] as const

// Import and create a map of images
const images = import.meta.glob('/assets/images/games/library/zones/*.jpg', { eager: true });
const imageMap = Object.fromEntries(
  Object.entries(images).map(([key, value]) => {
    const imageName = key.split('/').pop().split('.')[0]; // Extract the image name without extension
    return [imageName, value]; // Create a { name: path } mapping
  })
);

// Update image paths in zonesGames
zonesGames.forEach(game => {
  const imageName = game.image.replace('.jpg', ''); // Remove the file extension for matching
  if (imageMap[imageName]) {
    game.image = imageMap[imageName].default; // Update the image path
  }
});

export type GameGenre = typeof gameGenres[number]