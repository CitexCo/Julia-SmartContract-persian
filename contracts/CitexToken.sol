pragma solidity ^0.4.24;

import "openzeppelin-solidity/contracts/token/ERC20/StandardToken.sol";
import "./Identification.sol";

contract CitexToken is StandardToken, Identification {

    uint8 public decimals = 18;
    uint256 totalSupply_ = 1000000 * 10**uint256(decimals);
    string public name = "citex";
    string public symbol = "cix";

    event ChangeTokenName(string _name);
    event ChangeTokenSymbol(string _symbol);

    constructor() {
        balances[owner] = totalSupply_;
    }
        
    bool public restricted = true;
    
    function totalSupply() public view returns (uint256) {
        return totalSupply_;
    }

    function changeTokenName(string _name) public onlyOwner {
        name = _name;
        emit ChangeTokenName(_name);
    }

    function changeTokenSymbol(string _symbol) public onlyOwner {
        symbol = _symbol;
        emit ChangeTokenSymbol(_symbol);
    }

    function restrictTransfer() public onlyOwner {
        restricted = true;
    }

    function unrestrictTransfer() public onlyOwner {
        restricted = false;
    }

    function transfer(address _to, uint256 _value) public returns (bool) {
        if (restricted) {
            require(_to == owner || msg.sender == owner, "Trade is restricted.");
        }
        super.transfer(_to, _value);
    }
    
    function transferFrom(address from, address to, uint256 value) public returns (bool) {
        require(restricted == false, "Trade is restricted.");
        super.transferFrom(from, to, value);
    }
    
    function approve(address spender, uint256 value) public returns (bool) {
        require(restricted == false, "Trade is restricted.");
        super.approve(spender, value);
    }

}