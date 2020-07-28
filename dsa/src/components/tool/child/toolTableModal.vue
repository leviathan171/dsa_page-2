<template>
	<div v-if="show" class="modal-2 modal-background">
		<div class="modal-header d-flex justify-content-end">
			<button @click="CloseToolTableModal" class="align-self-center closebtn">
				<img src="@/assets/tool/close.png" width="23" height="23"/>
			</button>
		</div>
		<div class="modal-body d-flex flex-column">
			<subtitle :subtitleInfo = "subtitle"></subtitle>
			<table class="modal-2-table mt-3 align-self-center">
				<thead class="background-darkblue-2 text-center text-white text-weight-bold text-size-14">
					<tr>
						<th>編號</th>
						<th>加工刀具</th>
						<th>數量</th>
						<th>刀具壽命</th>
						<th></th>
					</tr>
				</thead>
				<tbody class="text-blue-1 text-center">
						<tr v-for="item in toolTable">
							<td>{{item.id}}</td><td>{{item.type}}</td><td>{{item.number}}</td><td>{{item.life}}</td>
						</tr>
				</tbody>
			</table>
			<div class="align-self-center d-flex justify-content-end btnDiv mt-3">
				<button @click="GetSerialNumber" class="align-self-center d-flex justify-content-center button-darkblue ml-3 text-white text-weight-normal">
					<img class="mr-2 align-self-center" src="@/assets/tool/document_white.png" height="17" width="17"/>產生序號
				</button>
			</div>
		</div>
	</div>
</template>

<script>
	import subtitle from './subtitle.vue';
	export default{
		name: "toolTableModal",
		components: { subtitle },
		props: {
			toolTable: Array,
			show: Boolean,
			CloseToolTableModal: Function,
			GetSerialNumber: Function,
		},
		data(){
			return{
				subtitle: {
					iconSrc: require("@/assets/tool/info.png"),
					text: "領刀表",
					type: "normal",
				},
			}
		},
		mounted() {
		}
	}
</script>

<style scoped>
.button-darkblue{
	background-color: #8598c1;
	width: 7.239583vw;
	height: 2.6851851vh;
	border: none;
}

tbody::-webkit-scrollbar{
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

table, .btnDiv{
	width: 28.52vw;
}
tbody{
    display:block;
    overflow-y:scroll;
	max-height: calc(28700vh/1080);
}
thead, tbody tr{
	display: table;
	width: 100%;
	table-layout: fixed;
}
thead tr th:nth-last-child(1){
	width: 0.9375rem;
}
tbody tr, thead{
	height: calc(4100vh/1080);
}
tbody td{
	font-weight: normal;
	border-bottom: 1px #8092b8 solid;
}
tbody tr:nth-last-child(1) td{
	border-bottom: 0.75px #bcc6d4 solid;
}
tbody >tr >td:nth-child(1), tbody >tr >td:nth-child(2){
	border-left: 1px #8092b8 solid;
}
thead, thead tr, thead tr td{
	background-color: #8192b9cc;
}

.text-blue-1{
	color: #6a7cb1;
}

.text-white-1{
	color: #fff;
}

.text-size-14{
	font-size: 0.875rem;
}

.text-size-18{
	font-size: 1.125rem;
}

.text-weight-bold{
	font-weight: 700;
}

.text-weight-normal{
	font-weight: 400;
}

.modal-background{
	background-color: #fff;
}
.modal-2{
	width: 38vw;
	height: 48vh;
	z-index: 1;
	position: fixed;
	left: 29.58vw;
	top: 23.4vh;
}

.modal-2 input{
	height: 2.7vh;
	width: 40%;
	margin-right: 20%;
	border: 1px #697bb0 solid;
}

.modal-2 .modal-body{
	height: 44vh;
}

.modal-header{
	width: 100%;
	height: 4.1vh;
	background-color: #6c80b8;
}

.modal-header button{
	background-color: #6c80b8;
	border: none;
}

.modal-body{
	width: 100%;
	padding: 0 2.1vw;
	box-shadow: 4px 4px 3px #aaa;
}
</style>