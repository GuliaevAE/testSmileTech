let Подача = document.getElementById("Подача")
let Требования = document.getElementById("Требования")
let Информация = document.getElementById("Информация")
let Обучение = document.getElementById("Обучение")
let Трудоустройство = document.getElementById("Трудоустройство")
let Сотрудничество = document.getElementById("Сотрудничество")
//на русском только для удобства вашей проверки


let allTopicsContainer = document.getElementsByClassName('allTopics')[0]
let allTopics = document.getElementsByClassName('allTopics_topic')
let allAnswers = document.getElementsByClassName('topic-questions_answer_content')
let allAnswerButton = document.getElementsByClassName('topic-questions_answer_button')


//init
//при отсутствии js файла все темы с их вопросами будут открыты
//при подключении js все темы, кроме первой, будут скрыты
hiddeAllTopics()
allTopicsContainer.dataset.prevPercentage = 0
allTopics[0].classList.add('active')
Подача.style.display = "block"

for (let answer of allAnswers) {
    answer.classList.add('hidden')
}

for (let button of allAnswerButton) {
    button.addEventListener('click', (event) => {
        let answer_content = event.target.parentNode.getElementsByClassName('topic-questions_answer_content')[0]
        answer_content.classList.toggle('hidden')
        event.target.classList.toggle('active')
    })
}


//слайдер будет работать и на компе, и на сенсоре
//но на компе он будет срабатывать
allTopicsContainer.addEventListener('touchstart', (e) => {
    allTopicsContainer.dataset.mouseDownAt = e.touches[0].clientX
    allTopicsContainer.addEventListener('touchmove',
        MoveAllTopicsContainer
    )
    allTopicsContainer.addEventListener('touchend', (e) => {
        allTopicsContainer.dataset.mouseDownAt = '0'
        allTopicsContainer.dataset.prevPercentage = allTopicsContainer.dataset.percentage
        allTopicsContainer.removeEventListener('touchmove',
            MoveAllTopicsContainer
        )
    })
})

allTopicsContainer.addEventListener('mousedown', (e) => {
    allTopicsContainer.dataset.mouseDownAt = e.clientX
    allTopicsContainer.addEventListener('mousemove',
        MoveAllTopicsContainer
    )
    allTopicsContainer.addEventListener('mouseup', (e) => {
        allTopicsContainer.dataset.mouseDownAt = '0'
        allTopicsContainer.dataset.prevPercentage = allTopicsContainer.dataset.percentage
        allTopicsContainer.removeEventListener('mousemove',
            MoveAllTopicsContainer
        )
    })
})



let indentLeft = allTopicsContainer.getBoundingClientRect().left
let indentLeftPercent = allTopicsContainer.getBoundingClientRect().left / window.innerWidth * 100


//////

function MoveAllTopicsContainer(e) {
    let clientX
    if (e.type === 'touchmove') {
        clientX = e.touches[0].clientX
    }
    else {
        clientX = e.clientX
    }
    let maximumOffsetPoint = 0
    if ((window.innerWidth - indentLeft) < allTopicsContainer.getBoundingClientRect().width)
        maximumOffsetPoint = -(100 - (window.innerWidth - indentLeft) / (allTopicsContainer.getBoundingClientRect().width) * 100) - indentLeftPercent / 2
    const mouseDelta = parseFloat(allTopicsContainer.dataset.mouseDownAt) - clientX
    const maxDelta = window.innerWidth
    const percentage = mouseDelta / maxDelta * -100
    const nextPercentageUnconstrained = Math.max(Math.min(parseFloat(allTopicsContainer.dataset.prevPercentage) + percentage, 0), maximumOffsetPoint)
    allTopicsContainer.dataset.percentage = nextPercentageUnconstrained
    allTopicsContainer.animate({
        transform: `translateX(${nextPercentageUnconstrained}%)`
    }, { duration: 800, fill: 'forwards', easing: 'ease-in' })
}

for (let topic of allTopics) {
    topic.addEventListener('click', (event) => selectTopic(event))
}

function hiddeAllTopics() {
    Подача.style.display = "none"
    Требования.style.display = "none"
    Информация.style.display = "none"
    Обучение.style.display = "none"
    Трудоустройство.style.display = "none"
    Сотрудничество.style.display = "none"
}

function selectTopic(event) {
    for (let topic of allTopics) {
        topic.classList.remove('active')
    }
    event.currentTarget.classList.add('active')
    hiddeAllTopics()
    switch (event.currentTarget.dataset.id) {
        case "Подача":
            return Подача.style.display = "block"
        case "Требования":
            return Требования.style.display = "block"
        case "Информация":
            return Информация.style.display = "block"
        case "Обучение":
            return Обучение.style.display = "block"
        case "Трудоустройство":
            return Трудоустройство.style.display = "block"
        case "Сотрудничество":
            return Сотрудничество.style.display = "block"
    }
}