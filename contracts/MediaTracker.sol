pragma solidity ^0.5.0;

contract MediaTracker {

    //Read users enrolement status
    mapping(address => bool) public enrolled;

    mapping(address => uint) public usersMedia;
    address owner;

    // structure of media to be saved.
    struct Media {
        string title;
        string _hash;
        bool uploaded;
    }

    constructor() public {
        owner = msg.sender;
        //        enroll();
    }

    //read stored media by id
    mapping(uint256 => Media) private mediaStore;
    //read users wallets storing media
    mapping(address => mapping(uint256 => bool)) private isStored;

    event logEnrolled(address indexed _sender);
    // event MediaCreate(string name);
    event RejectCreate(address account, uint256 uuid, string message);

    event mediaCreate (
        uint indexed _candidateId
    );

    event mediaFound (
        string title, string hash
    );

    modifier isOwner(uint256 uuid){
        require(
            isStored[msg.sender][uuid],
            "You did not upload this file"
        );
        _;
    }

    // modifier isEnrolled(){
    //     require(
    //         enrolled[msg.sender],
    //         "You are not registered"
    //     );
    //     _;
    // }

    // reject duplicate enrollement modifier
    modifier notDupEnrol(){
        require(
            !enrolled[msg.sender],
            "Duplicate enrolement detected"
        );
        _;
    }

    // Reject saving duplicate media modifier
    modifier rejectDupCreation(uint256 uuid){
        require(
            !mediaStore[uuid].uploaded,
            "This media was already created"
        );
        _;
    }

    // reject duplicate enrollement modifier
    function enroll() public notDupEnrol() {
        enrolled[msg.sender] = true;
        emit logEnrolled(msg.sender);
    }
    /*
    This function stores media on the blockchain
    */
    function createMedia(uint256 uuid, string memory title, string memory _hash) public rejectDupCreation(uuid) {
        mediaStore[uuid] = Media(title, _hash, true);
        isStored[msg.sender][uuid] = true;
        usersMedia[msg.sender] ++;
        emit mediaCreate(uuid);
    }

    //Get a single uploaded media
    function getMediaByUUID(uint256 uuid) public {
        emit mediaFound(mediaStore[uuid].title, mediaStore[uuid]._hash);
        //        return (mediaStore[uuid].title, mediaStore[uuid]._hash);
    }

    // checking if the a user ownos a media in the media store
    function isOwnerOf(uint256 uuid) public view isOwner(uuid) returns (bool){
        return (mediaStore[uuid].uploaded);
    }

    //   counting how many media a user has
    function userMediaCount() view public returns (uint){
        return (usersMedia[msg.sender]);
    }

}