var data = localStorage.getItem('step1');
console.log(data)
// Check if data exists in localStorage
if (data) {
    data = JSON.parse(data)
    console.log('Data retrieved from localStorage:', data.description);
    const desc = document.getElementById('description');
    if (desc) {
        desc.value = data.description;
    } else {
        console.log("no ele")
    }
} else {
    console.log('No data found in localStorage.');
}

function goNextStep() {
    data = { description: document.getElementById('description').value }
    localStorage.setItem('step1', JSON.stringify(data))
    goNext(1)
}