//签名
document.write('<script src="../../js/libs/crypto-js/require.js"><\/script>');
document.write('<script src="../../js/utils/signHmacSHA1.js"><\/script>');
//本地存储
document.write('<script src="../../js/libs/myStorage/myStorage.js"><\/script>');
document.write('<script src="../../js/common/storageKeyName.js"><\/script>');
document.write('<script src="../../js/libs/jquery.js"><\/script>');


function tempTime() {
	switch(plus.os.name) {
		case "Android":
			return 30000;
			break;
		case "iOS":
			return 30000;
			break;
		default:
			// 其它平台
			break;
	}
}

//
function postDataEncry(url, commonData, flag, callback) {
	if(plus.networkinfo.getCurrentType() == plus.networkinfo.CONNECTION_NONE) {
		var data = {
			RspCode: '404',
			RspData: '',
			RspTxt: '网络异常，请检查网络设置！'
		}
		callback(data);
		return;
	}
	var tepTime = tempTime();
	//添加token参数
	if(flag == 1) {
		commonData.token = window.myStorage.getItem(window.storageKeyName.TOKEN);
	}
	console.log(url + ':commonData:'+JSON.stringify(commonData));
	//发送协议
	mui.ajax(url, {
		data: commonData,
		dataType: 'json',
		type: 'post',
		//		contentType: "application/json",
		timeout: tepTime,
		success: function(data) {
			console.log(url + "接口获取的值:" + JSON.stringify(data));
			if(data.code == 6) {
				renewToken(url, commonData, flag, callback);
			} else {
				callback(data);
			}
		},
		error: function(xhr, type, errorThrown) {
			console.log("网络连接失败" + url + ":" + type + "," + errorThrown + ":" + xhr);
			var data = {
				RspCode: '404',
				RspData: '',
				RspTxt: '网络连接失败，请重新尝试一下'
			}
			callback(data);
		}
	});
}

//
function postDataEncry66(url, commonData, flag, callback) {
	if(plus.networkinfo.getCurrentType() == plus.networkinfo.CONNECTION_NONE) {
		var data = {
			RspCode: '404',
			RspData: '',
			RspTxt: '网络异常，请检查网络设置！'
		}
		callback(data);
		return;
	}
	var tepTime = tempTime();
	//拼接登录需要的签名
	var signTemp = postDataEncry1({}, commonData, flag);
	console.log(url + ':commonData:' + JSON.stringify(commonData));
	//生成签名，返回值sign则为签名
	signHmacSHA1.sign(signTemp, storageKeyName.SIGNKEY, function(sign) {
		//组装发送握手协议需要的data
		//合并对象
		var tempData = $.extend({}, commonData);
		//添加签名
		tempData.sign = sign;
		//发送协议
		mui.ajax(url, {
			data: tempData,
			dataType: 'json',
			type: 'post',
			contentType: "application/json",
			timeout: tepTime,
			success: function(data) {
				console.log(url + "接口获取的值:" + JSON.stringify(data));
				if(data.code == 6) {
					renewToken(url, commonData, flag, callback);
				} else {
					callback(data);
				}
			},
			error: function(xhr, type, errorThrown) {
				console.log("网络连接失败" + url + ":" + type + "," + errorThrown + ":" + xhr);
				var data = {
					RspCode: '404',
					RspData: '',
					RspTxt: '网络连接失败，请重新尝试一下'
				}
				callback(data);
			}
		});
	});
}

//拼接参数
function postDataEncry1(encryData, commonData, flag) {
	//循环
	var tempStr = '';
	for(var tempData in encryData) {
		//对value进行加密
		var encryptStr = RSAEncrypt.enctype(encryData[tempData]);
		//修改值
		encryData[tempData] = encryptStr;
	}
	//判断是否需要添加共用数据
	if(flag == 0) {
		//获取个人信息
		var comData = {
			uuid: plus.device.uuid,
			token: commonData.cptoken,
			appid: plus.runtime.appid
		};
		commonData = $.extend(commonData, comData);
	} 
	//将对象转为数组
	var arr0 = [];
	for(var item in encryData) {
		arr0.push(item + '=' + encryData[item]);
	};
	var arr1 = [];
	for(var item in commonData) {
		arr1.push(item + '=' + commonData[item]);
	};
	//合并数组
	var signArr = arr0.concat(arr1);
	//拼接登录需要的签名
	var signTemp = signArr.sort().join('&');
	return signTemp;
}