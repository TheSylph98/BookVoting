App = {
  web3Provider: null,
  contracts: {},
  account: '0x0',

  init: async function() {
    $.getJSON('../book.json', function(data) {
      var booksRow = $('#booksRow');
      var bookTemplate = $('#bookTemplate');

      for (i = 0; i < data.length; i++ ){
        bookTemplate.find('.panel-title').text(data[i].name);
        bookTemplate.find('img').attr('src', data[i].picture);
        bookTemplate.find('.book-author').text(data[i].author);
        bookTemplate.find('.book-date').text(data[i].date);
        booksRow.append(bookTemplate.html());
      }
    });
    return await App.initWeb3();
  },

  initWeb3: async function() {
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
        App.web3Provider = new Web3.providers.HttpProvider('http://localhost:7545');
      }
      web3 = new Web3(App.web3Provider);
          return App.initContract();
  },

  initContract: function() {
    $.getJSON("BookVoting.json", function(data) {
      // Khoi tao 1 hop dong truffle moi
      App.contracts.BookVoting = TruffleContract(data);
      // ket noi web3 de tg tac voi contract
      App.contracts.BookVoting.setProvider(App.web3Provider);

      App.listenForEvents();

      return App.render();
    });
  },

  // Listen for events emitted from the contract
  listenForEvents: function() {
    App.contracts.BookVoting.deployed().then(function(instance) {
      instance.votedEvent({}, {
        fromBlock: 0,
        toBlock: 'latest'
      }).watch(function(error, event) {
        console.log("event triggered", event)
        // Reload when a new vote is recorded
      //  App.render();
      //alert('Ban da vote thanh cong');
      });
    });
  },

  render: function() {
    var bookvInstance;
    var loader = $("#loader");
    var content = $("#content");
    loader.show();
    content.hide();

    web3.eth.getCoinbase(function(err, account){
      if (err === null) {
        App.account = account;
        $("#accountAddress").html("Your Account: " + account);
      };
    });

    // Load contract data
    App.contracts.BookVoting.deployed().then(function(instance) {
      bookvInstance = instance;
      return bookvInstance.booksCount();
    }).then(function(booksCount) {
      var bookResults = $('#Results');
          bookResults.empty();

      var bookSelect = $('#booksSelect');
          bookSelect.empty();

      for (var i = 1; i <= booksCount; i++) {
          bookvInstance.books(i).then(function(book) {
          var id = book[0];
          var name = book[1];
          var voteCount = book[5];

          // Render vote book Result
          var bookTemplateVote = "<tr><th>" + id + "</th><td>" + name + "</td><td>" + voteCount + "</td></tr>"
          bookResults.append(bookTemplateVote);

          // Render book ballot option
          var bookOption = "<option value='" + id + "' >" + name + "</ option>"
          bookSelect.append(bookOption);
        });
      }
      return bookvInstance.voters(App.account);
      }).then(function(hasVoted) {
        // Do not allow a user to vote
        if(hasVoted) {
          $('form').hide();
        }
        loader.hide();
        content.show();
      }).catch(function(error) {
        console.warn(error);
      });
},

    castVote: function() {
    var bookId = $('#booksSelect').val();
    App.contracts.BookVoting.deployed().then(function(instance) {
      return instance.vote(bookId, { from: App.account });
    }).then(function(result) {
      // Wait for votes to update
      $("#content").hide();
      $("#loader").show();
    }).catch(function(err) {
      console.error(err);
    });
  },

    };

$(function() {
  $(window).load(function() {
    App.init();
  });
});
