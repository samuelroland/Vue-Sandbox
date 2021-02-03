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
To display element of an array in a list (`<ul>` and `<li>`), we need a new attribute called `v-for`.

In JS:
```javascript
const app = Vue.createApp({
  data() {
    return {
      details: ["50% cotton", "30% wool", "20% polyester"],
      variants: [
        { id: 2234, color: "green" },
        { id: 2235, color: "blue" },
      ],
    };
  },
});
```

In html, for **a simple for loop**:
```html
<ul>
<li v-for="detail in details">{{ detail }}</li>
</ul>
```

In html, with **multiples dimensions arrays**:
The key attribute is only for Vue and will be useful later (for animation).
```html
<div v-for="variant in variants" :key="variant.id">{{ variant.color }}</div>
```

In html, with **automatic indexes**.
```html
<ul>
  <li v-for="(size, index) in sizes" :key="index">{{ size }}</li>
</ul>
```

### Events handling
We can handle events with directive `v-on`. We can declare events listener like this (and directly include a JS expression):
```html
<button class="button" v-on:click="cart += 1">Add to Cart</button>
```

Or with a method called addToCart() written in `methods` array: 
```html
<button class="button" v-on:click="addToCart">Add to Cart</button>
```

```javascript
const app = Vue.createApp({
  data() {
    return {
      cart: 0
    };
  },
  methods: {
    addToCart() {
      this.cart += 1;
    },
  },
});
```

We can call methods with parameters:

```html
<div v-for="variant in variants" :key="variant.id" v-on:mouseover="updateImage(variant.image)">{{ variant.color }}</div>
```

```javascript
methods: {
  addToCart() {
    this.cart += 1;
  },
  updateImage(variantImage) {
    this.image = variantImage;
  },
},
```

### Shorthand for v-on
`v-on` is super common, so it exists a shorthand `@`: <div v-on:click="addToCart"></div> => <div @click="addToCart"></div>

### Class and style binding
First, if we declare a class and a binded class, the 2 will be merged. (But it's not possible to bind several times the same attribute (doing :class 2 times)).
`<button class="button" :class="[inStock ? '' : 'disabledButton']">Add</button>`.

`:class` can take a "class object" that is a list of boolean values with classes names as keys. These boolean values can be properties so the classes enabling can easily change during the app run.
Example:
```javascript
btnclasses: {
  active: isActived,
  bgred: false,
  grey: true,
}
```

`<div :class="btnclasses"></div>` then if isActived=true => `<div class="active grey"></div>`



`:style` can take a "style object" with the different styles to apply on the element written in javascript (camel case without dashes, like when typing `element.style.X`). (Here `chosenColor` is a property with "red" as value).
```javascript
btnstyles: {
  backgroundColor: chosenColor,
  fontSize: "purple"
}
```
=> Vue will render it like `<div style="background-color: red; font-size: purple;"></div>

It's possible to use it directly with css rules naming with quotes:
```javascript
btnstyles: {
  'background-color': chosenColor,
  'font-size': "purple"
}
```

## Computed properties
Computed properties are calculated properties calculated with other data (ex: a combination of properties)

Instead of writing: `<p>{{ brand + product}} </p>`
we can write `<p>{{ sentenceOnSale }}</p>` and a new method under `computed` part (the part for all computed properties):

```javascript
const app = Vue.createApp({
  data() {
    return {
      product: "Socks",
      brand: "Vue Mastery"
    };
  },
  methods: {
    addToCart() {
      this.cart += 1;
    }
  },
  computed: {
    sentenceOnSale() {
      if (this.onSale == true) {
        return this.brand + " " + this.product + " are on sale.";
      }
    },
  },
});
```

It can be really shorter if the property is a boolean value that result from a complex calculation and that is use to enable/disable or display/hide an element (for example).

```javascript
inStock() {
  return this.variants[this.selectedVariantIndex].quantity > 0;
},
```
=> We don't need to write this long line again like `v-if="this.variants[this.selectedVariantIndex].quantity > 0"`.


??part==option ??

## Resume of the memento
- component basic creation
- component structure
- v-if / v-show
- v-model
- v-for
- {{ message }} = value in the DOM binded with a property
- v-bind:<attribute> = like {{ x }}, but for a html attribute binding
- v-on:<eventname> = start a method or execute code when event happens
- v-once = binging only once (then binding is ignored)
- v-html = interpolate raw html (binding ignored!)
