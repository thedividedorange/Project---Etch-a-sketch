const etchContainer = document.querySelector(".etchContainer")
const sketchContainer = document.querySelector(".sketchContainer")
const colorPickerContainer = document.querySelector(".colorPicker")
const slider = document.querySelector(".sliderContainer .slider")
const sliderOutput = document.querySelector(".sliderOutput")
const rainbowButton = document.querySelector(".rainbow")
const resetSketchPad = document.querySelector(".reset")
const erase = document.querySelector(".erase")
const filterButton = document.querySelector(".filter")
let isSelectedColor;
let gridSize = 0;

VerlyRange('sliderRange', 'rgb(255, 0, 0)');
sliderOutput.textContent = slider.value

function createGrids(){
    let height
    let width
    gridSize = parseInt(sliderOutput.textContent)

    for(i = 1;i<=gridSize*gridSize;i++){
        height = (500/gridSize).toPrecision(6)
        width = (500/gridSize).toPrecision(6)

        const createGridBox = document.createElement("div")
        createGridBox.classList.add("gridBox")
        createGridBox.setAttribute("counter", '1')
        createGridBox.setAttribute("style", `height: ${height}px;width: ${width}px;background-color: #e7e7e7;`)
        sketchContainer.appendChild(createGridBox)
    }
}

function paintGridWheel(e){
    isSelectedColor = getWheelColor()
    e.target.style.backgroundColor = isSelectedColor
}

function getWheelColor(){
    return document.querySelector(".canvas-container input").value
}

function generateRandomColor(){

    let r= Math.floor(Math.random() * 255)
    let g= Math.floor(Math.random() * 255)
    let b= Math.floor(Math.random() * 255)

    return `rgb(${r}, ${g}, ${b})`
}

function paintGridRainbow(e){
    isSelectedColor = generateRandomColor()
    e.target.style.backgroundColor = isSelectedColor
}

function removeGrid(){
    const selectAllGrids = document.querySelectorAll(".gridBox")
    selectAllGrids.forEach((grid) =>{
        grid.remove()
    })
    createGrids()
}

function resetBoard(){
    etchContainer.classList.toggle("wobble")
    setTimeout(()=>{
        const selectAllGrids = document.querySelectorAll(".gridBox")
        selectAllGrids.forEach((grid) =>{
        grid.style.backgroundColor = `rgb(231, 231, 231)`
        grid.style.filter = `brightness(100%)`
        grid.setAttribute("counter", "1")
    })
    },500)

    setTimeout(()=>{
        etchContainer.classList.toggle("wobble")
    },1500)
}

function eraseGrid(e){
        isSelectedColor = `rgb(231, 231, 231)`
        e.target.style.backgroundColor = `rgb(231, 231, 231)`
        e.target.style.filter = `brightness(100%)`
        e.target.setAttribute("counter", "1")


}

function shade(e){
    if(e.target.classList.contains("gridBox")){
        currentCounter = e.target.getAttribute("counter")
        e.target.style.filter = `brightness(${100-currentCounter*10}%)`
        e.target.setAttribute("counter", `${parseInt(currentCounter)+1}`)
    }   
}

function clickSlide(){
    sliderOutput.textContent = this.value
    removeGrid()
}

slider.addEventListener("input", clickSlide)
resetSketchPad.addEventListener("click", resetBoard)

colorPickerContainer.addEventListener("click", ()=>{
    removeEventListener()
    sketchContainer.addEventListener("mouseover", paintGridWheel)
})

rainbowButton.addEventListener("click", ()=>{
    removeEventListener()
    sketchContainer.addEventListener("mouseover", paintGridRainbow)
})

erase.addEventListener("click", ()=>{
    removeEventListener()
    sketchContainer.addEventListener("mouseover", eraseGrid)
})

filterButton.addEventListener("click", ()=>{
    removeEventListener()
    sketchContainer.addEventListener("mouseover", shade)
})

function removeEventListener(){
    sketchContainer.removeEventListener("mouseover", paintGridWheel)
    sketchContainer.removeEventListener("mouseover", paintGridRainbow)
    sketchContainer.removeEventListener("mouseover", eraseGrid)
    sketchContainer.removeEventListener("mouseover", shade)
}

document.addEventListener("DOMContentLoaded", ()=>{
    createGrids()
    etchContainer.classList.toggle("slide-in")
    setTimeout(()=>{
        etchContainer.classList.toggle("slide-in") 
    },3000)
})