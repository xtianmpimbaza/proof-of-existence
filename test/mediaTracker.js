var MediaTracker = artifacts.require("./MediaTracker.sol");

contract("MediaTracker", function(accounts) {

    it("initializes sender to owner", function() {
        return MediaTracker.deployed().then(function(instance) {
            acc = accounts[0];
            return instance.enroll({ from: acc });
        }).then(function(_sender) {
            assert.equal(_sender.logs.length, 1, "an event was triggered");
            assert.equal(_sender.logs[0].event, "logEnrolled", "the event type is correct");
            assert.equal(_sender.logs[0].args._sender, acc, "Sender was enrolled");
        });
    });

    it("testing create media", function() {
        return MediaTracker.deployed().then(function(instance) {
            acc = accounts[0];
            return instance.createMedia(1, 'cloass zoom event','qsmhsjfb',{ from: acc });
        }).then(function(create_med) {
            assert.equal(create_med.logs.length, 1, "an event was triggered");
            assert.equal(create_med.logs[0].event, "mediaCreate", "the event type is correct");
        });
    });

    it("testing retrieving media by id", function() {
        return MediaTracker.deployed().then(function(instance) {
            acc = accounts[0];
            return instance.getMediaByUUID(1,{ from: acc });
        }).then(function(create_med) {
            assert.equal(create_med.logs.length, 1, "an event was triggered");
            assert.equal(create_med.logs[0].event, "mediaFound", "the event type is correct");
        });
    });

});