new Vue({
  el: '#app',
  data: {
    message: 'Hello Vue!',
    login: '',
    reading: 'Komik',
    comicList: []
  },
  methods: {
     modalAdd: function() {
       console.log('masuk');
       $('.tiny.modal.modal-add')
        .modal('show')
      ;
    }
  },
  created: function () {
    axios.get('http://localhost:3004/comic')
    .then(response => {
      this.comicList = response.data
      console.log(response.data);
    })
    .catch(err => {
      console.log(err);
    })
    console.log(this.reading);
  }
})
