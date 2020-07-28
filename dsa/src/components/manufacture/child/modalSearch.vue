<template>
	<div class="modalContainer">
		<div class="modalheader d-flex justify-content-between">
			<div class="title align-self-center ml-4">{{headerText}}</div>
			<button v-on:click="closeBtn" type="button" class="rounded-circle align-self-center mr-3" data-dismiss="modal" aria-label="Close">
				<svg>
				  <path d="M8 8 L20 20" stroke="#6D80B8" stroke-width="5"/>
				  <path d="M20 8 L8 20" stroke="#6D80B8" stroke-width="5"/>
				</svg>
			</button>
		</div>
		<div class="modalBody">
			<subtitle :subtitleInfo = "subtitle.modalTitle"></subtitle>
			<div class="lineChartDiv d-flex justify-content-between">
				<settingBoard class="align-self-center" boardStyle="vertical-2"></settingBoard>
				<div class="align-self-center d-flex flex-column" style="width:75%; height:85%; border: 1px solid #bbc4d2;">
					<div class="d-flex justify-content-end" style="width:100%; height:20%;">
						<div v-for="item in chartLegend" class="align-self-center">
							<span class="legendLabel">{{item.text}}</span><img :src="item.iconSrc"/>
						</div>
					</div>
					<lineChart v-if="chartType=='line'" :lineChartData="line" class="align-self-center" style="width:96%; height:80%;"></lineChart>
					<grantChart v-else-if="chartType=='grant'" :grantChartData="grant" class="align-self-center" style="width:96%; height:80%;"></grantChart>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import subtitle from './subtitle.vue';
	import settingBoard from './settingBoard.vue';
	import lineChart from './lineChart.vue';
	import grantChart from './grantChart.vue';
	
	export default{
		components: {subtitle, settingBoard, lineChart, grantChart},
		props:{
			closeBtn: { type: Function},
			chartType: { type: String},
			headerText: { type: String},
			title: { type: String},
			chartLegend: { type: Array}
		},
		data(){
			return{
				subtitle:{
					modalTitle:{
						iconSrc: require("@/assets/manufacture/power_analysis/icon-01.png"),
						text: this.title,
						type: "normal",
					},
				},
				line: {
					id: "modallinechart",
					dataList: [{
						showInLegend: false,
						name: 'NXB1020A',
						data: [0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100],
						marker: {
							symbol: 'circle'
						},
						color: "#6e81b9",
						upFlag: true
					}, {
						showInLegend: false,
						name: 'NXV600A',
						data: [100, 90, 80, 70, 60, 50, 40, 30, 20, 10, 0],
						marker: {
							symbol: 'circle'
						},
						color: "#44afa5",
						upFlag: false
					}]
				},
				grant: {
					id: "modalgrantchart",
					dataList: [{
						showInLegend: false,
						name: 'NXB1020A',
						data: [0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100],
						marker: {
							symbol: 'circle'
						},
						color: "#6e81b9",
						upFlag: true
					}, {
						showInLegend: false,
						name: 'NXV600A',
						data: [100, 90, 80, 70, 60, 50, 40, 30, 20, 10, 0],
						marker: {
							symbol: 'circle'
						},
						color: "#44afa5",
						upFlag: false
					}]
				},
			}
		}
	}
</script>

<style scoped>
	svg{
		width: 100%;
		height: 100%;
	}
	.modalContainer{
		height: calc(52400vh/1080);
		width: calc(101400vw/1920);
		position: absolute;
		left: calc(50% - ((101400vw/1920)/2) );
		top: calc(33% - ((52400vh/1080)/2) );
		background-color: rgba(255, 255, 255, 0.8);
		box-shadow: 2px 3px 4px #aaa;
	}
	.modalheader{
		height: calc( 4400vh/1080);
		width: 100%;
		background: #6D80B8;
	}
	.modalheader button {
		background-color: white;
		border: 0;
		cursor: pointer;
		height: 28px;
		width: 28px;
		padding: 0px;
	}
	.title {
		color: #FFF;
		font-size: 16px;
	}
	.modalBody{
		height: calc((48000vh/1080));
		width: 95%;
		margin-left: 2.5%;
	}
	.legendLabel{
		color: #8898bd;
	}
</style>