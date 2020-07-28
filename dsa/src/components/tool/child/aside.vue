<template>
	<div class="absolute" @mouseleave="leave" style="height:88vh;">
		<div class="aside d-flex flex-column">
			<router-link to="ToolInfo" class="d-flex justify-content-center" @mouseover.native="toggle(0)"><img src="@/assets/tool/aside_1.png" height="30" class="align-self-center"/></router-link> 
			<router-link to="ToolTrack" class="d-flex justify-content-center" @mouseover.native="toggle(1)"><img src="@/assets/tool/aside_2.png" height="30" class="align-self-center"/></router-link> 
			<router-link to="waterlevel" class="d-flex justify-content-center" @mouseover.native="toggle(2)"><img src="@/assets/tool/aside_3.png" height="30" class="align-self-center"/></router-link> 
			<router-link to="OrderManagement" class="d-flex justify-content-center" @mouseover.native="toggle(3)"><img src="@/assets/tool/aside_4.png" height="30" class="align-self-center"/></router-link> 
		</div>
		<div id="menu1" class="togglemenu" v-if="togglemenuitem[0]">
			<div class="h-100 d-flex justify-content-center">
				<i class="material-icons align-self-center mr-2">◎</i><span class="align-self-center">刀具資訊</span>
			</div>
		</div>
		<div id="menu2" class="togglemenu" v-if="togglemenuitem[1]">
			<div class="h-100 d-flex justify-content-center">
				<i class="material-icons align-self-center mr-2">◎</i><span class="align-self-center">刀具追蹤</span>
			</div>
		</div>
		<div id="menu3" class="togglemenu" v-if="togglemenuitem[2]">
			<div class="h-100 d-flex justify-content-center">
				<i class="material-icons align-self-center mr-2">◎</i><span class="align-self-center">水位分析</span>
			</div>
		</div>
		<div id="menu4" class="togglemenu" v-if="togglemenuitem[3]==true">
			<div class="h-100 d-flex justify-content-center">
				<i class="material-icons align-self-center mr-2">◎</i><span class="align-self-center">訂單管理</span>
			</div>
		</div>
	</div>
</template>

<script>
	export default{
		data(){
			return{
				togglemenuitem: [false, false, false, false],
			}
		},
		methods:{
				leave(){
					for(var i=0; i<4; i++){
						this.$set(this.togglemenuitem, i, false);
					}				
				},
				toggle(target){
					for(var i=0; i<4; i++){
						if(i==target){
							this.$set(this.togglemenuitem, i, true);
						}
						else{
							this.$set(this.togglemenuitem, i, false);
						}
					}
				}
			}	
	}
</script>

<style scoped>
#menu1{
    top: calc(15px - 0.1vh);
	z-index: 99;
}

#menu2{
    top: calc(45px + 2.4vh);
	z-index: 99;
}

#menu3{
    top: calc(75px + 4.9vh);
	z-index: 99;
}

#menu4{
    top: calc(105px + 7.4vh);
	z-index: 99;
}

.aside{
	background: linear-gradient( to bottom, rgb(128,146,184), rgb(128,146,184,0.4) );
	position: relative;
	left: 0;
	top: 0;
	height: 83.5vh;
	width: 2.55vw;
	margin: 0;
}

.aside a{
	margin-top: 2.5vh;
}

.togglemenu{
	height: 5.2vh;
	width: 9vw;
    position: absolute;
    left: 3.8vw;
    background-color: #7f92b9;
    color: white;
    font-size: 1rem;
    box-shadow: 0 0 5px #99969f;
    background-image: linear-gradient(to bottom right, #ffffff,#9ea1c0,#9499b9);
}

.togglemenu .material-icons{
    font-size: 1.3rem;
}

.togglemenu:before {
    content: "";
    position: absolute;
    right: 104%;
    top: 33%;
    width: 0;
    height: 0;
    border-top: 10px solid transparent;
    border-left: 11px solid #47598b;
    border-bottom: 10px solid transparent;
}

.material-icons, .togglemenu, .aside {
    cursor: pointer;
    -webkit-user-select: none;
    user-select: none;
}
</style>