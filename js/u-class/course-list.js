/**
 * 课程列表組件
 */
Vue.component("course-list", {
	props: ['comdata'],
	template: '<ul class="mui-table-view mui-table-view-chevron">'+
						'<li class="mui-table-view-cell mui-media" v-for="item in listData">'+
							'<a href="javascript:;">'+
								'<img class=" mui-pull-left" style="width: 100px;height: 60px;" :src="item.img_url">'+
								'<div class="mui-media-body" style="white-space: pre;">'+
								'{{item.subject_name}}<p class="mui-ellipsis" style="margin-top: 5px;margin-left: 5px;">'+
								'<img style="width: 20px;height: 20px;vertical-align: text-bottom;" :src="item.teacher_img_url" alt="" />'+
								'{{item.teacher_name}}</p>'+
								'</div>'+
							'</a>'+
						'</li>'+
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
	methods: {
		getListData: function() {
			var com = this;
			postDataPro_resList(this.comdata, function(response) {
				console.log("获取的课程列表：" + JSON.stringify(response));
				if(response.code == 0) {
					if(com.comdata.pageNumber === 1) {
						com.listData = response.data.list;
						com.totalPage = response.data.totalPage
					} else {
						com.listData = com.listData.concat(response.data);
						com.totalPage = response.data.totalPage
					}	
				} else {

				}
				com.$emit('requiredEnd',com.totalPage);
			});
		}

	}
})
/**
 * 课程列表組件
 */
//Vue.component("course-list", {
//	props: ['comdata'],
//	template: '<ul class="mui-table-view mui-table-view-chevron">'+
//						'<li class="mui-table-view-cell mui-media" v-for="item in listData">'+
//							'<a href="javascript:;">'+
//								'<img class=" mui-pull-left" style="width: 100px;height: 60px;" :src="item.image">'+
//								'<div class="mui-media-body" style="white-space: pre;">'+
//								'{{item.courseName}}<p class="mui-ellipsis" style="margin-top: 5px;margin-left: 5px;">'+
//								'<img style="width: 20px;height: 20px;vertical-align: text-bottom;" src="../../images/utils/default_personalimage.png" alt="" />'+
//								'{{item.teaName}}</p>'+
//								'</div>'+
//							'</a>'+
//						'</li>'+
//					'</ul>',
//	data: function() {
//		return {
//			listData: []
//		}
//	},
//	created: function() {
//		console.log("参数数据:" + JSON.stringify(this.comdata));
//	},
//	watch: {
//		comData: function(newVal, oldVal) {
//			console.log("获取的新值:" + JSON.stringify(newVal));
//			console.log("获取的旧值:" + JSON.stringify(oldVal));
//		}
//	},
//	computed: {
//
//	},
//	methods: {
//		getListData: function() {
//			var com = this;
//			this.comData.pageSize = 10;
//			postDataPro_teacherList(this.comData, function(data) {
//				if(comData.pageNumber === 1) {
//					com.listData = data.data
//				} else {
//					com.listData = com.listData.concat(data.data);
//				}
//				com.$emit('requiredEnd');
//			});
//		}
//
//	}
//})
window.addEventListener("showPop", function(e) {
	console.log(123456)
	mui('#topPopover').popover('toggle')

})


