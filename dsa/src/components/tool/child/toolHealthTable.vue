<template>
	<table>
		<thead class="background-darkblue-1 text-center text-white text-weight-bold text-size-13">
			<tr>
				<th>刀塔編號</th>
				<th>加工刀具</th>
				<th>刀具壽命</th>
				<th>使用次數</th>
				<th>備註</th>
				<th></th>
			</tr>
		</thead>
		<tbody class="text-center text-blue-1 text-weight-light text-size-14">
			<tr v-for="item in toolHealthTableData">
				<td><span style="display:inline-block; background-color:#6a7cb1; border-radius:50%; color:#FFF; width:calc(2000vh/1080);; height:calc(2000vh/1080);"><span>{{item.id}}</span></span></td>
				<td>{{item.type}}</td>
				<td>{{item.life}}</td>
				<td>{{item.times}}</td>
				<td v-bind:style="{color:item.remark}" class="text-size-24">●</td>
			</tr>
		</tbody>
	</table>	
</template>

<script>
	export default{
		name: "toolHealthTable",
		props: {
			toolHealthTableData: Array, 
		},
		mounted() {
		}
	}
</script>

<style scoped>
tbody::-webkit-scrollbar {
	width: 1.375rem;
}
tbody::-webkit-scrollbar-track {
	border-left: 1px solid #bbc4d2;
	border-right: 1px solid #bbc4d2;
	padding: 0 0;
	background-color: #eaeff8;
}
tbody::-webkit-scrollbar-button:single-button:vertical:decrement {
	border-left: 1px solid #bbc4d2;
	border-right: 1px solid #bbc4d2;
	border-top: 1px solid #bbc4d2;
	background-color: #eaeff8;
	background-image: url("../../../assets/tool/scroll-uparrow.png");
	background-size: 8px 8px;
	background-repeat: no-repeat;
	background-position: 50% 50%;
}
tbody::-webkit-scrollbar-button:single-button:vertical:increment {
	border-left: 1px solid #bbc4d2;
	border-right: 1px solid #bbc4d2;
	border-bottom: 1px solid #bbc4d2;
	background-color: #eaeff8;
	background-image: url("../../../assets/tool/scroll-downarrow.png");
	background-size: 8px 8px;
	background-repeat: no-repeat;
	background-position: 50% 50%;
} 

table{
	width: 29.3vw;
	margin-top: 2vh;
	margin-right: 2.5vw;
}
tbody{
    display:block;
    overflow-y:scroll;
	max-height: calc(25000vh/1080);
}
thead, tbody tr{
	display: table;
	width: 100%;
	table-layout: fixed;
}
thead tr th:nth-last-child(1){
	width: 1.375rem;
}
tbody tr, thead{
	height: calc(5000vh/1080);
}
tbody td{
	font-weight: normal;
	border-left: 0.75px #bcc6d4 solid;
}
tbody{
	border-bottom: 0.75px #bcc6d4 solid;
}
tbody tr td:nth-child(n+2):nth-child(-n+4){
	font-weight: 300;
}

.text-blue-1{
	color: #6a7cb1;
}

.text-white-1{
	color: #fff;
}

.text-size-13{
	font-size: 0.8125rem;
}

.text-size-14{
	font-size: 0.875rem;
}

.text-size-24{
	font-size: 1.5rem;
}

.text-size-28{
	font-size: 1.75rem;
}

.text-weight-bold{
	font-weight: 700;
}

.text-weight-light{
	font-weight: 300;
}

.background-darkblue-1{
	background-color: #8598c1;
}

</style>