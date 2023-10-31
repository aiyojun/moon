import {BuiltinFunctionValue, IValue} from "./valuesystem.js";
import {ScriptEngine} from "./vm.js";

class PrintFunction extends BuiltinFunctionValue {
    async invoke(...args: IValue[]): Promise<IValue> {
        let stream = ''
        for (let i = 0; i < args.length; i++) {
            stream += `${args[i].toString()}`
        }
        console.debug("%c[MOON]", "color: #88cc88", `${stream}`)
        return null;
    }
}

const moon = new ScriptEngine()

moon.inject('println', new PrintFunction())

declare global {
    interface Window {
        moon: ScriptEngine;
    }
}

window.moon = moon
