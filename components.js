/* text input for adding item to checklist */
Vue.component('list-input', {
  data: function() {
    return { userInput: "" }
  },
  template: `
    <div class="item">
      <p>Add item</p>
      <input type="text" v-model="userInput" @keydown.enter="addTodoItem"></input>
      <div class="plus-circle-svg svg-wrapper" @click="addTodoItem">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="16"></line><line x1="8" y1="12" x2="16" y2="12"></line></svg>
      </div>
    </div>
  `,
  methods: {
    addTodoItem: function() {
      if(this.userInput !== "") {
        this.todos.push(this.userInput);
        this.userInput = "";
      }
    }
  },
  props: {
    todos: Array
  }
});



/* shows checklist length */
Vue.component('list-stats', {
  template: `
  <div class="item">
    <p>Elements Quantity: {{ todos.length }}</p>
    <div class="trash-svg svg-wrapper">
    <p>Total: {{ todos2 }}</p>
    </div>
  </div>`,
  props: {
    todos: Array,
    todos2:Number
  }
})

/* each item in checklist */
Vue.component('list-item', {
  data: function() {
    return { isChecked: false }
  },
  template: `
  <section class="item">
    <div id="checkbox" @click="isChecked = !isChecked" @click="update(todo)">
      <div v-if="!isChecked" class="circle-svg svg-wrapper"> 
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle></svg>
      </div>
      <div v-if="isChecked" class="check-circle-svg svg-wrapper">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
      </div>   
    </div>
    <div id="item">
      <p>{{ todo[0] }}</p>
    </div>
    <div class="trash-svg svg-wrapper" @click="removeItem(todo)">
      
      <p>{{todo[1]}}</p>
    </div>
  </section>`,
  methods: {
    removeItem: function(todo) {
      console.log("Aqui");
      console.log(this.todos)

      let trashedItemIndex = this.todos.indexOf(todo)
      this.todos.splice(trashedItemIndex, 1)
      
    },
    update : function (todo){
      let itemIndex = this.todos.indexOf(todo)
      this.todos[itemIndex][2] = !this.todos[itemIndex][2]
      this.$emit('increment');
      
    }
  },
  computed: {
     
  },
  props: {
    todo: String,
    todos: Array,
    total: Number,
    todos2: Number
  }
})

/* header, main, and footer components */
Vue.component('custom-header', {
  template: `
    <header>
      <h1>Welcome!!!</h1>
      <h2>Daniel Castro - A01089938</h2>
    </header>`
})

Vue.component('custom-main', {
  data: function() {
    return {
      todos: [ ['Alfa',100, false], ['Bravo', 200, false], ['Charlie', 300, false], ['Delta',400, false], ['Echo', 500, false] ],
      total : 100,
      todos2: 0
    }
  },methods: {
    lockChild: function () {
      console.log("H")
      let totalSum = 0; 
      this.todos.forEach(item => {
        if(item[2]){
          totalSum += item[1]
        }
      })
      this.todos2 = totalSum
    }
  } ,
  template: `
  <main>
  <div center>
    <div id="list-items-wrapper">
     <!-- <list-input :todos="todos"></list-input> -->
      
      <list-item
        v-for="todo in todos"
        :key="todo"
        :todo="todo"
        :todos="todos"
        v-model="todos2"
        v-on:increment="lockChild"
      >
      </list-item>
      <list-stats :todos="todos" :todos2="todos2"></list-stats>
    </div>
  </div>
  </main>`
}
)

Vue.component('custom-footer', {
  template: `
  <footer>
    <p>VueJS starter template checklist. Colors from <a target="__blank" href="https://yeun.github.io/open-color">Open Color</a>. Icons from <a target="__blank" href="https://feathericons.com">Feather Icons</a>.</p>
  </footer>`
})



let vm = new Vue({
  el: '#app'
})