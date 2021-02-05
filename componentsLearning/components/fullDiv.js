app.component("full-div", {
  template:
    /*html */
    `<div><div v-html="content" style="width: 100%; background-color: lightblue"></div></div>`,
  props: {
    content: {
      required: true,
    },
  },
  data() {
    return {
      test: true,
    };
  },
});
