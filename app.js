// wait for the content of the window element 
// to load, then performs the operations. 
// This is considered best practice.
window.addEventListener('load', () => {

    resize(); // Resizes the canvas once the window loads 
    document.addEventListener('mousedown', startPainting);
    document.addEventListener('mouseup', stopPainting);     
    document.addEventListener('mousemove', sketch);
    window.addEventListener('resize', resize);
});

const canvas = document.querySelector('canvas');

// Context for the canvas for 2 dimensional operations 
const ctx = canvas.getContext('2d');

// Resizes the canvas to the available size of the window. 
function resize() {
    ctx.canvas.width = 560;
    ctx.canvas.height = 560;
}

// Stores the initial position of the cursor 
let coord = { x: 0, y: 0 };

// This is the flag that we are going to use to  
// trigger drawing 
let paint = false;

// Updates the coordianates of the cursor when  
// an event e is triggered to the coordinates where  
// the said event is triggered. 
function getPosition(event) {
    coord.x = event.clientX - canvas.offsetLeft;
    coord.y = event.clientY - canvas.offsetTop;
}

// The following functions toggle the flag to start 
// and stop drawing 
function startPainting(event) {
    paint = true;
    getPosition(event);
}
function stopPainting() {
    paint = false;
    const imageURL= canvas.toDataURL();
    console.log(imageURL);
    OnSketchComplete(imageURL);
    
    //const x=canvas.toDataURL('image/png');
    //const x = ctx.getImageData(0,0,560,560).data;
    //console.log(x);
}

var OnSketchComplete= (imgURL) => {
    fetch('http://localhost:3000/img', {
        method: "post",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({
            imgURL: '10 '
        })
    })
        .then((response) => response.json())
        .then((data) => { console.log(data) })
}

function sketch(event) {
    if (!paint) return;
    ctx.beginPath();

    ctx.lineWidth = 5;

    // Sets the end of the lines drawn 
    // to a round shape. 
    ctx.lineCap = 'round';

    ctx.strokeStyle = 'white';

    // The cursor to start drawing 
    // moves to this coordinate 
    ctx.moveTo(coord.x, coord.y);

    // The position of the cursor 
    // gets updated as we move the 
    // mouse around. 
    getPosition(event);

    // A line is traced from start 
    // coordinate to this coordinate 
    ctx.lineTo(coord.x, coord.y);

    // Draws the line. 
    ctx.stroke();
}