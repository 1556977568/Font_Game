    alert("\n开始游戏前请先将窗口调整至合适大小\n\n点击“脱颖的游戏”可开始简单模式，点击困难按钮或按下任意字母键可开始困难模式，困难模式时按下ESC键可暂停游戏，暂停时按下ESC键可退出游戏")
    let time = 0
    let score = 0
    let coefficient = 0
    let pChar
    let pausing = true
    let gameInterval = null
    let scoreText = document.getElementById("scoreText")
    let correctRate = document.getElementById("correctRate")
    setInterval(function() {
        coefficient = Math.round(window.innerWidth * window.innerHeight / 1E4) / 100
        document.getElementById("coe").innerText = "当前系数：" + coefficient
    })

    function generate() {
        pChar = document.createElement("p")
        pChar.innerText = String.fromCharCode(65 + Math.floor(Math.random() * 26))
        let width = window.innerWidth - 110
        let height = window.innerHeight - 110
        let marginTop = Math.random() * height
        let marginLeft = Math.random() * width
        pChar.style.top = marginTop + "px"
        pChar.style.left = marginLeft + "px"
        document.body.appendChild(pChar)
    }

    function gameIntervalFunction() {
        generate()
        time += 0.5
    }

    function letterClick() {
        let all = document.querySelectorAll("p")
        for (let i = 0; i < all.length; i++) {
            if (pausing) {
                all[i].onclick = function() {}
            } else {
                all[i].onclick = function() {
                    all[i].remove()
                    resultWriter()
                }
            }
        }
    }

    function gameBeginning() {
        if (pausing) {
            pausing = false
            gameInterval = setInterval("gameIntervalFunction()", 500)
            setInterval("letterClick()", 500)
            document.getElementById("tuoYing").onclick = function() {}
            document.getElementById("pause").innerText = "暂 停"
            document.getElementById("pause").onclick = function() {
                gamePause()
            }
            document.onkeydown = function({ keyCode }) {
                if (keyCode === 27) {
                    gamePause()
                } else {
                    let all = document.querySelectorAll("p")
                    for (let i = 0; i < all.length; i++) {
                        if (all[i].innerText === String.fromCharCode(keyCode)) {
                            all[i].remove()
                            resultWriter()
                            break
                        }
                        all[i].onclick = function() {
                            all[i].remove()
                        }
                    }
                }
            }
        }
    }

    function gamePause() {
        clearInterval(gameInterval)
        document.getElementById("start").innerText = "继 续"
        pausing = true
        freeTime()
    }

    function freeTime() {
        document.getElementById("pause").innerText = "退 出"
        document.getElementById("pause").onclick = function() {
            window.close()
        }
        document.onkeydown = function({ keyCode }) {
            if (keyCode === 27) {
                window.close()
            } else {
                gameBeginning()
            }
        }
    }

    function resultWriter() {
        ++score
        scoreText.innerText = "当前得分：" + String(Math.round(score * coefficient * 100) / 100)
        console.log(coefficient)
        correctRate.innerText = "正确率：" + String(Math.floor(score * 60 / time)) + "个/分钟"
    }

    freeTime()

    function easyGameBeginning() {
        document.getElementById("tuoYing").onclick = function() {}
        generate()
        pChar.onclick = function() {
            pChar.remove()
            easyGameBeginning()
        }
        document.onkeydown = function({ keyCode }) {
            if (String.fromCharCode(keyCode) === pChar.innerText) {
                pChar.remove()
                easyGameBeginning()
            }
        }
    }