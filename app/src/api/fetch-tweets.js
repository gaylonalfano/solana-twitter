import { Tweet } from "@/models";
// NOTE Pass entire 'workspace' and destructure 'program' from it
export async function fetchTweets({ program }) {
  // NOTE The 'program' can have many different account types
  // which are accessed via program.account.X
  // NOTE 'program' is reactive and wrapped in Ref, so need .value
  const tweets = await program.value.account.tweet.all();
  // NOTE The program.value.account.tweet returns an object containing
  // a publicKey and account object, which is what our Tweet model constructor
  // needs to create a new Tweet object.
  return tweets.map((tweet) => new Tweet(tweet.publicKey, tweet.account));
}
