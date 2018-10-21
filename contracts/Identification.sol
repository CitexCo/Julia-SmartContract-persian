pragma solidity ^0.4.24;

import "./Ownable.sol";

/**
 * @dev The contract stores email hash and associated token balance
 * related to users.
 */
contract Identification is Ownable {

    event UserUpdated(string _emailHash, uint256 _balance);

    mapping (string => uint256) userInfo;
    
    string[] public emails;

    /**
     * @dev Sets number of tokens belongs to a specified user whose email hash is passed.
     * @dev Only the owner of contract has permission for this action.
     * @param _emailHash the email hash of user.
     * @param _balance the token balance of a specified user.
     * @return true if action is done succefully.
     */
    function setUserInfo(string _emailHash, uint256 _balance) public onlyOwner returns (bool) {
        emails.push(_emailHash);
        
        userInfo[_emailHash] = _balance;

        emit UserUpdated(_emailHash, _balance);
        return true;
    }

    /**
     * @dev returns token balance of user associated with  a specified email hash.
     * @param _emailHash the email hash of user.
     * @return token balance of the user determined with its email hash.
     */
    function getUserInfo(string _emailHash) public view returns (uint256) {
        return userInfo[_emailHash];
    }
    
    /**
     * @dev returns user inforamtion indexed in contract.
     * @param _index the index of user information.
     * @return email hash of user and its token balance indexed in contract.
     */
    function getUserByIndex(uint256 _index) public view returns (string, uint256) {
        string memory _emailHash = emails[_index];
        uint256 _balance = userInfo[_emailHash];
        return (_emailHash, _balance);
    }

}