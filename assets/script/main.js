(()=>{"use strict";document.addEventListener("DOMContentLoaded",(function(){const t=document.querySelector(".main-content");fetch("/chats",{method:"GET",headers:{"Content-Type":"application/json"}}).then((t=>t.json())).then((e=>{if(void 0!==e.result){const n=e.result.sort((function(t,e){return e.room,t.room,t.room-e.room}));for(let e=0;e<n.length;e++){if(null===n[e].room)continue;const o=document.createElement("div");o.classList.add("chat-room-box");const c=document.createElement("div");c.classList.add("chat-room-info"),c.innerText=`참여인원 수: ${n[e].participants}  방 번호: ${n[e].room}`;const a=document.createElement("button");a.classList.add("enter-button"),a.innerText="입장",a.addEventListener("click",(()=>{const t=new URLSearchParams(window.location.search).get("name");window.location.href=`../chatRoom.html?name=${t}&roomNumber=${n[e].room}`})),o.appendChild(c),o.appendChild(a),null==t||t.appendChild(o)}}})).catch((t=>{alert("반복하여 오류 발생시 문의 바랍니다. abc@abc.com"+t)}))}))})();