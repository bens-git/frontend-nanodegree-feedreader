/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */
/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    /* This suite is all about the RSS
     * feeds definitions, the allFeeds variable in our application.
     */
    describe('RSS Feeds', function() {
        /* test to make sure that the
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
        /* test each feed
         * in the allFeeds object and ensure it has a URL defined
         * and that the URL is not empty.
         */
        it('have a non-empty URL defined for each', function() {
            allFeeds.forEach(function(feed) {
                expect(feed.url).toBeDefined();
                expect(feed.url).not.toBe('');
            });
        });
        /* test that each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */
        it('have a non-empty name defined for each', function() {
            allFeeds.forEach(function(feed) {
                expect(feed.name).toBeDefined();
                expect(feed.name).not.toBe('');
            });
        });
    });
    /* This suite is all about the menu.
     */
    describe('The Menu', function() {
        /* test that the menu element is
         * hidden by default. You'll have to analyze the HTML and
         * the CSS to determine how we're performing the
         * hiding/showing of the menu element.
         */
        it('is hidden by default', function() {
            expect($('body').hasClass('menu-hidden')).toBe(true);
        });
        /* test that ensures the menu changes
         * visibility when the menu icon is clicked.  the menu should display when
         * clicked and  it should hide when clicked again.
         */
        it('changes visibility when the menu icon is clicked', function() {
            $('.menu-icon-link').trigger('click');
            expect($('body').hasClass('menu-hidden')).toBe(false);
            $('.menu-icon-link').trigger('click');
            expect($('body').hasClass('menu-hidden')).toBe(true);
        });
    });
    /* This suite is all about the Initial Entries.
     */
    describe('Intial Entries', function() {
        /* test that when the loadFeed function is called and completes its work, there is at least
         * a single .entry element within the .feed container.
         * Remember, loadFeed() is asynchronous so this test will require
         * the use of Jasmine's beforeEach and asynchronous done() function.
         */
        beforeEach(function(done) {
            loadFeed('0', done);
        });
        it("should have at least a single .entry element within the .feed container when loadfeed is complete", function() {
            expect($('.feed').find('.entry').length).toBeGreaterThan('0');
        });
    });
    /* This suite is all about the New Feed Selection.
     */
    describe('New Feed Selection', function() {
        /* test that when a new feed is loaded
         * by the loadFeed function, the content actually changes.
         * Remember, loadFeed() is asynchronous.
         */
        beforeEach(function(done) {

            // call asynchronous function
            loadFeed('0', function() {
                //set up
                initialFeeds = [];
                $('.entry').each(function(i, feed) {
                    initialFeeds[i] = feed.innerText;
                });

                // call asynchronous function
                loadFeed('1', function() {
                    //set up
                    finalFeeds = [];
                    $('.entry').each(function(i, feed) {
                        finalFeeds[i] = feed.innerText;
                    });
                    done();
                });
            });
        });
        it("should have different content", function() {
            expect(initialFeeds).not.toEqual(finalFeeds);
       });




    });
}());
