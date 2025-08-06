/*Chú ý: Trong github các tên file không nên chứa:
    Các quy tắc đặt tên file an toàn khi làm việc với GitHub (và Git nói chung):
        -Không chứa ký tự đặc biệt như: ! @ # $ % ^ & * ( ) = + { } [ ] ; ' " , < > ? \ / | ~
        -Không có dấu cách ⇒ nên dùng - hoặc _ thay cho khoảng trắng
        -Không dùng dấu tiếng Việt (ví dụ: tên-tệp.txt sẽ dễ gây lỗi)
        -Không dùng chữ in hoa ở đầu nếu không cần thiết (một số hệ thống phân biệt hoa thường)
    Riêng ký tự đặc biệt thì file có tên không chuẩn có thể bị Git hoặc GitHub từ chối 
    hoặc gây lỗi nghiêm trọng, file không dược chấp nhận khi chạy web trên github.
*/

//Điểm khác biệt ở 'hieuUngCuon80.js' và 'hieuUngCuon50.js' là tại thuộc tính 'threshold'
/*Tránh để cho thuộc tính này quá to, vì nếu to quá thì lỡ kích thước phần tử cần tạo hiệu ứng
quá lớn thì sẽ gây lỗi không hiện ra phần từ đó luôn dù ta lướt đi lượt lại cả tỷ lần
VD: threshold: 0.8; cho 1 phần tử khá lớn và khi ta lướt qua nó, chiều cao màn hình ta không đủ
để hiển thị đủ 80% phần tử( vì phần tử này khá lớn) => không làm hiển thị lên phần tử đó luôn.
₫₫₫₫₫₫Ngoài việc do phần tử quá lớn ra, thì vấn đề này thường xảy ra trên thiết bị di động nếu
ta xài chế độ màn hình ngang khi đó chiều cao hiển thị sẽ cực kỳ thấp nên dù phần tử đó có kích
thước vừa đủ hay nhỏ gì thì có khả năng nó vẫn sẽ bị lỗi hiện ra phần từ, do phần tử đó không
hiển thị đủ 80% trên màn hình luôn.
==>>Nên là nếu muốn đa nền tảng đa chế độ thì đặt vừa vừa phải phải thôi. Như 45% như file này
chẳng hạn.
^^^Chế độ màn hình ngang điện thoại thôi nhé, chứ chế độ dọc( như bth) thì phần tử nào cũng chắc
chắn sẽ hiển thị ra vì chế độ dọc thì chiều cao màn hình quá khủng rồi.
*/


/*Khi toàn bộ HTML tải xong, JavaScript mới thực thi.*/
document.addEventListener("DOMContentLoaded", function () {
    //Chọn tất cả các phần tử có class .hieuUngCuon, tức là những phần tử sẽ có hiệu ứng khi xuất hiện trên màn hình.
    //Lưu danh sách này vào biến phanTuCanHieuUng.
    const phanTuCanHieuUng = document.querySelectorAll(".hieuUngCuon");

    //IntersectionObserver giúp theo dõi khi một phần tử xuất hiện hoặc biến mất khỏi vùng nhìn thấy 
    //của người dùng (viewport).
    //Khi một phần tử được phát hiện trong vùng nhìn thấy, nó sẽ kích hoạt một callback function 
    //nhận danh sách danhSachMucTieu.
    const nguoiQuanSat = new IntersectionObserver(danhSachMucTieu => {
        //danhSachMucTieu chứa các phần tử đang được theo dõi và có thể đã đi vào vùng nhìn thấy.
        //Chúng ta lặp qua từng mucTieu (phần tử quan sát).
        danhSachMucTieu.forEach(mucTieu => {
            //.isIntersecting trả về true nếu phần tử đang xuất hiện trên màn hình.
            //Nếu đúng, thêm class "thucHien" vào phần tử (mucTieu.target).
            //Class "thucHien" có thể được sử dụng trong CSS để tạo hiệu ứng xuất hiện (ví dụ: fade-in).
            if (mucTieu.isIntersecting) {
                mucTieu.target.classList.add("thucHien");
            }
        });
    }, { threshold: 0.45 });
    //threshold: 0.5 có nghĩa là hiệu ứng sẽ kích hoạt khi ít nhất 80% phần tử xuất hiện trên màn hình.
    //Nếu đặt 1.0, hiệu ứng chỉ kích hoạt khi 100% phần tử xuất hiện trong viewport, còn 0.3 thì
    //kích hoạt khi 30% ptu xuất hiện, tương tự,...

    phanTuCanHieuUng.forEach(phanTu => nguoiQuanSat.observe(phanTu));
    //Duyệt qua từng phần tử đã tìm thấy trong phanTuCanHieuUng.
    //Dùng nguoiQuanSat.observe(phanTu) để theo dõi chúng.
});
