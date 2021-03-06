const express=require('express')
const app=express()
const server=require('http').Server(app)
const exec=require('child_process').exec
const io=require('socket.io')(server)

app.use(express.static('public'))

app.get('/update', (req, res)=>{
    res.render('update.ejs')
})
app.get('/start', (req, res)=>{
    res.send("Starting")
    setTimeout(()=>{
        exec('sh ./start.sh')
    }, 1000)
})
app.get('/stop', (req, res)=>{
    res.send("Stopping")
    setTimeout(()=>{
        exec('sh ./stop.sh')
    }, 1000)
})

io.on('connection', socket=>{
    socket.emit('status')
    socket.on('sstatus', status=>{
        if(status==0){
            socket.emit('message', "Downloading files...")
            exec('sudo git pull')
            setTimeout(()=>{
                socket.emit('message', "Restarting to apply changes...")
                exec('sudo sh ./download.sh')
            }, 1500)
        }
        if(status==1){
            socket.emit('message', "Update completed successfully")
        }
    })
})

server.listen(81)