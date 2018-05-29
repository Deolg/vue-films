<template>
    <div id="app">

        <div class="alertMessages">
            <vue-alert></vue-alert>
        </div>

        <div class="top-bar">
            <div class="logo">
                <router-link :to="{path: '/'}">
                    LOGO
                </router-link>
            </div>
        </div>

        <div class="content-wrapper">
            <router-view></router-view>
        </div>

        <div class="callout large secondary">
            <div class="row">
                <div class="large-4 columns">
                </div>
                <div class="large-3 large-offset-2 columns">

                </div>
                <div class="large-3 columns">
                </div>
            </div>
        </div>
    </div>
</template>

<script>

    export default {
        name: 'app'
    };
</script>


<style lang="scss">
    @import './styles/global';

    // Chrome Reset
    a:focus {
        outline: none;
    }

    .logo, .logo a {
        color: $white;
        font-weight: normal;
        background-color: inherit;
    }

    .top-bar, .top-bar ul {
        background-color: #41b883;
    }

    .top-bar {
        height: 50px;
    }

    li a.menu-button {
        border-radius: 20px;
        padding-left: 1.5rem;
        padding-right: 1.5rem;
        font-weight: 600;
        text-transform: uppercase;
        display: inline-block;
        float: right;
    }

    .content-wrapper {
        padding: 0.75rem 0;
    }

    .sidebar-menu {
        @include menu-base();
        @include menu-direction(vertical);
        a {
            color: $secondary-color;
            font-weight: normal;
        }
        a.active {
            font-weight: 600;
            color: $primary-color;
        }
    }

    #app {
        margin-top: 0px !important;
    }

    .alertMessages {
        width: 600px;
        position: fixed;
        top: 90%;
        right: 10px;
        height: 50px;
        z-index: 100;
    }

    .spiner {
        position: fixed;
        left: 50%;
        top: 50%;
        z-index: 100;
        background-image: url('./assets/img/spiner.gif');
        height: 186px;
        width: 196px;
    }

</style>
