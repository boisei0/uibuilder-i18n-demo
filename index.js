// @ts-nocheck
/*
  Copyright (c) 2019 Julian Knight (Totally Information)

  Licensed under the Apache License, Version 2.0 (the "License");
  you may not use this file except in compliance with the License.
  You may obtain a copy of the License at

  http://www.apache.org/licenses/LICENSE-2.0

  Unless required by applicable law or agreed to in writing, software
  distributed under the License is distributed on an "AS IS" BASIS,
  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
  See the License for the specific language governing permissions and
  limitations under the License.
*/
'use strict';

// Ready translated messages to use
var messages = {
    'en-GB': {
        msgs: {
            LastMsgReceived: 'Last Message Received',
            LastMsgSent: 'Last Message Sent',
            LastCtrlMsgReceived: 'Last Control Message Received',
            LastCtrlMsgSent: 'Last Control Message Sent',
        },
        ui: {
            lang: {
                language: 'Language',
                english: 'English',
                dutch: 'Dutch'
            },
            intro: {
                text: 'This is a uibuilder example using {vueUrl} as a front-end library. ' + 
                    'See the {uibuilderUrl} README for details on how to use UIbuilder.',
                header: 'UIbuilder + Vue.js + bootstrap-vue + vue-i18n for Node-RED',
            },
            form: {
                header: 'Simple input using Vue',
                textIntro: 'You can very simply create a form using Vue & bootstrap-vue. ' + 
                    'The form sends data back to Node-RED. Look at the {increment} method in {file} ' + 
                    'to see how easy this is.',
                inputPlaceholder: 'Enter some text to send to Node-RED',
                checkbox: 'To tick or not to tick? That is the question',
                increment: 'Increment',
                clickCounter: 'Click counter',
                outroText: 'Click on the button to increment the counter. ' + 
                    'It sends the data dynamically back to Node-RED as well.'
            },
            dynData: {
                header: 'Dynamic data',
                intro: [
                    'Uses Vue to dynamically update in response to messages from Node-RED.',
                    'Check out the {mounted} function in {file} to See how easy it is to update Vue data from Node-RED.',
                ],
                status: {
                    header: 'Status',
                    socketIO: 'Socket.io Connection Status: {state}',
                    // timeDiff: 'Time offset between browser and server: {offset} @:ui.dynData.status.hours', // Open issue for vue-i18n, interpolation doesn't work yet with pluralisation; hardcoded for now
                    // hours: 'hours | hour | hours',
                    timeDiff: 'Time offset between browser and server: {offset} hours'
                },
                normalMessages: {
                    header: 'Normal Messages',
                    intro: 'Messages: Received={msgsReceived}, Sent={msgsSent}',
                    footer: 'The received message is from the input to the uibuilder node. ' + 
                        'The send message will appear out of port #1 of the node.',
                },
                controlMessages: {
                    header: 'Control Messages',
                    intro: 'Control Messages: Received={msgsCtrlReceived}, Sent={msgsCtrlSent}',
                    footer: 'Control messages always appear out of port #2 of the uibuilder node ' +
                        'whether they are from the server or the client. The {from} property ' +
                        'of the message tells you where it came from.'
                }
            }
        },
    },
    'nl-NL': {
        msgs: {
            LastMsgReceived: 'Laatste Ontvangen Bericht',
            LastMsgSent: 'Laatste Verzonden Bericht',
            LastCtrlMsgReceived: 'Laatste Ontvangen Bedieningsbericht',
            LastCtrlMsgSent: 'Laatste Verzonden Bedieningsbericht',
        },
        ui: {
            lang: {
                language: 'Taal',
                english: 'Engels',
                dutch: 'Nederlands'
            },
            intro: {
                text: 'Dit is een voorbeeld op basis van {vueUrl} als frontend. Zie de {uibuilderUrl} README voor informatie over het gebruik van UIbuilder.',
                header: 'UIbuilder + Vue.js + bootstrap-vue + vue-i18n voor Node-RED',
            },
            form: {
                header: 'Simpele invoer op basis van Vue',
                textIntro: 'Het is erg simpel om een formulier te maken met behulp van Vue en bootstrap-vue. Het formulier zendt data terug naar Node-RED. Bekijk de {increment} methode maar eens in {file} om te zien hoe makkelijk dit is.',
                inputPlaceholder: 'Vul wat tekst in om naar Node-RED te sturen',
                checkbox: 'Aankruisen of niet aankruisen; dat is de vraag', // Based on Voeten's 1959 translation :)
                increment: 'Verhoog',
                clickCounter: 'Aantal keer geklikt',
                outroText: 'Click op de knop om de teller te verhogen. Dit zendt tevens de data dynamisch terug naar Node-RED.'
            },
            dynData: {
                header: 'Dynamische data',
                intro: [
                    'Maakt gebruik van Vue om de pagina dynamisch te updaten update bij veranderingen afkomstig vanuit of naar Node-RED.',
                    'Bekijk de functie {mounted} in het bestand {file} om te zien hoe eenvoudig het is om wijzigingen te tonen vanuit Node-RED.',
                ],
                status: {
                    header: 'Status',
                    socketIO: 'Socket.io verbindingsstatus: {state}',
                    timeDiff: 'Tijdsverschil tussen browser en server: {offset} uur',
                    // hour: 'uur | uur | uren',
                },
                normalMessages: {
                    header: 'Gewone berichten',
                    intro: 'Berichten: Ontvangen={msgsReceived}, Verzonden={msgsSent}',
                    footer: 'Het ontvangen bericht komt binnen via de invoer van de uibuilder node. ' + 
                        'Het verzonden bericht komt uit poort #1 van de node.',
                },
                controlMessages: {
                    header: 'Bedieningsberichten',
                    intro: 'Bedieningsberichten: Ontvangen={msgsCtrlReceived}, Verzonden={msgsCtrlSent}',
                    footer: 'Bedieningsberichten komen altijd uit poort #2 van de uibuilder node ongeacht of ' +
                        'ze afkomstig zijn van de server of de client. De {from} property van het bericht ' +
                        'geeft aan waar deze vandaan komt.'
                }
            }
        }
    }
};

var i18n = new VueI18n({
    locale: 'en-GB',
    fallbackLocale: 'en-GB',
    messages: messages,  // for readability; the `: messages` part is redundant
});

/** @see https://github.com/TotallyInformation/node-red-contrib-uibuilder/wiki/Front-End-Library---available-properties-and-methods */
// eslint-disable-next-line no-unused-vars
var app1 = new Vue({
    el: '#app',
    i18n: i18n, // for readability; the `: i18n` part is redundant
    data: {
        startMsg    : 'Vue has started, waiting for messages',
        feVersion   : '',
        counterBtn  : 0,
        inputText   : null,
        inputChkBox : false,
        socketConnectedState : false,
        serverTimeOffset     : '[unknown]',
        imgProps             : { width: 75, height: 75 },

        msgRecvd    : '[Nothing]',
        msgsReceived: 0,
        msgCtrl     : '[Nothing]',
        msgsControl : 0,

        msgSent     : '[Nothing]',
        msgsSent    : 0,
        msgCtrlSent : '[Nothing]',
        msgsCtrlSent: 0,
    }, // --- End of data --- //
    computed: {
        hLastRcvd: function() {
            var msgRecvd = this.msgRecvd
            if (typeof msgRecvd === 'string') return this.$t('msgs.LastMsgReceived') + ' = ' + msgRecvd
            else return this.$t('msgs.LastMsgReceived') + ' = ' + this.syntaxHighlight(msgRecvd)
        },
        hLastSent: function() {
            var msgSent = this.msgSent
            if (typeof msgSent === 'string') return this.$t('msgs.LastMsgSent') + ' = ' + msgSent
            else return this.$t('msgs.LastMsgSent') + ' = ' + this.syntaxHighlight(msgSent)
        },
        hLastCtrlRcvd: function() {
            var msgCtrl = this.msgCtrl
            if (typeof msgCtrl === 'string') return this.$t('msgs.LastCtrlMsgReceived') + ' = ' + msgCtrl
            else return this.$t('msgs.LastCtrlMsgReceived') + ' = ' + this.syntaxHighlight(msgCtrl)
        },
        hLastCtrlSent: function() {
            var msgCtrlSent = this.msgCtrlSent
            if (typeof msgCtrlSent === 'string') return this.$t('msgs.lastCtrlMsgSent') + ' = ' + msgCtrlSent
            //else return 'Last Message Sent = ' + this.callMethod('syntaxHighlight', [msgCtrlSent])
            else return this.$t('msgs.LastCtrlMsgSent') + ' = ' + this.syntaxHighlight(msgCtrlSent)
        },
    }, // --- End of computed --- //
    methods: {
        increment: function() {
            // Increment the count by one
            this.counterBtn = this.counterBtn + 1
            var topic = this.msgRecvd.topic || 'uibuilder/vue'
            uibuilder.send( {
                'topic': topic,
                'payload': {
                    'type': 'counterBtn',
                    'btnCount': this.counterBtn,
                    'message': this.inputText,
                    'inputChkBox': this.inputChkBox
                }
            } )
        }, // --- End of increment --- //

        // return formatted HTML version of JSON object
        syntaxHighlight: function(json) {
            json = JSON.stringify(json, undefined, 4)
            json = json.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
            json = json.replace(/("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g, function (match) {
                var cls = 'number'
                if (/^"/.test(match)) {
                    if (/:$/.test(match)) {
                        cls = 'key'
                    } else {
                        cls = 'string'
                    }
                } else if (/true|false/.test(match)) {
                    cls = 'boolean'
                } else if (/null/.test(match)) {
                    cls = 'null'
                }
                return '<span class="' + cls + '">' + match + '</span>'
            })
            return json
        }, // --- End of syntaxHighlight --- //
    }, // --- End of methods --- //

    // Available hooks: init,mounted,updated,destroyed
    mounted: function(){
        //console.debug('[indexjs:Vue.mounted] app mounted - setting up uibuilder watchers')

        /** **REQUIRED** Start uibuilder comms with Node-RED @since v2.0.0-dev3
         * Pass the namespace and ioPath variables if hosting page is not in the instance root folder
         * e.g. If you get continual `uibuilderfe:ioSetup: SOCKET CONNECT ERROR` error messages.
         * e.g. uibuilder.start('/nr/uib', '/nr/uibuilder/vendor/socket.io') // change to use your paths/names
         */
        uibuilder.start()

        var vueApp = this

        // Example of retrieving data from uibuilder
        vueApp.feVersion = uibuilder.get('version')

        /** You can use the following to help trace how messages flow back and forth.
         * You can then amend this processing to suite your requirements.
         */

        //#region ---- Trace Received Messages ---- //
        // If msg changes - msg is updated when a standard msg is received from Node-RED over Socket.IO
        // newVal relates to the attribute being listened to.
        uibuilder.onChange('msg', function(newVal){
            //console.info('[indexjs:uibuilder.onChange] msg received from Node-RED server:', newVal)
            vueApp.msgRecvd = newVal
        })
        // As we receive new messages, we get an updated count as well
        uibuilder.onChange('msgsReceived', function(newVal){
            //console.info('[indexjs:uibuilder.onChange] Updated count of received msgs:', newVal)
            vueApp.msgsReceived = newVal
        })

        // If we receive a control message from Node-RED, we can get the new data here - we pass it to a Vue variable
        uibuilder.onChange('ctrlMsg', function(newVal){
            //console.info('[indexjs:uibuilder.onChange:ctrlMsg] CONTROL msg received from Node-RED server:', newVal)
            vueApp.msgCtrl = newVal
        })
        // Updated count of control messages received
        uibuilder.onChange('msgsCtrl', function(newVal){
            //console.info('[indexjs:uibuilder.onChange:msgsCtrl] Updated count of received CONTROL msgs:', newVal)
            vueApp.msgsControl = newVal
        })
        //#endregion ---- End of Trace Received Messages ---- //

        //#region ---- Trace Sent Messages ---- //
        // You probably only need these to help you understand the order of processing //
        // If a message is sent back to Node-RED, we can grab a copy here if we want to
        uibuilder.onChange('sentMsg', function(newVal){
            //console.info('[indexjs:uibuilder.onChange:sentMsg] msg sent to Node-RED server:', newVal)
            vueApp.msgSent = newVal
        })
        // Updated count of sent messages
        uibuilder.onChange('msgsSent', function(newVal){
            //console.info('[indexjs:uibuilder.onChange:msgsSent] Updated count of msgs sent:', newVal)
            vueApp.msgsSent = newVal
        })

        // If we send a control message to Node-RED, we can get a copy of it here
        uibuilder.onChange('sentCtrlMsg', function(newVal){
            //console.info('[indexjs:uibuilder.onChange:sentCtrlMsg] Control message sent to Node-RED server:', newVal)
            vueApp.msgCtrlSent = newVal
        })
        // And we can get an updated count
        uibuilder.onChange('msgsSentCtrl', function(newVal){
            //console.info('[indexjs:uibuilder.onChange:msgsSentCtrl] Updated count of CONTROL msgs sent:', newVal)
            vueApp.msgsCtrlSent = newVal
        })
        //#endregion ---- End of Trace Sent Messages ---- //

        // If Socket.IO connects/disconnects, we get true/false here
        uibuilder.onChange('ioConnected', function(newVal){
            //console.info('[indexjs:uibuilder.onChange:ioConnected] Socket.IO Connection Status Changed to:', newVal)
            vueApp.socketConnectedState = newVal
        })
        // If Server Time Offset changes
        uibuilder.onChange('serverTimeOffset', function(newVal){
            //console.info('[indexjs:uibuilder.onChange:serverTimeOffset] Offset of time between the browser and the server has changed to:', newVal)
            vueApp.serverTimeOffset = newVal
        })

    } // --- End of mounted hook --- //

}) // --- End of app1 --- //

// EOF