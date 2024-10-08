window.addEventListener("load", function () {
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
      let workOuts = JSON.parse(localStorage.getItem("workouts"));
      for (let c = 0; workOuts != null && c < workOuts.length; c++) {
        let htmlTemplate =
          "<br>" +
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
        else {
          let workOuts = JSON.parse(localStorage.getItem("workouts"));
          this.$router.push(
            constructExerciseComponent(
              workOuts[workOuts.findIndex((temp) => temp.title == elem)]
            )
          );
        }
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
      arrowDown: function () {
        this.navigateListNav(1);
      },
    },
  });

  //#endregion

  //#region ====== Child_2/secondchild This is also what user-made workouts should be like======

  const secondChild = Kai.createTabNav("_CHILD_ 2", ".child2DemoNav", []);
  const addChild = new Kai({
    // Component for Adding Workout
    name: "_ADD_",
    data: {
      numEx: 1,
    },
    verticalNavClass: ".listNav",
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
            "'class='listNav' placeholder='Exercise Name' value=''>" +
            "</input>" +
            "<input class='listNav' name='set" +
            String(this.data.numEx) +
            "'class='listNav' placeholder='Sets'></input><input name='rep" +
            String(this.data.numEx) +
            "'class='listNav' placeholder='Reps'></input>";
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
          if (workouts == "" || workouts == null) workouts = [];
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
    dPadNavListener: {
      arrowUp: function () {
        this.navigateListNav(-1);
      },
      arrowDown: function () {
        this.navigateListNav(1);
      },
    },
    backKeyListener: function () {},
  });

  const editChild = new Kai({
    // Component for editing Workout
    name: "_EDIT_",
    data: {
      title: "_EDIT_",
      counter: -1,
    },
    verticalNavClass: ".child1Nav",
    templateUrl: document.location.origin + "/templates/editWorkout.html",
    mounted: function () {
      let workOuts = localStorage.getItem("workouts");
      if (workOuts == "" || workOuts == null) workOuts = [];
      else workOuts = JSON.parse(workOuts);
      for (let c = 0; workOuts != null && c < workOuts.length; c++) {
        let htmlTemplate =
          "<br>" +
          "<li class='child1Nav' @click='edit(\"" +
          workOuts[c].title +
          "\")'>" +
          workOuts[c].title +
          "<svg class='svg' width='40' height='60'><polyline points='10 10 30 30 10 50' stroke='#9d46ff' stroke-width='5' stroke-linecap='butt' fill='none' stroke-linejoin='round'>&lt;</polyline></svg></li>";
        document.getElementById("workOutList").innerHTML += htmlTemplate;
      }
    },
    unmounted: function () {},
    methods: {
      edit: function (val) {
        this.$router.push(
          new Kai({
            name: "_EDITCHILD_",
            data: {
              title: val,
              counter: -1,
            },
            verticalNavClass: ".listNav",
            templateUrl: document.location.origin + "/templates/editForm.html",
            mounted: function () {
              document
                .getElementById("__kai_soft_key__")
                .setAttribute("class", "kui-software-key listNav");
              let workOuts = JSON.parse(localStorage.getItem("workouts"));
              let workOut =
                workOuts[workOuts.findIndex((elem) => elem.title == val)];
              try {
                let exTemplate = document.createElement("div");
                exTemplate.setAttribute("class", "exerInp");
                exTemplate.setAttribute("id", "Ex");
                exTemplate.innerHTML +=
                  "<input id='inp1' value='" +
                  workOut.title +
                  "' class='listNav ' placeholder='Workout Name' ></input></br>";
                for (let c = 0; c < workOut.exercises.length; c++) {
                  exTemplate.innerHTML +=
                    String(c + 1) +
                    ")." +
                    "<input name='ex" +
                    String(c + 1) +
                    "'class='listNav' placeholder='Exercise Name' value='" +
                    workOut.exercises[c].title +
                    "'>" +
                    "</input>" +
                    "<input name='set" +
                    String(c + 1) +
                    "'class='listNav' placeholder='Sets' value='" +
                    workOut.exercises[c].sets +
                    "'></input><input name='rep" +
                    String(c + 1) +
                    "'class='listNav' placeholder='Reps' value='" +
                    workOut.exercises[c].reps +
                    "'></input>";
                }
                document.getElementById("exers").appendChild(exTemplate);
              } catch (e) {
                console.log(e);
              }
            },
            methods: {},
            softKeyText: { right: "Save" },
            softKeyListener: {
              right: function () {
                console.log("hi");
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
                  if (workouts == "" || workouts == null) workouts = [];
                  else workouts = JSON.parse(workouts);
                  if (obj.title == this.data.title) {
                    for (let c = 0; c < workouts.length; c++)
                      if (workouts[c].title == this.data.title)
                        workouts[c] = obj;
                  } else {
                    workouts = workouts.filter(
                      (elem) => elem.title != this.data.title
                    );
                    workouts.push(obj);
                    console.log(workouts);
                  }
                  localStorage.setItem("workouts", JSON.stringify(workouts));
                  this.$router.showToast("Saved !");
                } catch (e) {
                  this.$router.showToast("Failure !");
                  console.log(e);
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
            backKeyListener: function () {},
          })
        );
      },
    },
    softKeyText: { center: "Edit" },
    softKeyListener: {
      center: function () {
        const listNav = document.querySelectorAll(this.verticalNavClass);
        if (this.verticalNavIndex > -1) {
          listNav[this.verticalNavIndex].click();
        }
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
    backKeyListener: function () {},
  });

  const delChild = new Kai({
    // Component for delete Workout
    name: "_DEL_",
    data: {
      title: "_DEL_",
      counter: -1,
    },
    verticalNavClass: ".child1Nav",
    templateUrl: document.location.origin + "/templates/delWorkout.html",
    mounted: function () {
      let workOuts = JSON.parse(localStorage.getItem("workouts"));
      for (let c = 0; workOuts != null && c < workOuts.length; c++) {
        let htmlTemplate =
          "<br></div>" +
          "<li class='child1Nav' @click='delete(\"" +
          workOuts[c].title +
          "\")'>" +
          workOuts[c].title +
          "<svg class='svg' width='40' height='60'><polyline points='10 10 30 30 10 50' stroke='#9d46ff' stroke-width='5' stroke-linecap='butt' fill='none' stroke-linejoin='round'>&lt;</polyline></svg></li>";
        document.getElementById("workOutList").innerHTML += htmlTemplate;
      }
    },
    unmounted: function () {},
    methods: {
      delete: function (val) {
        try {
          let workout = JSON.parse(localStorage.getItem("workouts"));
          if (workout != null) console.log(workout);
          console.log(val);
          console.log(workout.findIndex((elem) => elem.title == val));
          workout.splice(
            workout.findIndex((elem) => elem.title == val),
            1
          );
          console.log(workout);
          if (workout.length != 0)
            localStorage.setItem("workouts", JSON.stringify(workout));
          else localStorage.removeItem("workouts");
          this.$router.showToast("Success !");
        } catch (e) {
          console.log(e);
          this.$router.showToast("Failed !");
        }
        return;
      },
    },
    softKeyText: { center: "Delete" },
    softKeyListener: {
      center: function () {
        const listNav = document.querySelectorAll(this.verticalNavClass);
        if (this.verticalNavIndex > -1) {
          listNav[this.verticalNavIndex].click();
        }
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
    backKeyListener: function () {},
  });
  //#endregion
  //#region ====== Startpage ======
  const routes = {
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
  };
  // try {
  //   let workOutList = localStorage.getItem("workouts");
  //   if (workOutList == "") workOutList = [];
  //   else workOutList = JSON.parse(workOutList);
  //   for (let c = 0; workOutList != null && c < workOutList.length; c++) {
  //     routes[workOutList[c].title] = {
  //       name: workOutList[c].title,
  //       component: (function () {
  //         let temp = constructExerciseComponent(workOutList[c]);
  //         //temp.$router = this.$router;
  //         return temp;
  //       })(),
  //     };
  //   }
  // } catch (e) {
  //   console.log(e);
  // }
  let router = new KaiRouter({
    title: "GymApp",
    routes: routes,
  });

  //#endregion
  function constructExerciseComponent(obj) {
    function constructTabs(workoutName, exs) {
      let arr = [];
      for (let i = 0; i < exs.length; i++) {
        let Tab = new Kai({
          name: exs[i].title,
          data: {
            title: exs[i].title,
          },
          components: [],
          verticalNavClass: ".firstTabNav",
          templateUrl:
            document.location.origin + "/templates/workout/tabTemplate.html",
          mounted: function () {
            let weights = localStorage.getItem(workoutName + exs[i].title);
            if (weights == "" || weights == null || weights == "null")
              weights = [];
            else weights = JSON.parse(weights);
            console.log(weights);
            if (weights.length == 0)
              weights = (function () {
                let arr = [];
                for (let c = 0; c < Number(exs[i].sets); c++) arr.push(0);
                return arr;
              })();
            for (let c = 0; c < Number(exs[i].sets); c++)
              document.getElementById("sets").innerHTML +=
                "<div class='kui-sets-separator'></div><li></li>";
            for (let c = 0; c < Number(exs[i].sets); c++)
              document.getElementById("reps").innerHTML +=
                "<div class='kui-sets-separator'></div><li>x" +
                exs[i].reps +
                "</li>";
            for (let c = 0; c < Number(exs[i].sets); c++)
              document.getElementById("weights").innerHTML +=
                "<div class='kui-sets-separator'></div><li class='firstTabNav'>" +
                weights[c] +
                "</li>";
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
              try {
                let weights = document
                  .querySelectorAll("#weights")[0]
                  .innerText.split("\n");
                console.log(weights);
                localStorage.setItem(
                  workoutName + exs[i].title,
                  JSON.stringify(weights)
                );
                this.$router.showToast("Saved!");
              } catch (e) {
                this.$router.showToast("Failure !");
                console.log(e);
              }
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
      constructTabs(obj.title, obj.exercises)
    );
    return newChild;
  }
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
