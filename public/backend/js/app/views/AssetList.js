define([
    'Backbone',
    'Handlebars',
    'models/AssetList'
], function(
    Backbone,
    Handlebars,
    AssetList
){

    return Backbone.View.extend({

        events: {
        },

        initialize: function(){
            this.collection = new AssetList();
            this.collection.url = '/cms/assets/' + this.options.type;
            this.collection.fetch();
            this.collection.on('sync', this.render, this);
        },

        render: function(){
            var source = $('#template-images-list-item').html(),
                template = Handlebars.compile(source),
                html = '';

            this.collection.forEach(function(page){
                var record = page.toJSON();
                record.extension = record.src.slice(record.src.lastIndexOf('.') + 1);
                html += template(record);
            });

            this.$el.html(html);
        },

        create: function(evt){
            console.log('create');
        },

        remove: function(evt){
            evt.preventDefault();

            var id = $(evt.currentTarget).attr('data-id'),
                model = this.collection.get(id);

            model.destroy(function(){
                this.collection.sync();
            });
        }

    });

});