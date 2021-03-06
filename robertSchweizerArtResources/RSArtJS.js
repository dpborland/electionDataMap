//---// Function Declarations //---//

function getAJAXContent(dataPipe, containerElementByClass) {
    let ajaxFill = "robertSchweizerArtResources/" + dataPipe.elementClicked.textContent.split(" ").join("").toLowerCase().replace(/&/g, "&amp;") + ".html";
    let xhttp = new XMLHttpRequest();
    let container, response;

    xhttp.open("GET", ajaxFill, true);

    xhttp.onload = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {
            response = xhttp.responseText;
            Array.isArray(containerElementByClass) ?
                (container = document.querySelectorAll("." + containerElementByClass[0])[containerElementByClass[1]],
                    container.innerHTML = response)
                :
                (container = document.querySelector("." + containerElementByClass),
                    container.innerHTML = response);
        } else {
            console.log(xhttp.status);
        }
    }

    xhttp.send();
    return dataPipe;
}

function dataCollector(event, ...keyValuePairs) {
    return new Promise( (resolve, reject) => {
       let dataPipe = {};

        if (event.target !== undefined) {
            keyValuePairs.forEach( (keyValue) => {
                dataPipe[keyValue[0]] = keyValue[1];
            });

            resolve(dataPipe);

        } else {
            reject(event);
        }
    });
}

function findIndexOfClicked(dataPipe, ...elementsByClass) {
    let array = Array.from(document.querySelectorAll("." + elementsByClass));

    array.forEach( (element, index) => {
        if (element === dataPipe.elementClicked) {
            dataPipe.elementClickedIndex = index;
            return dataPipe;
        }
    });

    return dataPipe;
}

function findElementOfClass(dataPipe, elementsToSearch, classToSearch) {
    let elementArray = Array.from(document.querySelectorAll("." + elementsToSearch));

    elementArray.findIndex( (element, index) => {
        if (element.classList.contains(classToSearch)) {
            dataPipe.currentElementIndex = index;
        }
    });

    return dataPipe;
}

function findNextThumbnailIndex(dataPipe, elementsToSearch) {
    let elementArray = Array.from(document.querySelectorAll("." + elementsToSearch));

    if (dataPipe.elementClickedId === "increment") {
        dataPipe.currentElementIndex === elementArray.length - 1 ?
            (dataPipe.nextIndex = 0, console.log(dataPipe.elementClickedId, dataPipe.nextIndex))
            :
            (dataPipe.nextIndex = dataPipe.currentElementIndex + 1, console.log(dataPipe.elementClickedId, dataPipe.nextIndex));

    } else if (dataPipe.elementClickedId === "decrement") {
        dataPipe.currentElementIndex === 0 ?
            (dataPipe.nextIndex = elementArray.length - 1, console.log(dataPipe.elementClickedId, dataPipe.nextIndex))
            :
            (dataPipe.nextIndex = dataPipe.currentElementIndex - 1, console.log(dataPipe.elementClickedId, dataPipe.nextIndex));

    } else {
        elementArray.findIndex( (element, index) => {
            if (element.id === dataPipe.elementClickedId) {
                dataPipe.nextIndex = index;
                console.log(dataPipe.elementClickedId, dataPipe.nextIndex);
            } else if (element === dataPipe.elementClicked) {
                dataPipe.nextIndex = index;
                console.log(dataPipe.elementClickedId, dataPipe.nextIndex);
            }
        });
    }

    return dataPipe;
}

function classAdder(dataPipe, classToAdd, ...targetElementsByClass) {
    let specificElement, elementArray;

    targetElementsByClass.forEach( (target) => {
        if (Array.isArray(target)) {
            specificElement = document.querySelectorAll("." + target[0])[target[1]];
            specificElement.classList.add(classToAdd);
        } else if (!Array.isArray(target)) {
            elementArray = Array.from(document.querySelectorAll("." + target));
            elementArray.forEach( (element) => {
                element.classList.add(classToAdd);
            });
        } else {
            return dataPipe;
        }
    });

    return dataPipe;
}

function classRemover(dataPipe, classToRemove, ...targetElementsByClass) {
    let specificElement, elementArray;

    targetElementsByClass.forEach( (target) => {
        if (Array.isArray(target)) {
            specificElement = document.querySelectorAll("." + target[0])[target[1]];
            specificElement.classList.remove(classToRemove);
        } else if (!Array.isArray(target)) {
            elementArray = Array.from(document.querySelectorAll("." + target));
            elementArray.forEach( (element) => {
                element.classList.remove(classToRemove);
            });
        } else {
            return dataPipe;
        }
    });

    return dataPipe;
}

function classToggler(dataPipe, classToToggle, ...targetElementsByClass) {
    let specificElement, elementArray;

    targetElementsByClass.forEach( (target) => {
        if (Array.isArray(target)) {
            specificElement = document.querySelectorAll("." + target[0])[target[1]];
            specificElement.classList.toggle(classToToggle);
        } else if (!Array.isArray(target)) {
            elementArray = Array.from(document.querySelectorAll("." + target));
            elementArray.forEach( (element) => {
                element.classList.toggle(classToToggle);
            });
        } else {
            return dataPipe;
        }
    });

    return dataPipe;
}

function changeAttribute(dataPipe, attr, newAttrValue, ...targetElementsByClass) {
    let specificElement, elementArray;

    targetElementsByClass.forEach( (target) => {
        Array.isArray(target) ?
            (specificElement = document.querySelectorAll("." + target[0])[target[1]],
                specificElement.setAttribute(attr, newAttrValue))
            :
            (elementArray = Array.from(document.querySelectorAll("." + target)),
                elementArray.forEach( (element) => {
                    element.setAttribute(attr, newAttrValue);
                }))
    });

    return dataPipe;
}

function textToggler(initialText, nextText, elementByClassName) {
    let element;

    if (Array.isArray(elementByClassName) === true) {
        element = document.querySelectorAll("." + elementByClassName[0])[elementByClassName[1]];
        element.firstChild.textContent === initialText ?
            element.firstChild.textContent = nextText
            :
            element.firstChild.textContent = initialText
    } else {
        element = document.querySelectorAll("." + elementByClassName);
        element.forEach( (individualElement) => {
            individualElement.firstChild.textContent === initialText ?
                individualElement.firstChild.textContent = nextText
                :
                individualElement.firstChild.textContent = initialText
        });
    }
}

function mobileSwipeInit(touchstart) {
    let distanceTravelledX;
    let startingPointX = touchstart.touches[0].clientX;

    return function(dataPipe, threshold) {
        dataPipe.startingPointX = startingPointX;
        distanceTravelledX = startingPointX - dataPipe.endingPointX;

        if (Math.abs(distanceTravelledX) >= threshold) {
            distanceTravelledX > 0 ?
                dataPipe.elementClickedId = "increment"
                :
                dataPipe.elementClickedId = "decrement";

            return dataPipe;

        } else {
            return Promise.reject(dataPipe);
        }
    }
}

function fullScreenImg(elementByClass) {
    let img = document.querySelector("." + elementByClass);

    if (!document.fullscreenElement && !document.mozFullScreenElement &&
        !document.webkitFullscreenElement && !document.msFullscreenElement) {
        if (img.requestFullscreen) {
            img.requestFullscreen();
        }
        else if (img.msRequestFullscreen) {
            img.msRequestFullscreen();
        }
        else if (img.mozRequestFullScreen) {
            img.mozRequestFullScreen();
        }
        else if (img.webkitRequestFullscreen) {
            img.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT);
        }
    }
    else {
        if (document.exitFullscreen) {
            document.exitFullscreen();
        }
        else if (document.msExitFullscreen) {
            document.msExitFullscreen();
        }
        else if (document.mozCancelFullScreen) {
            document.mozCancelFullScreen();
        }
        else if (document.webkitExitFullscreen) {
            document.webkitExitFullscreen();
        }
    }
}

function sizeMatcher(templateElement, resizedElement) {
    let resized = document.querySelector("." + resizedElement);
    let template = document.querySelector("." + templateElement);
    resized.style.height = template.scrollHeight + "px";
    resized.style.width = template.scrollWidth + "px";

    return resizedElement;
}

function delayer (dataPipe, delayTime) {
    return new Promise( (resolve, reject) => {
        setTimeout( () => {
            resolve(dataPipe);
        }, delayTime);
    });
}

const paintingsInfo = {
    francisBacon1: ["Francis Bacon", "Sketch for Lisa", "1xx X 1xx", "$XXX"],
    gerhardRichter1: ["Gerhard Richter", "Abstraktus Bild", "1xx X 1xx", "$XXX"],
    edvardMunchEveningonKarlJohan: ["Edvard Munch", "Evening on Karl Johan Street", "1xx X 1xx", "$XXX"],
    anselmKieferTempelhof: ["Anselm Kiefer", "Tempelhof 2010-11", "1xx X 1xx", "$XXX"],
    frankAuerbachHeadCatherineLampert: ["Frank Auerbach", "Head of Catherine Lampert", "1xx X 1xx", "$XXX"],
    bathersByRiverMatisse: ["Henri Matisse", "Bathers by a River", "1xx X 1xx", "$XXX"],
    cityLandscapeJoanMitchell: ["Joan Mitchell", "City Landscape", "1xx X 1xx", "$XXX"],
    compositionVIIKandinsky: ["Wassily Kandinsky", "Composition VII, 1913", "1xx X 1xx", "$XXX"],
    eventualityOfDestinyChirico: ["Giorgio de Chirico", "Eventuality of Destiny", "1xx X 1xx", "$XXX"],
    excavationDeKooning: ["Willem de Kooning", "Excavation", "1xx X 1xx", "$XXX"],
    fleeingGhostKlee: ["Paul Klee", "Fleeing Ghost", "1xx X 1xx", "$XXX"],
    forestAndDoveMaxErnst: ["Max Ernst", "Forest and Dove", "1xx X 1xx", "$XXX"],
    fullFathomFivePollack: ["Jackson Pollack", "Full Fathom Five", "1xx X 1xx", "$XXX"],
    goldenWingsShiragaKazuo: ["Shiraga Kazuo", "Golden Wings", "1xx X 1xx", "$XXX"],
    isakuYanaiharaGiacometti: ["Alberto Giacometti", "Isaku Yanaihara", "1xx X 1xx", "$XXX"],
    marriageReasonSqualorIIFrankStella: ["Frank Stella", "The Marriage of Reason and Squalor, II (1959)", "1xx X 1xx", "$XXX"],
    personagesWithStarMiro: ["Joan Miro", "Personages with Star", "1xx X 1xx", "$XXX"],
    withoutHopeKahlo: ["Frida Kahlo", "Without Hope", "1xx X 1xx", "$XXX"]
}

//---// Event Listeners and Promise Chain Composition //---//

document.addEventListener("DOMContentLoaded", () => {

//---// Toggles menu headings between open and closed states when clicked //---//
    document.querySelector(".navWorkHeading").addEventListener("click", (event) => {
        dataCollector(event, ["event", event])
        .then( dataPipe => classToggler(dataPipe, "workDropExpanded", "workDrop") )
    //---// These are refinements for the mobile site, which change the behavior of the menu //---//
        .then( dataPipe => {
            if (window.matchMedia("(max-width: 499px)").matches) {
                classRemover(dataPipe, "aboutDropExpanded", "aboutDrop");
                textToggler("+ Information", "+ Information", "navAboutHeading");
               }
            return dataPipe;
        })
        .then( dataPipe => changeAttribute(dataPipe, "style", "z-index: 2", "workDropExpanded") )
        .then( dataPipe => changeAttribute(dataPipe, "style", "z-index: -1", "aboutDropExpanded") )
        .then( textToggler("+ Paintings", "- Paintings", "navWorkHeading") )
        .catch( error => console.log(error) );
    }, false);

    document.querySelector(".navAboutHeading").addEventListener("click", (event) => {
        dataCollector(event, ["event", event])
        .then( dataPipe => classToggler(dataPipe, "aboutDropExpanded", "aboutDrop") )
    //---// These are refinements for the mobile site, which change the behavior of the menu //---//
        .then( dataPipe => {
            if (window.matchMedia("(max-width: 499px)").matches) {
                classRemover(dataPipe, "workDropExpanded", "workDrop");
                textToggler("+ Paintings", "+ Paintings", "navWorkHeading");
            }
            return dataPipe;
        })
        .then( dataPipe => changeAttribute(dataPipe, "style", "z-index: 2", "aboutDropExpanded") )
        .then( dataPipe => changeAttribute(dataPipe, "style", "z-index: -1", "workDropExpanded") )
        .then( textToggler("+ Information", "- Information", "navAboutHeading") )
        .catch( (error) => console.log(error) );
    }, false);

//---// Realigns the layout and fills AJAX content based on menu selection //---//
    Array.from(document.querySelectorAll(".dropDownItem")).forEach( (selection) => {
        selection.addEventListener("click", (event) => {
            dataCollector(event, ["event", event],
                ["elementClicked", event.target],
                ["elementClickedId", event.target.id],
                ["elementClickedAlt", event.target.alt])
            .then( dataPipe => classRemover(dataPipe, "contentVisible", "galleryWrapper", "bioText", "contactText", "bioImgBorderBox") )
            .then( dataPipe => delayer(dataPipe, 200))
            .then( dataPipe => classRemover(dataPipe, "dropDownItemHighlight", "dropDownItem") )
            .then( dataPipe => findIndexOfClicked(dataPipe, "dropDownItem") )
            .then( dataPipe => getAJAXContent(dataPipe, "heroBorder") )
            .then( dataPipe => classToggler(dataPipe, "dropDownItemHighlight", ["dropDownItem", dataPipe.elementClickedIndex]) )
            .catch( (dataPipe, error) => {
                if (dataPipe.currentIndex === undefined) {
                    return dataPipe;
                } else {
                    return error;
                }
            })
            .then( dataPipe => classAdder(dataPipe, "leftLandingCollapsed", "leftLanding") )
            .then( dataPipe => classAdder(dataPipe, "leftBorderCollapsed", "leftBorder") )
            .then( dataPipe => classAdder(dataPipe, "pageTitleCollapsed", "pageTitle") )
            .then( dataPipe => classAdder(dataPipe, "rightLandingExpanded", "rightLanding") )
            .then( dataPipe => classAdder(dataPipe, "heroBorderDivExpanded", "heroBorder") )
        //---// These are refinements for the mobile site that change the behavior of the menu //---//
            .then( dataPipe => {
                if (window.matchMedia("(max-width: 499px)").matches) {
                    delayer(dataPipe, 300);
                    classRemover(dataPipe, "workDropExpanded", "workDrop");
                    classRemover(dataPipe, "aboutDropExpanded", "aboutDrop");
                    textToggler("+ Paintings", "+ Paintings", "navWorkHeading");
                    textToggler("+ Information", "+ Information", "navAboutHeading");
                }
                return dataPipe;
            })
            .then( dataPipe => delayer(dataPipe, 800) )
            .catch( (error) => {
                console.log(error);
            })
            .then( dataPipe => classToggler(dataPipe, "contentVisible", "galleryWrapper", "bioText", "contactText", "bioImgBorderBox") );
        }, false);
    });

//---// Controls image gallery's navigation buttons //---//
    document.querySelector(".heroBorder").addEventListener("click", (event) => {
        if (event.target && event.target.matches("div.galleryNavButtons")) {
            dataCollector(event, ["event", event],
                ["elementClicked", event.target],
                ["elementClickedId", event.target.id],
                ["elementClickedAlt", event.target.alt])
            .then( dataPipe => findElementOfClass(dataPipe, "thumbnailImg", "contentVisible") )
            .then( dataPipe => findNextThumbnailIndex(dataPipe, "thumbnailImg") )
            .then( dataPipe => classRemover(dataPipe, "contentVisible", "infoDiv", "fullSizedImg", "fullSizedImgSmall", ["thumbnailImg", dataPipe.currentElementIndex]) )
            .then( dataPipe => classRemover(dataPipe, "fullSizedImgFiltered", "fullSizedImg", "fullSizedImgSmall") )
            .then( dataPipe => classAdder(dataPipe, "contentVisible", ["thumbnailImg", dataPipe.nextIndex]) )
            .then( dataPipe => delayer(dataPipe, 300) )
            .then( dataPipe => changeAttribute(dataPipe, "src",
                ("robertSchweizerArtResources/images/" + document.querySelectorAll(".thumbnailImg")[dataPipe.nextIndex].id + ".jpg"),
                "fullSizedImg") )
            .then( dataPipe => changeAttribute(dataPipe, "srcset",
                ("robertSchweizerArtResources/images/" + document.querySelectorAll(".thumbnailImg")[dataPipe.nextIndex].id + "SMALL.jpg"),
                "fullSizedImgSmall") )
            .catch( dataPipe => {
                console.log(dataPipe);
                return dataPipe;
            })
            .then( dataPipe => changeAttribute(dataPipe, "alt", document.querySelectorAll(".thumbnailImg")[dataPipe.nextIndex].alt, "fullSizedImg", "fullSizedImgSmall"))
            .then( dataPipe => delayer(dataPipe, 400) )
            .then( dataPipe => classAdder(dataPipe, "contentVisible", "fullSizedImg", "fullSizedImgSmall") )
            .then( dataPipe => {
                let painting = document.querySelectorAll(".thumbnailImg")[dataPipe.nextIndex].id;
                document.querySelector(".artistName").textContent = paintingsInfo[painting][0];
                document.querySelector(".paintingTitle").textContent = paintingsInfo[painting][1];
                document.querySelector(".paintingSize").textContent = paintingsInfo[painting][2];
                document.querySelector(".paintingPrice").textContent = paintingsInfo[painting][3];
                return dataPipe;
            })
            .catch( (error) => { console.log(error); } )
        }
    }, false);

//---// Allows for gallery image selection based on thumbnail clicked //---//
    document.querySelector(".heroBorder").addEventListener("click", (event) => {
        if (event.target && event.target.matches("img.thumbnailImg")) {
            dataCollector(event, ["event", event],
                ["elementClicked", event.target],
                ["elementClickedId", event.target.id],
                ["elementClickedAlt", event.target.alt] )
            .then( dataPipe => findElementOfClass(dataPipe, "thumbnailImg", "contentVisible") )
            .then( dataPipe => findNextThumbnailIndex(dataPipe, "thumbnailImg") )
            .then( dataPipe => classAdder(dataPipe, "contentVisible", ["thumbnailImg", dataPipe.nextIndex]) )
            .then( dataPipe => classRemover(dataPipe, "contentVisible", "infoDiv", "fullSizedImg", "fullSizedImgSmall", ["thumbnailImg", dataPipe.currentElementIndex]) )
            .then( dataPipe => classRemover(dataPipe, "fullSizedImgFiltered", "fullSizedImg", "fullSizedImgSmall") )
            .then( dataPipe => delayer(dataPipe, 300) )
            .then( dataPipe => changeAttribute(dataPipe, "src",
                ("robertSchweizerArtResources/images/" + dataPipe.elementClickedId + ".jpg"),
                "fullSizedImg") )
            .then( dataPipe => changeAttribute(dataPipe, "srcset",
                ("robertSchweizerArtResources/images/" + dataPipe.elementClickedId + "SMALL.jpg"),
                "fullSizedImgSmall") )
            .then( dataPipe => changeAttribute(dataPipe, "alt", dataPipe.elementClickedAlt, "fullSizedImg", "fullSizedImgSmall") )
            .then( dataPipe => delayer(dataPipe, 400) )
            .then( dataPipe => classAdder(dataPipe, "contentVisible", "fullSizedImg", "fullSizedImgSmall") )
            .then( dataPipe => {
                let painting = document.querySelectorAll(".thumbnailImg")[dataPipe.nextIndex].id;
                document.querySelector(".artistName").textContent = paintingsInfo[painting][0];
                document.querySelector(".paintingTitle").textContent = paintingsInfo[painting][1];
                document.querySelector(".paintingSize").textContent = paintingsInfo[painting][2];
                document.querySelector(".paintingPrice").textContent = paintingsInfo[painting][3];
                return dataPipe;
            })
            .catch( (error) => { console.log(error); } )
        }
    }, false);

//---// Opens current image in full screen when either the image itself, of the full screen toggle, are clicked //---//
    document.querySelector(".heroBorder").addEventListener("click", (event) => {
        if (event.target && event.target.matches("img.fullSizedImg")) {
            fullScreenImg("fullSizedImg");
        }
    }, false);

    document.querySelector(".heroBorder").addEventListener("click", (event) => {
        if (event.target && event.target.matches("img.fullScreenArrows")) {
            fullScreenImg("fullSizedImg");
        }
    }, false);

//---// Opens the image's information modal //---//
    document.querySelector(".heroBorder").addEventListener("click", (event) => {
        if (event.target && event.target.matches("div.galleryInfoButton")) {
            sizeMatcher("fullSizedImg", "infoDiv");
            classAdder("none", "contentVisible", "infoDiv");
            classAdder("none", "fullSizedImgFiltered", "fullSizedImg", "fullSizedImgSmall");
        }
    }, false);

//---// Closes the image's information modal //---//
    document.querySelector(".heroBorder").addEventListener("click", (event) => {
        if (event.target && event.target.matches("span.closeX")) {
            classRemover("none", "contentVisible", "infoDiv");
            classRemover("none", "fullSizedImgFiltered", "fullSizedImg", "fullSizedImgSmall");
        }
    }, false);

//---// Activates swipe controls for mobile users //---//
    document.querySelector(".heroBorder").addEventListener("touchstart", (touchStart) => {
        if (touchStart.target && (touchStart.target.matches("img.fullSizedImg") || touchStart.target.matches("source.fullSizedImgSmall"))) {
            return mobileSwipeInitCurried = mobileSwipeInit(touchStart);
        }
    }, false);

    document.querySelector(".heroBorder").addEventListener("touchend", (touchEnd) => {
        if (touchEnd.target && (touchEnd.target.matches("img.fullSizedImg") || touchEnd.target.matches("source.fullSizedImgSmall"))) {
            dataCollector(touchEnd, ["event", event],
                ["elementClicked", event.target],
                ["elementClickedId", ""],
                ["elementClickedAlt", ""],
                ["touches", event.touches],
                ["endingPointX", event.changedTouches[event.changedTouches.length - 1].clientX] )
            .then( dataPipe => mobileSwipeInitCurried(dataPipe, 100) )
            .then( dataPipe => findElementOfClass(dataPipe, "thumbnailImg", "contentVisible") )
            .then( dataPipe => findNextThumbnailIndex(dataPipe, "thumbnailImg") )
            .then( dataPipe => classRemover(dataPipe, "contentVisible", "infoDiv", "fullSizedImg", "fullSizedImgSmall", ["thumbnailImg", dataPipe.currentElementIndex]) )
            .then( dataPipe => classRemover(dataPipe, "fullSizedImgFiltered", "fullSizedImg", "fullSizedImgSmall") )
            .then( dataPipe => classAdder(dataPipe, "contentVisible", ["thumbnailImg", dataPipe.nextIndex]) )
            .then( dataPipe => delayer(dataPipe, 300) )
            .then( dataPipe => changeAttribute(dataPipe, "src",
                ("robertSchweizerArtResources/images/" + document.querySelectorAll(".thumbnailImg")[dataPipe.nextIndex].id + ".jpg"),
                "fullSizedImg") )
            .then( dataPipe => changeAttribute(dataPipe, "srcset",
                ("robertSchweizerArtResources/images/" + document.querySelectorAll(".thumbnailImg")[dataPipe.nextIndex].id + "SMALL.jpg"),
                "fullSizedImgSmall") )
            .catch( dataPipe => {
                console.log(dataPipe);
                return dataPipe;
            })
            .then( dataPipe => changeAttribute(dataPipe, "alt", document.querySelectorAll(".thumbnailImg")[dataPipe.nextIndex].alt, "fullSizedImg", "fullSizedImgSmall"))
            .then( dataPipe => delayer(dataPipe, 400) )
            .then( dataPipe => classAdder(dataPipe, "contentVisible", "fullSizedImg", "fullSizedImgSmall") )
            .then( dataPipe => {
                let painting = document.querySelectorAll(".thumbnailImg")[dataPipe.nextIndex].id;
                document.querySelector(".artistName").textContent = paintingsInfo[painting][0];
                document.querySelector(".paintingTitle").textContent = paintingsInfo[painting][1];
                document.querySelector(".paintingSize").textContent = paintingsInfo[painting][2];
                document.querySelector(".paintingPrice").textContent = paintingsInfo[painting][3];
                return dataPipe;
            })
            .catch( (error) => { console.log(error); } );
        }
    }, false);

}, false);

