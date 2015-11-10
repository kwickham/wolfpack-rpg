function setCharacterInfo(char) {
    console.log('change info');
    if (char.class) {
        var classTest = char.class.toLowerCase();
        if (classes[classTest]) {
            var c = classes[classTest];
            var html = 'Mission Success: ' + c.success + '%<br>' + 'Wolfcoin Bonus: ' + c.wolfcoinBonus + '%<br>' + 'Item Find: ' + c.itemFind + '%<br>' + 'XP Bonux: ' + c.xpBonus + '%<br>';
            if (c.bonus[1]) {
                html = html + 'Bonus: ' + c.bonus[1];
            }
            $('#form-class').popover('destroy')
            $('#form-class').popover({
                content: html,
                title: c.name,
                html: true
            });
        }
    }
}

function localSave() {
    var char = characterInfo();
    localStorage.setItem('WRPG_Class', char.class);
    localStorage.setItem('WRPG_Coins', char.coins);
    localStorage.setItem('WRPG_Level', char.level);
    localStorage.setItem('WRPG_XP', char.xp);
    setCharacterInfo(char);
}

function localSet() {
    var char = {
        class: localStorage.getItem('WRPG_Class'),
        coins: localStorage.getItem('WRPG_Coins'),
        level: localStorage.getItem('WRPG_Level'),
        xp: localStorage.getItem('WRPG_XP')
    };
    var chat = localStorage.getItem('WRPG_SavedChat');

    $("#class").val(char.class);
    $("#level").val(char.level);
    $("#xp").val(char.xp);
    $("#coins").val(char.coins);
    $("input[id=quiet_chat]").val(chat);
    setCharacterInfo(char);

}
localSet();

var $body = $("body");

String.prototype.capitalizeFirstLetter = function() {
    return this.charAt(0).toUpperCase() + this.slice(1);
}

function warning(info) {
    var html = '<div class="alert alert-warning alert-dismissible" role="alert"><button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button><strong>Warning!</strong> ' + info + '</div>'
    $("#error").append(html);
}

function characterInfo() {
    var character = {
        class: $("#class").val(),
        level: Number($("#level").val()),
        xp: Number($("#xp").val()),
        coins: Number($("#coins").val()),
    }
    return character;
}

function dungeonInfo(id) {
    var panel = $("#dungeonInfo");
    if (!dungeons[id]) {
        panel.addClass("hidden");
        return false;
    }
    var char = characterInfo();
    var d = dungeons[id];

    if (char.level < d.range[0]) {
        warning('You will have a reduced chance to complete this ' + d.type);
    }
    if (char.coins < d.cost) {
        warning('You do not have enough coins to start this ' + d.type);
    }
    panel.removeClass("hidden");
    panel.find(".panel-heading").text(d.type.capitalizeFirstLetter() + ': ' + d.name);
    panel.find(".panel-body").text('Level Range [' + d.range[0] + '-' + d.range[1] + '], Cost:' + d.cost);

    return d;
}

function copyToClipboard(text) {
    $("input[id=command_box]").val(text);
    $("input[id=command_box]").focus().select();
}

$body.on("click", ".command", function() {
    var command = $(this).attr('data-id');
    var query = '/w lobotjr ' + command;

    if ($(this).parent('span').hasClass('input-group-btn')) {
        var value = $(this).parent('span').parent('div').find('input').val();
        query = query + ' ' + value;
    }

    copyToClipboard(query);
});

$body.on("keyup", ".dungeonID", function() {
    $('.dungeonID').val($(this).val());
    dungeonInfo($(this).val());
});
$body.on("keyup", ".itemInput", function() {
    $('.itemInput').val($(this).val());
});
$("body").on('change', '.classInput', function() {
    localSave();
});
$("body").on('click', 'button[id=quiet_chat]', function() {
    var username = $("input[id=quiet_chat]").val();
    if (username != '') {
        localStorage.setItem('WRPG_SavedChat', username);
        $("iframe[id=chat_embed]").attr("src", "//www.twitch.tv/" + username + "/chat");
    }
});
$("body").on('click', 'button[id=lobos_chat]', function() {
    $("iframe[id=lobosjr_embed]").attr("src", "//www.twitch.tv/lobosjr/chat");
});
$("input[id=command_box]").bind('copy', function(test) {
    console.log(test);
});
$(".send-chat-button").on('click', function(test) {
    console.log('yep');
});
$("#helpToggle").on('click', function() {
    if ( ! $(this).hasClass('toggleOn') ) {
        $(this).addClass('btn-warning');
        $(this).addClass('toggleOn');
        $('[data-toggle="tooltip"]').tooltip();
    } else {
        $(this).removeClass('toggleOn');
        $(this).removeClass('btn-warning');
        $('[data-toggle="tooltip"]').tooltip('destroy');
    }
});