/*Vue code here*/
const DevD = {
    data() {
        return {
            appDescription: "An evolving dashboard with widgets that help you develop apps with lots of external tools collected and personalized in one web page.",
            appVersion: "0.2",
            appVersionDate: "01.01.2021",
            authorFullname: "Samuel Roland",
        }
    }
}

//Widget strings stats
const widgStringsStats = {
    data() {
        return {
            content: "",
            words: [],
            totalChars: 0,
            totalWords: 0,
            totalWordsAdvanced: 0,
            separatorsListIfTotalWordsAdvanced: "",
            mostUsedWord: "",
            maxCharsToCheck: 100,
            maxCharsToCheckInfo: "",    //result of the check
            substringToSearch: "",
            nbTimesSubstringFound: 0,
            chkRegexOnWords: true,
            inpRegexOnWords: "",
            nbMatchesForRegex: 0,
            //Css:
            txtCssAddings: "",
            txtCssClasses: "widthmozavailable " + this.txtCssAddings
        }
    },
    methods: {
        calculateAllStats() {
            text = this.content
            this.totalChars = text.length

            //Calculate this.totalWords
            //Thanks to: https://stackoverflow.com/questions/19313541/split-a-string-based-on-multiple-delimiters#answer-19313673
            separators = [" "]
            this.words = text.trim().split(new RegExp('[' + separators.join('') + ']', 'g'));
            this.words = this.words.filter(function (el) { //trim and split with spaces on the text
                return (el != "")   //keep item of the array only if not empty string
            })
            this.totalWords = this.words.length
            //Trim with all non words chars to count advanced words (more separators):
            this.words = text.trim().split(e = new RegExp("[-_](?!\\w)|[-_](?<!\\w\\W)|[^\\w-_]"));  //split with "hard" regex to take all non words chars except - and _ if char before and after are words chars.
            console.log(e)
            this.words = this.words.filter(function (el) { //filter and remove empty values
                return (el != "")   //keep item of the array only if not empty string
            })
            this.totalWordsAdvanced = this.words.length
            this.separatorsListIfTotalWordsAdvanced = 'all not words chars, except \'_\' and \'-\''

            //Check that content.length respect this.maxCharsToCheck
            if (this.maxCharsToCheck >= this.content.length) {
                this.maxCharsToCheckInfo = "Respected !"
                this.manageErrorCssOnTextarea(false)
            } else {
                this.maxCharsToCheckInfo = "Exceeded !"
                this.manageErrorCssOnTextarea(true)
            }

            //Count occurrences of a string:
            //this.nbTimesSubstringFound = this.allIndexOf(this.content, this.substringToSearch).length

        },
        //Display or hide error css on text area
        manageErrorCssOnTextarea(display = true) {
            if (display == true) {
                this.txtCssAddings = "inputerror"
            } else {
                this.txtCssAddings = ""
            }
            this.loadTxtCssClasses()
        },
        loadTxtCssClasses() {   //load the txtCssClasses variable after modification of txtCssAddings
            this.txtCssClasses = "widthmozavailable " + this.txtCssAddings
        },
        ////Thanks to: https://stackoverflow.com/questions/3365902/search-for-all-instances-of-a-string-inside-a-string#answer-20968478
        //allIndexOf(str, toSearch) { //Get an array of all the position of a substring in a string
        //    if (str == null || toSearch == null) {
        //        return 0
        //    }
        //    indices = [];
        //    for (pos = str.indexOf(toSearch); pos !== -1; pos = str.indexOf(toSearch, pos + 1)) {
        //        indices.push(pos);
        //    }
        //    return indices;
        //}
    },
    mounted() {
        this.calculateAllStats()
    }
}

const githubToday = {
    data() {
        return {
            dateOfToday: "date of today",
            nbOfCommits: null,
            reposContributed: null
        }
    },
    mounted() {
        timestamp = new Date()
        this.dateOfToday = timestamp.getDay() + "-" + (timestamp.getUTCMonth() + 1) + "-" + timestamp.getFullYear()
    }
}

const githubReposInfo = {
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
            ownerBio: ""
        }
    },
    methods: {
        async loadInformation() {
            httpAddedInformation = {
                headers: {
                    "Authorization": "token " + githubApiToken2
                }
            }
            url1 = "https://api.github.com/repos/" + this.reposId
            await fetch(url1, httpAddedInformation)  //basic information on the repos
                .then((response) => {
                    return response.text();
                })
                .then((data) => {
                    data = JSON.parse(data)
                    console.log(data)
                    this.nbStars = data.stargazers_count
                    this.ownerUsername = data.owner.login
                    this.description = data.description
                    this.imgOwnerSrc = data.owner.avatar_url
                });

            url2 = "https://api.github.com/repos/" + this.reposId + "/releases"
            await fetch(url2, httpAddedInformation)  //information about the release
                .then((response) => {
                    return response.text();
                })
                .then((data) => {
                    data = JSON.parse(data)
                    console.log(data)
                    if (data[0] != null) {
                        lastReleaseDate = new Date(data[0].published_at)
                        lastReleaseDate = dateformat(lastReleaseDate, "d.m.Y")
                        this.lastReleaseName = data[0].tag_name + " le " + lastReleaseDate
                        this.releaseFound = true
                    } else {
                        this.releaseFound = false
                    }
                });

            url3 = "https://api.github.com/users/" + this.reposId.substr(0, this.reposId.indexOf("/"))
            await fetch(url3, httpAddedInformation)  //information about the release
                .then((response) => {
                    return response.text();
                })
                .then((data) => {
                    data = JSON.parse(data)
                    console.log(data)
                    this.ownerBio = data.bio
                    this.ownerFullname = data.name
                });

            this.isLoaded = true
        },
        goToReposOnGithub() {
            window.open("https://github.com/" + this.reposId, "_blank")
        },
        goToOwnerOnGithub() {
            window.open("https://github.com/" + this.reposId.substr(0, this.reposId.indexOf("/")), "_blank")
        },
        isReposIdValid() {
            text = this.reposId
            regex = "^[A-z_\\-.]{1,}\\/[A-z_\\-.]{1,}$"
            console.log(regex)
            console.log(text)
            tester = new RegExp(regex)
            console.log(tester)
            console.log(regex)
            console.log(text)
            this.isReposIdValidState = !tester.test(text)
        }
    }
}

function dateformat(date, format) {
    format = format.replace("Y", date.getFullYear())
    format = format.replace("m", date.getMonth() + 1)
    format = format.replace("d", date.getDate())
    return format
}

Vue.createApp(DevD).mount('#divAppTitle')
Vue.createApp(widgStringsStats).mount('#divStringsStats')
Vue.createApp(githubToday).mount("#githubToday")
Vue.createApp(githubReposInfo).mount("#githubReposInfo")
