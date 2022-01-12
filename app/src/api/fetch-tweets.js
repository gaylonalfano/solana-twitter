import { Tweet } from "@/models";
import bs58 from "bs58";
// NOTE Pass entire 'workspace' and destructure 'program' from it
export async function fetchTweets({ program }, filters = []) {
  // NOTE The 'program' can have many different account types
  // which are accessed via program.account.X
  // NOTE 'program' is reactive and wrapped in Ref, so need .value
  const tweets = await program.value.account.tweet.all(filters);
  // NOTE The program.value.account.tweet returns an object containing
  // a publicKey and account object, which is what our Tweet model constructor
  // needs to create a new Tweet object.
  return tweets.map((tweet) => new Tweet(tweet.publicKey, tweet.account));
}

export function authorFilter(authorBase58PublicKey) {
  return {
    memcmp: {
      // NOTE We know this value when we computed size of Tweet account.
      // Recall that whenever a new account is created, a DISCRIMATOR of
      // exactly 8 bytes will be added to beginning of data. See episode 3.
      offset: 8, // Discrimator
      bytes: authorBase58PublicKey,
    },
  };
}

export function topicFilter(topic) {
  return {
    memcmp: {
      offset:
        8 + // Discrimator
        32 + // Author public key
        8 + // Timestamp
        4, // Topic string prefix
      // bytes = base-58 encoded array of bytes (e.g., publicKey.toBase58(), bs58.encode(buffer) )
      // NOTE Need to import bs58
      bytes: bs58.encode(Buffer.from(topic)),
    },
  };
}
