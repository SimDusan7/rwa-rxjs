const container = document.createElement("div");
document.body.appendChild(container);
function getRandomNumber(min: number, max: number): number {
    return Math.round(Math.random() * (max - min + 1)) + min;
    
  }
  console.log(getRandomNumber(1,1000));
  console.log(getRandomNumber(100,500));
const random = () => Math.random() * 300;
const elem = (id: string) => document.getElementById(id);
const setElementText = (elem:any,text:any) => (elem.innerHTML = text.toString());
const timer = document.getElementById('timer');

const setDotSize = (size: any) => {
    dot.style.height = `${size}px`;
    dot.style.width = `${size}px`;
};

export const dot = elem('dot');

export const updatedDot = (score: number) => {
    if(score%3===0){
        dot.style.backgroundColor=
        '#' + ((Math.random()*0xffffff)<<0).toString(16);
    }
     setElementText(dot,score);
};
export const setTimerText = (text: any)=>setElementText(timer,text);
export const moveDot = () =>{
    setDotSize(5);
    dot.style.transform = `translate(${random()}px,${random()}px)`;
};
export const resetDotSize = () => setDotSize(30);
