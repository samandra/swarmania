Backbone.sync = function(method, model, options){
    var self = this;
    Backbone.trigger('sync-start', [method, model, options]);
    
    options.data = options.data || {};
    switch (method) {
        case "read":
            break;
        case "create":
            /**
             * backbone default sync function sometimes do not put default
             * parameters you need on server for models. Remember model itself and options
             * come from function arguments
             *
             * By assining option.data for model
             * sync operations we can handle them on server and also models' operations seem
             * conventional
             * e.g you can still use model.destroy() method with no parameters
             *
             * On any operation causing to sync you can you can write out own
             * query parameters:
             * e.g. collection.fetch({
             *  data: {foo: 1
             * }})
             */
            options.data.model = JSON.stringify(model.toJSON());
            break;
        case "update":
            options.data.model = JSON.stringify(model.toJSON());
            break;
        case "delete":
            options.data.model = JSON.stringify(model.toJSON());
            break;
        default: throw ("Unknown Method: "+method);
    }

    var action = method;
    var id = model.id || "noid";

    var url = "";
    if(model.url!==undefined){
        url="../"+model.url + "/" + action;
    } else {
        url = "server.php";
        _.extend(options.data, {
            action: action
        });
    }

    //aborts AJAX request if there is already a request
    //useful for requests coming from keyboard events
    if(Backbone.request){
       //Backbone.request.abort();
    }
    
    Backbone.request = $.ajax({
        url: url,
        dataType:'json',
        type:'POST',
        data:options.data,
        async: options.async===false?false:true,
        complete: function(res){
            if(res.responseText){
                Backbone.trigger('sync-end', JSON.parse(res.responseText), method, model, options);
            }
        },
        success:function(res) {
            if(method == 'create'){
                model.id = res.id;
            }
            
            model.trigger("on:"+method, res);
            if(options.syncComplete){
                options.syncComplete(res);
            }
            options.success(res.data || res);
            
        },
        error: function(t){
            if(t.responseText){
                var res = JSON.parse(t.responseText);
                options.error();
            }
        }
    });

};

