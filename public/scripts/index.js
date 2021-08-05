function init() {
    $('.darkModeToggle').click(darkModeButtonClicked)
    $('.sortBtn').click(sortButtonClicked);
    $('.upvote').click(upvoteButtonClicked);
    $('.thread').click(threadCardClicked);
}

function darkModeButtonClicked(event) {
    if ($(this).attr('id') === 'off'){
        //if off turn on
        $(this).attr('id', 'on')
        $(this).children().text('toggle_on')
        document.documentElement.style.setProperty('--background-color', '#000000')
        document.documentElement.style.setProperty('--card-background-color', '#1A1A1B')
        document.documentElement.style.setProperty('--main-color', '#9407F2')
        document.documentElement.style.setProperty('--confirm-color', '#ec28cf')
        document.documentElement.style.setProperty('--text-shade', '#BFBFBF')
        document.documentElement.style.setProperty('--text-dark', '#D7DADC')
        document.documentElement.style.setProperty('--button-hover-on-white', '#272727')
    } else {
        //if on turn off
        $(this).attr('id', 'off')
        $(this).children().text('toggle_off')
        document.documentElement.style.setProperty('--background-color', '#DAE0E6')
        document.documentElement.style.setProperty('--card-background-color', '#FFFFFF')
        document.documentElement.style.setProperty('--main-color', '#9407F2')
        document.documentElement.style.setProperty('--confirm-color', '#F673E3')
        document.documentElement.style.setProperty('--text-shade', '#757575')
        document.documentElement.style.setProperty('--text-dark', '#424242')
        document.documentElement.style.setProperty('--button-hover-on-white', '#E1E1E1')
    }
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
    console.log('redirecting')
    location.href = 'post.html';
}

init()