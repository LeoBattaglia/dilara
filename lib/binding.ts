/*
function twoWay(object,dom){
	if(!object.__cb__) {
  	Object.defineProperty(object,'__cb__',{value: [], enumerable: false})
  }
  let objectValue = undefined;
	if(!object.hasOwnProperty('value')){
  	Object.defineProperty(object,'value',{
    	'get'(){ return objectValue; },
	  	'set'(newVal){
      	if(object.value == newVal) return;
      	object.__cb__.forEach(cb=>{
        	cb(newVal);
        })
        objectValue = newVal;
    	}
  	})
  }
  object.__cb__.push(value=>{
  	let type = {
    	'checkbox'(){ dom.checked = !!value; },
      'radio'(){ dom.checked = (value == dom.value) },
      'default'(){ dom.value = value; }
    }
    type[dom.type] ? type[dom.type]() : type.default();
   });
  let eventCallBack = ()=>{
  	let type = {
    	'checkbox'(){	object.value = dom.checked; },
      'radio'(){ dom.checked ? object.value = dom.value : true ; },
      'default'(){ object.value = dom.value; }
    };
    type[dom.type] ? type[dom.type]() : type.default();
  };
  dom && dom.addEventListener('change', eventCallBack ,false);
  dom && dom.addEventListener('input', eventCallBack ,false);
  return { onUpdated(cb){ object.__cb__.push(cb); return this;} }
}

var test = window.test = {};
twoWay(test,document.getElementById('text')).onUpdated(val=>{ document.getElementById('show').textContent = val });
twoWay(test,document.getElementById('text2'));
twoWay(test,document.getElementById('text2'));
twoWay(test,document.getElementById('textarea'));
twoWay(test,document.getElementById('checkbox'));
twoWay(test,document.getElementById('radio1'));
twoWay(test,document.getElementById('radio2'));
twoWay(test,document.getElementById('select'));
 */

/*
HTML:
<input type="text" id="text">
<input type="text" id="text2">
<input type="checkbox" id="checkbox">
<textarea placeholder="add multiple lines" id="textarea"></textarea>
<input type="radio" id="radio1" value="one">
<input type="radio" id="radio2" value="two">
<select id="select">
  <option>A</option>
  <option>B</option>
  <option>C</option>
</select>
<div id="show"></div>
 */