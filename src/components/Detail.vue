<template>
    <div>
        <div class="row">
            <div class="medium-6 columns medium-push-6">
                <img class="thumbnail" v-bind:src="data.poster_path">
            </div>
            <div class="medium-6 columns medium-pull-6">
                <h2>{{data.title}}</h2>
                <p>{{data.overview}}</p>
            </div>
        </div>

        <hr>

        <div class="row column">
            <ul class="vertical medium-horizontal menu expanded text-center">
                <li><a href="#">
                    <div class="stat">{{data.vote_average}}</div>
                    <span>Cредний голос</span></a></li>
                <li><a href="#">
                    <div class="stat">{{data.vote_count}}</div>
                    <span>Подсчет голосов</span></a></li>
                <li><a href="#">
                    <div class="stat">{{data.revenue}}</div>
                    <span>Доход</span></a></li>
                <li><a href="#">
                    <div class="stat">{{data.popularity}}</div>
                    <span>Популярность</span></a></li>
                <li><a href="#">
                    <div class="stat">{{data.id}}</div>
                    <span>ID</span></a></li>
            </ul>
        </div>

        <div v-if="collection.length">
            <div class="row column">
                <h3>Колекция</h3>
            </div>

            <div class="row small-up-2 medium-up-3 large-up-6">

                <div v-for="item in collection" class="column">
                    <!-- <img class="thumbnail" src="http://placehold.it/550x550"> -->
                    <router-link v-on:click.native="_reload" :to="{path: '/detail/' + item.id}" replace>
                        <img class="thumbnail" v-bind:src="item.poster_path">
                    </router-link>
                </div>

            </div>
        </div>

        <hr>

        <div class="row column">
            <h3>Рекомендации к выбранному фильму</h3>
        </div>

        <div class="row medium-up-3 large-up-4">

            <div v-for="item in recomData" class="column">
                <router-link v-on:click.native="_reload" :to="{path: '/detail/' + item.id}" replace>
                    <img class="thumbnail" v-bind:src="item.poster_path">
                </router-link>
            </div>

        </div>

    </div>
</template>

<script>
    import * as CONFIG from '../config';

    export default {
        name: 'Detail',
        data: function () {
            return {
                data: [],
                recomData: [],
                collection: []
            }
        },
        methods: {
            getDetail: function (id) {
                this.$http.get(`https://api.themoviedb.org/3/movie/${id}?api_key=${CONFIG.API_KEY}&language=ru-ru&page=1`)
                    .then(response => {
                        let res = this.$validImg([response.body], 'http://placehold.it/750x350')
                        this.data = res[0];
                        this._getCollection();
                    }, response => {
                        this.$alert.danger({message: 'Упс что то пошло не так, обратитесь в техподдержку'});
                    });
            },

            getRecommend: function (id) {
                this.$http.get(`https://api.themoviedb.org/3/movie/${id}/recommendations?api_key=2bffc68560bcf99a67d3ea8fa8f937b4&language=ru-ru&page=1`)
                    .then(response => {
                        this.recomData = this.$validImg(response.body.results, 'http://placehold.it/550x550')
                    }, response => {
                        this.$alert.danger({message: 'Упс что то пошло не так, обратитесь в техподдержку'});
                    });
            },

            _getCollection: function () {
                if (!this.data.belongs_to_collection) {
                    this.collection = [];
                    return false;
                }

                let id = this.data.belongs_to_collection.id;

                this.$http.get(`https://api.themoviedb.org/3/collection/${id}?api_key=2bffc68560bcf99a67d3ea8fa8f937b4&language=ru-ru`)
                    .then(response => {
                        this.collection = response.parts;
                        this.collection = this.collection = this.$validImg(response.body.parts, 'http://placehold.it/300x400');

                    }, response => {
                        this.$alert.danger({message: 'Упс что то пошло не так, обратитесь в техподдержку'});
                    });

            },
            _reload: function () {
                let id = this.$route.params.id;

                this.getDetail(id);
                this.getRecommend(id);
            }

        },
        created: function () {
            this._reload()
        }
    }
</script>

<style>
    #app {
        font-family: 'Avenir', Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        color: #2c3e50;
        margin-top: 60px;
    }

    h1, h2 {
        font-weight: normal;
    }

    ul {
        list-style-type: none;
        padding: 0;
    }

    li {
        display: inline-block;
        margin: 0 10px;
    }

    a {
        color: #42b983;
    }
</style>
