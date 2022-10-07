const canvas = document.querySelector('canvas');
const form = document.getElementById('signature-pad-form');
const clearButton = document.querySelector('.clear-button');
const ctx = canvas.getContext('2d');
const dl = document.getElementById('dl-signature');
const gallery = document.getElementById('gallery');
let writingMode = false;

form.addEventListener('submit', (event) => {
    event.preventDefault();
    
    const imageURL = canvas.toDataURL();
    const image = document.createElement('img');
    image.src = imageURL;
    image.height = canvas.height;
    image.width = canvas.width;
    image.class = "d-flex justify-content-around border border-light";

    // SHOWS THE SIGNATURE IN ANOTHER DIV FOR TESTING

    // const galleryItem = document.createElement('div');
    // galleryItem.class = "border border-primary";
    // gallery.appendChild(image);


    dl.href = imageURL;
    dl.click();
    clearpad();

}); 

const clearpad = () => {
    ctx.clearRect(0,0, canvas.width, canvas.height);

}

clearButton.addEventListener('click', (event) => {
    event.preventDefault();
    clearpad();
});

const getTargetPosition = (event) => {
    positionX = event.clientX - event.target.getBoundingClientRect().x;
    positionY = event.clientY - event.target.getBoundingClientRect().y;

    return [positionX, positionY];
}

const handlePointerMove = (event)=> {
    if (!writingMode) return
    console.log(event.clientX, event.target.getBoundingClientRect().x);
    console.log("sign pos x: ", event.clientX - event.target.getBoundingClientRect().x);
    console.log("sign pos y: ", event.clientY - event.target.getBoundingClientRect().y);
    const [positionX, positionY] = getTargetPosition(event);
    ctx.lineTo(positionX, positionY);
    ctx.stroke();
}

const handlePointerUp = (event) => {
    writingMode = false;
}

const handlePointerDown = (event) => {
    writingMode = true;
    ctx.beginPath();

    const [positionX, positionY] = getTargetPosition(event);
    ctx.moveTo(positionX, positionY);
} 


ctx.lineWidth = 3;
ctx.lineJoin = ctx.lineCap = 'round';
// ctx.lineJoin(positionX, positionY);

canvas.addEventListener('pointerdown', handlePointerDown, {passive: true});
canvas.addEventListener('pointerup', handlePointerUp, {passive: true});
canvas.addEventListener('pointermove', handlePointerMove, {passive: true});


