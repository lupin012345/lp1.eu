(function() {
    'use strict'
    
    var _contacts = [
        {
            index: 0,
            title: 'Github',
            img: 'res/svg/clear/github.svg',
            url: 'https://github.com/lp1dev'
        },{
            index: 1,
            title: 'LinkedIn',
            img: 'res/svg/clear/linkedin.svg',
            url: 'https://www.linkedin.com/in/jérémie-amsellem-b9220168/'
        },{
            index: 2,
            title: 'Twitter',
            img: 'res/svg/clear/twitter.svg',
            url: 'https://twitter.com/lp1eu'
        },{
            index: 3,
            title: 'Mail',
            img: 'res/svg/clear/gmail.svg',
            url: 'mailto:mail@lp1.eu'
        }
    ]

    var _links = [
        {
            index: 0,
            title: 'Home'
        },{
            index: 1,
            title: 'Projects'
        },{
            index: 2,
            title: 'Contact'
        },{
            index: 3,
            title: 'Blog',
            url: 'https://medium.com/@lp1'
        },{
            index: 4,
            title: 'Photos'
        }
        /*{
            index: 5,
            title: 'Live Chat'
        }*/
    ]

    var _photos = []

    for (var i = 10; i < 30; i++) {
        _photos.push({
            asBackground: "background-image: url('https://lp1.eu/public/photos_dublin/thumbs/photo" + i + ".jpg')",
            url: 'https://lp1.eu/public/photos_dublin/photo' + i + '.png'
        })
    }
    
    var _projects =  [
        {
            title: 'DPG for Android',
            description: 'DPG is a deterministic password generator that does not store data or keep state. Its output is based purely on user input. It is a safe and privacy-oriented alternative to the password managers storing your data on your local device or on their servers. I have used w8rbt\'s version as a base and made a Kotlin (<3) implementation.',
            img: 'https://raw.githubusercontent.com/lp1dev/dpg-android/master/app/src/main/res/web_hi_res_512.png',
            link: {
                url: 'https://github.com/lp1dev/dpg-android',
                name: 'Github'
            }
        },{
            title: 'Tinted Glass - Webcam usage notifier',
            description: 'After watching the "Shut up and dance" episode of Black Mirror, I felt like it might be useful to have a software to notify you whenever an access is made to your webcam. That is what tinted glass does, it is a GNU/Linux daemon watching the webcam and using notify_send to notify you whenever a process opens it',
            img: 'https://raw.githubusercontent.com/lp1dev/tinted-glass-webcam-notifier/master/demo/anim.gif',
            link: {
                url: 'https://github.com/lp1dev/tinted-glass-webcam-notifier',
                name: 'Github'
            }
        },{
            title: 'Bubble time',
            description: 'A cute ReactJS game made with @cloSpa during the ReactRiot hackaton.The idea came to us with bubblewrap. Bubbles are piling up and you need to pop them fast enough so that they don\'t reach the top of your board. Just like with bubblewrap, some bubbles are more difficult than others to pop, you\'ll need to be tenacious. However, beware of the pink bubbles! You shouldn\'t touch them if you want to survive.',
            img: 'https://s3.amazonaws.com/hackbit/screenshots/reactriot2017/397de4494b97976c68a1c2fff54608b5/1498504479/v800_Capture_du_2017-06-26_23-22-07.png',
            link: {
                url: 'https://gentle-castle-67700.herokuapp.com',
                name: 'Play'
            }
        },{
            title: 'Diorama - Sherlock Holmes',
            description: 'The dioramas project is a set of 3D scenes inspired from the environment of fictional characters I like, the last one is one of the most famous flat in english litterature : 221b Baker Street. This model has been highly inspired from the BBC\'s show Sherlock. Cute Icon by Clement Branger (licence CC Attribution 3.0)',
            img: 'res/svg/sherlock.svg',
            link: {
                url: 'https://sketchfab.com/models/753e92b284464c94ad89206c269d104b',
                name: 'Explore in 3D'
            }
        }
    ]

    function sendMessage(self, message) {
        if (message) {
            if (!self.author) {
                alert('Please fill the e-mail field in')
                return
            }
            self.messages.push({
                message: message,
                origin: {author: self.author}
            })
            liveChat.send(message, self.author)
            self.message = ""
            self.scrollToTheBottom()
        }
    }
    
    var app = new Vue({
        el: '#app',
        data: {
            page: 0,
            avatar: 'https://pbs.twimg.com/profile_images/903346056682930177/IBMI77sh_400x400.jpg',
            baseline: '<article class="pa3 pa5-ns">'+
                '<h1 class="comfortaa">Hiya! I\'m Jeremie</h1><h2 class="raleway">full stack web/mobile developer passionate about music, cinema, photography and among other topics InfoSec.</h2>' +
                '<h2 class="raleway">I\'m fluent in Python/JavaScript/Android, need a  web/mobile app?</h2>' +
                '<p class="measure lh-copy raleway">I am currently working with the lovely <a href="https://bepatient.com">bepatient</a> team on their Ionic iOS and Android mobile apps. I\ love to travel and take pictures of everything I come across, I\'m currently living in Paris, but it\'s prone to change.</p>' +
                '</article>',
            contacts: _contacts,
            links: _links,
            photos: _photos,
            projects: _projects,
            message: "",
            messages: liveChat.getHistory(),
            author: liveChat.getAuthor(),
            answer: "What can I help you with ?",
            sendMessage: function(message) {
                sendMessage(this, message)
            },
            scrollToTheBottom: function() {
                var container = this.$el.querySelector("#chat-messages")
                if (container) {
                    container.scrollTop = container.scrollHeight + 100;
                }
            }
        },
        mounted: function(){
            var self = this;
            liveChat.setOnNewMessage(function(message) {
                self.messages.push(message)
                self.scrollToTheBottom()
            })
            liveChat.requestNotifications()
        }
    })

})()
