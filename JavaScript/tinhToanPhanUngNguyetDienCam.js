$(document).ready(function() {
    // Khi trang web load xong, tự động tính toán cho từng nhân vật
    $('.khungNhapChiSo').each(function () {
        // Không dùng %('.khungNV') vì khi áp dụng lệnh
        // $(this).closest('.khungNV')....
        // Thì nó sẽ không lấy được bỏi this là .khungNV rồi thì closest sẽ không tìm thấy được.

        tinhBonusNguyetTuEM.call(this);

        if ($(this).closest('.khungNV').find('#Ineffa, #Flins').length > 0) {
            tinhHeSoTangNguyetTuATK.call(this);
        }
        
        LevelPhanUngCoBan.call(this);

    });



    /*Chức năng: Lắng nghe sự kiện input trên các phần tử có class .chiSoTinhThong. 
    Mỗi khi người dùng nhập hoặc thay đổi giá trị trong các phần tử này, hàm tinhToanTinhThong sẽ 
    được gọi, và trong hàm này, this sẽ tham chiếu đến chính xác vị trí phần tử input mà người dùng 
    vừa thay đổi.*/
    $('.chiSoTinhThong').on('input', function() {
        tinhBonusNguyetTuEM.call(this);
    });

    $('.chiSoATK').on('input', function() {
        tinhHeSoTangNguyetTuATK.call(this);

        $('.khungNhapChiSo').each(function() {
            layGtriVaChuanBiTinhDameNV.call(this);
        }); // Mỗi lần chỉnh chỉ số ATK( chỉ có Ineffa và Flins mới có khung nhập chỉ số này)
        // Thì sau khi ta tính Hệ số Tăng Nguyệt từ ATK xong. Ta phải thực hiện lấy và tính
        // toán lại dame của all nhân vật trong team vì đây là hệ số ảnh hưởng đến 
        // dame tất cả thành viên trong team, một khi thay đổi hệ số này ta phải thực hiện 
        // tính toán dame lại tất cả loại dame.
    });

    $('.LevelNV').on('input', function() {
        LevelPhanUngCoBan.call($(this));
    });

    $('.chiSoKhangQuai, .giamKhangQuai').on('input', function () {
        tongKetNguyetDienCam();
    });

    $('.chiSoBonusNguyet').on('input', function() {
        let ChiSoBonusNguyet = parseFloat($(this).val());

        if (!isNaN(ChiSoBonusNguyet) && ChiSoBonusNguyet >= 0) {
            // Đổi màu chữ và bóng hộp thành màu xanh lá cây( để cho biết giá trị đã hợp lệ)
            $(this).closest('.khungNV').find('.chiSoBonusNguyet').css({
                'color': 'green',
                'box-shadow': '0px 0px 20px green'
            });

            layGtriVaChuanBiTinhDameNV.call(this);
        }
        else{
            // Đổi màu chữ và bóng hộp thành màu đỏ( để cảnh báo nhập sai giá trị)
            $(this).closest('.khungNV').find('.chiSoBonusNguyet').css({
                'color': 'red',
                'box-shadow': '0px 0px 20px red'
            });
        }
    });


    $('.chiSoTyLeBao').on('input', function() {
        let ChiSoTyLeBao = parseFloat($(this).val());

        if (!isNaN(ChiSoTyLeBao) && ChiSoTyLeBao >= 0.05 && ChiSoTyLeBao <= 1) {
            // Đổi màu chữ và bóng hộp thành màu xanh lá cây( để cho biết giá trị đã hợp lệ)
            $(this).closest('.khungNV').find('.chiSoTyLeBao').css({
                'color': 'green',
                'box-shadow': '0px 0px 20px green'
            });

            layGtriVaChuanBiTinhDameNV.call(this);
        }
        else{
            // Đổi màu chữ và bóng hộp thành màu đỏ( để cảnh báo nhập sai giá trị)
            $(this).closest('.khungNV').find('.chiSoTyLeBao').css({
                'color': 'red',
                'box-shadow': '0px 0px 20px red'
            });
        }
    });


    $('.chiSoSatThuongBao').on('input', function() {
        let ChiSoSatThuongBao = parseFloat($(this).val());

        if (!isNaN(ChiSoSatThuongBao) && ChiSoSatThuongBao >= 0.5) {
            // Đổi màu chữ và bóng hộp thành màu xanh lá cây( để cho biết giá trị đã hợp lệ)
            $(this).closest('.khungNV').find('.chiSoSatThuongBao').css({
                'color': 'green',
                'box-shadow': '0px 0px 20px green'
            });

            layGtriVaChuanBiTinhDameNV.call(this);
        }
        else{
            // Đổi màu chữ và bóng hộp thành màu đỏ( để cảnh báo nhập sai giá trị)
            $(this).closest('.khungNV').find('.chiSoSatThuongBao').css({
                'color': 'red',
                'box-shadow': '0px 0px 20px red'
            });
        }
    });

  
    // Mỗi lần 1 radio( do ở web này chỉ có lựa chọn radio Loại Bạo thôi nên ta nói nó là Loại Bạo)
    // cũng được. Thì sẽ gọi 1 lần layGtriVaChuanBiTinhDameNV() và truyền this là radio đó.
    $('input[type="radio"]').on('change', function () {
        layGtriVaChuanBiTinhDameNV.call(this);
    });


});


function tinhBonusNguyetTuEM() {
    // Lấy giá trị của phần tử input hiện tại
    let ChiSoTinhThong = parseFloat($(this).closest('.khungNV').find('.chiSoTinhThong').val());
    /*Mặc dù ta có thể viết là
        let ChiSoTinhThong = parseFloat($(this).val()); 
    Vẫn lấy được giá trị đúng ta cần thay vì viết dài như trên. Nhưng việc viết dài thế là nhằm 
    giúp hàm khởi chạy tính giá trị ngay từ đầu hoạt động chính xác:\
        $('.khungNhapChiSo').each(function () {
            tinhBonusNguyetTuEM.call(this);

            if ($(this).closest('.khungNV').find('#Ineffa, #Flins').length > 0) {
                tinhHeSoTangNguyetTuATK.call(this);
            }
            
            LevelPhanUngCoBan.call(this);
        });
    Vì this truyền vào hàm tinhBonusNguyetEM chỉ là thẻ `<div class="khungNV">` chứ không phải chính 
    xác thẻ `<input> tinh thông` ta cần. Nên nếu dùng 
        let ChiSoTinhThong = parseFloat($(this).val()); 
    Thì chắc chắn sẽ không lấy được giá trị của thẻ `<input> tinh thông` mà ta cần.
    Mà phải dùng
        let ChiSoTinhThong = parseFloat($(this).find('.chiSoTinhThong').val());
    Mới lấy được.

    Còn TH: $('.chiSoTinhThong').on('input', function() {
                tinhBonusNguyetTuEM.call(this);
            });
    Thì cả 2 lệnh đều có thể lấy chính xác dược giá trị của thẻ `<input> tinh thông` ta cần.
    
    Tương tự với các hàm khác như tinhHeSoTangNguyetTuATK, LevelPhanUngCoBan,....
    */

    if (!isNaN(ChiSoTinhThong) && ChiSoTinhThong >= 0) {
        // Đổi màu chữ và bóng hộp thành màu xanh lá cây( để cho biết giá trị đã hợp lệ)
        $(this).closest('.khungNV').find('.chiSoTinhThong').css({
            'color': 'green',
            'box-shadow': '0px 0px 20px green'
        });


        let TT_TangBonusNguyet = (6 * ChiSoTinhThong) / (ChiSoTinhThong + 2000);

        // Hiển thị giá trị tính toán trong phần tử có class 'GtriTT_TangPhanUngBienDoi' tương ứng
        $(this).closest('.khungNV').find('.GtriBonusNguyetEM').text(TT_TangBonusNguyet.toFixed(10));
        

        // Gọi hàm layGtriVaChuanBiTinhDameNV để thực hiện bước lấy all giá trị cần thiết
        // và chuẩn bị tính toán dame Nguyệt Điện Cảm Phản ứng Và Nguyệt Điện Cảm Trực tiếp
        layGtriVaChuanBiTinhDameNV.call(this);

    }
    else {
        // Hiển thị thông báo lỗi nếu giá trị không phù hợp( tức không đáp ứng điều kiện của lệnh if trên)
        $(this).closest('.khungNV').find('.GtriBonusNguyetEM').text('[Là số và >= 0]');

        
        // Đổi màu chữ và bóng hộp thành màu đỏ( để cảnh báo nhập sai giá trị)
        $(this).closest('.khungNV').find('.chiSoTinhThong').css({
            'color': 'red',
            'box-shadow': '0px 0px 20px red'
        });
    }
}


function tinhHeSoTangNguyetTuATK() {
    let ChiSoATK = parseFloat($(this).closest('.khungNV').find('.chiSoATK').val());
    // Tại sao không viết ngắn lại thì đã giải thích ở hàm tinhBonusNguyetTuEM() ở trên.

    if (!isNaN(ChiSoATK) && ChiSoATK >= 0) {
        // Đổi màu chữ và bóng hộp thành màu xanh lá cây( để cho biết giá trị đã hợp lệ)
        $(this).closest('.khungNV').find('.chiSoATK').css({
            'color': 'green',
            'box-shadow': '0px 0px 20px green'
        });


        let TT_HeSoTangNguyet = 0; // Phải khai báo biến TT_HeSoTangNguyet ở bên ngoài khối
        // lệnh if vì nếu ta khai báo biến trên ở trong hàm if thì biến này sẽ không thể được 
        // sử dụng bên ngoài khối lệnh if. Ở đây ta đang nói đến câu lệnh:
        //  $(this).closest('.khungNV').find('.GtriHeSoTangNguyetATK').text(TT_HeSoTangNguyet.toFixed(10));


        // TH: Hệ số nguyệt tăng của Ineffa và Flins đều giống nhau, là mỗi 100 ATK sẽ được 0.7%
        // Nên ta gộp chung. Và tương lai nếu có nhân vật khác với cách tăng hệ số từ ATK khác
        // thì ta có thể tách riêng ra thành 1 khối lệnh if khác.
        if ($(this).closest('.khungNV').find('#Ineffa, #Flins').length > 0) {

            TT_HeSoTangNguyet = 0.00007 * ChiSoATK;

            if ( TT_HeSoTangNguyet > 0.14) {
                TT_HeSoTangNguyet = 0.14; // Tối đa của thiên phú Ineffa và Flins
            }
        }   
        
        
        // Hiển thị giá trị tính toán trong phần tử có class 'GtriHeSoTangNguyetATK' tương ứng
        $(this).closest('.khungNV').find('.GtriHeSoTangNguyetATK').text(TT_HeSoTangNguyet.toFixed(10));
    
        layGtriVaChuanBiTinhDameNV.call(this);
    }
    else {
        // Hiển thị thông báo lỗi nếu giá trị không phù hợp( tức không đáp ứng điều kiện của lệnh if trên)
        $(this).closest('.khungNV').find('.GtriHeSoTangNguyetATK').text('[Là số và >= 0]');
        
        // Đổi màu chữ và bóng hộp thành màu đỏ( để cảnh báo nhập sai giá trị)
        $(this).closest('.khungNV').find('.chiSoATK').css({
            'color': 'red',
            'box-shadow': '0px 0px 20px red'
        });
    }
}



//Đây là "Bảng Level Phản ứng Cơ bản" được viết dưới dạng đối tượng đối xạ
//giúp việc lấy Hệ số Level phản cơ bản dễ dàng hơn
const BangLVPUCoBan = { 0: 0, // Nhập lv là 0 để loại bỏ nhân vật để không tính là tham gia phản ứng
    1: 17.165605, 2: 18.535048, 3: 19.904854, 4: 21.274903, 5: 22.6454,
    6: 24.649613, 7: 26.640643, 8: 28.868587, 9: 31.367679, 10: 34.143343,
    11: 37.201, 12: 40.66, 13: 44.446668, 14: 48.563519, 15: 53.74848,
    16: 59.081897, 17: 64.420047, 18: 69.724455, 19: 75.123137, 20: 80.584775,
    21: 86.112028, 22: 91.703742, 23: 97.244628, 24: 102.812644, 25: 108.409563,
    26: 113.201694, 27: 118.102906, 28: 122.979318, 29: 129.72733, 30: 136.29291,
    31: 142.67085, 32: 149.029029, 33: 155.416987, 34: 161.825495, 35: 169.106313,
    36: 176.518077, 37: 184.072741, 38: 191.709518, 39: 199.556908, 40: 207.382042,
    41: 215.3989, 42: 224.165667, 43: 233.50216, 44: 243.350573, 45: 256.063067,
    46: 268.543493, 47: 281.526075, 48: 295.013648, 49: 309.067188, 50: 323.601597,
    51: 336.757542, 52: 350.530312, 53: 364.482705, 54: 378.619181, 55: 398.600417,
    56: 416.398254, 57: 434.386996, 58: 452.951051, 59: 472.606217, 60: 492.88489,
    61: 513.568543, 62: 539.103198, 63: 565.510563, 64: 592.538753, 65: 624.443427,
    66: 651.470148, 67: 679.49683, 68: 707.79406, 69: 736.671422, 70: 765.640231,
    71: 794.773403, 72: 824.677397, 73: 851.157781, 74: 877.74209, 75: 914.229123,
    76: 946.746752, 77: 979.411386, 78: 1011.223022, 79: 1044.791746, 80: 1077.443668,
    81: 1109.99754, 82: 1142.976615, 83: 1176.369483, 84: 1210.184393, 85: 1253.835659,
    86: 1288.952801, 87: 1325.484092, 88: 1363.456928, 89: 1405.097377, 90: 1446.853458,
    91: 1488.215547, 92: 1528.444567, 93: 1580.367911, 94: 1630.847528, 95: 1711.197785,
    96: 1780.453941, 97: 1847.322809, 98: 1911.474309, 99: 1972.864342, 100: 2030.071808
};

/*Tương tự với hàm "tinhToanTinhThong". Chỉ có khác 1 chút ở chỗ đối tượng ánh xạ thôi*/
function LevelPhanUngCoBan() {
    let levelNV = parseInt($(this).closest('.khungNV').find('.LevelNV').val());

    if (!isNaN(levelNV) && levelNV >= 0 && levelNV <= 100) {
        // Đổi màu chữ và bóng hộp thành màu xanh lá cây( để cho biết giá trị đã hợp lệ)
        $(this).closest('.khungNV').find('.LevelNV').css({
            'color': 'green',
            'box-shadow': '0px 0px 20px green'
        });

        // Lấy giá trị từ đối tượng ánh xạ "BangLVPUCoBan" ở trên;
        let LevelPUCoBan = BangLVPUCoBan[levelNV];

        $(this).closest('.khungNV').find('.GtriLevelPhanUngCoBan').text(LevelPUCoBan);

        layGtriVaChuanBiTinhDameNV.call(this);
    }
    else {
        $(this).closest('.khungNV').find('.LevelNV').css({
            'color': 'red',
            'box-shadow': '0px 0px 20px red'
        });
    }
}


function layGtriVaChuanBiTinhDameNV() {;

    // Dựa vào đối tượng this để lấy các giá trị cần thiết.
    let LevelPUCoBan = parseFloat($(this).closest('.khungNV').find('.GtriLevelPhanUngCoBan').text());

    // Do có thể có nhiều nhân vật có cơ chế tăng hệ số nguyệt điện cảm trong 
    // cùng 1 khungAllNV( tức cùng 1 team) nên ta phải tìm tất cả các giá trị hệ số tăng nguyệt
    // điện cảm từ ATK của từng nhân vật.
    let Tong_HeSoTangNguyet = 0;
    $(this).closest('.khungAllNV').find('.GtriHeSoTangNguyetATK').each(function () {
        let giaTri = parseFloat($(this).text());
        if (!isNaN(giaTri)) {
            Tong_HeSoTangNguyet += giaTri;
        }
    });

    let TT_TangBonusNguyet = parseFloat($(this).closest('.khungNV').find('.GtriBonusNguyetEM').text());

    let csBonusNguyet = parseFloat($(this).closest('.khungNV').find('.chiSoBonusNguyet').val());
    
    // Xác định Loại Bạo được chọn
    let csTyLeBao = 0;
    let luaChonBao = $(this).closest('.khungNV').find('input[type="radio"]:checked').val();

    if (luaChonBao === 'benPhai') {
        csTyLeBao = 1;
        loaiDame = '<span style="color: #66ff66; font-weight: bold;">🟢[Chí]</span>';
    } else if (luaChonBao === 'benTrai') {
        csTyLeBao = 0;
        loaiDame = '<span style="color: #ff6666; font-weight: bold;">🔴[Hụt]</span>';
    } else {
        // Lấy chỉ số Bạo nếu Loại Bạo được chọn là AVG.
        csTyLeBao = parseFloat($(this).closest('.khungNV').find('.chiSoTyLeBao').val()) || 0;
        loaiDame = `<span style="color: #ffff66; font-weight: bold;">🟡[AVG]</span>`;
    }

    let csSatThuongBao = parseFloat($(this).closest('.khungNV').find('.chiSoSatThuongBao').val());



    if ($(this).closest('.khungNV').find('#Ineffa, #Flins').length > 0) {
        let csATK = parseFloat($(this).closest('.khungNV').find('.chiSoATK').val());
        
        let heSoDame;    
            
        if ($(this).closest('.khungNV').find('#Ineffa').length > 0) {
            heSoDame = 0.65; // Hệ số sát thương Nguyệt từ Thiên phú của Ineffa
        }
        else {
            heSoDame = 2.33856; // Hệ số sát thương Nguyệt từ Thiên phú của Flins   
        }
        // Gọi hàm tính toán Sát thương Nguyệt điện cảm trực tiếp của Ineffa
        tinhToanDameNguyetDienCamTT(Tong_HeSoTangNguyet, TT_TangBonusNguyet, csBonusNguyet, csTyLeBao, csSatThuongBao, csATK, heSoDame, this, loaiDame);
    }


    // Gọi hàm tính toán sát thương Nguyệt Điện Cảm Phản ứng Cá nhân
    tinhToanDameNguyetDienCamPUCN(LevelPUCoBan, Tong_HeSoTangNguyet, TT_TangBonusNguyet, csBonusNguyet, csTyLeBao, csSatThuongBao, this, loaiDame);
    
    /*$$$$Câu hỏi đắt giá: Lý do tại sao khi ta gọi hàm
        tinhToanDameNguyetDienCamPUCN(LevelPUCoBan, Tong_HeSoTangNguyet, TT_TangBonusNguyet, csBonusNguyet, csTyLeBao, csSatThuongBao, this);
    thì phần đặt tên hàm
        function tinhToanDameNguyetDienCamPUCN(LevelPUCoBan, Tong_HeSoTangNguyet, TT_TangBonusNguyet, csBonusNguyet, csTyLeBao, csSatThuongBao, doiTuongThis) {
    lại có tham số là `doiTuongThis`. Nhưng ở phần gọi hàm
        layGtriVaChuanBiTinhDameNV.call(this); 
    Thì tên hàm chỉ cần 
        function layGtriVaChuanBiTinhDameNV() {...} 
    Mà không cần đặt tham số tên gì đó như `doiTuongThis` ở trên????????    
    ==>>**Lý do:**
    Khi bạn gọi `layGtriVaChuanBiTinhDameNV.call(this);`, `this` được truyền và dùng trong 
    hàm đó thông qua `call`. Nhưng khi gọi:
        ```js
        tinhToanDameNguyetDienCamPUCN(..., this);
        ```
    Nếu trong **hàm `tinhToanDameNguyetDienCamPUCN`** bạn **không gán `this` thành tham số**, thì 
    không thể dùng `this` trực tiếp bên trong hàm đó. Vì nó chỉ là một đối số như các biến thường.
    ---
    **Cách giải quyết:**
    ✅ Trong `tinhToanDameNguyetDienCamPUCN`, thêm tham số, ví dụ:
    ```js
    function tinhToanDameNguyetDienCamPUCN(..., doiTuongThis) {
        console.log(doiTuongThis); // dùng thay cho this
    }
    ```
    Và gọi như bạn đang làm:
    ```js
        tinhToanDameNguyetDienCamPUCN(..., this);
    ```
    ---
    🧠 Tóm gọn:
    **`this` chỉ có hiệu lực khi được gắn ngữ cảnh qua `.call()`, `.apply()` hoặc bên trong function 
    được bind đúng ngữ cảnh.**
    👉 Nếu truyền `this` như đối số, bạn phải dùng **biến đại diện** thay vì từ khóa `this` bên 
    trong hàm.

    ₫₫₫₫Chú ý:
    🔸 Không thể đặt tên tham số là this do đây là từ khóa đặc biệt trong JavaScript.
    🔸 Do đó, phải đặt tên khác, ví dụ: doiTuongThis.
    */


}



// Mọi nhân vật tham gia( gây ấn Lôi hoặc Thủy) đều sẽ được tính Dame phản ứng Nguyệt Điện Cảm Phản 
// ứng Cá nhân 
function tinhToanDameNguyetDienCamPUCN(LevelPUCoBan, Tong_HeSoTangNguyet, TT_TangBonusNguyet, csBonusNguyet, csTyLeBao, csSatThuongBao, doiTuongThis, loaiDame) {

    // Tính toán giá trị sát thương Nguyệt Điện Cảm Phản ứng Cá nhân dựa vào các tham số đã truyền vào.
    let TT_DameNguyetDienCamPUCN = 1.8 * LevelPUCoBan * ( 1 + Tong_HeSoTangNguyet) * ( 1 + TT_TangBonusNguyet + csBonusNguyet) * ( 1 + csTyLeBao * csSatThuongBao);    

   
    // Hiển thị kết quả tính toán trong phần tử có class 'NguyetDienCamPUCN' dựa vào doiTuongThis.
    $(doiTuongThis).closest('.khungNV').find('.NguyetDienCamPUCN').html(TT_DameNguyetDienCamPUCN.toFixed(10) + loaiDame);

    // Gọi để tính toán Dmae Nguyệt Điện-Cảm Phản ứng toàn team chốt
    tinhToanNguyetDienCamPUToanTeam();
}



// Chỉ những nhân vật có thiên phú riêng mới tính là Dame Nguyệt Điện Cảm Trực tiếp.
function tinhToanDameNguyetDienCamTT(Tong_HeSoTangNguyet, TT_TangBonusNguyet, csBonusNguyet, csTyLeBao, csSatThuongBao, csATK, heSoDame, doiTuongThis, loaiDame) {

    // Tính toán giá trị sát thương Nguyệt Điện Cảm Trực tiếp dựa vào các tham số đã truyền vào.
    let TT_DameNguyetDienCamTT = 3 * csATK * heSoDame * ( 1 + Tong_HeSoTangNguyet) * ( 1 + TT_TangBonusNguyet + csBonusNguyet) * ( 1 + csTyLeBao * csSatThuongBao);    

    // Hiển thị kết quả tính toán trong phần tử có class 'NguyetDienCamPUCN' dựa vào doiTuongThis.
    $(doiTuongThis).closest('.khungNV').find('.NguyetDienCamTT').html(TT_DameNguyetDienCamTT.toFixed(10) + loaiDame);;
}



function tinhToanNguyetDienCamPUToanTeam() {
    const khung = document.querySelector(".khungAllNV");

    // Lấy 4 phần tử tính dame theo thứ tự
    const els = khung.querySelectorAll(".khungNV");

    // Gán tên cố định
    const tenNVs = ["Ineffa", "Flins", "Char3", "Char4"];

    const danhSach = [];

    els.forEach((khungNV, i) => {
        const el = khungNV.querySelector(".NguyetDienCamPUCN");
        const val = parseFloat(el.textContent.trim());

        // Lấy radio đang chọn
        const luaChonBao = khungNV.querySelector('input[type="radio"]:checked')?.value;

        // Xác định loại dame tương ứng
        let loaiDame = '';
        if (luaChonBao === 'benPhai') {
            loaiDame = '🟢[Chí]';
        } else if (luaChonBao === 'benTrai') {
            loaiDame = '🔴[Hụt]';
        } else {
            loaiDame = '🟡[AVG]';
        }

        // Thêm vào danh sách
        danhSach.push({
            ten: tenNVs[i],
            diem: val,
            loaiDame: loaiDame
        });
    });

    // Sắp xếp giảm dần theo điểm
    danhSach.sort((a, b) => b.diem - a.diem);


    // Gán vào các h5 theo thứ hạng
    // Bước 1: Lấy các thẻ h5 đại diện cho hạng 1 đến hạng 4
    const hang1 = document.querySelector(".hang1NguyetDienCamPUCN");
    const hang2 = document.querySelector(".hang2NguyetDienCamPUCN");
    const hang3 = document.querySelector(".hang3NguyetDienCamPUCN");
    const hang4 = document.querySelector(".hang4NguyetDienCamPUCN");

    // Bước 2: Gán nội dung xếp hạng vào thẻ phù hợp.
    hang1.innerHTML = `Hạng 1: ${danhSach[0].diem} (${danhSach[0].ten}) ${danhSach[0].loaiDame}`;
    hang2.innerHTML = `Hạng 2: ${danhSach[1].diem} (${danhSach[1].ten}) ${danhSach[1].loaiDame}`;
    hang3.innerHTML = `Hạng 3: ${danhSach[2].diem} (${danhSach[2].ten}) ${danhSach[2].loaiDame}`;
    hang4.innerHTML = `Hạng 4: ${danhSach[3].diem} (${danhSach[3].ten}) ${danhSach[3].loaiDame}`;


    // Tính tổng điểm theo công thức đề ra
    const tongDiem = danhSach[0].diem
                  + (1/2) * danhSach[1].diem
                  + (1/12) * danhSach[2].diem
                  + (1/12) * danhSach[3].diem;

    // Gán vào tất cả thẻ có class NguyetDienCamPUChot
    const ketQuaEls = document.querySelectorAll(".NguyetDienCamPUChot");
    ketQuaEls.forEach(el => {
        el.textContent = `${tongDiem.toFixed(2)}`;
    });

    tongKetNguyetDienCam();
    /* Mục đích của ta luôn là thực hiện 'tongKetNguyetDienCam' sau khi đã chốt xong tất cả giá trị
    cần thiết. Và trừ phần Res thì ta cần lấy 3 giá trị:
        -Dame Nguyệt Điện-Cảm Phản ứng toàn team( tức class NguyetDienCamPUChot), có được 
        sau khi thực hiện hàm 'tinhToanNguyetDienCamPUToanTeam'
        -Dame Nguyệt Điện-Cảm Trực tiếp của Ineffa( tức id NguyetDienCamIneffa) và của Flins
        ( NguyetDienCamFlins), cả 2 đều có được sau khi thực hiện hàm 'tinhToanDameNguyetDienCamTT'
    Vì thế ta cần thứ tự thực hiện từ hàm 'layGtriVaChuanBiTinhDameNV' phải là như sau:
        layGtriVaChuanBiTinhDameNV() => tinhToanDameNguyetDienCamTT() =>
        tinhToanDameNguyetDienCamPUCN() => tinhToanNguyetDienCamPUToanTeam()
        => tongKetNguyetDienCam()
    ==>>Thế nên ta chỉ cần gọi hàm 'tongKetNguyetDienCam()' trong sau khi hoàn thành
    'tinhToanNguyetDienCamPUToanTeam()' là được. Không cần đặt ở bất cứ hàm nào khác
    ( trừ Phần lệnh thay đổi res là thực hiện hàm 'tongKetNguyetDienCam()') để tránh lặp lại 
    hàm 'tongKetNguyetDienCam()' khi không cần thiết hoặc đã được tính rồi.

    @@Lý do "Ta không thể chỉ đặt gọi hàm tongKetNguyetDienCam() trong hàm 
    tinhToanDameNguyetDienCamTT() được???"
    =>Là bởi hàm tinhToanDameNguyetDienCamTT() thì khi ta thay đổi chỉ số của 1 trong
    2 nhân vật Ineffa hoặc Flins nó mới được thực hiện thôi. 
    Nếu ta chỉ đặt hàm 'tongKetNguyetDienCam()' ở đây thì khi ta thay đổi chỉ số nv khác
    ngoài 2 nv trên nó cũng không thực hiện hàm 'tongKetNguyetDienCam()'
    ==>>Đó cũng là lí do tại sao bắt buộc ta phải đặt thực hàm 'tinhToanDameNguyetDienCamTT()'
    trước hàm 'tinhToanDameNguyetDienCamPUCN()' ở trong hàm 'layGtriVaChuanBiTinhDameNV()'.
    Cụ thể là phần mã:
        if ($(this).closest('.khungNV').find('#Ineffa, #Flins').length > 0) {
            let csATK = parseFloat($(this).closest('.khungNV').find('.chiSoATK').val());

            if ($(this).closest('.khungNV').find('#Ineffa').length > 0) {
                const heSoDame = 0.65; // Hệ số sát thương Nguyệt từ Thiên phú của Ineffa

                // Gọi hàm tính toán Sát thương Nguyệt điện cảm trực tiếp của Ineffa
                tinhToanDameNguyetDienCamTT(Tong_HeSoTangNguyet, TT_TangBonusNguyet, csBonusNguyet, csTyLeBao, csSatThuongBao, csATK, heSoDame, this);
            } else {
                const heSoDame = 2.33856; // Hệ số sát thương Nguyệt từ Thiên phú của Flins
                // Gọi hàm tính toán Sát thương Nguyệt điện cảm trực tiếp của Ineffa
                tinhToanDameNguyetDienCamTT(Tong_HeSoTangNguyet, TT_TangBonusNguyet, csBonusNguyet, csTyLeBao, csSatThuongBao, csATK, heSoDame, this);
            }
        }

        // Gọi hàm tính toán sát thương Nguyệt Điện Cảm Phản ứng Cá nhân
        tinhToanDameNguyetDienCamPUCN(LevelPUCoBan, Tong_HeSoTangNguyet, TT_TangBonusNguyet, csBonusNguyet, csTyLeBao, csSatThuongBao, this);
    
    */
}




function tongKetNguyetDienCam() {
    // 1. Lấy các giá trị float
    const PUChot = parseFloat(document.querySelector("#XepHangNguyetDienCamPUCN .NguyetDienCamPUChot")?.textContent) || 0;
    const Ineffa = parseFloat(document.querySelector("#NguyetDienCamIneffa")?.textContent) || 0;
    const Flins = parseFloat(document.querySelector("#NguyetDienCamFlins")?.textContent) || 0;

    // 2. Lấy chỉ số kháng và giảm kháng
    const chiSoKhang = parseFloat(document.querySelector(".chiSoKhangQuai")?.value) || 0;
    const giamKhang = parseFloat(document.querySelector(".giamKhangQuai")?.value) || 0;


    // 3. Tính gTriKhangQuaiChot
    let gTriKhangQuaiChot = chiSoKhang - giamKhang;
    if (gTriKhangQuaiChot < 0) {
        gTriKhangQuaiChot /= 2; // giảm một nửa nếu âm
    }

    // 4. Tính kết quả cuối
    const heSoKhang = 1 - gTriKhangQuaiChot;

    const ketQuaPUChot = PUChot * heSoKhang;
    const ketQuaIneffa = Ineffa * heSoKhang;
    const ketQuaFlins = Flins * heSoKhang;

    // Gán kết quả vào thẻ tương ứng
    document.querySelector(".tongKetNguyetDienCamAll").textContent = ketQuaPUChot.toFixed(2);
    document.querySelector(".tongKetNguyetIneffa").textContent = ketQuaIneffa.toFixed(2);
    document.querySelector(".tongKetNguyetFlins").textContent = ketQuaFlins.toFixed(2);
}


