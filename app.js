window.addEventListener("load", function () {
  //#region ====== Tabs (This is what the user-made workouts should look and behave like)======
  const firstTab = new Kai({
    name: "Marklyft",
    data: {
      title: "_firstTab_",
    },
    components: [],
    verticalNavClass: ".firstTabNav",
    templateUrl: document.location.origin + "/templates/tabs/firstTab.html",
    mounted: function () {
      const savedUl = localStorage.getItem("ul");
      document.querySelector(".marklyft").innerHTML = savedUl;
    },
    unmounted: function () {},
    methods: {},
    softKeyText: { left: "-", center: "Save", right: "+" },
    softKeyListener: {
      left: function tabLeftSoftKey() {
        const listNav = document.querySelectorAll(this.verticalNavClass);
        if (this.verticalNavIndex > -1) {
          let oldWeight = listNav[this.verticalNavIndex].innerHTML;
          let newWeight = parseFloat(oldWeight) - 2.5;
          listNav[this.verticalNavIndex].innerHTML = newWeight;
        }
      },
      center: function () {
        this.$router.showToast("Saved!");

        const marklyft = document.querySelector(".marklyft");
        localStorage.setItem("ul", marklyft.innerHTML);

        const listNav = document.querySelectorAll(this.verticalNavClass);
        if (this.verticalNavIndex > -1) {
          listNav[this.verticalNavIndex].style.backgroundColor = "#EBEBE4";
          listNav[this.verticalNavIndex].style.color = "#808e95";
          this.navigateListNav(1);
        }
      },
      right: function () {
        const listNav = document.querySelectorAll(this.verticalNavClass);
        if (this.verticalNavIndex > -1) {
          let oldWeight = listNav[this.verticalNavIndex].innerHTML;
          let newWeight = parseFloat(oldWeight) + 2.5;
          listNav[this.verticalNavIndex].innerHTML = newWeight;
        }
      },
    },
    dPadNavListener: {
      arrowUp: function () {
        this.navigateListNav(-1);
      },
      arrowDown: function () {
        this.navigateListNav(1);
      },
    },
  });

  const secondTab = new Kai({
    name: "Rodd",
    data: {
      title: "_secondTab_",
    },
    verticalNavClass: ".secondTabNav",
    templateUrl: document.location.origin + "/templates/tabs/secondTab.html",
    mounted: function () {},
    unmounted: function () {},
    methods: {},
    softKeyText: { left: "-", center: "Spara", right: "+" },
    softKeyListener: {
      left: function () {
        localStorage.removeItem("ul");
      },
      center: function () {
        this.$router.showToast("Saved!");
      },
      right: function () {
        const listNav = document.querySelectorAll(this.verticalNavClass);
        if (this.verticalNavIndex > -1) {
          listNav[this.verticalNavIndex].innerHTML = count += 2.5;
        }
      },
    },
    dPadNavListener: {
      arrowUp: function () {
        this.navigateListNav(-1);
      },
      arrowDown: function () {
        this.navigateListNav(1);
      },
    },
  });

  const thirdTab = new Kai({
    name: "Latsdrag",
    data: {
      title: "_thirdTab_",
    },
    verticalNavClass: ".thirdTabNav",
    templateUrl: document.location.origin + "/templates/tabs/thirdTab.html",
    mounted: function () {},
    unmounted: function () {},
    methods: {},
    softKeyText: { left: "-", center: "Spara", right: "+" },
    softKeyListener: {
      left: function () {
        const listNav = document.querySelectorAll(this.verticalNavClass);
        if (this.verticalNavIndex > -1) {
          listNav[this.verticalNavIndex].innerHTML = count -= 2.5;
        }
      },
      center: function () {
        this.$router.showToast("Saved!");
      },
      right: function () {
        const listNav = document.querySelectorAll(this.verticalNavClass);
        if (this.verticalNavIndex > -1) {
          listNav[this.verticalNavIndex].innerHTML = count += 2.5;
        }
      },
    },
    dPadNavListener: {
      arrowUp: function () {
        this.navigateListNav(-1);
      },
      arrowDown: function () {
        this.navigateListNav(1);
      },
    },
  });

  const fourthTab = new Kai({
    name: "Facepulls",
    data: {
      title: "_fourthTab_",
    },
    verticalNavClass: ".fourthTabNav",
    templateUrl: document.location.origin + "/templates/tabs/fourthTab.html",
    mounted: function () {},
    unmounted: function () {},
    methods: {},
    softKeyText: { left: "-", center: "Spara", right: "+" },
    softKeyListener: {
      left: function () {
        const listNav = document.querySelectorAll(this.verticalNavClass);
        if (this.verticalNavIndex > -1) {
          listNav[this.verticalNavIndex].innerHTML = count -= 2.5;
        }
      },
      center: function () {
        this.$router.showToast("Saved!");
      },
      right: function () {
        const listNav = document.querySelectorAll(this.verticalNavClass);
        if (this.verticalNavIndex > -1) {
          listNav[this.verticalNavIndex].innerHTML = count += 2.5;
        }
      },
    },
    dPadNavListener: {
      arrowUp: function () {
        this.navigateListNav(-1);
      },
      arrowDown: function () {
        this.navigateListNav(1);
      },
    },
  });

  //#endregion

  //#region ====== Child_1/firstchild/Options ======

  const firstChild = new Kai({
    name: "_CHILD_ 1",
    data: {
      title: "_CHILD_ 1",
      selected: "None",
      opts: [
        { text: "Edit workout", checked: true },
        { text: "Delete workout", checked: false },
        { text: "Add workout", checked: false },
      ],
    },
    verticalNavClass: ".child1Nav",
    components: [],
    templateUrl: document.location.origin + "/templates/child_1.html",
    mounted: function () {},
    unmounted: function () {},
    methods: {
      listenState: function (data) {
        this.render();
      },
      selected: function (val) {
        this.setData({ selected: val.text });
      },
      push: function () {
        this.$router.push("second");
      },
      testOptMenu: function () {
        const idx = this.data.opts.findIndex((opt) => {
          return opt.text === this.data.selected;
        });
        this.$router.showOptionMenu(
          "Options",
          this.data.opts,
          "Select",
          (selected) => {
            this.setData({ selected: selected.text });
          },
          undefined,
          idx
        );
      },
    },
    softKeyText: { left: "", center: "Select", right: "Options" },
    softKeyListener: {
      left: function () {},
      center: function () {
        const listNav = document.querySelectorAll(this.verticalNavClass);
        if (this.verticalNavIndex > -1) {
          listNav[this.verticalNavIndex].click();
        }
      },
      right: function () {
        const idx = this.data.opts.findIndex((opt) => {
          return opt.text === this.data.selected;
        });
        this.$router.showOptionMenu(
          "Options",
          this.data.opts,
          "Select",
          (selected) => {
            this.setData({ selected: selected.text });
          },
          undefined,
          idx
        );
      },
    },

    dPadNavListener: {
      arrowUp: function () {
        this.navigateListNav(-1);
      },
      arrowRight: function () {
        // this.navigateTabNav(-1);
      },
      arrowDown: function () {
        this.navigateListNav(1);
      },
      arrowLeft: function () {
        // this.navigateTabNav(1);
      },
    },
  });

  //#endregion

  //#region ====== Child_2/secondchild This is also what user-made workouts should be like======

  const secondChild = Kai.createTabNav("_CHILD_ 2", ".child2DemoNav", [
    firstTab,
    secondTab,
    thirdTab,
    fourthTab,
  ]);

  //#endregion

  //#region ====== Startpage ======
  const router = new KaiRouter({
    title: "GymApp",
    routes: {
      index: {
        name: "firstChild",
        component: firstChild,
      },
      second: {
        name: "secondChild",
        component: secondChild,
      },
    },
  });

  //#endregion

  const app = new Kai({
    name: "_APP_",
    data: {},
    templateUrl: document.location.origin + "/templates/template.html",
    mounted: function () {},
    unmounted: function () {},
    router,
  });

  try {
    app.mount("app");
    //setTimeout(function() {
    //secondChild.mount('app');
    //}, 2000);
  } catch (e) {
    console.log(e);
  }
});
