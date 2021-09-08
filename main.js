import { players } from './player.js';
import { playerForm } from './player-form.js';
import { stats } from './stats.js';

document.addEventListener('DOMContentLoaded', () => {
  let main = document.querySelector('main');
  let aside = document.querySelector('aside');
  
  stats.render(aside);
  players.render(main);
  playerForm.render(aside);
});
