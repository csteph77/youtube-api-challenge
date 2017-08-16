$(document).ready(function(){

    // get input form user
    $("#search-form").submit(function(event) {
        event.preventDefault();
        //get the value form the imput box
        var userInput = $("#query").val();
        //use value to call the getResults function defined below
        getResults(userInput);
    });

    //use the input from query to make an API to get the JSON response
    function getResults(userSearchTerm) {
        $.getJSON("https://www.googleapis.com/youtube/v3/search", {
            part: "snippet",
            maxResults: 20,
            key: "AIzaSyBVHOjMjgMFCny-JPJ8tcpuzTNt2R-NuFM",
            q: userSearchTerm,
            type: "video"

        },
        function (receivedApiData){
            //show the json array received from the API call
            console.log(receivedApiData);
            //if there are no results it will show an error
            if (receivedApiData.pageInfo.totalResults == 0) {
                alert("No videos found!");
            }
            //if there are results, call the displaySearchResults
            else {
                displaySearchResults(receivedApiData.items);

            }
        });
    }
    //create an empty variable to store one LI for each one the results
    var buildTheHtmlOutput = "";
    // using the JSON repsonse (videos), populate the relevenat part of your HTML with the variable inside of the JSON
    function displaySearchResults(videoArray){
        $.each(videoArray, function (videosArrayKey, videosArrayValue){
            buildTheHtmlOutput += "<li>";
            buildTheHtmlOutput += "<p>" + videosArrayValue.snippet.title + "</p>"; //output video title
            buildTheHtmlOutput += "<a href='https://www.youtube.com/watch?v=" + videosArrayValue.id.videoId + "' target='_blank'>"; //open video in new window
            buildTheHtmlOutput += "<img src='" + videosArrayValue.snippet.thumbnails.high.url + "'/>";//display thumbnail
            buildTheHtmlOutput += "</a>";
            buildTheHtmlOutput += "</li>";

        });

        //output to index.html
        $("#search-results ul").html(buildTheHtmlOutput);
    }
});
