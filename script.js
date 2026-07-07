let currentQuestion = 0;
let shuffledQuestions = [];
let score = 0;
let wrongQuestions = [];
let quizMode = "normal";

window.addEventListener("load", function(){
    shuffledQuestions = [...questions].sort(() => Math.random() - 0.5);
    currentQuestion = 0;
    
    document.querySelector("#start").addEventListener("click", function(){
        shuffledQuestions = [...questions].sort(() => Math.random() - 0.5);
        currentQuestion = 0;
        score = 0;
        wrongQuestions = [];
        quizMode = "normal";
        showQuestion();
    });
    
    document.querySelector("#next").addEventListener("click", function(){
        nextQuestion();
    });
    
    document.querySelector("#review").addEventListener("click", function(){
        if(wrongQuestions.length === 0){
            alert("間違えた問題はありません");
            return;
        }
        quizMode = "review";
        currentQuestion = 0;
        showQuestion();
    });
});

function getQuestionList(){
    if(quizMode === "review"){
        return wrongQuestions;
    }
    return shuffledQuestions;
}

function showQuestion(){
    let list = getQuestionList();
    
    if(currentQuestion >= list.length){
        showResult();
        return;
    }
    
    let q = list[currentQuestion];
    let html = "";
    
    html += `
    <div class="question">
    <p>第${currentQuestion + 1}問</p>
    <p>【${q.category}】</p>
    <p>難易度：${q.difficulty}</p>
    <p>${q.question}</p>
    </div>
    `;
    
    q.choices.forEach(function(choice, index){
        html += `
        <button class="choice" onclick="answer(${index})">
        ${index+1}. ${choice}
        </button>
        `;
    });
    
    document.querySelector("#test").innerHTML = html;
}

function answer(selected){
    let list = getQuestionList();
    let q = list[currentQuestion];
    
    let buttons = document.querySelectorAll(".choice");
    buttons.forEach(function(btn){
        btn.disabled = true;
    });
    
    let html = "";
    
    if(selected === q.answer){
        score++;
        html += `<h2 class="correct">正解</h2>`;
    }else{
        wrongQuestions.push(q);
        html += `<h2 class="wrong">不正解</h2>`;
    }
    
    html += `
    <div class="explanation">
    <p>正答：${q.choices[q.answer]}</p>
    <p>解説：${q.explanation}</p>
    </div>
    <button onclick="nextQuestion()">次へ</button>
    `;
    
    document.querySelector("#test").innerHTML = html;
}

function nextQuestion(){
    currentQuestion++;
    showQuestion();
}

function showResult(){
    let total = getQuestionList().length;
    let html = `
    <h2>結果</h2>
    <p>${total}問中 ${score}問正解</p>
    <p>正答率：${Math.round(score / total * 100)}%</p>
    `;
    
    document.querySelector("#result").innerHTML = html;
    document.querySelector("#test").innerHTML = "";
}