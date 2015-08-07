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


another comparison operation such as: $gte - $lte
more explanation about this is in this link: http://docs.mongodb.org/manual/reference/operator/query-comparison/
we also has $exist operator, 
more about exist: http://docs.mongodb.org/manual/reference/operator/query/exists/


to update is using db.<collecction name>.update( { <object criteria> }, {<field we want to update>})
we have also upsert: true --> if there is not matching in the critaria.. it will create a new object. 

db.<collection name>.remove({<matching object>}); -->
if there is no parameter given it will delete all of the document.
more information:
http://docs.mongodb.org/…/refe…/method/db.collection.remove/

you can also sort the query result by adding another method after find.
db.orders.find().sort( { amount: -1 } )

we create index to faster for query the data from the database
it can fasten the searching..
in mongo db if we don;t give index it usually it will lopp through..
in mongo db the index is the binary tree index..
Understanding the impact of indexes in mongodb

IMPACT ON INDEXES
this is really neat thing to find the server info and we can access my computer as a server we can find the information about the host using the mongo db explain method.. and this is pretty neat.
> db.test.find({name: "agastya"}).explain()

"serverInfo" : {
"host" : "cs-wifi-226.cs.st-andrews.ac.uk",
"port" : 27017,
"version" : "3.0.4",
"gitVersion" : "0481c958daeb2969800511e7475dc66986fa9ed5"
},
"ok" : 1

Creating index in mongodb...
lets create an index.
> db.test.createIndex({<key we want to index>})

Finding indexes in the collection..
db.test.getIndexes()
and we can also drop the indexes... like such:
db.<collection name>.dropIndex({name:1})

Mongodb is automatically create an object id for us.
(or usually can be accessed by _id)

Understanding object Id that mongodb create for us automatically
the object id is combination..

Object id (in mongoDB)
immutable.. it cannot be modified once it created.
it is unique..
bson data type
it 12 byte value.. combination of hostname.. and everything..
How mongo db create their object ID..
We also an create our own object ID.
we can also create and _id to my field:

to get the time:
db.test.find()[1]._id.getTimestamp()...
if we use the index that is being created by mongodb.. we can see the timestamp
disadvanteage ob using builtin mongodb object id.
suppose: in term of web application

Aggregation Framework in mongodb...
what is aggregation framework? perform count to get number.. group by?

Aggregation?
	* Process data records and return results
	* Group values from various documents in collection together
	* Perform various operation on the groupped data


db.collectionName.aggregate( <opertaion to be performed>); 
example: $sum, $avg 
for more information: http://docs.mongodb.org/manual/core/aggregation-introduction/
example of use in the weapon.js

Sorting by power ascending order: 
db.weaponList.find().sort({power:1})
if we want the descending order we use 
db.weaponList.find().sort({power:-1})
//we can also print the document in natural order:
db.weaponList.find().sort({"$natural": 1}).pretty();


Data modeling in MongoDB:
in mongoDb we have very flexible schema design. 
	* Document Structure
	Key of modelling:
		* Structure of Documents
		* Relations between data.
	* Document Structure:
	Tools to represent the relationships:
	> References
	> Embedded Data

Data modeling using References:
reference another collection to other documents. 

Data modeling using Embedded Data!!!
For further information: http://docs.mongodb.org/manual/core/data-modeling-introduction/

Relationships in MongoDB
* there are three types of realtionship
	> One to One (1:1) Relationship
	> One to Many (1:N) Relationship
	> Many to Many (M:N) Relationship

We can do linking and referencing. 
(One to One)
(Many to many)
We can use the two way embedding


Creating User in MongoDB
getting the list of user: db.getUsers();
Creating a user we use:
responsible for many kind of role: userAdmin
db.createUser({user: "lucareto", pwd:"lucareto", roles:[{role:"userAdmin", db:"classInfo"}]});

Starting mongod server with Authentication.
We can start the mongodb with or without Authentication. 
//VERY IMPORTANT
//VERY IMPORTANT
sudo chown -R luca /data
 mongod --auth
 When we create and limit the access of mongodb using mongodb auth, we need to be in the correct database first. 
 using the "use <dbs name>" command. once there we can use our admin data using this:
 db.auth("user","password");
 //VERY IMPORTANT
 //VERY IMPORTANT

 $natural operator in mongoDB that is being use for sorting.
 when we insert the document 1 2 3.. 
 updated document in the last 

 Question explain() method does not return the execution stat. 
 explain() method are depend on the method and version result. it can return 

 explain() takes 3 parameters "queryPlanner", "executionStats", and "allPlansExecution" which are optimal parameter
 group by name and sum the product 
 example in weapon.js


 Regular Expression in mongoDB
 REGEX is usefull for searching. this is really handy. 
 > use for pattern matching string in query
 to search for a partter or word in any string .
 $regex operator. 
example:
db.weaponList.find({name:{$regex:"ob*"}});
Pattern Matching
$regex $option

Fetching last 'n documents from a colections' >> we can use
db.<collection name>.find().limit(<number of records>);