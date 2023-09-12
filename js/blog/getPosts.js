// Author: Linda Moenstre - Digitaldesigner.no 2023

const getPostsButton = document.getElementById(".get-posts-button");

if ( typeof ( getPostsButton ) != "undefined" && getPostsButton != null ) {
    getPostsButton.addEventListener ( "click", function () {
        var postsCollection = new wp.api.collections.Posts();
        postsCollection.fetch().done( function(posts) {
            const textarea = document.getElementById("postsideenher");
        posts.foreach (function (post) {
            textarea.append (post.title.rendered + "\n" )
        } );
                
            });
        } );

    }
// clear the textarea button

    const clearPostsButton = document.getElementById(".clear-posts-button");
    if (typeof (clearPostsButton) != "undefined"  && clearPostsButton != null ) {
        clearPostsButton.addEventListener("click", function () {
            const textarea = document.getElementById("postsideenher")
            textarea.value = ""
        });
    }

        