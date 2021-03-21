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
      if (savedUl != null)
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

  const fifthTab = new Kai({
    name: "Facepulls",
    data: {
      title: "_fourthTab_",
    },
    verticalNavClass: ".fifthTabNav",
    templateUrl: document.location.origin + "/templates/tabs/fourthTab.html",
    mounted: function () {},
    unmounted: function () {},
    methods: {},
    softKeyText: { left: "-", center: "Spara", right: "+" },
    softKeyListener: {
      left: function () {},
      center: function () {},
      right: function () {},
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
    mounted: function () {
      console.log("In firstChild");
      let workOuts = JSON.parse(localStorage.getItem("workouts"));
      for (let c = 0; workOuts != null && c < workOuts.length; c++) {
        let htmlTemplate =
          "<div class='kui-frontpage-separator'></div>" +
          "<li class='child1Nav' @click='push(\"" +
          workOuts[c].title +
          "\")'>" +
          workOuts[c].title +
          "<svg class='svg' width='40' height='60'><polyline points='10 10 30 30 10 50' stroke='#9d46ff' stroke-width='5' stroke-linecap='butt' fill='none' stroke-linejoin='round'>&lt;</polyline></svg></li>";
        document.getElementById("workOutList").innerHTML += htmlTemplate;
      }
    },
    unmounted: function () {},
    methods: {
      listenState: function (data) {
        this.render();
      },
      selected: function (val) {
        this.setData({ selected: val.text });
      },
      push: function (elem = null) {
        if (elem == null || elem == "") this.$router.push("second");
        else this.$router.push(elem);
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
            if (idx == 2) this.$router.push("addChild");
            else if (idx == 0) this.$router.push("editChild");
            else if (idx == 1) this.$router.push("delChild");
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
  const addChild = new Kai({
    // Component for Adding Workout
    name: "_ADD_",
    data: {
      numEx: 1,
    },
    verticalNavClass: ".child2Nav",
    templateUrl: document.location.origin + "/templates/addWorkout.html",
    mounted: function () {},
    unmounted: function () {},
    methods: {},
    softKeyText: { left: "Add", center: "Save", right: "Del Last" },
    softKeyListener: {
      left: function () {
        // edit the exTemplate to modify the style of the added input agents
        try {
          let exTemplate = document.createElement("div");
          exTemplate.setAttribute("class", "exerInp");
          exTemplate.setAttribute("id", "Ex" + String(this.data.numEx));
          exTemplate.innerHTML =
            String(this.data.numEx) +
            ")." +
            "<input name='ex" +
            String(this.data.numEx) +
            "'class='child2Nav' placeholder='Exercise Name' value=''>" +
            "</input>" +
            "<input name='set" +
            String(this.data.numEx) +
            "'class='child2Nav' placeholder='Sets'></input><input name='rep" +
            String(this.data.numEx) +
            "'class='child2Nav' placeholder='Reps'></input>";
          document.getElementById("exers").appendChild(exTemplate);
          this.data.numEx++;
        } catch (e) {
          console.log(e.mesage);
        }
      },
      center: function () {
        let exTitle = document.getElementById("inp1").value;
        let arr = $("#exers").serializeArray();
        let obj = {};
        obj.title = exTitle;
        obj.exercises = [];
        for (let c = 0; c < arr.length; c += 3) {
          obj.exercises.push({
            title: arr[c].value,
            sets: arr[c + 1].value,
            reps: arr[c + 2].value,
          });
        }
        try {
          let workouts = localStorage.getItem("workouts");
          if (workouts == null) workouts = [];
          else workouts = JSON.parse(workouts);
          workouts.push(obj);
          localStorage.setItem("workouts", JSON.stringify(workouts));
          this.$router.showToast("Saved !");
        } catch (e) {
          console.log(e);
        }
      },
      right: function () {
        if (this.data.numEx > 1) {
          try {
            document
              .getElementById("Ex" + String(this.data.numEx - 1))
              .remove();
            this.data.numEx--;
          } catch (e) {
            console.log(e.message);
          }
        }
      },
    },
    dPadNavListener: {},
    backKeyListener: function () {},
  });

  const editChild = new Kai({
    // Component for editing Workout
    name: "_EDIT_",
    data: {
      title: "_EDIT_",
      counter: -1,
    },
    verticalNavClass: ".child2Nav",
    templateUrl: document.location.origin + "/templates/editWorkout.html",
    mounted: function () {},
    unmounted: function () {},
    methods: {},
    softKeyText: {},
    softKeyListener: {},
    dPadNavListener: {},
    backKeyListener: function () {},
  });

  const delChild = new Kai({
    // Component for delete Workout
    name: "_DEL_",
    data: {
      title: "_DEL_",
      counter: -1,
    },
    verticalNavClass: ".child2Nav",
    templateUrl: document.location.origin + "/templates/delWorkout.html",
    mounted: function () {},
    unmounted: function () {},
    methods: {},
    softKeyText: {},
    softKeyListener: {},
    dPadNavListener: {},
    backKeyListener: function () {},
  });
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
      addChild: {
        name: "addChild",
        component: addChild,
      },
      editChild: {
        name: "editWorkout",
        component: editChild,
      },
      delChild: {
        name: "delWorkout",
        component: delChild,
      },
    },
  });

  //#endregion
  function constructExerciseComponent(obj) {
    function constructTabs(exs) {
      let arr = [];
      for (let i = 0; i < exs.length; i++) {
        let Tab = new Kai({
          name: exs[i].title,
          data: {
            title: exs[i].title,
          },
          components: [],
          verticalNavClass: ".firstTabNav" + i,
          templateUrl:
            document.location.origin + "/templates/workout/tabTemplate.html",
          mounted: function () {
            const savedUl = localStorage.getItem(exs[i].title);
            if (savedUl != null)
              document.querySelector("head").innerHTML = savedUl;
            else {
              for (let c = 0; c < Number(exs[i].sets); c++)
                document.getElementById("sets").innerHTML +=
                  "<div class='kui-sets-separator'></div><li></li>";
              for (let c = 0; c < Number(exs[i].sets); c++)
                document.getElementById("reps").innerHTML +=
                  "<div class='kui-sets-separator'></div><li class='child2Nav firstTabNav'>" +
                  exs[i].reps +
                  "</li>";
            }
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

              const exers = document.querySelector(exs[i].title);
              localStorage.setItem(exs[i].title, exers.innerHTML);

              const listNav = document.querySelectorAll(this.verticalNavClass);
              if (this.verticalNavIndex > -1) {
                listNav[this.verticalNavIndex].style.backgroundColor =
                  "#EBEBE4";
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
        arr.push(Tab);
      }
      return arr;
    }
    let newChild = Kai.createTabNav(
      "_CHILD_ 4",
      ".child4DemoNav",
      constructTabs(obj.exercises)
    );
    return newChild;
  }
  const app = new Kai({
    name: "_APP_",
    data: {},
    templateUrl: document.location.origin + "/templates/template.html",
    mounted: function () {
      let workOutList = JSON.parse(localStorage.getItem("workouts"));
      for (let c = 0; workOutList != null && c < workOutList.length; c++) {
        router.routes[workOutList[c].title] = {
          name: workOutList[c].title,
          component: constructExerciseComponent(workOutList[c]),
        };
      }
    },
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
