import dayjs from "dayjs";
// NOTE When we use the Anchor workspace object and pass it
// to our fetchTweets function, the Tweets structure we get back
// doesn't match what our frontend is expecting. Therefore, you can
// see the data in Network > Fetch/HXR > Preview, but it won't
// render on the page.
//
// Therefore, we need to create this new Tweet model that works for
// our frontend and abstracts the data received from the API.
//
// Q: Where is the data structure defined in our code? In the
// Solana program in lib.rs?
export class Tweet {
  constructor(publicKey, accountData) {
    this.publicKey = publicKey;
    this.author = accountData.author;
    this.timestamp = accountData.timestamp.toString();
    this.topic = accountData.topic;
    this.content = accountData.content;
  }
  // NOTE On top of these props, our frontend expects
  // Tweet objects to also have props:
  // key, author_display, created_at, created_ago
  get key() {
    return this.publicKey.toBase58();
  }

  get author_display() {
    const author = this.author.toBase58();
    return author.slice(0, 4) + ".." + author.slice(-4);
  }

  get created_at() {
    return dayjs.unix(this.timestamp).format("lll");
  }

  get created_ago() {
    return dayjs.unix(this.timestamp).fromNow();
  }
}
