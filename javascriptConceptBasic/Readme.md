First run this one:
sudo chown -R luca ~/.config
sudo chown -R luca ~/.cache

this is to fix something relate to the issue of unable to fix/modify the program. 
Next, while doing bower installation, I got a slight error. 
unable to fix the Argument to path.join must be string. 
This is resolved by changing the bower version:

in the dependency package, it's mentioned:
    "bower": "^1.3.1"
what I did: changing the version into "bower": "^1.3.6"


This is to do with the pokemon game:
Look at this link:
http://pastebin.com/rqBxYVv0