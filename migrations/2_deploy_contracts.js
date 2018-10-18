var CitexToken = artifacts.require("./citexToken.sol");

module.exports = function(deployer) {
  deployer.deploy(CitexToken);
};
