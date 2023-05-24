<template>
  <Popup v-if="showPopup" @close-popup="setShowPopup(false)">
    <template #body>
      <MEDisplay :text="viewingText"/>
    </template>
    <template #footer>
      <button class="me-button-primary" @click="setShowPopup(false)">
        OK
      </button>
    </template>
  </Popup>
</template>

<script>
import Popup from "@/components/Popup.vue";
import MEDisplay from "@/components/MEDisplay.vue";
import {mapMutations, mapState} from "vuex";

export default {
  name: "ViewingPopup",

  components: {
    MEDisplay,
    Popup
  },

  computed: {
    ...mapState(['showPopup', 'viewingText'])
  },

  methods: {
    ...mapMutations(['setShowPopup'])
  }
}
</script>

<style scoped>

</style>