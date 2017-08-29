/**
 * 老師列表組件
 */
Vue.component("tea-list", {
	props: ['comdata'],
	template: '<ul v-bind:class="[\'mui-table-view\']">' +
		'<li v-on:tap="clickcell(item)" v-for="(item,index) of listData" v-bind:class="[\'mui-table-view-cell\',\'cell-container\']">' +
		'<img v-bind:class="[\'tea-headImg\']" v-bind:src="item.img_url"/>' +
		'<div v-bind:class="[\'tea-info\']">' +
		'<p>{{item.name}}</p>' +
		'<p>{{item.school_name}}</p>' +
		'</div>' +
		'<input v-bind:class="[\'tea-suject\']" type="button" v-bind:value="item.subjectList[0].name"/>' +
		'</li>' +
		'</ul>',
	data: function() {
		return {
			listData: [],
			totalPage: 0
		}
	},
	created: function() {
		console.log("创建时的参数数据:" + JSON.stringify(this.comdata));
	},
	watch: {
		'$props': {
			handler: function(val, oldVal) {
				console.log("改变后的参数数据：" + JSON.stringify(val));
				this.getListData();
			},
			deep: true
		}
	},
	computed: {

	},
	updated:function(){
		console.log(JSON.stringify(this.listData))
		var div = document.getElementById("find-tea")
		console.log(div.innerHTML);
	}
	,
	methods: {
		getListData: function() {
			var com = this;
			postDataPro_teacherList(this.comdata, function(response) {
				console.log("获取的老师列表：" + JSON.stringify(response));
				if(response.code == 0) {
					
					if(com.comdata.pageNumber === 1) {
						com.listData = response.data.list;
						com.totalPage = response.data.totalPage
					} else {
						com.listData = com.listData.concat(response.data.list);
						com.totalPage = response.data.totalPage
					}	
				} else {

				}
				com.$emit('requiredEnd',com.totalPage);
			});
		},
		clickcell:function(model){
			utils.openNewWindowWithData('teachSpace.html', model)
		}

	}
})
function pulldownRefresh() {
	findTea.comData.pageNumber = 1;
	mui('#pullrefresh').pullRefresh().endPulldown();

}
/**
 * 上拉加载具体业务实现
 */
function pullupRefresh() {
	findTea.comData.pageNumber++
	this.endPullupToRefresh(false); //参数为true代表没有更多数据了。

}
window.addEventListener("showPop", function(e) {
	console.log(555555)
	mui('#topPopover').popover('toggle')

})