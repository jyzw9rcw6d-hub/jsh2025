// グローバル変数
let currentQuestion = 0;
let shuffledQuestions = [];
let score = 0;
let wrongQuestions = [];
let quizMode = "normal";

// ページ読み込み時の処理
window.addEventListener("load", function () {
    shuffledQuestions = [...questions].sort(() => Math.random() - 0.5);
    currentQuestion = 0;

    // 開始ボタン
    document.querySelector("#start").addEventListener("click", function () {
        shuffledQuestions = [...questions].sort(() => Math.random() - 0.5);
        currentQuestion = 0;
        score = 0;
        wrongQuestions = [];
        quizMode = "normal";
        showQuestion();
    });

    // 次へボタン
    document.querySelector("#next").addEventListener("click", function () {
        nextQuestion();
    });

    // 復習ボタン
    document.querySelector("#review").addEventListener("click", function () {
        if (wrongQuestions.length === 0) {
            alert("間違えた問題はありません");
            return;
        }
        quizMode = "review";
        currentQuestion = 0;
        showQuestion();
    });
});

// 問題リストを取得
function getQuestionList() {
    if (quizMode === "review") {
        return wrongQuestions;
    }
    return shuffledQuestions;
}

// 問題を表示
function showQuestion() {
    let list = getQuestionList();

    if (currentQuestion >= list.length) {
        showResult();
        return;
    }

    let q = list[currentQuestion];
    let html = "";

    html += `
        <div class="question">
            <p>第${currentQuestion + 1}問</p>
            <p>【${q.category}】 難易度：${q.difficulty}</p>
            <p>${q.question}</p>
        </div>
    `;

    q.choices.forEach(function (choice, index) {
        html += `
            <button class="choice" onclick="answer(${index})">
                ${index + 1}. ${choice}
            </button>
        `;
    });

    document.querySelector("#test").innerHTML = html;
    window.scrollTo(0, 0); // ページトップへスクロール
}

// 回答処理
function answer(selected) {
    let list = getQuestionList();
    let q = list[currentQuestion];

    // すべてのボタンを無効化
    let buttons = document.querySelectorAll(".choice");
    buttons.forEach(function (btn) {
        btn.disabled = true;
    });

    let html = "";

    // 正解判定
    if (selected === q.answer) {
        score++;
        html += `<h2 class="correct">✓ 正解</h2>`;
    } else {
        wrongQuestions.push(q);
        html += `<h2 class="wrong">✗ 不正解</h2>`;
    }

    // 解説を表示
    html += `
        <div class="explanation">
            <p>正答：${q.choices[q.answer]}</p>
            <p>${q.explanation}</p>
        </div>
    `;

    // 次へボタン
    html += `<button class="btn btn-primary" onclick="nextQuestion()" style="margin-top: 20px; width: 100%;">次へ</button>`;

    document.querySelector("#test").innerHTML = html;
}

// 次の問題へ
function nextQuestion() {
    currentQuestion++;
    showQuestion();
}

// 結果を表示
function showResult() {
    let total = getQuestionList().length;
    let percentage = Math.round((score / total) * 100);

    let resultMessage = "";
    if (percentage === 100) {
        resultMessage = "🎉 完璧です！";
    } else if (percentage >= 80) {
        resultMessage = "🌟 優秀です！";
    } else if (percentage >= 60) {
        resultMessage = "👍 及第点です";
    } else {
        resultMessage = "📚 もう一度チャレンジしてみましょう";
    }

    let html = `
        <h2>結果</h2>
        <p style="font-size: 20px; font-weight: bold;">${total}問中 ${score}問正解</p>
        <p style="font-size: 24px; color: var(--primary-color); font-weight: bold;">${percentage}%</p>
        <p style="font-size: 18px; margin: 20px 0;">${resultMessage}</p>
    `;

    if (quizMode === "review") {
        html += `<button class="btn btn-primary" onclick="location.reload()" style="width: 100%; margin-top: 20px;">最初から始める</button>`;
    } else {
        html += `
            <div style="margin-top: 30px;">
                <button class="btn btn-primary" onclick="location.reload()" style="width: 100%; margin: 10px 0;">最初から始める</button>
                <button class="btn btn-secondary" onclick="quizMode='review'; currentQuestion=0; showQuestion();" style="width: 100%; margin: 10px 0;">間違えた問題を復習</button>
            </div>
        `;
    }

    document.querySelector("#result").innerHTML = html;
    document.querySelector("#test").innerHTML = "";
}
