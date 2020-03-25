# Assignment: Create A Multi-Service Multi-Node Web App

## Goal: create networks, volumes, and services for a web-based "cats vs. dogs" voting app.
Here is a basic diagram of how the 5 services will work:

![diagram](./architecture.png)
- All images are on Docker Hub, so you should use editor to craft your commands locally, then paste them into swarm shell (at least that's how I'd do it)
- a `backend` and `frontend` overlay network are needed. Nothing different about them other then that backend will help protect database from the voting web app. (similar to how a VLAN setup might be in traditional architecture)
- The database server should use a named volume for preserving data. Use the new `--mount` format to do this: `--mount type=volume,source=db-data,target=/var/lib/postgresql/data`

### Services (names below should be service names)
- vote
    - bretfisher/examplevotingapp_vote
    - web front end for users to vote dog/cat
    - ideally published on TCP 80. Container listens on 80
    - on frontend network
    - 2+ replicas of this container

- redis
    - redis:3.2
    - key/value storage for incoming votes
    - no public ports
    - on frontend network
    - 1 replica NOTE VIDEO SAYS TWO BUT ONLY ONE NEEDED

- worker
    - bretfisher/examplevotingapp_worker:java
    - backend processor of redis and storing results in postgres
    - no public ports
    - on frontend and backend networks
    - 1 replica

- db
    - postgres:9.4
    - one named volume needed, pointing to /var/lib/postgresql/data
    - on backend network
    - 1 replica
    - remember set env for password-less connections -e POSTGRES_HOST_AUTH_METHOD=trust

- result
    - bretfisher/examplevotingapp_result
    - web app that shows results
    - runs on high port since just for admins (lets imagine)
    - so run on a high port of your choosing (I choose 5001), container listens on 80
    - on backend network
    - 1 replica

## My Solution

```bash
# Logged into ssh node1 from the terminal

# First setting up the two networks backend and frontend:
'root@node1:~# docker network create --driver overlay backend'
'root@node1:~# docker network create --driver overlay frontend'
# Starting to create the database services:
'root@node1:~# docker service create --name db --mount type=volume,source=db-data,destination=/var/lib/postgresql/data --network backend -e POSTGRES_HOST_AUT H_METHOD=trust postgres:9.4'
'root@node1:~# docker service create --name redis --network frontend redis:3.2'
# Then setting up the frontend vote service and backend result service:
'root@node1:~# docker service create --network frontend -p 80:80 --replicas 3 --name vote bretfisher/examplevotingapp_vote'
'root@node1:~# docker service create --network backend -p 5001:80 --name result bretfisher/examplevotingapp_result'
# And finally setting up the worker service to map the databases together.
'root@node1:~# docker service create --name worker --network frontend --network backend bretfisher/examplevotingapp_worker:java'
```

It doesn't seem too important to start the services in a given order, if you start with the worker for example it will just crash and restart until the other services are good to go. But in my opinion it's cleaner to do it in a given order.

[Back To Docer_Mastery readme.md](../readme.md)
