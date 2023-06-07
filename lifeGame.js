let gridContainer = document.querySelector('div#gridContainer')
let nextGenBtn = document.querySelector('button#nextGenBtn')
let cells = []

nextGenBtn.addEventListener('click', nextGen)

for(let i=0;i<10;i++){
    cells[i] = []
    for(let j=0;j<10;j++){
        cells[i][j] = []
        cells[i][j][0] = document.createElement('div')
        cells[i][j][0].id = ('i'+i+'j'+j)
        cells[i][j][0].classList.add('gridCell')
        gridContainer.appendChild(cells[i][j][0])
        cells[i][j][1] = false
        cells[i][j][0].addEventListener('click', ()=>{background(i,j)})
        
    }
}

function background(i, j){
    if(cells[i][j][1]==false){
        cells[i][j][0].style.backgroundColor = 'yellow'
        cells[i][j][1] = !cells[i][j][1]
    }
    else{
        cells[i][j][0].style.backgroundColor = 'black'
        cells[i][j][1] = !cells[i][j][1]
    }
}

function nextGen(){

    //Any live cell with less then 2 live neighbors dies
    //
    for(let i=0;i<10;i++){
        for(let j=0;j<10;j++){
            let liveNeighbors = 0
            if((i-1)>=0){
                //Up
                if(cells[i-1][j][1] == true){
                    liveNeighbors += 1
                }
            }

            if((i+1)<10){
                //Down
                if(cells[i+1][j][1] == true){
                    liveNeighbors += 1 
                }
            }

            if((j+1)<10){
                //Right
                if(cells[i][j+1][1] == true){
                    liveNeighbors += 1
                }
            }

            if((j-1)>=0){
                //Left
                if(cells[i][j-1][1] == true){
                    liveNeighbors += 1
                }
            }

            //Up-right
            if((i-1)>=0 && (j+1)<10){
                if(cells[i-1][j+1][1] == true){
                    liveNeighbors += 1
                }
            }

            //Up-left
            if((i-1)>=0 && (j-1)>=0){
                if(cells[i-1][j-1][1] == true){
                    liveNeighbors += 1
                }
            }

            //Down-right
            if((i+1)<10 && (j+1)<10){
                if(cells[i+1][j+1][1] == true){
                    liveNeighbors += 1
                }
            }

            //Down-left
            if((i+1)<10 && (j-1)>=0){
                if(cells[i+1][j-1][1] == true){
                    liveNeighbors += 1
                }
            }
            
            
            //Any live cell with less then 2 live neighbors dies
            //Any live cell with more then 3 live neighbors dies
            //Execute in the event loop final
            if((cells[i][j][1] == true) && (liveNeighbors<2 || liveNeighbors>3)){
                setTimeout(()=>{
                    cells[i][j][0].style.backgroundColor = 'black'
                    cells[i][j][1] = false
                },0)
            }else if((cells[i][j][1] == false) && (liveNeighbors==3)){
                setTimeout(()=>{
                    cells[i][j][0].style.backgroundColor = 'yellow'
                    cells[i][j][1] = true
                },0)
            }     
        }
    }
}
