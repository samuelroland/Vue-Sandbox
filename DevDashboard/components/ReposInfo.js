//Widget Repos Info
DevD.component("repos-info", {
  template:
    /*html*/
    `<div id="githubReposInfo" class="divRectangle">
    <h2>Repos information</h2>
    <input type="text" placeholder="author/repos" v-model="reposId" v-on:input="isReposIdValid">
    <button v-on:click="loadInformation" v-bind:disabled="isReposIdValidState">Search</button>
    <button v-on:click="goToReposOnGithub" v-bind:disabled="isReposIdValidState">Go to Repos</button>
    <button v-on:click="goToOwnerOnGithub" v-bind:disabled="isReposIdValidState">Go to Owner</button>
    <div class="flexdiv">
        <div class="flex-1">
            <div>Description: <em>{{ description }}</em></div>
            <div>Stars: {{ nbStars }}</div>
            <div>Commits: {{ nbCommits }}</div>
            <div v-if="releaseFound">Last release: <br>{{ lastReleaseName }}</div>
        </div>
        <div class="flexdiv ">
            <div class="p-2">
                <img class="avatar-img" v-bind:src="imgOwnerSrc" v-if="isLoaded"
                     alt="image of the repos owner">
            </div>
            <div class="p-2">
                <div>Owner: {{ ownerFullname }} - {{ ownerUsername }}</div>
                <div>Bio: <em>{{ ownerBio }}</em></div>
            </div>
        </div>
    </div>
    </div>`,
  data() {
    return {
      isLoaded: false,
      reposId: "samuelroland/KanFF",
      isReposIdValidState: false,
      description: "",
      nbStars: 0,
      nbCommits: 0,
      releaseFound: false,
      lastReleaseName: "",
      imgOwnerSrc: "",
      ownerFullname: "",
      ownerUsername: "",
      ownerBio: "",
    };
  },
  methods: {
    async loadInformation() {
      httpAddedInformation = {
        headers: {
          Authorization: "token " + githubApiToken2,
        },
      };
      url1 = "https://api.github.com/repos/" + this.reposId;
      await fetch(url1, httpAddedInformation) //basic information on the repos
        .then((response) => {
          return response.text();
        })
        .then((data) => {
          data = JSON.parse(data);
          console.log(data);
          this.nbStars = data.stargazers_count;
          this.ownerUsername = data.owner.login;
          this.description = data.description;
          this.imgOwnerSrc = data.owner.avatar_url;
        });

      url2 = "https://api.github.com/repos/" + this.reposId + "/releases";
      await fetch(url2, httpAddedInformation) //information about the release
        .then((response) => {
          return response.text();
        })
        .then((data) => {
          data = JSON.parse(data);
          console.log(data);
          if (data[0] != null) {
            lastReleaseDate = new Date(data[0].published_at);
            lastReleaseDate = dateformat(lastReleaseDate, "d.m.Y");
            this.lastReleaseName = data[0].tag_name + " le " + lastReleaseDate;
            this.releaseFound = true;
          } else {
            this.releaseFound = false;
          }
        });

      url3 =
        "https://api.github.com/users/" +
        this.reposId.substr(0, this.reposId.indexOf("/"));
      await fetch(url3, httpAddedInformation) //information about the release
        .then((response) => {
          return response.text();
        })
        .then((data) => {
          data = JSON.parse(data);
          console.log(data);
          this.ownerBio = data.bio;
          this.ownerFullname = data.name;
        });

      this.isLoaded = true;
    },
    goToReposOnGithub() {
      window.open("https://github.com/" + this.reposId, "_blank");
    },
    goToOwnerOnGithub() {
      window.open(
        "https://github.com/" +
          this.reposId.substr(0, this.reposId.indexOf("/")),
        "_blank"
      );
    },
    isReposIdValid() {
      text = this.reposId;
      regex = "^[A-z0-9-]{1,}\\/[A-z0-9_\\-.]{1,}$";
      console.log(regex);
      console.log(text);
      tester = new RegExp(regex);
      console.log(tester);
      console.log(regex);
      console.log(text);
      this.isReposIdValidState = !tester.test(text);
    },
  },
});

function dateformat(date, format) {
  format = format.replace("Y", date.getFullYear());
  format = format.replace("m", date.getMonth() + 1);
  format = format.replace("d", date.getDate());
  return format;
}
