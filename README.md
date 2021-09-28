<img src="src/images/favicon/android-chrome-192x192.png" alt="app icon" title="app icon" width="70px">

# JazzCatCom: Comedy, Cats and Chris Dave's Hi-hats
A simple application for discovering and saving jazz, cats and comedy!

With JazzCatCom, you can find new jazz videos, cat images/GIFs and jokes, and save them to your collection for future enjoyment.

You can view a demo of the app over on YouTube: <a href="https://www.youtube.com/watch?v=x-QS4K6tN78" target="_blank" title="app demo on YouTube">youtube.com/watch?v=x-QS4K6tN78</a>.

[![YouTube demo](https://img.youtube.com/vi/x-QS4K6tN78/maxresdefault.jpg)](http://www.youtube.com/watch?v=x-QS4K6tN78)

## Online use

The app is available to use for free at <a href="http://jazzcatcom.yndajas.co">jazzcatcom.yndajas.co</a> (link will redirect to GitHub)!

## Local use

You can run a copy of the app offline for local use. After cloning or downloading the repository, follow the instructions below.

### Installation

The following instructions are for Windows Subsystem for Linux/Ubuntu, but it's also possible to run the app on other systems. The only difference should be the method for starting the PostgreSQL server - I don't have instructions for this, but <a href="https://www.postgresql.org" target="_blank">check the PostgreSQL website</a> for more information.

Install Ruby (<a href="https://www.ruby-lang.org/en/documentation/installation" target="_blank" title="Ruby installation">help</a>), then in a terminal:
1. `gem install bundler`
2. change directory to JazzCatCom backend (e.g. `cd /mnt/c/Users/yndaj/Documents/GitHub/JazzCatCom-Comedy-Cats-and-Chris-Daves-Hi-hats/backend`, replacing the path with wherever you've downloaded/moved the repository, followed by `/backend`)
3. `bundle install`
4. if you don't have PostgreSQL installed: `sudo apt-get install postgresql`
5. `sudo service postgresql start` (if you get an error saying a user doesn't exist, try the following first, changing '<USERNAME>' to the username mentioned in the error: `sudo -u postgres createuser --superuser <USERNAME>`)
6. `rake resetdb` - or, if you want to start with a clean database (no test data), run `rake db:drop`, `rake db:create` and `rake db:migrate`

### Usage

You can use the frontend locally with the live/deployed frontend if you prefer, but you can't use the local backend with the live/deployed frontend. Follow the steps below according to how you wish to run the repository locally.

#### Load up the backend server
In a terminal, from the 'JazzCatCom-Comedy-Cats-and-Chris-Daves-Hi-hats' directory:
1. `cd backend`
2. `rails s`
3. go to 'src/scripts/app.js' and comment out the first line below `static get backendBaseUrl() {`, then uncomment the line below that (comments in JavaScript are lines of code prefixed `//`), so that the active line of code is pointing to 'http://localhost:3000/'

#### Load up the frontend server or directly open the HTML file
Either, in a separate terminal instance:
1. `ruby -run -e httpd . -p 8080`
2. open 'localhost:8080' in your browser

or:
1. open 'index.html' from the root folder in your browser

## Contributing

Bug reports and pull requests are welcome on GitHub at [https://github.com/yndajas/JazzCatCom-Comedy-Cats-and-Chris-Daves-Hi-hats](https://github.com/yndajas/JazzCatCom-Comedy-Cats-and-Chris-Daves-Hi-hats).

## Licence

This app is made available open source under the terms of the [MIT License](https://opensource.org/licenses/MIT).

## Credits

External APIs:
- [cats](http://random.cat/meow)
- [jokes](https://official-joke-api.appspot.com/jokes/random) \[[GitHub repository](https://github.com/15Dkatz/official_joke_api)\]

The colour scheme is inspired by Matisse's 'Les Codomas'.
