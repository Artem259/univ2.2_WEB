let images = [
    "img/img1.jpg",
    "img/img2.jpg",
    "img/img3.jpg",
    "img/img4.jpg",
    "img/img5.jpg"];
let currSlide = 0;
let imgDuration = 5000;

let sliderObj = document.getElementById("slides");
let prevButtonObj = document.getElementById("slider-prev");
let nextButtonObj = document.getElementById("slider-next");

let timer;

function slidesShow(){
    sliderObj.className += "hidden";
    setTimeout(() => {
        sliderObj.style.backgroundImage = "url('"+images[currSlide]+"')";
        sliderObj.className = "";
    }, 1000);
    currSlide++;
    currSlide %= images.length;
    timer = setTimeout(slidesShow, imgDuration);
}
prevButtonObj.onclick = () => {
    clearTimeout(timer);
    currSlide--;
    if(currSlide<0)
        currSlide = images.length-1;
    sliderObj.style.backgroundImage = "url('"+images[currSlide]+"')";
    timer = setTimeout(slidesShow, imgDuration);
}
nextButtonObj.onclick = () => {
    clearTimeout(timer);
    currSlide++;
    currSlide %= images.length;
    sliderObj.style.backgroundImage = "url('"+images[currSlide]+"')";
    timer = setTimeout(slidesShow, imgDuration);
}


slidesShow();