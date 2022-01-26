const http = require("http");
const system = require("os");
const toRupiah = require("rupiah-format")

console.log("memory :", system.freemem());

const myName = "Edwin Kurniawan";

const player = {
	//key: value
	id: 1,
	name: myName,
	total_match: 800,
	win: 700,
	lose: 100,
	age: 17,
	saldo: 300800345,
}

const items = [
	{
		item_id: 111,
		item_name: "butterfly",
		item_damage: 450,
		item_drop: true,
	},
	{
		item_id: 112,
		item_name: "dagon",
		item_damage: 600,
		item_drop: false,
	},
];

const playerItems = Object.assign(player, items[1])

function generateAge(){
	if(player.age >= 6 && player.age <= 10){
		return "anak-anak";
	}else if(player.age >= 11 && player.age <= 17){
		return "remaja";
	}else if(player.age >= 18 && player.age <= 30){
		return "dewasa";
	}else if(player.age >= 31 && player.age <= 60){
		return "orang tua";
	}else if(player.age >= 61){
		return "gg dewa"
	}else{
		return "balita";
	}
}

function generateWinRate(){
	const win_rate = (player.win / player.total_match) * 100;
	return win_rate;
}

function hero(id, name, att, def) {
	return {id, name, att, def}
}

function interaction(request, response){
	console.log("url yang diakses: ", request.url);
	if(request.url == "/"){
		response.writeHead(200, {'content-Type': "text/html"});
		response.write(`
		<html>
		<head>
		<title>Edwin Node Js</title>
		</head>
		<body style="background: #555; color: #fff; height: 100vh; width: 100%;">
		<h1>
		<marquee>I'M a ${myName}</marquee>
		</h1>
		<h3>usia saya : ${player.age}</h3>
		<h3>daya golongan : ${generateAge()}</h3>
		</body>
		</html>`);
	}
	else if(request.url == "/player"){
		response.writeHead(200, {'content-Type': "text/html"});
		response.write(`
		<html>
		<head>
		<title>Edwin Node Js</title>
		</head>
		<body style="background: #555; color: #fff; height: 100vh; width: 100%;">
		<h1>
		<marquee>DATA PLAYER</marquee>
		</h1>
		<h3>id : ${player.id}</h3>
		<h3>nama pemain : ${player.name}</h3>
		<h3>total match : ${player.total_match}</h3>
		<h3>total win : ${player.win}</h3>
		<h3>total lose : ${player.lose}</h3>
		<h3>winrate : ${generateWinRate()}</h3>
		<h3>saldo user : ${toRupiah.convert(player.saldo)}</h3>
		</body>
		</html>`);
	}
	else if(request.url == "/items"){
		response.writeHead(200, {'content-Type': "application/json"});
		const itemList = JSON.stringify(items);
		response.write(itemList);
	}
	else if(request.url == "/hero"){
		response.writeHead(200, {'content-Type': "application/json"});
		const heroList = JSON.stringify(hero(1, "balmond", 80, 60));
		response.write(heroList);
	}
	else{
		response.writeHead(404, {"Content-Type": "text/html"});
		response.write(
			`<html><body><h1>404 BRO SORRY LO MAU NGAPAIN?</h1></body></html>`
		);

	}
	return response.end();
}

const port = 3000;
const server = http.createServer(interaction);

server.listen(port, function(error){
	if(error){
		return console.log("error woy gk liat napa");
	}
	console.log("server nyala cuyy")
});

