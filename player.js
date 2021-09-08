import { pubsub } from './pubsub.js';

export const players = {
  list: [],
  render: container => {
    let template = document.getElementById('playerListTemplate');
    let div = template.content.cloneNode(true);
    container.appendChild(div);
    let ul = document.querySelector('.player-container ul');
    ul.addEventListener('click', players.playerDeleted);

    console.log('Players: want to know if an player is added');
    pubsub.subscribe('playerAdded', players.playerAdded);
  },
  playerAdded: name => {
    console.log(`Players: I hear that ${name} was added`);
    let list = new Set(players.list);
    list.add(name);
    players.list = Array.from(list).sort();

    console.log('players: playersUpdated the list');
    pubsub.publish('playersUpdated', players.list);

    let ul = document.querySelector('.player-container ul');
    ul.innerHTML = '';
    let df = document.createDocumentFragment();
    players.list.forEach(name => {
      let li = document.createElement('li');
      li.innerText = name;
      df.appendChild(li);
    });
    ul.appendChild(df);
  },
  playerDeleted: ev => {
    let item = ev.target.closest('li');
    let name = item.textContent;
    players.list = players.list.filter(nm => nm !== name);
    item.parentElement.removeChild(item);
    console.log(`players: playerDeleted the ${name}`);
    pubsub.publish('playerDeleted', players.list);
  }
};
