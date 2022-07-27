let ADDRES = "ws://127.0.0.1:5000/server"

let TIME = 500
let list = document.getElementsByClassName("chat-item danmaku-item ")

let ws = new WebSocket(ADDRES)
ws.onopen = ()=>{
    console.log("连接成功")
}
ws.onclose = ()=>{
    console.log("断开连接")
}


let a = list.length
setInterval(() => {
    if(a!=list.length){
        a=list.length
        console.log(list[a-1].innerText)
        ws.send(list[a-1].innerText)
    }
}, TIME);
