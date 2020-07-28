<template scoped>
	<div>
		<!-- 電腦排版 -->
		<div class="d-none d-lg-block">
			<div class="background-primary d-flex w-100">
				<!-- 側邊欄 -->
				<asideNav></asideNav>
				<!-- 刀具入庫 -->
				<div class="tool-storage background-white-transparent">
					<subtitle :subtitleInfo = "subtitle.toolStorage"></subtitle>
					<toolStorageContent ref="store" type="computer" :isModify="toolModify"></toolStorageContent>
					<toolStorageButton :ShowToolRecordModal="ShowModal1" :modifyBtn="InfoModify" :storeBtn="StoreToolInfo" type="computer"></toolStorageButton>
				</div>
				<!-- 刀具追蹤 -->
				<div class="tool-track background-white-transparent">
					<subtitle :subtitleInfo = "subtitle.toolTrack"></subtitle>
					<div class="tool-track-content">
						<toolTrackSearch :ShowToolTable="ShowModal2" :searchBtn="SearchToolInfo"></toolTrackSearch>
						<toolTrackTable ref="table" :toolData="toolTableData" :lock="lockTable"></toolTrackTable>
						<div class="d-flex justify-content-end" style="height:9.1vh;">
							<button @click="GetWarehouse" class="align-self-center d-flex justify-content-center button-style-1 text-size-14 text-weight-normal"><img class="mr-2 align-self-center" src="@/assets/track/icon5.png" height="17" width="17" />出庫</button>
						</div>
					</div>
				</div>			
			</div>
		</div>
		<!-- 彈出視窗 - 刀具履歷 -->
		<toolRecordModal :Close="CloseModal1" :toggle="modal1"></toolRecordModal>
		<!-- 彈出視窗 - 領刀表 -->
		<toolTableModal :Close="CloseModal2" :toggle="modal2"></toolTableModal>
		
		<!-- 手機排版 -->
		<div class="container-fluid background-primary d-block d-lg-none" style="max-height:70vh; padding-bottom: 40vh; overflow-y: scroll;">
			<!-- 標題 -->
			<div v-for="(item,index) in tool_management" v-if="index < 2" class="row">
				<div class="col">
					<div class="card background-white mt-3 mb-3">
						<subtitlePhone :subtitleInfo = "item" :ToggleContent="Goto"></subtitlePhone>
					</div>
				</div>
			</div>	
			<div class="row">
				<!-- 刀具入庫 -->
				<div class="col">
					<div class="card background-white mt-3 mb-3">
						<subtitlePhone :subtitleInfo="subtitle.toolStorage" :ToggleContent="ToolStorageToggle"></subtitlePhone>
						<div v-if="toolStorageCollapse" class="card-body">
							<toolStorageContent type="phone"></toolStorageContent>
							<toolStorageButton :ShowToolRecordModal="ShowModal1" type="phone"></toolStorageButton>
						</div>
					</div>
				</div>
			</div>
			<div class="row">
				<!-- 刀具追蹤 -->
				<div class="col">
					<div class="card background-white mt-3 mb-3">
						<subtitlePhone :subtitleInfo="subtitle.toolTrack" :ToggleContent="ToolTrackToggle"></subtitlePhone>
						<div v-if="toolTrackCollapse" class="card-body">
							<toolTrackPhone></toolTrackPhone>
						</div>	
					</div>
				</div>
			</div>
			<!--標題-->
			<div v-for="(item,index) in tool_management" v-if="index > 3" class="row">
				<div class="col">
					<div class="card background-white mt-3 mb-3">
						<subtitlePhone :subtitleInfo="item" :ToggleContent="Goto"></subtitlePhone>
					</div>
				</div>
			</div>
		</div>
		<!-- 底部導覽列-手機版 -->
		<bottomNav :titleList = "tool_management"></bottomNav>
	</div>
</template>

<script>
import asideNav from '../child/aside.vue';
import subtitle from '../child/subtitle.vue';
import subtitlePhone from '../child/subtitlePhone.vue';
import toolStorageContent from './child/toolStorageContent.vue';
import toolStorageButton from './child/toolStorageButton.vue';
import toolTrackSearch from './child/toolTrackSearch.vue';
import toolTrackTable from './child/toolTrackTable.vue';
import toolTrackPhone from './child/toolTrackPhone.vue';
import toolRecordModal from './child/toolRecordModal.vue';
import toolTableModal from './child/toolTableModal.vue';
import bottomNav from '../child/bottomNav.vue';
import axios from "axios";

export default{
	name: "toolTrack",
	components: {asideNav, subtitle, subtitlePhone, toolStorageContent, toolStorageButton, toolTrackSearch, toolTrackTable, toolTrackPhone, toolRecordModal, toolTableModal, bottomNav},
	data(){
		return{
			subtitle: {
				toolStorage: {
					iconSrc: require("@/assets/track/icon3.png"),
					text: "刀具入庫",
					type: "normal",
				},
				toolTrack: {
					iconSrc: require("@/assets/track/icon4.png"),
					text: "刀具追蹤",
					type: "normal",
				}
			},
			tool_management:[
				{
					text:"刀塔刀具資訊",
					navtitle:"刀具資訊",
					iconSrc:require("@/assets/tool/info.png")
				},
				{
					text:"刀具確認",
					navtitle:"刀具確認",
					iconSrc:require("@/assets/tool/sure.png")
				},
				{
					text:"刀具入庫",
					navtitle:"刀具入庫",
					iconSrc:require("@/assets/tool/calendar.png")
				},
				{
					text:"刀具追蹤",
					navtitle:"刀具追蹤",
					iconSrc:require("@/assets/tool/search.png")
				},
				{
					text:"刀具水位分析",
					navtitle:"水位分析",
					iconSrc:require("@/assets/tool/search.png")
				},
				{
					text:"刀具水位",
					navtitle:"刀具水位",
					iconSrc:require("@/assets/tool/search.png")
				},
				{
					text:"加工程式",
					navtitle:"加工程式",
					iconSrc:require("@/assets/tool/search.png")
				},
				{
					text:"加工資訊",
					navtitle:"加工資訊",
					iconSrc:require("@/assets/tool/search.png")
				},
			],
			toolTableData:[
				{id:'001', spec:'NXV1020A', holder:'ER', type:'鑽孔刀', lenCorrection:5, diaCorrection:5, usage:10, restlife:10, user:'heisenberg', date:'2020/01/01 10:30:15', warehouse:1},
				{id:'002', spec:'NXV1020A', holder:'ER', type:'鑽孔刀', lenCorrection:5, diaCorrection:5, usage:10, restlife:10, user:'heisenberg', date:'2020/01/01 10:30:15', warehouse:0}
			],
			modal1: false,
			modal2: false,
			toolStorageCollapse: false,
			toolTrackCollapse: false,
			toolModify: false,
			lockTable: false,
		}
	},
	methods:{
		GetWarehouse(){
			this.lockTable = true;
			var checkedlist = this.$refs.table.GetChecked();
			console.log(checkedlist);
		},
		StoreToolInfo(){
			var info_list = this.$refs.store.GetInfo();
			console.log(info_list)
			axios.post('http://localhost:3000/ToolStorage',{
				id: 123,
				spec: 'abc',		
				holder: info_list[0],
				type: info_list[1],
				length: info_list[2],
				lengthCorrect: info_list[3],
				diameter: info_list[4],
				diameterCorrect: info_list[5],
				life: info_list[6],
				usage: info_list[7],
				user: 'Allen',
				time: '2020/01/22 11:55:10'
			})
			.then(function(res){
			})
			.catch(function(err){
				console.log(err);
			})
			this.toolModify = false;
		},
		SearchToolInfo(list){
			var self = this;
			axios.post('http://localhost:3000/toolSearch',{
				position: list[0],
				barType: list[1],
				toolType: list[2],
				staff: list[3],
				date: list[4],
			})
			.then(function(res){
				var temp = res.data;
				for(var i=0; i<res.data.length; i++){
					if( temp[i].warehouse == 0 ){
						temp[i].warehouse = false;
						temp[i]['lock'] = false;
					}
					else{
						temp[i].warehouse = true;
						temp[i]['lock'] = true;
					}
				}
				console.log(res.data)
				self.toolTableData = temp;
				self.lockTable = false;
			})
			.catch(function(err){
				console.log(err);
			})
		},
		ShowModal1(){
			this.modal1 = true;
		},
		ShowModal2(){
			this.modal2 = true;
		},
		CloseModal1(){
			this.modal1 = false;
		},
		CloseModal2(){
			this.modal2 = false;
		},
		ToolStorageToggle(){
			this.toolStorageCollapse = !this.toolStorageCollapse;
		},
		ToolTrackToggle(){
			this.toolTrackCollapse = !this.toolTrackCollapse;
		},
		InfoModify(){
			this.toolModify = !this.toolModify;
		},
		Goto(){
		
		}
	}
}
</script>

<style scoped src="./style.css">
</style>