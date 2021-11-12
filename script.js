let deckId
let compScore = 0
let myScore = 0


const newDeckBtn = document.getElementById('new-deck')
const remainCards = document.getElementById('remain')
const mainTitle = document.getElementById('main-heading')
const drawCardsBtn = document.getElementById('draw-cards')
const cardsPlaceHolders = document.getElementById('cards')
const compScoreEL = document.getElementById('comp-score')
const myScoreEl = document.getElementById('my-score')


newDeckBtn.addEventListener('click', gameStart)
drawCardsBtn.addEventListener('click', gamePlay)

function gameStart(){
    newDeckBtn.textContent = "New Deck"
    if(drawCardsBtn.disabled){
        drawCardsBtn.disabled = false
        drawCardsBtn.textContent = "Draw Cards"
        compScore = 0
        myScore = 0
        compScoreEL.textContent = compScore
        myScoreEl.textContent = myScore
    }
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
                console.log(data.cards)
                console.log(cardsPlaceHolders.children )
                for(let card of data.cards){
                    cardsPlaceHolders.children[data.cards.indexOf(card)].innerHTML=
                    `<img src="${card.image}">`
                }
                remainCards.textContent = data.remaining
                defineTheWinner(data.cards[0], data.cards[1])
                compScoreEL.textContent = compScore
                myScoreEl.textContent = myScore
                if(data.remaining === 0){
                    if(compScore > myScore){
                        mainTitle.textContent = "COMP IS A WINNER!"
                    } else if(compScore < myScore){
                        mainTitle.textContent = "YOU ARE THE WINNER!"
                    } else{
                        mainTitle.textContent = "TOLAL TIE GAME!"
                    }
                    drawCardsBtn.disabled = true
                    drawCardsBtn.textContent = "Get New Deck"
                }
            })

    }
}

function defineTheWinner(card1, card2){
    const valueRisingArr = ["2", "3", "4", "5", "6", "7", "8", "9", 
    "10", "JACK", "QUEEN", "KING", "ACE"]
    const card1ValueIndex = valueRisingArr.indexOf(card1.value)
    const card2ValueIndex = valueRisingArr.indexOf(card2.value)
    if(card1ValueIndex === card2ValueIndex){
        console.log('Tie')
        mainTitle.textContent = "It's a Tie!"
    }else if(card1ValueIndex > card2ValueIndex){
        console.log('comp win')
        compScore +=1
        // compScoreEL.textContent = compScore
        mainTitle.textContent = "Comp Wins a Score!"
    }else{
        console.log('player win')
        myScore +=1
        // myScoreEl.textContent = myScore
        mainTitle.textContent = "You Win a Score!"
    }
   
}