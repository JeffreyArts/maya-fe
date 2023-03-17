<template>
    <i class="spinner">
        {{ keys[key] }}
    </i>
</template>


<script lang="ts">
import { defineComponent } from "vue"

export default defineComponent({
    name: "spinner",
    data: () => {
        return {
            keys: ["⊠","⊞"],
            // keys: ["○","⊙","⊚","◎"],
            key: 0,
            interval: 0
        }
    },
    mounted() {
        this.interval = setInterval(() => {
            this.key = (this.key + 1) % this.keys.length
        }, 100)
    },
    unmounted() {
        clearInterval(this.interval)
    }
})
</script>

<style lang="scss">
// @import "./../assets/scss/variables.scss";
</style>
