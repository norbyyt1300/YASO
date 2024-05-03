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
                document.getElementById(targetElementId).innerHTML = update[1] + "<img src='/img/healicon.png' class='wounds-img'>";
            }
            if (targetElementId.endsWith("Damage")) {
                document.getElementById(targetElementId).innerHTML = update[1] + "<img src='/img/damageicon.png' class='damage-img'>";
            }
        } else if (targetElementId.startsWith("showCardUpdate")) {
            var imgSrcURL = getImageForUnitName(update[1]);
            cardImgElement.src = imgSrcURL;
            $('#cardImageModal').modal('show');
        } else if (targetElementId.startsWith("showStanceUpdate")) {
            var imgSrcURL = getStanceImageForUnitName(update[1]);
            
            // Check if the image already matches!
            if (imgSrcURL.includes(";")) {
                var imgSrcURL1 = imgSrcURL.split(";")[0];
                var imgSrcURL2 = imgSrcURL.split(";")[1];

                if (cardImgElement.src != imgSrcURL1) {
                    imgSrcURL = imgSrcURL1;
                } else if (cardImgElement.src != imgSrcURL2) {
                    imgSrcURL = imgSrcURL2;
                }
            }

            cardImgElement.src = imgSrcURL;
            $('#cardImageModal').modal('show');
        }
    }
});

function getStanceImageForUnitName(unitNamewithDashes) {
    console.log("Matching on", unitNamewithDashes);
    switch (unitNamewithDashes) {
        case "Ahsoka-Tano-Jedi-No-More": return "https://shatterpointdb.com/media/mwkpmor3/swp01_ahsoka_stance_article-1.png;https://shatterpointdb.com/media/lbfpcqyb/swp01_ahsoka_stance_article-2.png";
        case "Asajj-Ventress-Sith-Assassin": return "https://shatterpointdb.com/media/4f3chjdq/star-wars-shatterpoint-asajj-ventress-stance-one.png;https://shatterpointdb.com/media/unhltw4d/star-wars-shatterpoint-asajj-ventress-stance-two.png";
        case "Cad-Bane-Notorious-Hunter": return "https://shatterpointdb.com/media/do3cryei/shatterpoint-cad-bane-stance-one.png;https://shatterpointdb.com/media/gashapmy/shatterpoint-cad-bane-stance-two.png";
        case "Chief-Chirpa": return "https://shatterpointdb.com/media/l2oggsmk/shatterpoint-chief-chirpa-stance-one-card.png;https://shatterpointdb.com/media/1bhffout/shatterpoint-chief-chirpa-stance-two-card.png";
        case "Clone-Sergeant-Hunter": return "https://shatterpointdb.com/media/qyddswnj/shatterpoint-clone-sergeant-hunter-stance-one-card.png;https://shatterpointdb.com/media/vexhz0xa/shatterpoint-clone-sergeant-hunter-stance-two-card.png";
        case "Commander-Iden-Versio": return "https://shatterpointdb.com/media/avep2nsc/shatterpoint-commander-iden-versio-stance-one-card.png;https://shatterpointdb.com/media/4g5jvurr/shatterpoint-commander-iden-versio-stance-two-card.png";
        case "Count-Dooku-Separatist-Leader": return "https://shatterpointdb.com/media/zuhjk3xz/star-wars-shatterpoint-count-dooku-stance-1-card.png;https://shatterpointdb.com/media/lqbpnsk0/star-wars-shatterpoint-count-dooku-stance-2card.png";
        case "Darth-Vader-Jedi-Hunter": return "https://shatterpointdb.com/media/fmgjtz5f/star-wars-shatterpoint-darth-vader-jedi-hunter-stance-card.png;https://shatterpointdb.com/media/ccpjyoza/star-wars-shatterpoint-darth-vader-jedi-hunter-stance-two-card.png";
        case "Darth-Vader-The-Emperors-Servant": return "https://shatterpointdb.com/media/gewbys5a/darth-vader-emperors-servant-stance-one-card.png;https://shatterpointdb.com/media/gfvfqbx3/darth-vader-emperors-servant-stance-two-card.png";
        case "General-Anakin-Skywalker": return "https://shatterpointdb.com/media/zf4bstny/starwarsshatterpointanakinskywalkerstanceone.png;https://shatterpointdb.com/media/htydlen3/starwarsshatterpointanakinskywalkerstancetwo.png";
        case "General-Grievous": return "https://shatterpointdb.com/media/l2npxem1/star-wars-shatterpoint-grievous-stance-one-card.png;https://shatterpointdb.com/media/aifflby1/star-wars-shatterpoint-grievous-stance-two-card.png";
        case "General-Obi-Wan-Kenobi": return "https://shatterpointdb.com/media/ymslavex/star-wars-obi-wan-kenobi-unit-stance-1-1.png;https://shatterpointdb.com/media/fmuda4yq/star-wars-obi-wan-kenobi-unit-stance-2-1.png";
        case "General-Solo": return "https://shatterpointdb.com/media/xszbrx4l/shatterpoint-general-solo-stance-one-card.png;https://shatterpointdb.com/media/tcqhj14m/shatterpoint-general-solo-stance-two-card.png";
        case "Grand-Inquisitor-Fallen-Jedi": return "https://shatterpointdb.com/media/slqkhvld/star-wars-shatterpoint-grand-inquisitor-stance-one-card.png;https://shatterpointdb.com/media/yznbdtmy/star-wars-shatterpoint-grand-inquisitor-stance-two-card.png";
        case "Hondo-Honest-Businessman": return "https://shatterpointdb.com/media/uz5pftxm/shatterpoint-hondu-honest-businessman-stance-one-card.png;https://shatterpointdb.com/media/2b5oobqm/shatterpoint-hondu-honest-businessman-stance-two-card.png";
        case "Jedi-Knight-Luke-Skywalker": return "https://shatterpointdb.com/media/ezdjrxi2/jedi-knight-luke-skywalker-stance-one.png;https://shatterpointdb.com/media/tjsflnmv/jedi-knight-luke-skywalker-stance-two.png";
        case "Jedi-Master-Luminara-Unduli": return "https://shatterpointdb.com/media/w2uctnd2/star-wars-shatterpoint-jedi-master-luminara-stance-one-card.png;https://shatterpointdb.com/media/givmggvd/star-wars-shatterpoint-jedi-master-luminara-stance-two-card.png";
        case "Jedi-Master-Mace-Windu": return "https://shatterpointdb.com/media/5jnbib52/star-wars-shatterpoint-mace-windu-stance-one-card.png;https://shatterpointdb.com/media/ho1k44sh/star-wars-shatterpoint-mace-windu-stance-two-card.png";
        case "Jedi-Master-Plo-Koon": return "https://shatterpointdb.com/media/wt2p3xy1/shatterpoint-jedi-master-plo-koon-stance-one-card.png;https://shatterpointdb.com/media/jaqemx3l/shatterpoint-jedi-master-plo-koon-stance-two-card.png";
        case "Leia-Organa-Freedom-Fighter": return "https://shatterpointdb.com/media/j3meqs3w/shatterpoint-leia-organa-freedom-fighter-stance-1-card.png;https://shatterpointdb.com/media/bcult5yp/shatterpoint-leia-organa-freedom-fighter-stance-2-card.png";
        case "Logray-Bright-Tree-Shaman": return "https://shatterpointdb.com/media/mfsn2rvt/shatterpoint-logray-bright-tree-shaman-stance-1card.png;https://shatterpointdb.com/media/s20hy2br/shatterpoint-logray-bright-tree-shaman-stance-2-card.png";
        case "Lord-Maul": return "https://shatterpointdb.com/media/kkgn3wv2/maulstance1.png;https://shatterpointdb.com/media/3jxhjwvb/maulstance2.png";
        case "Moff-Gideon": return "https://shatterpointdb.com/media/uzokaxmd/shatterpoint-moff-gideon-stance-1-card.png;https://shatterpointdb.com/media/1ilflaom/shatterpoint-moff-gideon-stance-2-card.png";
        case "Mother-Talzin": return "https://shatterpointdb.com/media/1emnofyf/star-wars-shatterpoint-mother-talzin-stance-one-card.png;https://shatterpointdb.com/media/dgflaniy/star-wars-shatterpoint-mother-talzin-stance-two-card.png";
        case "Queen-Padme-Amidala": return "https://shatterpointdb.com/media/0lvnicoy/shatterpoint-padme-amidala-stance-onecard.png;https://shatterpointdb.com/media/cv0k4bme/shatterpoint-padme-amidala-stance-two-card.png";
        case "The-Mandalorian": return "https://shatterpointdb.com/media/sccjzr5v/shatterpoint-the-mandalorian-stance-card.png;https://shatterpointdb.com/media/3fshpxpj/shatterpoint-the-mandalorian-stance-two-card.png";
        // Secondary
        case "Aurra-Sing": return "https://shatterpointdb.com/media/tocpwu0j/starwarsshatterpointaurrasingstance.png";
        case "Barriss-Offee-Jedi-Padawan": return "https://shatterpointdb.com/media/hsqov0al/star-wars-shatterpoint-barriss-offee-stance-card.png";
        case "Bo-Katan-Kryze": return "https://shatterpointdb.com/media/v2qpb3kj/star-wars-shatterpoint-bo-katan-stance-card.png";
        case "Boushh-Leia-Organa": return "https://shatterpointdb.com/media/zb0hy1rx/shatterpoint-boush-leia-organa-stance.png";
        case "C-3po-And-R2-D2": return "https://shatterpointdb.com/media/yzmjalao/shatterpoint-c3po-r2d2-stance-one-card.png";
        case "Cc-2224-Clone-Commander-Cody": return "https://shatterpointdb.com/media/q1jox0wo/star-wars-shatterpoint-cody-stance-card.png";
        case "Cc-3636-Commander-Wolffe": return "https://shatterpointdb.com/media/fjydejip/shatterpoint-cc3636-commander-wolffe-stance-card.png";
        case "Cc-7567-Captain-Rex": return "https://shatterpointdb.com/media/cwol20ni/shatterpointrexstance.png";
        case "Chewie": return "https://shatterpointdb.com/media/ehfirung/shatterpoint-chewie-stance-card.png";
        case "Crosshair": return "https://shatterpointdb.com/media/axabrzeg/shatterpoint-crosshair-stance-card.png";
        case "Ct-411-Commander-Ponds": return "https://shatterpointdb.com/media/vqmlpyk5/star-wars-shatterpoint-commander-ponds-stance-card.png";
        case "Death-Trooper-Escort": return "https://shatterpointdb.com/media/of4pmlli/shatterpoint-death-trooper-escort-stance-card.png";
        case "Gar-Saxon-Merciless-Commander": return "https://shatterpointdb.com/media/xu1pp1jl/star-wars-shatterpoint-gar-saxon-stance.png";
        case "Gideon-Hask-Inferno-Squad": return "https://shatterpointdb.com/media/bzxevj5i/shatterpoint-gideon-hask-inferno-squad-stance-card.png";
        case "Greef-Karga": return "https://shatterpointdb.com/media/f0qfqcfx/shatterpoint-greef-karga-stance-card.png";
        case "Gwarm": return "https://shatterpointdb.com/media/zx1da4ws/shatterpoint-gwarm-stance-card.png";
        case "Jango-Fett-Bounty-Hunter": return "https://shatterpointdb.com/media/ooin3tny/star-wars-shatterpoint-jango-fett-stance-card.png";
        case "Kalani-Super-Tactical-Droid": return "https://shatterpointdb.com/media/rsnodu4s/kalani-stance-card.png";
        case "Kraken-Super-Tactical-Droid": return "https://shatterpointdb.com/media/x01daqv1/star-wars-shatterpoint-kraken-stance-card.png";
        case "Obi-Wan-Kenobi-Out-Of-Hiding": return "https://shatterpointdb.com/media/m3zdrcsz/star-wars-shatterpoint-obiwan-jedi-out-of-hiding-stance-card.png";
        case "Padawan-Ahsoka-Tano": return "https://shatterpointdb.com/media/b4elvqdo/shatterpoint-padawan-ahsoka-stance-card.png";
        case "Paploo-Curious-Creature": return "https://shatterpointdb.com/media/ezmpblop/shatterpoint-paploo-curious-creature-stance-card.png";
        case "Sabe-Royal-Bodyguard": return "https://shatterpointdb.com/media/nuddiknt/shatterpoint-sabe-stance-card.png";
        case "Savage-Opress": return "https://shatterpointdb.com/media/gucpwygx/star-wars-shatterpoint-savage-opress-stance-card.png";
        case "Stormtrooper-Sergeant": return "https://shatterpointdb.com/media/ir5joe3o/shatterpoint-stormtrooper-sergeant-stance.png";
        case "Third-Sister": return "https://shatterpointdb.com/media/t2phqcpp/star-wars-shatterpoint-third-sister-stance-card.png";
        case "Wicket-Intrepid-Warrior": return "https://shatterpointdb.com/media/033jc0gw/shatterpoint-wicket-intrepid-stance-card.png";
        case "Wrecker-And-Omega": return "https://shatterpointdb.com/media/1lzc5ult/shatterpoint-wrecker-and-omega-stance-two-card.png;https://shatterpointdb.com/media/ymtceyfd/shatterpoint-wrecker-and-omega-stance-one-card.png";
        // Support
        case "104th-Wolfpack-Troopers": return "https://shatterpointdb.com/media/4bjpbhu3/shatterpoint-104th-wolfpack-trooper-stance-card.png";
        case "212th-Clone-Troopers": return "https://shatterpointdb.com/media/5i4baw4u/star-wars-shatterpoint-212th-stance-card.png";
        case "501st-Clone-Troopers": return "https://shatterpointdb.com/media/wv2bnq24/shatterpoint501stance.png";
        case "Arf-Clone-Troopers": return "https://shatterpointdb.com/media/f10hbmu2/star-wars-shatterpoint-arf-clone-troopers-stance-card.png";
        case "B1-Battle-Droids": return "https://shatterpointdb.com/media/bi4hxev0/b1-stance-card.png";
        case "B2-Battle-Droids": return "https://shatterpointdb.com/media/zrwakce5/star-wars-shatterpoint-b2-stance-card.png";
        case "Bounty-Hunters": return "https://shatterpointdb.com/media/luvnsqma/shatterpointbountyhuntersstance.png";
        case "Clan-Kryze-Mandalorians": return "https://shatterpointdb.com/media/ggfiaj3j/star-wars-shatterpoint-kryze-mandos-stance-card.png";
        case "Dark-Troopers": return "https://shatterpointdb.com/media/hp3dxleo/shatterpoint-dark-trooper-stance-card.png";
        case "Del-Meeko-Inferno-Squad": return "https://shatterpointdb.com/media/v5kpgj5n/shatterpoint-del-meeko-inferno-squad-stance-card.png";
        case "Echo-And-Tech": return "https://shatterpointdb.com/media/2aoocls5/shatterpoint-echo-and-tech-stance-card.png";
        case "Ewok-Hunters": return "https://shatterpointdb.com/media/3dfhnrar/shatterpoint-ewok-hunters-stance-card.png";
        case "Ewok-Trappers": return "https://shatterpointdb.com/media/bosmdh10/shatterpoint-ewok-trappers-stance-card.png";
        case "Fifth-Brother": return "https://shatterpointdb.com/media/0gcevbmb/star-wars-shatterpoint-fifth-brother-stance-card.png";
        case "Fourth-Sister": return "https://shatterpointdb.com/media/cm0dcffl/star-wars-shatterpoint-fourth-sister-stance-card.png";
        case "Ig-11-Assassin-Droid": return "https://shatterpointdb.com/media/q4mhigql/shatterpoint-ig-11-assassin-droid-stance-card.png";
        case "Imperial-Special-Forces": return "https://shatterpointdb.com/media/lzyikq3m/shatterpoint-imperial-special-forces-stance-card.png";
        case "Lando-And-R2-D2-Inside-Job": return "https://shatterpointdb.com/media/o0unm2rl/shatterpoint-lando-and-r2d2-inside-job-stance.png";
        case "Magnaguard": return "https://shatterpointdb.com/media/n1glwks5/star-wars-shatterpoint-magnaguard-stance-card.png";
        case "Mandalorian-Super-Commandos": return "https://shatterpointdb.com/media/umplqvvr/star-wars-mandalorian-super-commandos-stance.png";
        case "Naboo-Royal-Handmaidens": return "https://shatterpointdb.com/media/miyhunki/shatterpoint-haindmaden-stance-card.png";
        case "Nightsister-Acolytes": return "https://shatterpointdb.com/media/3cbfdsvc/star-wars-shatterpoint-nightsisters-stance-card.png";
        case "Rebel-Commandos": return "https://shatterpointdb.com/media/3kif12g0/shatterpoint-rebel-commandos-stance-card.png";
        case "Republic-Clone-Commandos": return "https://shatterpointdb.com/media/abflwa3o/star-wars-shatterpoint-clone-commandos-stance-card.png";
        case "Stormtroopers": return "https://shatterpointdb.com/media/sqjepdet/shatterpoint-stormtroopers-stance.png";
        case "Weequay-Pirates": return "https://shatterpointdb.com/media/u03b0rf0/shatterpoint-weequay-pirates-stance-card.png";
        default:
            return "";
    }
}

function getImageForUnitName(unitNamewithDashes) {
    console.log("Matching on", unitNamewithDashes);
    switch (unitNamewithDashes) {
        case "Ahsoka-Tano-Jedi-No-More": return "https://shatterpointdb.com/media/lzzju4ow/swp01_ahsoka_unit_article-2.png";
        case "Asajj-Ventress-Sith-Assassin": return "https://shatterpointdb.com/media/gtbhclqv/star-wars-shatterpoint-asajj-ventress-abilities.png";
        case "Cad-Bane-Notorious-Hunter": return "https://shatterpointdb.com/media/copb2eis/shatterpoint-cad-bane-abilities.png";
        case "Chief-Chirpa": return "https://shatterpointdb.com/media/ishpuyo4/shatterpoint-chief-chirpa-abilities-card.png";
        case "Clone-Sergeant-Hunter": return "https://shatterpointdb.com/media/eomhb5x0/shatterpoint-clone-sergeant-hunter-abilities-card.png";
        case "Count-Dooku-Separatist-Leader": return "https://shatterpointdb.com/media/nx0l502q/star-wars-shatterpoint-count-dooku-abilitiescard.png";
        case "Darth-Vader-Jedi-Hunter": return "https://shatterpointdb.com/media/wg4l43lc/star-wars-shatterpoint-darth-vader-jedi-hunter-abilities-card.png";
        case "Darth-Vader-The-Emperors-Servant": return "https://shatterpointdb.com/media/a2sentr3/darth-vader-emperors-servant-abilities-card.png";
        case "General-Anakin-Skywalker": return "https://shatterpointdb.com/media/kvroyyyq/starwarsshatterpointanakinskywalkerabilities.png";
        case "General-Grievous": return "https://shatterpointdb.com/media/5rda1caq/star-wars-shatterpoint-grievous-abilities-card.png";
        case "General-Obi-Wan-Kenobi": return "https://shatterpointdb.com/media/nu5lll4z/star-wars-obi-wan-kenobi-unit-abilities-1.png";
        case "Grand-Inquisitor-Fallen-Jedi": return "https://shatterpointdb.com/media/amrbqebc/star-wars-shatterpoint-grand-inquisitor-abilities-card.png";
        case "Hondo-Honest-Businessman": return "https://shatterpointdb.com/media/3xvcgij0/shatterpoint-hondu-honest-businessman-abilities-card.png";
        case "Jedi-Knight-Luke-Skywalker": return "https://shatterpointdb.com/media/kymhepgr/jedi-knight-luke-skywalker-abilities-card.png";
        case "Jedi-Master-Luminara-Unduli": return "https://shatterpointdb.com/media/qevpee3w/star-wars-shatterpoint-jedi-master-luminara-abilities-card.png";
        case "Jedi-Master-Mace-Windu": return "https://shatterpointdb.com/media/gs1ktczl/star-wars-shatterpoint-mace-windu-abilities-card.png";
        case "Jedi-Master-Plo-Koon": return "https://shatterpointdb.com/media/aybbi0f0/shatterpoint-jedi-master-plo-koon-abilities-card.png";
        case "Leia-Organa-Freedom-Fighter": return "https://shatterpointdb.com/media/bayagrq1/shatterpoint-leia-organa-freedom-fighter-abilities-card.png";
        case "Logray-Bright-Tree-Shaman": return "https://shatterpointdb.com/media/hg5b3x21/shatterpoint-logray-bright-tree-shaman-abilities-card.png";
        case "Lord-Maul": return "https://shatterpointdb.com/media/i3vdw20w/maulabilities.png";
        case "Moff-Gideon": return "https://shatterpointdb.com/media/qiolefrk/shatterpoint-moff-gideon-abilities-card.png";
        case "Mother-Talzin": return "https://shatterpointdb.com/media/kskj5yqt/star-wars-shatterpoint-mother-talzin-abilities-card.png";
        case "Queen-Padme-Amidala": return "https://shatterpointdb.com/media/w0akessn/shatterpoint-padme-amidala-abilities-card.png";
        case "The-Mandalorian": return "https://shatterpointdb.com/media/2jsp2bmw/shatterpoint-the-mandalorian-abilities-card.png";
        // Secondary
        case "Aurra-Sing": return "https://shatterpointdb.com/media/rlxpwysx/starwarsshatterpointaurrasingabilities.png";
        case "Barriss-Offee-Jedi-Padawan": return "https://shatterpointdb.com/media/vpvgdsce/star-wars-shatterpoint-barriss-offee-abilities-card.png";
        case "Bo-Katan-Kryze": return "https://shatterpointdb.com/media/rjph4i5n/star-wars-shatterpoint-bo-katan-abilities-card.png";
        case "Boushh-Leia-Organa": return "https://shatterpointdb.com/media/yytc5uan/shatterpoint-boush-leia-organa-abilities.png";
        case "C-3po-And-R2-D2": return "https://shatterpointdb.com/media/g1jcbky2/shatterpoint-c3po-r2d2-abilities-card.png";
        case "Cc-2224-Clone-Commander-Cody": return "https://shatterpointdb.com/media/51rjzinn/star-wars-shatterpoint-cody-abilities-card.png";
        case "Cc-3636-Commander-Wolffe": return "https://shatterpointdb.com/media/piubosi1/shatterpoint-cc3636-commander-wolffe-abilities-card.png";
        case "Cc-7567-Captain-Rex": return "https://shatterpointdb.com/media/ecyhahod/shatterpointrexabilities.png";
        case "Crosshair": return "https://shatterpointdb.com/media/4ikdei4o/shatterpoint-crosshair-abilities-card.png";
        case "Ct-411-Commander-Ponds": return "https://shatterpointdb.com/media/oxalgs52/star-wars-shatterpoint-commander-ponds-abilities-card.png";
        case "Death-Trooper-Escort": return "https://shatterpointdb.com/media/oxwf2ysp/shatterpoint-death-trooper-escort-abilities-card.png";
        case "Gar-Saxon-Merciless-Commander": return "https://shatterpointdb.com/media/ffmjwwbz/star-wars-shatterpoint-gar-saxon-abilities.png";
        case "Greef-Karga": return "https://shatterpointdb.com/media/yemk2chw/shatterpoint-greef-karga-abilities-card.png";
        case "Gwarm": return "https://shatterpointdb.com/media/nmbhiaks/shatterpoint-gwarm-abilities-card.png";
        case "Jango-Fett-Bounty-Hunter": return "https://shatterpointdb.com/media/0h1jydyw/star-wars-shatterpoint-jango-fett-abilities-card.png";
        case "Kalani-Super-Tactical-Droid": return "https://shatterpointdb.com/media/2mykdrxq/star-wars-shatterpoint-kalani-abilities.png";
        case "Kraken-Super-Tactical-Droid": return "https://shatterpointdb.com/media/2knlge30/star-wars-shatterpoint-kraken-abilities-card.png";
        case "Obi-Wan-Kenobi-Out-Of-Hiding": return "https://shatterpointdb.com/media/helfhnbg/star-wars-shatterpoint-obiwan-jedi-out-of-hiding-abilities-card.png";
        case "Padawan-Ahsoka-Tano": return "https://shatterpointdb.com/media/lshpmmou/shatterpoint-padawan-ahsoka-abilities-card.png";
        case "Paploo-Curious-Creature": return "https://shatterpointdb.com/media/kshjcnxm/shatterpoint-paploo-curious-creature-abilities-card.png";
        case "Sabe-Royal-Bodyguard": return "https://shatterpointdb.com/media/zqxg2tvz/shatterpoint-sabe-abilities-card.png";
        case "Savage-Opress": return "https://shatterpointdb.com/media/ca2ebfhv/star-wars-shatterpoint-savage-opress-abilities-card.png";
        case "Stormtrooper-Sergeant": return "https://shatterpointdb.com/media/vnwlu5p0/shatterpoint-stormtrooper-sergeant-abilities-card.png";
        case "Third-Sister": return "https://shatterpointdb.com/media/axnhnyke/star-wars-shatterpoint-third-sister-abilities-card.png";
        case "Wicket-Intrepid-Warrior": return "https://shatterpointdb.com/media/n5njnikt/shatterpoint-wicket-intrepid-abilities-card.png";
        case "Wrecker-And-Omega": return "https://shatterpointdb.com/media/xrvni1y3/shatterpoint-wrecker-and-omega-abilities-card.png";
        // Support
        case "104th-Wolfpack-Troopers": return "https://shatterpointdb.com/media/j2ndzfj5/shatterpoint-104th-wolfpack-trooper-abilities-card.png";
        case "212th-Clone-Troopers": return "https://shatterpointdb.com/media/mnapd10l/star-wars-shatterpoint-212th-abilities-card.png";
        case "501st-Clone-Troopers": return "https://shatterpointdb.com/media/rtnnk45u/shatterpoint501abilities.png";
        case "Arf-Clone-Troopers": return "https://shatterpointdb.com/media/wwvnjxcc/star-wars-shatterpoint-arf-clone-troopers-abilities-card.png";
        case "B1-Battle-Droids": return "https://shatterpointdb.com/media/xf5l5vmw/star-wars-shatterpoint-b1-abilities.png";
        case "B2-Battle-Droids": return "https://shatterpointdb.com/media/0xfnvtbi/star-wars-shatterpoint-b2-abilities-card.png";
        case "Bounty-Hunters": return "https://shatterpointdb.com/media/efgjchcn/shatterpointbountyhuntersabilities.png";
        case "Clan-Kryze-Mandalorians": return "https://shatterpointdb.com/media/1s0eunhx/star-wars-shatterpoint-kryze-mandos-abilities-card.png";
        case "Dark-Troopers": return "https://shatterpointdb.com/media/sa2e45ux/shatterpoint-dark-trooper-abilities-card.png";
        case "Echo-And-Tech": return "https://shatterpointdb.com/media/mcupxkp0/shatterpoint-echo-and-tech-abilities-card.png";
        case "Ewok-Hunters": return "https://shatterpointdb.com/media/2kdjrc31/shatterpoint-ewok-hunters-abilities-card.png";
        case "Ewok-Trappers": return "https://shatterpointdb.com/media/qhnhqlym/shatterpoint-ewok-trappers-abilities-card.png";
        case "Fifth-Brother": return "https://shatterpointdb.com/media/gzunedaf/star-wars-shatterpoint-fifth-brother-abilities-card.png";
        case "Fourth-Sister": return "https://shatterpointdb.com/media/o1ibw5nk/star-wars-shatterpoint-fourth-sister-abilities-card.png";
        case "Ig-11-Assassin-Droid": return "https://shatterpointdb.com/media/mahfphso/shatterpoint-ig-11-assassin-droid-abilities-card.png";
        case "Lando-And-R2-D2-Inside-Job": return "https://shatterpointdb.com/media/kbklwk4t/shatterpoint-lando-and-r2d2-inside-job-abilities.png";
        case "Magnaguard": return "https://shatterpointdb.com/media/0fmbhkw3/star-wars-shatterpoint-magnaguard-abilities-card.png";
        case "Mandalorian-Super-Commandos": return "https://shatterpointdb.com/media/fzcj52gl/star-wars-shatterpoint-mandalorian-super-commandos-abilities.png";
        case "Naboo-Royal-Handmaidens": return "https://shatterpointdb.com/media/cofheu2y/shatterpoint-haindmaden-abilities-card.png";
        case "Nightsister-Acolytes": return "https://shatterpointdb.com/media/3dtjhohk/star-wars-shatterpoint-nightsisters-abilities-card.png";
        case "Republic-Clone-Commandos": return "https://shatterpointdb.com/media/u4vptay3/star-wars-shatterpoint-clone-commandos-abilities-card.png";
        case "Stormtroopers": return "https://shatterpointdb.com/media/rggjzkc5/shatterpoint-stormtroopers-abilities-card.png";
        case "Weequay-Pirates": return "https://shatterpointdb.com/media/3c1bz0fo/shatterpoint-weequay-pirates-abilitie-card.png";
        default:
            return "";
    }
}