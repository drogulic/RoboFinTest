'use strict';
var chat = (function () {

    var $input = $('#input');
    var $send = $('#send');
    var $content = $('#content');
    var $inner = $('#inner');

    var messageList = [];

    return {
        init: init,
        sendMessage: sendMessage,
        recieveMessage: recieveMessage
    };

    function init() {
        $input.focus();
        /*$send.on('click', function (e) {
            sendMessage();
        });
        $input.on('keydown', function (e) {
            var key = e.which || e.keyCode;
            if (key === 13) {
                e.preventDefault();
                sendMessage();
            }
        });*/
    }

    function sendMessage(message) {
        var message = {
            user: this.me,
            text: message,
            time: new Date().getTime()
        };
        messageList.push(message);
        var id = new Date().getUTCMilliseconds();
        $content.append(buildHtml(message.text, 'me', id));
        safeTextSend(message.text, id);
        animateText(id);
    }

    function recieveMessage(message) {
        var message = {
            user: this.them,
            text: message,
            time: new Date().getTime()
        };
        messageList.push(message);
        var id = new Date().getUTCMilliseconds();
        $content.append(buildHtml(message.text, 'them', id));
        showDots(id);
        safeTextRecieve(message.text, id);
        animateText(id);
    }

    function showDots(id){
        $content.find('#chat' + id).last().find('.text-wrapper').html('<img src="../images/typing.gif">');
    }

    function safeTextSend(text, id) {
        $content.find('#chat' + id).last().find('.text-wrapper').text(text);
    }

    function safeTextRecieve(text, id) {
        setTimeout(function(){
            $content.find('#chat' + id).last().find('.text-wrapper').text(text);
            //scrollBottom();
        },2000);
    }

    function animateText(id) {
        setTimeout(function () {
            $content.find('#chat' + id).last().find('.text-wrapper').addClass('animated fadeIn');
        }, 350);
        //scrollBottom();
    }

    function scrollBottom() {
        $($inner).animate({ scrollTop: $($content).offset().top + $($content).outerHeight(true) }, {
            queue: false,
            duration: 'ease'
        });
    }

    function buildHtml(text, who, id) {
        return '<div id="chat' + id + '" class="message-wrapper ' + who + '">\n              <div class="circle-wrapper animated bounceIn"></div>\n              <div class="text-wrapper animated fadeIn"></div>\n            </div>';
    }
} ());
