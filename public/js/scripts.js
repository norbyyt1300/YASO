var socket = io();

function emit(targetElementId, saveButtonElement) {
    socket.emit('update', [targetElementId, saveButtonElement.previousSibling.innerText.trim()])
}

function emitUnitUpdate(targetElementId, newValue) {
    socket.emit('update', ["unitUpdate_" + targetElementId, newValue])
}

function emitUnitDamageWoundsUpdate(targetElementId, newValue) {
    socket.emit('update', ["unitDamageWoundsUpdate_" + targetElementId, newValue])
}

function emitCardToShow(selectedUnitNameWithDashes) {
    socket.emit('update', ["showCardUpdate", selectedUnitNameWithDashes]);
}

function emitStanceCardToShow(selectedUnitNameWithDashes) {
    socket.emit('update', ["showStanceUpdate", selectedUnitNameWithDashes]);
}






function emitUpdateElementInnerHTML(targetElementId, newInnerHTML) {
    socket.emit('update', ["updateElementInnerHTML", targetElementId, newInnerHTML]);
}

function emitHideCurrentlyDisplayedCard() {
    socket.emit('update', ["HideCurrentlyShownCard", 0, ""]);
}

socket.on('update', function (update) {
    console.log('Socket update received from settings page: ', update);
});



function toggleStruggleTrackerElement(clickedElement) {
    newBackgroundColor = "white";
    if (clickedElement.style.backgroundColor == "white" || !clickedElement.style.backgroundColor) {
        newBackgroundColor =  "gray";
    } else if (clickedElement.style.backgroundColor == "gray") {
        newBackgroundColor =  "yellow";
    }
    clickedElement.style.backgroundColor = newBackgroundColor;
    socket.emit('update', ["toggleStruggleTrackerElement", clickedElement.id, newBackgroundColor])
}

