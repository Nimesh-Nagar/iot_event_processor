let humArr = [], tempArr = [], upArr = [];

/* ---------------- MQTT over WebSocket ---------------- */

const clientId = 'dashboard_' + Math.random().toString(16).substring(2, 10)
const host = 'ws://localhost:8083/mqtt'
const topic = '#'

const options = {
  keepalive: 60,
  clientId: clientId,
  protocolId: 'MQTT',
  protocolVersion: 5,
  clean: true,
  reconnectPeriod: 1000,
  connectTimeout: 30 * 1000,
  will: {
    topic: 'WillMsg',
    payload: 'Dashboard disconnected abnormally',
    qos: 0,
    retain: false
  }
}

console.log('Connecting MQTT over WebSocket...')
const client = mqtt.connect(host, options)

/* ---------------- MQTT Events ---------------- */

client.on('connect', () => {
  console.log('Connected to MQTT broker over WebSocket')

  client.subscribe(topic, err => {
    if (!err) {
      console.log(`Subscribed to ${topic}`)
    }
  })
})

client.on('message', (topic, message) => {
  const payload = message.toString()
  console.log(`Message from [${topic}]:`, payload)

  // EXACT SAME LOGIC AS YOUR WebSocket CODE
  drawChart(payload)
  drawChart2(payload)
  drawChart3(payload)
//   drawChart4(payload)
  updateTimestampUI(payload)
  
})

client.on('error', err => {
  console.error('MQTT connection error:', err)
  client.end()
})

client.on('reconnect', () => {
  console.log('Reconnecting to MQTT...')
})




// let humArr = [], tempArr = [], upArr = [];


// const socket = new WebSocket('ws://localhost:8083/mqtt')

// socket.addEventListener('open', event => {
//   console.log('WebSocket is connected, now check for your new Connection ID in Cloudwatch and the Parameter Store on AWS')
// })




// socket.addEventListener('message', event => {
	
//   	console.log('Your iot payload is:', event.data);
//     drawChart(event.data);  //Bar Graph
//     drawChart2(event.data); //Temperature F
//     drawChart3(event.data); //Humidity index %
//     drawChart4(event.data); //Timestamps
// 	})



let myChart = Highcharts.chart('container1', {
    
    title: {
        text: 'Line chart'
    },

    subtitle: {
        text: 'subtitle'
    },

    yAxis: {
        title: {
            text: 'Value'
        }
    },

    xAxis: {
        categories: upArr
    },

    legend: {
        layout: 'vertical',
        align: 'right',
        verticalAlign: 'middle'
    },

    plotOptions: {
        series: {
            label: {
                connectorAllowed: false
            }
        }
    },
    series: [{
        name: 'Humdity',
        data: []
    }, {
        name: 'Temperature',
        data: []
    }],

    responsive: {
        rules: [{
            condition: {
                maxWidth: 500
            },
            chartOptions: {
                legend: {
                    layout: 'horizontal',
                    align: 'center',
                    verticalAlign: 'bottom'
                }
            }
        }]
    }

});


//let myChart2 = Highcharts.chart('container1', {

    let myChart2 = Highcharts.chart('container2', {

    chart: {
        type: 'gauge',
        plotBackgroundColor: null,
        plotBackgroundImage: null,
        plotBorderWidth: 0,
        plotShadow: false
    },

    title: {
        text: 'Temperature'
    },

    pane: {
        startAngle: -150,
        endAngle: 150,
        background: [{
            backgroundColor: {
                linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1 },
                stops: [
                    [0, '#FFF'],
                    [1, '#333']
                ]
            },
            borderWidth: 0,
            outerRadius: '109%'
        }, {
            backgroundColor: {
                linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1 },
                stops: [
                    [0, '#333'],
                    [1, '#FFF']
                ]
            },
            borderWidth: 1,
            outerRadius: '107%'
        }, {
            // default background
        }, {
            backgroundColor: '#DDD',
            borderWidth: 0,
            outerRadius: '105%',
            innerRadius: '103%'
        }]
    },

    // the value axis
    yAxis: {
        min: 0,
        max: 150,

        minorTickInterval: 'auto',
        minorTickWidth: 1,
        minorTickLength: 10,
        minorTickPosition: 'inside',
        minorTickColor: '#666',

        tickPixelInterval: 30,
        tickWidth: 2,
        tickPosition: 'inside',
        tickLength: 10,
        tickColor: '#666',
        labels: {
            step: 2,
            rotation: 'auto'
        },
        title: {
            text: 'Degrees °F'
        },
        plotBands: [{
            from: 0,
            to: 90,
            color: '#55BF3B' // green
        }, {
            from: 90,
            to: 105,
            color: '#DDDF0D' // yellow
        }, {
            from: 105,
            to: 150,
            color: '#DF5353' // red
        }]
    },

    series: [{
        name: 'Temp',
        data: [0],
        tooltip: {
            valueSuffix: ' degrees'
        }
    }]

},  //is this comma needed?
// Add some life

//func here
);

//--------------------
let myChart3 = Highcharts.chart('container3', {

    chart: {
        type: 'gauge',
        plotBackgroundColor: null,
        plotBackgroundImage: null,
        plotBorderWidth: 0,
        plotShadow: false
    },

    title: {
        text: 'Humidity'
    },

    pane: {
        startAngle: -150,
        endAngle: 150,
        background: [{
            backgroundColor: {
                linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1 },
                stops: [
                    [0, '#FFF'],
                    [1, '#333']
                ]
            },
            borderWidth: 0,
            outerRadius: '109%'
        }, {
            backgroundColor: {
                linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1 },
                stops: [
                    [0, '#333'],
                    [1, '#FFF']
                ]
            },
            borderWidth: 1,
            outerRadius: '107%'
        }, {
            // default background
        }, {
            backgroundColor: '#DDD',
            borderWidth: 0,
            outerRadius: '105%',
            innerRadius: '103%'
        }]
    },

    // the value axis
    yAxis: {
        min: 0,
        max: 100,

        minorTickInterval: 'auto',
        minorTickWidth: 1,
        minorTickLength: 10,
        minorTickPosition: 'inside',
        minorTickColor: '#666',

        tickPixelInterval: 30,
        tickWidth: 2,
        tickPosition: 'inside',
        tickLength: 10,
        tickColor: '#666',
        labels: {
            step: 2,
            rotation: 'auto'
        },
        title: {
            text: '%'
        },
        plotBands: [{
            from: 0,
            to: 40,
            color: '#55BF3B' // green
        }, {
            from: 40,
            to: 70,
            color: '#DDDF0D' // yellow
        }, {
            from: 70,
            to: 100,
            color: '#DF5353' // red
        }]
    },

    series: [{
        name: 'humid',
        data: [0],
        tooltip: {
            valueSuffix: ' degrees'
        }
    }]

},  //is this comma needed?
// Add some life

//func here
);
//-----------------


// let myChart4 = Highcharts.chart('container4', {

//     chart: {
//         type: 'gauge',
//         plotBackgroundColor: null,
//         plotBackgroundImage: null,
//         plotBorderWidth: 0,
//         plotShadow: false
//     },

//     title: {
//         text: 'Time'
//     },

//     pane: {
//         startAngle: -150,
//         endAngle: 150,
//         background: [{
//             backgroundColor: {
//                 linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1 },
//                 stops: [
//                     [0, '#FFF'],
//                     [1, '#333']
//                 ]
//             },
//             borderWidth: 0,
//             outerRadius: '109%'
//         }, {
//             backgroundColor: {
//                 linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1 },
//                 stops: [
//                     [0, '#333'],
//                     [1, '#FFF']
//                 ]
//             },
//             borderWidth: 1,
//             outerRadius: '107%'
//         }, {
//             // default background
//         }, {
//             backgroundColor: '#DDD',
//             borderWidth: 0,
//             outerRadius: '105%',
//             innerRadius: '103%'
//         }]
//     },

//     // the value axis
//     yAxis: {
//         min: 0,
//         max: 1000,

//         minorTickInterval: 'auto',
//         minorTickWidth: 1,
//         minorTickLength: 10,
//         minorTickPosition: 'inside',
//         minorTickColor: '#666',

//         tickPixelInterval: 30,
//         tickWidth: 2,
//         tickPosition: 'inside',
//         tickLength: 10,
//         tickColor: '#666',
//         labels: {
//             step: 2,
//             rotation: 'auto'
//         },
//         title: {
//             text: 'Ticks'
//         },
//         plotBands: [{
//             from: 0,
//             to: 1000,
//             color: '#55BF3B' // green
//         }, {
//             from: 0,
//             to: 0,
//             color: '#DDDF0D' // yellow
//         }, {
//             from: 0,
//             to: 0,
//             color: '#DF5353' // red
//         }]
//     },

//     series: [{
//         name: 'Temp',
//         data: [0],
//         tooltip: {
//             valueSuffix: 'ticks'
//         }
//     }]

// },  //is this comma needed?
// // Add some life

// //func here
// );
// //-----------------




let drawChart = function (data) {

	
    var IoT_Payload = JSON.parse(data);
    console.log("ourr json object", IoT_Payload);
    //console.log(IoT_Payload.temperature);
    
    
        let { humidity, temperature, timestamps } = IoT_Payload;
       
        
        humArr.push(Number(IoT_Payload.humidity));
        tempArr.push(Number(IoT_Payload.temperature));
        upArr.push(IoT_Payload.timestamps);
    
        
        myChart.series[0].setData(humArr , true)
        myChart.series[1].setData(tempArr , true)
        myChart.xAxis[0].setCategories(upArr, true);
    }
    
    //------------------ guages

    let drawChart2 = function (data) {

        
        var IoT_Payload = JSON.parse(data);
        console.log("our json object2", IoT_Payload);

        var newVal = (IoT_Payload.temperature);
        var point = myChart2.series[0].points[0];
        console.log('Your point:', point);
        console.log('Your newVal:', newVal);
        point.update(newVal);

    }

    let drawChart3 = function (data) {

        
        var IoT_Payload = JSON.parse(data);
        console.log("our json object3", IoT_Payload);

        var newVal = (IoT_Payload.humidity);
        var point = myChart3.series[0].points[0];
        console.log('Your point:', point);
        console.log('Your newVal:', newVal);
        point.update(newVal);

    }


    // let drawChart4 = function (data) {

        
    //     var IoT_Payload = JSON.parse(data);
    //     console.log("our json object4", IoT_Payload);

    //     var newVal = (IoT_Payload.timestamps);
    //     var point = myChart4.series[0].points[0];
    //     console.log('Your point:', point);
    //     console.log('Your newVal:', newVal);
    //     point.update(newVal);

    // }

    let updateTimestampUI = function (data) {
    const payload = JSON.parse(data);

    const date = new Date(payload.timestamps);
    const epoch = Math.floor(date.getTime() / 1000);

    document.getElementById('lastTime').innerText =
        date.toLocaleString();

    document.getElementById('epochTime').innerText =
        `Epoch: ${epoch}`;
}

