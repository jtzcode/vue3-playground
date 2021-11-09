import {reactive, computed, watchEffect} from 'vue';

let obj = {
    count: 0
};
let countProxy = new Proxy(obj, {
    get: function(target, prop) {
        return target[prop];
    },
    set: function(target, prop, value) {
        target[prop] = value;
        if(prop === 'count') {
            console.log('The count value changed and will be reflected to View Model');
        }
        return true;
    },
    deleteProperty: function(target, prop) {
        delete target[prop];
        if (prop === 'count') {
            console.log('The count property is deleted');
        }
        return true;
    }
});

console.log(obj.count);
countProxy.count = 1;
console.log(obj.count);
delete countProxy.count;

// This is also using Proxy feature.
let rObj = reactive({
    count: 1
});
let double = computed(()=>rObj.count*2);
rObj.count = 2;

watchEffect(() => {
    console.log('Count data changed: ', rObj.count, double.value);
});


//export default CountProxy;