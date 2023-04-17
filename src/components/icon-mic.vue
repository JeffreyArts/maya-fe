<template>
    <div>
        <figure>
            <svg version="1.1" class="i-mic" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 320 320" style="enable-background:new 0 0 320 320;" xml:space="preserve">
                <path id="holder" d="M173.7,255.5c0,12.4,0,24.7,0,37c0.6,0,1.1,0.1,1.7,0.1c9.8,0,19.6-0.2,29.4,0 c8.1,0.1,13.4,5.9,13.7,12.7c0.4,7.5-5.3,13.8-12.6,14.2c-1.1,0.1-2.3-0.2-3.4-0.2c-28.3,0-56.6,0-84.9,0c-3,0-5.9,0.1-8.7-1.3 c-5.6-3-8.5-9.3-6.9-15.3c1.7-6.3,7.1-10.2,13.6-10.1c10,0.1,19.9,0,29.9,0c0.2,0,0.4-0.1,0.7-0.1c0-12.3,0-24.6,0-36.9 c-3.4-0.7-6.8-1.3-10.1-2c-36.7-8.5-66.9-37.6-75.4-75.2c-1.6-7.2-2.4-14.5-2.5-21.9c0-6.7-0.1-13.4,0-20.2 c0.1-6.2,2.2-11.4,8.3-14.1c9-4.1,19.1,2.7,19,12.6c-0.1,8.4-0.3,16.8,0.1,25.2c0.9,19.2,8.5,35.5,22.3,48.9 c10.6,10.2,23.2,16.8,37.7,19.5c39,7.5,76.4-16,86.5-53.2c1.6-5.8,2.4-11.7,2.4-17.7c0-7.7,0-15.4,0-23.1c0-6,4.1-11.3,9.8-12.9 c8.2-2.3,16.3,3.2,17.1,11.8c0.4,3.8,0.3,7.7,0.3,11.5c-0.1,7,0,14-0.5,21c-1.4,17-7.1,32.6-16.9,46.6c-16,22.8-37.9,36.9-65.2,42.2 C177.3,254.8,175.6,255.1,173.7,255.5z"/>
                <path id="target" d="M160.1,0.6c-30.2,0-54.6,24.5-54.6,54.6h-0.2v100.3c0,30.2,24.5,54.6,54.6,54.6 s54.6-24.5,54.6-54.6h0.2V55.2C214.7,25,190.2,0.6,160.1,0.6z"/>
                <path id="mic" d="M160.1,0.6c-30.2,0-54.6,24.5-54.6,54.6h-0.2v100.3c0,30.2,24.5,54.6,54.6,54.6 s54.6-24.5,54.6-54.6h0.2V55.2C214.7,25,190.2,0.6,160.1,0.6z"/>
                <rect id="square" x="57.2" y="59" width="205.7" height="205.7"/>
                <ellipse id="circle" transform="matrix(0.7071 -0.7071 0.7071 0.7071 -66.7009 160.1767)" cx="160" cy="160.6" rx="101.6" ry="101.6"/>
                <polyline id="checkmark" points="66.4,178.3 160,264.7 277.6,115.6 "/>
            </svg>
        </figure>
    </div>
  </template>
  
<script lang="ts">
import { defineComponent } from "vue"
import gsap from "gsap"
import { MorphSVGPlugin } from "gsap/MorphSVGPlugin"
import _ from "lodash"
  
export default defineComponent({
    name: "iconMic",
    components: {  },
    props: {
        modelValue: {
            type: String , // 'idle' | 'recording' | 'processing' | 'done',
            required: true,
        },
    },
    data() {
        return {
            recording: null as gsap.core.Timeline | null,
            processing: null as gsap.core.Tween | null,
        }
    },
    watch: {
        modelValue: {
            immediate: true,
            handler(newValue, oldValue) {
                if (newValue === "recording") {
                    this.animateToRecording()
                } else if (newValue === "processing") {
                    this.animateToProcessing()
                } else if (newValue === "done") {
                    this.animateToDone()
                } else if (newValue === "idle") {
                    this.animateToIdle()
                }
            },
        },
    },
    mounted() {
        gsap.registerPlugin(MorphSVGPlugin)

        gsap.set(".i-mic #holder", {
            opacity: 1,
            fill: "#74000e"
        })
        
        
        gsap.set(".i-mic #target", {
            opacity: 1,
            fill: "#74000e",
            transformOrigin: "center center" 
        })

        gsap.set(".i-mic #square", {
            opacity: 0,
            fill: "#74000e",
            transformOrigin: "center center" 
        })

        gsap.set(".i-mic #mic", {
            opacity: 0,
            fill: "#74000e",
            transformOrigin: "center center" 
        })

        gsap.set(".i-mic #circle", {
            opacity: 0,
            fill: "#ff3333"
        })

        gsap.set(".i-mic #checkmark", {
            strokeDasharray: 320,
            strokeDashoffset: 320,
            opacity: 0,
        })

    },
    methods: {
        animateToRecording() {
            this.processing?.kill()
            this.recording?.kill()
            gsap.to(".i-mic #holder", {
                opacity: 0,
                duration: 0.1,
                ease: "power2.inOut",
            })
            gsap.to(".i-mic #target", {
                morphSVG: {shape: "#circle"}, 
                duration: .72,
                fill: "#ff3333",
                ease: "bounce.out",
                onComplete: () => {
                    this.recording = gsap.timeline(
                        {
                            delay: 0.5,
                            repeat: -1,
                            repeatDelay: 0.5,
                            yoyo: true,
                            ease: "linear",
                        }
                    ).to(".i-mic #target", { opacity: 0, duration: 0.1 })
                        .to(".i-mic #target", { opacity: 1, duration: .1, delay: .5})
                }
            })
        }, 
        animateToProcessing() {
            this.processing?.kill()
            this.recording?.kill()
            gsap.set(".i-mic #target", {transformOrigin: "center center" })
            gsap.to(".i-mic #target", {
                morphSVG: {shape: "#square"}, 
                duration: .72,
                opacity: 1,
                fill: "#74000e",
                ease: "linear",
                onComplete: () => {
                    this.processing = gsap.to(".i-mic #target", {
                        repeat: -1,
                        rotate: 360,
                        ease: "power2.inOut",
                        duration: 1
                    })
                }
            })
        },
        animateToDone() {
            this.processing?.kill()
            this.recording?.kill()
            gsap.to(".i-mic #target", {
                duration: .72,
                opacity: 0,
                // fill: "#74000e",
                ease: "power2.inOut",
                onComplete: () => {
                    gsap.set("#checkmark", {
                        opacity: 1,
                    })
                    gsap.to(".i-mic #target", {
                        morphSVG: {shape: "#mic"}, 
                        duration: 0.1,
                        rotation: 0,
                        fill: "#74000e",
                    })
                    

                    gsap.timeline()
                        .fromTo(".i-mic #checkmark", {
                            strokeDasharray: 320,
                            strokeDashoffset: 320
                        }, {
                            strokeDasharray: 320,
                            strokeDashoffset: 0,
                            duration: 1,
                            ease: "power2.inOut",
                        })
                        .to(".i-mic #checkmark", {
                            opacity: 0,
                            delay: 1,
                            duration: 0.8,
                            ease: "power4.out",
                        })
                        .to(".i-mic #holder, #target", {
                            duration: .72,
                            opacity: 1,
                            fill: "#74000e",
                            ease: "power1.in",
                            onComplete: () => {
                                this.$emit("update:modelValue", "idle")
                            }
                        })
                }
            })
            
            // gsap.to
        },
        animateToIdle() {
            this.processing?.kill()
            this.recording?.kill()
        },

    },
})
</script>
<style lang="scss" scoped>
@import "./../assets/scss/variables.scss";

#checkmark {
	fill:none;
    stroke:#74000e;
    stroke-width:32;
    stroke-linecap:round;
    stroke-miterlimit:10;
}
figure {
    margin: 0;
    padding: 0;
}
</style>