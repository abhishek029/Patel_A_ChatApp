import ChatMessage from './modules/ChatMessage.js';

const socket = io();

function setUserId({sID, message}){
    
    console.log('connected', sID, message);
    vm.socketID = sID;
}

function appendMessage(message){
    vm.messages.push(message);
}

const vm = new Vue({
    data: {
        socketID: "",
        nickname: "",
        message: "",
        messages: [],
        online: "",
    },

    methods:{
        dispatchMessage(){
            // send a chat message
            socket.emit('chat message', { content: this.message, name: this.nickname || "Anonymous"});
            this.message = "";
            let toast = this.$toasted.show("Message Sent", { 
                theme: "outline", 
                position: "top-left", 
                duration : 2000
           });
            // this.$toast.success('Sent');
        },
        typing(){
            console.log("typing");
            // show typing text

            let toast = this.$toasted.show(this.nickname + ' is typing...', { 
                theme: "outline", 
                position: "top-right", 
                duration : 2000
           });
        }
    },

    components:{
        newmessage: ChatMessage
    }
}).$mount("#app");

socket.addEventListener('connected', setUserId);
socket.addEventListener('chat message', appendMessage);
socket.addEventListener('disconnect', appendMessage);