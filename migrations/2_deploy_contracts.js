var CitexToken = artifacts.require("./contracts/CitexToken.sol");

module.exports = function(deployer) {
  deployer.deploy(CitexToken);
};
