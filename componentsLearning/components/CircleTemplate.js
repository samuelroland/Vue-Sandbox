app.component("circle-template", {
  template:
    /*html*/
    `<div class="circle" :style="styles">{{ content }}</div>`,
  props: {
    content: {},
    bgcolor: {
      required: true,
    },
  },
  data() {
    return {
      styles: {
        backgroundColor: this.bgcolor,
      },
    };
  },
});
