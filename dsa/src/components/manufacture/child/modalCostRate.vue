<template>
	<div class="modalContainer">
		<div class="modalheader d-flex justify-content-between">
			<div class="title align-self-center ml-4">輸入費率</div>
			<button v-on:click="closeBtn" type="button" class="rounded-circle align-self-center mr-3" data-dismiss="modal" aria-label="Close">
				<svg>
				  <path d="M8 8 L20 20" stroke="#6D80B8" stroke-width="5"/>
				  <path d="M20 8 L8 20" stroke="#6D80B8" stroke-width="5"/>
				</svg>
			</button>
		</div>
		<div class="modalBody d-flex flex-column">
			<div class="align-self-center d-flex justify-content-between">
				<select class="align-self-center"><option>高壓 - 經常 - 二段式</option><option>高壓 - 經常 - 三段式</option></select>
				<div class="align-self-center"><span class="mr-2">契約容量</span><input value="100 kW"/></div>
			</div>
			<table class="align-self-center text-center">
				<thead>
					<tr> <th></th> <th>夏月</th> <th>非夏月</th> </tr>
				</thead>
				<tbody>
					<tr>
						<td>契約內容(基本)</td> <td><input value="223.6 NTD/kW"/></td> <td><input value="223.6 NTD/kW"/></td>
					</tr>
					<tr>
						<td>尖峰(流動)</td> <td><input value="223.6 NTD/kW"/></td> <td><input value="223.6 NTD/kW"/></td>
					</tr>
					<tr>
						<td>半尖峰(流動)</td> <td><input value="223.6 NTD/kW"/></td> <td><input value="223.6 NTD/kW"/></td>
					</tr>
					<tr>
						<td>離峰(流動)</td> <td><input value="223.6 NTD/kW"/></td> <td><input value="223.6 NTD/kW"/></td>
					</tr>
				</tbody>
			</table>
			<div class="align-self-center d-flex justify-content-end">
				<blueBtn class="align-self-center mt-3" text="確認"></blueBtn>
			</div>
		</div>
	</div>
</template>

<script>
	import blueBtn from './buttonDarkBlue.vue';
	
	export default{
		components: {blueBtn},
		props:{
			closeBtn: { type: Function}
		}
	}
</script>

<style scoped>
	*{
		font-size: 12px;
	}
	svg{
		width: 100%;
		height: 100%;
	}
	select{
	    width: 227px;
		height: 25px;
		color: #6a7cb1;
		background-color: white;
		border-radius: 0px;
		font-size: 13px;
	}
	input{
		color: #6a7cb1;
		width: calc(11500vw/1920);
		height: calc( 3000vh/1080);
		font-size: 12px;
		border: 1px solid #8598c1;
		text-align: center;
	}
	table{
		height: calc(23000vh/1080);
		width: 85%;
		border: 1px #ADB7C9 solid;
	}
	thead tr{
		height: calc( 3000vh/1080);
		background: #8192b9;
		color: #fff;
	}
	thead tr th{
		background: #8192b9;
		color: #fff;
	}
	tbody{
		height: calc(20000vh/1080);
		color: #959dc1;
		background: #eaeef7
	}
	.modalContainer{
		height: calc(39100vh/1080);
		width: calc(52300vw/1920);
		position: absolute;
		left: calc(50% - (26150vw/1920));
		top: calc(33% - (19550vh/1080));
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
		height: calc(34700vh/1080);
		width: 100%;
	}
	.modalBody >div{
		color: #6a7cb1;
		width: 85%;
	}
	.modalBody >div:nth-child(1){
		height: 18%;
	}
	.modalBody >div:nth-child(2){
		height: 20%;
	}
</style>