import { inject, provide, computed } from "vue";
import { useAnchorWallet } from "@solana/wallet-adapter-vue";
import { Connection, PublicKey } from "@solana/web3.js";
import { Provider, Program } from "@project-serum/anchor";
import idl from "../../../target/idl/solana_twitter.json";

// NOTE Must 'anchor deploy' to create metadata.address var
// containing the program ID of our program
const programId = new PublicKey(idl.metadata.address);
const workspaceSymbol = Symbol();

// Allows use to access the Anchor Workspace object we've initialized
export const useWorkspace = () => inject(workspaceSymbol);

// Initialize the Anchor Workspace context object that has everything we need
export const initWorkspace = () => {
  // NOTE Connection + Wallet = Provider
  const wallet = useAnchorWallet();
  // NOTE This is our JSON RPC Validator
  const connection = new Connection("http://127.0.0.1:8899");
  // NOTE Provider needs to be computed property since you can swap wallets
  const provider = computed(() => new Provider(connection, wallet.value));
  // NOTE IDL + Provider = Program. Computed since Provider is reactive
  const program = computed(() => new Program(idl, programId, provider.value));

  provide(workspaceSymbol, {
    // Provided data here...
    // NOTE I can import these props from useWorkspace();
    wallet,
    connection,
    provider,
    program,
  });
};
