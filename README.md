# Boykiss Chat / GuzioHub Chat
A fork of the famous [Cinny](https://app.cinny.in/) Matrix client, designed to be more Discord-like. My initial plan was to make this a serious public-facing fork, call it Antiwire (a tounge-and-cheeek reference to Discord, as in Dis-/Anti- both being a negation, and wires/cords being largely the same thing), but I gave up on this idea, as I came to the conclusion that Matrix is a somewhat bad platform to emulate Discord with to begin with. I will likely move all my Matrix endeavors to [Fluxer](https://fluxer.app/), as soon as federation starts working properly there (I still want to self-host after all, and doing so without a federation isn't really worth it, as noone would use my instance) - it's another self-hostable, European, independent FOSS-alternative chat system, but that one was build with Discordian concepts in mind from the start, instead of having them bolted on with stacks of increasingly complicated state resolution (eg. a proper role system instead of inflexible power-levels; channels and servers as first-class citizens, instead of servers (spaces) being de-facto channels (rooms) with extra rendering that makes them look like an index). Still, I *am* calling dibs on the name Antiwire! (Part of me still has „What if I build a Discord alternative from scratch, based on AT-Proto?” (BlueSky's/WSocial's federation system) at the back of my head, and if I do so, that's the name I'm going for.)

My current plan was downscaled significantly, as instead, I'll simply have my fork serve 2 different (simple purpouses):
* Boykiss Chat - an Android client of Cinny (or, of my fork of it, with all the Discordisms)
* frontend for GuzioHub Chat (my Matrix service family) - replaces stock Element because Element is ass

## Local development
> [!TIP]
> We recommend using DevContainers as versions change very quickly. You will likely need to switch between multiple Node.js versions based on the needs of different projects you're working on. Recommended nodejs version is Krypton LTS (v24.13.1).

Execute the following commands to start a development server:
```sh
npm ci # Installs all dependencies
npm start # Serve a development version
```

To build the app:
```sh
npm run build # Compiles the app into the dist/ directory
```

### Running with Docker
This repository includes a Dockerfile, which builds the application from source and serves it with Nginx on port 80. To
use this locally, you can build the container like so:
```
docker build -t cinny:latest .
```

You can then run the container you've built with a command similar to this:
```
docker run -p 8080:80 cinny:latest
```

This will forward your `localhost` port 8080 to the container's port 80. You can visit the app in your browser by navigating to `http://localhost:8080`.