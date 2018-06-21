var postsS;
var commentsS;
var usersS;
var showPost = '';
var showComment = '';
var displayPost = '';



if (localStorage.length == 0) {
    
        jQuery.ajax({
            type: 'GET',
            url: 'https://jsonplaceholder.typicode.com/posts',
            success: function (post) {
                localStorage.posts = JSON.stringify(post);

            }
        }),
        jQuery.ajax({
            type: 'GET',
            url: 'https://jsonplaceholder.typicode.com/comments',
            success: function (comment) {

                localStorage.comments = JSON.stringify(comment);

            }
        }),
        jQuery.ajax({
            type: 'GET',
            url: 'https://jsonplaceholder.typicode.com/users',
            success: function (user) {

                localStorage.users = JSON.stringify(user);

            }
        })
    .then(function () {
        init();
    }
        )

}


init();

function init() {
    console.log("loaded")

    showPost += `<button id="crP">Create Post</button>`;
    if (localStorage.length != null) {

        usersS = JSON.parse(localStorage.getItem("users"));
        commentsS = JSON.parse(localStorage.getItem("comments"));
        postsS = JSON.parse(localStorage.getItem("posts"));
        console.log(postsS.length);
        for (var i = 0; i < postsS.length; i++) {
            for (var j = 0; j < usersS.length; j++) {
                if (usersS[j].id == postsS[i].userId) {

                    showPost += `<div class="posts" style='border: 1px solid; padding:5px' id="posts_${postsS[i].id}">    
                    <h4>Name:&nbsp<i>${usersS[j].username}</i></h4>
                    <h4>Title:&nbsp<i>  ${postsS[i].title}</i></h4>
                    <h4>Description:&nbsp<i> ${postsS[i].body}</i></h4> 
                 <button id="comments_btn_${postsS[i].id}">Comments</button>
                 <button id="delete_btn_${postsS[i].id}">Remove</button>
                 </div>`;
                    //  console.log(showPost);
                }
            }
        }

        document.getElementById("mainPost").innerHTML = showPost;

    }
}

displayPost += `<div>
<div class="showT"><h4>Title:&nbsp<i><input id="Title" type="text"></input></i></h4></div><br>
<h4>Description:&nbsp<i><input id="descr"></input> </i></h4> 
<button id="submit">Submit</button>
</div>`;

jQuery("#mainPost").on("click", "button[id^='crP']",function () {
    console.log("hello")
  jQuery("showT").toggle();
    jQuery("#crP").after(displayPost);
    jQuery("#submit").on("click", function () {
        console.log("hello");
        var creatP = {

            id: postsS.length + 1,
            title: document.getElementById("Title").value,
            body: document.getElementById("descr").value
        }
        console.log(creatP);
        postsS.push(creatP);
        document.getElementById("Title").value = '';
        document.getElementById("descr").value = '';
        console.log(postsS);
        localStorage.posts = JSON.stringify(postsS);
        init();
      
    })
})


jQuery("#mainPost").on("click", "button[id^='delete_btn_']", function () {

    var id = jQuery(this).attr('id');
    var delP = Number(id.substring(11));

    for (var k = 0; k < postsS.length; k++) {
        if (delP == postsS[k].id) {
            console.log(postsS[k].id);

            postsS.splice(k, 1);
            console.log(localStorage.posts = JSON.stringify(postsS))
            localStorage.posts = JSON.stringify(postsS)
            console.log(postsS);
        init();
        }
    }

});


jQuery("#mainPost").on("click", "button[id^='comments_btn_']", function () {
    usersS = JSON.parse(localStorage.users);
    commentsS = JSON.parse(localStorage.comments);
    postsS = JSON.parse(localStorage.posts);
    var id = jQuery(this).attr('id');
    var delRep = id.replace('comments', 'delete');
    var delC = Number(id.substring(13));
    console.log(delC);
    var showC = [];
    showComment = '';
    for (var l = 0; l < commentsS.length; l++) {
        if (delC == commentsS[l].postId) {

            showC.push(commentsS[l].body);
        }

    }
    console.log(showC.length);

    jQuery(".comments").remove();
    jQuery("#comC").remove();

    jQuery("#cR").remove();

    showHtml();

    function showHtml() {

        for (var i = 0; i < showC.length; i++) {

            showComment += `<div class="comments">
                            <p>${showC[i]}</p>
                            <button id="deleteC_${commentsS[i].id}">Remove</button>
                            </div>`;

        }

    }


    jQuery("#" + delRep).after(showComment + '<button id="comC">Comment');
    jQuery("#comC").before(`<div id="cR"><input id="box" type="text"></input></div>`);


    jQuery("#mainPost").on("click", "button[id^='deleteC_']", function () {
        var deleteD = jQuery(this).attr('id');
        console.log(deleteD);
        var deleteId = Number(deleteD.substring(8));
        for (var i = 0; i < commentsS.length; i++) {
            if (commentsS[i].id == deleteId) {
                // console.log(commentsS[i].id)
                commentsS.splice(i, 1);
                console.log(showC);
                showC.splice(i, 1);
                console.log(showC)
                console.log(commentsS);
                localStorage.comments = JSON.stringify(commentsS);
                console.log(localStorage.comments = JSON.stringify(commentsS));
                console.log(showC);
                console.log(showC.length);
                showComment = "";

                showHtml();
                jQuery(".comments").remove();

                jQuery("#comC").remove();
                jQuery("#cR").remove();
                jQuery("#" + delRep).after(showComment + '<button id="comC">comment');
                jQuery("#comC").before(`<div id="cR"><input id="box" type="text"></input></div>`);

            }
        }

    })


    jQuery("#comC").on("click", function () {

        var creatC = {
            postId: delC,
            id: commentsS.length + 1,
            body: document.getElementById("box").value
        }
        commentsS.push(creatC);
        document.getElementById("box").value = "";
        console.log(commentsS);
        localStorage.comments = JSON.stringify(commentsS);
        init();
        showC = [];
        for (var p = 0; p < commentsS.length; p++) {
            if (delC == commentsS[p].postId) {

                showC.push(commentsS[p].body);
            }
            console.log('hello')
        }
        // document.getElementById("mainComment").innerHTML = showComment;
        jQuery(".comments").remove();

        jQuery("#comC").remove();
        jQuery("#box").remove();


        jQuery("#cR").remove();
        showComment = '';

        showHtml();
    });

})





