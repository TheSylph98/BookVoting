var BookVoting = artifacts.require("./BookVoting.sol");

module.exports = function(deployer) {
  deployer.deploy(BookVoting);
};
