const fs = require('fs');
const path = require('path');
const { JSDOM } = require('jsdom');

const html = fs.readFileSync(path.join(__dirname, 'index.html'), 'utf8');
const dom = new JSDOM(html, {
  runScripts: 'dangerously',  
  resources: 'usable'  
});


global.document = dom.window.document;
global.window = dom.window;

require('./popover.js');

function simulateClick(element) {
  const event = new dom.window.Event('click', { bubbles: true });
  element.dispatchEvent(event);
}

function assert(condition, message) {
  if (condition) {
    console.log(`✅ PASS: ${message}`);
  } else {
    console.log(`❌ FAIL: ${message}`);
  }
}

console.log('--- Запуск тестов для popover ---');

const trigger = document.getElementById('trigger-btn');
const popover = document.getElementById('popover');

simulateClick(trigger);
assert(popover.style.display === 'block', 'Popover показывается при клике на кнопку');

simulateClick(document.body);
assert(popover.style.display === 'none', 'Popover скрывается при клике вне');

simulateClick(trigger);
assert(popover.style.display === 'block', 'Popover показывается при повторном клике');

const title = document.getElementById('popover-title');
const text = document.getElementById('popover-text');
assert(title && title.textContent === 'Popover Title', 'Заголовок присутствует и корректен');
assert(text && text.textContent === 'This is the popover text. It can be longer.', 'Текст присутствует и корректен');

if (popover.style.display === 'block') {
  const triggerRect = trigger.getBoundingClientRect();
  const popoverRect = popover.getBoundingClientRect();
  const expectedLeft = triggerRect.left + (triggerRect.width / 2) - (popoverRect.width / 2);
  const actualLeft = parseFloat(popover.style.left) || 0;
  const tolerance = 5; 
  assert(Math.abs(actualLeft - expectedLeft) <= tolerance, `Popover центрирован по горизонтали (ожидаемо: ${expectedLeft}, фактически: ${actualLeft})`);
} else {
  console.log('⚠️  Пропуск теста центрирования: popover скрыт');
}

console.log('--- Тесты завершены ---');