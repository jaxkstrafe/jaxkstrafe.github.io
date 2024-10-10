function calculateVideoEngagement() {

    const views = document.getElementById('views').value;
    const likes = document.getElementById('likes').value;
    const comments = document.getElementById('comments').value;
    const saves = document.getElementById('saves').value;
    const shares = document.getElementById('shares').value;

    if (views && likes && comments && saves && shares) {
        const engagementRate = ((parseInt(likes) + parseInt(comments) + parseInt(saves) + parseInt(shares)) / parseInt(views)) * 100;
        document.getElementById('engagementResult').innerText = `Your video engagement rate is ${engagementRate.toFixed(2)}%`;
    } 
    else {
        document.getElementById('engagementResult').innerText = "Please enter all values to calculate your engagement rate.";
    }
}
