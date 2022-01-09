<script setup>
import {initWorkspace} from "@/composables"
// Initialize the Anchor Workspace object so its data is
// available to all child/descendants
initWorkspace();
</script>

<template>
    <slot></slot>
</template>
