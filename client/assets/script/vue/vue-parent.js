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
    uploadQueue: [],
    title : '',
    summary: '',
    genre: '',
    author: '',
    image: ''
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
    },
    onFileChange(e) {
      var files = e.target.files || e.dataTransfer.files;
      if (!files.length)
        return;
        console.log(files);
        for (key in files) {
          if (key < files.length && !isNaN(key)) {
            // console.log(`key nya ${key}: ${files[key]}`);
            this.createImage(files[key])
          }
        }
        // console.log(files);
      // files.FileList.forEach(file => {
      // })
    },
    createImage(file) {
      var image = new Image();
      let reader = new FileReader();
      var vm = this;

      reader.onload = (e) => {
        vm.image = e.target.result;
      };

      this.uploadQueue.push(file)
      reader.readAsDataURL(file);
    },
    removeImage: function(e) {
      this.image = '';
    },
    uploadImage: function() {


      var formData = new FormData()

      formData.append('title', this.title)
      formData.append('summary', this.summary)
      formData.append('genre', this.genre)
      formData.append('author', this.author)

      this.uploadQueue.forEach(data => {
        formData.append('image', data)
      })

      // console.log(formData);

      axios.post('http://localhost:3333/users/upload', formData)
      .then(success => {
        console.log(success);
      })
      .catch(error => {
        console.error(error);
      })
    },
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
