Vue.component('photo-upload', {
  template: `
  <div id="upload">
    <div v-if="!image">
      <h2>Select an image</h2>
      <input type="file" @change="onFileChange" multiple>
    </div>
    <div v-else>
      <img :src="image" />
      <span><button @click="removeImage">Remove image</button></span>
      <span><button @click="uploadImage" type="button" name="button">Upload</button></span>
    </div>
  </div>
  `,
  data: function() {
    return {
      image: '',
      files: []
    }
  },
  methods: {
    onFileChange(e) {
      var files = e.target.files || e.dataTransfer.files;
      if (!files.length)
        return;
      console.log(files);
      for (key in files) {
        if (key < files.length && !isNaN(key)) {
          this.createImage(files[key])
        }
      }
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
