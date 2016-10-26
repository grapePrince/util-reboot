import util from './Util';
import handlebars from "handlebars";

export default class DiceList {
    constructor() {
        this.$el = $("#diceList_container");
        this.template = handlebars.compile(html);
    }
    async refreshList() {
        let getUrl = "/api/diceLog";
        let logList = await util.ajaxRequest("GET", getUrl);
        let data = {logList: logList};
        this.$el.html(this.template(data));
    }
}

const html =
    `{{#each logList}}
        <tr>
            <td>{{date}}</td>
            <td>{{result}}</td>
            <td><button class="btn btn-default" data-copy="{{data}}: {{result}}">클립보드로 복사</button></td>
        </tr>
	{{/each}} `;