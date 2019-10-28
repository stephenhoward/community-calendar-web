<style lang="sass">

@import 'app/scss/_mixins.scss';

* {
    font-family: 'Helvetica Neue';
    box-sizing:  border-box;
}

:root {
    color-scheme:     light dark; 
    background-color: $light-mode-background;
    color:            $light-mode-text;  
}

@include dark-mode {
    :root {    
        background-color: $dark-mode-background;
        color:            $dark-mode-text;
    }
}

html,body {
    margin:  0;
    padding: 0;
    width:   100%;
}

.sr-only {
    position:    absolute;
    width:       1px;
    height:      1px;
    padding:     0;
    border:      0;
    overflow:    hidden;
    clip:        rect(0, 0, 0, 0);
    white-space: nowrap;
    -webkit-clip-path: inset(50%);
    clip-path:         inset(50%);
}

div.popup-wrapper {
    position:        fixed;
    top:             0;
    left:            0;
    width:           100%;
    height:          100%;
    z-index:         100;

    @include hstack;
    justify-content: center;
    align-items:     center;
    background:      rgba(0,0,0,.7);

    @include dark-mode {
        background: rgba(0,0,0,.9);
    }
}

body {
    width:      100%;
    height:     100%;
    min-height: 100%;

    div.root {

        display:    grid;
        height:     100%;
        min-height: 100%;
        width:      100%;

        grid-template-columns: [ left-rail ] auto [ main ] 40px [ end ];
        grid-template-rows:    [ top ]       120px  [ main ] auto [ end ];

        @include medium-size-device {
            grid-template-columns: [ left-rail ] 200px [ main ] auto [ end ];
            grid-template-rows:    [ top ]       80px  [ main ] auto [ end ];
            &.hide-menu {
                grid-template-columns: [ left-rail ] 0 [ main ] auto [ end ];
            }
        }
        @include large-size-device {
            grid-template-rows: [ top ] 280px  [ main ] auto [ end ];
        }

        &.hide-menu {
            grid-template-columns: [ left-rail ] 0 [ main ] auto [ end ];

            main {
                padding: 0 10px 40px 10px;

            }
        }

        div.main-menu {

            grid-area:        top / left-rail / bottom / main;
            background-color: $light-mode-sidebar-background;
            overflow-x:       hidden;
            overflow-y:       visible;
            nav {
                list-style-type: none;
                ul {
                    list-style-type: none;
                    margin:          15px 0 0 0;
                    padding:         0;
                }
                li {
                    margin:  0;
                    padding: 8px 20px;

                    a {
                        text-decoration: none;
                        color: #fff;
                    }
                }
            }

            @include dark-mode {
                background-color: $dark-mode-sidebar-background;
            }
        }
        & > main {
            grid-area:  main / main / end / end;
            overflow-x: hidden;
            overflow-y: visible;
            padding: 0 10px 40px $main-area-menu-gutter;

            & > * {
                overflow-x: hidden;
                overflow-y: visible;
            }
            border-top-left-radius: 10px;
            border-top-right-radius: 10px;
            margin-top: -10px;
            background: $light-mode-background;
            box-shadow: 0 -5px 5px rgba(0,0,0,.3);

            @include dark-mode {
                background: $dark-mode-background;
            }
        }

    }
}

button {
    -webkit-appearance: none;
    font-size:     10pt;
    padding:       4px 10px;
    background:    white;
    border:        1px solid #aaa;
    border-radius: 6px;
    @include dark-mode {
        background: $dark-mode-button-background;
        border-color: $dark-mode-button-background;
        color: $dark-mode-text;
    }
}

#menu-toggle {
    display: inline-block;
    grid-row-start:    top;
    grid-column-start: main;
    justify-self:      start;
    margin:            20px 0 0 10px;
    color: #fff;
    text-shadow: 0 0 6px rgba(0,0,0,.3);
}

</style>

<template>
    <router-view></router-view>
</template>

<script>
const axios  = require('axios');

module.exports = {
    name: 'app',
    data: () => {
        return {};
    }
};
</script>