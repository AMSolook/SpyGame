Telegram.WebApp.ready();  // اپ رو آماده می‌کنه
Telegram.WebApp.expand(); // صفحه رو تمام‌صفحه می‌کنه


const buttons = {
    cityMinuse: document.getElementById('minuse-button-city'),
    cityPlus: document.getElementById('plus-button-city'),
    spyMinuse: document.getElementById('minuse-button-spy'),
    spyPlus: document.getElementById('plus-button-spy'),
    timeMinuse: document.getElementById('minuse-button-time'),
    timePlus: document.getElementById('plus-button-time'),
    play: document.getElementById('play-button'),
    restartYes: document.getElementById('yes'),
    restartNo: document.getElementById('no'),
    reassignYes: document.getElementById('yes2'),
    reassignNo: document.getElementById('no2'),
    headerButtons: {
        parent: document.getElementById('header-button'),
        back: document.getElementById('back-button'),
        reassign: document.getElementById('reassign'),
    },
    categoryRow: document.getElementById('category'),
    hamburgerMenu: document.getElementById('hamburger-menu'),
    gameguide: document.getElementById('game-guide-button'),
    resetTheGame: document.getElementById('reset-the-game'),
    guideMultiplication: document.getElementById('guide-multiplication'),
    soundStatus: document.getElementById('sound-status'),
    playAgain: document.getElementById('play-again'),
    mainMenu: document.getElementById('go-main-menu'),
    stopGame: document.getElementById('stop-game'),
}

const categoryButton = {
    b0: {
        all: document.getElementById('sell-all'),
        none: document.getElementById('sell-none'),
    },
    b1: document.getElementById('cat-1'),
    b2: document.getElementById('cat-2'),
    b3: document.getElementById('cat-3'),
    b4: document.getElementById('cat-4'),
    b5: document.getElementById('cat-5'),
    b6: document.getElementById('cat-6'),
    b7: document.getElementById('cat-7'),
    b8: document.getElementById('cat-8'),
    b9: document.getElementById('cat-9'),
    b10: document.getElementById('cat-10'),
}

const inner = {
    city: document.getElementById('city-inner-number'),
    spy: document.getElementById('spy-inner-number'),
    time: document.getElementById('time-inner-number'),
    category: document.getElementById('category-name'),
}


let gameStat = {
    cityMember: 3,
    spyMember: 1,
    time: 3
}
const innerVariable = {
    city: JSON.parse(localStorage.getItem('cityM')) || gameStat.cityMember,
    spy: JSON.parse(localStorage.getItem('spyM')) || gameStat.spyMember,
    time: JSON.parse(localStorage.getItem('time')) || gameStat.time,
}

const numberOfMyCat = document.getElementById('popUp-board').children.length - 1;

let myWord = [];
let page1 = document.querySelector('main');
let page2 = document.querySelector('main2');
let page3 = document.querySelector('main3');
const restartDialog = document.getElementById('restart-dialog');
const reassignDialog = document.getElementById('reassign-dialog');
const categoryPopUp = document.getElementById('cat-popUp-container');
const navSidear = document.querySelector('nav');
const gameIsOver = document.getElementById('game-is-over');
const mainAudio = document.getElementById('main-audio');
const tenToOne = document.getElementById('ten-to-one'); // this is countdown audio 🤦‍♂️
const myGameWordsLength = (Object.keys(gameWords).length);
const page4 = document.querySelector('main4');
// -------------------------------------------------------------------------------------------
refreshCity();
refreshSpy();
refreshTime();
page1.classList.remove('none');
setTimeout(() => {
    page1.classList.add('fade-in');
}, 300);
let markedCatButtonsArrayVariable = JSON.parse(localStorage.getItem('markedCat')) || {};
let catSelectedIndex = JSON.parse(localStorage.getItem('catIndex')) || [];
isRandomCat();
isCatButtonsMarked();

let isMenuVisiblle = false;
buttons.hamburgerMenu.addEventListener('click', () => {
    if (isMenuVisiblle === false) {
        buttons.hamburgerMenu.classList.add('hamburger-menu2');
        navSidear.classList.remove('none');
        isMenuVisiblle = true;
        setTimeout(() => {
            document.getElementById('sidebar').classList.add('come-in-side');
            navSidear.classList.add('fade-in');
        }, 0);
    } else {
        buttons.hamburgerMenu.classList.remove('hamburger-menu2');
        navSidear.classList.remove('fade-in')
        document.getElementById('sidebar').classList.remove('come-in-side');
        isMenuVisiblle = false;
        setTimeout(() => {
            navSidear.classList.add('none');
        }, 400);
    }
});

let isMute = JSON.parse(localStorage.getItem('isMute'));
if (isMute === null) {
    isMute = 'yes';
}
soundChangeIcon();

function soundChangeIcon() {
    if (isMute === 'no') {
        buttons.soundStatus.innerHTML = '<img class="sound" src="img/sound-off.svg">';
        mainAudio.volume = 0.0;
        tenToOne.volume = 0.0;
        isMute = 'yes';
    } else {
        buttons.soundStatus.innerHTML = '<img class="sound" src="img/sound-on.svg">';
        mainAudio.volume = 1.0;
        tenToOne.volume = 1.0;
        isMute = 'no';
    }
}
buttons.soundStatus.addEventListener('click', () => {
    localStorage.setItem('isMute', JSON.stringify(`${isMute}`));
    soundChangeIcon();
})

navSidear.addEventListener('click', () => {

    buttons.hamburgerMenu.classList.remove('hamburger-menu2');
    navSidear.classList.remove('fade-in')
    document.getElementById('sidebar').classList.remove('come-in-side');
    isMenuVisiblle = false;
    setTimeout(() => {
        navSidear.classList.add('none');
    }, 400);
})
document.getElementById('sidebar').addEventListener('click', function (e) {
    e.stopPropagation();
})

buttons.gameguide.addEventListener('click', () => {
    buttons.hamburgerMenu.classList.add('none');
    document.getElementById('guide-popUp').classList.remove('none');
    setTimeout(() => {
        document.getElementById('guide-popUp').classList.add('fade-in');
    }, 0);
})
buttons.guideMultiplication.addEventListener('click', function(e) {
    e.stopPropagation();
    buttons.hamburgerMenu.classList.remove('none');
    document.getElementById('guide-popUp').classList.remove('fade-in');
    setTimeout(() => {
        document.getElementById('guide-popUp').classList.add('none');
    }, 500);
})
document.getElementById('guide-popUp').addEventListener('click', function (e) {
    e.stopPropagation();
})
buttons.resetTheGame.addEventListener('click', () => {
    window.localStorage.clear();
    window.location.reload();
})

buttons.cityMinuse.addEventListener('click', () => {
    if (innerVariable.city > 3) {
        innerVariable.city--;
    }
    while (innerVariable.city / 3 + 0.9 < innerVariable.spy) {
        buttons.spyMinuse.click();
    }
    refreshCity();
});

buttons.cityPlus.addEventListener('click', () => {
    if (innerVariable.city < 14) {
        innerVariable.city++;
    }
    refreshCity();
});

buttons.spyMinuse.addEventListener('click', () => {
    if (innerVariable.spy > 1) {
        innerVariable.spy--;
    }
    refreshSpy();
});

buttons.spyPlus.addEventListener('click', () => {
    if (innerVariable.spy < innerVariable.city / 3) {
        innerVariable.spy++;
    }
    refreshSpy();
});

buttons.timeMinuse.addEventListener('click', () => {
    if (innerVariable.time > 3) {
        innerVariable.time--;
    }
    refreshTime();
});

buttons.timePlus.addEventListener('click', () => {
    if (innerVariable.time < 12) {
        innerVariable.time++;
    }
    refreshTime();
});



function isCatButtonsMarked() {
    for (let i = 1; i <= numberOfMyCat; i++) {
        if (markedCatButtonsArrayVariable[i] === true) {
            document.querySelector(`#cat-${i} div2`).classList.remove('none');
        }
    }
}



categoryPopUp.addEventListener('click', () => {
    categoryPopUp.classList.add('none');
})
document.getElementById('popUp-board').addEventListener('click', (e) => {
    e.stopPropagation();
})
document.getElementById('category-title').addEventListener('click', (e) => {
    e.stopPropagation();
})
buttons.categoryRow.addEventListener('click', () => {
    categoryPopUp.classList.remove('none');
})


categoryButton.b0.all.addEventListener('click', () => {
    for (let i = 1; i <= numberOfMyCat; i++) {
        markedCatButtonsArrayVariable[i] = true
        isCatButtonsMarked();
        localStorage.setItem('markedCat', JSON.stringify(markedCatButtonsArrayVariable));
    }
});
categoryButton.b0.none.addEventListener('click', () => {
    for (let i = 1; i <= numberOfMyCat; i++) {
        markedCatButtonsArrayVariable[i] = false
        document.querySelector(`#cat-${i} div2`).classList.add('none');
        localStorage.setItem('markedCat', JSON.stringify(markedCatButtonsArrayVariable));
    }
})
categoryButton.b1.addEventListener('click', () => {
    closePopUp('حیوانات', 1);
});
categoryButton.b2.addEventListener('click', () => {
    closePopUp('اشیاء', 2);
});
categoryButton.b3.addEventListener('click', () => {
    closePopUp('شغل', 3);
});
categoryButton.b4.addEventListener('click', () => {
    closePopUp('مکان', 4);
});
categoryButton.b5.addEventListener('click', () => {
    closePopUp('فیلم و سریال', 5);
});
categoryButton.b6.addEventListener('click', () => {
    closePopUp('زمان', 6);
});
categoryButton.b7.addEventListener('click', () => {
    closePopUp('انتزاعی', 7);
});
categoryButton.b8.addEventListener('click', () => {
    closePopUp('اعضای بدن', 8);
});
categoryButton.b9.addEventListener('click', () => {
    closePopUp('مشاهیر', 9);
});
categoryButton.b10.addEventListener('click', () => {
    closePopUp('خواکی', 10);
});

function closePopUp(innerName, num) {
    if (!markedCatButtonsArrayVariable[num]) {
        document.querySelector(`#cat-${num} div2`).classList.remove('none');
        markedCatButtonsArrayVariable[num] = true;
    } else {
        document.querySelector(`#cat-${num} div2`).classList.add('none');
        markedCatButtonsArrayVariable[num] = false;
    }

    if (markedCatButtonsArrayVariable[num] === true) {
        catSelectedIndex.push(num);
    } else {
        let tempindex = catSelectedIndex.indexOf(num);
        catSelectedIndex.splice(tempindex, 1);
    }

    let tempp = 0;
    for (let i = 0; i <= numberOfMyCat; i++) {
        if (markedCatButtonsArrayVariable[i] === true) {
            tempp++;
        }
    }

    if (tempp > 1) {
        isRandomCat();
    } else {
        for (let i = 1; i <= numberOfMyCat; i++) {
            if (markedCatButtonsArrayVariable[i] === true) {
                inner.category.innerText = document.querySelector(`#cat-${i} p`).innerText;
            }
        }
    }

    localStorage.setItem('catNameOnPage', JSON.stringify(inner.category.innerText));
    localStorage.setItem('catIndex', JSON.stringify(catSelectedIndex));
    localStorage.setItem('markedCat', JSON.stringify(markedCatButtonsArrayVariable));
}

function isRandomCat() {
    let temp = 0;
    for (let i = 0; i <= numberOfMyCat; i++) {
        if (markedCatButtonsArrayVariable[i] === true) {
            temp++;
        }
    }
    if (temp > 1) {
        inner.category.innerText = 'شانسی';
    }
}


function randmonAllCat() {
    let temp = [];
    for (let index = 0; index < numberOfMyCat; index++) {
        temp[index] = index + 1;
    }
    return temp;
}
//  ************************************************************************************************************************************************
inner.category.innerText = JSON.parse(localStorage.getItem('catNameOnPage')) || 'شانسی';
function rand(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}
function choesWord() {
    if (catSelectedIndex.length === 0) {
        catSelectedIndex = randmonAllCat();
    }
    shuffle(catSelectedIndex);
    let correntIndex = catSelectedIndex[0];
    shuffle(gameWords[correntIndex]);
    thisWord = gameWords[correntIndex][0];
    correntIndex2 = correntIndex;
}

let correntIndex2;

// main stat game button           (شروع بازی)
buttons.play.addEventListener('click', () => {
    // this will call the main function to start the game
    startGame();
    showCatOnPage2();
    innerText2.titleText.innerText = `شماره 1 از ${innerVariable.city + innerVariable.spy} هستید`;
})

function showCatOnPage2() {

    let temp;
    switch (correntIndex2) {
        case 1:
            temp = 'حیوانات'
            break;
        case 2:
            temp = 'اشیاء'
            break;
        case 3:
            temp = 'شغل'
            break;
        case 4:
            temp = 'مکان'
            break;
        case 5:
            temp = 'فیلم و سریال'
            break;
        case 6:
            temp = 'زمان'
            break;
        case 7:
            temp = 'انتزاعی'
            break;
        case 8:
            temp = 'اعضای بدن'
            break;
        case 9:
            temp = 'مشاهیر'
            break;
        case 10:
            temp = 'خواکی'
            break;

    }
    document.getElementById('show-cat-page2').innerText = `دسته: ${temp}`;

}

// this function will replace the page2 with page1 and show you words
function startGame() {
    page1.classList.remove('fade-in');
    page1.classList.add('fade-out');
    page2.classList.remove('none');
    document.querySelector('.page2-container').classList.remove('none');
    document.querySelector('.page2-container').classList.add('center');
    buttons.headerButtons.parent.classList.remove('none');
    buttons.hamburgerMenu.classList.add('none');
    setTimeout(() => {
        page1.classList.add('none');
        page2.classList.add('fade-in');
        buttons.headerButtons.parent.classList.add('fade-in');
    }, 500);

    choesWord();

    for (let i = 0; i < innerVariable.city; i++) {
        myWord.push(`کلمه: ${thisWord}`);
    }
    lastScreenWord = thisWord;
    for (let i = 0; i < innerVariable.spy; i++) {
        myWord.push('شما جاسوس هستید');
    }
    shuffle(myWord);

    gameStat = {
        cityMember: innerVariable.city,
        spyMember: innerVariable.spy,
        time: innerVariable.time,
    }
    localStorage.setItem('cityM', JSON.stringify(gameStat.cityMember))
    localStorage.setItem('spyM', JSON.stringify(gameStat.spyMember))
    localStorage.setItem('time', JSON.stringify(gameStat.time))
}


buttons.headerButtons.back.addEventListener('click', () => {
    restartDialog.classList.remove('none');
})

buttons.restartYes.addEventListener('click', () => {
    location.reload();
})

buttons.restartNo.addEventListener('click', () => {
    restartDialog.classList.add('none');
})

buttons.headerButtons.reassign.addEventListener('click', () => {
    reassignDialog.classList.remove('none');
})

buttons.reassignYes.addEventListener('click', () => {
    // hiding the reassing dialog
    reassignDialog.classList.add('none');

    playerIndex = 1;

    innerText2.titleText.innerText = `شماره ${playerIndex} از ${innerVariable.city + innerVariable.spy} هستید`;
    innerText2.gameText.innerText = 'بزن رو نمایش کلمه';
    innerText2.button.innerText = 'نمایش کلمه';

    next = false;

    myWord = [];

    startGame();
    showCatOnPage2();
})

buttons.reassignNo.addEventListener('click', () => {
    reassignDialog.classList.add('none');
})


function refreshCity() {
    inner.city.innerText = innerVariable.city;
}
function refreshSpy() {
    inner.spy.innerText = innerVariable.spy;
}
function refreshTime() {
    inner.time.innerText = innerVariable.time;
}

function shuffle(array) {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
    return array;
}




const button2 = {
    play: document.getElementById('play-button-2'),
}
const innerText2 = {
    gameText: document.getElementById('game-text'),
    titleText: document.getElementById('game-title'),
    button: document.getElementById('play-button-2')
}

let next = false;
let playerIndex = 1;
let lastScreenWord;
button2.play.addEventListener('click', () => {
    if (innerText2.gameText.innerText == '!بزن بریم') {
        mainAudio.play();
        document.querySelector('.page2-container').classList.add('fade-out');
        buttons.stopGame.classList.remove('none');
        page3.classList.remove('none');
        buttons.stopGame.classList.remove('stop-game-out');
        buttons.headerButtons.reassign.classList.add('none');
        setTimeout(() => {
            document.querySelector('.page2-container').classList.add('none');
            page3.classList.add('fade-in');
        }, 500);


        document.getElementById('show-word').innerText = `کلمه: ${lastScreenWord}`;

        startCountdown();
    }
    if (playerIndex <= innerVariable.city + innerVariable.spy) {
        innerText2.titleText.innerText = `شماره ${playerIndex} از ${innerVariable.city + innerVariable.spy} هستید`;
        if (!next) {
            innerText2.gameText.innerText = `${myWord[playerIndex - 1]}`;
            nextPlayer(next);
            playerIndex++;
            next = true;
        } else if (next) {
            nextPlayer(next);
            next = false;
        }

    } else {
        innerText2.button.innerText = 'شروع کن';
        innerText2.titleText.innerText = 'تموم شد';
        innerText2.gameText.innerText = '!بزن بریم';
    }

    if (innerText2.gameText.innerText === 'شما جاسوس هستید') {
        innerText2.gameText.style.color = 'rgb(213, 160, 54)';
    } else {
        innerText2.gameText.style.color = 'rgb(174, 200, 241)';
    }
})



function nextPlayer(isTrue) {
    if (isTrue) {
        innerText2.gameText.innerText = 'بزن رو نمایش کلمه';
        innerText2.button.innerText = 'نمایش کلمه';
    } else if (!isTrue) {
        innerText2.button.innerText = 'دیدمش';
    }
}

mainAudio.onended = mainAudio.play;

let timer = document.getElementById('timer-div');
function startCountdown() {
    let secondTemp = 59;
    let timeTemp = innerVariable.time - 1;
    interval = setInterval(() => {
        if (timeTemp == 0) {
            if (secondTemp < 10) {
                tenToOne.play();
            }
            if (secondTemp < 10) {
                timer.innerText = `0${secondTemp}`;
            } else timer.innerText = secondTemp;
            if (secondTemp == 0) {
                clearInterval(interval);
                mainAudio.load();
                gameIsOver.classList.remove('none');
                buttons.stopGame.classList.add('stop-game-out');
                setTimeout(() => {
                    buttons.stopGame.classList.add('none');
                    page4.classList.remove('none');
                    page4.classList.add('main4IsDown');
                    gameIsOver.classList.add('fade-in');
                }, 500);
            }
        } else {
            if (secondTemp < 10) {
                timer.innerText = `${timeTemp}:0${secondTemp}`;
            } else timer.innerText = `${timeTemp}:${secondTemp}`;
        }
        if (secondTemp == 0) {
            clearInterval;
            timeTemp--;
            secondTemp = 60
        }
        secondTemp--;
    }, 1000);
}


buttons.playAgain.addEventListener('click', () => {
    document.querySelector('.page2-container').classList.remove('fade-out');
    page3.classList.add('none');
    buttons.headerButtons.reassign.classList.remove('none');
    page4.classList.add('none');
    gameIsOver.classList.add('none');
    gameIsOver.classList.remove('fade-in');
    setTimeout(() => {
        page3.classList.remove('fade-in');
    }, 500);
    
    
    mainAudio.load();
    playerIndex = 1;
    innerText2.titleText.innerText = `شماره ${playerIndex} از ${innerVariable.city + innerVariable.spy} هستید`;
    innerText2.gameText.innerText = 'بزن رو نمایش کلمه';
    innerText2.button.innerText = 'نمایش کلمه';
    next = false;
    myWord = [];
    startGame();
    showCatOnPage2();
});

buttons.mainMenu.addEventListener('click', () => {
    window.location.reload();
});

buttons.stopGame.addEventListener('click', () => {
    clearInterval(interval);
    mainAudio.load();
    gameIsOver.classList.remove('none');
    buttons.stopGame.classList.add('stop-game-out');
    setTimeout(() => {
        buttons.stopGame.classList.add('none');
        page4.classList.remove('none');
        page4.classList.add('main4IsDown');
        gameIsOver.classList.add('fade-in');
    }, 500);
})


