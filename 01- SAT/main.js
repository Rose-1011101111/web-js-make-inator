items = [];
var min = 0;
var max = 10;
var itemNum = 0;
var spacePressed = false;
document.addEventListener('keydown', keyTrue);
document.addEventListener('keyup', KeyFalse);

//creating an array of numbers
for(i=min; i<max; i++){
    items.push(i)
}

//returns a randimized array
var number;
var times;
function picker(array){
    times = array.length
    var result = [];
    for(i=0; i<times; i++){
        number = Math.floor(Math.random()*array.length);
        result.push(array[number]);
        array.splice(number, 1);
    }
    return result
}


itemList = picker(items);
console.log(itemList);
words = document.querySelectorAll('.word');


//hides all the words
for(i=0; i<words.length; i++){
    words[i].style.display = 'none';
}


//updates the visibility of the words, decides which word should be visible
update(false);
function update(notFirstTime){
    if(itemNum<max-min-1){
        document.getElementById('urGood').style.display = 'none';
        words[itemList[itemNum]].style.display = 'none';
        if(notFirstTime){
        itemNum++;
        }
        words[itemList[itemNum]].style.display = 'block';
    }else{
        document.getElementById('urGood').style.display = 'block';
        words[itemList[itemNum]].style.display = 'none';
    }
    
    console.log(itemNum);
}

function keyTrue(e){
    if(e.code=="Space"){
        if(!spacePressed){
            spacePressed = true;
            answerVisibility();
        }
    }
}
function KeyFalse(e){
    if(e.code=="Space"){
        spacePressed = false
        answerVisibility();
    }
}

//helper function for adding and removing style to and from the document
function changeStyle(style, addOrRemove){
    if(addOrRemove=='add'){
        document.getElementById('answerVisibility').innerHTML = ` ${style}`;
    }else{
        document.getElementById('answerVisibility').innerHTML -= ` ${style}`;
    }
}

//hides the previous word and shows the new one
answerVisibility();
function answerVisibility(){
    if(spacePressed){
        changeStyle('p{display: block;}', 'add');
        changeStyle('p:nth-child(2){display: none;}', 'remove');
    }else{
        changeStyle('p{display: block;}', 'remove');
        changeStyle('p:nth-child(2){display: none;}', 'add');
    }
}  

//Checks if min is less than max and changes the words
if(window.innerHeight > window.innerWidth){
    var errorMessage = '<p id="myError">Min must be less than Max<br>Min must be a number <br> greater than 0</p>';
}else{
    var errorMessage = '<p id="myError">Min must be less than Max<br>Min must be a number greater than 0</p>';
}

var errorAppeared = false;
const myError = document.getElementById('myError');
function applyMinMax(){
    min = document.getElementById('min').value-1;
    max = document.getElementById('max').value;
    if(min<max-1 && min >=0 ){
        document.getElementById('minLable').innerHTML = 'min:';
        errorAppeared = false;
        newWordRange();
    }else if(!errorAppeared){
        document.getElementById('minLable').innerHTML += errorMessage;
        errorAppeared = true;
    }else{
        errorAnimation();
    }
}


//creates a new range of words
function newWordRange(){
    items = [];
    for(i=min; i<max; i++){
    items.push(i)
    }
    itemList = picker(items);
    console.log(itemList);
    itemNum = 0;
    for(i=0; i<words.length; i++){
    words[i].style.display = 'none';
    }
    update(false);
    answerVisibility();
}
//creating the animation for the error
var scale = 1;
var color = 0;
var maxScale = 1.1;
var speed = 0.01;
var justBegun = true;
var colorSpeed = 255/((maxScale-scale)/speed);
function errorAnimation(){
    if(scale<maxScale && justBegun){
        scale+=speed;
        color+=colorSpeed;
    }else{
        if(scale>1){
            scale-=speed;
        color-=colorSpeed;
        justBegun = false;
        }
    }
    if(!(scale<=1 && !justBegun)){
        requestAnimationFrame(function(){
        document.getElementById('myError').style.color = `rgb(${color}, 0, 0)`;
        document.getElementById('myError').style.scale = `${scale}`;
        document.getElementById('myError').style.width = '30ch';
        document.getElementById('myError').style.marginRight = `${scale/2}px`;
        errorAnimation();
    });
    }else{
        justBegun=true;
    }
}

var temp = 255-(parseInt('05', 16));
console.log(temp.toString(16));