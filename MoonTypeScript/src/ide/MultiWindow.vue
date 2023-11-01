<script setup lang="ts">

import {onMounted, reactive, ref} from "vue";
import WindowSlider from "./WindowSlider.vue";

type OuterParams = {direction: 'vertical' | 'horizontal', ratio: number}
type InnerParams = {slider_x: number}
const props = defineProps<OuterParams>()
const params = reactive<InnerParams>({slider_x: 0})
const container = ref<HTMLDivElement>()
onMounted(() => {
  params.slider_x = (props.direction === 'vertical' ? container.value.clientHeight * (1 - props.ratio) : container.value.clientWidth * props.ratio)
  console.info('mount x ', params.slider_x)
})
</script>

<template>
<div class="overlay container" :class="props.direction === 'vertical' ? 'v-flex' : 'h-flex'" ref="container">
  <div class="window-instance" :style="props.direction === 'vertical' ? `top: 0; height: calc(100% - ${params.slider_x}px); width: 100%;` : `left: 0; width: ${params.slider_x}px; height: 100%;`"><slot name="win0"></slot></div>
  <div class="window-instance" :style="props.direction === 'vertical' ? `bottom: 0; height: ${params.slider_x}px; width: 100%;` : `right: 0; width: calc(100% - ${params.slider_x}px); height: 100%;`"><slot name="win1"></slot></div>
  <WindowSlider :direction="props.direction === 'vertical' ? 'bottom' : 'left'" :min="20" :x="params.slider_x" :y="params.slider_x" @move="p => {params.slider_x = props.direction === 'vertical' ? p.y : p.x}"/>
</div>
</template>

<style scoped>

.overlay { position: absolute; top: 0; left: 0; width: 100%; height: 100%; }
.container { display: flex; }
.window-instance { position: absolute; }

</style>