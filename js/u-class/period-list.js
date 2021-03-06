/**
 * period組件
 */
Vue.component('period-view', {
	props: {
		moreSlect: {
			type: Boolean,
			default: false
		},
		resourceCategoryId: {
			type: Number,
			default: 14
		}
	},
	template: '<div v-bind:style="{background:\'white\',height:\'40px\'}"><div v-bind:class="[\'mui-segmented-control\',\'mui-segmented-control-inverted\']">' +
		'<template v-for="(period,index) of periodList">' +
		'<a v-bind:class="[\'mui-control-item\', {\'mui-active\':index==0}]"  v-on:tap="checkListener(period,$event)" style="font-size:13px">' +
		'{{period.name}}</a>' +
		'</template>' +
		'</div>' +
		'<p v-if="moreSlect" v-on:tap="gotoSuperChoice()" style="float:right;font-size:11px;margin-top:10px;padding-right:3px;color:#37b9fe">高级筛选></p></div>',
	data: function() {
		return {
			periodList: []
		}
	},
	created: function() {
		this.getPeriods();
	},
	computed: {

	},
	methods: {
		/**
		 * 获取periods
		 */
		getPeriods: function() {
			var com = this;
			var commonData = {
				resourceCategoryId: this.resourceCategoryId
			}
			postDataPro_periodList(commonData, function(response) {
				if(response.code == 0) {
					com.periodList = response.data;
					com.$emit("periodchoice", com.periodList[0]);
				}
			})
		},
		/**
		 * 不同学段选择
		 */
		checkListener: function(period, event) {
			console.log("监听》》》》》")
			this.$emit("periodchoice", period);
		},
		/**
		 * 跳转到高级筛选界面
		 */
		gotoSuperChoice: function() {
			console.log("高级筛选")
			this.$emit("gotosuperchoice");
		}
	}
})