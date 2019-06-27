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
    event RejectCreate(address account, uint256 _id, string message);

    event mediaCreate (
        uint indexed _candidateId
    );

    event mediaFound (
        string title, string hash
    );

    modifier isOwner(uint256 _id){
        require(
            isStored[msg.sender][_id],
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
    modifier rejectDupCreation(uint256 _id){
        require(
            !mediaStore[_id].uploaded,
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
    function createMedia(uint256 _id, string memory title, string memory _hash) public rejectDupCreation(_id) {
        mediaStore[_id] = Media(title, _hash, true);
        isStored[msg.sender][_id] = true;
        usersMedia[msg.sender] ++;
        emit mediaCreate(_id);
    }

    //Get a single uploaded media
    function getMediaById(uint256 _id) view public returns (string memory, string memory) {
//        emit mediaFound(mediaStore[_id].title, mediaStore[_id]._hash);
        return (mediaStore[_id].title, mediaStore[_id]._hash);
    }

    // checking if the a user ownos a media in the media store
    function isOwnerOf(uint256 _id) public view isOwner(_id) returns (bool){
        return (mediaStore[_id].uploaded);
    }

    //   counting how many media a user has
    function userMediaCount() view public returns (uint){
        return (usersMedia[msg.sender]);
    }

}