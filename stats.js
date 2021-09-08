import { pubsub } from './pubsub.js';

export const stats = {
  render: container => {
    let d = document.createElement('div');
    d.className = 'stats-container';
    container.appendChild(d);

    let p = document.createElement('p');
    p.className = 'player-count';
    p.innerHTML = `0 players in list`;
    d.appendChild(p);

    pubsub.subscribe('playersUpdated', stats.playersUpdated);
    console.log('STATS: listening for playersUpdated events');

    pubsub.subscribe('playerDeleted', stats.playersUpdated);
  },
  playersUpdated: list => {
    console.log(
      `STATS: I hear that the player list now has ${list.length} names.`
    );
    document.querySelector(
      '.player-count'
    ).innerText = `${list.length} players in list`;
  }
};
