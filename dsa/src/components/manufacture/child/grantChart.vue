<template>
    <div :id="grantChartData.id"></div>
</template>

<script>
	export default{
		name: 'grantChart',
		props: {
			grantChartData: Object,
		},
		data() {
			return{
				chart: {},
				counter: this.grantChartData.dataList[0].data.length
			}
		},
		mounted() {
			let today = new Date(),
			day = 1000 * 60 * 60 * 24;
			// Set to 00:00:00:000 today
			today.setUTCHours(0);
			today.setUTCMinutes(0);
			today.setUTCSeconds(0);
			today.setUTCMilliseconds(0);
			today = today.getTime();
			console.log(today)
			// colors: ['#8695C2','#18AFC6','#45AEA5','#5cb0d4'],
			var threeType = ['Auto Run','Idle','Linear Track']
			var threeColor = ['#6D80B8','#6BABD9','#1CAEC5']
			var ganttDataOne = [],ganttDataTwo = []
			//let dataOne = [[0, 21], [22, 26], [26.5, 29], [30, 38], [39, 43], [44, 47.5], [48.5, 61], [62.5, 65]]
			//let dataTwo = [[0, 11], [11.5, 13.5], [13.7, 17], [18, 32], [33, 35], [35.5, 46.5], [47.5, 50.5], [51,65]]
			let dataOne = [[0, 21], [21, 26], [26, 29], [29, 38], [38, 43], [43, 47.5], [47.5, 61], [61, 65]] //客戶說間隔要一致
			let dataTwo = [[0, 11], [11, 13.5], [13.5, 17], [17, 32], [32, 35], [35, 46.5], [46.5, 50.5], [50.5,65]]
			let styleOne = [0, 1, 2, 0, 1, 2, 0, 1]
			let styleTwo = [0, 1, 2, 0, 2, 1, 2, 0]
			for(let i = 0 ; i < dataOne.length ; i++){
				ganttDataOne.push({
					name: threeType[styleOne[i]],
					y: 0,
					start: today + dataOne[i][0] * 1000 * 60,
					end: today + dataOne[i][1] * 1000 * 60,
					color: threeColor[styleTwo[i]],
				})
				ganttDataTwo.push({
					name: threeType[styleTwo[i]],
					y: 1,
					start: today + dataTwo[i][0] * 1000 * 60,
					end: today + dataTwo[i][1] * 1000 * 60,
					color: threeColor[styleTwo[i]],
				})
			}
			this.chart = Highcharts.ganttChart(this.grantChartData.id, {
				chart:{
					plotBackgroundColor: '#ebeff8',
					height: 235,
					plotBorderWidth: 0,
					backgroundColor: 'transparent',
					events: {
						load: function () {
							 // set up the updating of the chart each second
							 var series = this.series
							 var o = (new Date()).getTime() // current time
							 var start_num = 65
							 var time_list = [[],[]]
							 var type_list = [[],[]]
							 setInterval(function () {
								for (i = 0; i < 2; i++) {
									var type = type = Math.floor(Math.random()*3)
									if (Math.random() < 0.9 && time_list[i].length > 0){
										type = type_list[i][type_list[i].length -1]
									}
										
									var time = start_num + Math.round(((new Date()).getTime() - o)/1000)
									type_list[i].push(type)
									time_list[i].push(time)

									/*尋找最早的發生時間點 */
									function  serachDiff(num){
										if (num <= 0){
											return time_list[i][num]
										}
										else if (type_list[i][num] == type_list[i][num-1]){
											return serachDiff(num-1)
										}
										else{
											return time_list[i][num]
										}
										
									}

									var start = serachDiff(time_list[i].length -1)
									option = {
										name: threeType[type],
										y: i,
										start: today + (start-1) * 1000 * 60,
										end: today + time * 1000 * 60,
										color: threeColor[type]
									}
									series[i].addPoint(option, true, false);
								}

								//調整gantt寬 
								ganttChartHTML = document.getElementById("operatingStatus")
								recrArr = ganttChartHTML.getElementsByClassName('highcharts-point highcharts-partfill-original')
								for (const rect of recrArr){
									old_y = parseFloat(rect.getAttribute('y'))
									height = parseFloat(rect.getAttribute('height'))
									new_y = Math.round(old_y + (height-34)/2)
									rect.setAttribute("style", "height: 34; y:" + new_y + ';')
								}

							 }, 1000);
						}
					}
				},
				title: {
				  text: ''
				},
			   
				legend: {

					layout: 'vertical',
					align: 'right',
					verticalAlign: 'top',
					symbolWidth: 0,
					itemMarginTop: 50,
					useHTML:true,
					labelFormatter: function () {
						console.log(this.name)
						return '<div style="background:'+this.color+'; width: 30px; height: 30px;"></div>'+'<span style="color: #8898bd;" title="' + this.name + '">' + this.name + '</span>';
					}
				},
				plotOptions: {
					series: {
						dataLabels: {
							enabled: true,
							align: 'left',
							borderWidth: 30,
							backgroundColor: '#666',
							formatter: function() {
								return this.point.options && this.point.options.label;
							}
						}
					}
				},
				xAxis: [{
					lineWidth: 0,
					tickColor: '#FFF',
					crosshair: true,
					showFirstLabel: false,
					grid:{
						enabled: false,//隱藏項目用
					},
					labels:{
						enabled: false,//隱藏項目用
					},
					tickInterval: 5 * 60 * 1000,
					type: 'category',
					gridLineWidth: 1,
					gridLineColor: '#CAD0DC'
					},{
						visible: false,
						opposite: false
				}],
				yAxis: {
					Height: 100,
					categories: ['NXV 1020 A', 'NXV 600 A'],
					labels:{
						style:{
							color: '#8898bd'
						}
					},
					grid:{
						borderWidth: 1,
						cellHeight: 100,
						borderColor: '#878FA4'
					},
					gridLineColor: '#CAD0DC'
				},
				credits: {
					enabled: false
				},
				series: [{
					name: 'NXV 1020 A',
					data: ganttDataOne,
					lineWidth: 3
				  },{
					name: 'NXV 600 A',
					data: ganttDataTwo
				}]
			  });
			  /*調整gantt寬 */
			  ganttChartHTML = document.getElementById("operatingStatus")
			  recrArr = ganttChartHTML.getElementsByClassName('highcharts-point highcharts-partfill-original')
			  for (const rect of recrArr){
				  old_y = parseFloat(rect.getAttribute('y'))
				  height = parseFloat(rect.getAttribute('height'))
				  new_y = Math.round(old_y + (height-34)/2)
				  rect.setAttribute("style", "height: 34; y:" + new_y + ';')
			  }		
		}
	}
</script>

<style scoped>

</style>