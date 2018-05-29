export default {
    install(Vue, options) {
      Vue.prototype.$validImg = function (data,defUrl) {

        //if(!('poster_path' in data)) return false;

        for (let key in data) {
            var url=data[key].poster_path;
            data[key].poster_path =(url)?`https://image.tmdb.org/t/p/w500${url}`:defUrl;
        }
        return data;

      }
    }
  }