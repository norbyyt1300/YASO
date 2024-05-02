# YASO
Yet Another Shatterpoint Overlay!

1. Install NodeJs from https://nodejs.org/en/download/current

2. Install the web server and socket connection prerequisites using the commands 

cmd.exe /c npm.cmd install express@4
cmd.exe /c npm.cmd install socket.io

3. Run the overlay web server using the command (from within the project folder)

node index.js

4. Add the following local web server URL to OBS as a browser source, and you're done!  

http://localhost:3000/live

You can access the settings page from a separate browser at 

http://localhost:3000


Thank you SO MUCH to the amazing folks who create and run the Shatterpoint Database website (https://shatterpointdb.com/), from which we're pulling the images!