new Vue({
  el: '#app',
  data: {
    message: 'Hello Vue!',
    login: '',
    loop: [1,1,1,1,1,1,1,1,1,1,1,1,1,],
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
    axios.get('https://localhost:3000/comic')
    .then(response => {
      this.comicList = response
    })
    .catch(err => {
      console.log(err);
    })
  }
})
