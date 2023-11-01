<script setup lang="ts">
import {EditorView} from "@codemirror/view"
import {basicSetup} from "codemirror";
import {javascript} from "@codemirror/lang-javascript"
import {oneDark} from "@codemirror/theme-one-dark"
import "./codemirror.css"
import LOGO from "../../moon.svg"
import {onMounted, reactive, ref} from "vue";
import SvgOf from "./SvgOf.vue";
import {BuiltinFunctionValue, IValue} from "../moon/valuesystem";
import MultiWindow from "./MultiWindow.vue";

const editor = ref<HTMLDivElement>()
const logger = ref<HTMLDivElement>()
const ide = reactive<{cdm: EditorView, text: string, direction: 'vertical' | 'horizontal'}>({ cdm: null,
    direction: 'horizontal',
    text: `class Person {
  name = null;
  def setName(s) { self.name = s; }
}
def main {
  println("Hello World!");

  // todo: Do test
  println("Test If ...");
  x = 0;
  if (x == 1) { println("x == 1"); }
  else if (x == 2) { println("x == 2"); }
  else { println("x != 1 && x != 2"); }

  println("Test For ...");
  for (x = 0; x < 10; x = x + 2)
  { println(x); if (x > 5) { break; } }

  println("Test While ...");
  while (x < 20) { x = x + 3; println(x); }

  println("Test Oriented Object ...");
  p = new Person;
  p.setName("Smith");
  println(p);
}` })

const run = () => {
  try {
    clearLog()
    window.moon.compile(ide.cdm.state.doc.toString())
    window.moon.main()
  } catch (e) {
    logger.value.innerHTML += `<div style="color: red;">${e.message}</div>`
  }
}

const clearLog = () => {
  logger.value.innerHTML = '<div style="color: rgba(255,255,255,0.75);"><b>MOON </b>Virtual Terminal Platform</div>'
}

const initWindow = () => {
  ide.cdm = new EditorView({
    extensions: [basicSetup, javascript(), oneDark],
    parent: editor.value,
    doc: ide.text
  })
}

const switchWindow = () => {
  ide.direction = ide.direction === 'vertical' ? 'horizontal' : 'vertical'
}

class PrintFunction extends BuiltinFunctionValue {
  async invoke(...args: IValue[]): Promise<IValue> {
    let stream = `${new Date().toISOString()}  |  `
    for (let i = 0; i < args.length; i++) {
      stream += `${args[i].toString()}`
    }
    logger.value.innerHTML += `<div>${stream}</div>`
    return null;
  }
}

class ErrorFunction extends BuiltinFunctionValue {
  async invoke(...args: IValue[]): Promise<IValue> {
    let stream = `${new Date().toISOString()} | `
    for (let i = 0; i < args.length; i++) {
      stream += `${args[i].toString()}`
    }
    logger.value.innerHTML += `<div style="color: red;">${stream}</div>`
    return null;
  }
}

onMounted(() => {
  initWindow()
  window.moon.inject("println", new PrintFunction)
  // clearLog()
  run()
})

</script>

<template>
  <div class="overlay v-flex">
    <div class="header between-flex colored-bar">
      <div class="brand center-flex">
        <img class="icon" :src="LOGO" style="margin: 0 .5rem 0 0;" alt=""/>
        <div>MOON</div>
      </div>
      <div class="center-flex">
        <div class="icon icon-hover" @click="run" style="margin-right: .5rem;">
          <SvgOf name="terminal" color="skyblue"/>
        </div>
        <div class="icon icon-hover" @click="clearLog">
<!--             style="margin-right: .5rem;">-->
          <SvgOf name="erase" color="skyblue"/>
        </div>
<!--        <div class="icon icon-hover" @click="switchWindow">-->
<!--          <SvgOf name="rotate" color="darkseagreen"/>-->
<!--        </div>-->
      </div>
    </div>
    <div class="main">
      <MultiWindow :ratio="0.75" :direction="ide.direction" :key="ide.direction">
        <template #win0>
          <div class="ide v-flex" key="editor">
            <div style="height: 100%;">
              <div ref="editor" style="height: 100%;">
              </div>
            </div>
          </div>
        </template>
        <template #win1>
          <div class="log" ref="logger" key="logger">

          </div>
        </template>
      </MultiWindow>
    </div>
    <div class="footer between-flex colored-bar">
      <div>Moonlang coding platform</div>
      <div>Moon 0.0.1</div>
    </div>
  </div>
</template>

<style scoped>

@import "../fonts/fonts-support.css";

.overlay { position: absolute; top: 0; left: 0; width: 100%; height: 100%; background: #272727; overflow: hidden; }
.v-flex { display: flex; flex-direction: column; }
.v-flex>* { width: 100%; }
.between-flex { display: flex; justify-content: space-between; align-items: center; }
.header { height: 3rem; box-sizing: border-box; padding: 0 1rem; }
.footer { height: 2rem; box-sizing: border-box; padding: 0 1rem; color: #aaa; font-size: .75rem; font-family: "Titillium Web", sans-serif; }
.main { height: calc(100% - 3rem - 2rem); display: flex; position: relative; }
.main>div { height: 100%; }
.colored-bar { background: #333; }
.icon { width: 24px; height: 24px; display: flex; justify-content: center; align-items: center; border-radius: 6px; }
.icon>* { width: 75%; height: 75%; }

.icon-hover { cursor: pointer; }
.icon-hover:hover { background: rgba(255,255,255,0.1); }
.brand { font-size: 1.25rem; color: white; font-family: "Titillium Web", Helvetica, sans-serif; }
.center-flex { display: flex; justify-content: center; align-items: center; }
.ide, .log { width: 100%; height: 100%; }

.log { box-sizing: border-box; color: #aaa; font-size: 0.75rem; font-family: "Titillium Web"; padding: .5rem; overflow: auto; }

</style>