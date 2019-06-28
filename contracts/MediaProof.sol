pragma solidity ^0.5.0;

contract MediaProof {
    // to be used in curcuit braker
    bool public contractPaused = false;
    //Read / wtite users enrolement status
    mapping(address => bool) public enrolled;
    // keeps track of amount of media stored by each user
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
    // If the contract is paused, stop the modified function
    modifier checkIfPaused() {
        require(contractPaused == false, "The contract has been stopped");
        _;
    }
    /* Create a modifer that checks if the msg.sender is the owner of the contract */
    modifier onlyOwner(){
        require(
            msg.sender == owner,
            "The user should be owner of the contract"
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
    function createMedia(uint256 _id, string memory title, string memory _hash) public checkIfPaused() rejectDupCreation(_id) {
        mediaStore[_id] = Media(title, _hash, true);
        isStored[msg.sender][_id] = true;
        usersMedia[msg.sender] ++;
        emit mediaCreate(_id);
    }

    //Get a single uploaded media by using its id
    function getMediaById(uint256 _id) public view returns (string memory, string memory) {
        return (mediaStore[_id].title, mediaStore[_id]._hash);
    }

    // circuit braker to stop all public opperations
    function circuitBreaker() public onlyOwner {// onlyOwner can call
        if (contractPaused == false) {contractPaused = true;}
        else {contractPaused = false;}
    }

    // for destructing the contract permanently ()
    function destroyContract() public onlyOwner {
        selfdestruct(msg.sender);
    }
}