<template>
  <div>
    <v-toolbar color="primary" class="manu-toolbar" dark dense>
      <div class="menu-wrapper">
        <v-text-field
          class="menu-search"
          placeholder="Search jobs"
          outlined
          append-icon="search"
        ></v-text-field>
        <v-text-field
          class="menu-search"
          placeholder="Filter on location"
          outlined
          append-icon="location_on"
        ></v-text-field>
      </div>
      <div>
        <v-dialog max-width="700" v-model="addDialog">
          <template v-slot:activator="{ on }">
            <v-btn v-if="company" icon v-on="on">
              <v-icon>add</v-icon>
            </v-btn>
          </template>
          <new-add @close="closeDialog" />
        </v-dialog>
        <v-menu top :offset-y="offset">
          <template v-slot:activator="{ on }">
            <v-btn icon v-on="on">
              <v-icon>settings</v-icon>
            </v-btn>
          </template>
          <v-list>
            <v-list-item
              v-for="(item, index) in items"
              :key="index"
              @click="$router.push(item.link)"
            >
              <v-list-item-title>{{ item.title }}</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
      </div>
    </v-toolbar>
    <div class="card-wrapper">
      <v-card
        class="job-card"
        v-for="(item, index) in cards"
        :key="index"
        max-width="344"
        outlined
      >
        <v-list-item three-line>
          <v-list-item-content>
            <v-list-item-title class="headline mb-1">{{
              item.position
            }}</v-list-item-title>
            <v-divider />
            <v-list-item-subtitle class="description"
              >Company: {{ item.company }}</v-list-item-subtitle
            >
            <v-list-item-subtitle class="description"
              >Salary: {{ item.salary }}</v-list-item-subtitle
            >
          </v-list-item-content>
        </v-list-item>

        <v-card-actions>
          <v-dialog v-model="item.dialog" :key="index" max-width="1000">
            <template v-slot:activator="{ on }">
              <v-btn color="primary" dark v-on="on" depressed class="card-btn"
                >Details</v-btn
              >
            </template>
            <v-card class="dialog-card">
              <v-card-title class="headline">{{ item.position }}</v-card-title>
              <v-divider class="dialog-divider" />
              <v-card-text
                ><p><b>Company:</b> {{ item.company }}</p>
                <p><b>Salary:</b> {{ item.salary }}</p>
                <p><b>Education: </b>{{ item.education }}</p>
                <p><b>Place:</b> {{ item.place }}</p>
                <p><b>Duration:</b> {{ item.duration }}</p>
                <p><b>Description:</b> {{ item.description }}</p>
                <p><b>Available places:</b> {{ item.available }}</p>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="primary" dark @click="item.dialog = false"
                  >Cancel</v-btn
                >
                <v-btn
                  color="primary"
                  v-show="!company"
                  dark
                  @click="applyNow()"
                  >Apply now!</v-btn
                >
              </v-card-actions>
            </v-card>
            <v-card
              v-show="company"
              class="dialog-card"
              style="margin-left:2em; padding: 1em;"
            >
              <div style="font-size: 30px !important">
                Applications:
              </div>
              <v-card
                style="margin-bottom: 10px;"
                v-for="(item, index) in users"
                :key="index"
                class="mx-auto users-card"
                outlined
              >
                <div class="mx-1 my-2" style="font-size:18px">
                  {{ item.name }}
                </div>
                <v-card-actions style="padding-top: 0px !important">
                  <a href="http://www.helsinki.fi/urapalvelut/english/materials/sample_cv.pdf" target="_blank">
                  <v-btn
                    depressed
                    color="primary"
                    style="height: 20px; text-transform: capitalize"
                    >See CV</v-btn
                  >
                  </a>
                  <v-spacer></v-spacer>
                  <a href="https://mail.google.com/mail/?view=cm&fs=1&to=email@domain.com" target="_blank">
                  <v-btn
                    depressed
                    color="primary"
                    style="height: 20px; text-transform: capitalize"
                    >Message</v-btn
                  ></a>
                </v-card-actions>
              </v-card>
            </v-card>
          </v-dialog>
          <v-spacer></v-spacer>
          <v-btn color="primary" @click="applyNow()" v-show="!company" depressed class="card-btn">Apply!</v-btn>
        </v-card-actions>
      </v-card>
    </div>
    <div class="text-center my-10">
      <v-pagination v-model="page" :length="6"></v-pagination>
    </div>
    <v-snackbar v-model="snackbar">
      You gave successfully applied!
      <v-btn color="pink" text @click="snackbar = false">
        Close
      </v-btn>
    </v-snackbar>
  </div>
</template>

<script>
import newAdd from './newAdd.vue';

export default {
  name: 'MainMenu',
  components: {
    newAdd
  },
  data: () => ({
    offset: true,
    addDialog: false,
    dialog: false,
    company: true,
    snackbar: false,
    page: 1,
    items: [
      {
        title: 'Edit my profile',
        link: '/editProfile'
      },
      {
        title: 'Logout',
        link: '/  '
      }
    ],
    users: [
      {
        name: 'Vinko Soldo'
      },
      {
        name: 'Mate Majic'
      },
      {
        name: 'Jadranko Andric'
      },
      {
        name: 'Marko Markovic'
      },
      {
        name: 'Alen Delix'
      }
    ],
    cards: [
      {
        company: 'Nsoft',
        available: 1,
        description:
          'Looking for an experienced and responsible person for our team, competitive salary, great team, exelent company',
        position: 'Medior Frontend developer',
        place: 'Mostar, BiH',
        duration: 'until 30.5.2020',
        salary: '3300$',
        education: 'Bachelors degree',
        dialog: false
      },
      {
        company: 'Zendev',
        available: 1,
        description:
          'Looking for an experienced and responsible person for our team, competitive salary, great team, exelent company',
        position: 'JuniorSysOp',
        duration: 'until 30.5.2020',
        place: 'Mostar, BiH',
        education: 'Masters degree',
        salary: '2000$',
        dialog: false
      },
      {
        company: 'Microsoft',
        available: 1,
        description:
          'Looking for an experienced and responsible person for our team, competitive salary, great team, exelent company',
        position: 'Sales manager',
        duration: 'until 30.5.2020',
        place: 'Mostar, BiH',
        salary: '2130$',
        education: 'Bachelors degree',
        dialog: false
      },
      {
        company: 'Google',
        available: 1,
        description:
          'Looking for an experienced and responsible person for our team, competitive salary, great team, exelent company',
        position: 'Network manager',
        duration: 'until 30.5.2020',
        place: 'Mostar, BiH',
        education: 'Masters degree',
        salary: '4300$',
        dialog: false
      },
      {
        company: 'Mistral',
        available: 1,
        description:
          'Looking for an experienced and responsible person for our team, competitive salary, great team, exelent company',
        position: 'Designer',
        place: 'Zagreb, Croatia',
        duration: 'until 30.5.2020',
        education: 'Bachelors degree',
        salary: '1900$',
        dialog: false
      },
      {
        company: 'Firesoft',
        available: 1,
        description:
          'Looking for an experienced and responsible person for our team, competitive salary, great team, exelent company',
        position: 'Backend developer',
        duration: 'until 30.5.2020',
        place: 'Zagreb, Croatia',
        education: 'Masters degree',
        salary: '2000$',
        dialog: false
      },
      {
        company: 'Dev republic',
        available: 1,
        description:
          'Looking for an experienced and responsible person for our team, competitive salary, great team, exelent company',
        position: 'Support operator',
        place: 'Zagreb, Croatia',
        education: 'Bachelors degree',
        duration: 'until 30.5.2020',
        salary: '1800$',
        dialog: false
      },
      {
        company: 'Infobip',
        available: 1,
        description:
          'Looking for an experienced and responsible person for our team, competitive salary, great team, exelent company',
        position: 'Senior Frontend developer',
        education: 'Masters degree',
        duration: 'until 30.5.2020',
        place: 'Zagreb, Croatia',
        salary: '5300$',
        dialog: false
      }
    ]
  }),
  methods: {
    applyNow() {
      this.snackbar = true;
    },
    closeDialog() {
      this.addDialog = false;
    }
  }
};
</script>

<style lang="scss">
.v-toolbar__content {
  justify-content: space-between !important;
}
.job-card {
  margin: 1em;
  margin-top: 2em;
  margin-bottom: 2em;
}
.dialog-card {
  width: 100% !important;
  p {
    font-size: 16px !important;
    font-weight: normal !important;
    color: rgb(49, 49, 49) !important;
  }
}
.dialog-divider {
  margin-bottom: 2em;
}
.v-dialog--active {
  display: flex;
}
.v-list-item__content {
  min-width: 300px;
  max-width: 300px;
}
.users-card {
  height: 70px !important;
}
.card-wrapper {
  display: flex;
  flex-flow: row wrap;
  justify-content: space-around;
}
.manu-toolbar {
  margin-bottom: 2em;
}
.menu-wrapper {
  width: 700px;
  display: flex;
  flex-direction: row;
}
.card-btn {
  height: 30px !important;
  width: 100px;
  font-size: 12px !important;
  font-weight: normal;
}
.description {
  margin-top: 10px !important;
}
.v-btn {
  font-weight: normal !important;
  font-size: 12px !important;
}
.menu-search {
  height: 40px !important;
  max-width: 300px;
  margin-top: 5px !important;
  margin-right: 2em !important;

  .v-input__slot {
    min-height: 20px !important;
    margin: 0px !important;
  }
  .v-input__control {
    height: 34px !important;
  }

  .v-input__append-inner {
    margin: 5px !important;
  }
}
</style>
