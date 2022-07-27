//TikTok Version
// function dispatchKey(key) {
//   var map = {
//     "W": 87,
//     "D": 68,
//     "S": 83,
//     "A": 65,
//     "w": 87,
//     "d": 68,
//     "s": 83,
//     "a": 65
//   };
//   var e = new KeyboardEvent('keydown', { 'keyCode': map[key], 'which': map[key] });
//   document.dispatchEvent(e);
// }
// var t = 0
// var time = 0
// function clock() {
//   if (t == 0) {
//     t = time / 1000
//     document.getElementById("timer").innerHTML = "time:" + t
//   } else {
//     t--
//     document.getElementById("timer").innerHTML = "time:" + t
//   }
// }
// function timer() {
//   setInterval("clock()", 1000);
// }
// // Wait till the browser is ready to render the game (avoids glitches)
// window.requestAnimationFrame(function () {
//   var gm = new GameManager(4, KeyboardInputManager, HTMLActuator, LocalStorageManager);
//   var start_flag = false

//   var ws = new WebSocket("ws://127.0.0.1:5000/game");
//   ws.onopen = function () {
//     console.log('连接成功');
//     ws.send("[client]")
//   };
//   ws.onclose = function () {
//     console.log('断开连接');
//   };
//   ws.onmessage = function (event) {
//     var data = event.data;
//     console.log(data)
//     var obj = JSON.parse(data)
//     var arr = ['w', 'a', 's', 'd', 'W', 'D', 'A', 'S']
//     if (arr.indexOf(obj.command) > -1 && start_flag == true && obj.action == "execute") {
//       console.log("执行")
//       dispatchKey(obj.command)
//     } else if (obj.action != "execute" && obj.command != "null") {
//       if (obj.action == "start_timer") {
//         start_flag = true
//         time = obj.time
//         t = time / 1000
//         timer()
//       }
//     }
//   };

// });

//Bilibili Version
function dispatchKey(key) {
  var map = {
    "W": 87,
    "D": 68,
    "S": 83,
    "A": 65,
    "w": 87,
    "d": 68,
    "s": 83,
    "a": 65
  };
  var e = new KeyboardEvent('keydown', { 'keyCode': map[key], 'which': map[key] });
  document.dispatchEvent(e);
}
// Wait till the browser is ready to render the game (avoids glitches)
window.requestAnimationFrame(function () {
  var gm = new GameManager(4, KeyboardInputManager, HTMLActuator, LocalStorageManager);

  var ws = new WebSocket("ws://127.0.0.1:5000/game");
  ws.onopen = function () {
    console.log('连接成功');
    ws.send("client")
  };
  ws.onclose = function () {
    console.log('断开连接');
  };
  ws.onmessage = function (event) {
    var data = event.data;
    var map = {
      "W": 87,
      "D": 68,
      "S": 83,
      "A": 65,
      "w": 87,
      "d": 68,
      "s": 83,
      "a": 65
    };
    if(map[data]>0){
      dispatchKey(data)
    }
  };

});
