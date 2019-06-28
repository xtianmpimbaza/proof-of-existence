var MediaProof = artifacts.require("./MediaProof.sol");

contract("MediaProof", function(accounts) {

    //testing the user enrolement using his/her address
    it("initializes sender to owner", function() {
        return MediaProof.deployed().then(function(instance) {

            acc = accounts[0];  //the first account of ganache cli

            // calling enroll method of the deployed contract
            return instance.enroll({ from: acc });
        }).then(function(_sender) {
            //checking if the returned values are the one expected
            assert.equal(_sender.logs.length, 1, "an event was triggered");
            assert.equal(_sender.logs[0].event, "logEnrolled", "the event type is correct");
            assert.equal(_sender.logs[0].args._sender, acc, "Sender was enrolled");
        });
    });

    it("testing create media", function() {
        return MediaProof.deployed().then(function(instance) {

            acc = accounts[0];  //the first account of ganache cli

            // calling createMedia method of the deployed contract
            return instance.createMedia(1, 'cloass zoom event','qsmhsjfb',{ from: acc });
        }).then(function(create_med) {
            //checking if the returned values are the one expected
            assert.equal(create_med.logs.length, 1, "an event was triggered");
            assert.equal(create_med.logs[0].event, "mediaCreate", "the event type is correct");
        });
    });

    it("testing retrieving media by id", function() {
        return MediaProof.deployed().then(function(instance) {

            acc = accounts[0];
            // calling getMediaById method of the deployed contract
            return instance.getMediaById(1,{ from: acc });
        }).then(function(create_med) {
            //checking if the returned values are the one expected
            assert.equal(create_med[0], "cloass zoom event", "title returned as expected");
        });
    });

});