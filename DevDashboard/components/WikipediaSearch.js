//Widget Wikipedia Search
DevD.component("wikipedia-search", {
  template:
    /*html*/
    `<div id="divWikipedia" class="divRectangle">
        <h2>{{ name }}</h2>
        <p><input type="text" placeholder="Pick a word">
            <button>Search it!</button>
            <button>Go on the page X</button>
        </p>
        <h3>Result:</h3>
        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Amet animi dolore eius excepturi optio quo
            sint voluptates. Architecto asperiores cupiditate dolore dolores esse facilis ipsa odit quam quibusdam!
        </p>
    </div>`,
  data() {
    return {
      name: "Wikipedia Search",
    };
  },
});
