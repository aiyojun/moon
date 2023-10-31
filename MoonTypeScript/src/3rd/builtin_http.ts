import {BuiltinFunctionValue, IValue, StringValue, ValueSystem} from "../moon/valuesystem";
import axios from "axios";

class HttpClientFunction extends BuiltinFunctionValue {
    async invoke(...args): Promise<IValue> {
        const method = (args[0] as StringValue).value.toUpperCase()
        const url = (args[1] as StringValue).value
        const cfg = { method, url }
        if (args.length > 2) { data: ValueSystem.valueOf(args[2]) }
        const resp = await axios( cfg )
        if (resp.status === 200)
            return ValueSystem.buildString(await resp.data)
        throw new Error(`error: http exception, status : ${resp.status}`)
    }
}

window.moon.inject('http', new HttpClientFunction())