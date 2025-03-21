
import quizData from './quizData.js';

const app = document.getElementById('app');
let index = 0;
let selected = '';
let answered = false;

function render() {
  const current = quizData[index];
  app.innerHTML = `
    <div class="container">
      <h1>Jordan 品牌选择题 (${index + 1}/${quizData.length})</h1>
      <p><strong>${current.question}</strong></p>
      <div id="options">
        ${current.options.map(option => `
          <button data-value="${option}" class="${selected === option ? 'selected' : ''}">
            ${option}
          </button>
        `).join('')}
      </div>
      <div class="feedback" id="feedback"></div>
      <div>
        ${!answered ? '<button id="submit">提交答案</button>' : '<button id="next">下一题</button>'}
      </div>
    </div>
  `;

  document.querySelectorAll('#options button').forEach(btn => {
    btn.onclick = () => {
      if (!answered) {
        selected = btn.dataset.value;
        render();
      }
    };
  });

  if (!answered) {
    const submit = document.getElementById('submit');
    if (submit) {
      submit.onclick = () => {
        if (!selected) return;
        answered = true;
        const isCorrect = selected === current.answer;
        document.querySelectorAll('#options button').forEach(btn => {
          btn.disabled = true;
          if (btn.dataset.value === current.answer) {
            btn.classList.add('correct');
          } else if (btn.dataset.value === selected) {
            btn.classList.add('incorrect');
          }
        });
        document.getElementById('feedback').textContent = isCorrect ? '✅ 回答正确！' : `❌ 回答错误，正确答案是：${current.answer}`;
        render();
      };
    }
  } else {
    const next = document.getElementById('next');
    if (next) {
      next.onclick = () => {
        index = (index + 1) % quizData.length;
        selected = '';
        answered = false;
        render();
      };
    }
  }
}

render();
