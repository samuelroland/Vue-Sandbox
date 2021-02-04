app.component("button-template", {
  template:
    /*html*/
    `<button v-on:click="openLink">{{ btnname }}</button>`,
  props: {
    link: {
      required: true,
    },
    btnname: {
      required: true,
    },
  },
  data() {
    return {
      test: "",
    };
  },
  methods: {
    openLink() {
      window.open(this.link, "_target");
    },
  },
});
