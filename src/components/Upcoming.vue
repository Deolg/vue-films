<template>
    <div>
        <div class="row column text-center">
            <h2>Скоро</h2>
            <hr>
        </div>

        <div class="row small-up-2 medium-up-3 large-up-6">
            <div v-for="item in data" class="column">
                <router-link :to="{path: '/detail/' + item.id}" exact>
                    <img class="thumbnail" v-bind:src="item.poster_path">
                </router-link>

                <h5>{{item.title}}</h5>
            </div>
        </div>

    </div>
</template>

<script>
    import * as CONFIG from '../config';

    export default {
        name: 'Upcoming',
        data: function () {
            return {
                data: []
            }
        },
        methods: {
            onUpcoming: function () {
                this.$http.get(`https://api.themoviedb.org/3/movie/upcoming?api_key=${CONFIG.API_KEY}&language=ru-ru&page=1`)
                    .then(response => {
                        this.data = this.$validImg(response.body.results, 'http://placehold.it/300x400');
                    }, response => {
                        this.$alert.danger({message: 'Упс что то пошло не так, обратитесь в техподдержку'});
                    });
            }
        },
        created: function () {
            this.onUpcoming();
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
