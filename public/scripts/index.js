function init() {
    if (window.localStorage.getItem("darkmode") == "true") { //if darkmode is set to true in storage flip switch to on
        if ($('.darkModeToggle').length != 0) { //check if page has a darkmode slider
            $('.darkModeToggle')[0].id = 'on';
            $('.darkModeToggle')[0].children[0].textContent = 'toggle_on';
        }
        darkModeHandler(); //load darkmode settings if its enabled
    }

    //darkmode switch
    $('.darkModeToggle').click(darkModeButtonClicked);
    $('button[name="login"]').click(loginButtonClicked);
    $('button[name="logout"]').click(logoutButtonClicked);
    $('button[name="create-account"]').click(createAccountButtonClicked);

    //create post btn 1st card
    $('#create-event-submit').click(createPostSubmit);

    //sort buttons 2nd card
    $('.sortBtn').click(sortButtonClicked);

    //upvote button on each post
    $('.upvote').click(upvoteButtonClicked);
    //each thread clickable
    $('.thread').click(threadCardClicked);

    //enter is pressed in the response input
    $('input[name="response"]').keypress(keyPressedInResponse);
    $('button[name="response"]').click(function() {
        location.href='/login';
    });
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

function loginButtonClicked() {
    let emailValue = $('input[name="email"]').val();
    let passwordValue = $('input[name="password"]').val();

    console.log(emailValue, passwordValue)

    $.post('/api/user/login',{
        email: emailValue,
        password: passwordValue,
    }, function(){
        console.log('sent')
    })
        .done(function() {
            location.href='/'
        })
        .fail(function(data) {
            console.log(data.responseJSON.message)
        })
}

function createAccountButtonClicked() {
    const body = {
        email: $('input[name="email"]').val(),
        username: $('input[name="username"]').val(),
        password: $('input[name="password"]').val(),
        confirmPassword: $('input[name="confirmPassword"]').val()
    }
    const requriedText = ' <span>This field is required</span>';

    //! error handling for empty fields
    let foundEmptyField = false;
    for (const key in body) {
        let pEl = $(`p[for="${key}"]`); //grabs the label above the current input

        if (body[key].length === 0) { //if the input is empty inside mark that found a empty string
            if (pEl.first().children().length === 0) { //if no span has already been added then add one
                pEl.html(pEl.text() + requriedText)
            } else { //if there is a span then remove it and add one back because it might say something different
                pEl.first().children().first().remove()
                pEl.html(pEl.text() + requriedText)
            }
            foundEmptyField = true;
        } else {
            if (pEl.first().children().length !== 0) { //if not empty but span is attached then remove it
                pEl.first().children().first().remove()
            }
        }
    }
    if (foundEmptyField) { return; } //if found any empty inputs then stop here

    //! error handling for unmatching passwords
    if (body.password !== body.confirmPassword) {
        const passwords = {
            passwordEl: $('p[for="password"]'),
            passwordConfirmEl: $('p[for="confirmPassword"]')
        }
        const passwordsDontMatch = ' <span>Passwords do not match</span>';

        for (const key in passwords) { //loop over both password and passwordConfirm
            console.log(passwords[key])
            //if the p tag does not have a span try to add one
            if (passwords[key].first().children().length === 0){
                passwords[key].html(passwords[key].text() + passwordsDontMatch)
            } else { //if there was a span remove it then add one
                passwords[key].first().children().first().remove()
                passwords[key].html(passwords[key].text() + passwordsDontMatch)
            }
        }
        return; //passwords did not match so we just stop here and let them fix it
    }

    $.post('/api/user/register',{
        email: body.email,
        username: body.username,
        password: body.password,
    }, function(){
        console.log('sent')
    })
        .done(function() {
            location.href='/'
        })
        .fail(function(data) {
            if (data.responseJSON.problem) { //should send over a specified part it didnt like
                const spanString = ` <span>${data.responseJSON.message}</span>`
                let pEl = $(`p[for="${data.responseJSON.problem}"]`);

                if (pEl.first().children().length === 0) { //if no span has already been added then add one
                    pEl.html(pEl.text() + spanString)
                } else { //if there is a span then remove it and add one back because it might say something different
                    pEl.first().children().first().remove()
                    pEl.html(pEl.text() + spanString)
                }
            } else {
                console.log(data.responseJSON.message)
            }
        })
}

function logoutButtonClicked() {
    $.post('/api/user/logout')
        .done(function() {
            location.href='/';
        })
        .fail(function(data) {
            console.log(data.responseJSON.message);
        })
}

function createPostSubmit() {
    let title = $('input[name="post-title"]').val();
    let description = $('textarea[name="post-description"]').val();
    let location = $('textarea[name="post-location"]').val();
    let date = $('input[name="post-date"]').val();

    console.log(title, description, location, date)

    // return;
    $.post('/api/post/create',{
        title: title,
        description: description,
        location: location,
        date: date
    }, function(){
        console.log('sent')
    })
        .done(function() {
            location.href='/'
            console.log("created")
        })
        .fail(function(data) {
            console.log(data.responseJSON.message)
        })
}

function sortButtonClicked(event) {
    for (let index = 0; index < $('.sortBtn').length; index++) { //loop over all buttons with this class
        $('.sortBtn')[index].id = ''; //clear all the ids
    }
    $(this).attr('id', 'active'); //set the clicked on button with the active id for styling

    console.log(`${$(this).text().toLowerCase()}`)

    $.post('/',{ //TODO this sends over the right thing problem on serverside
        sort: `${$(this).text().toLowerCase()}` //sends over the text from the button clicked to be sorted by
    })
    .done(function() {
        // location.href='/'
        console.log("created")
    })
    .fail(function(data) {
        console.log(data.responseJSON.message)
    })
}

function upvoteButtonClicked(event) {
    event.stopPropagation();
    let numberEl = $(this).parent().parent().children().first();
    // console.log(event.target)
    // $.post('/api/post/upvote/1').then(vote => console.log(vote))
        //? if upvote has upvote-activated class already then take it off
    if ($(this)[0].classList.contains('upvote-activated')) {
        $(this).removeClass('upvote-activated');
        numberEl.text(Number($(this).parent().parent().children().first().text()) - 1);
    } else {
        //? else put it on
        $(this).addClass('upvote-activated');
        numberEl.text(Number($(this).parent().parent().children().first().text()) + 1);
    }

    $.post(`/api/posts/upvote/${numberEl.text()}`) //TODO request is sending correctly problem is in database and serverside
    .done(function(data) {
        console.log(data)
        console.log("created")
    })
    .fail(function(data) {
        console.log(data.responseJSON.message)
    })
    // console.log($(this).parent().parent().children().first().text())
}

function threadCardClicked(event) {
    location.href = `/post/${$(this).attr('id')}`;
}

function keyPressedInResponse(event) {
    if (event.keyCode === 13) {
        $.post('/api/response/',  {
            post_id: $('.post').attr('id'),
            response: $('input[name="response"]').val(),
        }, function(){
            console.log('sent')
        })
            .done(function() {
                location.href='/'
                console.log("created")
            })
            .fail(function(data) {
                console.log(data.responseJSON.message)
            })
    }
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

init()