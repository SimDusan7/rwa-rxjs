import { Observable, debounceTime, filter, from, fromEvent, map, sampleTime, switchMap } from "rxjs";
import { User } from "./Interfaces/User";
const gameContainer = document.getElementById('gameContainer');
const nicknameInput = document.getElementById('nickname') as HTMLInputElement;
const resultsContainer = document.getElementById('resultsContainer');

export const isNotGameOver = (intervalValue: number) => intervalValue >= 0;


export const showResult = (tnickname:string, finalScore:number)=>{
    tnickname = nicknameInput.value;
    const trenutniFinalScore = finalScore
    gameContainer.style.display = 'none';
    //gameResult.style.display = 'none';
    fetch('http://localhost:3000/users/')
      .then(response => response.json())
      .then(data => {
        const users: User[] = data;
        const formattedUsers = users.map((user: User) => `<p>${user.nickname}: ${user.score}</p>`).join('');
        const finalFormattedUsers = `<p>${tnickname}: ${trenutniFinalScore}</p>${formattedUsers}`;
        console.log(finalFormattedUsers);
        resultsContainer.innerHTML = finalFormattedUsers;
      })
      .catch(error => {
        console.error('Greška: ' + error);
      });
}
const URL = "http://localhost:3000/users"

function getUsers(): Observable<User[]> {
  const promise = fetch(URL)
    .then(response => {
      if (!response.ok) {
        throw new Error("Error fetching users");
      } else {
        return response.json();
      }
    });

  return from(promise);
}
export function getUserByNickname(nickname: string): Observable<User[]> {
  return getUsers().pipe(
    map((users:User[]) => users.filter(user => user.nickname === nickname))
  );
}
function createSuggestion(){
  const inputEl = document.getElementById('searchUser');
  const searchResultEl = document.getElementById('searchResult');

  fromEvent(inputEl, "input")
    .pipe(
      debounceTime(500),
      sampleTime(200),
      map((ev: InputEvent) => (<HTMLInputElement>ev.target).value),
      filter((txt: string) => txt.length >= 3),
      switchMap(nickname => getUserByNickname(nickname))
    )
    .subscribe(user => {
      if (user) {
        const userString = user.map((user:User)=>`${user.nickname}:${user.score}`);
        searchResultEl.textContent = `Pronađeni korisnici: ${userString.join(', ')}`;
      } else {
        searchResultEl.textContent = 'Korisnik nije pronađen';
      }
    });
}
createSuggestion();
