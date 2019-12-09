class ScratchCard {

    constructor() {
        this.projectionCanvas = document.getElementById("projection");
        this.tableHeight = this.projectionCanvas.getAttribute("height");
        this.tableWidth = this.projectionCanvas.getAttribute("width");
        this.canvasTool = this.projectionCanvas.getContext("2d");
    }

    paintShim(color = "#D6A2AB") {
        this.canvasTool.fillStyle = color;
        this.canvasTool.fillRect(0, 0, this.tableWidth, this.tableHeight);
    }

    eraser(x, y) {
        this.canvasTool.beginPath();
        this.canvasTool.arc(x, y, 50, 0, 2 * Math.PI);
        this.canvasTool.strokeStyle = 'white';
        this.canvasTool.stroke();
        this.canvasTool.fillStyle = 'white';
        this.canvasTool.fill();
    }

}


class FingerMotion {
    constructor(projectionCanvas, canvasTool, eraser) {
        this.projectionCanvas = projectionCanvas;
        this.canvasTool = canvasTool;
        this.eraser = eraser;
    }

    mobileTouch() {
        this.projectionCanvas.addEventListener('touchmove', (e) => {
            let xTouch = e.changedTouches[0].pageX;
            let yTouch = e.changedTouches[0].pageY;
            this.eraser(xTouch, yTouch);
        }, false);
    }
}

class Shimmer {
    constructor(scratchCard) {
        this.scratchCard = scratchCard;
    }

    blink() {
        scratchCard.paintShim();
        setInterval(() => { scratchCard.paintShim(); }, 1000);
    }
}

let scratchCard = new ScratchCard();

let fingerMotion = new FingerMotion(
    scratchCard.projectionCanvas,
    scratchCard.canvasTool,
    scratchCard.eraser
);

let shimmer = new Shimmer(scratchCard);

fingerMotion.mobileTouch();

shimmer.blink();

let hiddenText = document.getElementsByClassName("hidden-text");
hiddenText[0].innerHTML = decodeURI(window.location.href.split("?")[1]);