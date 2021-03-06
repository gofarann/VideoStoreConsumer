import Backbone from 'backbone';
import _ from 'underscore';
import $ from 'jquery';

import RentalLibrary from '../collections/rental_library';
import MovieView from './movie_View';
import Movie from '../models/movie';
import SearchResults from '../collections/search_results';
import SearchResultsView from '../views/search_results_view';

var RentalLibraryView = Backbone.View.extend({
  initialize: function(params) {
    this.template = params.template;
    this.listenTo(this.model, "update", this.render);
    //var movieDetails = _.template($('movie-details-template').html());
  },

  render: function(){
    this.$('#movie-list').empty();

    var that = this;

    this.model.each(function(movie){
      var movieView = new MovieView({
        model: movie,
        template: that.template

      });
      that.$("#movie-list").append(movieView.render().el);
      // that.listenTo(movieView, "selected", that.renderModal);
    });
  },

  events: {
    "click #search": "search",
    "click #logo": "render",
    "click": "hideModal"

  },

  search: function(){
    // getting the query term from the search bar
    var query = this.$("#query").val();

    // creating a new instance of search result and calling the rails API for the information
    var searchResults = new SearchResults();
    searchResults.fetch({ data: $.param({ query }) });


    var searchResultsView = new SearchResultsView({
      model: searchResults,
      template: _.template($('#new-movie-card-template').html()),
      el: 'main'
    });
  },

  hideModal: function() {
    $('#movie-details').addClass('hidden');
  }



});


export default RentalLibraryView;
