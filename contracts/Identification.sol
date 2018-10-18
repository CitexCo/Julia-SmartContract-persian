pragma solidity ^0.4.24;

import "openzeppelin-solidity/contracts/ownership/Ownable.sol";

contract Identification is Ownable {

    event UserUpdated(string _emailHash, uint256 _balance);

    mapping (string => uint256) userInfo;
    
    string[] public emails;

    function setUserInfo(string _emailHash, uint256 _balance) public onlyOwner returns (bool) {
        emails.push(_emailHash);
        
        userInfo[_emailHash] = _balance;

        emit UserUpdated(_emailHash, _balance);
        return true;
    }

    function getUserInfo(string _emailHash) public view returns (uint256) {
        return userInfo[_emailHash];
    }
    
    function getUserByIndex(uint256 _index) public view returns (string, uint256) {
        string memory _emailHash = emails[_index];
        uint256 _balance = userInfo[_emailHash];
        return (_emailHash, _balance);
    }

}