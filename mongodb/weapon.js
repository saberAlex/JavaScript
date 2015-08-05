var weapon = [ 
 {
 	name: "oblivion", 
 	power: 1000
 },
 {
 	name: "ultima weapon",
 	power: 2000
 }
];

db.weaponList.insert(weapon);
db.weaponList.insert( 
	{
		name:"oathkeeper",
		power: 12345
	}, 
	{
		name: "kingdom key",
		power: 2000
	}

);