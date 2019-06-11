<style lang="sass">
    html,body {
      margin: 0;
      padding: 0;
    }
    * {
      font-family: 'Helvetica Neue';
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
    header,main {
      padding: 15px;
    }
    div.splash {
        display: flex;
        flex-direction: column;
        color: #fff;
        background-color: #555;
        margin: -15px;
        padding: 15px;
        padding-left: 40px;

        h1 {
            order: 2;
            flex: 1 1 auto;
        }
        nav {
            order: 1;
            flex: 0 0 auto;
            list-style-type: none;
            display: flex;
            flex-direction: row;
            justify-content: flex-end;
            li {
                margin-left: 15px;
                padding: 5px;
            }
        }
    }
</style>

<template>
    <div class="root">
        <nav>
            <li><router-link to="/">Happening Today</router-link></li>
            <li><router-link to="/this-week">Events This Week</router-link></li>
            <li><router-link to="/events">Search Events</router-link></li>
            <li><router-link to="/submit-events">Submit an Event</router-link></li>
            <li><router-link to="/login">Log In</router-link></li>        
        </nav>
        <router-view></router-view>
    </div>
</template>
