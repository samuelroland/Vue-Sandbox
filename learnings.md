# VueJS memento

### Ressources:
https://www.vuemastery.com/courses/intro-to-vue-3


## Structure of components:

Simplification:
const app = {
  data: function () {
    message: "hey";
  },
};

const app = {
  data() {
    message: "hey";
  },
};

Mustache syntax/Double curly brace syntax:
Inside the mustaches `{{ }}` we can  JS expressions:
- {{ property }}
- {{ firstname + lastname }}
- {{ clicked ? true : false}}
- {{ message.method() }}


Basic component:

In `main.js`
```javascript
const app = Vue.createApp({
  data() {
    return {
      product: "Socks",
      description: "description coolss",
    };
  },
});
````
In `index.html`
```html
    <div id="app">
      <h1>{{ product }}</h1>
      <p>{{ description }}</p>
    </div>
    <script>const mountedApp = app.mount("#app")</script>
```

In the browser console:
```javascript
mountedApp.product = "Sandals"
```

### Binding attributes
Like `{{ message }}` that bind a value inside a markup in the DOM to a property, we can bind attributes values as well. We are not going to use the mustach syntax like 

```html
<div title="{{ messsage }}">test</div>
```

 Instead something called a directive is used. One directive is called `v-bind`. And we use it like that:
 ```html
<div v-bind:title="message">test</div>
```
We can bind: 
 ```html
<div v-bind:title="message">test</div>
<img :alt="description" :src="image" />
...
```

### Shorthand for v-bind
`v-bind:title="message"` => `:title="message"`.

## Conditional Rendering
- `v-if` insert or remove the element on the DOM depending on the given boolean value. 
Ex: `<p v-if="onSale">On Sale</p>` with property `onSale: false` will remove the element (not just hidden, really removed). If we want to hide instead of removing it, we can use `v-show` instead...
`v-else` directive exists too and take no value.

Example:
```html
<p v-if="inventory > 10">In stock</p>
<p v-else>Out of stock</p>
```

We can chain the if...else too (with using `v-else-if`).
```html
<p v-if="inventory > 10">In stock</p>
<p v-else-if="inventory <= 10 && inventory > 0">Almost sold out!</p>
<p v-else>Out of stock</p>
```

### List rendering



- component basic creation
- v-if
- v-model
- v-for
- {{ message }} = value in the DOM binded with a property
- v-bind:<attribute> = like {{ x }}, but for a html attribute binding
- v-on:<eventname> = start a method or execute code when event happens
- v-once = binging only once (then binding is ignored)
- v-html = interpolate raw html (binding ignored!)
