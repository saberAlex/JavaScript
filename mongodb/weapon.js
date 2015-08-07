var weapon = [ 
 {
 	name: "oblivion", 
 	power: 1000,
 	owner: "sora",
 		defense: {
			rear: 100,
			back: 50
		}
 },
 {
 	name: "ultima weapon",
 	power: 2000,
 	owner: "riku",
 		defense: {
			rear: 100,
			back: 50
		}
 }
];

db.weaponList.insert(weapon);
db.weaponList.insert( [
	{
		name:"oathkeeper",
		power: 12345,
		owner: "sora",
		defense: {
			rear: 20,
			back: 50
		},
		//this is an embedded document. 
		super: {
			name: "Keep the promises",
			attack: 3000000
		}, 
		skills: [
			"piercing",
			"one-hit-kill",
			"omnislash"
		]
	}, 
	{
		name: "kingdom key",
		power: 2000,
		owner: "riku",
		super: {
			name: "Open The Door",
			attack: 200000
		},
		defense: {
			rear: 70,
			back: 50
		},
		skills: [
			"opening the secret",
			"look at me",
			"wondering around"
		]
	},
	{
		name: "avalance",
		power: 3000,
		owner: "sora",
		defense: {
			rear: 100,
			back: 50
		}
	}
]
);


 db.weaponList.aggregate([{$group: {_id:"$owner",total_power:{$sum:1}}}]).pretty(); //this is to query the total weapon group by the owner. 

//using distinct() and count()..
db.weaponList.distinct("owner");
//Finding the unique value in owner 
//give the number of document:
db.weaponList.count();
//counting specific query:
db.weaponList.find({"skills":"look at me"}).count();

//using reduce function
//using the group
db.weaponList.group(
	{
		key:
		{
			"owner": 1
		},
		initial:{
			total:0
		},
		reduce: function(curr, result){
			//this need to be carefull.. some of the data might be null, thus this will resulted in an error
			result.total += curr.defense.rear + curr.defense.back;
		}
		
	}
);

db.weaponList.group({key:{"power":1}});
