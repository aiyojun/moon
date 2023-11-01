<script setup lang="ts">

import {onMounted, reactive, watch} from "vue";

const props = withDefaults(
    defineProps<{direction: 'left' | 'bottom', x?: number, y?: number, min?: number, max?: number}>(),
    {direction: 'bottom', x: 0, y: 0}
)

const emit = defineEmits<{(event: 'move', p: {x: number, y: number})}>()

const computeSliderDirectionStyle = () => {
    if (props.direction === 'bottom') {
        return { left: '0', right: '0', height: '.5rem', cursor: 'n-resize' }
    } else {
        return { top: '0', bottom: '0',  width: '.5rem', cursor: 'w-resize' }
    }
}

const cursor_coordination = reactive({a: 0, b: 0, lock: false})


const slider_coordination = reactive({a: 0, b: 0, x: props.x, y: props.y})

const press = (e: MouseEvent) => {
    cursor_coordination.a = e.clientX
    cursor_coordination.b = e.clientY
    cursor_coordination.lock = true
    slider_coordination.a = slider_coordination.x
    slider_coordination.b = slider_coordination.y
}

const release = () => {
    cursor_coordination.lock = false
}

const onMoving = (e: MouseEvent) => {
    if (cursor_coordination.lock) {
        slider_coordination.x = slider_coordination.a + e.clientX - cursor_coordination.a
        slider_coordination.y = slider_coordination.b - (e.clientY - cursor_coordination.b)
        if (props.min !== undefined) {
            if (props.direction === 'bottom') {
                if (slider_coordination.y < props.min) {
                    slider_coordination.y = props.min
                }
            } else {
                if (slider_coordination.x < props.min) {
                    slider_coordination.x = props.min
                }
            }
        }
        if (props.max !== undefined) {
            if (props.direction === 'bottom') {
                if (slider_coordination.y > props.max - 8) {
                    slider_coordination.y = props.max - 8
                }
            } else {
                if (slider_coordination.x > props.max - 8) {
                    slider_coordination.x = props.max - 8
                }
            }
        }
        emit('move', {x: slider_coordination.x, y: slider_coordination.y})
    }
}

onMounted(() => {
  slider_coordination.x = props.x
  slider_coordination.y = props.y
    window.addEventListener('mouseup', () => release())
    window.addEventListener('mousemove', (e: MouseEvent) => onMoving(e))
})

watch(() => props.x, n => { slider_coordination.x = n })
watch(() => props.y, n => { slider_coordination.y = n })

const computeSliderCoordination = () => {
    if (props.direction === 'bottom') {
        return { bottom: `calc(${slider_coordination.y}px - .25rem)` }
    } else {
        return { left: `calc(${slider_coordination.x}px - .25rem)` }
    }
}

</script>

<template>
    <div class="window-slider" :style="{...computeSliderDirectionStyle(), ...computeSliderCoordination()}" @mousedown="(e) => press(e)"></div>
</template>

<style scoped>


.window-slider {
    position: absolute;
    background-color: rgba(255,255,255,0.1);
}

/*.window-slider:hover {*/
/*}*/

</style>