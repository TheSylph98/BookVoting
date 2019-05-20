var BookVoting = artifacts.require("./BookVoting.sol");

contract("BookVoting",function(accounts) {
  var bookInstance;

  it("khởi tạo với 4 cuốn sách", function(){
    return BookVoting.deployed().then(function(instance){
      return instance.booksCount();
    }).then(function(count){
      assert.equal(count,4);
    });
  });

   it("khoi tao 4 cuon sach vs gtri chinh xac", function() {
    return BookVoting.deployed().then(function(instance) {
      bookInstance = instance;
      return bookInstance.books(1);
    }).then(function(book) {
      assert.equal(book[0], 1, "id");
      assert.equal(book[1], "Dawn", "name");
      assert.equal(book[2], "images/2.jpg", " picture");
      assert.equal(book[3],"Selahattin Demirtas","author");
      assert.equal(book[4],"2019-04-23","date");
      assert.equal(book[5], 0, "votes count");
      return bookInstance.books(2);
    }).then(function(book) {
      assert.equal(book[0], 2, "id");
      assert.equal(book[1], "Looking at Pictures", "name");
      assert.equal(book[2], "images/4.jpg", " picture");
      assert.equal(book[3],"Robert Walser","author");
      assert.equal(book[4],"2019-01-20","date");
      assert.equal(book[5], 0, "votes count");
      return bookInstance.books(3);
    }).then(function(book){
      assert.equal(book[0], 3, "id");
      assert.equal(book[1], "Becoming", "name");
      assert.equal(book[2], "images/5.jpg", " picture");
      assert.equal(book[3],"Michelle Obama","author");
      assert.equal(book[4],"2018-11-13","date");
      assert.equal(book[5], 0, "votes count");
      return bookInstance.books(4);
    }).then(function(book){
      assert.equal(book[0], 4, "id");
      assert.equal(book[1], "The Iliad", "name");
      assert.equal(book[2], "images/7.jpg", " picture");
      assert.equal(book[3],"Unknown","author");
      assert.equal(book[4],"2019-03-12","date");
      assert.equal(book[5], 0, "votes count");
    });
    });
//  });
    it("allows a voter to cast a vote", function() {
      return BookVoting.deployed().then(function(instance) {
        bookvInstance = instance;
        bookId = 1;
        return bookvInstance.vote(bookId, { from: accounts[0] });
      }).then(function(receipt) {
        return bookvInstance.voters(accounts[0]);
      }).then(function(voted) {
        assert(voted, "the voter was marked as voted");
        return bookvInstance.books(bookId);
      }).then(function(book) {
        var voteCount = book[5];
        assert.equal(voteCount, 1, "increments the book's vote count");
      })
    });

    it("Bo phieu cho doi tg ko ton tai", function() {
    return BookVoting.deployed().then(function(instance) {
      electionInstance = instance;
      return electionInstance.vote(99, { from: accounts[1] })
    }).then(assert.fail).catch(function(error) {
      assert(error.message.indexOf('revert') >= 0, "error message must contain revert");
      return electionInstance.books(1);
    }).then(function(book1) {
      var voteCount = book1[5];
      assert.equal(voteCount, 1, "book 1 did not receive any votes");
      return electionInstance.books(2);
    }).then(function(book2) {
      var voteCount = book2[5];
      assert.equal(voteCount, 0, "book 2 did not receive any votes");
      return electionInstance.books(3);
    }).then(function(book3) {
      var voteCount = book3[5];
      assert.equal(voteCount, 0, "book 3 did not receive any votes");
      return electionInstance.books(4);
    }).then(function(book4) {
      var voteCount = book4[5];
      assert.equal(voteCount, 0, "book 4 did not receive any votes");
    });
  });

  it("Ngan chan bo phieu kep", function() {
    return BookVoting.deployed().then(function(instance) {
      electionInstance = instance;
      bookId = 4;
      //bo 1 phieu vao book_id  = 4
      electionInstance.vote(bookId, { from: accounts[1] });
      return electionInstance.books(bookId);
    }).then(function(book) {
      var voteCount = book[5];
      assert.equal(voteCount, 1, "accepts first vote");
      // Try to vote again
      return electionInstance.vote(bookId, { from: accounts[1] });
    }).then(assert.fail).catch(function(error) {
      assert(error.message.indexOf('revert') >= 0, "error message must contain revert");
      return electionInstance.books(1);
    }).then(function(book) {
      var voteCount = book[5];
      assert.equal(voteCount, 1, "book 1 did not receive any votes");
      return electionInstance.books(2);
    }).then(function(book) {
      var voteCount = book[5];
      assert.equal(voteCount, 0, "book 2 did not receive any votes");
      return electionInstance.books(3);
    }).then(function(book) {
      var voteCount = book[5];
      assert.equal(voteCount, 0, "book 3 did not receive any votes");
      return electionInstance.books(4);
    }).then(function(book) {
      var voteCount = book[5];
      assert.equal(voteCount, 1, "book 4 did not receive any votes");
    });
  });

});
