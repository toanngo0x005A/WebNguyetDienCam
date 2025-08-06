let audioMain = new Audio("Sounds/nhac4ChuLam.mp3"); // Tạo đối tượng Audio
document.querySelector(".playNhac4ChuLam").addEventListener("click", function() {
    if (audioMain.paused) {
        audioMain.play();
    } else {
        audioMain.pause();
    }
});


document.getElementById('nutKeoLen').addEventListener('click', function(event) {
    event.preventDefault(); // Ngăn chặn hành động mặc định của thẻ a
    document.getElementById('TieuDeNguyetDienCam').scrollIntoView({ behavior: 'smooth' }); // Cuộn trang đến thẻ có id 'TieuDeNguyetDienCam' một cách mượt mà
});


