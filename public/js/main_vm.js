import ChatMessage from './modules/ChatMessage.js';

const socket = io();
function setUserId({sID, message}){
    
    console.log('connected', sID, message);
    vm.socketID = sID;
}

function appendMessage(message){
    vm.messages.push(message);
}
function showTyping(){
    // vm.typing();
    let toast = vm.$toasted.show(vm.nickname + ' is typing...', { 
        theme: "outline", 
        position: "top-right", 
        duration : 2000
   });
}

function onlineUsers(message){
    vm.online = message.numUsers;
}

function offlineUser(message){
    vm.online = message.numUsers;
}

const vm = new Vue({
    data: {
        socketID: "",
        nickname: "",
        message: "",
        messages: [],
        online: ""
    },

    methods:{
        dispatchMessage(){
            // send a chat message
            socket.emit('chat message', { content: this.message, name: this.nickname || "Anonymous"});
            this.message = "";
            let toast = this.$toasted.show("Message Sent", { 
                theme: "outline", 
                position: "bottom-right", 
                duration : 2000
           });
        },
        typing(){
            console.log("typing");
            // show typing text
            socket.emit('typing');
        }
    },

    components:{
        newmessage: ChatMessage
    }
}).$mount("#app");

socket.addEventListener('connected', setUserId);
socket.addEventListener('chat message', appendMessage);
socket.addEventListener('disconnect', appendMessage);
socket.addEventListener('userCount', onlineUsers);
socket.addEventListener('leftUser', offlineUser);

socket.addEventListener('userTyping', showTyping);