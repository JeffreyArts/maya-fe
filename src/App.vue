<template >
  <router-view />
</template>


<script setup lang="ts">
    

import LocalDB from "@/stores/localdb"
const localDB = LocalDB()
localDB.load()
</script>

<style src="./assets/scss/index.scss"></style>
