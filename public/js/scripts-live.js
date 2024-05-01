var cardImgElement = document.getElementById("cardImage");
var cardImgModal = document.getElementById("cardImageModal");

var socket = io();
socket.on('update', function (update) {
    console.log('Socket update received from settings page: ', update);

    var command = update[0];

    if (command == "updateElementInnerHTML") {
        console.log("Updating element inner HTML:");
        document.getElementById(update[1]).innerHTML = update[2];
    } else if (command=="HideCurrentlyShownCard") {
        console.log("Hiding modal for card");
        $('#cardImageModal').modal('hide');
    } else {

        var targetElementId = update[0];

        if (targetElementId.startsWith("playerName") || targetElementId.startsWith("squadName") || targetElementId.startsWith("strugglesWon")) {
            document.getElementById(targetElementId).innerText = update[1];
        } else if (targetElementId.startsWith("unitUpdate_")) {
            // Remove prefix
            targetElementId = targetElementId.replace("unitUpdate_", "");
            // Update image element
            var targetImgElementId = targetElementId.replace("Name", "Img");
            var imgSrcURL = getImageForUnitName(update[1]);
            document.getElementById(targetImgElementId).style.backgroundImage = "url(" + imgSrcURL + ")";
            // Remove dashes and update label
            var unitName = update[1].replace(/-/g, ' ');
            document.getElementById(targetElementId).innerText = unitName;
            // TODO: add stamina and wounds to the update
        } else if (targetElementId.startsWith("unitDamageWoundsUpdate_")) {
            // Remove prefix
            targetElementId = targetElementId.replace("unitDamageWoundsUpdate_", "");
            console.log(targetElementId);
            console.log("Updating unit damage and wounds:", targetElementId, update[1]);

            if (targetElementId.endsWith("Wounds")) {
                document.getElementById(targetElementId).innerHTML = update[1] + "<img src='https://shatterpointdb.com/media/tiol4sk3/shatterpointhealicon.png' class='wounds-img'>";
            }
            if (targetElementId.endsWith("Damage")) {
                document.getElementById(targetElementId).innerHTML = update[1] + "<img src='https://shatterpointdb.com/media/yvxlykhe/shatterpointdamageicon.png' class='damage-img'>";
            }
        } else if (targetElementId.startsWith("showCardUpdate")) {
            var imgSrcURL = getImageForUnitName(update[1]);
            cardImgElement.src = imgSrcURL;
            $('#cardImageModal').modal('show');
        }
    }
});

function getImageForUnitName(unitNamewithDashes) {
    console.log("Matching on", unitNamewithDashes);
    switch (unitNamewithDashes) {
        case "Ahsoka-Tano-Jedi-No-More": return "https://shatterpointdb.com/media/lzzju4ow/swp01_ahsoka_unit_article-2.png"; break;
        case "Asajj-Ventress-Sith-Assassin": return "https://shatterpointdb.com/media/gtbhclqv/star-wars-shatterpoint-asajj-ventress-abilities.png"; break;
        case "Cad-Bane-Notorious-Hunter": return "https://shatterpointdb.com/media/copb2eis/shatterpoint-cad-bane-abilities.png"; break;
        case "Chief-Chirpa": return "https://shatterpointdb.com/media/ishpuyo4/shatterpoint-chief-chirpa-abilities-card.png"; break;
        case "Clone-Sergeant-Hunter": return "https://shatterpointdb.com/media/eomhb5x0/shatterpoint-clone-sergeant-hunter-abilities-card.png"; break;
        case "Count-Dooku-Separatist-Leader": return "https://shatterpointdb.com/media/nx0l502q/star-wars-shatterpoint-count-dooku-abilitiescard.png"; break;
        case "Darth-Vader-Jedi-Hunter": return "https://shatterpointdb.com/media/wg4l43lc/star-wars-shatterpoint-darth-vader-jedi-hunter-abilities-card.png"; break;
        case "Darth-Vader-The-Emperors-Servant": return "https://shatterpointdb.com/media/a2sentr3/darth-vader-emperors-servant-abilities-card.png"; break;
        case "General-Anakin-Skywalker": return "https://shatterpointdb.com/media/kvroyyyq/starwarsshatterpointanakinskywalkerabilities.png"; break;
        case "General-Grievous": return "https://shatterpointdb.com/media/5rda1caq/star-wars-shatterpoint-grievous-abilities-card.png"; break;
        case "General-Obi-Wan-Kenobi": return "https://shatterpointdb.com/media/nu5lll4z/star-wars-obi-wan-kenobi-unit-abilities-1.png"; break;
        case "Grand-Inquisitor-Fallen-Jedi": return "https://shatterpointdb.com/media/amrbqebc/star-wars-shatterpoint-grand-inquisitor-abilities-card.png"; break;
        case "Hondo-Honest-Businessman": return "https://shatterpointdb.com/media/3xvcgij0/shatterpoint-hondu-honest-businessman-abilities-card.png"; break;
        case "Jedi-Knight-Luke-Skywalker": return "https://shatterpointdb.com/media/kymhepgr/jedi-knight-luke-skywalker-abilities-card.png"; break;
        case "Jedi-Master-Luminara-Unduli": return "https://shatterpointdb.com/media/qevpee3w/star-wars-shatterpoint-jedi-master-luminara-abilities-card.png"; break;
        case "Jedi-Master-Mace-Windu": return "https://shatterpointdb.com/media/gs1ktczl/star-wars-shatterpoint-mace-windu-abilities-card.png"; break;
        case "Jedi-Master-Plo-Koon": return "https://shatterpointdb.com/media/aybbi0f0/shatterpoint-jedi-master-plo-koon-abilities-card.png"; break;
        case "Leia-Organa-Freedom-Fighter": return "https://shatterpointdb.com/media/bayagrq1/shatterpoint-leia-organa-freedom-fighter-abilities-card.png"; break;
        case "Logray-Bright-Tree-Shaman": return "https://shatterpointdb.com/media/hg5b3x21/shatterpoint-logray-bright-tree-shaman-abilities-card.png"; break;
        case "Lord-Maul": return "https://shatterpointdb.com/media/i3vdw20w/maulabilities.png"; break;
        case "Moff-Gideon": return "https://shatterpointdb.com/media/qiolefrk/shatterpoint-moff-gideon-abilities-card.png"; break;
        case "Mother-Talzin": return "https://shatterpointdb.com/media/kskj5yqt/star-wars-shatterpoint-mother-talzin-abilities-card.png"; break;
        case "Queen-Padme-Amidala": return "https://shatterpointdb.com/media/w0akessn/shatterpoint-padme-amidala-abilities-card.png"; break;
        case "The-Mandalorian": return "https://shatterpointdb.com/media/2jsp2bmw/shatterpoint-the-mandalorian-abilities-card.png"; break;
        // Secondary
        case "Aurra-Sing": return "https://shatterpointdb.com/media/rlxpwysx/starwarsshatterpointaurrasingabilities.png"; break;
        case "Barriss-Offee-Jedi-Padawan": return "https://shatterpointdb.com/media/vpvgdsce/star-wars-shatterpoint-barriss-offee-abilities-card.png"; break;
        case "Bo-Katan-Kryze": return "https://shatterpointdb.com/media/rjph4i5n/star-wars-shatterpoint-bo-katan-abilities-card.png"; break;
        case "Boushh-Leia-Organa": return "https://shatterpointdb.com/media/yytc5uan/shatterpoint-boush-leia-organa-abilities.png"; break;
        case "C-3po-And-R2-D2": return "https://shatterpointdb.com/media/g1jcbky2/shatterpoint-c3po-r2d2-abilities-card.png"; break;
        case "Cc-2224-Clone-Commander-Cody": return "https://shatterpointdb.com/media/51rjzinn/star-wars-shatterpoint-cody-abilities-card.png"; break;
        case "Cc-3636-Commander-Wolffe": return "https://shatterpointdb.com/media/piubosi1/shatterpoint-cc3636-commander-wolffe-abilities-card.png"; break;
        case "Cc-7567-Captain-Rex": return "https://shatterpointdb.com/media/ecyhahod/shatterpointrexabilities.png"; break;
        case "Crosshair": return "https://shatterpointdb.com/media/4ikdei4o/shatterpoint-crosshair-abilities-card.png"; break;
        case "Ct-411-Commander-Ponds": return "https://shatterpointdb.com/media/oxalgs52/star-wars-shatterpoint-commander-ponds-abilities-card.png"; break;
        case "Death-Trooper-Escort": return "https://shatterpointdb.com/media/oxwf2ysp/shatterpoint-death-trooper-escort-abilities-card.png"; break;
        case "Gar-Saxon-Merciless-Commander": return "https://shatterpointdb.com/media/ffmjwwbz/star-wars-shatterpoint-gar-saxon-abilities.png"; break;
        case "Greef-Karga": return "https://shatterpointdb.com/media/yemk2chw/shatterpoint-greef-karga-abilities-card.png"; break;
        case "Gwarm": return "https://shatterpointdb.com/media/nmbhiaks/shatterpoint-gwarm-abilities-card.png"; break;
        case "Jango-Fett-Bounty-Hunter": return "https://shatterpointdb.com/media/0h1jydyw/star-wars-shatterpoint-jango-fett-abilities-card.png"; break;
        case "Kalani-Super-Tactical-Droid": return "https://shatterpointdb.com/media/2mykdrxq/star-wars-shatterpoint-kalani-abilities.png"; break;
        case "Kraken-Super-Tactical-Droid": return "https://shatterpointdb.com/media/2knlge30/star-wars-shatterpoint-kraken-abilities-card.png"; break;
        case "Obi-Wan-Kenobi-Out-Of-Hiding": return "https://shatterpointdb.com/media/helfhnbg/star-wars-shatterpoint-obiwan-jedi-out-of-hiding-abilities-card.png"; break;
        case "Padawan-Ahsoka-Tano": return "https://shatterpointdb.com/media/lshpmmou/shatterpoint-padawan-ahsoka-abilities-card.png"; break;
        case "Paploo-Curious-Creature": return "https://shatterpointdb.com/media/kshjcnxm/shatterpoint-paploo-curious-creature-abilities-card.png"; break;
        case "Sabe-Royal-Bodyguard": return "https://shatterpointdb.com/media/zqxg2tvz/shatterpoint-sabe-abilities-card.png"; break;
        case "Savage-Opress": return "https://shatterpointdb.com/media/ca2ebfhv/star-wars-shatterpoint-savage-opress-abilities-card.png"; break;
        case "Stormtrooper-Sergeant": return "https://shatterpointdb.com/media/vnwlu5p0/shatterpoint-stormtrooper-sergeant-abilities-card.png"; break;
        case "Third-Sister": return "https://shatterpointdb.com/media/axnhnyke/star-wars-shatterpoint-third-sister-abilities-card.png"; break;
        case "Wicket-Intrepid-Warrior": return "https://shatterpointdb.com/media/n5njnikt/shatterpoint-wicket-intrepid-abilities-card.png"; break;
        case "Wrecker-And-Omega": return "https://shatterpointdb.com/media/xrvni1y3/shatterpoint-wrecker-and-omega-abilities-card.png"; break;
        // Support
        case "104th-Wolfpack-Troopers": return "https://shatterpointdb.com/media/j2ndzfj5/shatterpoint-104th-wolfpack-trooper-abilities-card.png"; break;
        case "212th-Clone-Troopers": return "https://shatterpointdb.com/media/mnapd10l/star-wars-shatterpoint-212th-abilities-card.png"; break;
        case "501st-Clone-Troopers": return "https://shatterpointdb.com/media/rtnnk45u/shatterpoint501abilities.png"; break;
        case "Arf-Clone-Troopers": return "https://shatterpointdb.com/media/wwvnjxcc/star-wars-shatterpoint-arf-clone-troopers-abilities-card.png"; break;
        case "B1-Battle-Droids": return "https://shatterpointdb.com/media/xf5l5vmw/star-wars-shatterpoint-b1-abilities.png"; break;
        case "B2-Battle-Droids": return "https://shatterpointdb.com/media/0xfnvtbi/star-wars-shatterpoint-b2-abilities-card.png"; break;
        case "Bounty-Hunters": return "https://shatterpointdb.com/media/efgjchcn/shatterpointbountyhuntersabilities.png"; break;
        case "Clan-Kryze-Mandalorians": return "https://shatterpointdb.com/media/1s0eunhx/star-wars-shatterpoint-kryze-mandos-abilities-card.png"; break;
        case "Dark-Troopers": return "https://shatterpointdb.com/media/sa2e45ux/shatterpoint-dark-trooper-abilities-card.png"; break;
        case "Echo-And-Tech": return "https://shatterpointdb.com/media/mcupxkp0/shatterpoint-echo-and-tech-abilities-card.png"; break;
        case "Ewok-Hunters": return "https://shatterpointdb.com/media/2kdjrc31/shatterpoint-ewok-hunters-abilities-card.png"; break;
        case "Ewok-Trappers": return "https://shatterpointdb.com/media/qhnhqlym/shatterpoint-ewok-trappers-abilities-card.png"; break;
        case "Fifth-Brother": return "https://shatterpointdb.com/media/gzunedaf/star-wars-shatterpoint-fifth-brother-abilities-card.png"; break;
        case "Fourth-Sister": return "https://shatterpointdb.com/media/o1ibw5nk/star-wars-shatterpoint-fourth-sister-abilities-card.png"; break;
        case "Ig-11-Assassin-Droid": return "https://shatterpointdb.com/media/mahfphso/shatterpoint-ig-11-assassin-droid-abilities-card.png"; break;
        case "Lando-And-R2-D2-Inside-Job": return "https://shatterpointdb.com/media/kbklwk4t/shatterpoint-lando-and-r2d2-inside-job-abilities.png"; break;
        case "Magnaguard": return "https://shatterpointdb.com/media/0fmbhkw3/star-wars-shatterpoint-magnaguard-abilities-card.png"; break;
        case "Mandalorian-Super-Commandos": return "https://shatterpointdb.com/media/fzcj52gl/star-wars-shatterpoint-mandalorian-super-commandos-abilities.png"; break;
        case "Naboo-Royal-Handmaidens": return "https://shatterpointdb.com/media/cofheu2y/shatterpoint-haindmaden-abilities-card.png"; break;
        case "Nightsister-Acolytes": return "https://shatterpointdb.com/media/3dtjhohk/star-wars-shatterpoint-nightsisters-abilities-card.png"; break;
        case "Republic-Clone-Commandos": return "https://shatterpointdb.com/media/u4vptay3/star-wars-shatterpoint-clone-commandos-abilities-card.png"; break;
        case "Stormtroopers": return "https://shatterpointdb.com/media/rggjzkc5/shatterpoint-stormtroopers-abilities-card.png"; break;
        case "Weequay-Pirates": return "https://shatterpointdb.com/media/3c1bz0fo/shatterpoint-weequay-pirates-abilitie-card.png"; break;
        default:
            return ""; break;
    }
    return "";
}