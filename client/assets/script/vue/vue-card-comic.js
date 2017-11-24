Vue.component('card-comic', {
  template: `
    <a class="card">
      <div class="image">
        <img :src="comic.img[0]">
      </div>
      <div class="content">
        <a class="header">{{comic.title}}</a>
        <div class="description">
        {{comic.summary.substring(1, 100)}}
        </div>
      </div>
      <div class="extra content">
        <div class="ui buttons fluid">
          <button class="ui primary button" @click="readComic(comic.img)">Baca Komik</button>
          <button class="ui secondary button">Download</button>
        </div>
      </div>
    </a>
  `,
  data: function() {
    return {
      tes: 'test'
    }
  },
  props: ['comic'],
  methods: {
    readComic: function(input) {
      console.log(input.img);
      $('.ui.read.modal')
        .modal('show')
      ;
    },
  }
})
