describe('MovieCore', function() {
  var PopularMovies;
  var $httpBackend;

  beforeEach(function() {
    module('movieCore');
    inject(function(_PopularMovies_, _$httpBackend_) {
      PopularMovies = _PopularMovies_;
      $httpBackend = _$httpBackend_;
    });
  });

  afterEach(function() {
    $httpBackend.verifyNoOutstandingExpectation();
    $httpBackend.verifyNoOutstandingRequest();
  });

  it('should create a popular movie', function() {
    var movieId = 120;
    var expectedData = new RegExp('{"id":' + movieId +  ',"description":".*"}');

    $httpBackend
      .expectPOST(/./, expectedData)
      .respond(201);

    var popularMovie = new PopularMovies({
      id: movieId,
      description: 'Great movie',
    });

    popularMovie.$save();

    expect($httpBackend.flush).not.toThrow();
  });

  it('should get popular movie by id', function() {
    var movieId = 120;

    $httpBackend
      .expectGET('popular/' + movieId)
      .respond(200);

    PopularMovies.get({ id: movieId });

    expect($httpBackend.flush).not.toThrow();
  });

  it('should create a popular movie', function() {
    var movieId = 120;

    $httpBackend
      .expectPUT('popular/' + movieId)
      .respond(200);

    var popularMovie = new PopularMovies({
      id: movieId,
      description: 'Great movie',
    });

    popularMovie.$update();

    expect($httpBackend.flush).not.toThrow();
  });

  it('should authenticate requests', function() {
    var matchAny = /.*/;
    var popularMovie = { id: 12, description: 'This movie is great!' };
    var expectedHeaders = function(headers) {
      return angular.fromJson(headers).authToken === 'bliblibli';
    };

    $httpBackend
      .whenGET(matchAny, expectedHeaders)
      .respond(200);

    $httpBackend
      .expectPOST(matchAny, matchAny, expectedHeaders)
      .respond(200);

    $httpBackend
      .expectPUT(matchAny, matchAny, expectedHeaders)
      .respond(200);

    $httpBackend
      .expectDELETE(matchAny, expectedHeaders)
      .respond(200);

    PopularMovies.query();
    PopularMovies.get({ id: 120 });
    new PopularMovies(popularMovie).$save();
    new PopularMovies(popularMovie).$update();
    new PopularMovies(popularMovie).$remove();

    expect($httpBackend.flush).not.toThrow();
  });
});