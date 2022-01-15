<script setup>
import {ref} from 'vue'
import {fetchTweets} from '@/api'
import TweetForm from '@/components/TweetForm'
import TweetList from '@/components/TweetList'
import {useWorkspace} from '@/composables'

const tweets = ref([])
const loading = ref(true)
// NOTE Pass the 'workspace' object as param. fetchTweets() will destructure
// the 'program' from 'workspace'.
fetchTweets(useWorkspace())
    .then(fetchedTweets => {
        tweets.value = fetchedTweets
        // console.log(tweets.value)
    })
    .finally(() => loading.value = false)

const addTweet = tweet => tweets.value.push(tweet)
</script>

<template>
    <tweet-form @added="addTweet"></tweet-form>
    <tweet-list :tweets="tweets" :loading="loading"></tweet-list>
</template>
