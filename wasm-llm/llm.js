async function createWasmLLMCore(moduleArg={}){var moduleRtn;var Module=moduleArg;var ENVIRONMENT_IS_WEB=!!globalThis.window;var ENVIRONMENT_IS_WORKER=!!globalThis.WorkerGlobalScope;var ENVIRONMENT_IS_NODE=globalThis.process?.versions?.node&&globalThis.process?.type!="renderer";if(ENVIRONMENT_IS_NODE){const{createRequire}=await import("node:module");var require=createRequire(import.meta.url)}var arguments_=[];var thisProgram="./this.program";var quit_=(status,toThrow)=>{throw toThrow};var _scriptName=import.meta.url;var scriptDirectory="";function locateFile(path){if(Module["locateFile"]){return Module["locateFile"](path,scriptDirectory)}return scriptDirectory+path}var readAsync,readBinary;if(ENVIRONMENT_IS_NODE){var fs=require("node:fs");if(_scriptName.startsWith("file:")){scriptDirectory=require("node:path").dirname(require("node:url").fileURLToPath(_scriptName))+"/"}readBinary=filename=>{filename=isFileURI(filename)?new URL(filename):filename;var ret=fs.readFileSync(filename);return ret};readAsync=async(filename,binary=true)=>{filename=isFileURI(filename)?new URL(filename):filename;var ret=fs.readFileSync(filename,binary?undefined:"utf8");return ret};if(process.argv.length>1){thisProgram=process.argv[1].replace(/\\/g,"/")}arguments_=process.argv.slice(2);quit_=(status,toThrow)=>{process.exitCode=status;throw toThrow}}else if(ENVIRONMENT_IS_WEB||ENVIRONMENT_IS_WORKER){try{scriptDirectory=new URL(".",_scriptName).href}catch{}{if(ENVIRONMENT_IS_WORKER){readBinary=url=>{var xhr=new XMLHttpRequest;xhr.open("GET",url,false);xhr.responseType="arraybuffer";xhr.send(null);return new Uint8Array(xhr.response)}}readAsync=async url=>{var response=await fetch(url,{credentials:"same-origin"});if(response.ok){return response.arrayBuffer()}throw new Error(response.status+" : "+response.url)}}}else{}var out=console.log.bind(console);var err=console.error.bind(console);var wasmBinary;var ABORT=false;var EXITSTATUS;var isFileURI=filename=>filename.startsWith("file://");class EmscriptenEH{}class EmscriptenSjLj extends EmscriptenEH{}var readyPromiseResolve,readyPromiseReject;var runtimeInitialized=false;function updateMemoryViews(){var b=wasmMemory.buffer;HEAP8=new Int8Array(b);HEAP16=new Int16Array(b);HEAPU8=new Uint8Array(b);HEAPU16=new Uint16Array(b);HEAP32=new Int32Array(b);HEAPU32=new Uint32Array(b);HEAPF32=new Float32Array(b);HEAPF64=new Float64Array(b);HEAP64=new BigInt64Array(b);HEAPU64=new BigUint64Array(b)}function preRun(){if(Module["preRun"]){if(typeof Module["preRun"]=="function")Module["preRun"]=[Module["preRun"]];while(Module["preRun"].length){addOnPreRun(Module["preRun"].shift())}}callRuntimeCallbacks(onPreRuns)}function initRuntime(){runtimeInitialized=true;wasmExports["E"]()}function postRun(){if(Module["postRun"]){if(typeof Module["postRun"]=="function")Module["postRun"]=[Module["postRun"]];while(Module["postRun"].length){addOnPostRun(Module["postRun"].shift())}}callRuntimeCallbacks(onPostRuns)}function abort(what){Module["onAbort"]?.(what);what=`Aborted(${what})`;err(what);ABORT=true;what+=". Build with -sASSERTIONS for more info.";var e=new WebAssembly.RuntimeError(what);readyPromiseReject?.(e);throw e}var wasmBinaryFile;function findWasmBinary(){if(Module["locateFile"]){return locateFile("llm.wasm")}return new URL("llm.wasm",import.meta.url).href}function getBinarySync(file){if(file==wasmBinaryFile&&wasmBinary){return new Uint8Array(wasmBinary)}if(readBinary){return readBinary(file)}throw"both async and sync fetching of the wasm failed"}async function getWasmBinary(binaryFile){if(!wasmBinary){try{var response=await readAsync(binaryFile);return new Uint8Array(response)}catch{}}return getBinarySync(binaryFile)}async function instantiateArrayBuffer(binaryFile,imports){try{var binary=await getWasmBinary(binaryFile);var instance=await WebAssembly.instantiate(binary,imports);return instance}catch(reason){err(`failed to asynchronously prepare wasm: ${reason}`);abort(reason)}}async function instantiateAsync(binary,binaryFile,imports){if(!binary&&!ENVIRONMENT_IS_NODE){try{var response=fetch(binaryFile,{credentials:"same-origin"});var instantiationResult=await WebAssembly.instantiateStreaming(response,imports);return instantiationResult}catch(reason){err(`wasm streaming compile failed: ${reason}`);err("falling back to ArrayBuffer instantiation")}}return instantiateArrayBuffer(binaryFile,imports)}function getWasmImports(){var imports={a:wasmImports};return imports}async function createWasm(){function receiveInstance(instance,module){wasmExports=instance.exports;wasmExports=Asyncify.instrumentWasmExports(wasmExports);assignWasmExports(wasmExports);updateMemoryViews();return wasmExports}function receiveInstantiationResult(result){return receiveInstance(result["instance"])}var info=getWasmImports();if(Module["instantiateWasm"]){return new Promise((resolve,reject)=>{Module["instantiateWasm"](info,(inst,mod)=>{resolve(receiveInstance(inst,mod))})})}wasmBinaryFile??=findWasmBinary();var result=await instantiateAsync(wasmBinary,wasmBinaryFile,info);var exports=receiveInstantiationResult(result);return exports}class ExitStatus{name="ExitStatus";constructor(status){this.message=`Program terminated with exit(${status})`;this.status=status}}var HEAP16;var HEAP32;var HEAP64;var HEAP8;var HEAPF32;var HEAPF64;var HEAPU16;var HEAPU32;var HEAPU64;var HEAPU8;var callRuntimeCallbacks=callbacks=>{while(callbacks.length>0){callbacks.shift()(Module)}};var onPostRuns=[];var addOnPostRun=cb=>onPostRuns.push(cb);var onPreRuns=[];var addOnPreRun=cb=>onPreRuns.push(cb);var dynCalls={};var noExitRuntime=true;var stackRestore=val=>__emscripten_stack_restore(val);var stackSave=()=>_emscripten_stack_get_current();var __abort_js=()=>abort("");var __emscripten_throw_longjmp=()=>{throw new EmscriptenSjLj};var INT53_MAX=9007199254740992;var INT53_MIN=-9007199254740992;var bigintToI53Checked=num=>num<INT53_MIN||num>INT53_MAX?NaN:Number(num);function __gmtime_js(time,tmPtr){time=bigintToI53Checked(time);var date=new Date(time*1e3);HEAP32[tmPtr>>2]=date.getUTCSeconds();HEAP32[tmPtr+4>>2]=date.getUTCMinutes();HEAP32[tmPtr+8>>2]=date.getUTCHours();HEAP32[tmPtr+12>>2]=date.getUTCDate();HEAP32[tmPtr+16>>2]=date.getUTCMonth();HEAP32[tmPtr+20>>2]=date.getUTCFullYear()-1900;HEAP32[tmPtr+24>>2]=date.getUTCDay();var start=Date.UTC(date.getUTCFullYear(),0,1,0,0,0,0);var yday=(date.getTime()-start)/(1e3*60*60*24)|0;HEAP32[tmPtr+28>>2]=yday}var isLeapYear=year=>year%4===0&&(year%100!==0||year%400===0);var MONTH_DAYS_LEAP_CUMULATIVE=[0,31,60,91,121,152,182,213,244,274,305,335];var MONTH_DAYS_REGULAR_CUMULATIVE=[0,31,59,90,120,151,181,212,243,273,304,334];var ydayFromDate=date=>{var leap=isLeapYear(date.getFullYear());var monthDaysCumulative=leap?MONTH_DAYS_LEAP_CUMULATIVE:MONTH_DAYS_REGULAR_CUMULATIVE;var yday=monthDaysCumulative[date.getMonth()]+date.getDate()-1;return yday};function __localtime_js(time,tmPtr){time=bigintToI53Checked(time);var date=new Date(time*1e3);HEAP32[tmPtr>>2]=date.getSeconds();HEAP32[tmPtr+4>>2]=date.getMinutes();HEAP32[tmPtr+8>>2]=date.getHours();HEAP32[tmPtr+12>>2]=date.getDate();HEAP32[tmPtr+16>>2]=date.getMonth();HEAP32[tmPtr+20>>2]=date.getFullYear()-1900;HEAP32[tmPtr+24>>2]=date.getDay();var yday=ydayFromDate(date)|0;HEAP32[tmPtr+28>>2]=yday;HEAP32[tmPtr+36>>2]=-(date.getTimezoneOffset()*60);var start=new Date(date.getFullYear(),0,1);var summerOffset=new Date(date.getFullYear(),6,1).getTimezoneOffset();var winterOffset=start.getTimezoneOffset();var dst=(summerOffset!=winterOffset&&date.getTimezoneOffset()==Math.min(winterOffset,summerOffset))|0;HEAP32[tmPtr+32>>2]=dst}var __mktime_js=function(tmPtr){var ret=(()=>{var date=new Date(HEAP32[tmPtr+20>>2]+1900,HEAP32[tmPtr+16>>2],HEAP32[tmPtr+12>>2],HEAP32[tmPtr+8>>2],HEAP32[tmPtr+4>>2],HEAP32[tmPtr>>2],0);if(isNaN(date.getTime())){return-1}var dst=HEAP32[tmPtr+32>>2];var guessedOffset=date.getTimezoneOffset();var start=new Date(date.getFullYear(),0,1);var summerOffset=new Date(date.getFullYear(),6,1).getTimezoneOffset();var winterOffset=start.getTimezoneOffset();var dstOffset=Math.min(winterOffset,summerOffset);if(dst<0){HEAP32[tmPtr+32>>2]=Number(summerOffset!=winterOffset&&dstOffset==guessedOffset)}else if(dst>0!=(dstOffset==guessedOffset)){var nonDstOffset=Math.max(winterOffset,summerOffset);var trueOffset=dst>0?dstOffset:nonDstOffset;date.setTime(date.getTime()+(trueOffset-guessedOffset)*6e4)}HEAP32[tmPtr+24>>2]=date.getDay();var yday=ydayFromDate(date)|0;HEAP32[tmPtr+28>>2]=yday;HEAP32[tmPtr>>2]=date.getSeconds();HEAP32[tmPtr+4>>2]=date.getMinutes();HEAP32[tmPtr+8>>2]=date.getHours();HEAP32[tmPtr+12>>2]=date.getDate();HEAP32[tmPtr+16>>2]=date.getMonth();HEAP32[tmPtr+20>>2]=date.getYear();return date.getTime()/1e3})();return BigInt(ret)};var stringToUTF8Array=(str,heap,outIdx,maxBytesToWrite)=>{if(!(maxBytesToWrite>0))return 0;var startIdx=outIdx;var endIdx=outIdx+maxBytesToWrite-1;for(var i=0;i<str.length;++i){var u=str.codePointAt(i);if(u<=127){if(outIdx>=endIdx)break;heap[outIdx++]=u}else if(u<=2047){if(outIdx+1>=endIdx)break;heap[outIdx++]=192|u>>6;heap[outIdx++]=128|u&63}else if(u<=65535){if(outIdx+2>=endIdx)break;heap[outIdx++]=224|u>>12;heap[outIdx++]=128|u>>6&63;heap[outIdx++]=128|u&63}else{if(outIdx+3>=endIdx)break;heap[outIdx++]=240|u>>18;heap[outIdx++]=128|u>>12&63;heap[outIdx++]=128|u>>6&63;heap[outIdx++]=128|u&63;i++}}heap[outIdx]=0;return outIdx-startIdx};var stringToUTF8=(str,outPtr,maxBytesToWrite)=>stringToUTF8Array(str,HEAPU8,outPtr,maxBytesToWrite);var __tzset_js=(timezone,daylight,std_name,dst_name)=>{var currentYear=(new Date).getFullYear();var winter=new Date(currentYear,0,1);var summer=new Date(currentYear,6,1);var winterOffset=winter.getTimezoneOffset();var summerOffset=summer.getTimezoneOffset();var stdTimezoneOffset=Math.max(winterOffset,summerOffset);HEAPU32[timezone>>2]=stdTimezoneOffset*60;HEAP32[daylight>>2]=Number(winterOffset!=summerOffset);var extractZone=timezoneOffset=>{var sign=timezoneOffset>=0?"-":"+";var absOffset=Math.abs(timezoneOffset);var hours=String(Math.floor(absOffset/60)).padStart(2,"0");var minutes=String(absOffset%60).padStart(2,"0");return`UTC${sign}${hours}${minutes}`};var winterName=extractZone(winterOffset);var summerName=extractZone(summerOffset);if(summerOffset<winterOffset){stringToUTF8(winterName,std_name,17);stringToUTF8(summerName,dst_name,17)}else{stringToUTF8(winterName,dst_name,17);stringToUTF8(summerName,std_name,17)}};var _emscripten_get_now=()=>performance.now();var _emscripten_date_now=()=>Date.now();var nowIsMonotonic=1;var checkWasiClock=clock_id=>clock_id>=0&&clock_id<=3;function _clock_time_get(clk_id,ignored_precision,ptime){ignored_precision=bigintToI53Checked(ignored_precision);if(!checkWasiClock(clk_id)){return 28}var now;if(clk_id===0){now=_emscripten_date_now()}else if(nowIsMonotonic){now=_emscripten_get_now()}else{return 52}var nsec=Math.round(now*1e3*1e3);HEAP64[ptime>>3]=BigInt(nsec);return 0}var getHeapMax=()=>2147483648;var alignMemory=(size,alignment)=>Math.ceil(size/alignment)*alignment;var growMemory=size=>{var oldHeapSize=wasmMemory.buffer.byteLength;var pages=(size-oldHeapSize+65535)/65536|0;try{wasmMemory.grow(pages);updateMemoryViews();return 1}catch(e){}};var _emscripten_resize_heap=requestedSize=>{var oldSize=HEAPU8.length;requestedSize>>>=0;var maxHeapSize=getHeapMax();if(requestedSize>maxHeapSize){return false}for(var cutDown=1;cutDown<=4;cutDown*=2){var overGrownHeapSize=oldSize*(1+.2/cutDown);overGrownHeapSize=Math.min(overGrownHeapSize,requestedSize+100663296);var newSize=Math.min(maxHeapSize,alignMemory(Math.max(requestedSize,overGrownHeapSize),65536));var replacement=growMemory(newSize);if(replacement){return true}}return false};var _fd_close=fd=>52;var UTF8Decoder=globalThis.TextDecoder&&new TextDecoder;var findStringEnd=(heapOrArray,idx,maxBytesToRead,ignoreNul)=>{var maxIdx=idx+maxBytesToRead;if(ignoreNul)return maxIdx;while(heapOrArray[idx]&&!(idx>=maxIdx))++idx;return idx};var UTF8ArrayToString=(heapOrArray,idx=0,maxBytesToRead,ignoreNul)=>{var endPtr=findStringEnd(heapOrArray,idx,maxBytesToRead,ignoreNul);if(endPtr-idx>16&&heapOrArray.buffer&&UTF8Decoder){return UTF8Decoder.decode(heapOrArray.subarray(idx,endPtr))}var str="";while(idx<endPtr){var u0=heapOrArray[idx++];if(!(u0&128)){str+=String.fromCharCode(u0);continue}var u1=heapOrArray[idx++]&63;if((u0&224)==192){str+=String.fromCharCode((u0&31)<<6|u1);continue}var u2=heapOrArray[idx++]&63;if((u0&240)==224){u0=(u0&15)<<12|u1<<6|u2}else{u0=(u0&7)<<18|u1<<12|u2<<6|heapOrArray[idx++]&63}if(u0<65536){str+=String.fromCharCode(u0)}else{var ch=u0-65536;str+=String.fromCharCode(55296|ch>>10,56320|ch&1023)}}return str};var UTF8ToString=(ptr,maxBytesToRead,ignoreNul)=>ptr?UTF8ArrayToString(HEAPU8,ptr,maxBytesToRead,ignoreNul):"";var _fd_fdstat_get=(fd,pbuf)=>{var rightsBase=0;var rightsInheriting=0;var flags=0;{var type=2;if(fd==0){rightsBase=2}else if(fd==1||fd==2){rightsBase=64}flags=1}HEAP8[pbuf]=type;HEAP16[pbuf+2>>1]=flags;HEAP64[pbuf+8>>3]=BigInt(rightsBase);HEAP64[pbuf+16>>3]=BigInt(rightsInheriting);return 0};function _fd_seek(fd,offset,whence,newOffset){offset=bigintToI53Checked(offset);return 70}var printCharBuffers=[null,[],[]];var printChar=(stream,curr)=>{var buffer=printCharBuffers[stream];if(curr===0||curr===10){(stream===1?out:err)(UTF8ArrayToString(buffer));buffer.length=0}else{buffer.push(curr)}};var _fd_write=(fd,iov,iovcnt,pnum)=>{var num=0;for(var i=0;i<iovcnt;i++){var ptr=HEAPU32[iov>>2];var len=HEAPU32[iov+4>>2];iov+=8;for(var j=0;j<len;j++){printChar(fd,HEAPU8[ptr+j])}num+=len}HEAPU32[pnum>>2]=num;return 0};var runAndAbortIfError=func=>{try{return func()}catch(e){abort(e)}};var handleException=e=>{if(e instanceof ExitStatus||e=="unwind"){return EXITSTATUS}quit_(1,e)};var runtimeKeepaliveCounter=0;var keepRuntimeAlive=()=>noExitRuntime||runtimeKeepaliveCounter>0;var _proc_exit=code=>{EXITSTATUS=code;if(!keepRuntimeAlive()){Module["onExit"]?.(code);ABORT=true}quit_(code,new ExitStatus(code))};var exitJS=(status,implicit)=>{EXITSTATUS=status;_proc_exit(status)};var _exit=exitJS;var maybeExit=()=>{if(!keepRuntimeAlive()){try{_exit(EXITSTATUS)}catch(e){handleException(e)}}};var callUserCallback=func=>{if(ABORT){return}try{return func()}catch(e){handleException(e)}finally{maybeExit()}};var runtimeKeepalivePush=()=>{runtimeKeepaliveCounter+=1};var runtimeKeepalivePop=()=>{runtimeKeepaliveCounter-=1};var Asyncify={instrumentWasmImports(imports){var importPattern=/^(invoke_.*|__asyncjs__.*)$/;for(let[x,original]of Object.entries(imports)){if(typeof original=="function"){let isAsyncifyImport=original.isAsync||importPattern.test(x)}}},instrumentFunction(original){var wrapper=(...args)=>{Asyncify.exportCallStack.push(original);try{return original(...args)}finally{if(!ABORT){var top=Asyncify.exportCallStack.pop();Asyncify.maybeStopUnwind()}}};Asyncify.funcWrappers.set(original,wrapper);return wrapper},instrumentWasmExports(exports){var ret={};for(let[x,original]of Object.entries(exports)){if(typeof original=="function"){var wrapper=Asyncify.instrumentFunction(original);ret[x]=wrapper}else{ret[x]=original}}return ret},State:{Normal:0,Unwinding:1,Rewinding:2,Disabled:3},state:0,StackSize:4096,currData:null,handleSleepReturnValue:0,exportCallStack:[],callstackFuncToId:new Map,callStackIdToFunc:new Map,funcWrappers:new Map,callStackId:0,asyncPromiseHandlers:null,sleepCallbacks:[],getCallStackId(func){if(!Asyncify.callstackFuncToId.has(func)){var id=Asyncify.callStackId++;Asyncify.callstackFuncToId.set(func,id);Asyncify.callStackIdToFunc.set(id,func)}return Asyncify.callstackFuncToId.get(func)},maybeStopUnwind(){if(Asyncify.currData&&Asyncify.state===Asyncify.State.Unwinding&&Asyncify.exportCallStack.length===0){Asyncify.state=Asyncify.State.Normal;runAndAbortIfError(_asyncify_stop_unwind);if(typeof Fibers!="undefined"){Fibers.trampoline()}}},whenDone(){return new Promise((resolve,reject)=>{Asyncify.asyncPromiseHandlers={resolve,reject}})},allocateData(){var ptr=_malloc(12+Asyncify.StackSize);Asyncify.setDataHeader(ptr,ptr+12,Asyncify.StackSize);Asyncify.setDataRewindFunc(ptr);return ptr},setDataHeader(ptr,stack,stackSize){HEAPU32[ptr>>2]=stack;HEAPU32[ptr+4>>2]=stack+stackSize},setDataRewindFunc(ptr){var bottomOfCallStack=Asyncify.exportCallStack[0];var rewindId=Asyncify.getCallStackId(bottomOfCallStack);HEAP32[ptr+8>>2]=rewindId},getDataRewindFunc(ptr){var id=HEAP32[ptr+8>>2];var func=Asyncify.callStackIdToFunc.get(id);return func},doRewind(ptr){var original=Asyncify.getDataRewindFunc(ptr);var func=Asyncify.funcWrappers.get(original);return callUserCallback(func)},handleSleep(startAsync){if(ABORT)return;if(Asyncify.state===Asyncify.State.Normal){var reachedCallback=false;var reachedAfterCallback=false;startAsync((handleSleepReturnValue=0)=>{if(ABORT)return;Asyncify.handleSleepReturnValue=handleSleepReturnValue;reachedCallback=true;if(!reachedAfterCallback){return}Asyncify.state=Asyncify.State.Rewinding;runAndAbortIfError(()=>_asyncify_start_rewind(Asyncify.currData));if(typeof MainLoop!="undefined"&&MainLoop.func){MainLoop.resume()}var asyncWasmReturnValue,isError=false;try{asyncWasmReturnValue=Asyncify.doRewind(Asyncify.currData)}catch(err){asyncWasmReturnValue=err;isError=true}var handled=false;if(!Asyncify.currData){var asyncPromiseHandlers=Asyncify.asyncPromiseHandlers;if(asyncPromiseHandlers){Asyncify.asyncPromiseHandlers=null;(isError?asyncPromiseHandlers.reject:asyncPromiseHandlers.resolve)(asyncWasmReturnValue);handled=true}}if(isError&&!handled){throw asyncWasmReturnValue}});reachedAfterCallback=true;if(!reachedCallback){Asyncify.state=Asyncify.State.Unwinding;Asyncify.currData=Asyncify.allocateData();if(typeof MainLoop!="undefined"&&MainLoop.func){MainLoop.pause()}runAndAbortIfError(()=>_asyncify_start_unwind(Asyncify.currData))}}else if(Asyncify.state===Asyncify.State.Rewinding){Asyncify.state=Asyncify.State.Normal;runAndAbortIfError(_asyncify_stop_rewind);_free(Asyncify.currData);Asyncify.currData=null;Asyncify.sleepCallbacks.forEach(callUserCallback)}else{abort(`invalid state: ${Asyncify.state}`)}return Asyncify.handleSleepReturnValue},handleAsync:startAsync=>Asyncify.handleSleep(async wakeUp=>{wakeUp(await startAsync())})};var getCFunc=ident=>{var func=Module["_"+ident];return func};var writeArrayToMemory=(array,buffer)=>{HEAP8.set(array,buffer)};var lengthBytesUTF8=str=>{var len=0;for(var i=0;i<str.length;++i){var c=str.charCodeAt(i);if(c<=127){len++}else if(c<=2047){len+=2}else if(c>=55296&&c<=57343){len+=4;++i}else{len+=3}}return len};var stackAlloc=sz=>__emscripten_stack_alloc(sz);var stringToUTF8OnStack=str=>{var size=lengthBytesUTF8(str)+1;var ret=stackAlloc(size);stringToUTF8(str,ret,size);return ret};var ccall=(ident,returnType,argTypes,args,opts)=>{var toC={string:str=>{var ret=0;if(str!==null&&str!==undefined&&str!==0){ret=stringToUTF8OnStack(str)}return ret},array:arr=>{var ret=stackAlloc(arr.length);writeArrayToMemory(arr,ret);return ret}};function convertReturnValue(ret){if(returnType==="string"){return UTF8ToString(ret)}if(returnType==="boolean")return Boolean(ret);return ret}var func=getCFunc(ident);var cArgs=[];var stack=0;if(args){for(var i=0;i<args.length;i++){var converter=toC[argTypes[i]];if(converter){if(stack===0)stack=stackSave();cArgs[i]=converter(args[i])}else{cArgs[i]=args[i]}}}var previousAsync=Asyncify.currData;var ret=func(...cArgs);function onDone(ret){runtimeKeepalivePop();if(stack!==0)stackRestore(stack);return convertReturnValue(ret)}var asyncMode=opts?.async;runtimeKeepalivePush();if(Asyncify.currData!=previousAsync){return Asyncify.whenDone().then(onDone)}ret=onDone(ret);if(asyncMode)return Promise.resolve(ret);return ret};var cwrap=(ident,returnType,argTypes,opts)=>{var numericArgs=!argTypes||argTypes.every(type=>type==="number"||type==="boolean");var numericRet=returnType!=="string";if(numericRet&&numericArgs&&!opts){return getCFunc(ident)}return(...args)=>ccall(ident,returnType,argTypes,args,opts)};{if(Module["noExitRuntime"])noExitRuntime=Module["noExitRuntime"];if(Module["print"])out=Module["print"];if(Module["printErr"])err=Module["printErr"];if(Module["wasmBinary"])wasmBinary=Module["wasmBinary"];if(Module["arguments"])arguments_=Module["arguments"];if(Module["thisProgram"])thisProgram=Module["thisProgram"];if(Module["preInit"]){if(typeof Module["preInit"]=="function")Module["preInit"]=[Module["preInit"]];while(Module["preInit"].length>0){Module["preInit"].shift()()}}}Module["ccall"]=ccall;Module["cwrap"]=cwrap;Module["UTF8ToString"]=UTF8ToString;function __asyncjs__mrb_llm_emscripten_fetch(url,method,headers,body){return Asyncify.handleAsync(async()=>{const urlValue=UTF8ToString(url);const methodValue=UTF8ToString(method);const headersValue=headers?UTF8ToString(headers):"";const bodyValue=body?UTF8ToString(body):"";const requestHeaders={};if(headersValue.length>0){for(const line of headersValue.split("\n")){if(!line)continue;const separator=line.indexOf(":");if(separator<0)continue;const key=line.slice(0,separator).trim();const value=line.slice(separator+1).trim();if(key)requestHeaders[key]=value}}try{const isNode=typeof process!=="undefined"&&!!process.versions?.node;let status;let statusText;let contentType;let text;if(isNode){const{request}=await import(urlValue.startsWith("https:")?"node:https":"node:http");const response=await new Promise((resolve,reject)=>{const req=request(urlValue,{method:methodValue,headers:requestHeaders},res=>{const chunks=[];res.on("data",chunk=>chunks.push(chunk));res.on("end",()=>{resolve({status:res.statusCode||0,statusText:res.statusMessage||"",contentType:res.headers["content-type"]||"",text:Buffer.concat(chunks).toString("utf8")})});res.on("error",reject)});req.on("error",reject);if(bodyValue.length>0)req.write(bodyValue);req.end()});status=response.status;statusText=response.statusText;contentType=response.contentType;text=response.text}else{const response=await fetch(urlValue,{method:methodValue,headers:requestHeaders,body:bodyValue.length>0?bodyValue:undefined});status=response.status;statusText=response.statusText||"";contentType=response.headers.get("content-type")||"";text=await response.text()}const payload=`${status}\n${contentType}\n${text}`;const size=lengthBytesUTF8(payload)+1;const pointer=_malloc(size);stringToUTF8(payload,pointer,size);return pointer}catch(error){const detailParts=[];if(error?.message)detailParts.push(error.message);if(error?.cause?.message)detailParts.push(`cause=${error.cause.message}`);if(error?.code)detailParts.push(`code=${error.code}`);if(error?.cause?.code)detailParts.push(`cause_code=${error.cause.code}`);if(detailParts.length===0)detailParts.push(String(error)||"fetch failed");const detail=detailParts.join(" | ");const message=`-1\n${methodValue} ${urlValue}: ${detail}\n`;const size=lengthBytesUTF8(message)+1;const pointer=_malloc(size);stringToUTF8(message,pointer,size);return pointer}})}function __asyncjs__mrb_llm_emscripten_fetch_stream(url,method,headers,body){return Asyncify.handleAsync(async()=>{const urlValue=UTF8ToString(url);const methodValue=UTF8ToString(method);const headersValue=headers?UTF8ToString(headers):"";const bodyValue=body?UTF8ToString(body):"";const requestHeaders={};function pushChunk(chunkText){if(!chunkText)return;const size=lengthBytesUTF8(chunkText)+1;const pointer=_malloc(size);stringToUTF8(chunkText,pointer,size);const ok=_wasm_llm_stream_push(pointer);_free(pointer);if(!ok){throw new Error("stream callback failed")}}if(headersValue.length>0){for(const line of headersValue.split("\n")){if(!line)continue;const separator=line.indexOf(":");if(separator<0)continue;const key=line.slice(0,separator).trim();const value=line.slice(separator+1).trim();if(key)requestHeaders[key]=value}}try{const isNode=typeof process!=="undefined"&&!!process.versions?.node;let status;let contentType;let text="";if(isNode){const{request}=await import(urlValue.startsWith("https:")?"node:https":"node:http");const response=await new Promise((resolve,reject)=>{const req=request(urlValue,{method:methodValue,headers:requestHeaders},async res=>{try{const responseContentType=res.headers["content-type"]||"";if(String(responseContentType).includes("text/event-stream")){for await(const chunk of res){pushChunk(Buffer.from(chunk).toString("utf8"))}resolve({status:res.statusCode||0,contentType:responseContentType,text:""});return}const chunks=[];for await(const chunk of res){chunks.push(Buffer.from(chunk))}resolve({status:res.statusCode||0,contentType:responseContentType,text:Buffer.concat(chunks).toString("utf8")})}catch(error){reject(error)}});req.on("error",reject);if(bodyValue.length>0)req.write(bodyValue);req.end()});status=response.status;contentType=response.contentType;text=response.text}else{const response=await fetch(urlValue,{method:methodValue,headers:requestHeaders,body:bodyValue.length>0?bodyValue:undefined});status=response.status;contentType=response.headers.get("content-type")||"";if(contentType.includes("text/event-stream")&&response.body){const reader=response.body.getReader();const decoder=new TextDecoder;while(true){const{done,value}=await reader.read();if(done)break;pushChunk(decoder.decode(value,{stream:true}))}pushChunk(decoder.decode())}else{text=await response.text()}}const payload=`${status}\n${contentType}\n${text}`;const size=lengthBytesUTF8(payload)+1;const pointer=_malloc(size);stringToUTF8(payload,pointer,size);return pointer}catch(error){const detailParts=[];if(error?.message)detailParts.push(error.message);if(error?.cause?.message)detailParts.push(`cause=${error.cause.message}`);if(error?.code)detailParts.push(`code=${error.code}`);if(error?.cause?.code)detailParts.push(`cause_code=${error.cause.code}`);if(detailParts.length===0)detailParts.push(String(error)||"fetch failed");const detail=detailParts.join(" | ");const message=`-1\n${methodValue} ${urlValue}: ${detail}\n`;const size=lengthBytesUTF8(message)+1;const pointer=_malloc(size);stringToUTF8(message,pointer,size);return pointer}})}function mrb_llm_host_write(stream_id,content){const write=Module.__wasmLLMHostStreamWrite;if(!write){throw new Error("wasm host stream bridge is not initialized")}write(stream_id,UTF8ToString(content))}function mrb_llm_host_tool_call(tool_id,arguments_json){const call=Module.__wasmLLMHostToolCall;const payload=arguments_json?UTF8ToString(arguments_json):"{}";if(!call){throw new Error("wasm host tool bridge is not initialized")}try{const result=call(tool_id,JSON.parse(payload||"{}"));const json=JSON.stringify({ok:true,result});const size=lengthBytesUTF8(json)+1;const pointer=_malloc(size);stringToUTF8(json,pointer,size);return pointer}catch(error){const json=JSON.stringify({ok:false,error:error?.message||String(error)||"host tool failed"});const size=lengthBytesUTF8(json)+1;const pointer=_malloc(size);stringToUTF8(json,pointer,size);return pointer}}var _wasm_llm_init,_free,_malloc,_wasm_llm_close,_wasm_llm_eval,_wasm_llm_call,_wasm_llm_last_result,_wasm_llm_last_error,_wasm_llm_stream_push,_setThrew,__emscripten_stack_restore,__emscripten_stack_alloc,_emscripten_stack_get_current,dynCall_iii,dynCall_iiii,dynCall_iiiii,dynCall_vi,dynCall_ii,dynCall_vii,dynCall_viiii,dynCall_dd,dynCall_viiiii,dynCall_iiiiiii,dynCall_viii,dynCall_iid,dynCall_ddd,dynCall_i,dynCall_jiji,dynCall_iidiiii,_asyncify_start_unwind,_asyncify_stop_unwind,_asyncify_start_rewind,_asyncify_stop_rewind,memory,__indirect_function_table,wasmMemory,wasmTable;function assignWasmExports(wasmExports){_wasm_llm_init=Module["_wasm_llm_init"]=wasmExports["F"];_free=Module["_free"]=wasmExports["G"];_malloc=Module["_malloc"]=wasmExports["H"];_wasm_llm_close=Module["_wasm_llm_close"]=wasmExports["I"];_wasm_llm_eval=Module["_wasm_llm_eval"]=wasmExports["J"];_wasm_llm_call=Module["_wasm_llm_call"]=wasmExports["K"];_wasm_llm_last_result=Module["_wasm_llm_last_result"]=wasmExports["L"];_wasm_llm_last_error=Module["_wasm_llm_last_error"]=wasmExports["M"];_wasm_llm_stream_push=Module["_wasm_llm_stream_push"]=wasmExports["O"];_setThrew=wasmExports["P"];__emscripten_stack_restore=wasmExports["Q"];__emscripten_stack_alloc=wasmExports["R"];_emscripten_stack_get_current=wasmExports["S"];dynCall_iii=dynCalls["iii"]=wasmExports["T"];dynCall_iiii=dynCalls["iiii"]=wasmExports["U"];dynCall_iiiii=dynCalls["iiiii"]=wasmExports["V"];dynCall_vi=dynCalls["vi"]=wasmExports["W"];dynCall_ii=dynCalls["ii"]=wasmExports["X"];dynCall_vii=dynCalls["vii"]=wasmExports["Y"];dynCall_viiii=dynCalls["viiii"]=wasmExports["Z"];dynCall_dd=dynCalls["dd"]=wasmExports["_"];dynCall_viiiii=dynCalls["viiiii"]=wasmExports["$"];dynCall_iiiiiii=dynCalls["iiiiiii"]=wasmExports["aa"];dynCall_viii=dynCalls["viii"]=wasmExports["ba"];dynCall_iid=dynCalls["iid"]=wasmExports["ca"];dynCall_ddd=dynCalls["ddd"]=wasmExports["da"];dynCall_i=dynCalls["i"]=wasmExports["ea"];dynCall_jiji=dynCalls["jiji"]=wasmExports["fa"];dynCall_iidiiii=dynCalls["iidiiii"]=wasmExports["ga"];_asyncify_start_unwind=wasmExports["ha"];_asyncify_stop_unwind=wasmExports["ia"];_asyncify_start_rewind=wasmExports["ja"];_asyncify_stop_rewind=wasmExports["ka"];memory=wasmMemory=wasmExports["D"];__indirect_function_table=wasmTable=wasmExports["N"]}var wasmImports={A:__asyncjs__mrb_llm_emscripten_fetch,z:__asyncjs__mrb_llm_emscripten_fetch_stream,w:__abort_js,l:__emscripten_throw_longjmp,o:__gmtime_js,p:__localtime_js,q:__mktime_js,r:__tzset_js,n:_clock_time_get,v:_emscripten_date_now,m:_emscripten_resize_heap,u:_fd_close,t:_fd_fdstat_get,s:_fd_seek,j:_fd_write,B:invoke_i,C:invoke_ii,f:invoke_iid,b:invoke_iii,a:invoke_iiii,g:invoke_iiiii,k:invoke_iiiiiii,h:invoke_vi,c:invoke_vii,e:invoke_viii,d:invoke_viiii,i:invoke_viiiii,x:mrb_llm_host_tool_call,y:mrb_llm_host_write};function invoke_vii(index,a1,a2){var sp=stackSave();try{dynCall_vii(index,a1,a2)}catch(e){stackRestore(sp);if(!(e instanceof EmscriptenEH))throw e;_setThrew(1,0)}}function invoke_ii(index,a1){var sp=stackSave();try{return dynCall_ii(index,a1)}catch(e){stackRestore(sp);if(!(e instanceof EmscriptenEH))throw e;_setThrew(1,0)}}function invoke_iiii(index,a1,a2,a3){var sp=stackSave();try{return dynCall_iiii(index,a1,a2,a3)}catch(e){stackRestore(sp);if(!(e instanceof EmscriptenEH))throw e;_setThrew(1,0)}}function invoke_vi(index,a1){var sp=stackSave();try{dynCall_vi(index,a1)}catch(e){stackRestore(sp);if(!(e instanceof EmscriptenEH))throw e;_setThrew(1,0)}}function invoke_iiiii(index,a1,a2,a3,a4){var sp=stackSave();try{return dynCall_iiiii(index,a1,a2,a3,a4)}catch(e){stackRestore(sp);if(!(e instanceof EmscriptenEH))throw e;_setThrew(1,0)}}function invoke_iii(index,a1,a2){var sp=stackSave();try{return dynCall_iii(index,a1,a2)}catch(e){stackRestore(sp);if(!(e instanceof EmscriptenEH))throw e;_setThrew(1,0)}}function invoke_viiiii(index,a1,a2,a3,a4,a5){var sp=stackSave();try{dynCall_viiiii(index,a1,a2,a3,a4,a5)}catch(e){stackRestore(sp);if(!(e instanceof EmscriptenEH))throw e;_setThrew(1,0)}}function invoke_viiii(index,a1,a2,a3,a4){var sp=stackSave();try{dynCall_viiii(index,a1,a2,a3,a4)}catch(e){stackRestore(sp);if(!(e instanceof EmscriptenEH))throw e;_setThrew(1,0)}}function invoke_iiiiiii(index,a1,a2,a3,a4,a5,a6){var sp=stackSave();try{return dynCall_iiiiiii(index,a1,a2,a3,a4,a5,a6)}catch(e){stackRestore(sp);if(!(e instanceof EmscriptenEH))throw e;_setThrew(1,0)}}function invoke_viii(index,a1,a2,a3){var sp=stackSave();try{dynCall_viii(index,a1,a2,a3)}catch(e){stackRestore(sp);if(!(e instanceof EmscriptenEH))throw e;_setThrew(1,0)}}function invoke_iid(index,a1,a2){var sp=stackSave();try{return dynCall_iid(index,a1,a2)}catch(e){stackRestore(sp);if(!(e instanceof EmscriptenEH))throw e;_setThrew(1,0)}}function invoke_i(index){var sp=stackSave();try{return dynCall_i(index)}catch(e){stackRestore(sp);if(!(e instanceof EmscriptenEH))throw e;_setThrew(1,0)}}function run(){preRun();function doRun(){Module["calledRun"]=true;if(ABORT)return;initRuntime();readyPromiseResolve?.(Module);Module["onRuntimeInitialized"]?.();postRun()}if(Module["setStatus"]){Module["setStatus"]("Running...");setTimeout(()=>{setTimeout(()=>Module["setStatus"](""),1);doRun()},1)}else{doRun()}}var wasmExports;wasmExports=await (createWasm());run();if(runtimeInitialized){moduleRtn=Module}else{moduleRtn=new Promise((resolve,reject)=>{readyPromiseResolve=resolve;readyPromiseReject=reject})}
;return moduleRtn}
const KWARGS = Symbol("wasm-llm.kwargs");
const RUNTIME = Symbol("wasm-llm.runtime");
const REF = Symbol("wasm-llm.ref");
const CLASS = Symbol("wasm-llm.class");
const HOST_STREAM = Symbol("wasm-llm.host-stream");
const HOST_TOOL = Symbol("wasm-llm.host-tool");
const ASYNC_METHODS = new Set([
  "ask",
  "complete",
  "embed",
  "respond",
  "talk"
]);

class WasmLLMError extends Error {
  constructor(error) {
    super(error?.message || "wasm runtime error");
    this.name = error?.type || "WasmLLMError";
    this.cause = error;
  }
}

class RemoteObject {
  constructor(runtime, ref, className) {
    this[RUNTIME] = runtime;
    this[REF] = ref;
    this[CLASS] = className;
  }

  free() {
    this[RUNTIME]._call("object.free", {id: this[REF]});
  }

  toJSON() {
    return {__ref__: this[REF]};
  }
}

class HostTool {
  constructor(runtime, definition) {
    this[RUNTIME] = runtime;
    this.name = String(definition?.name ?? "");
    this.description = definition?.description == null ? "" : String(definition.description);
    this.parameters = definition?.parameters ?? {};
    this.required = Array.isArray(definition?.required) ? definition.required.map(String) : [];
    this.call = typeof definition?.call === "function" ? definition.call : null;
  }

  toJSON() {
    return {
      __host_tool__: {
        id: this[RUNTIME]._registerHostTool(this),
        name: this.name,
        description: this.description,
        parameters: this.parameters,
        required: this.required
      }
    };
  }
}

function kwargs(value) {
  return {[KWARGS]: true, value};
}

function isPlainObject(value) {
  return !!value && Object.getPrototypeOf(value) === Object.prototype;
}

function isHostWritable(value) {
  return !!value && typeof value === "object" && typeof value.write === "function";
}

function isHostTool(value) {
  return value instanceof HostTool;
}

function isZodSchema(value) {
  return !!value && typeof value === "object" &&
    !!value._zod && !!value._zod.def && typeof value._zod.def.type === "string";
}

function zodMaybeDescription(schema, target) {
  const description = schema?.description ?? schema?._zod?.def?.description;
  if (description != null && description !== "") {
    target.description = String(description);
  }
  return target;
}

function zodInnerSchema(def) {
  return def.innerType || def.inner || def.schema || def.typeDef || def.unwrap || null;
}

function zodObjectShape(def) {
  if (typeof def.shape === "function") return def.shape();
  if (def.shape && typeof def.shape === "object") return def.shape;
  return {};
}

function zodLiteralValue(def) {
  if (Object.prototype.hasOwnProperty.call(def, "value")) return def.value;
  if (Array.isArray(def.values) && def.values.length === 1) return def.values[0];
  return undefined;
}

function zodEnumValues(def) {
  if (Array.isArray(def.entries)) return def.entries;
  if (Array.isArray(def.values)) return def.values;
  if (def.entries && typeof def.entries === "object") return Object.values(def.entries);
  if (def.enum && typeof def.enum === "object") return Object.values(def.enum);
  return null;
}

function zodOptionSchemas(def) {
  return def.options || def.items || [];
}

function zodToJSONSchema(schema) {
  return zodConvertSchema(schema).schema;
}

function zodConvertSchema(schema) {
  const def = schema?._zod?.def;
  if (!def || typeof def.type !== "string") {
    throw new Error("unsupported Zod schema; pass z.toJSONSchema(...) explicitly");
  }

  switch (def.type) {
    case "string":
      return {schema: zodMaybeDescription(schema, {type: "string"}), optional: false};
    case "number":
      return {schema: zodMaybeDescription(schema, {type: "number"}), optional: false};
    case "boolean":
      return {schema: zodMaybeDescription(schema, {type: "boolean"}), optional: false};
    case "null":
      return {schema: zodMaybeDescription(schema, {type: "null"}), optional: false};
    case "literal": {
      const value = zodLiteralValue(def);
      if (value === undefined) {
        throw new Error("unsupported Zod literal schema; pass z.toJSONSchema(...) explicitly");
      }
      return {schema: zodMaybeDescription(schema, {const: value}), optional: false};
    }
    case "enum": {
      const values = zodEnumValues(def);
      if (!values) {
        throw new Error("unsupported Zod enum schema; pass z.toJSONSchema(...) explicitly");
      }
      return {schema: zodMaybeDescription(schema, {enum: values}), optional: false};
    }
    case "array": {
      const inner = def.element || def.items || def.item;
      if (!inner) {
        throw new Error("unsupported Zod array schema; pass z.toJSONSchema(...) explicitly");
      }
      return {
        schema: zodMaybeDescription(schema, {
          type: "array",
          items: zodConvertSchema(inner).schema
        }),
        optional: false
      };
    }
    case "object": {
      const shape = zodObjectShape(def);
      const properties = {};
      const required = [];

      Object.entries(shape).forEach(([key, inner]) => {
        const converted = zodConvertSchema(inner);
        properties[key] = converted.schema;
        if (!converted.optional) required.push(key);
      });

      const objectSchema = {type: "object", properties, additionalProperties: false};
      if (required.length > 0) objectSchema.required = required;
      return {schema: zodMaybeDescription(schema, objectSchema), optional: false};
    }
    case "union": {
      const options = zodOptionSchemas(def);
      if (!Array.isArray(options) || options.length === 0) {
        throw new Error("unsupported Zod union schema; pass z.toJSONSchema(...) explicitly");
      }
      return {
        schema: zodMaybeDescription(schema, {
          oneOf: options.map((option) => zodConvertSchema(option).schema)
        }),
        optional: false
      };
    }
    case "nullable": {
      const inner = zodInnerSchema(def);
      if (!inner) {
        throw new Error("unsupported Zod nullable schema; pass z.toJSONSchema(...) explicitly");
      }
      return {
        schema: zodMaybeDescription(schema, {
          oneOf: [zodConvertSchema(inner).schema, {type: "null"}]
        }),
        optional: false
      };
    }
    case "optional": {
      const inner = zodInnerSchema(def);
      if (!inner) {
        throw new Error("unsupported Zod optional schema; pass z.toJSONSchema(...) explicitly");
      }
      const converted = zodConvertSchema(inner);
      return {schema: converted.schema, optional: true};
    }
    case "default": {
      const inner = zodInnerSchema(def);
      if (!inner) {
        throw new Error("unsupported Zod default schema; pass z.toJSONSchema(...) explicitly");
      }
      const converted = zodConvertSchema(inner);
      return {schema: converted.schema, optional: true};
    }
    default:
      throw new Error(`unsupported Zod schema type ${JSON.stringify(def.type)}; pass z.toJSONSchema(...) explicitly`);
  }
}

function normalizeToolParameters(parameters, required) {
  if (isZodSchema(parameters)) {
    return zodToJSONSchema(parameters);
  }
  if (!parameters || typeof parameters !== "object" || Array.isArray(parameters)) {
    return {type: "object", properties: {}, required: required ?? []};
  }
  if (parameters.type || parameters.properties || parameters.additionalProperties != null) {
    return parameters;
  }
  return {
    type: "object",
    properties: parameters,
    required: required ?? []
  };
}

function serialize(value, runtime = null) {
  if (value == null || typeof value === "string" || typeof value === "number" || typeof value === "boolean") {
    return value;
  }
  if (Array.isArray(value)) {
    return value.map((inner) => serialize(inner, runtime));
  }
  if (value instanceof RemoteObject) {
    return {__ref__: value[REF]};
  }
  if (isHostTool(value)) {
    if (value[RUNTIME] !== runtime) {
      throw new Error("host tool belongs to a different wasm runtime");
    }
    return value.toJSON();
  }
  if (runtime && isHostWritable(value)) {
    return {__host_stream__: runtime._registerHostStream(value)};
  }
  if (value && value[KWARGS]) {
    return {__kwargs__: serialize(value.value, runtime)};
  }
  if (isPlainObject(value)) {
    return Object.fromEntries(Object.entries(value).map(([key, inner]) => [key, serialize(inner, runtime)]));
  }
  return value;
}

function splitArgs(args, treatSingleObjectAsKwargs = false, runtime = null) {
  if (args.length === 1 && treatSingleObjectAsKwargs && isPlainObject(args[0])) {
    return {args: [], kwargs: serialize(args[0], runtime)};
  }

  if (args.length > 1 && treatSingleObjectAsKwargs && isPlainObject(args[args.length - 1])) {
    return {
      args: args.slice(0, -1).map((value) => serialize(value, runtime)),
      kwargs: serialize(args[args.length - 1], runtime)
    };
  }

  const last = args[args.length - 1];
  if (last && last[KWARGS]) {
    return {
      args: args.slice(0, -1).map((value) => serialize(value, runtime)),
      kwargs: serialize(last.value, runtime)
    };
  }

  return {
    args: args.map((value) => serialize(value, runtime)),
    kwargs: {}
  };
}

function createInstanceProxy(runtime, object) {
  return new Proxy(object, {
    get(target, prop, receiver) {
      if (prop === "then") return undefined;
      if (prop in target) return Reflect.get(target, prop, receiver);
      if (typeof prop !== "string") return undefined;
      return (...args) => {
        const payload = splitArgs(args, false, runtime);
        const request = {
          id: target[REF],
          method: prop,
          args: payload.args,
          kwargs: payload.kwargs
        };
        if (ASYNC_METHODS.has(prop)) {
          return runtime._callAsync("object.call", request).then((value) => runtime._wrap(value));
        }
        return runtime._wrap(runtime._call("object.call", request));
      };
    }
  });
}

function createConstantProxy(runtime, descriptor, ClassCtor) {
  return new Proxy(ClassCtor, {
    get(target, prop, receiver) {
      if (prop in target) return Reflect.get(target, prop, receiver);
      if (typeof prop !== "string") return undefined;
      return (...args) => {
        const payload = splitArgs(args, false, runtime);
        return runtime._wrap(runtime._call("constant.call", {
          constant: descriptor.ruby,
          method: prop,
          args: payload.args,
          kwargs: payload.kwargs
        }));
      };
    }
  });
}

class WasmLLMRuntime {
  constructor(Module, descriptor) {
    this.Module = Module;
    this.descriptor = descriptor;
    this.constants = new Map();
    this.hostStreams = new Map();
    this.hostTools = new Map();
    this.nextHostStreamId = 1;
    this.nextHostToolId = 1;

    this.Module.__wasmLLMHostStreamWrite = (id, content) => {
      const stream = this.hostStreams.get(id);
      if (!stream) return;
      stream.write(String(content ?? ""));
    };
    this.Module.__wasmLLMHostToolCall = (id, argumentsObject) => {
      const tool = this.hostTools.get(id);
      if (!tool) {
        throw new Error(`host tool not found: ${id}`);
      }
      if (typeof tool.call !== "function") {
        throw new Error(`host tool ${tool.name || id} does not implement call()`);
      }
      const result = tool.call(argumentsObject || {});
      if (result && typeof result.then === "function") {
        throw new Error(`host tool ${tool.name || id} returned a Promise; only synchronous tools are supported`);
      }
      return result;
    };

    Object.entries(descriptor.constants || {}).forEach(([name, entry]) => {
      const runtime = this;
      const Constructable = class extends RemoteObject {
        constructor(...args) {
          if (args.length === 3 && args[0] instanceof WasmLLMRuntime && typeof args[1] === "number") {
            super(args[0], args[1], args[2]);
            return createInstanceProxy(args[0], this);
          }
          if (entry.construct !== true) {
            throw new Error(`${name} is not constructible from JavaScript`);
          }
          const payload = splitArgs(args, entry.kwargs === true, runtime);
          const ref = runtime._call("object.construct", {
            constant: entry.ruby,
            args: payload.args,
            kwargs: payload.kwargs
          });
          super(runtime, ref.__ref__, ref.class);
          return createInstanceProxy(runtime, this);
        }
      };

      Object.defineProperty(Constructable, "name", {value: name});
      this.constants.set(entry.ruby, Constructable);
      if (entry.ruby === "LLM::Tool") {
        this[name] = new Proxy(function Tool(definition) {
          return runtime._defineTool(definition);
        }, {
          get(target, prop, receiver) {
            if (prop in target) return Reflect.get(target, prop, receiver);
            return Reflect.get(createConstantProxy(runtime, entry, Constructable), prop, receiver);
          }
        });
      } else {
        this[name] = createConstantProxy(runtime, entry, Constructable);
      }
    });

    this._installProviderMethods();
  }

  kwargs(value) {
    return kwargs(value);
  }

  close() {
    this.Module.ccall("wasm_llm_close", null, [], []);
  }

  eval(code) {
    const raw = this.Module.ccall("wasm_llm_eval", "string", ["string"], [code]);
    if (!raw) {
      throw new Error(this.Module.ccall("wasm_llm_last_error", "string", [], []) || "wasm eval failed");
    }
    return raw;
  }

  _registerHostStream(stream) {
    if (stream[HOST_STREAM]) return stream[HOST_STREAM];
    const id = this.nextHostStreamId++;
    this.hostStreams.set(id, stream);
    Object.defineProperty(stream, HOST_STREAM, {
      value: id,
      configurable: false,
      enumerable: false
    });
    return id;
  }

  _registerHostTool(tool) {
    if (tool[HOST_TOOL]) return tool[HOST_TOOL];
    const id = this.nextHostToolId++;
    this.hostTools.set(id, tool);
    Object.defineProperty(tool, HOST_TOOL, {
      value: id,
      configurable: false,
      enumerable: false
    });
    return id;
  }

  _defineTool(definition = {}) {
    return new HostTool(this, {
      ...definition,
      parameters: normalizeToolParameters(definition.parameters, definition.required)
    });
  }

  _call(method, params = {}) {
    const raw = this.Module.ccall("wasm_llm_call", "string", ["string"], [
      JSON.stringify({method, params})
    ]);
    if (!raw) {
      throw new Error(this.Module.ccall("wasm_llm_last_error", "string", [], []) || "wasm call failed");
    }
    const response = JSON.parse(raw);
    if (!response.ok) throw new WasmLLMError(response.error);
    return response.result;
  }

  async _callAsync(method, params = {}) {
    const raw = await this.Module.ccall("wasm_llm_call", "string", ["string"], [
      JSON.stringify({method, params})
    ], {async: true});
    if (!raw) {
      throw new Error(this.Module.ccall("wasm_llm_last_error", "string", [], []) || "wasm call failed");
    }
    const response = JSON.parse(raw);
    if (!response.ok) throw new WasmLLMError(response.error);
    return response.result;
  }

  _wrap(value) {
    if (!value || typeof value !== "object" || !value.__ref__) return value;
    const ClassCtor = this.constants.get(value.class) || RemoteObject;
    return new ClassCtor(this, value.__ref__, value.class);
  }

  _installProviderMethods() {
    const providers = ["anthropic", "deepseek", "google", "llamacpp", "ollama", "openai", "xai", "zai"];
    providers.forEach((name) => {
      this[name] = (...args) => this._wrap(this._call("constant.call", {
        constant: "LLM",
        method: name,
        ...splitArgs(args, true, this)
      }));
    });
  }
}

export default async function createWasmLLM(options = {}) {
  const Module = await createWasmLLMCore(options.module || {});
  const ok = Module.ccall("wasm_llm_init", "number", [], []);
  if (!ok) {
    throw new Error(Module.ccall("wasm_llm_last_error", "string", [], []) || "failed to initialize wasm runtime");
  }

  const raw = Module.ccall("wasm_llm_call", "string", ["string"], [
    JSON.stringify({method: "runtime.describe", params: {}})
  ]);
  if (!raw) {
    throw new Error(Module.ccall("wasm_llm_last_error", "string", [], []) || "failed to describe runtime");
  }

  const response = JSON.parse(raw);
  if (!response.ok) throw new WasmLLMError(response.error);
  return new WasmLLMRuntime(Module, response.result);
}

export {WasmLLMError, kwargs};
