function initPage() {
 // handle logic here
}

initPage()

function goNextStep() {
    // set localsotrage
    data = {}
    localStorage.setItem('step2', JSON.stringify(data))
    goNext(2)
}
