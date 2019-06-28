<h1>Proof of exisitence app.</h1>

This project is a Truffle project that allows you to save recorded media to blockchain.
I have used petshop box

The network to be run on is configured in truffle-config.js as it was programmed on windows. To run it on linux the file should be renamed to truffle.js
<h2>Description:</h2>
This application allows users to prove existence of some information by
showing a time stamped picture/video.
Data is stored in a database, pictures are sored on ​IPFS​ and their hashes are stored in a smart contract that is referenced at later to verify the
authenticity.

<h3>User Stories:</h3>
A user logs into the web app. The user can upload image to the
app, as well as add a title summarising contents of the media stored.

The app reads the user’s address and shows all of the data that they have previously
uploaded.
Users can retrieve necessary reference data about their uploaded items to allow other
people to verify the data authenticity.

<h3>How to install:</h3>

For the dap to work, the backend and ipfs should be running.
Backend repository is https://github.com/xtianmpimbaza/poe-backend

Clone the repo

```
git clone git@github.com:xtianmpimbaza/proof-of-existence.git
```
Install npm modules
```
npm install
```

Start ganache-cli in your terminal and metamask in your google chrome

Migrate the contract
```
truffle migrate
```

Start the app
```
npm run dev
```