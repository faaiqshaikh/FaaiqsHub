const customName = document.getElementById('customname');
const randomize = document.querySelector('.randomize');
const story = document.querySelector('.story');

function randomValueFromArray(array){
  const random = Math.floor(Math.random()*array.length);
  return array[random];
}

let insertX = ['Willy the Goblin', 'Big Daddy', 'Father Christmas'];
let insertY = ['the soup kitchen','Disneyland','the White House'];
let insertZ = ['spontaneously combusted','melted into a puddle on the sidewalk','turned into a slug and crawled away'];
const storyText = "It was 94 fahrenheit outside, so  went for a walk. When they got to :inserty:, they stared in horror for a few moments, then :insertz:. Bob saw the whole thing, but was not surprised — :insertx: weighs 300 pounds, and it was a hot day.";


randomize.addEventListener('click', result);

function result() {
    let newStory = storyText;
    let xItem = randomValueFromArray(insertX);
    let yItem = randomValueFromArray(insertY);
    let zItem = randomValueFromArray(insertZ);
    newStory = newStory.replace(/:insertx:/g, xItem);
    newStory = newStory.replace(/:inserty:/g, yItem);
    newStory = newStory.replace(/:insertz:/g, zItem);

    if(customName.value !== '') {
        const name = customName.value;
        newStory = newStory.replace(/Bob/g, name);
    }

    if(document.getElementById("uk").checked) {
        let stone = 300/14;
        let centigrade = ((94-32)*5)/9;
        const weight = Math.round(stone);
        newStory = newStory.replace(/300/g, weight)
        newStory = newStory.replace(/pounds/g, "stones");

        const temperature =  Math.round(centigrade);
        newStory = newStory.replace(/94/g, temperature);
        newStory = newStory.replace(/fahrenheit/g, "centigrade");       
    }

    story.textContent = newStory;
    story.style.visibility = 'visible';
}