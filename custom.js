
function logout() {
    $.ajax({
        type: "POST",
        url: "logout.jsp",
        success: function (result) {
            if (result.indexOf('success') > 0) {
                window.location.href = "registration.jsp";
            }
        }
    });
}

function modify() {
    $.ajax({
        type: "POST",
        url: "modifyInfo_result.jsp",
        data: $("#modifyForm").serialize(),
        success: function (result) {
            if (result.indexOf('passwordError') > 0) { //fail
                alert('Original Password does not match');
                return false;
            } else if (result.indexOf('success') > 0) {
                alert('Success modify.');
                window.location.reload();
            }
            else {
                alert('Modify fail');
                return false;
            }
        }
    });
}

function join_selectFunction() {
    var x = document.getElementById("selectPapers").value; // 숫자값 들어가있음(value)
    document.getElementById("add_div").innerHTML = "";
    if (x != 0) {
        var i = 1;
        while (x > 0) {
            document.getElementById("add_div").innerHTML += '<div class="form-group"><label>Paper ' + i + ' </label><div class="row"><div class="col-lg-5"><input class="form-control" type="text" placeholder=" id* " name="p_id' + i + '" ></div> <div class="col-lg-7"><input type="text" class="form-control" placeholder="paper title*" name="p_title' + i + '"></div></div></div>';
            i++;
            x--;
        }
    }
}


function join() {
    $.ajax({
        type: "POST",
        url: "join_result.jsp",
        data: $("#signupForm").serialize(),
        success: function (result) {
            if (result.indexOf('success') > 0) {
                $('#joinModal').modal('toggle');
                $('#loginModal').modal('toggle');
            } else { //fail
                alert('Already have an account');
                return false;
            }
        }
    });
}

$(document).ready(function () {
    $("#signupForm").validate({
        rules: {
            firstname: {
                required: true
            },
            lastname: {
                required: true
            },
            username: {
                required: true
            },
            password: {
                required: true,
                minlength: 6,
                maxlength: 20
            },
            firstname: {
                required: true
            },
            lastname: {
                required: true
            },
            confirm_password: {
                required: true,
                equalTo: "#password"
            },
            id: {
                required: true,
                email: true
            },
            company: {
                required: true
            },
            job: {
                required: true
            },
            phone: {
                required: true
            }
        },
        messages: {
            password: {
                minlength: "Your password must be at minimum 6 characters long",
                maxlength: "Your password must be at maximum 20 characters long"
            },
            confirm_password: {
                equalTo: "Please enter the same password as above"
            },
            email: "Please enter a valid email address",
            agree: "Please accept our policy",
            topic: "Please select at least 2 topics"
        }
    });
     $("#foreignForm").validate({
        rules: {
            card1: {
                required: true,
                minlength: 4,
                maxlength: 4
            },
            card2: {
                required: true,
                minlength: 4,
                maxlength: 4
            },
            card3: {
                required: true,
                minlength: 4,
                maxlength: 4
            },
            card4: {
                required: true,
                minlength: 4,
                maxlength: 4
            },
            yy: {
                required: true
            },
            mm: {
                required: true
            },
            o_name: {
                required: true
            }
        },
        messages: {
            card1: {
                minlength: "Card number invailed",
                maxlength: "Card number invailed"
            },
            card2: {
                minlength: "Card number invailed",
                maxlength: "Card number invailed"
            },
            card3: {
                minlength: "Card number invailed",
                maxlength: "Card number invailed"
            },
            card4: {
                minlength: "Card number invailed",
                maxlength: "Card number invailed"
            }
        }
    });

    $("#modifyForm").validate({
        rules: {
            firstname: {
                required: true
            },
            lastname: {
                required: true
            },
            username: {
                required: true
            },
            password: {
                required: true,
                minlength: 6,
                maxlength: 20
            },
            new_password: {
                required: true,
                minlength: 6,
                maxlength: 20
            },
            confirm_password: {
                required: true,
                equalTo: "#new_password"
            },
            firstname: {
                required: true
            },
            lastname: {
                required: true
            },
            id: {
                required: true,
                email: true
            },
            company: {
                required: true
            },
            job: {
                required: true
            },
            phone: {
                required: true
            }
        },
        messages: {
            password: {
                minlength: "Your password must be at minimum 6 characters long",
                maxlength: "Your password must be at maximum 20 characters long"
            },
            confirm_password: {
                equalTo: "Please enter the same password as above"
            },
            email: "Please enter a valid email address",
            agree: "Please accept our policy",
            topic: "Please select at least 2 topics"
        }
    });
});

function inputOnlyNumber(obj) {
    if (event.keyCode >= 48 && event.keyCode <= 57) { //숫자키만 입력
        if (obj.attr("name") === 'phone') {
            obj.removeClass('error');
            $('#phone-error').remove();
        }
        return true;
    } else {
        event.returnValue = false;
    }
}

function registChange(select_regist, selectPapers, addDiv) {
    if (select_regist.val() === 'student') {
        selectPapers.val(0);
        addDiv.empty();
        selectPapers.attr('readonly', true);
    } else {
        selectPapers.attr('readonly', false);
    }
}

function login() {
    var id = $('#loginForm input[name="id"]').val();
    var password = $('#loginForm input[name="password"]').val();

    if (id === '') {
        alert('Please enter your ID.');
        $('#loginForm input[name="id"]').focus();
        return false;
    }
    if (password === '') {
        alert('Please enter your password.');
        $('#loginForm input[name="password"]').focus();
        return false;
    }

    $.ajax({
        type: "POST",
        url: "login_result.jsp",
        data: $("#loginForm").serialize(),
        success: function (result) {
            if (result.indexOf('success') > 0) {
                window.location.href = "myPage.jsp";
            } else { //fail
                alert('ID or Password does not match');
                return false;
            }
        }
    });
}

function foreign() {    
    $.ajax({
        type: "POST",
        url: "foreign_result.jsp",
        data: $("#foreignForm").serialize(),
        success: function (result) {
            if (result.indexOf('success') > 0) {
                window.location.href = "myPage.jsp";
            } else { //fail
                alert('Card information has NOT successfully inserted. Try again!!');
                return false;
            }
        }
    });
}

// function modify_selectFunction() {
//     var x = document.getElementById("selectPapers1").value; // 숫자값 들어가있음(value)
//     document.getElementById("add_div1").innerHTML = "";
//     var jp_id = new Array();
//     var jp_title = new Array();
//     jp_id[1] = '<%=p_id1%>';
//     jp_id[2] = '<%=p_id2%>';
//     jp_id[3] = '<%=p_id3%>';
//     jp_id[4] = '<%=p_id4%>';
//     jp_id[5] = '<%=p_id5%>';
//     jp_title[1] = '<%=p_title1%>';
//     jp_title[2] = '<%=p_title2%>';
//     jp_title[3] = '<%=p_title3%>';
//     jp_title[4] = '<%=p_title4%>';
//     jp_title[5] = '<%=p_title5%>';

//     if (x != 0) {
//         var i = 1;
//         while (x > 0) {
//             document.getElementById("add_div1").innerHTML += '<div class="form-group"><label>Paper ' + i + ' </label><div class="row"><div class="col-lg-5"><input class="form-control" type="text" placeholder=" id* " name="p_id' + i + '" value="' + jp_id[i] + '"></div> <div class="col-lg-7"><input type="text" class="form-control" placeholder="paper title*" name="p_title' + i + '" value="' + jp_title[i] + '"></div></div></div>';
//             i++;
//             x--;
//         }
//     }
// }