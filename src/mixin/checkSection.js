import {mapState} from "vuex";

export const CheckSection = {
    computed: {
        ...mapState(['selectedSection'])
    },

    methods: {
        checkSection(section) {
            return section === this.selectedSection;
        }
    }
}
