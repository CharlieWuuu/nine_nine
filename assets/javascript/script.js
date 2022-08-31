// 設定變數：乘法表容器
let tableContainer = $('#table_container');
// for迴圈產生2~9的方框
for (i = 2; i < 10; i++) {
  // 方框的html，同時設定乘法算式容器的id
  table =
    `<div class="table">
		<h4>` +
    i +
    `</h4><div id="formula_container_` +
    i +
    `"></div></div>`;
  // html放到乘法表容器中
  tableContainer.append(table);

  // 設定變數：算式容器
  let formulaContainer = $('#formula_container_' + i);
  // for迴圈產生2~9的算式，i是被乘數，x是乘數，總和直接用乘的
  for (x = 2; x < 10; x++) {
    formula =
      `<p>
		<span id="number">` +
      i +
      `</span>✕
		<span id="amount">` +
      x +
      `</span>＝
		<span id="result">` +
      i * x +
      `</span>
		</p>`;
    // html放到算式容器中
    formulaContainer.append(formula);
  }
}

// 切換頁面
function showTable() {
  if ($('#test_container').css('display') !== 'none') {
    $('#table_container').slideToggle();
    $('#test_container').slideToggle();
  }
}

function showTest() {
  if ($('#table_container').css('display') !== 'none') {
    $('#table_container').slideToggle();
    $('#test_container').slideToggle();
  }
}

// 設定測驗狀態
let isPlaying = 0;
let correctTimes = 0;
let wrongTimes = 0;

// 設定隨機題目
function getRandom(x) {
  return Math.floor(Math.random() * x) + 2;
}

// 開始遊戲
function startQuestion() {
  if (isPlaying == 1) {
    $('#start').html('開始測驗');
    $('.question_container').slideToggle();
    isPlaying = 0;
    return;
  } else {
    question.innerHTML = '';
    $('.question_container').slideToggle();
    $('#start').html('結束測驗');
    isPlaying = 1;
    correctTimes = 0;
    wrongTimes = 0;
    $('#client_answer').attr('disabled', false);
    $('#check').attr('disabled', false).html('確定');
    renderQuestion();
  }
}

// 顯示隨機題目
function renderQuestion() {
  let question = $('#question');
  let a = getRandom(8);
  let b = getRandom(8);
  questionHTML =
    `<span id="question_number">` +
    a +
    `</span> ✕
<span id="question_amount">` +
    b +
    `</span>＝<input id="client_answer" type="text" />`;
  question.append(questionHTML);

  $('#correctTimes').html(correctTimes);
  $('#wrongTimes').html(wrongTimes);
}

// 檢查答案
function checkAnswer() {
  let client_answer = $('#client_answer').val();
  let answer = $('#question_number').text() * $('#question_amount').text();
  if (client_answer == answer) {
    correctTimes++;
    $('#correctTimes').html(correctTimes);
    $('#wrongTimes').html(wrongTimes);
    question.innerHTML = '';
    renderQuestion();
    if (correctTimes == 5) {
      question.innerHTML = '';
      $('#check')
        .attr('disabled', true)
        .css('cursor', 'default')
        .html('你是九九乘法達人！');
      $('#client_answer').attr('disabled', true);
    }
  } else {
    console.log('錯誤');
    wrongTimes++;
    $('#correctTimes').html(correctTimes);
    $('#wrongTimes').html(wrongTimes);
    if (wrongTimes == 4) {
      $('#check').html('剩下一次機會！');
    }
    if (wrongTimes == 5) {
      $('#question').css('color', 'rgba(0,0,0,0.3)');
      $('#question').children().css('color', 'rgba(0,0,0,0.3)');
      $('#check')
        .attr('disabled', true)
        .css('cursor', 'default')
        .html('再複習一下！');
      $('#client_answer').attr('disabled', true);
    }
  }
}
