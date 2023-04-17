<template>
    <div>
        <span class="icon" @click="startRecording">
            <icon-mic v-model="state" />
        </span>
    </div>
  </template>
  
<script lang="ts">
import { defineComponent } from "vue"
import iconMic from "@/components/icon-mic.vue"
// import { saveAs } from "file-saver"
import MicRecorder from "mic-recorder"
import axios from "axios"
// import { AudioContext } from "standardized-audio-context"
import _ from "lodash"
  
export default defineComponent({
    name: "AudioRecorder",
    components: { iconMic },
    props: {
        modelValue: {
            type: String,
            required: true,
        },
    },
    data: () => {
        return {
            chunks: [] as BlobPart[],
            mediaRecorder: null as MediaRecorder | null,
            isRecording: false,
            isProcessing: false,
            audioURL: "",
            state: "idle" as "idle" | "recording" | "processing" | "done",
            audioBlob: null as Blob | null,
            audioFile: null as File | null,
            analyser: null as AnalyserNode | null,
            dataArray: new Uint8Array(0),
            bufferLength: 0,
            soundDetected: false,
            recorder: new MicRecorder({
                bitRate: 128,
                encoder: "wav", // default is mp3, can be wav as well
                sampleRate: 44100, // default is 44100, it can also be set to 16000 and 8000.
            }),
        }
    },
    computed: {
    },
    mounted() {},
    methods: {
        async startRecording() {
            try {
                const stream = await navigator.mediaDevices.getUserMedia({ audio: true })

                // this.isRecording = true
                this.state = "recording"
                this.recorder.start()

                // Create an AudioContext and connect it to the media stream
                const audioContext = new AudioContext()
                const source = audioContext.createMediaStreamSource(stream)
                this.analyser = audioContext.createAnalyser()
                source.connect(this.analyser)

                // Configure the this.analyser
                this.analyser.fftSize = 512
                this.bufferLength = this.analyser.frequencyBinCount
                this.dataArray = new Uint8Array(this.bufferLength)

                

                this.checkForSilence(500)
            } catch (error) {
                this.state = "idle"
                console.log("Error:", error)
            }
        },
        checkForSilence(silenceDuration: number) {
            // Silence duration is in miliseconds
            if (this.state != "recording" || !this.analyser) return

            let silenceStartTime = null as number | null

            const checkSilence = () => {
                if (_.isNull(this.analyser)) {
                    console.error("Analyser is null")
                    return
                }
                
                this.analyser.getByteFrequencyData(this.dataArray)
                const avgVolume = this.dataArray.reduce((acc, val) => acc + val, 0) / this.bufferLength
                const silenceThreshold = 8

                // console.log(avgVolume , silenceThreshold)
                if (!this.soundDetected && avgVolume >= silenceThreshold) {
                    this.soundDetected = true
                }

                if (this.soundDetected) {
                    if (avgVolume < silenceThreshold) {
                        if (_.isNull(silenceStartTime)) {
                            silenceStartTime = Date.now()
                        } else {
                            const elapsedTime = Date.now() - silenceStartTime
                            if (elapsedTime >= silenceDuration) {
                                this.stopRecording()
                                return
                            }
                        }
                    } else {
                        silenceStartTime = null
                    }
                }

                // Check for silence every 200ms
                setTimeout(() => {
                    if (!this.analyser) {
                        console.error("Analyser is null")
                        return
                    }
                    checkSilence()
                }, 100)
            }

            checkSilence()
        },

        stopRecording() {
            this.state = "processing"
        
            this.analyser = null
            this.dataArray = new Uint8Array(0)
            this.bufferLength = 0
            this.soundDetected = false
            const audioElement = new Audio()

            if (!audioElement) {
                return
            }
            // this.isProcessing = true
            this.recorder.stop().getAudio().then(([buffer, blob]) => {
                this.audioFile = new File(buffer, "sample.wav", {
                    type: blob.type,
                    lastModified: Date.now(),
                })
                this.audioBlob = blob

                this.audioURL = URL.createObjectURL(this.audioBlob)

                audioElement.src = this.audioURL
                audioElement.load()

                this.transcribeAudio()
            }).catch((e) => {
                alert("We could not retrieve your message")
                console.log(e)
            })
        },
        async transcribeAudio() {
            if (!this.audioFile) {
                return
            }

            try {
                const formData = new FormData()

                // Append the audio file to the FormData object
                formData.append("audio", this.audioFile, "sample.wav")
                formData.append("language", "nl")
                const completion = await axios.post( `${import.meta.env.VITE_REST_API}/api/audio-to-texts`, formData, {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                })
                this.$emit("update:modelValue", completion.data.data.text)
                this.state = "done"
            } catch (error: Error | any) {
                this.state = "done"
                if (error.response) {
                    console.log(error.response.status)
                    console.log(error.response.data)
                } else {
                    console.log(error.message)
                }
            }
        },
    },
})
</script>

<style lang="scss">
</style>