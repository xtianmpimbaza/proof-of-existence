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
        var content = $("#content");
        // var voter = $("#voter");
        var newMediaForm = $("#newMediaForm");

        // loader.show();
        newMediaForm.show();
        content.show();
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

        App.contracts.MediaTracker.deployed().then(function (instance) {
            mediaInstance = instance;
            // var mediasResults = $("#mediasResults");
            $.ajax({
                type: "POST",
                url: "http://localhost/php/getdbmedia.php",
                data: {
                    token: "storedmedia"
                },
                success: function (data) {

                    var mediaArray = JSON.parse(data);
                    for (var i = 0; i < mediaArray.length; i++) {
                        console.log(mediaArray[i]);
                        mediaInstance.getMediaById(mediaArray[i]).then(function (media) {
                            console.log(media);
                            var title = media[0];
                            var hash = media[1];
                            // Render media Result
                            var mediaTemplate = "<tr><th>" + i++ + "</th><td>" + title + "</td><td>" + hash + "</td></tr>"
                            $("#mediasResults").append(mediaTemplate);
                        });
                    }
                }

            })
        });

    },
    saveMedia: function (id, title, hash) {
        // console.log(hash);
        App.contracts.MediaTracker.deployed().then(function (instance) {

            return instance.createMedia(id, title, hash, {from: App.account});
        }).then(function (result) {
            console.log(result);
            location.reload();
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