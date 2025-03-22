
window.onload=init;

function init()
{
    console.log("woah you made it");
    state.s = 1;
}


var state = {
    s : 0
};
/* States for other items can be added, but it is only shirt for now. */

function nextshirt()
{
    console.log("inside function nextshirt");
    console.log(state.s);
    var shirt = document.getElementById("shirt");
    if(state.s === 0){
        shirt.setAttribute("class","shirt1");
        state.s++;
        console.log(state.s);
    }
    else
        if(state.s===1){
            shirt.setAttribute("class","shirt2");
            state.s++;
            console.log(state.s);
        }
    else
    if(state.s===2){
        shirt.setAttribute("class","shirt3");
        state.s = 0;
        console.log(state.s);
}



}