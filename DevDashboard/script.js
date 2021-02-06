//DevDashboard app
const DevDConst = {
  data() {
    return {
      appDescription:
        "An evolving dashboard with widgets that help you develop apps with lots of external tools collected and personalized in one web page.",
      appVersion: "0.2",
      appVersionDate: "01.01.2021",
      authorFullname: "Samuel Roland",
    };
  },
};

const DevD = Vue.createApp(DevDConst);
