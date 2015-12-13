# Stories-crawler mongodb deployment on EC2 / EB

## Setting up MongoDB on Amazon EC2 instance

1. Create an EC2 instance in the correct region, the instance should become visible in the Amazon console in a few minutes  
(this part is slightly more complicated as you will need the various keys and permissions configured from the eb cli, but I won't cover that here)
 
2. Log into the instance 

	```
	ssh -i "C:\Users\{userName}\.ssh\{storageKeyName}" ec2-user@{instanceIpAddress}
	```

3. Run yum update - this will update linux packages

	```
	sudo yum update
	```

4. Update the mongodb.repo config (edit with nano)

	```
	sudo nano /etc/yum.repos.d/mongodb.repo
	```

5. Update the file with text below. This is standard config, don't change anything else.
	```
	[MongoDB]
	name=MongoDB Repository
	baseurl=http://downloads-distro.mongodb.org/repo/redhat/os/x86_64
	gpgcheck=0
	enabled=1
	```

6. Install mongo using
	```
	sudo yum install -y mongodb-org-server mongodb-org-shell mongodb-org-tools
	```

7. Create data dir - this is where the database data will go
	```
	sudo mkdir -p /data/db
	```

8. Edit mongo config
	```
	sudo nano /etc/mongod.conf
	```

9. Update paths to
	```
	dbpath = /data/db
	logpath = /log/mongod.log 
	```

10. run mongo persistently
	```
	sudo mongod --smallfiles --fork --logpath /var/log/mongod.log
	```

Now you have mongodb running. The way you can check everything is ok is by running 

```
mongo {instanceIp}
```
on your local machine. This should connect to the db and allow you to run mongo commands. Ah, but there is a catch. If you run the command you will probably get a CONNECTION_REFUSED. At the moment you cannot access it from the outside. If you check the console window where you started mongod, you will notice it started the process on the port 27017. You will need to enable this port to be allowed as inbound traffic on your EC2 instance. 

How to do that

1. Go to your EC2 instance

2. Under security groups, select the security group

3. Create a new TCP inbound rule to port 27017 and IP 0.0.0.0/0

Now if you run 
```
mongo {instanceIp}
```
from your local machine, you should be able to connect.


## Resources used 
https://www.youtube.com/watch?v=ycBgqPrI_M0

https://gist.githubusercontent.com/jordancalder/6817ef9bf045f1262eab/raw/3441096ef9ba29a17a1c6f49b2aa45344ac50a30/gistfile1.txt


