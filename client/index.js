const tickerSearchBtn = document.getElementById('searchButton');
const tickerSearchBar = document.getElementById('tickerSearchBar')
tickerSearchBtn.addEventListener("click", () => {
    const ticker = tickerSearchBar.value;
    window.location.replace("http://localhost:3000/chart.html?" + ticker);
});
