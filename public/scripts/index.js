// html elements
// TODO upvote button event click
// TODO login button (ROUTE) event click
    // TODO login button (SUBMIT/ON LOGIN PAGE) event click
    //? function should have email and password from user input
// TODO signup button event click
    // TODO signup button (SUBMIT/ON signup PAGE) event click
    //? function should have profile picture, email, username and password from user input
// TODO clicking a form button event click
// TODO clicking to enter a response button event click
// TODO sort button event click
// TODO home button event click


function init() {
    if (window.localStorage.getItem("darkmode") == "true") { //if darkmode is set to true in storage flip switch to on
        if($('.darkModeToggle').length != 0) { //check if page has a darkmode slider
            $('.darkModeToggle')[0].id = 'on'
            $('.darkModeToggle')[0].children[0].textContent = 'toggle_on'
        }
        console.log("trying to darkmoden stuff")
        darkModeHandler(); //load darkmode settings if its enabled
    }
    $('.darkModeToggle').click(darkModeButtonClicked);
    $('.sortBtn').click(sortButtonClicked);
    $('.upvote').click(upvoteButtonClicked);
    $('.thread').click(threadCardClicked);
}

function darkModeButtonClicked(event) {
    if ($(this).attr('id') === 'off'){
        //if off turn on
        $(this).attr('id', 'on');
        $(this).children().text('toggle_on');
        window.localStorage.setItem("darkmode", "true");
    } else {
        //if on turn off
        $(this).attr('id', 'off');
        $(this).children().text('toggle_off');
        window.localStorage.setItem("darkmode", "false");
    }
    darkModeHandler();
}

function sortButtonClicked(event) {
    //TODO fetch sorted homepage by user selected category

    // sets active id for any clicked button and clears all other buttons of that id
    for (let index = 0; index < $('.sortBtn').length; index++) {
        $('.sortBtn')[index].id = '';
    }
    $(this).attr('id','active');
}

function upvoteButtonClicked(event) {
    //TODO stop propogation upwards
    event.stopPropagation();

    //? if upvote has upvote-activated class already then take it off
    if ($(this)[0].classList.contains('upvote-activated')) {
        $(this).removeClass('upvote-activated');
    } else {
        //? else put it on
        $(this).addClass('upvote-activated');
    }

}

function threadCardClicked(event) {
    //TODO redirect user to thread page on click using the id attatched to the card /post/:id
    console.log('redirecting');
    location.href = 'post.html';
}

function darkModeHandler() {
    if (window.localStorage.getItem("darkmode") == "true") {
        //if true then make darkmode
        console.log("dark")
        document.documentElement.style.setProperty('--background-color', '#000000');
        document.documentElement.style.setProperty('--card-background-color', '#1A1A1B');
        document.documentElement.style.setProperty('--main-color', '#9407F2');
        document.documentElement.style.setProperty('--confirm-color', '#ec28cf');
        document.documentElement.style.setProperty('--text-shade', '#BFBFBF');
        document.documentElement.style.setProperty('--text-dark', '#D7DADC');
        document.documentElement.style.setProperty('--button-hover-on-white', '#272727');
    } else {
        //else make bright
        console.log("bright")
        document.documentElement.style.setProperty('--background-color', '#DAE0E6');
        document.documentElement.style.setProperty('--card-background-color', '#FFFFFF');
        document.documentElement.style.setProperty('--main-color', '#9407F2');
        document.documentElement.style.setProperty('--confirm-color', '#F673E3');
        document.documentElement.style.setProperty('--text-shade', '#757575');
        document.documentElement.style.setProperty('--text-dark', '#424242');
        document.documentElement.style.setProperty('--button-hover-on-white', '#E1E1E1');
    }
}

init()