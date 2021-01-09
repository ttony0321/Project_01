$(document).ready(function () {
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
        }
        content.val("");
        $(this).hide();
        addCardLabel.show();
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
    });
    $(document).on('click', '.addList-btn', function (e) {
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
                                                    <div class="List-input-controls">
                                                        <input class="addList-btn" type="submit" value="Add List">
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
        listBoxTitle.val("");
        addListForm.hide();
        addListLabel.show();
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
                $('.list-card').css('background-color', '#fff')
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