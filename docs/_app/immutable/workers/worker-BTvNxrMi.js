(function(){let e=`https://cdn.jsdelivr.net/pyodide/v314.0.7/full/`,t=`${e}pyodide.mjs`,n=globalThis;function r(e){n.postMessage(e)}let i=null,a={stdout:new TextDecoder,stderr:new TextDecoder};function o(){a.stdout=new TextDecoder,a.stderr=new TextDecoder}function s(e,t,n){t&&r({type:`output`,id:e,text:t,stream:n})}function c(e,t){let n=a[e].decode(t,{stream:!0});return i!==null&&s(i,n,e),t.length}function l(){for(let e of[`stdout`,`stderr`]){let t=a[e].decode();i!==null&&s(i,t,e)}}function u(e){try{e.runPython(`__import__('sys').stdout.flush(); __import__('sys').stderr.flush()`)}catch{}}function d(e){return e instanceof Error?e.message:String(e)}function f(e){let t=d(e),n=t.split(`
`),r=n.findIndex(e=>e.startsWith(`  File "<exec>"`)),i=r>0?n.lastIndexOf(`Traceback (most recent call last):`,r):-1;return`${(i>=0?[n[i],...n.slice(r)].join(`
`):t).replace(/\n+$/,``)}\n`}let p=null;async function m(){try{let{loadPyodide:n}=await import(
/* @vite-ignore */
t),i=await n({indexURL:e});i.setStdout({write:e=>c(`stdout`,e)}),i.setStderr({write:e=>c(`stderr`,e)}),i.runPython(`
import builtins


def _input_not_supported(*args, **kwargs):
    raise RuntimeError("input() is not supported in the browser")


builtins.input = _input_not_supported
del _input_not_supported
`);let a=i.runPython(`
from pyodide.console import PyodideConsole
PyodideConsole(globals())
`),o=i.runPython(`dict()`),s=i.runPython(`
import builtins
from pyodide.ffi import to_js


async def await_fut(future):
    result = await future
    if result is not None:
        builtins._ = result
        return to_js([repr(result)])
    return to_js([None])


await_fut
`,{globals:o});o.destroy();let l=i.runPython(`dict()`),u=i.runPython(`
def reset_console(console):
    console.buffer.clear()


reset_console
`,{globals:l});return l.destroy(),r({type:`ready`,banner:`Python ${String(i.runPython(`__import__('sys').version.split()[0]`))} (Pyodide ${i.version})`}),{pyodide:i,console:a,awaitFut:s,resetConsole:u}}catch(e){throw r({type:`error`,message:d(e)}),e}}function h(){return p||=m().catch(e=>{throw p=null,e}),p}async function g(e,t,n){i=t,o();let a=null;try{await e.pyodide.runPythonAsync(n)}catch(e){a=f(e)}u(e.pyodide),l(),a!==null&&s(t,a,`stderr`),i=null,r({type:`done`,id:t})}async function _(e,t,n){i=t,o();let a=e.console.push(n);if(a.syntax_check===`incomplete`){i=null,r({type:`done`,id:t,more:!0});return}if(a.syntax_check===`syntax-error`){s(t,`${(a.formatted_error??`Syntax error
`).replace(/\n+$/,``)}\n`,`stderr`),i=null,r({type:`done`,id:t,more:!1});return}let c=null,d=null;try{let[t]=await e.awaitFut(a);c=t??null}catch(e){d=a.formatted_error??f(e)}u(e.pyodide),l(),d===null?c!==null&&s(t,`${c}\n`,`stdout`):s(t,`${d.replace(/\n+$/,``)}\n`,`stderr`),i=null,r({type:`done`,id:t,more:!1})}function v(e,t){e.resetConsole(e.console),r({type:`done`,id:t,more:!1})}async function y(e,t){try{t.type===`run`?await g(e,t.id,t.code):t.type===`reset`?v(e,t.id):await _(e,t.id,t.line)}catch(e){i=null,s(t.id,f(e),`stderr`),r({type:`done`,id:t.id,more:!1})}}let b=[],x=!1;async function S(){if(!x){x=!0;try{for(;b.length>0;){let e=b.shift();if(!e)break;let t;try{t=await h()}catch{b.length=0;break}await y(t,e)}}finally{x=!1}}}n.onmessage=e=>{b.push(e.data),S()},h().catch(()=>{})})();