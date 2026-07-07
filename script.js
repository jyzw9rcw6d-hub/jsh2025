const questions = [

{id:1,category:"血圧評価・診断",difficulty:"★★★★★",question:"診察室血圧154/92mmHg、家庭血圧128/78mmHgで、日内変動評価でも夜間血圧低下を認める。臓器障害は認めない。この患者への対応として最も適切なのは？",choices:["直ちに2剤併用降圧療法を開始する","白衣高血圧として経過観察のみとする","生活習慣修正を行いながら定期的評価を行う","仮面高血圧として強力な降圧治療を行う"],answer:2,explanation:"診察室血圧のみ高値で家庭血圧が正常の場合、白衣高血圧を考える。ただし将来的な高血圧発症リスクがあるため、生活習慣改善と定期的評価が重要である。"},

{id:2,category:"家庭血圧",difficulty:"★★★★★★",question:"家庭血圧測定について正しいものはどれか。",choices:["診察室血圧より再現性が低い","朝の血圧評価は起床直後の影響を受けない","家庭血圧は高血圧診断や治療評価に重要である","1回測定のみで十分である"],answer:2,explanation:"家庭血圧は診察室血圧より長期予後との関連が強く、診断・治療評価に重要である。"},

{id:3,category:"降圧薬選択",difficulty:"★★★★★",question:"高血圧患者に心不全（HFrEF）を合併している。降圧治療として特に考慮すべき薬剤群はどれか。",choices:["ACE阻害薬またはARB","α遮断薬単独","短時間作用型Ca拮抗薬","ループ利尿薬のみ"],answer:0,explanation:"心不全合併例ではRAA系阻害薬など心不全予後改善効果が期待される薬剤が重要である。"},

{id:4,category:"腎疾患",difficulty:"★★★★★★",question:"CKD患者の高血圧治療で特に重要な考え方はどれか。",choices:["腎機能低下例ではRAA系阻害薬は必ず禁忌","蛋白尿を伴う場合はRAA系阻害薬が有用である","利尿薬は使用できない","血圧管理は腎予後に影響しない"],answer:1,explanation:"蛋白尿を伴うCKDではACE阻害薬やARBによる腎保護効果が期待される。"},

{id:5,category:"二次性高血圧",difficulty:"★★★★★★",question:"若年者で突然発症した高血圧、低カリウム血症、代謝性アルカローシスを認めた。最も疑う疾患はどれか。",choices:["原発性アルドステロン症","甲状腺機能低下症","白衣高血圧","起立性低血圧"],answer:0,explanation:"低K血症を伴う高血圧では原発性アルドステロン症を疑う。"},

{id:6,category:"糖尿病合併高血圧",difficulty:"★★★★★",question:"糖尿病患者の高血圧管理で重要な点はどれか。",choices:["血圧管理はHbA1cより重要ではない","心血管イベントリスク低下のため厳格な管理が重要","降圧治療は腎症進展に影響しない","Ca拮抗薬は絶対禁忌である"],answer:1,explanation:"糖尿病では高血圧の合併により心血管イベントリスクが増加するため適切な血圧管理が重要である。"},

{id:7,category:"高齢者高血圧",difficulty:"★★★★★★",question:"高齢高血圧患者の治療で注意すべき事項はどれか。",choices:["年齢のみで降圧治療を避ける","過度な降圧による有害事象に注意する","家庭血圧測定は不要","薬剤数は必ず増やす"],answer:1,explanation:"高齢者ではフレイルや起立性低血圧などを考慮し、個別化した治療が必要である。"},

{id:8,category:"睡眠時無呼吸",difficulty:"★★★★★",question:"治療抵抗性高血圧患者で積極的に評価すべき疾患はどれか。",choices:["睡眠時無呼吸症候群","急性胃炎","鉄欠乏性貧血のみ","白内障"],answer:0,explanation:"治療抵抗性高血圧では睡眠時無呼吸症候群など二次性要因を評価する。"},

{id:9,category:"薬剤相互作用",difficulty:"★★★★★★",question:"降圧治療中の患者でNSAIDs使用開始後に血圧上昇を認めた。考えられる機序はどれか。",choices:["腎血流低下やNa貯留","インスリン分泌増加","甲状腺ホルモン低下","赤血球増加"],answer:0,explanation:"NSAIDsは腎でのプロスタグランジン産生を抑制し、Na貯留などを介して血圧上昇を起こすことがある。"},

{id:10,category:"総合臨床問題",difficulty:"★★★★★★",question:"高血圧患者の治療方針決定で最も重要な考え方はどれか。",choices:["血圧値だけで決定する","年齢だけで決定する","血圧値・リスク・臓器障害を総合評価する","薬剤種類のみで判断する"],answer:2,explanation:"高血圧治療は血圧値だけでなく、心血管リスク、合併症、臓器障害を総合的に評価して決定する。"}

];

let currentQuestion = 0;
let shuffledQuestions = [];
let score = 0;
let wrongQuestions = [];
let quizMode = "normal";

window.addEventListener("load", function(){
    shuffledQuestions = [...questions].sort(() => Math.random() - 0.5);
    current = 0;

    document.querySelector("#start")
        .addEventListener("click", function(){
            shuffledQuestions = [...questions].sort(() => Math.random() - 0.5);
            currentQuestion = 0;
            score = 0;
            wrongQuestions = [];
            quizMode = "normal";
            showQuestion();
        });

    document.querySelector("#next")
        .addEventListener("click", function(){
            nextQuestion();
        });

    document.querySelector("#review")
        .addEventListener("click", function(){
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
    <p>
    第${currentQuestion + 1}問
    </p>
    <p>
    【${q.category}】
    難易度：${q.difficulty}
    </p>
    <p>
    ${q.question}
    </p>
    </div>
    `;

    q.choices.forEach(function(choice,index){
        html += `
        <button class="choice"
        onclick="answer(${index})">
        ${index+1}. ${choice}
        </button>
        `;
    });

    document.querySelector("#test").innerHTML = html;
}

function answer(selected){
    let list = getQuestionList();
    let q = list[currentQuestion];

    let buttons =
    document.querySelectorAll(".choice");

    buttons.forEach(function(btn){
        btn.disabled = true;
    });

    let html = "";

    if(selected === q.answer){
        score++;
        html += `
        <h2 class="correct">
        正解
        </h2>
        `;
    }else{
        wrongQuestions.push(q);
        html += `
        <h2 class="wrong">
        不正解
        </h2>
        `;
    }

    html += `
    <div class="explanation">
    <p>
    正答：
    ${q.choices[q.answer]}
    </p>
    <p>
    解説：
    ${q.explanation}
    </p>
    </div>
    `;

    html += `
    <button onclick="nextQuestion()">
    次へ
    </button>
    `;

    document.querySelector("#test").innerHTML = html;
}

function nextQuestion(){
    currentQuestion++;
    showQuestion();
}

function showResult(){
    let total =
    getQuestionList().length;

    let html = `
    <h2>
    結果
    </h2>
    <p>
    ${total}問中 ${score}問正解
    </p>
    <p>
    正答率：
    ${Math.round(score / total * 100)}%
    </p>
    `;

    document.querySelector("#result")
    .innerHTML = html;

    document.querySelector("#test")
    .innerHTML = "";
}
