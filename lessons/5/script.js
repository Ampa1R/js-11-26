const app = new Vue({
    el: '#app',
    data: {
        name: 'John',
        lastName: 'Doe',
        names: ['Steve', 'Elon', 'Mark', 'John'],
        user: {
            name: 'Geek',
            lastName: 'Brains',
            age: 100,
        }
    },
    methods: {
        handleClick(e) {
            console.log(this.name, this.fullName);
            console.log('clicked!', e);
        }
    },
    computed: {
        upperCasedName() {
           return this.name.toUpperCase(); 
        },
        fullName() {
            return [this.name, this.lastName].join(' ');
        }
    }
});
