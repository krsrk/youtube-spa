<template>
    <div>
        <template v-if="videos.length > 0">
            <v-row>
                <template v-for="(video, indx) in videos">
                    <v-col cols="12" sm="12" md="4" :key="indx">
                        <v-img
                            style="cursor: pointer"
                            :src="video.thumbnail.S"
                            class="align-center"
                            height="300px"
                            @click.stop="showVideo(video)"
                        />
                    </v-col>
                </template>
            </v-row>
        </template>
        <template v-else>
            <h4>No hay registros</h4>
        </template>
        <template v-if="dialog">
            <v-dialog v-model="dialog" max-width="1024px">
                <v-card>
                    <v-toolbar color="white" dense flat elevation="0">
                        <v-btn
                            class="mdi-align-horizontal-right"
                            icon
                            dark
                            @click="closeShowVideoDialog"
                        >
                            <v-icon class="black--text">mdi-close</v-icon>
                        </v-btn>
                    </v-toolbar>
                    <v-card-text>
                        <v-row>
                            <v-col cols="12" sm="12" md="6">
                                <v-img
                                    :src="videoSelected.thumbnail.S"
                                    class="align-center"
                                    height="220px"
                                />
                                <br>
                                <v-btn
                                    depressed
                                    class="white--text"
                                    color="red"
                                    @click="deleteVideo(videoSelected.id.S)"
                                >
                                    Borrar
                                </v-btn>
                                &nbsp;
                                <v-btn
                                    :href="videoSelected.video_link.S"
                                    target="_blank"
                                    link
                                    depressed
                                    color="primary"
                                >
                                    Ver Video
                                </v-btn>
                            </v-col>
                            <v-col cols="12" sm="12" md="6">
                                <h2>{{ videoSelected.title.S }}</h2>
                                <p>
                                    {{ videoSelected.description.S }}
                                </p>
                            </v-col>
                        </v-row>
                    </v-card-text>
                </v-card>
            </v-dialog>
        </template>
    </div>
</template>

<script>
export default {
    name: 'TheYoutubeVideoList',
    props:[
        'videos'
    ],
    data: () => ({
        video_link: '',
        dialog: false,
        videoSelected: {},
    }),
    methods: {
        showVideo(item) {
            console.log('Open dialog');
            this.dialog = true;
            this.videoSelected = item;
        },
        closeShowVideoDialog() {
            this.dialog = false;
            this.videoSelected = {};
        },
        async deleteVideo(videoId) {
            await this.$store.dispatch('deleteVideo', videoId);
            this.dialog = false;
        }
    },
};
</script>
