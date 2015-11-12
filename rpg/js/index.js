/**
 * Function File
 * Sets functions and builds functionality
 */
//****** Functions *******//
/**
 * add capitalize function to String object
 */
String.prototype.capitalizeFirstLetter = function() {
    return this.charAt(0).toUpperCase() + this.slice(1);
};
/**
 * Sets popover information with information about the class
 */
function setCharacterInfo(char) {
    console.log('change info');
    if (char.charClass) {
        var classTest = char.charClass.toLowerCase();
        if (classes[classTest]) {
            var c = classes[classTest];
            var html = 'Mission Success: ' + c.success + '%<br>' + 'Wolfcoin Bonus: ' + c.wolfcoinBonus + '%<br>' + 'Item Find: ' + c.itemFind + '%<br>' + 'XP Bonux: ' + c.xpBonus + '%<br>';
            if (c.bonus[1]) {
                html = html + 'Bonus: ' + c.bonus[1];
            }
            $('#form-class').popover('destroy');
            $('#form-class').popover({
                content: html,
                title: c.name,
                html: true
            });
        }
    }
}
/**
 * Saves charcter inforamation to the local browser data
 */
function localSave() {
    var char = characterInfo();
    localStorage.setItem('WRPG_Class', char.charClass);
    localStorage.setItem('WRPG_Coins', char.coins);
    localStorage.setItem('WRPG_Level', char.level);
    localStorage.setItem('WRPG_XP', char.xp);
    setCharacterInfo(char);
}
/**
 * Maps saved data to inputs
 */
function localSet() {
    var char = {
        charClass: localStorage.getItem('WRPG_Class'),
        coins: localStorage.getItem('WRPG_Coins'),
        level: localStorage.getItem('WRPG_Level'),
        xp: localStorage.getItem('WRPG_XP')
    };
    var chat = localStorage.getItem('WRPG_SavedChat');

    $("#class").val(char.charClass);
    $("#level").val(char.level);
    $("#xp").val(char.xp);
    $("#coins").val(char.coins);
    $("input[id=quiet_chat]").val(chat);
    setCharacterInfo(char);
    //$("#" +char.charClass.toLowerCase() + "_checkbox").prop( "checked", true );;
    //$("#" +char.charClass.toLowerCase() + "_checkbox").click();
    $(".class_button[data-id=" + char.charClass.toLowerCase() + "]").click();
}
/**
 * Throws a warning
 * @param string info warning text
 */
function warning(info) {
    var html = '<div class="alert alert-warning alert-dismissible" role="alert"><button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button><strong>Warning!</strong> ' + info + '</div>';
    $("#error").append(html);
}
/**
 * Builds character as set on the page
 */
function characterInfo() {
    var character = {
        charClass: $("#class").val(),
        level: Number($("#level").val()),
        xp: Number($("#xp").val()),
        coins: Number($("#coins").val()),
    };
    return character;
}
/**
 * Sets the dungeon information if found
 * @var object dungeons defined in vars.js file
 */
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
/**
 * Adds text to our copy/paste area
 */
function copyToClipboard(text) {
    $("input[id=command_box]").val(text);
    $("input[id=command_box]").focus().select();
}

function classStatCombiner(classList) {
    var totals = {
        success: 0,
        coin: 0,
        find: 0,
        xp: 0,
        extra: ''
    };
    classList.forEach(function(charClass) {
        if (classes[charClass]) {
            totals.success = totals.success + classes[charClass].success;
            totals.coin = totals.coin + classes[charClass].wolfcoinBonus;
            totals.find = totals.find + classes[charClass].itemFind;
            totals.xp = totals.xp + classes[charClass].xpBonus;
            Object.keys(classes[charClass].bonus).forEach(function(key) {
                totals.extra = totals.extra + classes[charClass].bonus[key];
            });
        }
    });
    return totals;
}

function classHelerTable(vars) {
    stats = classStatCombiner(vars);
    $(".output_success").find("#output_value").text(stats.success);
    $(".output_coin").find("#output_value").text(stats.coin);
    $(".output_find").find("#output_value").text(stats.find);
    $(".output_xp").find("#output_value").text(stats.xp);
    $(".output_bonus").find("#output_value").text(stats.extra);
}

//****** Actions *******//


var $body = $("body");

/**
 * On Click
 */
$body.on("click", ".command", function() {
    var command = $(this).attr('data-id');
    var query = '/w lobotjr ' + command;

    if ($(this).parent('span').hasClass('input-group-btn')) {
        var value = $(this).parent('span').parent('div').find('input').val();
        query = query + ' ' + value;
    }
    copyToClipboard(query);
});
$body.on('click', 'button[id=quiet_chat]', function() {
    var username = $("input[id=quiet_chat]").val();
    if (username != '') {
        localStorage.setItem('WRPG_SavedChat', username);
        $("iframe[id=chat_embed]").removeClass('hidden');
        $("iframe[id=chat_embed]").attr("src", "//www.twitch.tv/" + username + "/chat");
    }
});
$body.on('click', 'button[id=lobos_chat]', function() {
    $("iframe[id=lobosjr_embed]").removeClass('hidden');
    $("iframe[id=lobosjr_embed]").attr("src", "//www.twitch.tv/lobosjr/chat");
});
$body.on('click', 'button[id=lobos_stream]', function() {
    $("#embedly_container").attr('style', 'position:relative;padding-bottom:75.0000%;height:0;overflow:hidden;');
    $("iframe[id=lobosjr_stream_embed]").removeClass('hidden');
    $("iframe[id=lobosjr_stream_embed]").attr('style', 'position:absolute;top:0;left:0;width:100%;height:100%;');
    $("iframe[id=lobosjr_stream_embed]").attr("src", "//cdn.embedly.com/widgets/media.html?src=%2F%2Fwww-cdn.jtvnw.net%2Fswflibs%2FTwitchPlayer.swff%3Fchannel%3Dlobosjrs&fv=hostname%3Dwww.twitch.tv%26start_volume%3D25%26channel%3Dlobosjr%26auto_play%3Dfalse&url=http%3A%2F%2Fwww.twitch.tv%2Flobosjr&image=http%3A%2F%2Fstatic-cdn.jtvnw.net%2Fjtv_user_pictures%2Flobosjr-profile_image-9c42176c5e6eb5db-600x600.jpeg&key=43cfe8de63744b7185b534b0ef9fe4f5&type=application%2Fx-shockwave-flash&schema=twitch");
});
$body.on('click', '.class_table', function() {
    var classes = [];
    $(".class_table:checked").each(function() {
        classes.push($(this).attr('id').split('_')[0]);
    });
    classHelerTable(classes);
});
$body.on('click', '.class_button', function() {
    if (!$(this).hasClass('active')) {
        $(this).addClass('btn-info');
        $(this).addClass('active');
    }
    else {
        $(this).removeClass('active');
        $(this).removeClass('btn-info');

    }
    $("#" + $(this).attr('data-id') + "_checkbox").click();
});
$body.on('click', "#helpToggle", function() {
    if (!$(this).hasClass('toggleOn')) {
        $(this).addClass('btn-warning');
        $(this).addClass('toggleOn');
        $('[data-toggle="tooltip"]').tooltip();
    }
    else {
        $(this).removeClass('toggleOn');
        $(this).removeClass('btn-warning');
        $('[data-toggle="tooltip"]').tooltip('destroy');
    }
});
/**
 * On Keyup
 */
$body.on("keyup", ".dungeonID", function() {
    $('.dungeonID').val($(this).val());
    dungeonInfo($(this).val());
});
$body.on("keyup", ".itemInput", function() {
    $('.itemInput').val($(this).val());
});
/**
 * On Change
 */
$body.on('change', '.classInput', function() {
    localSave();
});
/**
 * On Copy
 */
$("input[id=command_box]").bind('copy', function(test) {
    console.log(test);
});


//* Map local info
localSet();