// Thiết lập các phần tử DOM
const startScreen = document.getElementById('start-screen');
const mainScreen = document.getElementById('main-screen');
const startButton = document.getElementById('startButton');
const tree = document.getElementById('tree');

// Ký tự cho hiệu ứng nở (Hoa, trái tim, lấp lánh...)
const symbols = ['💖', '🌸', '✨', '🌹', '💕', '🌷'];
const numBlooms = 30; // Số lượng cánh hoa/chữ sẽ nở

// --- 1. Điều khiển chuyển đổi màn hình ---
startButton.addEventListener('click', () => {
    // Ẩn màn hình bắt đầu
    startScreen.classList.remove('active');
    // Hiện màn hình chính sau độ trễ (để thấy hiệu ứng chuyển cảnh)
    setTimeout(() => {
        mainScreen.classList.add('active');
        // Bắt đầu hiệu ứng cây nở sau khi màn hình chính hiện
        startBloomingEffect();
    }, 800);
});

// --- 2. Logic tạo và điều khiển hiệu ứng nở ---
function createBloom(symbol) {
    const bloomDiv = document.createElement('div');
    bloomDiv.classList.add('bloom');
    bloomDiv.textContent = symbol;

    // Vị trí ngẫu nhiên trong khu vực tán cây (khoảng 50% chiều cao/rộng)
    const x = Math.random() * 80 - 40; // Từ -40% đến +40%
    const y = Math.random() * 80 - 80; // Từ -80% đến 0% (phía trên thân cây)

    bloomDiv.style.left = `calc(50% + ${x}%)`;
    bloomDiv.style.top = `calc(100% + ${y}%)`;

    // Màu sắc ngẫu nhiên (chỉ dùng nếu không phải emoji)
    // bloomDiv.style.color = `hsl(${Math.random() * 360}, 70%, 70%)`; 

    tree.appendChild(bloomDiv);
    return bloomDiv;
}

function startBloomingEffect() {
    const blooms = [];
    
    // Tạo tất cả các cánh hoa/chữ (ban đầu ẩn)
    for (let i = 0; i < numBlooms; i++) {
        const symbol = symbols[i % symbols.length];
        blooms.push(createBloom(symbol));
    }

    // Hiển thị từng cánh hoa/chữ theo trình tự (hiệu ứng nở dần)
    blooms.forEach((bloom, index) => {
        const delay = index * 100 + 500; // Khoảng 100ms giữa mỗi cánh hoa, bắt đầu sau 0.5s
        
        setTimeout(() => {
            bloom.classList.add('visible');
        }, delay);
    });
}