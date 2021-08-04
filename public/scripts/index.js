function init() {
    // sets active id for any clicked button and clears all other buttons of that id
    $(".sortBtn").click(sortButtonClicked)
}

function sortButtonClicked() {
    for (let index = 0; index < $(".sortBtn").length; index++) {
        $(".sortBtn")[index].id = ""
    }
    $(this).attr("id","active")
}

init()