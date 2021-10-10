// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.6.0;

import '@openzeppelin/contracts/token/ERC20/ERC20.sol';

contract ERC20Token is ERC20 {

  modifier _control_ {
    require(msg.sender == _controller, "ERR_NOT_CONTROLLER");
    _;
  }

  address internal _controller;

  constructor(
    string memory name, 
    string memory symbol) public ERC20(name, symbol) {
    _controller = msg.sender;
  }

  function mint(
    address to, 
    uint amount) external _control_ {
    _mint(to, amount);
  }
}