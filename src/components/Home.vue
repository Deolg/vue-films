<template>
    <div>
        <div class="row column text-center">
            <h2>Популярные фильмы</h2>
            <label>
                <input v-model="seacrheVideo" type="text" placeholder="Поиск по популярным фильмам">
            </label>
            <hr>
        </div>

        <div class="row small-up-2 large-up-4">

            <div v-for="item in data" class="column">
                <img v-bind:src="item.poster_path">
                <h5>{{item.title}}</h5>
                <router-link :to="{path: '/detail/' + item.id}" exact>
                    <a href="#" class="button small expanded hollow">подробней</a>
                </router-link>
            </div>

        </div>
        <hr>

        <upcoming></upcoming>

    </div>
</template>

<script>
    import * as CONFIG from '../config';

    export default {
        name: 'HomePage',
        data: function () {
            return {
                seacrheVideo: '',
                data: []
            }
        },
        watch: {
            seacrheVideo: function (val, oldVal) {

                if (!val.trim()) {
                    clearTimeout(this.timeout);
                    this.getPopularVideo();
                    return;
                }

                clearTimeout(this.timeout);

                this.timeout = setTimeout(() => {
                    this.$http.get(`https://api.themoviedb.org/3/search/movie?api_key=${CONFIG.API_KEY}&language=ru-ru&page=1&query=${val}`)
                        .then(response => {
                            this.data = this.$validImg(response.body.results, 'http://placehold.it/300x400');
                        }, response => {
                            this.$alert.danger({message: 'Упс что то пошло не так, обратитесь в техподдержку'});
                        });

                }, 500);
            },
        },
        methods: {
            getPopularVideo: function () {

                this.$http.get(`https://api.themoviedb.org/3/movie/popular?api_key=${CONFIG.API_KEY}&language=ru-ru&page=1`)
                    .then(response => {
                        this.data = this.$validImg(response.body.results, 'http://placehold.it/300x400');
                    }, response => {
                        this.$alert.danger({message: 'Упс что то пошло не так, обратитесь в техподдержку'});
                    });
            },
            _validateImg: function (data, defUrl) {

                //if(!('poster_path' in data)) return false;

                for (let key in data) {
                    var url = data[key].poster_path;
                    data[key].poster_path = (url) ? `https://image.tmdb.org/t/p/w500${url}` : defUrl;
                }
                return data;
            }
        },

        created: function () {
            this.getPopularVideo();
        }
    }
</script>

<style lang="scss" scoped>

    .image {
        margin-top: 0.75rem;
        margin-bottom: 1.5rem;
    }

    .call-button {
        border-radius: 20px;
        padding-left: 1.5rem;
        padding-right: 1.5rem;
        font-weight: 600;
        text-transform: uppercase;
    }


</style>
