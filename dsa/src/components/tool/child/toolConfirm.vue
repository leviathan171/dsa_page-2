<template>
	<div class="d-flex flex-column">
		<div class="tool-confirm-content-1 align-self-center d-flex flex-column background-primary-transparent text-family-1">
			<span class="tool-confirm-content-1-item"><span class="text-blue-1 text-size-14 text-weight-normal">加工工件 : </span><input id="workpiece" value="WDR604-A01-P001" class="text-blue-1 text-weight-light text-size-11 text-center ml-2"></input></span>
			<span class="tool-confirm-content-1-item"><span class="text-blue-1 text-size-14 text-weight-normal">加工數量 : </span><input id="worknumber" value=100 class="text-blue-1 text-weight-light text-size-11 text-center ml-2"></input></span>
			<span class="tool-confirm-content-1-item"><span class="text-blue-1 text-size-14 text-weight-normal">加工機床 : </span><select id="device" class="text-blue-1 text-weight-light text-size-11 ml-2" style="text-align-last: center;"><option value="nxv1020a">NXV-1020A</option><option value="nxv600a">NXV-600A</option></select></span>
			<div class="d-flex mt-2">
				<div class="align-self-center hor-line"></div>
				<button @click="ToolConfirm" class="align-self-center d-flex justify-content-center text-white button-darkblue background-darkblue-1 ml-4 text-family-1 text-weight-normal">
					<img class="mr-2 align-self-center" src="@/assets/tool/check_white.png" height="17" width="17"/>
					確認
				</button>
			</div>
		</div>
		<table class="tool-confirm-content-2 align-self-center text-family-1">
			<thead class="text-center text-white text-weight-bold text-size-14">
				<tr>
					<th>編號</th>
					<th>加工刀具</th>
					<th>需求次數</th>
					<th>正確</th>
					<th></th>
				</tr>
			</thead>
			<tbody class="text-center text-blue-1 text-size-13 text-weight-normal">
				<tr v-for="item in toolConfirmData">
					<td>{{item.id}}</td><td>{{item.tool}}</td><td>{{item.require}}</td><td><label class="checkbox d-flex justify-content-center"><input type="checkbox" :checked="item.correct" disabled/><span class="checkmark align-self-center"></span></label></td>
				</tr>
				<tr v-for="n in 8" v-if="toolConfirmData.length<n">
					<td></td><td></td><td></td><td></td>
				</tr>
			</tbody>
		</table>
		<div class="tool-confirm-content-3 d-flex align-self-center">
			<div class="align-self-center hor-line-2"></div>
			<button @click="showToolTable" id="button1" class="align-self-center d-flex justify-content-center button-darkblue background-darkblue-1 ml-4 text-white text-weight-normal">
				<img class="mr-2 align-self-center" src="@/assets/tool/document_white.png" height="17" width="17"/>領刀表
			</button>
		</div>
		<div class="tool-confirm-content-4 align-self-center background-primary-transparent d-flex flex-column text-family-1">
			<div class="d-flex">
				<span class="text-blue-1 text-size-14 text-weight-normal">加工程式 : </span><input class="text-blue-1 ml-4" style="width: 14.53vw; border: 1px #697bb0 solid;"></input>
				<button class="selectbtn ml-4 text-blue-1 text-size-14 text-weight-light">選擇檔案</button>
			</div>
			<div class="tool-confirm-content-3 d-flex align-self-center">
				<div class="align-self-center hor-line"></div>
				<button class="align-self-center d-flex justify-content-center button-darkblue background-darkblue-1 ml-3 text-white text-weight-normal">
					<img class="mr-2 align-self-center" src="@/assets/tool/upload.png" height="17" width="17"/>上傳
				</button>
			</div>
		</div>
	</div>
</template>

<script>
import axios from "axios";

	export default{
		name: "toolConfirm",
		props: {
			showToolTable: Function,
			getToolData: Function,
		},
		mounted() {
		},
		data(){
			return{
				toolConfirmData: [],
				unCorrectData: [],
			}
		},
		methods: {
			ToolConfirm(){
				var self = this;
				var device = document.getElementById('device').value;
				var workpiece = document.getElementById('workpiece').value;
				var number = document.getElementById('worknumber').value;
				var data = this.getToolData(device);
				
				axios.post('http://localhost:3000/ToolConfirm',{
					workpiece: workpiece,
					worknumber: number,
					device: device,
				})
				.then(function(res){
					console.log(res);
					var list = [], unCorrect = [];
					for(var i=0; i<res.data.length; i++){
						var temp = {}
						temp['id'] = res.data[i].id;
						temp['tool'] = res.data[i].tool;
						temp['require'] = res.data[i].require;
						temp['type'] = res.date[i].type;
						if(res.data[i].tool == data[res.data[i].id]){
							temp['correct'] = true;
						}
						else{
							temp['correct'] = false;
							unCorrect.push(temp);
						}
						list.push(temp);
					}
					self.toolConfirmData = list;
					self.unCorrectData = unCorrect;
				})
				.catch(function(err){
					console.log(err);
				})
			},
			GetUnCorrectData(){
				return this.unCorrectData;
			}
		}
	}
</script>

<style scoped>
/* custom checkbox */
.checkbox {
	height:100%;
	margin:0;
	display: block;
	position: relative;
	-webkit-user-select: none;
	-moz-user-select: none;
	-ms-user-select: none;
	user-select: none;
}

.checkbox input {
  position: absolute;
  opacity: 0;
  cursor: pointer;
  height: 0;
  width: 0;
}

.checkmark {
  position: relative;
  height: 1.8518518vh;
  width: 1.8518518vh;
  background-color: #fff;
  border: 1px #6a7cb1 solid;
  
}

.checkmark:after {
  content: "";
  position: absolute;
  display: none;
}

.checkbox input:checked ~ .checkmark:after {
  display: block;
}

.checkbox .checkmark:after {
  left: 0.5vh;
  top: 0.2vh;
  width: 8px;
  height: 10px;
  border: solid #6a7cb1;
  border-width: 0 3px 3px 0;
  -webkit-transform: rotate(45deg);
  -ms-transform: rotate(45deg);
  transform: rotate(45deg);
}
/* custom select */
select{
	text-align-last: center;
    -moz-appearance:none;
    -webkit-appearance:none;
    appearance:none;
	background-image: url("../../../assets/tool/select_arrow.png"), linear-gradient(#8597c0, #8597c0);
	background-size: 10px 10px, 1px 90%;
	background-repeat: no-repeat, no-repeat;
	background-position: 97% 50%, 90% 50%;
}
/* table style */
thead, thead tr, thead tr td{
	background-color: #8192b9cc;
}
td{
	font-weight: normal;
}
tbody{
    display:block;
    overflow-y:scroll;
	max-height: calc(33000vh/1080);
}
tbody::-webkit-scrollbar{
	width: 0.9375rem;
}
thead, tbody tr {
	display: table;
	width: 100%;
	table-layout: fixed;
}
thead:nth-last-child(1){
	width: 0.9375rem;
}
tbody::-webkit-scrollbar-track{
	border-left: 1px solid #bbc4d2;
	border-right: 1px solid #bbc4d2;
	padding: 0 0;
	background-color: #eaeff8;
}

tbody::-webkit-scrollbar-button:single-button:vertical:decrement{
	border-left: 1px solid #bbc4d2;
	border-right: 1px solid #bbc4d2;
	border-top: 1px solid #bbc4d2;
	background-color: #eaeff8;
	background-image: url("../../../assets/tool/scroll-uparrow.png");
	background-size: 8px 8px;
	background-repeat: no-repeat;
	background-position: 50% 50%;
}

tbody::-webkit-scrollbar-button:single-button:vertical:increment{
	border-left: 1px solid #bbc4d2;
	border-right: 1px solid #bbc4d2;
	border-bottom: 1px solid #bbc4d2;
	background-color: #eaeff8;
	background-image: url("../../../assets/tool/scroll-downarrow.png");
	background-size: 8px 8px;
	background-repeat: no-repeat;
	background-position: 50% 50%;
}  

.button-darkblue{
	width: 7.239583vw;
	height: 2.6851851vh;
	border: none;
}

.background-primary-transparent{
	background-color: #eaeff8cc;
}

.background-darkblue-1{
	background-color: #8598c1;
}

.background-darkblue-2{
	background-color: #8192b9cc;
}

.hor-line{
	width: 17.2vw;
	border-bottom: 1px #8192b9 solid !important	;
}

.hor-line-2{
	width: 17.89vw;
	border-bottom: 1px #8192b9 solid !important	;
}

.selectbtn{
	background: linear-gradient( to top, #a3b5d0, #ffffff00 );
	width: 4.8vw;
	border: none;
	border-radius: 4px;
	box-shadow: 0px 2px 1px 0px #aaa;
}

.text-blue-1{
	color: #6a7cb1;
}

.text-white-1{
	color: #fff;
}

.text-size-11{
	font-size: 0.73125rem;
}

.text-size-13{
	font-size: 0.8125rem;
}

.text-size-14{
	font-size: 0.875rem;
}

.text-weight-bold{
	font-weight: 700;
}

.text-weight-light{
	font-weight: 300;
}

.text-weight-normal{
	font-weight: 400;
}

.tool-confirm-content-1{
	width: 29.12vw;
	height: 17.22vh;
	margin-top: 0.85vh;
}

.tool-confirm-content-1-item{
	margin-left: 3.125vw;
	margin-top: 1.851851851vh;
}

.tool-confirm-content-1 div div{
	width: 17vw;
	margin-left: 2vw;
	border-bottom: 2px #8092b8 solid;
}

.tool-confirm-content-1 input, .tool-confirm-content-1 select{
	width: 12.239583vw;
	height: 2.314814vh;
	background-color: #fff;
}

.tool-confirm-content-1 input, .tool-confirm-content-4 input{
	border-radius: 0px;
	border: 0.5px #8192b9 solid;
}

.tool-confirm-content-2{
	width: 25vw;
	height: 34.5vh;
	margin-top: 1.67vh;
}

.tool-confirm-content-2 thead tr th:nth-last-child(1), .modal-2-table thead tr th:nth-last-child(1){
	width: 0.935rem;
}

.tool-confirm-content-2 tr{
	height: 3.84vh;
}

.tool-confirm-content-2 tbody tr{
	border-bottom: 0.75px #bcc6d4 solid;
}

.tool-confirm-content-2 tbody tr td:nth-child(1){
	border-left: 0.75px #bcc6d4 solid;
}

.tool-confirm-content-3{
	width: 26.5vw;
	height: 5.5vh;	
}

.tool-confirm-content-4{
	width: 29.12vw;
	height: 10.87vh;	
}

.tool-confirm-content-4>div{
	margin-left: 2vw;
}

.tool-confirm-content-4>div:nth-child(1){
	margin-top: 2.7vh;
}
</style>