/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */

 /* Reviewed by HisAbimbola */
$(function() {
    /* This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
    describe('RSS Feeds', function() {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });


         /* Loops through each feed in the allFeeds object and ensures
          * it has a URL defined and that the URL is not empty.
          */
        it('each feed in allFeeds has a non empty URL defined', function() {
            allFeeds.forEach(function(feed){
                expect(feed.url).toBeDefined();
                expect(feed.url.length).not.toBe(0);
            });
        });



        /* Loops through each feed n the allFeeds object and ensures
         * it has a name defined and that the name is not empty.
         */
        it('each feed in allFeeds has a non empty name defined', function() {
            for (var feed of allFeeds) {
                expect(feed.name).toBeDefined();
                expect(feed.name.length).not.toBe(0);
            };
        });
    });


    /* Validate the visual elements of the navigation menu
    */
    describe('The Menu', function() {

        /* Ensure the menu element is hidden by default.
         */
        it('is hidden by default', function() {
            expect($('body').hasClass("menu-hidden")).toBeTruthy();

        });

         /* Eensures the menu changes visibility when the menu icon
          * is clicked.
          */
        it('changes visibility when the menu icon is clicked', function() {
            menuIcon = $('.menu-icon-link');
            menuIcon.addClass('menu-hidden');
            menuIcon.click();
            expect($('body').hasClass("menu-hidden")).toBeFalsy();
            menuIcon.click();
            expect($('body').hasClass("menu-hidden")).toBeTruthy();
        });
    });

    /* Validate that initial feed entries are populated correctly
     */
    describe('Initial Entries', function() {
        beforeEach(function(done) {
            loadFeed(0,done);
        });

        /* Ensures when the loadFeed function is called and completes its
         * work, there is at least a single .entry element within the .feed
         * container.
         */
        it('loadFeed creates at least one .entry in .feed container', function() {
            expect($(".feed  .entry").length).not.toBe(0);
        });

    });

    /* Validate proper behavior when selected a new feed */
    describe('New Feed Selection', function() {
        beforeEach(function(done) {
            $(".feed").empty();
            loadFeed(0,done);
        });

        /* Ensure when a new feed is loaded by the loadFeed function that the
         * content actually changes.
         */
        it('loadFeed changes the content', function(done) {
            var oldContent = $(".feed .entry h2");
            loadFeed(1,function() {
                var newContent = $(".feed .entry h2");
                for (var i = 0, max = Math.min(newContent.length, oldContent.length); i < max; i++) {
                    expect(newContent[i].innerHTML).not.toBe(oldContent[i].innerHTML);
                };
                done();
            });
        });
    });
}());
