$(document).ready(function () {
    $(".list-form-wrapper").html();
    showList()
    showCard()
    var Title = $(".title-wrapper");
    var TitleEdit = $("#titleEdit");
    // addListForm = $(".addList");
    // addListLabel = $(".addLabel");
    Title.click(function (e) {
        e.preventDefault();
        TitleEdit.val(Title.html());
        Title.hide();
        TitleEdit.show();
        TitleEdit.children("#projectTitle").focus()
    });
    TitleEdit.submit(function (e) {
        e.preventDefault();
        let EditedTitle = $("#projectTitle").val();
        if (EditedTitle == "") {
            EditedTitle = "New Project";
        }
        Title.html(EditedTitle);
        TitleEdit.hide();
        Title.show();
    });

//리스트박스 카드 추가
    $(document).on('click', ".add-card-btn", function (e) {
        e.preventDefault();
        $(this).hide();
        $(this).parent().children(".add-card-form").show();
        $(this).parent().children(".add-card-form").children("textarea").focus();
    });
    $(document).on("submit", ".add-card-form", function (e) {
        e.preventDefault();

        let addCardLabel = $(this).parent().children(".add-card-btn");
        let content = $(this).find('.list-card-textarea');
        if (content.val().length > 0) {
            addCardLabel.hide()

            $(this).parent().children('.card-wrap').append(`<div class="list-box-card">
                                            <a class="list-card">
                                                <div class="list-card-details">
                                                    <span class="list-card-title">
                                                        ${content.val()}
                                                    </span>
                                                </div>
                                            </a>
                                        </div>`)
            //이건 작동함
            card_title = content.val()
        }

        content.val("");
        $('.card-wrap').each(function (i){
            $(this).attr('id', 'card-num'+ (i + 1))
        })
        $(this).parents('.card-wrap').attr('id')
        card_id = $(this).parent().children('.card-wrap').attr('id')

        $(this).hide();
        addCardLabel.show();
        //카드 ajax Post
        $.ajax({
            type: "POST",
            url: "/card",
            data: {card_title: card_title, card_id: card_id},
            success: function (response) {
                if (response['result'] == 'success') {
                }
        }
})


    $(function () {
        $('.card-wrap').sortable({
            connectWith: ".card-wrap",
            over: function (event, ui) {
                $('.list-card').css('background-color', 'rgba(0,0,0,.1)')
            },
            out: function (event, ui) {
                $('.list-card').css('background-color', '#fff')
            },
            receive: function (event, ui) {
                $('.list-card').css('background-color', '#fff')
            },
            revert: 100,
            start: function (event, ui) {
                // console.log(ui.item[0].firstChild.id)
                // var elementId = (ui.item[0].firstChild.id)
                // $('#' + elementId).css('transform', 'rotate(15deg)');
            },
            stop: function (event, ui) {
                // var elementId = (ui.item[0].firstChild.id)
                // $('#' + elementId).css('transform', 'rotate(0deg)');
            },
        })
    })

})
    $(document).on('click', '.addcard-btn', function (e) {
        e.preventDefault();
        $(this).parents('.add-card-bottom').submit();

    })
    $(document).on('click', '.close-icons', function (e) {
        e.preventDefault();
        $(this).parents(".add-card-bottom").parent().children(".list-card-textspace").find(".list-card-textarea").val("");
        $(this).parents(".add-card-form").hide()
        $(this).parents(".add-card-form").parent().children(".add-card-btn").show()
    });
    let addListForm = $("#addList");
    let addListLabel = $("#addLabel");
    let FormWrapper = $('.list-form-wrapper');

    addListLabel.click(function (e) {
        e.preventDefault();
        addListLabel.hide();
        addListForm.show();
        addListForm.children('.list-input').focus();
    });

    addListForm.submit(function (e) {
        e.preventDefault();
        console.log('submit')
        let listBoxTitle = $('.list-input');
        if (listBoxTitle.val().length > 0) {
            $('.list-form-wrapper').before(
                `<div class="list-box-wrapper">
                                <div class="list-box">
                                    <div class="list-header">
                                        <div class="list-header-edit">
                                        </div>
                                        <h2 class="list-header-name" dir="auto">
                                            header name
                                        </h2>
                                        <textarea class="list-header-textarea" aria-label="header name"
                                                  spellcheck="false" dir="auto" maxlength="512">${listBoxTitle.val()}
                                            </textarea>
                                    </div>
                                    <div class="card-wrap">
                                    
                                        </div>
                                    <div class="add-card-btn">
                                        <a class="add-card-control">
                                                <span class="material-icons" id=list-add>
                                                    add
                                                </span>
                                            <span class="add-a-card">
                                                    Add another card
                                                </span>
                                        </a>
                                    </div>
                                    <div class="add-card-form hide">
                                        <div class="add-card-controls">
                                            <div class="list-card-textspace">
                                                <div class="list-card-text">
                                                    <div class="list-card-labels"></div>
                                                    <textarea class="list-card-textarea" dir="auto"
                                                              placeholder="Enter a title for this card..."></textarea>
                                                    <div class="list-card-members"></div>
                                                </div>
                                            </div>
                                            <div class="add-card-bottom">
                                                <div class="control-section">
                                                    <div class="card-input-controls">
                                                        <input class="addcard-btn" type="submit" value="Add Card">
                                                        <a class="close-icons">
                                                                    <span class="material-icons close-icons">
                                                                        clear
                                                                    </span>
                                                        </a>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>


                                </div>
                            </div>`
            );

        }
        console.log(listBoxTitle.val())
        $('.list-box-wrapper').each(function (i){
            $(this).attr('id', 'num' + (i + 1))
            // $(this).children().children('.card-wrap').attr('id', 'card-num'+ (i + 1))
        })
        listBoxTitle.val("");
        addListForm.hide();
        addListLabel.show();

        //List 추가 ajax
        //let list_title = listBoxTitle.val();

    });
    $(".close-icons").click(function (e) {
        $(".list-input").val("");
        addListForm.hide();
        addListLabel.show();
    });
//리스트 이동
// $('.list-box').sortable({
//     placeholder:"list-placeholder",
//     handle:".list-header",
// });
// //카드 이동
// $('.card-wrap').sortable({
//     connectWith:".card-wrap",
//     placeholder: "card-placeholder"
// });
//Drag and Drop
    $(function () {
        $('.card-wrap').sortable({
            connectWith: ".card-wrap",
            over: function (event, ui) {
                $('.list-card').css('background-color', 'rgba(0,0,0,.1)')
            },
            out: function (event, ui) {
                $('.list-card').css('background-color', 'rgba(0,0,0,.1)')
            },
            receive: function (event, ui) {
                $('.list-card').css('background-color', '#fff')
            },
            revert: 100,
            start: function (event, ui) {
                // var elementId = (ui.item[0].firstChild.id)
                // $('#' + elementId).css('transform', 'rotate(15deg)');
            },
            stop: function (event, ui) {
                // var elementId = (ui.item[0].firstChild.id)
                // $('#' + elementId).css('transform', 'rotate(0deg)');
            },
        })
    })
})

//Making API
function List() {
    let list_title = $('.list-input').val();
    $.ajax({
        type: "POST",
        url: "/list",
        data: {list_title: list_title},
        success: function (response) {
            if (response['result'] == 'success') {
                console.log('list_title POST success')
            }
        },
    })
}
    // function card() {
    // //생성되는 카드위치의 부모 위치 소환
    //     let card_title
    //     let card_id
    //     let i
    //     //let card_title = $('.list-card-textarea').val();
    //     //let card_id = $('.add-card-form').parent().children('.card-wrap').attr('id')
    //     console.log(($(".list-box-wrapper").attr('id')))
    //     console.log($('.list-box-wrapper').length)
    //     //$(".list-box-wrapper").attr('id')
    //     // for (i =1; i<$('.list-box-wrapper').length + 1; i++){
    //     //     console.log(('#card-num'+i))
    //     //     if (($('#card-num'+i).parent().parent()) == $('#num'+i)){
    //     //         card_title = $("#card-num"+i).children('.list-card-textarea').val();
    //     //         card_id = $("#card-num"+i)
    //     //     }
    //     //     else{
    //     //         alert("card function error")
    //     //     }
    //     // }
    //     $.ajax({
    //         type: "POST",
    //         url: "/card",
    //         data: {card_title: card_title, card_id: card_id},
    //         success: function (response) {
    //             if (response['result'] == 'success') {
    //                 console.log(card_title)
    //                 console.log($('.list-card-textarea').val())
    //             }
    //         }
    //     })
    // }

    function showList() {
        $.ajax({
            type: "GET",
            url: "/memo",
            data: {},
            success: function (response) {
                if (response['result'] == 'success') {
                    //let List_show = response['List_show'];
                    for (let i = 0; i < response['list_show'].length; i++) {
                        MakeListCArd(response['list_show'][i]['List_title'])
                    }
                } else {
                    alert('error');
                }
            }
        })
    }

    function showCard() {
        $.ajax({
            type: "GET",
            url: "/memo2",
            data: {},
            success: function (response) {
                if (response['result'] == 'success') {
                    for (let i = 0; i < response['card_show'].length; i++) {
                        MakeCard(response['card_show'][i]['Card_title'], response['card_show'][i]['card_id'])
                        console.log(response['card_show'][i]['card_id'])
                    }
                } else {
                    alert('error');
                }
            }
        })
    }

    function MakeListCArd(list_title) {
        let listWrapper = `<div class="list-box-wrapper">
                                <div class="list-box">
                                    <div class="list-header">
                                        <div class="list-header-edit">
                                        </div>
                                        <h2 class="list-header-name" dir="auto">
                                            header name
                                        </h2>
                                        <textarea class="list-header-textarea" aria-label="header name"
                                                  spellcheck="false" dir="auto" maxlength="512">${list_title}
                                            </textarea>
                                    </div>
                                    <div class="card-wrap">
                                    
                                        </div>
                                    <div class="add-card-btn">
                                        <a class="add-card-control">
                                                <span class="material-icons" id=list-add>
                                                    add
                                                </span>
                                            <span class="add-a-card">
                                                    Add another card
                                                </span>
                                        </a>
                                    </div>
                                    <div class="add-card-form hide">
                                        <div class="add-card-controls">
                                            <div class="list-card-textspace">
                                                <div class="list-card-text">
                                                    <div class="list-card-labels"></div>
                                                    <textarea class="list-card-textarea" dir="auto"
                                                              placeholder="Enter a title for this card..."></textarea>
                                                    <div class="list-card-members"></div>
                                                </div>
                                            </div>
                                            <div class="add-card-bottom">
                                                <div class="control-section">
                                                    <div class="card-input-controls">
                                                        <input class="addcard-btn" type="submit" value="Add Card">
                                                        <a class="close-icons">
                                                                    <span class="material-icons close-icons">
                                                                        clear
                                                                    </span>
                                                        </a>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>


                                </div>
                            </div>`;
        console.log($('.list-card-textarea').val())
        $('.list-form-wrapper').before(listWrapper);
        $('.list-box-wrapper').each(function (i) {
            $(this).attr('id', 'num' + (i + 1))
        })
        //$('.List-form-wrap').prepend(listWrapper);
    }

    function MakeCard(card_title, card_id) {
    console.log("테스트"+ card_id)
    console.log($('.list-box').children("#"+card_id))
        let card_wrapper = `<div class="list-box-card">
                                            <a class="list-card">
                                                <div class="list-card-details">
                                                    <span class="list-card-title">
                                                        ${card_title}
                                                    </span>
                                                </div>
                                            </a>
                                        </div>`

        $('.card-wrap').each(function (i) {
            $(this).attr('id', 'card-num' + (i + 1))
        })
        $('.list-box').children("#"+card_id).append(card_wrapper)
    }

