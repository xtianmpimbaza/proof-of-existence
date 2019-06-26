<h1>Proof of exisitence app.</h1>

This project is a Truffle project that allows you to save recorded media to blockchain.


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
Clone the repo

```
git clone git@github.com:xtianmpimbaza/proof-of-existence.git
```
Clone backend repo
Install npm modules
```
npm install
```

Start ganache-cli in your terminal and metamask in your google chrome

Start the app
```
npm run dev
```
For the dap to work, the backend and ipfs should be working.
Backend repository is <a target="_blank" href="https://github.com/xtianmpimbaza/proof-of-exisitence-backend">Here</a>