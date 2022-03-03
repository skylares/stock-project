
chartIt();
async function chartIt() {

    const xaxis = [];
    const yaxis = [];
    const response = await fetch('search/' + location.search.substring(1));
    await response.json().then(result => {


        result.forEach((stock, i) => {
            let label = stock.time.substring(5, 10);
            let openPrice = parseInt(stock.open);
            yaxis.push(openPrice);
            xaxis.push(label);
        });

    });

    const down = (ctx, value) => ctx.p0.parsed.y > ctx.p1.parsed.y ? value : undefined;
    const ctx = document.getElementById('chart').getContext('2d');
    const chart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: xaxis, //xaxis
            datasets: [{
                label: 'daily closing price',
                data: yaxis, //yaxis
                borderColor: 'rgba(75, 192, 192, 1)',
                segment: {
                    borderColor: ctx => down(ctx, 'rgb(192,75,75)'),
                }
            }]
        },
        options: {
            fill: false,
            interaction: {
              intersect: false
            },
            radius: 0,
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
} 