// --- 1. Logic cho chữ cái bay lượn ---
const message = "CHUC MUNG NGAY PHU NU VIET NAM 20/10 TUYET VOI!";
const container = document.querySelector('.flying-text-container');
const numCharacters = message.length;

// Tạo các chữ cái và gán animation ngẫu nhiên
for (let i = 0; i < numCharacters; i++) {
    const charDiv = document.createElement('div');
    charDiv.classList.add('flying-char');
    charDiv.textContent = message[i];

    // Vị trí bắt đầu ngẫu nhiên trên toàn màn hình
    const startX = Math.random() * window.innerWidth;
    const startY = Math.random() * window.innerHeight;
    charDiv.style.left = `${startX}px`;
    charDiv.style.top = `${startY}px`;

    // Điểm kết thúc ngẫu nhiên (dịch chuyển ra xa khỏi trung tâm)
    const endX = (Math.random() - 0.5) * window.innerWidth * 1.5 + 'px';
    const endY = (Math.random() - 0.5) * window.innerHeight * 1.5 + 'px';

    // Gán biến CSS cho keyframes
    charDiv.style.setProperty('--x-end', endX);
    charDiv.style.setProperty('--y-end', endY);

    // Thời gian và độ trễ ngẫu nhiên
    const delay = i * 0.15 + Math.random() * 3;
    const duration = Math.random() * 10 + 15; // Animation kéo dài từ 15 đến 25 giây
    charDiv.style.animationDelay = `${delay}s`;
    charDiv.style.animationDuration = `${duration}s`;

    container.appendChild(charDiv);
}

// --- 2. Logic cho Hiệu ứng hạt lấp lánh/pháo hoa (Canvas) ---
const canvas = document.getElementById('fireworksCanvas');
const ctx = canvas.getContext('2d');
let particles = [];
const colors = ['#FFD700', '#FF4500', '#FF69B4', '#00FFFF', '#ADFF2F', '#FFFFFF', '#FF0000'];

// Thiết lập kích thước canvas
function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

class Particle {
    constructor(x, y, color) {
        this.x = x;
        this.y = y;
        this.radius = Math.random() * 2 + 1;
        this.color = color;
        this.velocity = {
            x: (Math.random() - 0.5) * 5, // Tốc độ di chuyển ban đầu
            y: (Math.random() - 0.5) * 5
        };
        this.alpha = 1; // Độ trong suốt
        this.friction = 0.98; // Giảm tốc độ
    }

    draw() {
        ctx.save();
        ctx.globalAlpha = this.alpha;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        ctx.fillStyle = this.color;
        ctx.shadowBlur = 5;
        ctx.shadowColor = this.color;
        ctx.fill();
        ctx.restore();
    }

    update() {
        this.velocity.x *= this.friction;
        this.velocity.y *= this.friction;
        this.x += this.velocity.x;
        this.y += this.velocity.y;
        this.alpha -= 0.015; // Mờ dần nhanh hơn
    }
}

function createExplosion(x, y) {
    const particleCount = 40;
    const chosenColor = colors[Math.floor(Math.random() * colors.length)];
    for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle(x, y, chosenColor));
    }
}

function animateFireworks() {
    requestAnimationFrame(animateFireworks);
    // Tạo hiệu ứng vệt sáng (trail) bằng cách chỉ xóa một phần canvas
    ctx.fillStyle = 'rgba(74, 0, 224, 0.1)'; // Màu nền tím mờ
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    for (let i = 0; i < particles.length; i++) {
        particles[i].draw();
        particles[i].update();
        if (particles[i].alpha <= 0.05) {
            particles.splice(i, 1);
            i--;
        }
    }
}

// Tạo hiệu ứng nổ liên tục ngẫu nhiên
setInterval(() => {
    // Vị trí nổ ngẫu nhiên (trừ khu vực chữ chính ở giữa)
    const x = Math.random() * canvas.width;
    const y = Math.random() * canvas.height;
    
    // Đảm bảo không nổ quá gần trung tâm (chữ chính)
    if (Math.abs(x - canvas.width / 2) > 200 || Math.abs(y - canvas.height / 2) > 200) {
        createExplosion(x, y);
    }
}, 400); // Mỗi 400ms tạo một vụ nổ mới

animateFireworks();