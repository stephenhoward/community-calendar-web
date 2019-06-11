<style lang="sass">
section.events {

    div.event {
        border: 1px solid #aaa;
        border-top-color: #ddd;
        border-left-color: #ddd;
        background-color: #fff;
        margin: 15px 0;
        padding: 10px;
        box-shadow: 2px 2px 5px rgba(100,100,100,.3);

        &.past {
            font-size: 14pt;
            opacity: .7;
            border: none;
            box-shadow: none;
            h3 {
                font-size: 14pt;
            }
        }
        h3 {
            margin: 0;
            font-size: 18pt;
            div.parent-event {
                font-size: 14pt;
                font-weight: 400;
            }
        }
        div.datetime {
          margin: 10px 0 0 0;
        }

        div.event-body {
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            div.info {
                flex: 1 1 auto;
                order: 1;

                div.description {
                    margin-top: 10px;
                }
            }
            img {
                flex: 0 0 auto;
                order: 2;
                height: 100px;
                width: 100px;
                border: 1px solid #eee;
                margin-left: 15px;
            }
        }

        ul.event-footer {
            list-style-type: none;
            display: flex;
            align-items: baseline;
            margin: 0;
            padding: 10px 0 0 0;

            li {
                margin: 0;
                padding: 0;
                flex: 1 1 auto;
            }
        }
    }
}
</style>

<template>
    <div class="event">
        <div class="event-body">
            <div class="info">
                <h3>
                    {{ event.title }}
                    <div v-if="event.parent" class="parent-event">{{ event.parent.title }}</div>
                </h3>
                <div v-if="event.end.isBefore(now)" class="datetime">{{ event.start.format('h:mma') }}</div>
                <div class="description">
                  {{ event.description }}
                </div>
            </div>
            <img src="">
        </div>
        <ul v-if="event.end.isSameOrAfter(now)" class="event-footer">
          <li class="datetime">
            {{ model.start.format('h:mma') }}
          </li>
        </ul>
    </div>
</template>

<script>

    module.exports = {
        props: ['event'],
    }
</script>