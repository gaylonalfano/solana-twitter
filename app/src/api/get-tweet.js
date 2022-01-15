import { Tweet } from "@/models";

// Pass in the Anchor 'workspace' object and an instance of Solana's PublicKey class
export async function getTweet({ program }, publicKey) {
  // NOTE Reference /tests/solana-twitter.ts where we do a single fetch on chain
  const tweetAccount = await program.value.account.tweet.fetch(publicKey);
  // Return a compatible Tweet structure (model) that works with our frontend
  // NOTE The program.value.account.tweet returns an object containing
  // a publicKey and account object, which is what our Tweet model constructor
  // needs to create a new Tweet object.
  return new Tweet(publicKey, tweetAccount);
}
