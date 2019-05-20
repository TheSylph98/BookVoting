pragma solidity ^0.5.0;

 contract BookVoting {

    // kieu bien book
    struct Book {
      uint id;
      string name;
      string author;
      string date;
      string picture;
      uint voteCount;
      }
    // doc va ghi sach de cu
    mapping(uint => Book) public books;

    // luu account da vote
    mapping(address => bool) public voters;

    // so sach de cu
    uint public booksCount;

    // voted event
    event votedEvent (
        uint indexed _bookId
    );

    // ham Khoi tao constructor
    constructor() public {
      addBook("Dawn","images/2.jpg","Selahattin Demirtas","2019-04-23");
      addBook("Looking at Pictures","images/4.jpg","Robert Walser","2019-01-20");
      addBook("Becoming","images/5.jpg","Michelle Obama","2018-11-13");
      addBook("The Iliad","images/7.jpg","Unknown","2019-03-12");
      }

    //them sach de cu
    function addBook(string memory _name,string memory _picture ,string memory _author,string memory _date) private {
      booksCount++;
      books[booksCount] = Book( booksCount, _name,_picture,_author,_date, 0);
    }

    function vote (uint _bookId) public {

      require(!voters[msg.sender]);
      require(_bookId > 0 && _bookId <= booksCount);
      voters[msg.sender] = true;
      books[_bookId].voteCount ++;
      emit votedEvent(_bookId);
    }
 }
