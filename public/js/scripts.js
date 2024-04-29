// -----------------------------------------------------------------------------------------------------

var BUILDER_IMAGES_URL_PREFIX = "https://www.aerodomebuilder.com/images/";

// -----------------------------------------------------------------------------------------------------

// When a card img is clicked, either make it very transparent or not very transparent
function toggleCardImgTransparency(element) {
    // Assume a default should be 0.9
    var newOpacity = 0.9;
    if (element.style.opacity == 0.9) {
        newOpacity = 0.1
    }
    console.log("Setting the opacity for " + element.id + " to " + newOpacity);
    element.style.opacity = newOpacity;
}

// BATTLE CARD When a card img is clicked, either make it very small or full size
function toggleBattleCardImgSize(element) {
    var newHeight = "400px";
    if (element.style.height == newHeight) {
        newHeight = "40px";
    }
    console.log("Setting the height for " + element.id + " to " + newHeight);
    element.style.height = newHeight;
}

// PILOT CARD When a card img is clicked, either make it very small or full size
function togglePilotImgSize(element) {
    var newHeight = "250px";
    if (element.style.height == newHeight) {
        newHeight = "25px";
    }
    console.log("Setting the height for " + element.id + " to " + newHeight);
    element.style.height = newHeight;
}

// -----------------------------------------------------------------------------------------------------

// When the select changes, update the player pilot card
function updatePlayerPilotCard(playerNumber) {

    // Figure out which player we're updating
    var selectElementId = "player1PilotSelect";
    var pilotImgElementId = "player1PilotCardImg";
    if (playerNumber == 2) {
        selectElementId = "player2PilotSelect";
        pilotImgElementId = "player2PilotCardImg";
    }

    console.log("Updating " + pilotImgElementId + " based on change to " + selectElementId);

    // Get the selected pilot
    var selectedPilot = document.getElementById(selectElementId).value.trim();
    console.log("New pilot selection: " + selectedPilot);

    // Figure out the new URL for the pilot image
    var newPilotImgURL = "";

    // Thank you, builder, for hosting all of these!
    var PILOT_IMAGE_URL_PREFIX = BUILDER_IMAGES_URL_PREFIX + "pilots/";

    switch (selectedPilot) {
        case "Jax Fernandez":
            newPilotImgURL = PILOT_IMAGE_URL_PREFIX + "AEF005.png";
            break;
        case "Lt. Archie Anderson":
            newPilotImgURL = PILOT_IMAGE_URL_PREFIX + "AEF002.png";
            break;
        case "Van Vertigo":
            newPilotImgURL = PILOT_IMAGE_URL_PREFIX + "AEF015.png";
            break;
        case "TSGT. Hilda McMahon":
            newPilotImgURL = PILOT_IMAGE_URL_PREFIX + "AEF012.png";
            break;
        case "Fare Collins":
            newPilotImgURL = PILOT_IMAGE_URL_PREFIX + "AEF007.png";
            break;
        case "Lt. Sven Bergman":
            newPilotImgURL = PILOT_IMAGE_URL_PREFIX + "AEF004.png";
            break;
        case "1st Lt. Havoc Moua":
            newPilotImgURL = PILOT_IMAGE_URL_PREFIX + "AEF010.png";
            break;
        case "Ash Buchanan":
            newPilotImgURL = PILOT_IMAGE_URL_PREFIX + "AEF013.png";
            break;
        case "Lance Hamill":
            newPilotImgURL = PILOT_IMAGE_URL_PREFIX + "AEF008.png";
            break;
        case "Capt. Theodosia Costello":
            newPilotImgURL = PILOT_IMAGE_URL_PREFIX + "AEF001.png";
            break;
        case "1st Lt. Dane X":
            newPilotImgURL = PILOT_IMAGE_URL_PREFIX + "AEF011.png";
            break;
        case "Dario Stardancer":
            newPilotImgURL = PILOT_IMAGE_URL_PREFIX + "AEF014.png";
            break;
        case "Elena Zane":
            newPilotImgURL = PILOT_IMAGE_URL_PREFIX + "AEF006.png";
            break;
        case "Lt. Sophia Saleh":
            newPilotImgURL = PILOT_IMAGE_URL_PREFIX + "AEF003.png";
            break;
        case "Capt. Alice Drummond":
            newPilotImgURL = PILOT_IMAGE_URL_PREFIX + "AEF009.png";
            break;
        case "B3-47L":
            newPilotImgURL = PILOT_IMAGE_URL_PREFIX + "AEF016.png";
            break;
        default:
            newPilotImgURL = "Aerodome-Logo-800.png";
    }

    // Apply this new URL to the img element
    console.log("Applying new URL for that pilot: " + newPilotImgURL);
    document.getElementById(pilotImgElementId).src = newPilotImgURL;

}

// -----------------------------------------------------------------------------------------------------

function parseAndApplyPlayerDecks() {
    console.log("Now parsing player decks!");

    // Read in each deck TTS string

    /* Example strings:

    AEF001\ RH1002\ RH1012\ RH1020\ RH1028\ RH1034\ RH1043\ RH1051\ RH1096\ RH1103\ AUX1007\ AUX1008\ AUX1009

    AEF008\ RH1010\ RH1017\ RH1077\ RH1080\ RH1041\ RH1092\ RH1093\ RH1095\ RH1101\ 

    */

    var player1TTSString = document.getElementById("player1BuilderString").value.trim();
    var player2TTSString = document.getElementById("player2BuilderString").value.trim();
    console.log("Player TTS strings: ", player1TTSString, player2TTSString);

    // Split the string into tokens
    var player1CardArray = player1TTSString.split("\\ ");
    var player2CardArray = player2TTSString.split("\\ ");
    console.log("Player card arrays: ", player1CardArray, player2CardArray);

    // Extract from the tokens the pilot code
    var player1PilotCode = player1CardArray.filter((cardCode) => cardCode.startsWith("AEF0"))[0].trim();
    var player2PilotCode = player2CardArray.filter((cardCode) => cardCode.startsWith("AEF0"))[0].trim();
    console.log("Player pilot codes: ", player1PilotCode, player2PilotCode);

    // Use that pilot code to update the pilot name and pilot card image
    var player1PilotName = convertPilotCodeToPilotName(player1PilotCode);
    var player2PilotName = convertPilotCodeToPilotName(player2PilotCode);
    console.log("Converted codes to names. Player pilot names: ", player1PilotName, player2PilotName);

    // Set the pilot select element values to be these new pilot names
    document.getElementById("player1PilotSelect").value = player1PilotName;
    document.getElementById("player2PilotSelect").value = player2PilotName;
    updatePlayerPilotCard(1);
    updatePlayerPilotCard(2);

    // For the rest of the 1 - 9 cards, save them to an array
    var player1BattleCards = player1CardArray.filter((cardCode) => cardCode.startsWith("RH1"));
    var player2BattleCards = player2CardArray.filter((cardCode) => cardCode.startsWith("RH1"));
    console.log("Player battle card decks: ", player1BattleCards, player2BattleCards);

    // Update the card viewer select to be able to show those cards
    var player1BattleCardSelectElement = document.getElementById("player1BattleCardSelect");
    for (var i = 1; i < 10; i++) {
        const option = document.createElement("option");
        option.text = i;
        option.value = player1BattleCards[i - 1].replace("\\", "").replace("\\", "");
        option.classList = "battle-card-option-element";
        player1BattleCardSelectElement.appendChild(option);
    }
    var player2BattleCardSelectElement = document.getElementById("player2BattleCardSelect");
    for (var i = 1; i < 10; i++) {
        const option = document.createElement("option");
        option.text = i;
        option.value = player2BattleCards[i - 1].replace("\\", "").replace("\\", "");
        option.classList = "battle-card-option-element";
        player2BattleCardSelectElement.appendChild(option);
    }

    // Also allow toggling a given card from normal to dazed
}

function convertPilotCodeToPilotName(pilotCode) {
    switch (pilotCode) {
        case "AEF005":
            pilotName = "Jax Fernandez";
            break;

        case "AEF002":
            pilotName = "Lt. Archie Anderson";
            break;

        case "AEF015":
            pilotName = "Van Vertigo";
            break;

        case "AEF012":
            pilotName = "TSGT. Hilda McMahon";
            break;

        case "AEF007":
            pilotName = "Fare Collins";
            break;

        case "AEF004":
            pilotName = "Lt. Sven Bergman";
            break;

        case "AEF010":
            pilotName = "1st Lt. Havoc Moua";
            break;

        case "AEF013":
            pilotName = "Ash Buchanan";
            break;

        case "AEF008":
            pilotName = "Lance Hamill";
            break;

        case "AEF001":
            pilotName = "Capt. Theodosia Costello";
            break;

        case "AEF011":
            pilotName = "1st Lt. Dane X";
            break;

        case "AEF014":
            pilotName = "Dario Stardancer";
            break;

        case "AEF006":
            pilotName = "Elena Zane";
            break;

        case "AEF003":
            pilotName = "Lt. Sophia Saleh";
            break;

        case "AEF009":
            pilotName = "Capt. Alice Drummond";
            break;

        case "AEF016":
            pilotName = "B3-47L";
            break;
        default:
            pilotName = "Soontir Fel";
    }
    return pilotName;
}

// -----------------------------------------------------------------------------------------------------

// When the select changes, update the player pilot card
function updatePlayerBattleCard(playerNumber) {

    // Figure out which player we're updating
    var selectElementId = "player1BattleCardSelect";
    var battleCardImgElementId = "player1BattleCardImg";
    if (playerNumber == 2) {
        selectElementId = "player2BattleCardSelect";
        battleCardImgElementId = "player2BattleCardImg";
    }

    console.log("Updating " + battleCardImgElementId + " based on change to " + selectElementId);

    // Get the selected card CODE
    var selectedBattleCardCode = document.getElementById(selectElementId).value.trim();
    console.log("New battle card selection: " + selectedBattleCardCode);



    // Thank you, builder, for hosting all of these!
    var BATTLE_CARD_IMAGE_URL_PREFIX = BUILDER_IMAGES_URL_PREFIX + "battle/";

    // Figure out the new URL for the card image
    var newBattleCardImgURL = BATTLE_CARD_IMAGE_URL_PREFIX + selectedBattleCardCode + ".png";

    // Allow hiding
    if (selectedBattleCardCode == "...") {
        newBattleCardImgURL = "";
    }

    // Apply this new URL to the img element
    console.log("Applying new URL for that battle card: " + newBattleCardImgURL);
    document.getElementById(battleCardImgElementId).src = newBattleCardImgURL;

}