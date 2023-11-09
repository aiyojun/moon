<script setup lang="ts">
import {onMounted, reactive, ref} from "vue";

const props = defineProps<{ percent: number }>()
const state = reactive({dx: 0, cursor: {di: 0, lock: false}, slider: {di: 0, dx: 0}})
const container = ref<HTMLDivElement>()
const slider = ref<HTMLDivElement>()
onMounted(() => {
  state.dx = (props.percent ? props.percent : .5) * container.value.clientHeight
  Object.assign(state, {slider: {dx: state.dx}})
  window.addEventListener('mouseup', () => onRelease())
  window.addEventListener('mousemove', (e: MouseEvent) => onMoving(e))
})
function fxPos(x: number) { return x < 0 ? 0 : x }
function fxMax(x: number, mx: number) { return x >= mx ? mx : x }
function onPress(e: MouseEvent) {
  state.slider.di = state.slider.dx
  state.cursor.di = e.clientY
  state.cursor.lock = true
}
function onRelease() {
  state.cursor.lock = false
}
function onMoving(e: MouseEvent) {
  if (state.cursor.lock)
    state.slider.dx = fxMax(fxPos(state.slider.di - e.clientY + state.cursor.di), slider.value.parentElement.clientHeight)
  state.dx = state.slider.dx
}
</script>

<template>
  <div class="v-widget" ref="container">
    <div class="one" :style="{height: `calc(100% - ${state.dx}px)`}">
      <slot name="one"></slot>
    </div>
    <div class="two" :style="{height: `${state.dx}px`}">
      <slot name="two"></slot>
    </div>
    <div ref="slider" class="slider" :style="{bottom: `calc(${state.slider.dx}px - .25rem)`}" @mousedown="onPress"></div>
  </div>
</template>

<style scoped>
.v-widget { position: absolute; top: 0; left: 0; width: 100%; height: 100%; display: flex; flex-direction: column; overflow: hidden; }
.one { position: absolute; top: 0; width: 100%; }
.two { position: absolute; bottom: 0; width: 100%; }
.slider { position: absolute; background-color: rgba(255, 255, 255, 0.1); left: 0; right: 0; height: .5rem; cursor: n-resize;}
</style>