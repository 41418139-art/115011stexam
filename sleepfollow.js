// 取得界面元素
const sleepInput = document.getElementById('sleepTime'); // 入睡時間選擇器
const wakeInput = document.getElementById('wakeTime');   // 醒來時間選擇器
const trackBtn = document.getElementById('trackBtn');    // 記錄按鈕
const hoursResult = document.getElementById('hoursResult'); // 結果顯示區

// 計算睡眠時數的函式
function calculateSleep() {
    // 獲取輸入的時間值字串 (例如 "23:00")
    const start = sleepInput.value;
    const end = wakeInput.value;

    if (!start || !end) return; // 如果沒填寫則跳出

    // 將時間轉換為分鐘進行運算
    const startParts = start.split(':');
    const endParts = end.split(':');
    
    let startMin = parseInt(startParts[0]) * 60 + parseInt(startParts[1]);
    let endMin = parseInt(endParts[0]) * 60 + parseInt(endParts[1]);

    // 如果醒來時間小於入睡時間，代表跨天（睡到隔天）
    if (endMin < startMin) {
        endMin += 24 * 60; // 補上 24 小時的分鐘數
    }

    const totalMinutes = endMin - startMin; // 總分鐘差
    const hours = (totalMinutes / 60).toFixed(1); // 轉為小時並取小數點第一位

    // 觸發視覺效果：數字跳動
    hoursResult.style.transform = "scale(1.2)";
    setTimeout(() => hoursResult.style.transform = "scale(1)", 200); // 0.2秒後縮回

    hoursResult.textContent = `${hours}h`; // 更新畫面的小時數
}

// 監聽按鈕點擊事件
trackBtn.addEventListener('click', () => {
    calculateSleep(); // 執行計算
    
    // Vibe 小細節：在控制台留下一個浪漫的記錄
    console.log(`%c 🌙 夢境紀錄已存檔：${hoursResult.textContent} `, 'background: #222; color: #bada55');
});

// 監聽輸入框變化，即時計算（這才叫 Vibe）
sleepInput.addEventListener('input', calculateSleep);
wakeInput.addEventListener('input', calculateSleep);