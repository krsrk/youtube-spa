<template>
    <v-container>
        <v-row>
            <v-col cols="12">
                <h2>Añadir nuevo video</h2>
            </v-col>
            <v-col cols="8">
                <v-text-field
                    v-model="video_link"
                    solo
                    single-line
                    label="Añadir"
                    type="text"
                />

            </v-col>
            <v-col cols="4">
                <v-btn tile color="blue white--text" @click="addVideo">Añadir</v-btn>
            </v-col>
        </v-row>
        <v-spacer/>
        <v-row>
            <v-col cols="12" v-if="!loading">
                <TheYoutubeVideoList :videos="this.videos"/>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
import TheYoutubeVideoList from "../components/TheYoutubeVideoList.vue";

export default {
    name: 'Home',
    components: {
        TheYoutubeVideoList
    },
    created() {
        this.loading = true;
        this.loadData();
    },
    data() {
        return {video_link: ''};
    },
    computed: {
        videos: {
            get () {
                return this.$store.getters.VIDEOS
            },
            set (value) {
                this.$store.commit('SET_VIDEOS', value)
            }
        },
        loading: {
            get () {
                return this.$store.getters.LOADING
            },
            set (value) {
                this.$store.commit('SET_LOADING', value)
            }
        },
    },
    methods: {
        async loadData() {
            await this.$store.dispatch('getVideos')
            console.log(this.videos)
            this.loading = false;
        },
        addVideo() {
            this.$store.dispatch('addVideo', this.video_link);
            this.video_link = '';
        }
    }
}
</script>
