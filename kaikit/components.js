
//#region ====== Tabs ======

Kai.createTabNav = function(name, horizontalNavClass, tabs) {
  return new Kai({
    name: name,
    data: {},
    components: tabs,
    horizontalNavClass: horizontalNavClass,
    template: '<div><ul id="' + horizontalNavClass.replace('.', '') + '" class="kui-tab"></ul><div id="__kai_tab__"></div></div>',
    mounted: function() {
      if (this.$state) {
        this.$state.addGlobalListener(this.methods.globalState);
      }

      const sk = document.getElementById('__kai_soft_key__');

      const tabHeader = document.getElementById(this.horizontalNavClass.replace('.', ''));
      if (tabHeader) {
        this.components.forEach((v, i) => {
          if (v instanceof Kai) {
            if (this.$router) {
              v.$router = this.$router;
            }
            if (this.$state) {
              v.$state = this.$state;
            }
            v.id = '__kai_tab__';
          }
          const li = document.createElement("LI");
          li.innerText = v.name;
          li.setAttribute("class", this.horizontalNavClass.replace('.', ''));
          li.setAttribute("tabIndex", i);
          tabHeader.appendChild(li);
        });

        const tabNav = document.querySelectorAll(this.horizontalNavClass);
        if (tabNav.length > 0 && this.id !== '__kai_header__' && this.id !==  '__kai_soft_key__') {
          if (this.horizontalNavIndex === -1) {
            this.horizontalNavIndex = 0;
          }
          const cur = tabNav[this.horizontalNavIndex];
          cur.focus();
          cur.classList.add('focus');
          cur.parentElement.scrollLeft = cur.offsetLeft - cur.offsetWidth;
          const component = this.components[this.horizontalNavIndex];
          if (component instanceof Kai) {
            component.mount('__kai_tab__');
            this.$router.setSoftKeyText(component.softKeyText.left, component.softKeyText.center, component.softKeyText.right);
          } else {
            const __kai_tab__ = document.getElementById('__kai_tab__');
            __kai_tab__.innerHTML = component;
            __kai_tab__.scrollTop = this.scrollThreshold;
            this.$router.setSoftKeyText(this.softKeyText.left, this.softKeyText.center, this.softKeyText.right);
          }

          const tabBody = document.getElementById('__kai_tab__');
          if (tabBody) {
            var padding = 0;
            const header = document.getElementById('__kai_header__');
            if (header) {
              padding += 28;
            }
            if (sk) {
              padding += 30;
            }

            const tabHeader = document.getElementById(this.horizontalNavClass.replace('.', ''));
            if (tabHeader) {
              padding += 30;
            }
            if (padding === 28) {
              tabBody.classList.add('kui-tab-h-28');
            } else if (padding === 30) {
              tabBody.classList.add('kui-tab-h-30');
            } else if (padding === 60) {
              tabBody.classList.add('kui-tab-h-60');
            } else if (padding === 58) {
              tabBody.classList.add('kui-tab-h-58');
            } else if (padding === 88) {
              tabBody.classList.add('kui-tab-h-88');
            }
          }
        }
      }
    },
    unmounted: function() {
      if (this.$state) {
        this.$state.removeGlobalListener(this.methods.globalState);
      }
      this.components.forEach((v, i) => {
        if (v instanceof Kai) {
          v.id = undefined;
        }
      });
    },
    methods: {
      globalState: function(data) {
        if (this.$router) {
          if (this.$router.stack[this.$router.stack.length - 1]) {
            if (this.$router.stack[this.$router.stack.length - 1].name === this.name) {
              const component = this.components[this.horizontalNavIndex];
              component.render();
            }
          }
        }
        
      }
    },
    backKeyListener: function() {
      if (!this.$router.bottomSheet) {
        this.scrollThreshold = 0;
        this.verticalNavIndex = -1;
        this.horizontalNavIndex = -1;
        this.components.forEach((v, i) => {
          if (v instanceof Kai) {
            v.scrollThreshold = 0;
            v.verticalNavIndex = -1;
            v.horizontalNavIndex = -1;
            v.components = [];
            this.components[i].reset();
          }
        });
      }
    },
    softKeyListener: {
      left: function() {
        const component = this.components[this.horizontalNavIndex];
        if (component instanceof Kai) {
          component.softKeyListener.left();
        }
      },
      center: function() {
        const component = this.components[this.horizontalNavIndex];
        if (component instanceof Kai) {
          component.softKeyListener.center();
        }
      },
      right: function() {
        const component = this.components[this.horizontalNavIndex];
        if (component instanceof Kai) {
          component.softKeyListener.right();
        }
      }
    },
    dPadNavListener: {
      arrowUp: function() {
        const component = this.components[this.horizontalNavIndex];
        if (component instanceof Kai) {
          component.dPadNavListener.arrowUp();
        } else {
          const __kai_tab__ = document.getElementById('__kai_tab__');
          __kai_tab__.scrollTop -= 20;
          this.scrollThreshold = __kai_tab__.scrollTop;
        }
        
      },
      arrowRight: function() {
        this.navigateTabNav(1);
        const __kai_tab__ = document.getElementById('__kai_tab__');
        const component = this.components[this.horizontalNavIndex];
        if (component instanceof Kai) {
          component.mount('__kai_tab__');
          __kai_tab__.scrollTop = component.scrollThreshold;
          this.$router.setSoftKeyText(component.softKeyText.left, component.softKeyText.center, component.softKeyText.right);
        } else {
          __kai_tab__.innerHTML = component;
          __kai_tab__.scrollTop = this.scrollThreshold;
          this.$router.setSoftKeyText(this.softKeyText.left, this.softKeyText.center, this.softKeyText.right);
        }
      },
      arrowDown: function() {
        const component = this.components[this.horizontalNavIndex];
        if (component instanceof Kai) {
          component.dPadNavListener.arrowDown();
        } else {
          const __kai_tab__ = document.getElementById('__kai_tab__');
          __kai_tab__.scrollTop += 20;
          this.scrollThreshold = __kai_tab__.scrollTop;
        }
      },
      arrowLeft: function() {
        this.navigateTabNav(-1);
        const __kai_tab__ = document.getElementById('__kai_tab__');
        const component = this.components[this.horizontalNavIndex];
        if (component instanceof Kai) {
          component.mount('__kai_tab__');
          __kai_tab__.scrollTop = component.scrollThreshold;
          this.$router.setSoftKeyText(component.softKeyText.left, component.softKeyText.center, component.softKeyText.right);
        } else {
          __kai_tab__.innerHTML = component;
          __kai_tab__.scrollTop = this.scrollThreshold;
          this.$router.setSoftKeyText(this.softKeyText.left, this.softKeyText.center, this.softKeyText.right);
        }
      },
    }
  });
}

//#endregion

//#region ====== Header ======

Kai.createHeader = function(EL, $router) {
  return new Kai({
    name: '_header_',
    disableKeyListener: true,
    data: {
      title: ''
    },
    template: '{{ title }}',
    mounted: function() {
      EL.classList.add('kui-header');
    },
    methods: {
      setHeaderTitle: function(txt) {
        this.setData({ title: txt });
      }
    }
  });
}


//#endregion

//#region ====== Softkeys ======

Kai.createSoftKey = function(EL, $router) {
  return new Kai({
    name: '_software_key_',
    disableKeyListener: true,
    data: {
      left: '',
      center: '',
      right: ''
    },
    template: '<div @click="clickLeft()" class="kui-software-key-left">{{ left }}</div><div @click="clickCenter()" class="kui-software-key-center">{{ center }}</div><div @click="clickRight()" class="kui-software-key-right">{{ right }}</div>',
    mounted: function() {
      EL.classList.add('kui-software-key');
    },
    methods: {
      setText: function(l, c, r) {
        this.setData({ left: l, center: c, right: r });
      },
      setLeftText: function(txt) {
        this.setData({ left: txt });
      },
      clickLeft: function() {
        $router.clickLeft();
      },
      setCenterText: function(txt) {
        this.setData({ center: txt });
      },
      clickCenter: function() {
        $router.clickCenter();
      },
      setRightText: function(txt) {
        this.setData({ right: txt });
      },
      clickRight: function() {
        $router.clickRight();
      },
    }
  });
}

//#endregion 

//#region ====== Toast ======
Kai.createToast = function(EL) {
  var TM;

  return new Kai({
    name: '_toast_',
    disableKeyListener: true,
    data: {
      text: ''
    },
    template: '{{ text }}',
    mounted: function() {
      EL.classList.add('kui-toast');
    },
    methods: {
      showToast: function(txt) {
        if (TM) {
          clearTimeout(TM);
        }
        this.setData({ text: txt });
        EL.classList.add('kui-toast-visible');
        TM = setTimeout(function() {
          EL.classList.remove('kui-toast-visible');
        }, 2000);
      }
    }
  });
}

//#endregion

//#region ====== Options menu ======

Kai.createComponent = function(options) {
  options.disableKeyListener = true;
  return new Kai(options);
}

Kai.createOptionMenu = function(title, options, selectText, selectCb, closeCb, verticalNavIndex = -1, $router) {
  return new Kai({
    name: 'option_menu',
    data: {
      title: title,
      options: options
    },
    verticalNavClass: '.optMenuNav',
    verticalNavIndex: verticalNavIndex,
    template: '\
    <div class="kui-option-menu">\
      <div class="kui-option-title">{{ title }}</div>\
      <div class="kui-option-body">\
        <ul id="kui-options" class="kui-options">\
          {{#options}}\
            <li class="optMenuNav" @click=\'selectOption({{__stringify__}})\'>{{text}}{{#subtext}}</br><small>{{subtext}}</small>{{/subtext}}</li>\
          {{/options}}\
        </ul>\
      </div>\
    </div>',
    methods: {
      selectOption: function(data) {
        if ($router) {
          $router.hideOptionMenu();
        }
        if (typeof selectCb === 'function') {
          selectCb(data);
        }
        if (closeCb) {
          closeCb();
        }
      }
    },
    softKeyText: { left: '', center: selectText || 'SELECT', right: '' },
    softKeyListener: {
      left: function() {},
      center: function() {
        const listNav = document.querySelectorAll(this.verticalNavClass);
        if (this.verticalNavIndex > -1) {
          listNav[this.verticalNavIndex].click();
        }
      },
      right: function() {}
    },
    dPadNavListener: {
      arrowUp: function() {
        this.navigateListNav(-1);
      },
      arrowRight: function() {},
      arrowDown: function() {
        this.navigateListNav(1);
      },
      arrowLeft: function() {},
    },
    backKeyListener: function() {
      if (closeCb) {
        closeCb();
      }
    }
  });
}

//#endregion

//#region ====== Dialog?? ======

Kai.createDialog = function(title, body, dataCb, positiveText, positiveCb, negativeText, negativeCb, neutralText, neutralCb, closeCb, $router) {
  return new Kai({
    name: 'dialog',
    data: {
      title: title,
      body: body
    },
    template: '<div class="kui-option-menu"><div class="kui-option-title">{{ title }}</div><div class="kui-option-body kai-padding-5">{{{ body }}}</div></div>',
    softKeyText: { left: negativeText || 'Cancel', center: neutralText || '', right: positiveText || 'Yes' },
    softKeyListener: {
      left: function() {
        if ($router) {
          $router.hideDialog();
        }
        if (typeof negativeCb === 'function') {
          negativeCb(dataCb);
        }
        if (closeCb) {
          closeCb();
        }
      },
      center: function() {
        if ($router) {
          $router.hideDialog();
        }
        if (typeof neutralCb === 'function') {
          neutralCb(dataCb);
        }
        if (closeCb) {
          closeCb();
        }
      },
      right: function() {
        if ($router) {
          $router.hideDialog();
        }
        if (typeof positiveCb === 'function') {
          positiveCb(dataCb);
        }
        if (closeCb) {
          closeCb();
        }
      }
    },
    backKeyListener: function() {
      if (closeCb) {
        closeCb();
      }
    }
  });
}
//#endregion