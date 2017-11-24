Vue.component('card-comic', {
  template: `
    <a class="card">
      <div class="image">
        <img :src="comic.picture">
      </div>
      <div class="content">
        <a class="header">{{comic.title}}</a>
        <div class="description">
          {{comic.description}}
        </div>
      </div>
      <div class="extra content">
        <div class="ui buttons fluid">
          <button class="ui primary button" @click="readComic(comic)" v-on:reading="reading">Baca Komik</button>
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
      console.log(input);
    $('.ui.read.modal')
      .modal('show')
    ;
    this.$emit('reading', input)
    }
  },
})
