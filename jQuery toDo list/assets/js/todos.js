// check off sepcific todos by clicking

$('ul').on('click', 'li', function () {
    $(this).toggleClass('completed');
});

// click x to delete to do

$('ul').on('click', 'span', function (event) {
    $(this).parent().fadeOut(500, function () {
        $(this).remove();
    });
    event.stopPropagation();
})

$('input[type="text"]').keypress(function (event) {
    if (event.which === 13) {
        let todoText = $(this).val();
        $(this).val('')
        $('ul').append(`<li><span><i class="far fa-trash-alt"></i> </span>${todoText}</li>`)
    }
})

$('.fa-plus').click(function () {
    $('input[type="text"]').fadeToggle()
})