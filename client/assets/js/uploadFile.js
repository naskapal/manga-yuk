new Vue({
  el: '#upload',
  data: {
    image: '',
    uploadQueue: []
  },
  methods: {
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
      
      this.uploadQueue.forEach(data => {
        formData.append('image', data)
      })
      
      // console.log(formData);
      
      axios.post('http://localhost:3000/users/upload', formData)
      .then(success => {
        console.log(success);
      })
      .catch(error => {
        console.error(error);
      })
    }
  }
})
