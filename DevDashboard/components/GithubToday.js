//Widget GitHub Today
DevD.component("github-today", {
  template:
    /*html*/
    `<div id="githubToday" class="divRectangle">
    <div class="flexdiv">
        <h2>GitHub today contributions</h2>
        <!--<div>{{ dateOfToday }}</div>-->
    </div>
</div>`,
  data() {
    return {
      dateOfToday: "date of today",
      nbOfCommits: null,
      reposContributed: null,
    };
  },
  mounted() {
    timestamp = new Date();
    this.dateOfToday =
      timestamp.getDay() +
      "-" +
      (timestamp.getUTCMonth() + 1) +
      "-" +
      timestamp.getFullYear();
  },
});
