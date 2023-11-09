import { Howl } from 'howler';
import clickSound from "./audio/click-sound.ogg";
import vibes from "./audio/Vibes.mp3";

let resolveClickSound: (arg0: Howl) => Howl | void;
let resolveVibes: (arg0: Howl) => Howl | void;

export const clickSoundPromise = new Promise<Howl>((resolve, reject): void => {
    resolveClickSound = resolve;
})

export const vibesPromise = new Promise<Howl>((resolve, reject): void => {
    resolveVibes = resolve;
})

export function loadAudio() {
    console.log("Audio loaded!");
    resolveClickSound(
        new Howl({
        src: [clickSound],
        html5: true
      })
    )

    resolveVibes(
        new Howl({
        src: [vibes],
        volume: 0.2,
        loop: true,
        html5: true
      })
    )
    console.log(clickSoundPromise);
}