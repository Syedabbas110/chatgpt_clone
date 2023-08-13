async function postData(url = "", data = {}) { 
  const response = await fetch(url, {
    method: "POST", headers: {
      "Content-Type": "application/json", 
    }, body: JSON.stringify(data),  
  });
  return response.json(); 
}

sendButton.addEventListener("click", async ()=>{ 
  questionInput = document.getElementById("questionInput").value;
  document.getElementById("questionInput").value = "";
  document.querySelector(".right2").style.display = "block"
  document.querySelector(".right1").style.display = "none";
  question2.innerHTML = questionInput;
  let result = await postData("/api", {"question": questionInput})
  solution.innerHTML = result.answer
})

sendButton1.addEventListener("click", async ()=>{ 
  questionInput = document.getElementById("questionInput1").value;
  document.getElementById("questionInput").value = "";
  question2.innerHTML = questionInput;
  let result = await postData("/api", {"question": questionInput})
  solution.innerHTML = result.answer
})


new_chat.addEventListener("click", async ()=>{ 
  document.querySelector(".right2").style.display = "none"
  document.querySelector(".right1").style.display = "flex";
})

var elements = document.getElementsByClassName("chat");

Array.from(elements).forEach(function(element) {
  element.addEventListener("click", async ()=>{ 
    questionInput = element.textContent;
    document.getElementById("questionInput").value = "";
    document.querySelector(".right2").style.display = "block"
    document.querySelector(".right1").style.display = "none";
    question2.innerHTML = questionInput;
    let result = await postData("/api", {"question": questionInput})
    solution.innerHTML = result.answer
  })
});
