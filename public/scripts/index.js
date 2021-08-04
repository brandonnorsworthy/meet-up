function init() {
    $(".sortBtn").click(sortButtonClicked);
    $(".upvote").click(upvoteButtonClicked);
    $(".thread").click(threadCardClicked);
}

function sortButtonClicked(event) {
    //TODO fetch sorted homepage by user selected category

    // sets active id for any clicked button and clears all other buttons of that id
    for (let index = 0; index < $(".sortBtn").length; index++) {
        $(".sortBtn")[index].id = "";
    }
    $(this).attr("id","active");
}

function upvoteButtonClicked(event) {
    //TODO stop propogation upwards
    event.stopPropagation();

    //? if upvote has upvote-activated class already then take it off
    if ($(this)[0].classList.contains("upvote-activated")) {
        $(this).removeClass("upvote-activated");
    } else {
        //? else put it on
        $(this).addClass("upvote-activated");
    }

}

function threadCardClicked(event) {
    //TODO redirect user to thread page on click using the id attatched to the card /post/:id
    console.log("redirecting")
    location.href = 'post.html';
}

init()