App = {
    web3Provider: null,
    contracts: {},
    account: '0x0',

    init: function () {
        return App.initWeb3();
    },
    initWeb3: async function () {
        // Modern dapp browsers...
        if (window.ethereum) {
            App.web3Provider = window.ethereum;
            try {
                // Request account access
                await window.ethereum.enable();
            } catch (error) {
                // User denied account access...
                console.error("User denied account access")
            }
        }
// Legacy dapp browsers...
        else if (window.web3) {
            App.web3Provider = window.web3.currentProvider;
        }
// If no injected web3 instance is detected, fall back to Ganache
        else {
            App.web3Provider = new Web3.providers.HttpProvider('http://localhost:8545');
        }
        web3 = new Web3(App.web3Provider);

        return App.initContract();
    },
    initContract: function () {
        $.getJSON("MediaTracker.json", function (mediatracker) {
            // Instantiate a new truffle contract from the artifact
            App.contracts.MediaTracker = TruffleContract(mediatracker);
            // Connect provider to interact with contract
            App.contracts.MediaTracker.setProvider(App.web3Provider);

            return App.render();
        });
    },
    render: function () {
        var mediaInstance;
        // var loader = $("#loader");
        // var content = $("#content");
        // var voter = $("#voter");
        var newMediaForm = $("#newMediaForm");

        // loader.show();
        newMediaForm.show();
        // content.hide();
        // voter.hide();

        web3.eth.getAccounts(function (error, accounts) {
            if (error) {
                console.log(error);
            }
            var account = accounts[0];
            console.log(account);
            App.account = account;
            $("#accountAddress").html("Current Account: " + account);
        });

        // App.contracts.Election.deployed().then(function(instance) {
        //     mediaInstance = instance;
        //     return mediaInstance.mediasCount();
        // }).then(function(mediasCount) {
        //     var mediasResults = $("#mediasResults");
        //     mediasResults.empty();
        //
        //     for (var i = 1; i <= mediasCount; i++) {
        //         mediaInstance.medias(i).then(function(media) {
        //             var id = media[0];
        //             var name = media[1];
        //             var voteCount = media[2];
        //
        //             // Render media Result
        //             var mediaTemplate = "<tr><th>" + id + "</th><td>" + name + "</td><td>" + voteCount + "</td></tr>"
        //             mediasResults.append(mediaTemplate);
        //         });
        //     }
        //
        //     loader.hide();
        //     content.show();
        // }).catch(function(error) {
        //     console.warn(error);
        // });

    },
    saveMedia: function (id, title, hash) {
        // console.log(hash);
        App.contracts.MediaTracker.deployed().then(function (instance) {

            return instance.createMedia(id,title,hash, {from: App.account});
        }).then(function (result) {

            console.log(result);

        }).catch(function (err) {
            console.error(err);
        });
    },


};

$(function () {
    $(window).load(function () {
        App.init();
    });
});