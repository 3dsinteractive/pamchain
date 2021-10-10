default:
	echo "nothing to do with default make"
truffle-init:
	yarn truffle init
truffle-compile:
	yarn truffle compile
truffle-abigen:
	yarn truffle run abigen
install-typechain:
	yarn add --dev typechain
	yarn add --dev @typechain/web3-v1
typechain-gentypes:
	yarn generate-types