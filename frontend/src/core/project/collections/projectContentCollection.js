// LICENCE https://github.com/adaptlearning/adapt_authoring/blob/master/LICENSE
define([
  'backbone',
  'coreJS/app/origin',
  'coreJS/project/models/projectContentModel'
], function(Backbone, Origin, ProjectContentModel) {

  var ProjectContentCollection = Backbone.Collection.extend({

    model: function(attrs) {
      return new ProjectContentModel(attrs, 'projectid');
    },

    initialize: function(models, options) {
      this.url = options.url;
      this._type = options._type;
      this._projectId = options._projectId;
      this.fetch({reset: true});
    },

    _prepareModel: function(model, options) {
      if (!(model instanceof ProjectContentModel)) {
        model._projectId = this._projectId;
      }
      return Backbone.Collection.prototype._prepareModel.call(this, model, options);
    }

  });

  return ProjectContentCollection;

});