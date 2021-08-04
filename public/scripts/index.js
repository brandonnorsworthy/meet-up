function init() {
    $(".sortBtn").click(sortButtonClicked)
    $(".upvote").click(upvoteButtonClicked)
}

function sortButtonClicked() {
    //TODO fetch sorted homepage by user selected category

    // sets active id for any clicked button and clears all other buttons of that id
    for (let index = 0; index < $(".sortBtn").length; index++) {
        $(".sortBtn")[index].id = ""
    }
    $(this).attr("id","active")
}

function upvoteButtonClicked() {
    //TODO stop propogation upwards

    //? if upvote has upvote-activated class already then take it off
    if ($(this)[0].classList.contains("upvote-activated")) {
        $(this).removeClass("upvote-activated")
    } else {
        //? else put it on
        $(this).addClass("upvote-activated")
    }

}

function threadCardClicked() {

}

init()