
Vue.component('custom-navigation', {
  data: function() {
    return {
      todos: [ 'Alfa', 'Bravo', 'Charlie', 'Delta', 'Echo' ]
    }
  },
  template: `
  <main>
    <nav class="navbar navbar-light bg-light">
		<div class="row" id="navbarTogglerDemo01">
			<a class="navbar-brand" href="./index.html">Daniel</a>
      <a class="navbar-brand" href="./index.html">Home</a>
      <a class="navbar-brand nav-item" href="./services.html">Services</a>
      <a class="navbar-brand nav-item" href="./grid.html">Projects</a>
      <a class="navbar-brand nav-item" href="./contact.html">Contact</a>
		</div>
	</nav>
   
  </main>`
})

let vm2 = new Vue({
  el: '#app'
})