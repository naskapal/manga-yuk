Vue.component('card-comic', {
  template: `
    <a class="card">
      <div class="image">
        <img src="/assets/img/poster/sample.jpg">
      </div>
      <div class="content">
        <a class="header">Komik</a>
        <div class="description">
          Komik is an art director living in New York.
        </div>
      </div>
      <div class="extra content">
        <div class="ui buttons fluid">
          <button class="ui primary button">Baca Komik</button>
          <button class="ui secondary button">Download</button>
        </div>
      </div>
    </a>
  `,
  data: function() {
    return {
      tes: 'test'
    }
  }
})
