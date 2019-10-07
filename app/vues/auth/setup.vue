<template>
    <div class="login">
        <ol>
            <li v-if="! languageSet">
                <section>select a language
                    <select v-model="user.language">
                        <option v-for="(value,lang) in languages" :value="lang">
                            {{ value.name }}
                        </option>
                    </select>
                    <button type="button" @click="setLanguage">Next</button>
                </section>
            </li>
            <li v-else-if="! emailSet">Enter Email Address
                <input type="email" v-model="user.email">
                <button type="button" @click="setEmail">Next</button>
            </li>
            <li v-else-if="! passwordSet">Create Password
                <input type="password" v-model="password">
                <input type="password" v-model="password2">
                <button type="button" @click="setPassword">Next</button>
            </li>
        </ol>
    </div>
</template>

<script>
const config = require('../../lib/config');
const auth   = require('../../lib/authorize');
const User   = require('../../lib/model/user');

module.exports ={
    data : () => {

        return {
            user: new User({ language: config.settings().default_language }),

            languages:   config.languages(),
            languageSet: false,

            emailSet: false,

            password:    '',
            password2:   '',
            passwordSet: false
        };
    },
    methods: {
        setLanguage: function() {
            if ( this.user.language && this.user.language in this.languages ) {
                this.languageSet = true;
            }
        },
        setEmail: function() {
            if ( this.user.email && /^\S+@\S+\.\S+$/.test(this.user.email)  ) {
                this.emailSet = true;
            }
        },
        setPassword: function() {
            if ( this.password.length && this.password2.length && this.password == this.password2 ) {
                this.saveSetup();
            }
        },
        saveSetup: function() {
            let self = this;
            auth.login(this.user.email,this.password).then( () => {
                self.user.save().then((json) => {
                    self.user.setPassword(self.password).then(() => {
                        self.$router.push({ name: 'site_settings'});
                    });
                });
            });
        }
    }
}
</script>