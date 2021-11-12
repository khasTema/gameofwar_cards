let deckId


const newDeckBtn = document.getElementById('new-deck')
const remainCards = document.getElementById('remain')
const mainTitle = document.getElementById('main-heading')
const drawCardsBtn = document.getElementById('draw-cards')


newDeckBtn.addEventListener('click', gameStart)
drawCardsBtn.addEventListener('click', gamePlay)

function gameStart(){
    newDeckBtn.textContent = "New Deck"
    fetch('https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1')
        .then(res => res.json())
        .then(data => {
            deckId = data.deck_id
            console.log(deckId)
            remainCards.textContent = data.remaining
            mainTitle.textContent = 'Draw The Cards!'
        })
}

function gamePlay(){
    if(deckId === undefined){
        mainTitle.textContent = "Press Start First..."
    }else{
        fetch(`https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=2`)
            .then(res => res.json())
            .then(data => {
                console.log(data)
            })

    }
}