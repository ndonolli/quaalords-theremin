// Import stylesheets
import './style.css';
import { derivative } from 'mathjs';

declare global {
    interface Window {
        webkitAudioContext: any;
        toggleSound: any;
    }
}
const xElem: HTMLElement = document.querySelector('#x');
const yElem: HTMLElement = document.querySelector('#y');
const zElem: HTMLElement = document.querySelector('#z');
const alphaElem: HTMLElement = document.querySelector('#alpha')
const betaElem: HTMLElement = document.querySelector('#beta');
const gammaElem: HTMLElement = document.querySelector('#gamma');
const btn: HTMLElement = document.querySelector('#main-btn')

const distanceElem: HTMLElement = document.querySelector('#distance');

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
    btn.innerHTML = 'turn that shit off'
  } else {
    lvl.gain.value = 0;
    muted = true;
    btn.innerHTML = 'start'
  }
}

window.toggleSound = toggleSound;


function handler(event: DeviceOrientationEvent) {
  const { beta, gamma } = event;
  const ratio = (87 - beta) / 86
  const fv = (55 + (1705 * ratio)); // 5 octaves between C1 and C6
  osc.frequency.value = fv;
  // alphaElem.innerHTML = alpha ? alpha.toString() : '';
  betaElem.innerHTML = beta ? beta.toString() : '';
  gammaElem.innerHTML = gamma ? gamma.toString() : '';
}

function getDistance(a: number, t: number): number {
  return 0.5 * a * Math.pow(t, 2);
}

window.addEventListener('deviceorientation', handler);