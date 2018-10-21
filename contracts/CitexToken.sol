pragma solidity ^0.4.24;

import "openzeppelin-solidity/contracts/token/ERC20/StandardToken.sol";
import "./Identification.sol";

/**
 * @dev CitexToken Contract: An ERC20 Standard contract, non-mintable, non-burnable
 */
contract CitexToken is StandardToken, Identification {

    /**
     * @dev Token fundamental features:
     * name: citex, symbol: cix, total number of tokens: 1M, decimals: 18
     */
    string public name = "citex";
    string public symbol = "cix";
    uint8 public decimals = 18;
    uint256 totalSupply_ = 1000000 * 10**uint256(decimals);

    /**
     * @dev Emits an event on token name changed
     * @param _name string to be sent as new token name
     */
    event ChangeTokenName(string _name);

    /**
     * @dev Emits an Event on token symbol changed
     * @param _symbol string to be sent as new token symbol
     */
    event ChangeTokenSymbol(string _symbol);

    /**
     * Token Initialization the time of contract deployment.
     */
    constructor() {
        balances[owner] = totalSupply_;
    }
        
    bool public restricted = true;
    
    /**
     * @dev returns total supply of token
     * @return A uint256 as total supply of token
     */
    function totalSupply() public view returns (uint256) {
        return totalSupply_;
    }

    /**
     * @dev changes the name of token and emits an event showing new token name
     * @dev Only Owner of the token has permission for this action
     * @param _name a string passed as new token name
     */
    function changeTokenName(string _name) public onlyOwner {
        name = _name;
        emit ChangeTokenName(_name);
    }

    /**
     * @dev changes the symbol of token and emits an event showing new token symbol
     * @dev Only Owner of the token has permission for this action
     * @param _symbol a string passed as new token symbol
     */
    function changeTokenSymbol(string _symbol) public onlyOwner {
        symbol = _symbol;
        emit ChangeTokenSymbol(_symbol);
    }

    /**
     * @dev make 'restricted' flag true. As a result, the source or destination
     * of all token transactions (send or receipt) must be the owner address.
     * @dev Only Owner of the token has permission for this action
     */
    function restrictTransfer() public onlyOwner {
        restricted = true;
    }

    /**
     * @dev make 'restricted' flag false. As a result, the restriction on token transactions (send or receipt) will be removed.
     * @dev Only Owner of the token has permission for this action
     */
    function unrestrictTransfer() public onlyOwner {
        restricted = false;
    }

    /**
     * @dev Transfers a specified amount of token from message sender balance to balance of another address.
     * @dev When token transfer is restricted, owner address must be the source or destination of any transaction.
     * @param _to destination address tokens must be sent to.
     * @param _value amount of tokens must be transfered.
     */
    function transfer(address _to, uint256 _value) public returns (bool) {
        if (restricted) {
            require(_to == owner || msg.sender == owner, "Trade is restricted.");
        }
        super.transfer(_to, _value);
    }
    
    /**
     * @dev Transfers tokens from one address to another
     * @dev When the token transfer is restricted, this action is not allowed
     * @param _from address The address which you want to send tokens from
     * @param _to address The address which you want to transfer to
     * @param _value uint256 the amount of tokens to be transferred
     */
    function transferFrom(address _from, address _to, uint256 _value) public returns (bool) {
        require(restricted == false, "Trade is restricted.");
        super.transferFrom(_from, _to, _value);
    }
    
    /**
     * @dev Approve the passed address to spend the specified amount of tokens on behalf of msg.sender.
     * @dev When the token transfer is restricted, this action is not allowed
     * @param _spender The address which will spend the funds.
     * @param _value The amount of tokens to be spent.
     */
    function approve(address _spender, uint256 _value) public returns (bool) {
        require(restricted == false, "Trade is restricted.");
        super.approve(_spender, _value);
    }

}