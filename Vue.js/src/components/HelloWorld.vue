<template>
  <div class="hello">
    <div class="top">
      <input type="text" v-model="input" />
      <ul :class="isShow ? 'show' : ''">
        <li v-for="(v, k) in list" :key="k" :class="k === islight ? 'blue' : ''"  @click="addMarker(v)" @mouseover="light(k)">
          {{ v.name }}
        </li>
      </ul>
    </div>
    <div id="map"></div>
  </div>
</template>

<script>
import gql from "graphql-tag";

export default {
  name: "HelloWorld",
  props: {
    msg: String,
  },
  data() {
    return {
      map: "",
      list: [],
      input: "",
      markersArray: [],
      isShow: true,
      islight: 0,
    };
  },
  watch: {
    input(n) {
      this.getDate(n);
      this.isShow = true;
      this.islight = 0;
    },
  },
  methods: {
    light(i){
      this.islight = i;
    },
    initMap() {
      this.map = new window.google.maps.Map(document.getElementById("map"), {
        center: { lat: 38.5111, lng: -96.8005 },
        zoom: 4,
      });
    },
    addMarker(data) {
      this.clearOverlays()
      this.input = data.name;
      this.isShow = false;
      let temp = {
        lat: parseInt(data.lat),
        lng: parseInt(data.lng),
      };
      console.log(temp);
      let mark = new window.google.maps.Marker({
          position: temp,
          title: data.name
      })
      this.markersArray.push(mark)
      mark.setMap(this.map);
    },
    clearOverlays() {
      if (this.markersArray.length) {
        for (let i in this.markersArray) {
          this.markersArray[i].setMap(null);
        }
      }
    },

    getDate(n) {
      const listGql = gql`{
            getName(str:  ${'"' + n + '"'} ) {
              name,
              lat,
              lng
              
            }
          
      }`;
      this.$apollo
        .query({
          query: listGql,
          variables: {},
        })
        .then(({ data: { getName } }) => {
          this.list = getName;
        });
    },
  },
  mounted() {
    this.initMap();
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#map {
  margin-top: 100px;
  height: 600px;
  width: 100%;
}
.blue{
  background-color: rgb(9, 84, 155);
}
.top ul {
  width: 100%;
  list-style: none;
  margin: 0;
  padding: 0;
}
.top {
  width: 400px;
}
.top input {
  width: 100%;
}
.top ul li {
  border-bottom: 1px solid #000;
  text-align: left;
}
</style>
