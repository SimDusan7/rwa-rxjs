import { fromEvent, interval, last, map, scan, switchMap, takeWhile, tap } from "rxjs";
import { State } from "./Interfaces/State";
import { dot, moveDot, resetDotSize, setTimerText, updatedDot } from "./izgledIgre";
import { isNotGameOver, showResult } from "./pretrazivanje";

const makeInterval = (val: State) =>
  interval(val.intrvl).pipe(
    map(v => 5 - v),
    tap(setTimerText)
  );
const nicknameInput = document.getElementById('nickname') as HTMLInputElement;
const showResultsButton = document.getElementById('showResultsButton');
const searchScoreButton = document.getElementById('searchScoreButton');
const gameState: State = { score: 0, intrvl: 500 };
const gameContainer = document.getElementById('gameContainer');
const gameResultContainer = document.getElementById('gameResult');
const searchUserInput = document.getElementById('searchUserInput');
const nextState = (acc: State) => ({
  score: (acc.score += 1),
  intrvl: acc.score % 3 === 0 ? (acc.intrvl -= 50) : acc.intrvl,
});

if(dot===undefined){
  console.log("dot is undefined");
}
let finalState:State;
const game$ = fromEvent(dot, 'mouseover').pipe(
  tap(moveDot),
  scan < Event,
  State > (nextState, gameState),
  tap(state => {
    updatedDot(state.score);
    finalState = state;
  }),
  switchMap(makeInterval),
  tap(resetDotSize),
  takeWhile(isNotGameOver),
);
game$.subscribe(
  n => {},
  e => {},
  () =>{
    // const gameResultContainer = document.getElementById('gameResult');
    gameResultContainer.style.display = 'block';
    console.log(finalState);
    gameContainer.style.display='none';
    showResultsButton.addEventListener('click', () => {
      showResult(nicknameInput.value,finalState.score);
    });
    searchScoreButton.addEventListener('click' ,() =>{
      searchUserInput.style.display = 'block';   
    })
  }
);

