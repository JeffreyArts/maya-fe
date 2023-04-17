<template>
    <div>
        <figure>
            <svg version="1.1" class="i-pro" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 320 320" style="enable-background:new 0 0 320 320;" xml:space="preserve">
                <g id="waiting">
                    <path class="line-1" d="M76.8,293.2c-3.2,0-6.4-1-9.3-3 C25.5,260.3,0.3,211.6,0.3,160c0-51.5,25.1-100.2,67.1-130.2c7.2-5.1,17.2-3.5,22.3,3.7c5.1,7.2,3.5,17.2-3.7,22.3 c-33.6,24-53.7,62.9-53.7,104.1c0,41.3,20.1,80.2,53.8,104.2c7.2,5.1,8.9,15.1,3.8,22.3C86.7,290.9,81.8,293.2,76.8,293.2z"/>
                    <path class="line-2" d="M243.3,293.1c-5,0-9.9-2.3-13-6.7 c-5.1-7.2-3.5-17.2,3.7-22.3c33.6-24,53.7-62.9,53.7-104.1c0-41.3-20.1-80.2-53.8-104.2c-7.2-5.1-8.9-15.1-3.8-22.3 s15.1-8.9,22.3-3.8c42.1,30,67.2,78.6,67.2,130.3c0,51.5-25.1,100.2-67.1,130.2C249.8,292.2,246.5,293.1,243.3,293.1z"/>
                    <circle class="dot-2" cx="303.7" cy="160" rx="16" ry="16"/>
                    <circle class="dot-1" cx="16.3" cy="160" rx="16" ry="16"/>
                </g>
                <g id="cross">
                    <path class="line-2" d="M242,100.8c0.5-0.4,0.9-0.8,1.3-1.2 c0.4-0.4,0.8-0.9,1.2-1.3l0.8-0.8l-0.1-0.1c6.2-7.8,6.8-18.1,1-23.9c-5.8-5.8-16.1-5.2-23.9,1l-0.1-0.1l-2.1,2.1c0,0,0,0,0,0 c0,0,0,0,0,0L76,220.5c0,0,0,0,0,0c-8,8-9.3,19.7-2.9,26.1c6.4,6.4,18.1,5.1,26.1-2.9c0.4-0.4,0.8-0.9,1.2-1.3L242,100.8z"/>
                    <path class="line-1" d="M219.8,242.2c0.4,0.4,0.8,0.9,1.2,1.3 c0.4,0.4,0.9,0.8,1.3,1.2l0.8,0.8l0.1-0.1c7.7,6.1,17.9,6.6,23.7,0.8s5.3-16-0.8-23.7l0.1-0.1l-2-2c0,0,0,0,0,0s0,0,0,0L102.3,78.5 c0,0,0,0,0,0c-7.9-7.9-19.5-9.1-25.9-2.7c-6.4,6.4-5.2,18,2.7,25.9c0.4,0.4,0.9,0.8,1.3,1.2L219.8,242.2z"/>
                </g>
                <g id="arrows">
                    <path class="line-1" d="M76.7,42.9C40.2,68.9,16.3,111.7,16.3,160c0,48.4,23.9,91.2,60.5,117.2"/>
                    <path class="line-2" d="M243.3,277.1 c36.5-26.1,60.4-68.8,60.4-117.1c0-48.4-23.9-91.2-60.5-117.2"/>
                </g>
                <g id="pause">
                    <path class="line-2" d="M256.1,225.2c0,17.7-14.3,32-32,32 s-32-14.3-32-32l0.1-129.4c0-17.7,14.3-32,32-32s32,14.3,32,32L256.1,225.2z"/>
                    <path class="line-1" d="M127.8,224.7c0,17.7-14.3,32-32,32 s-32-14.3-32-32l0.1-129.4c0-17.7,14.3-32,32-32s32,14.3,32,32L127.8,224.7z"/>
                </g>
                <g id="target">
                    <path class="line-2" d="M256.1,225.2c0,17.7-14.3,32-32,32 s-32-14.3-32-32l0.1-129.4c0-17.7,14.3-32,32-32s32,14.3,32,32L256.1,225.2z"/>
                    <path class="line-1" d="M127.8,224.7c0,17.7-14.3,32-32,32 s-32-14.3-32-32l0.1-129.4c0-17.7,14.3-32,32-32s32,14.3,32,32L127.8,224.7z"/>
                    <g id="arrowhead-2"> <line class="arrow-line-1" x1="289.4" y1="42.8" x2="243.2" y2="42.8"/> <line class="arrow-line-2" x1="243.2" y1="42.8" x2="243.2" y2="89"/> </g>
                    <g id="arrowhead-1"> <line class="arrow-line-1" x1="76.8" y1="277.2" x2="76.8" y2="231"/> <line class="arrow-line-2" x1="30.6" y1="277.2" x2="76.8" y2="277.2"/> </g>
                </g>
                <ellipse id="center-dot" cx="160" cy="160" rx="16" ry="16"/>
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
            type: String , // 'idle' | 'processing' | 'error' | 'ready' ,
            required: true,
        },
    },
    data() {
        return {
            processing: null as gsap.core.Timeline | null,
            error: null as gsap.core.Tween | null,
            target: null as HTMLElement | null,
        }
    },
    watch: {
        modelValue: {
            immediate: true,
            handler(newValue, oldValue) {
                console.log("modelvalue change")
                if (newValue === "error") {
                    this.animateToError()
                } else if (newValue === "processing") {
                    this.animateToProcessing(oldValue)
                } else if (newValue === "idle") {
                    this.animateToIdle(oldValue)
                } else if (newValue === "ready") {
                    this.animateToReady()
                }
            },
        },
    },
    mounted() {
        gsap.registerPlugin(MorphSVGPlugin)
        this.target = this.$el.querySelector("#target") as HTMLElement

        gsap.set(".i-pro #target .line-1", {
            opacity: 1,
            fill: "#74000e",
            morphSVG: "#waiting .line-1"
        })
        
        gsap.set(".i-pro #target .line-2", {
            opacity: 1,
            fill: "#74000e",
            morphSVG: "#waiting .line-2"
        })

        gsap.set(".i-pro #target", {
            transformOrigin: "50% 50%"
        })
        
        
        gsap.set(".i-pro #pause, #waiting, #cross, #arrows, #center-dot", {
            opacity: 0,
        })


        gsap.set(".i-pro #arrowhead-2 line, #arrowhead-1 line", {
            strokeDasharray: 48,
            strokeDashoffset: 48,
            
        })

    },
    methods: {
        animateToError() {
            if (this.processing) {
                this.cancelProcessing()
            }
            this.error?.kill()
            gsap.timeline().to(".i-pro #target .line-1", {
                morphSVG: "#center-dot",
                duration: .3,
                ease: "power3.in"
            }).to(".i-pro #target .line-1", {
                morphSVG: "#cross .line-1", 
                duration: .7,
                ease: "power3.out"
            }).to(".i-pro #target .line-1, #target .line-2", {
                delay: -0.4,
                duration: .8,
                fill: "#ff3333",
            }).to(".i-pro #target .line-1, #target .line-2", {
                duration: .4,
                delay: 1,
                fill: "#74000e",
            })

            gsap.timeline().to(".i-pro #target .line-2", {
                morphSVG: "#center-dot",
                duration: .3,
                ease: "power3.in"
            }).to(".i-pro #target .line-2", {
                morphSVG: "#cross .line-2", 
                duration: .7,
                ease: "power3.out"
            }).to(".i-pro #target", {
                scale: 1.2,
                delay: -0.4,
                duration: .8,
            }).to(".i-pro #target", {
                scale: 1,
                duration: .4,
            }).to(".i-pro #target", {
                scale: 1,
                duration: .8,
                onComplete: () => {
                    this.animateToIdle("error")
                    this.$emit("update:modelValue", "idle")
                }
            })
            
        }, 
        cancelProcessing() {
            console.log("cancelProcessing")
                
            this.processing?.pause()
            // this.processing?.kill()
            this.error?.kill()
            
            // Clear the rotation of the target
            gsap.killTweensOf(this.target, "rotation")
           
            
            // Get the current rotation value of the target element
            const currentRotation = gsap.getProperty(this.target, "rotation") as number

            // Calculate the target rotation by rounding the current rotation to the nearest multiple of 360
            const targetRotation = Math.round(currentRotation / 360) * 360

            gsap.to(".i-pro #target", {
                duration: 1,
                rotation: targetRotation,
                ease: "bounce.out",
                onComplete: () => {
                    gsap.set(this.target, {rotation: 0})
                }
            })
        },
        animateToProcessing(from: string) {
            console.log("animateToProcessing called with:", from)

            // Create a new timeline every time animateToProcessing is called
            if (this.processing) {
                this.processing.kill()
            }
            const processing = gsap.timeline()
            this.processing = processing

            if (from !== "idle") {
                console.log("Not idle, running initial tweens")
                processing.to(".i-pro #target .line-1", { morphSVG: "#center-dot", duration: .3, ease: "power3.in" })
                processing.to(".i-pro #target .line-2", { morphSVG: "#center-dot", duration: .3, ease: "power3.in" }, "-=0.3")
            }

            processing.to(".i-pro #target .line-1", {
                morphSVG: "#waiting .line-1",
                duration: .7,
                ease: "power3.out"
            })

            processing.to(".i-pro #target .line-2", {
                morphSVG: "#waiting .line-2",
                duration: .7,
                ease: "power3.out"
            }, "-=0.7")

            processing.to(".i-pro #target", {
                duration: 1,
                rotation: -360,
                repeat: -1,
                ease: "none",
            })

            console.log("Playing processing timeline")
            processing.play()
        },

        animateToReady() {
            if (this.processing) {
                this.cancelProcessing()
            }
            this.error?.kill()


            gsap.set(".i-pro #arrowhead-2 line, #arrowhead-1 line", {
                opacity: 1,
            })
            gsap.fromTo("#arrowhead-2 .arrow-line-2, #arrowhead-1 .arrow-line-1", {
                strokeDasharray: 48,
                strokeDashoffset: 48
            },{
                strokeDasharray: 48,
                strokeDashoffset: 0,
                duration: 1,
            })
            gsap.fromTo("#arrowhead-2 .arrow-line-1, #arrowhead-1 .arrow-line-2", {
                strokeDasharray: 48,
                strokeDashoffset: 48
            },{
                strokeDasharray: 48,
                strokeDashoffset: 96,
                duration: 1,
            })


        },
        animateToIdle(from: string) {
            if (this.processing) {
                this.cancelProcessing()
            }
            this.error?.kill()

            if (from == "error") {
                gsap.timeline().to(".i-pro #target .line-1", {
                    morphSVG: "#center-dot",
                    duration: .3,
                    ease: "power3.in"
                }).to(".i-pro #target .line-1", {
                    morphSVG: "#waiting .line-1", 
                    duration: .7,
                    ease: "power3.out"
                })

                gsap.timeline().to(".i-pro #target .line-2", {
                    morphSVG: "#center-dot",
                    duration: .3,
                    ease: "power3.in"
                }).to(".i-pro #target .line-2", {
                    morphSVG: "#waiting .line-2", 
                    duration: .7,
                    ease: "power3.out"
                })
            } else {
                gsap.to(".i-pro #arrowhead-2 .arrow-line-1, #arrowhead-1 .arrow-line-2 ,#arrowhead-2 .arrow-line-2, #arrowhead-1 .arrow-line-1", {
                    strokeDasharray: 48,
                    strokeDashoffset: 48,
                    duration: .6
                })
            }
           
            
        },

    },
})
</script>
<style lang="scss" scoped>
@import "./../assets/scss/variables.scss";

#arrowhead-1,
#arrowhead-2,
#arrows {
	fill:none;
    stroke:74000e333;
    stroke-width:32;
    stroke-linecap:round;
    stroke-miterlimit:10;
}
// #target {
//     transform-origin:160px 160px !important;
// }
figure {
    margin: 0;
    padding: 0;
}
</style>