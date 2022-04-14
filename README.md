# vv-test

## Run the application in your local machine
```bash
move to the server directory to run the backend: [cd ./server]

move to the client directory to run the frontend: [cd ./client]
```

## Objective

The objective of the excerise is to create a simple React and backend app for viewing image datasets in the data folder. 

The example datasets consist of samples *case-1* and *case-2*, which each consist of n images. Sets and images are to be read dynamically from the given root folder.

![image wireframe](./wireframe.png)

### Navigation
The upper navigation arrows (*Previous, Next*) switch between datasets in alphabetical order (*case-1, case-2, case-n*). The title is the name of the case (*case-1*).

The buttons below the image (*Previous image, Next image*) flip through the chose dataset images alphabetically (*0.png, 1.png, n.png* etc.), and are either disabled at the beginning or end of the images set, or respectively jump directly to the beginning or end .

Landing on the frontpage shows the first dataset and first image of that dataset.

### Rotation

By pressing the rotate button, the image in view rotates clockwise 90 degrees, and can be rotated a full 360 degrees by clicking it four times.

### Backend configuration

A simple yaml file with a single key-value pair ```datafolder: /path/to/data``` pointing to the given data folder is sufficient.




## Requirements
### Tools

The frontend part is expected to be React, while the backend app/lib/tool choices are flexible.

### Style

Not important as long as the functionality is there, ie. we are not looking for an exact copy of the wireframe image.

### Documentation

Simple user guide describing installation, configuration and running the application. 

### Coding style

Readable.

### Commits

Please commit changes with comments, not the entire solution at one go once it's ready.

### Publishing

Once done, publish the result under your own Github account and provide URL to us. 


### Extra points
- Dockerfile/s
- Unit tests

### More

We value a sincere and concise attempt at the problem equally as much as a complete, finished solution. 



