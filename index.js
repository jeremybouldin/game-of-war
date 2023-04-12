const imageSection = document.getElementById('card-images')
const newDeckBtn = document.getElementById('new-deck')
const drawCards = document.getElementById('draw-card')
const headerEl = document.getElementById('header')
const remainingCards = document.getElementById('remaining-cards')
const myScoreEl = document.getElementById('my-score')
const cpuScoreEl = document.getElementById('computer-score')
const cardArray = [
    '2',
    '3',
    '4',
    '5',
    '6',
    '7',
    '8',
    '9',
    '10',
    'JACK',
    'QUEEN',
    'KING',
    'ACE',
]

let deckId
let currentCards
let myScore = 0
let computerScore = 0

newDeckBtn.addEventListener('click', handleClick)
drawCards.addEventListener('click', () => {
    fetch(
        `https://apis.scrimba.com/deckofcards/api/deck/${deckId}/draw/?count=2`
    )
        .then((res) => res.json())
        .then((data) => {
            console.log(data)
            currentCards = []
            for (let i = 0; i < data.cards.length; i++) {
                // console.log(card.code)
                imageSection.children[i].innerHTML = ` 
                <img src="${data.cards[i].image}">
                `
                currentCards.push(data.cards[i].value)
            }
            headerEl.textContent = evaluateWinningCard()
            updateCardsAvailable(data)
        })
    // displayCardImages
})

function updateCardsAvailable(data) {
    remainingCards.textContent = `
        ${data.remaining} cards remaining.
        `
    if (data.remaining === 0) {
        drawCards.disabled = true
        if (computerScore > myScore) {
            headerEl.textContent = 'The computer won the game!'
        } else if (computerScore < myScore) {
            headerEl.textContent = 'You won the game!'
        } else {
            headerEl.textContent = "It's a tie"
        }
    }
}

function evaluateWinningCard() {
    let card1 = cardArray.indexOf(currentCards[0])
    let card2 = cardArray.indexOf(currentCards[1])

    if (card1 > card2) {
        computerScore++
        cpuScoreEl.textContent = `Computer: ${computerScore}`
        return 'Computer wins!'
    } else if (card1 < card2) {
        myScore++
        myScoreEl.textContent = `My score: ${myScore}`
        return 'You win!'
    } else {
        return 'War!'
    }
}

function handleClick() {
    fetch('https://apis.scrimba.com/deckofcards/api/deck/new/shuffle/')
        .then((res) => res.json())
        .then((data) => {
            updateCardsAvailable(data)
            deckId = data.deck_id
        })
    drawCards.disabled = false
    myScore = 0
    computerScore = 0
    myScoreEl.textContent = `My score: ${myScore}`
    cpuScoreEl.textContent = `Computer: ${computerScore}`
}

// setTimeout(() => {
//     logMessage()
// }, 2000)
