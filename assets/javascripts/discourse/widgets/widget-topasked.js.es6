import { createWidget } from 'discourse/widgets/widget';
import { h } from 'virtual-dom';
import { avatarImg } from 'discourse/widgets/post';
import { ajax } from 'discourse/lib/ajax';
import { popupAjaxError } from 'discourse/lib/ajax-error';




export default createWidget('widget-topasked', {
  tagName: 'div.widget-topasked.widget-container',
  buildKey: (attrs) => 'widget-topasked',

  defaultState(attrs) {
    return {
      data: [],
      loaded: false,
      contents: []
  }
},


getData(){

    var user = Discourse.User.currentProp('username');
    let self = this;
    var username, url, id;
    let users = [];
    var help = 0;
    var counter = 0;
    // if (user)
    // {
        self.state.loaded = true;
        ajax(`/groups/top/topics.json`)
        .then(function(res,err){
            for(var i = 0  ; i < res.length ; i++)
            {
                for (var j = 0 ; j < users.length ; j++)
                {
                    if(users[j] == res[i].user.username)
                    {
                        help = 1;
                        break;
                    }
                }
                if (help == 1) 
                {
                    help = 0;
                    continue;
                }
                username = res[i].user.username;
                users.push(username);

                url = res[i].user.avatar_template.replace("{size}", "45");

                self.state.data = res[i];
                self.state.contents.push(h("div.top-askedBlock",[h("img.avatar.topAvater", {attributes: 
                    {src: url, title:username, alt:'', width: 32, height: 32}}),h("a.top-asked-link.link-widget",{attributes: 
                        {href: "/t/" + res[i].topic.slug + "/" + res[i].topic.id }},
                        h("span.top-asked-title.title-widget", res[i].title))]));
                counter++;
                id = res[19].id;
                self.state.contents.push(h("br"));
                if (counter == 5)
                    break;
            }
            if (counter > 4 )
            {
                self.state.contents.push(h("a.moreAsked",{attributes:{href:"/groups/top/activity/topics"}},I18n.t("main.more-asked")));
                self.scheduleRerender();
            }
            else{
                ajax(`/groups/top/topics.json?before_post_id=${id}`)
                .then(function(res,err){
                    for(var i = 0  ; i < res.length ; i++)
                    {
                        for (var j = 0 ; j < users.length ; j++)
                        {
                            if(users[j] == res[i].user.username)
                            {
                                help = 1;
                                break;
                            }
                        }
                        if (help == 1) 
                        {
                            help = 0;
                            continue;
                        }
                        username = res[i].user.username;
                        users.push(username);

                        url = res[i].user.avatar_template.replace("{size}", "45");

                        self.state.data = res[i];
                        self.state.contents.push(h("div.top-askedBlock",[h("img.avatar.topAvater", {attributes: 
                            {src: url, title:username, alt:'', width: 32, height: 32}}),h("a.top-asked-link.link-widget",{attributes: 
                                {href: "/t/" + res[i].topic.slug + "/" + res[i].topic.id }},
                                h("span.top-asked-title.title-widget", res[i].title))]));
                        counter++;
                        id = res[19].id;
                        self.state.contents.push(h("br"));
                        if (counter == 5)
                            break;
                    }
                    if (counter >4)
                    {
                        self.state.contents.push(h("a.moreAsked",{attributes:{href:"/groups/top/activity/topics"}},I18n.t("main.more-asked")));
                        self.scheduleRerender();
                    }
                    else
                    {
                        ajax(`/groups/top/topics.json?before_post_id=${id}`)
                        .then(function(res,err){
                            for(var i = 0  ; i < res.length ; i++)
                            {
                                for (var j = 0 ; j < users.length ; j++)
                                {
                                    if(users[j] == res[i].user.username)
                                    {
                                        help = 1;
                                        break;
                                    }
                                }
                                if (help == 1) 
                                {
                                    help = 0;
                                    continue;
                                }
                                username = res[i].user.username;
                                users.push(username);

                                url = res[i].user.avatar_template.replace("{size}", "45");

                                self.state.data = res[i];
                                self.state.contents.push(h("div.top-askedBlock",[h("img.avatar.topAvater", {attributes: 
                                    {src: url, title:username, alt:'', width: 32, height: 32}}),h("a.top-asked-link.link-widget",{attributes: 
                                        {href: "/t/" + res[i].topic.slug + "/" + res[i].topic.id }},
                                        h("span.top-asked-title.title-widget", res[i].title))]));
                                counter++;
                                id = res[19].id;
                                self.state.contents.push(h("br"));
                                if (counter == 5)
                                    break;
                            }
                            self.state.contents.push(h("a.moreAsked",{attributes:{href:"/groups/top/activity/topics"}},I18n.t("main.more-asked")));
                            self.scheduleRerender();
                        });   
                    }

                });
            }

        });
//}
},

html(attrs, state) {

    if (state.loaded == false)
    {
        state.contents.push(h("span.top-asked.header-widget",I18n.t("main.top-asked")));
        this.getData();
    }
    return h('div.widget-inner', state.contents);
}

});
