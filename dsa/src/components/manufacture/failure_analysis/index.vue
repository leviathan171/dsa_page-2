<template scoped>
	<div>
		<asideNav></asideNav>
		<div class="main-container">
			<!-- time select -->
			<div class="d-flex justify-content-center" >
				<timeSelector></timeSelector>
			</div>
			<div class="d-flex justify-content-between">
				<!-- left-half 設備故障統計 -->
				<div class="left-half d-flex flex-column">
					<subtitle :subtitleInfo = "subtitle.statistics"></subtitle>
					<div class="mt-5 d-flex justify-content-center">
						<div class="align-self-center ml-4 d-flex flex-column justify-content-center" style="width:30%; height:100%;">
							<div class="pieInfoBox mb-4 align-self-center d-flex flex-column text-center" v-for="item in pie.pieData">
								<span>{{item.name}}</span><hr><span>總計:{{item.y}}次</span>
							</div>
						</div>
						<pieChart :pieObject="pie" class="align-self-center" style="width:70%; height:100%;"></pieChart>
					</div>
					<statisticTable class="mt-5 align-self-center" style="width: 80%;"></statisticTable>
				</div>
				<!-- right-half 故障次數明細 -->
				<div class="right-half d-flex flex-column">
					<subtitle :subtitleInfo = "subtitle.details"></subtitle>
					<detailTable style="width: calc(100% - 3.57vw);" class="align-self-center mt-4"></detailTable>
					<div class="mt-3 align-self-center d-flex justify-content-between" style="width: calc(100% - 3.57vw); height: 360px;">
						<settingBoard class="align-self-center" boardStyle="vertical-2" style="height:90%;"></settingBoard>
						<lineChart :lineChartData="line" class="align-self-center" style="width:80%; height:90%;"></lineChart>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import asideNav from '../child/aside.vue';
import subtitle from '../child/subtitle.vue';
import timeSelector from '../child/timeSelector.vue';
import pieChart from '../child/pieChart.vue';
import lineChart from '../child/lineChart.vue';
import settingBoard from '../child/settingBoard.vue';
import statisticTable from '../child/statisticTable.vue';
import detailTable from '../child/detailTable.vue';

export default {
	name: "FailureAnalysis",
	components: {asideNav, subtitle, timeSelector, pieChart, lineChart, settingBoard, statisticTable, detailTable},
	data(){
		return{
			subtitle:{
				statistics:{
					iconSrc: require("@/assets/manufacture/failure_analysis/icon-01.png"),
					text: "設備故障統計",
					type: "normal",
				},
				details:{
					iconSrc: require("@/assets/manufacture/failure_analysis/icon-02.png"),
					text: "故障次數明細",
					type: "select",
					options: ['NXV1020A', 'NXV600A']
				}
			},
			pie:{
				id: "pie1",
				pieData: [{
					name: 'NVX600A',
					y: 15,
					z: 25,
				}, {
					name: 'NXV1020A',
					y: 10,
					z: 25,
				}],
				upFlag: false
			},
			line: {
				id: "line1",
				type: 'FA',
				dataList: [{
					showInLegend: false,
					name: 'NXB1020A',
					data: [0, 10, 9, 14, 4, 22, 11, 24, 14, 15, 30],
					marker: {
						symbol: 'circle'
					},
					color: "#44afa5",
					upFlag: true
				}]
			},
		}
	},
	mounted(){
		setInterval(()=>{
			this.line.dataList[0].data.shift();
			this.line.dataList[0].data.push(Math.random()*30);
		}, 1000);		
	}
}
</script>

<style scoped>
.main-container{
	height: 77.25925vh;
	width: 94.354166vw;
	margin-left: 4.177083vw;
	margin-top: 2.574074074vh;
	background-color: #FFF;
	border: 1.5px solid #bbc4d2;
}
.main-container >div:nth-child(1){
	height: 7.9629629vh;
	width: 100%;
}
.main-container >div:nth-child(2){
	height: calc(100% - 7.9629629vh);
	width: 100%;
}

.left-half{
	height: 100%;
	width: 33.33333vw;
}
.left-half >div{
	height: 32.592592vh;
	width: calc(100% - 1.57vw);
	margin-left: 0.785vw;
}

.right-half{
	height: 100%;
	width: 66.66666vw;
}

.pieInfoBox{
    border-radius: initial;
    width: 178px;
    height: fit-content;
    padding: 10px;
    box-shadow: 2px 2px 7px #DDD;
    background-color: rgba(255, 255, 255, 0.7);
    border: 0px;
    font-size: 19px;
	color: #6a7cb1;
	font-weight: 100;
}
</style>