const socket=io('/')
const mdiv=document.getElementById('messagesDiv')
status=0

socket.on('status', ()=>{
    socket.emit('sstatus', status)
    status=1
})

socket.on('message', message=>{
    const div=document.createElement('div')
    div.innerText=message
    mdiv.append(div)
})