const etchContainer = document.querySelector(".etchContainer")
const sketchContainer = document.querySelector(".sketchContainer")
const sliderOutput = document.querySelector(".sliderOutput")
const buttons = {
    colorPickerContainer:   document.querySelector(".colorPicker"),
    rainbowButton:          document.querySelector(".rainbow"),
    erase:                  document.querySelector(".erase"),
    filterButton:           document.querySelector(".filter"),
    resetSketchPad:         document.querySelector(".reset"),
    slider:                 document.querySelector(".sliderContainer .slider")
}

VerlyRange('sliderRange', 'rgb(255, 0, 0)');

let dimensions = 16;
let preferredPattern;

sliderOutput.textContent = buttons.slider.value

function createGrid(dimensions){
    let side = (500/dimensions).toPrecision(6)
    const createGridBox = document.createElement("div")
    createGridBox.classList.add("gridBox")
    createGridBox.setAttribute("counter", '1')
    createGridBox.setAttribute("style", `height: ${side}px;width: ${side}px;background-color: rgb(231, 231, 231);`)
    sketchContainer.appendChild(createGridBox)   
}

function generateGrids(dimensions){
    for(i=1;i<=dimensions**2;i++){
        createGrid(dimensions)
    }
}

function clickSlide(){
    removeGrids()
    sliderOutput.textContent = parseInt(this.value)
    dimensions = sliderOutput.textContent
    generateGrids(dimensions)
}

function removeGrids(){
    const selectAllGrids = document.querySelectorAll(".gridBox")
    selectAllGrids.forEach((grid) =>{
        grid.remove()
    })    
}

function paintGrid(e){
    if(preferredPattern ==="colorPicker"){
        e.target.style.backgroundColor = getWheelColor()
    } else { e.target.style.backgroundColor = generateRandomColor()}
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

buttons.resetSketchPad.addEventListener("click", resetBoard)
buttons.slider.addEventListener("input", clickSlide)
buttons.erase.addEventListener("click", handleEraseButtonClick)
buttons.colorPickerContainer.addEventListener("click", handleColorPickerClick)
buttons.rainbowButton.addEventListener("click", handleRainbowButtonClick)
buttons.filterButton.addEventListener("click", handleFilterButtonClick)

function handleEraseButtonClick(){
    removeEventListener()
    sketchContainer.addEventListener("mouseover", eraseGrid)
}

function handleFilterButtonClick() {
    removeEventListener()
    sketchContainer.addEventListener("mouseover", shade)
}

function handleColorPickerClick(){
    removeEventListener()
    preferredPattern = this.className
    sketchContainer.addEventListener("mouseover", paintGrid)
}

function handleRainbowButtonClick(){
    removeEventListener()
    preferredPattern = this.className
    sketchContainer.addEventListener("mouseover", paintGrid)
}

function removeEventListener(){
    sketchContainer.removeEventListener("mouseover", paintGrid)
    sketchContainer.removeEventListener("mouseover", eraseGrid)
    sketchContainer.removeEventListener("mouseover", shade)
}

document.addEventListener("DOMContentLoaded", ()=>{
    generateGrids(dimensions)
    etchContainer.classList.toggle("slide-in")
    setTimeout(()=>{etchContainer.classList.toggle("slide-in")},3000)
})