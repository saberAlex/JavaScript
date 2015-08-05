The file for mongoDB configuration is in this path: /etc --> /etc/mongod.conf
it contains the configuration... 
the command to start the mongodb server with some configuration: 
mongodb --config /etc/mongo.conf --journal --> check later in the internet
create database: use <databasename>
	db.<collection name>.insert({<give JSON object >}) --> this is to make collection and insert
	db.<collection name>.find();

How to insert a document in collections

We can just using a javascript object and to save it  using 
db.<collection name>.save(<javascript object>);


We can also drop the database... Wow.. 
in order to drop the data base we need to be in the database first..  using this command: use <databasename>
and then we can simply use this command: db.dropDatabase();

Creating a collection -> db.createCollection(name, options);
more information in this: http://docs.mongodb.org/manual/reference/method/db.createCollection/
the name parameter... 
example with option
db.createCollections("weapon", {capped:true, autoIndexId: true, size: 11213, max:123123});
the option size is more important than max; size precedences the max. 

dropping a collections: 
first we go to the correct database
"show collections" to show all the collection
db.<collection name>.drop(); --> this will return boolean; true if it correctly drop the database

insert javascript file to insert to the DB.. 
we put the command into a javascript file and we can simply using load(<file path>);
we can print prettily using .pretty(); --> this is for easier look.. 

Inserting array of document into collection. 
we can just create a "var" in java and then we put the object there:
example 
var weapon = [
 {
 	name: "oathkeeper"
 }, {
 	name: "oblivion
 }
]
and then we pass the variable into the insert command 
db.<collection name>.insert(weapon);
example: in the ./weapon.js

to get specific query we just put information into the command. 
example: db.weaponList.find({"name": "oblivion" }).pretty()
we can use any attribute, there is another variant.. $eq
Example: db.weaponList.find({"name": {$eq: "oblivion"} })
This can be done for any attribute the data have.. neat.. 

Reading document with $lt, $gt --> this is the lesser than and greater than 
Example: db.weaponList.find({"power": {$lt: 1500} })
Example: db.weaponList.find({"power": {$gt: 1500} })