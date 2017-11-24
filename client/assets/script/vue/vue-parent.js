new Vue({
  el: '#app',
  data: {
    message: 'Hello Vue!',
    isLogin: localStorage.getItem('token'),
    comicList: [],
    username: '',
    password: '',
    first_name: '',
    last_name: '',
    email: '',
    gender: '',
  },
  methods: {
     modalAdd: function() {
       console.log('masuk');
       $('.tiny.modal.modal-add')
        .modal('show')
      ;
    },
    loginModal: function() {
      $('.tiny.modal.login')
        .modal('show')
      ;
    },
    signupModal: function() {
      $('.tiny.modal.signup')
        .modal('show')
      ;
    },
    login: function() {
      axios.post('http://localhost:3333/users/login',
          {
              username: this.username,
              password: this.password
          }
        )
      .then(response => {
        localStorage.setItem('token', response.data.token)
        location.reload()
      })
      .catch(err => {
        console.log(err);
      })
    },
    signup: function() {
      let newUser = {
          first_name: this.first_name,
          last_name: this.last_name,
          username: this.username,
          password: this.password,
          email: this.email,
          gender: this.gender
      }
      axios.post('http://localhost:3333/users', newUser)
      .then(response => {
        console.log(response);
        $('.tiny.modal.login')
          .modal('show')
        ;
      })
      .catch(err => {
        console.log(err);
      })
    },
    logout: function() {
      localStorage.clear()
      location.reload()
    }
  },
  created: function () {
    axios.get('http://localhost:3333/manga')
    .then(response => {
      this.comicList = response.data
      console.log(response.data);
    })
    .catch(err => {
      console.log(err);
    })
    $('select.dropdown')
      .dropdown()
    ;
  }
})
