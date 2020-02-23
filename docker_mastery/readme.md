# Docker Mastery Course

[Link to the course](https://www.udemy.com/course/docker-mastery/)

## Content

* [Creating and Using Docker Containers](#docker-containers)
  * [Docker Networks](#docker-networks)
    * [Concepts](#docker-networks:-concepts)
    * [Defaults](#docker-networks:-defaults)
    * [CLI Management](#docker-networks:-cli-management)
      * [Default Security](#docker-networks:-default-security)
    * [Domain Name System](#docker-networks:-dns)
    * [Assignment](#docker-networks:-assignments)
* [Container Images - where to find them and how to build them](#container-images)
  * [Docker Hub](#docker-hub)
  * [Images and their Layers](#images-and-their-layers)
  * [Image Tagging and Pushing to Docker Hub](#image-tagging-and-pushing-to-docker-hub)
  * [Building Dockerfile](#building-dockerfile)
* [Clean Yo System](#clean-yo-system)

## Docker Containers

Section 3 of the mastery course.

## Docker Networks

### Docker Networks: Concepts

* Review of *docker container run -p*
* For local dev/testing, networks usually "just work"
* Quick port check with *docker container port* *\<container\>*
* Learn concepts of Docker Networking
* Understand how network packets move around Docker

### Docker Networks: Defaults

* Each container connected to a private virtual network "bridge"
* Each virtual network routes through NAT firewall on host IP
* All containers on a virtual network can talk to each other with -p
* Best practice is to create a new virtual network for each app:
  * network "my_web_app" for mysql and php/apache containers
  * network "my_api" for mongo and nodejs containers
* "Batteries Included, But Removable"
  * Defaults work well in many cases, but easy to swap out parts to customize it.
* Make new virtual networks.
* Attach containers to more then one virtual network (or none)
* Skip virtual networks and use host IP (--net=host)
* Use different Docker network drivers to gain new abilities
* and much more...

```bash
docker container run -p 80:80 --name webhost -d nginx
```

-p (--publish)\
Remember publishing ports is always in **HOST:CONTAINER** format

```bash
docker container port webhost
```

List port mappings or a specific mapping for the container. \
Meaning which port forwards traffic to that container from host to the container itself.

```bash
docker container inspect --format '{{ .NetworkSettings.IPAddress }}' webhost
```

You can compare with your own ip address by typing:

```bash
ipconfig
```

Your routers IP-address is the *Default Gateway* value, whereas your computers IP-address is the *IPv4 Address* value.

![How docker networking works](static/docker_network.png)

### Docker Networks: CLI Management

* Show networks *docker network ls*
* Inspect a network *docker network inspect*
* Create a network *docker network create --driver*
* Attach a network to container *docker network connect*
* Detach a network from container *docker network disconnect*

--network bridge\
Default Docker virtual network which is NAT'ed behind the HOST IP\
--network host\
It gains performance by skipping virtual networks but sacrifices security of container model.\
--network none\
removes eth0 and only leaves you with localhost interface in container.\
\
We can also create our own docker network by using *docker network create*, which Spawns a new virtual network for you to attach containers to.

```bash
docker network create my_app_net
```

Creates a network called my_app_net. When we *docker network ls* now we identify the newly spawned virtual network with the network driver **bridge**.\
*network driver = Built-in or 3rd party extensions that give you virtual network features.*\
We may specify what network a certain container should run on by for example:

```bash
docker container run -d --name new_nginx --network my_app_net nginx
```

*docker network connect = Dynamically creates a NIC in a container on an existing virtual network*\
*NIC = [Network Interface Controller](https://en.wikipedia.org/wiki/Network_interface_controller)*

#### Docker Networks: Default Security

* Create your apps so frontend/backend sit on same Docker network
* Their inter-communication never leaves host
* All externally exposed ports closed by default
* You must manually expose via -p, which is better default security!
* This gets even better later with [Swarm](#swarm) and [Overlay](#overlay) networks.

### Docker Networks: DNS

How different containers find each other. It's generally a bad idea to rely on IP's because they may change if you restart containers in different orders. Thus it's very handly to able to reference containers by their container name rather than their IP's.\
*DNS = [Domain Name System](https://en.wikipedia.org/wiki/Domain_Name_System)*

* Understand how DNS is the key to easy inter-container comms
* See how it works by default with custom networks
* Learn how to use --link to enable DNS on defauly bridge network

**Forget IP's**: *Static IP's and using IP's for talking to containers is an anti-pattern. Do your best to avoid it.*

Built in solution to handle it:\
*Docker DNS = Docker daemon has a built-in DNS server that containers use by defauly.*

### Docker Networks: Assignements

#### Docker Networks: CLI App Testing

* Use different Lunix distro containers to check *curl* cli tool version
* Use two different terminal windows to start bash in both centos:7 and ubuntu:14.04, using -it
* Learn the docker container --rm option so you can save cleanup
* Ensure *curl* is installed and on latest version for that distro
  * ubuntu: apt-get update && apt-get install curl
  * centos: yum update curl
* Check *curl --version*

#### Docker Networks: DNS Round Robin Test

* Ever since Docker Engine 1.11, we can have multiple containers on a created network respons to the same DNS address.
* Create a new virtual network (default bridge driver).
* Create two containers from *elasticsearch:2* image.
* Research and use *-network-alias search* when creating them to give them an additional DNS name to respond to.
* Run *alpine nslookup search* with *--net* to see the two containers list for the same DNS name.
* Run *centos curl -s search:9200* with *--net* multiple times until you see both "name" fields show.

## Container images

An image contains:

* App binaries and dependencies
* Metadata about the image data and how to run the image
* Official definition: *"An Image is an ordered collection of root filesystem changes and the corresponding execution paramters for use within a container runtime."*
* Not a complete OS. No kernel, kernel modules (e.g. drivers).
* Really just an application.
* Small as one file (your app binary) like a goland static binary.
* Big as a Ubuntu distro with apt, and Apache, PHP, and more installed.

### Docker Hub

* Basics of [Docker Hub](https://hub.docker.com/)

Searching for images

* Go for the official one for starters
  * The official ones are the only ones without a *name*/*image-name*
  * Offical images always have great documentation
* Images are tagged
  * The latest tag usually means that you get the latest version of that product.
  * If tags are on the same line, that means they are the same version.
  * When you want a product to go into production you almost always want to specify the exact version. This is for compatibiliy.
  * alpine tag means lightweight.
* Another go-to is number of stars and number of pulls.

### Images and Their Layers

* Image layers
* union file system
* *history* and *inspect* commands
* copy on write

docker image history: *Show layers of changes made in image | docker history (old way)*\
docker image inspect: *returns JSON metadata about the image | docker inspect (old way)*

![The layered architecture](static/layered.png)

The layered storage architecture of docker

![How images work](static/layered_drawn.png)

Note that each image starts out with an image with a unique SHA, identifying that specific image. This is how docker can identify if that image is already pulled, and thus if you pull it again you may use it cached instead of having to pull it down from docker hub again.\
This also means that if you base a container on ubuntu more than one time, you use the same ubuntu base image for each container, thus it takes no more storage space than using just one ubuntu.\
As you see in the picture above each image may be uniquely designed, but may still be built from the same cached base image.\
This also happens for the same operations in the above stages, if you would perform the same operations on two different images it would only store the operation once, but use it for the two different images.\
Copy on write: Happens when you run a container, then you copy the image it's based on and writes to that container during runtime.

### Image Tagging and Pushing to Docker Hub

* All about image tags
* How to upload to Docker Hub
* Image ID vs. Tag

docker image tag: *assign one or more tags to an image | docker tag (old way)*\
docker image push: *uploads changed layers to an image registry (default is Hub)*\
docker login (server): *Defaults to logging in Hub, but you can override by adding server url*\
docker logout: *always logout from shared machines or servers when done, to protect your account*\

Images don't really have names, but they have (user)/(repo):(tag), with a default tag of 'latest'.\

NOTE: when logging in to using *docker login* it uses the config.json file which you can find in:
`C:/Users/(user_name)/.docker/config.json`

If you upload an image with the same image ID, it doesn't bother to upload it, becuase the layers already exist. If it has a new tag, it just uploads the new tag with the same id.

### Building dockerfile

About the different layers, so each command in the dockerfile is a layer in the image.\
List of common Dockerfile stanza (commands):

* **FROM**: (required) specificies what image this dockerfile is based upon
* **ENV**: (optional) defined environment variables
* **RUN**: (optional) runs commands: using && is key to be able to execute several commands to fit inside one layer in the image.
* **EXPOSE**: (optional) by default it does not expose any ports, but we may specify this here. However this does not expose ports from our host, that's what we do with the -p (--publish) command when we run the container.
* **CMD**: (required) final command that is run everytime you run a container.
* **WORKDIR**: (optional): when changing directory you should always use this command.
* **COPY**: (optional): copy a file / directory from your source to the container

The Dockerfile is a script of how to run an image. Because it cached the different layers, it doesn't need to install it anew when you run the script again later, unless you've changed a specific layer. This is what makes docker so fast for deployment, because if you only change the source code it's smart enough to have each layered stored and it makes the deployment very fast.

The build will be "using cache" up until it detects a change in a given layer, then if there is a change in a layer it has to run be running that layer and every layer after that. Thus if there is a layer which change very often, say copying your source code, then that layer should be specified as late as possible in the Dockerfile.

[Link to my solution of an assignment related to this topic](section_4/assignment)

## Clean Yo System

It's a good idea to keep your system clean and not let container, images and networks dangle around. Use these to clean up stopped processes:

```docker image prune``` \
to clean up just "dangling" images

```docker system prune``` \
to clean up everything (containers, images and networks)
