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
        if ($('.darkModeToggle').length != 0) { //check if page has a darkmode slider
            $('.darkModeToggle')[0].id = 'on'
            $('.darkModeToggle')[0].children[0].textContent = 'toggle_on'
        }
        darkModeHandler(); //load darkmode settings if its enabled
    }
    $('.darkModeToggle').click(darkModeButtonClicked);
    $('.sortBtn').click(sortButtonClicked);
    $('.upvote').click(upvoteButtonClicked);
    $('.thread').click(threadCardClicked);
    $('button[name="login"]').click(loginButtonClicked);

}

function darkModeButtonClicked(event) {
    if ($(this).attr('id') === 'off') {
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
    $(this).attr('id', 'active');
}

function upvoteButtonClicked(event) {
    event.stopPropagation();

    console.log(event.target)
    $.post('/api/posts/upvote/1').then(vote => console.log(vote))
        //? if upvote has upvote-activated class already then take it off
    if ($(this)[0].classList.contains('upvote-activated')) {
        $(this).removeClass('upvote-activated');
        $(this).parent().parent().children().first().text(Number($(this).parent().parent().children().first().text()) - 1);
    } else {
        //? else put it on
        $(this).addClass('upvote-activated');
        $(this).parent().parent().children().first().text(Number($(this).parent().parent().children().first().text()) + 1);
    }
    // console.log($(this).parent().parent().children().first().text())
}

function threadCardClicked(event) {
    //TODO redirect user to thread page on click using the id attatched to the card /post/:id
    location.href = `/post/${$(this).attr('id')}`;
}

function darkModeHandler() {
    if (window.localStorage.getItem("darkmode") == "true") {
        //if true then make darkmode
        document.documentElement.style.setProperty('--background-color', '#000000');
        document.documentElement.style.setProperty('--card-background-color', '#1A1A1B');
        document.documentElement.style.setProperty('--main-color', '#9407F2');
        document.documentElement.style.setProperty('--confirm-color', '#ec28cf');
        document.documentElement.style.setProperty('--text-shade', '#BFBFBF');
        document.documentElement.style.setProperty('--text-dark', '#D7DADC');
        document.documentElement.style.setProperty('--button-hover-on-white', '#272727');
    } else {
        //else make bright
        document.documentElement.style.setProperty('--background-color', '#DAE0E6');
        document.documentElement.style.setProperty('--card-background-color', '#FFFFFF');
        document.documentElement.style.setProperty('--main-color', '#9407F2');
        document.documentElement.style.setProperty('--confirm-color', '#F673E3');
        document.documentElement.style.setProperty('--text-shade', '#757575');
        document.documentElement.style.setProperty('--text-dark', '#424242');
        document.documentElement.style.setProperty('--button-hover-on-white', '#E1E1E1');
    }
}

function loginButtonClicked() {
    let email = $('input[name="email"]').val();
    let password = $('input[name="password"]').val();
    console.log(email, password)
}

init()