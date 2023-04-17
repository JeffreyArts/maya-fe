<template>
    <div class="home">
        <div class="home-container">
            <header class="image-container-wrapper">
                <figure class="image-container" :class="[image ? '__hasImage' : '', step == 2 ? '__isProcessing': '']">
                    <img :src="imageComputed" v-if="image" @click="downloadImage">
                </figure>
            </header>
                
            <footer>
                <div class="steps">
                    <record-button v-model="queryInput" class="step" :class="[ step == 2 ?'__isDisabled':'']" @click="resetStep"></record-button>
                    <span class="step" :class="[ step == 1 ?'__isDisabled':'']" @click="requestImage">
                        <icon-processing v-model="state" />
                    </span>
                </div>
            </footer>
                
            <div class="query-input">
                {{ queryInput }}
            </div>

            <a href="https://www.jeffreyarts.nl" target="_blank" class="signature">
                <img src="/signature.png" alt="Jeffrey Arts">
            </a>
        </div>
    </div>
</template>


<script lang="ts">
import {defineComponent} from "vue"
import recordButton from "@/components/record-button.vue"
import iconProcessing from "@/components/icon-processing.vue"
import axios from "axios"
import saveAs from "file-saver"
import _ from "lodash"

export default defineComponent({
    name: "homePage",
    components: { recordButton, iconProcessing },
    props: [],
    data() {
        return {
            queryInput: "",
            step: 1,
            state: "idle",
            query: "",
            language: "nl",
            image: "",
            consoleEvents: [] as Array<string>,
        }
    },
    computed: {
        imageComputed() {
            return `${import.meta.env.VITE_REST_API}${this.image}`
        },
    },
    watch: {
        queryInput: {
            immediate: true,
            handler(newValue, oldValue) {
                if (newValue !== "") {
                    this.step = 2
                    this.state = "processing"
                    this.query = newValue
                    this.requestImage()
                }
            },
        },
    },
    methods: {
        resetStep() {
            this.step = 1
        },
        async requestImage() {
            this.state = "processing"
            this.step = 2

            try {
                const request = await axios.post(`${import.meta.env.VITE_REST_API}/api/maya-images`, {
                    "data": {
                        query: this.query,
                        language: this.language,
                    }
                })
                
                this.image = request.data.data.image.url
                this.state = "ready"
                
                this.step = 3
            } catch (error: Error | any) {
                this.step = 1
                this.state = "error"

                setTimeout(() => {
                    this.state = "ready"
                }, 2000)

                if (error.response) {
                    console.log(error.response.status)
                    console.log(error.response.data)
                } else {
                    console.log(error.message)
                }
            }
        },
        downloadImage() {
            if (!this.image) return
            const name = "maya-symbool.jpg"
            fetch(this.imageComputed)
                .then(function(response) {
                    return response.blob()
                })
                .then(function(blob) {
                    saveAs(blob, name)
                })
        }
    },
})


</script>

<style lang="scss">
@import "@/assets/scss/variables.scss";
.home {
    width: 100%;
    min-height: 100%;
    margin: 0;
}

.home-container {
    padding: 32px 0 0;
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-flow: column;
    max-width: 640px;
    height: 100vh;
    margin: auto;
}

.image-container {
    aspect-ratio: 1/1;
    width: 100%;
    max-width: calc(100vh - 224px);
    border: 8px dotted transparent;
    background-color: #fefff3;
    padding: 8px;
    margin: 0;
    box-shadow: 0px 0px 16px rgba(0,0,0,.08);

    &.__hasImage {
        border-color: #74000e;
        background-color: transparent;
    }

    &.__isProcessing {
        img {
            filter: blur(4px) grayscale(100%);
        }
    }

    img {
        display: block;
        width: 100%;
    };
}

.image-container-wrapper {
    height: 100%;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
}

.steps {
    display: flex;
    justify-content: center;
    flex-flow: row no-wrap;
    margin: 58px 0;
}

.step {
    cursor: pointer;
    display: flex;
    width: 96px;
    aspect-ratio: 1/1;
    border-radius: 100%;
    border: 4px solid #74000e;
    background: transparent;
    justify-content: center;
    align-items: center;
    transition: $transitionDefault;
    
    &.__isDisabled {
        cursor: pointer;
        opacity: 0.5;
        filter: grayscale(100%);
        pointer-events: none;
    }

    &:hover {
        border-color: #9f0013;
        background-color: #efefd8;
    }

    + .step {
        margin-left: 16px;
    }
    
    svg {
        fill: #74000e;
        width: 48px;
    }
}

.query-input {
    position: fixed;
    top: 0;
    display: none;
    right: 0;
    max-width: 128px;
    background-color: transparent;
    color: transparent;
    &:hover {
        color: #000;
    }
    
}

.signature {
    position: absolute;
    bottom: 24px;
    right: 4px;
    img {
        height: 32px;
        rotate: -1.6deg;
    }
}

</style>