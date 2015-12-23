var libqqwry = require('../');
var qqwry1 = new libqqwry();
var qqwry2 = new libqqwry();
var arg = process.argv[2];

function openspeed(){
	qqwry1.speed();
	console.log('- 开启speed -')
}

if(arg == "-1"){
	console.log('--- 效率测试 IP查询(searchIP) ---')
	var tb,te,nn;
	
	tb = new Date();
	nn = v1(10000,qqwry1);
	te = new Date();
	console.log("单次查询("+(nn/10000)+"万次):"+ (te-tb) + " 平均:" + (te-tb)/nn , " -- 启用 speed");

	openspeed();

	tb = new Date();
	nn = v1(10000,qqwry1);
	te = new Date();
	console.log("单次查询("+(nn/10000)+"万次):"+ (te-tb) + " 平均:" + (te-tb)/nn);

}else if(arg == "-2"){
	console.log('--- 效率测试 IP段查询(searchIPScope) ---')
	var tb,te,n;

	tb = new Date();
	n = v2(null,qqwry1);
	te = new Date();
	console.log("IP段查询"+n[0]+"次(共获取"+(n[1]/10000)+"万条记录):"+ (te-tb) + " 平均:" + (te-tb)/n[1]);

	openspeed();

	tb = new Date();
	n = v2(null,qqwry1);
	te = new Date();
	console.log("IP段查询"+n[0]+"次(共获取"+(n[1]/10000)+"万条记录):"+ (te-tb) + " 平均:" + (te-tb)/n[1] );

}else if(arg == "-3"){
	console.log('--- 效率测试 IP段异步查询(searchIPScope) ---')
	var tb,te,n;

	tb = new Date();
	qqwry1.searchIPScope("0.0.0.0","255.255.255.255",function(err,iparr){
		te = new Date();
		n = iparr.length;
		console.log("IP段异步查询(共获取"+(n/10000)+"万条记录):"+ (te-tb) + " 平均:" + (te-tb)/n);
		
		openspeed();
		
		tb = new Date();
		qqwry1.searchIPScope("0.0.0.0","255.255.255.255",function(err,iparr){
			te = new Date();
			n = iparr.length;
			console.log("IP段异步查询(共获取"+(n/10000)+"万条记录):"+ (te-tb) + " 平均:" + (te-tb)/n);	
		});
	});

}else{//验证是否正常
	var loc = qqwry1.searchIP(arg || "255.255.255.255");
	var loc1 = qqwry2.searchIP(arg || "255.255.255.255");
	console.log(loc.ip + " -> " + loc.Country + " | " + loc.Area);	
	console.log(loc1.ip + " -> " + loc1.Country + " | " + loc1.Area);	
	return;
}

//单个IP查询
function v1(n,qqwry){
	var nb=0;
	for(var i = 0 ; i<n; i++){
		qqwry.searchIP("202.103.102.10");
		qqwry.searchIP("74.125.71.0");
		qqwry.searchIP("127.0.0.1");
		qqwry.searchIP("0.0.0.0");
		qqwry.searchIP("255.255.255.255");
		qqwry.searchIP("10.10.0.1");
		qqwry.searchIP("192.168.0.1");
		qqwry.searchIP("25.111.10.15");
		qqwry.searchIP("100.131.30.111");
		qqwry.searchIP("220.211.210.10");
		// console.log(qqwry.searchIP("202.103.102.10"));
		// console.log(qqwry.searchIP("74.125.71.0"));
		// console.log(qqwry.searchIP("127.0.0.1"));
		// console.log(qqwry.searchIP("0.0.0.0"));
		// console.log(qqwry.searchIP("255.255.255.255"));
		// console.log(qqwry.searchIP("10.10.0.1"));
		// console.log(qqwry.searchIP("192.168.0.1"));
		// console.log(qqwry.searchIP("25.111.10.15"));
		// console.log(qqwry.searchIP("100.131.30.111"));
		// console.log(qqwry.searchIP("220.211.210.10"));
		nb+=10;
	}
	return nb;
}

//IP段查询
function v2(n,qqwry){
	var nb = 0,k = n || 1;
	for(var i = 0 ; i<k; i++){
		nb += qqwry.searchIPScope("0.0.0.0","0.255.255.255").length;
		nb += qqwry.searchIPScope("7.0.0.0","10.255.255.255").length;
		nb += qqwry.searchIPScope("200.255.0.0","200.255.255.255").length;
		nb += qqwry.searchIPScope("40.0.0.0","80.255.255.255").length;
		nb += qqwry.searchIPScope("180.0.0.0","240.255.255.255").length;
		nb += qqwry.searchIPScope("0.0.0.0","0.255.255.255").length;
		nb += qqwry.searchIPScope("7.0.0.0","10.255.255.255").length;
		nb += qqwry.searchIPScope("200.255.0.0","200.255.255.255").length;
		nb += qqwry.searchIPScope("40.0.0.0","80.255.255.255").length;
		nb += qqwry.searchIPScope("180.0.0.0","240.0.255.255").length;
	}
	return [k*10,nb];
}



