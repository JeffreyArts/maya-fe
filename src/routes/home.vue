<template>
    <div class="home">
            <figure class="image-container" :class="[image ? '__hasImage' : '', step == 2 ? '__isProcessing': '']">

                <img :src="imageComputed" v-if="image" @click="downloadImage">
            </figure>

            <div class="steps">
                <record-button v-model="queryInput" class="step" :class="[ step == 2 ?'__isDisabled':'']" @click="resetStep"></record-button>
                <span class="step" :class="[ step == 1 ?'__isDisabled':'']" @click="requestImage">
                    <icon-processing v-model="state" />
                </span>
            </div>

            <!-- <select v-model="state">
                <option value="idle">Idle</option>
                <option value="error">Error</option>
                <option value="processing">Processing</option>
                <option value="ready">Ready</option>
                <option value="done">Done</option>
            </select> -->
            <div class="query-input">
                {{ queryInput }}
            </div>
        </div>
</template>


<script lang="ts">
import {defineComponent} from "vue"
import recordButton from "@/components/record-button.vue"
import iconProcessing from "@/components/icon-processing.vue"
import axios from "axios"
import saveAs from "file-saver"
import OpenAI from "@/stores/openai"
import _ from "lodash"

export default defineComponent({
    name: "homePage",
    components: { recordButton, iconProcessing },
    props: [],
    setup() {
        const open = OpenAI()
        return { open }
    },
    data() {
        return {
            queryInput: "",
            isProcessing: false,
            step: 1,
            state: "idle",
            prompt: "",
            query: "",
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
                    console.log(newValue)
                    this.query = newValue
                    this.processQuery()
                }
            },
        },
    },
    methods: {
        resetStep() {
            this.step = 1
        },
        async processQuery() {
            this.isProcessing = true
            try {
                const o = await this.open.ai.createChatCompletion({
                    model: "gpt-3.5-turbo",
                    messages: [
                        {
                            role: "assistant",
                            content: "you are a prompt master, your job is to come up with a single prompt that can be used to generate a Maya symbol with Dalle-2.",
                        },
                        {
                            role: "user",
                            content: `Toon mij een prompt voor een symbol van een ${this.query}`,
                            // content: "Ik wil het graag hebben over kapauters in het oerwoud. Daar wonen ze. Ze hebben hele mooie huisjes, hele mooie gebouwen. Beetje flatgebouwen, als in zwammen. Gewoon zwammen, flatgebouwen. Heel hoog, in hele lange grote bomen. En ze houden van vissen. Vliegvissen. Dat vinden ze mooi. Dat vinden ze leuk om te doen. En ze houden ook van schaatsen. Maar dat is wel een probleem, want ze wonen in het oerwoud. Dus ze kunnen eigenlijk nooit schaatsen. Maar ja, je kan ook niet alles hebben in het leven.",
                        },
                    ],
                })
                this.isProcessing = false
                this.prompt = `${o.data.choices[0].message.content}, style of ancient maya symbol, positive`

                this.requestImage()
                console.log(this.prompt)
            } catch (error: Error | any) {
                this.isProcessing = false
                this.step = 1
                this.state = "error"
                if (error.response) {
                    console.log(error.response.status)
                    console.log(error.response.data)
                } else {
                    console.log(error.message)
                }
            }
        },
        async requestImage() {

            this.state = "processing"
            this.step = 2

            try {
                const request = await axios.post(`${import.meta.env.VITE_REST_API}/api/maya-images`, {
                    "data": {
                        query: this.query,
                        prompt: this.prompt
                    }
                })
                
                this.image = request.data.data.image.url
                this.state = "ready"
                
                this.step = 3
            } catch (error: Error | any) {
                this.isProcessing = false
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
            const name = "image.jpg"
            // create image blob from this.image
            const blob = new Blob([this.image], { type: "image/jpeg" })
            saveAs(blob, `${name}`)
        }
    },
})


</script>

<style lang="scss">
@import "@/assets/scss/variables.scss";
.home {
    width: 100%;
    min-height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 0;
    padding: 0;
    flex-flow: column;
}

.image-container {
    aspect-ratio: 1/1;
    max-height: calc(100vh - 160px);
    margin: 0;
    height: 100%; 
    max-height: calc(100vh - 224px);
    margin: 0 0 48px;
    border: 4px solid transparent;
    background-color: #eee;
    box-shadow: 0px 0px 16px rgba(0,0,0,.08);

    &.__hasImage {
        border-color: #eee;
    }

    &.__isProcessing {
        img {
            filter: blur(4px) grayscale(100%);
        }
    }
    img {
        width: 100%;
    };
}

.steps {
    display: flex;
    justify-content: center;
    flex-flow: row no-wrap;
}

.step {
    cursor: pointer;
    display: flex;
    width: 96px;
    aspect-ratio: 1/1;
    border-radius: 100%;
    border: 4px solid #dedede;
    background: #fff;
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
        border-color: #ccc;
    }

    + .step {
        margin-left: 16px;
    }
    
    svg {
        width: 48px;
    }
}

.query-input {
    position: fixed;
    top: 0;
    right: 0;
    max-width: 128px;
    background-color: #fff;
    color: transparent;
    &:hover {
        color: #000;
    }
    
}


</style>