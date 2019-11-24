// Import stylesheets
import './style.css';
import { derivative } from 'mathjs';

declare global {
    interface Window {
        webkitAudioContext: any;
        toggleSound: any;
    }
}
const alphaElem: HTMLElement = document.querySelector('#alpha')
const betaElem: HTMLElement = document.querySelector('#beta');
const gammaElem: HTMLElement = document.querySelector('#gamma');
const btn: HTMLElement = document.querySelector('#main-btn')

const AudioContext = window.AudioContext || window.webkitAudioContext;
let audio = new AudioContext;
let osc = audio.createOscillator();
let lvl = audio.createGain();
lvl.gain.value = 0;
osc.connect(lvl);
lvl.connect(audio.destination);
let muted = true;
let started = false;

function toggleSound() {
  if (muted) {
    if (!started) {
      osc.start(0);
      started = true;
    }
    lvl.gain.value = 1;
    muted = false;
    btn.classList.add('active');
    btn.innerHTML = 'Turn that shit off!';
  } else {
    lvl.gain.value = 0;
    muted = true;
    btn.classList.remove('active');
    btn.innerHTML = 'Start';
  }
}

window.toggleSound = toggleSound;


function handler(event: DeviceOrientationEvent) {
  const { beta, gamma } = event;
  const ratio = (87 - beta) / 86
  const fv = (55 + (1705 * ratio)); // 5 octaves between C1 and C6
  osc.frequency.value = fv;
  betaElem.innerHTML = beta ? beta.toString() : '';
  gammaElem.innerHTML = gamma ? gamma.toString() : '';
}

window.addEventListener('deviceorientation', handler);