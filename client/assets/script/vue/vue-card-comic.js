Vue.component('card-comic', {
  template: `
    <div class="card">
      <div class="image">
        <img src="/images/avatar2/large/kristy.png">
      </div>
      <div class="content">
        <a class="header">Komik</a>
        <div class="meta">
          <span class="date">Joined in 2013</span>
        </div>
        <div class="description">
          Komik is an art director living in New York.
        </div>
      </div>
      <div class="extra content">
        <a>
          <i class="user icon"></i>
          22 Friends
        </a>
      </div>
    </div>
  `,
  data: function() {
    return {
      tes: 'test'
    }
  }
})
