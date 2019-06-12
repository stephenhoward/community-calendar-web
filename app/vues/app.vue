<style lang="sass">

    @import 'app/scss/_mixins.scss';

    :root {
        color-scheme: light dark; 
        background-color: $light-mode-background;
        color: $light-mode-text;  
    }

    @media (prefers-color-scheme: dark) {
        :root {    
            background-color: $dark-mode-background;
            color: $dark-mode-text;
        }
    }

    body {
        @include vstack;
        justify-content: center;
    }
    header {
        @include flexible;
    }
    main {
        @include flexible;
    }

.sr-only {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
    -webkit-clip-path: inset(50%);
    clip-path: inset(50%);
    border: 0;
}
.hidden {
    display: none !important;
}
html {
    margin: 0;
    padding: 0;
}
* {
    box-sizing: border-box;
}
button {
    font-size: 10pt;
    padding: 4px 10px;
    background: white;
    -webkit-appearance: none;
    border: 1px solid #aaa;
    border-radius: 6px;
}
body {
    font-family: "Helvetica Neue", Arial, sans-serif;
    margin: 0;
    padding: 0;
    width: 100%;
    display: grid;
    height: 100%;
    min-height: 100%;
    div.login, div.forgot_password,div.password_reset_sent {
        padding: 20px 15px;
        max-width: 300px;
        border: 1px solid #ccc;
        border-radius: 4px;
        align-self: center;
        justify-self: center;
        display: grid;
        grid-columns-template: 1fr;
        grid-row-gap: 8px;
        h3 {
            margin: 0;
        }
        button {
            justify-self: center;
        }
        a {
            display: block;
            justify-self: right;
        }
        div.error {
            color: #f00;
            font-weight: 500;
        }
    }
}

div.button-group {
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    justify-content: space-between;
    align-content: center;
    button {
        font-size: 10pt;
    }
}

</style>

<template>
    <router-view></router-view>
</template>

<script>
    module.exports = {
      name: 'app',
      data: () => {
        return {};
      }
    };
</script>