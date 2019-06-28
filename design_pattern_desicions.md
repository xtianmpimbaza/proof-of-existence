#Design pattern desicions

The project uses Self Destruction pattern.
Only the owner can destroy the contract.

#Description
Used for terminating a contract, which means removing it forever from the blockchain.
Once destroyed, it’s not possible to invoke functions on the contract and no transactions will be logged in the ledger.

This is done incase the project is terminated.