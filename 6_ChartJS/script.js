const ctx = document.getElementById('chart').getContext("2d");
let delayed;
let gradient = ctx.createLinearGradient(0,0,0,400);
gradient.addColorStop(0, 'rgba(58,123,213,1)');
gradient.addColorStop(1, 'rgba(0,210,255,0.3)');
const labels = [
    '2012',
    '2013',
    '2014',
    '2015',
    '2016',
    '2017',
    '2018',
    '2019',
    '2020',
];
const data = {
    labels, // IMPORT LABELS FROM THE VARIABLE
    datasets: [{
        data: [211,326,465,350,420,370,500,375,415], // THE DATA
        label: "Minecraft Sales", // TITLE OF THE CHART
        fill:true, // FILL COLOR UNDER THE LINE
        backgroundColor:gradient, // GET GRADIENT VALUE / COLOR LIKE #FFF
        borderColor:'#fff', // BORDER LINE
        pointBackgroundColor: '#eee', // THE DOT AT EACH BAR
        tension: 0.2 // MAKE THE LINES MORE FLEXIBLE
    },
],
};
const config = {
    type: 'line', // LINE / DOT / BAR
    data: data, // IMPORT DATA FROM DATA VARIABLE
    options: {
        radius:5, // SIZE OF DOTS
        hitRadius: 30, // THANKS TO THIS VALUE YOU DONT HAVE TO HIT DIRECTLY TO THE DOT TO SEE DESC
        hoverRadius:12, // THE HOVER SIZE OF THE DOT
        responsive:true,
        
        // THE ANIMATION DELAY START - IT ALSO NEEDS DELAY VARIABLE
        animation: {
            onComplete: () => {
              delayed = true;
            },
            delay: (context) => {
              let delay = 0;
              if (context.type === 'data' && context.mode === 'default' && !delayed) {
                delay = context.dataIndex * 300 + context.datasetIndex * 100;
              }
              return delay;
            },
          },
        // THE ANIMATION DELAY END

        scales: {
            y: {
                ticks:{
                    callback: function(value){
                        return '$' + value + 'm' // CHANGES THE VALUES ON THE Y SIDE
                    }
                }
            }
        }
    },
};

const myChart = new Chart(ctx, config);