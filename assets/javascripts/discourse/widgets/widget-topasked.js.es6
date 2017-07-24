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
                        {href: "/t/" + res[i].topic.slug + "/" + res[i].topic.id}},
                        res[i].title)]));
                counter++;
                id = res[19].id;
                self.state.contents.push(h("br"));
                if (counter == 7)
                    break;
            }
            if (counter > 6 )
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
                                res[i].title)]));
                        counter++;
                        id = res[19].id;
                        self.state.contents.push(h("br"));
                        if (counter == 7)
                            break;
                    }
                    if (counter >6)
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
                                        res[i].title)]));
                                counter++;
                                id = res[19].id;
                                self.state.contents.push(h("br"));
                                if (counter == 7)
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
    //var temp = [];
  //temp.push(h("iframe",{attributes:{src:"https://free.timeanddate.com/countdown/i5sktfy3/n246/cf12/cm0/cu4/ct0/cs0/ca0/cr0/ss0/cac000/cpc000/pct/tc66c/fn3/fs100/szw448/szh189/tat%D8%B2%D9%85%D8%A7%D9%86%20%D8%A8%D8%A7%D9%82%DB%8C%D9%85%D8%A7%D9%86%D8%AF%D9%87/tac000/tptTime%20since%20Event%20started%20in/tpc000/mat%D9%86%D9%8F%D9%88%D8%A2%DB%B0%DB%B0%DB%B6/mac09f/mpc000/iso2017-07-07T11:59:00/pa3" , allowTransparency:"true",frameborder:0,width:192,height:98}}));
    if (state.loaded == false)
    {
        //state.contents.push(temp);
        state.contents.push(h("h1.top-asked.header-widget",I18n.t("main.top-asked")));
        this.getData();
    }
    return h('div.widget-inner', state.contents);
}

});
