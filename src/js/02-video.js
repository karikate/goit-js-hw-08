import VimeoPlayer from '@vimeo/player';
import { throttle } from 'lodash';

const PLAYER_CURENT_TIME = 'videoplayer-current-time';

const iframeId = document.querySelector('#vimeo-player');
const player = new VimeoPlayer(iframeId);

player.on('timeupdate', throttle(onPlay, 1000));

function onPlay(data) {
  localStorage.setItem(PLAYER_CURENT_TIME, JSON.stringify(data.seconds));
}

const parsePlayStopTime = load(PLAYER_CURENT_TIME);

player.setCurrentTime(parsePlayStopTime).catch(function (error) {
  switch (error.name) {
    case 'RangeError':
      break;
    default:
      localStorage.removeItem(PLAYER_CURENT_TIME);
      break;
  }
});

function load(key) {
  try {
    const dataState = localStorage.getItem(key);
    return dataState === null ? undefined : JSON.parse(dataState);
  } catch (error) {
    console.error('Do not touch this value in Application: ', error.name);
  }
}
