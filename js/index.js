// Tạo lớp đối tượng nhân viên
function staffOOP(account, name, email, password, datePicker, salary, position, workhours) {
    this.account = account;
    this.name = name;
    this.email = email;
    this.password = password;
    this.datePicker = datePicker;
    this.salary = salary;
    this.position = position;
    this.workhours = workhours;
    this.typeOfStaff = function () {
        if (this.workhours >= 192) {
            return "Xuất Sắc"
        } else if (this.workhours >= 176) {
            return "Giỏi";
        } else if (this.workhours >= 160) {
            return "Khá";
        } else if (this.workhours < 160) {
            return "Trung Bình";
        }
    }
    this.totalSalary = function () {
        if (this.position == "Giám Đốc") {
            return salary * 3;
        } else if (this.position == "Trưởng Phòng") {
            return salary * 2;
        } else if (this.position == "Nhân Viên") {
            return salary;
        }
    };
}

// Lấy giá trị từ thẻ input
var account = document.getElementById("tknv");
var staffName = document.getElementById("name");
var email = document.getElementById("email");
var password = document.getElementById("password");
var datepicker = document.getElementById("datepicker");
var salary = document.getElementById("luongCB");
var position = document.getElementById("chucvu");
var workhours = document.getElementById("gioLam");




// Hàm thêm đối tượng 
var staffList = [];
function createStaff() {
    // Tạo đối tượng
    var staff = new staffOOP(
        account.value,
        staffName.value,
        email.value,
        password.value,
        datepicker.value,
        Number(salary.value),
        position.value,
        workhours.value
    );

    // Validate Test
    // var valid = true;
    // valid = kiemTraRong(account.value, 'tbTKNV', "Tài khoản") 
    // & kiemTraRong(staffName.value, 'tbTen', "Tên")
    // & kiemTraRong(email.value, 'tbEmail', "Email")
    // & kiemTraRong(password.value, 'tbMatKhau', "Mật khẩu")
    // & kiemTraRong(salary.value, 'tbLuongCB', "Lương")
    // & kiemTraRong(workhours.value, 'tbGiolam', "Giờ làm")
    // & kiemTraRong(datepicker.value, "tbNgay", "Ngày làm")
    // & kiemTraChucVu(position.value);
    // if (kiemTraRong(account.value, 'tbTKNV', "Tài khoản")) {
    //     var validTK = kiemTraKySo(account.value);
    //     valid &= validTK;
    // }
    // if(staffList) {
    //     var validTKTrung = kiemTraTaiKhoangTrung(staffList);
    //     valid &= validTKTrung;
    // }
    // if (kiemTraRong(staffName.value, 'tbTen', "Tên")) {
    //    var validTen = kiemTraTen(staffName.value); 
    //    valid &= validTen;
    // }
    // if (kiemTraRong(email.value, 'tbEmail', "Email")) {
    //     var validEmail = kiemTraEmail(email.value);
    //     valid &= validEmail;
    // }
    // if (kiemTraRong(salary.value, 'tbLuongCB', "Lương")) {
    //     var validSalary = kiemTraLuong(salary.value);
    //     valid &= validSalary;
    // }
    // if (kiemTraRong(workhours.value, 'tbGiolam', "Giờ làm")) {
    //     var validWorkHours = kiemTraSoGioLam(workhours.value);
    //     valid &= validWorkHours;
    // }
    // if (kiemTraRong(password.value, 'tbMatKhau', "Mật khẩu")) {
    //     var validPassword = kiemTraPassword(password.value);
    //     valid &= validPassword;
    // }
    // if (kiemTraRong(datepicker.value, "tbNgay", "Ngày làm")) {
    //     var validDate = kiemTraNgayLam(datepicker.value);
    //     valid &= validDate;
    // }
    // if (!valid) {
    //     return;
    // }

    // Thêm đối tượng vào mảng
    staffList.push(staff);
    // Lưu mảng vào localStorage
    setLocalStorage("arrStaff", staffList);
    // In mảng ra table
    renderStaff(staffList);
}

// Hàm in ra đối tượng nhân viên mỗi khi thêm, sửa xóa
function renderStaff(arr) {
    var output = "";
    for (var i = 0; i < arr.length; i++) {
        arr[i].totalSalary = function () {
            if (this.position == "Giám Đốc") {
                return this.salary * 3;
            } else if (this.position == "Trưởng Phòng") {
                return this.salary * 2;
            } else if (this.position == "Nhân Viên") {
                return this.salary;
            }
        };
        arr[i].typeOfStaff = function () {
            if (this.workhours >= 192) {
                return "Xuất Sắc"
            } else if (this.workhours >= 176) {
                return "Giỏi";
            } else if (this.workhours >= 160) {
                return "Khá";
            } else if (this.workhours < 160) {
                return "Trung Bình";
            }
        };
        var str = `
            <tr>
            <th>${arr[i].account}</th>
            <th>${arr[i].name}</th>
            <th>${arr[i].email}</th>
            <th>${arr[i].datePicker}</th>
            <th>${arr[i].position}</th>
            <th>${arr[i].totalSalary(position.value)}</th>
            <th>${arr[i].typeOfStaff(workhours.value)}</th>
            <th>
            <button class="bg-danger text-light" onclick="deleteStaff('${arr[i].account}')">Delete</button>
            <button class="bg-success text-light" data-toggle="modal" data-target="#myModal" onclick="editStaff('${arr[i].account}')">Update</button>
            </th>             
            </tr>
        `   
        output += str;
    }
    document.getElementById("tableDanhSach").innerHTML = output;
    return output;
}



// Hàm xóa nhân viên
function deleteStaff(accountClick) {
    var delAccount = -1;
    for (var i = 0; i < staffList.length; i++) {
        if (staffList[i].account == accountClick) {
            delAccount = i;
            break;
        }
    }
    if (delAccount != -1) {
        staffList.splice(delAccount, 1);
        renderStaff(staffList);
        setLocalStorage("arrStaff", staffList);
    }
}

// Hàm đưa thông tin của đối tượng lên input
function editStaff(accountClick) {
    for (var i = 0; i < staffList.length; i++) {
        if (staffList[i].account == accountClick) {
            account.value = staffList[i].account;
            staffName.value = staffList[i].name;
            email.value = staffList[i].email;
            password.value = staffList[i].password;
            datepicker.value = staffList[i].datePicker;
            salary.value = staffList[i].salary;
            position.value = staffList[i].position;
            workhours.value = staffList[i].workhours;
        }
    }
}

// Hàm chỉnh sửa đối tượng
function updateStaff() {
    var valid = true;
    valid = kiemTraRong(account.value, 'tbTKNV', "Tài khoản") 
    & kiemTraRong(staffName.value, 'tbTen', "Tên")
    & kiemTraRong(email.value, 'tbEmail', "Email")
    & kiemTraRong(password.value, 'tbMatKhau', "Mật khẩu")
    & kiemTraRong(salary.value, 'tbLuongCB', "Lương")
    & kiemTraRong(workhours.value, 'tbGiolam', "Giờ làm")
    & kiemTraRong(datepicker.value, "tbNgay", "Ngày làm")
    & kiemTraChucVu(position.value);
    if (kiemTraRong(account.value, 'tbTKNV', "Tài khoản")) {
        var validTK = kiemTraKySo(account.value);
        valid &= validTK;
    }
    if (kiemTraRong(staffName.value, 'tbTen', "Tên")) {
       var validTen = kiemTraTen(staffName.value); 
       valid &= validTen;
    }
    if (kiemTraRong(email.value, 'tbEmail', "Email")) {
        var validEmail = kiemTraEmail(email.value);
        valid &= validEmail;
    }
    if (kiemTraRong(salary.value, 'tbLuongCB', "Lương")) {
        var validSalary = kiemTraLuong(salary.value);
        valid &= validSalary;
    }
    if (kiemTraRong(workhours.value, 'tbGiolam', "Giờ làm")) {
        var validWorkHours = kiemTraSoGioLam(workhours.value);
        valid &= validWorkHours;
    }
    if (kiemTraRong(password.value, 'tbMatKhau', "Mật khẩu")) {
        var validPassword = kiemTraPassword(password.value);
        valid &= validPassword;
    }
    if (kiemTraRong(datepicker.value, "tbNgay", "Ngày làm")) {
        var validDate = kiemTraNgayLam(datepicker.value);
        valid &= validDate;
    }
    if (!valid) {
        return;
    }

    for (var i = 0; i < staffList.length; i++) {
        if (staffList[i].account == account.value) {
            staffList[i].account = account.value;
            staffList[i].name = staffName.value;
            staffList[i].email = email.value;
            staffList[i].password = password.value;
            staffList[i].datePicker = datepicker.value;
            staffList[i].salary = salary.value;
            staffList[i].position = position.value;
            staffList[i].workhours = workhours.value;
        }
    }
    renderStaff(staffList);
    console.log(staffList);
    setLocalStorage("arrStaff", staffList);
}

// Hàm Tìm Nhân Viên
function searchStaff() {
    var secondStaffList = [];
    var btnTimNV = document.getElementById("searchName");
    var btnTimNVHasNoTones = removeVietnameseTones(btnTimNV.value);
    for (var i = 0; i < staffList.length; i++) {
        if (removeVietnameseTones(staffList[i].typeOfStaff()).search(btnTimNVHasNoTones) != -1) {
            secondStaffList.push(staffList[i]);
        }
        console.log(typeof staffList[i].typeOfStaff());
    }
    renderStaff(secondStaffList);
}

// Hàm loại bỏ dấu
function removeVietnameseTones(str) {
    str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g,"a"); 
    str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g,"e"); 
    str = str.replace(/ì|í|ị|ỉ|ĩ/g,"i"); 
    str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g,"o"); 
    str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g,"u"); 
    str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g,"y"); 
    str = str.replace(/đ/g,"d");
    str = str.replace(/À|Á|Ạ|Ả|Ã|Â|Ầ|Ấ|Ậ|Ẩ|Ẫ|Ă|Ằ|Ắ|Ặ|Ẳ|Ẵ/g, "A");
    str = str.replace(/È|É|Ẹ|Ẻ|Ẽ|Ê|Ề|Ế|Ệ|Ể|Ễ/g, "E");
    str = str.replace(/Ì|Í|Ị|Ỉ|Ĩ/g, "I");
    str = str.replace(/Ò|Ó|Ọ|Ỏ|Õ|Ô|Ồ|Ố|Ộ|Ổ|Ỗ|Ơ|Ờ|Ớ|Ợ|Ở|Ỡ/g, "O");
    str = str.replace(/Ù|Ú|Ụ|Ủ|Ũ|Ư|Ừ|Ứ|Ự|Ử|Ữ/g, "U");
    str = str.replace(/Ỳ|Ý|Ỵ|Ỷ|Ỹ/g, "Y");
    str = str.replace(/Đ/g, "D");
    // Some system encode vietnamese combining accent as individual utf-8 characters
    // Một vài bộ encode coi các dấu mũ, dấu chữ như một kí tự riêng biệt nên thêm hai dòng này
    str = str.replace(/\u0300|\u0301|\u0303|\u0309|\u0323/g, ""); // ̀ ́ ̃ ̉ ̣  huyền, sắc, ngã, hỏi, nặng
    str = str.replace(/\u02C6|\u0306|\u031B/g, ""); // ˆ ̆ ̛  Â, Ê, Ă, Ơ, Ư
    // Remove extra spaces
    // Bỏ các khoảng trắng liền nhau
    str = str.replace(/ + /g," ");
    str = str.trim();
    // Remove punctuations
    // Bỏ dấu câu, kí tự đặc biệt
    str = str.replace(/!|@|%|\^|\*|\(|\)|\+|\=|\<|\>|\?|\/|,|\.|\:|\;|\'|\"|\&|\#|\[|\]|~|\$|_|`|-|{|}|\||\\/g," ");
    return str;
}

// Tạo localStorage;
function setLocalStorage(key, arr) {
    localStorage.setItem(key, JSON.stringify(arr));
}

// Lấy thông tin từ localStorage
function getLocalStorage(key) {
    if (localStorage.getItem(key)) {
        var ob = JSON.parse(localStorage.getItem(key));
        return ob;
    }
    return undefined;
}

// Khi load hoặc mở trang lên thì sẽ lấy thông tin từ localStorage 
// với điều kiện độ dài mảng đang lớn hơn 0;
staffList = getLocalStorage("arrStaff");
if (staffList) {
    window.onload = function () {
        renderStaff(staffList);
    }
}
