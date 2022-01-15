<script setup>
import {ref, watchEffect} from 'vue'
import {fetchTweets, authorFilter} from '@/api'
import TweetForm from '@/components/TweetForm'
import TweetList from '@/components/TweetList'
import {useWorkspace} from "@/composables";

const tweets = ref([])
const loading = ref(true)
const workspace = useWorkspace();
// Use Anchor Workspace object to access 'wallet'
const {wallet} = workspace;

watchEffect(() => {
    // Confirm we have a valid CONNECTED wallet and get its address (ie. author publicKey)
    if (!wallet.value) return
    fetchTweets(workspace, [authorFilter(wallet.value.publicKey.toBase58())])
        .then(fetchedTweets => tweets.value = fetchedTweets)
        .finally(() => loading.value = false)
})

const addTweet = tweet => tweets.value.push(tweet)
</script>

<template>
    <!-- NOTE Can now check our 'wallet' var from useWorkspace() -->
    <div v-if="wallet" class="border-b px-8 py-4 bg-gray-50">{{wallet.publicKey.toBase58()}}</div>
    <tweet-form @added="addTweet"></tweet-form>
    <tweet-list :tweets="tweets" :loading="loading"></tweet-list>
</template>
