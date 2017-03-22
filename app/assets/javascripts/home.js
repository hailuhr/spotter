$(document).on('ready', function() {

  $("body").on("click", "#get_people", getPeopleList)

  $("body").on("click", "#post_person", makeNewPerson)

  $("body").on("click", "#update_person_one", updatePerson)

  $("body").on("click", "#delete_person", deletePerson)

  $("body").on("click", "#reload", reload)

})



function getPeopleList(e) {

  history.replaceState({}, document.title, ".");
  $.ajax({
    method: "get",
    url: "https://spotandidentify.herokuapp.com/people",
    error: function(data) {
      $("#people_list").empty().prepend("<br>").append("Something went wrong..try again.")
    },
    success: function(data, textStatus, jqXHR) {

      $("#people_list").empty().prepend("<br>").append("<h4>All People's Names</h4>")

      request_info = "jqXHR: " + jqXHR + "<br>"
      request_info += jqXHR.getAllResponseHeaders()

      data.forEach(function(person){

        var id = person.id
        var name_link = $(document.createElement("a"))
        name_link.attr('href', "https://spotandidentify.herokuapp.com/people/" + parseInt(id))
        name_link.attr('class', "people").attr('id', id).attr('target', '_blank')
        name_link.text(person.name)

        $("#people_list").append(name_link).append("<br>")

      })

      $("#request_info_peoples_list").empty().prepend("<br>").append("<h4>Request Information</h4>")
      $("#request_info_peoples_list").append(request_info).append("<br>")


    }})

}



function makeNewPerson(e) {

  e.preventDefault()
  var name = $("input[name*=name_for_post]").val()
  var favoriteCity = $("input[name*=favoriteCity_for_post]").val()

  $.ajax({
    method: "post",
    url: "https://spotandidentify.herokuapp.com/people",
    data: {
        name: name,
        favoriteCity: favoriteCity
      },
    error: function(data) {
      $("#show_person").empty().prepend("<br>").append("Something went wrong..try again.")
    },
    success: function(data, textStatus, jqXHR) {

      request_info = "jqXHR: " + jqXHR + "<br>"
      request_info += jqXHR.getAllResponseHeaders()

      var name_text = "name: " + data.name
      var city_text = "favoriteCity: " + data.favoriteCity
      if (typeof(data.name) == "object"){
        $("#show_person").empty().prepend("<br>").append("<h4>No Person Added:</h4>").append(name_text).append("<br>").append(city_text)
      } else {
        $("#show_person").empty().prepend("<br>").append("<h4>New Person Added:</h4>").append(name_text).append("<br>").append(city_text)
      }


      $("#request_info_show_person").empty().prepend("<br>").append("<h4>Request Information</h4>")
      $("#request_info_show_person").append(request_info).append("<br>")
    }
  })
}


function updatePerson(e) {
  var favoriteCity = $("input[name*=favoriteCity_for_put]").val()
    $.ajax({
      method: "put",
      url: "https://spotandidentify.herokuapp.com/people/1",
      data: {
        favoriteCity: favoriteCity
      },
      error: function(data){
        var text = "That person has been deleted from the database!"
        $("#update_person").empty().prepend("<br>").append("<h4>Change Person 1's Favorite City</h4>").append(text)
      },
      success: function(data, textStatus, jqXHR) {

        request_info = "jqXHR: " + jqXHR + "<br>"
        request_info += jqXHR.getAllResponseHeaders()
        if (typeof(data.favoriteCity) == "object"){
          var text = "The new value for attribute favoriteCity <br>" + data.favoriteCity
        } else {
          var text = data.name + "'s" + " new value for the attribute favoriteCity <br> is now:"
          var city = "<p style=font-weight:bold>" + data.favoriteCity + "</p>"
        }

        $("#update_person").empty().prepend("<br>").append("<h4>Change Person 1's Favorite City</h4>").append(text).append(city)

        $("#request_info_update_person").empty().prepend("<br>").append("<h4>Request Information</h4>")
        $("#request_info_update_person").append(request_info).append("<br>")
      }
    })

}

function deletePerson(e) {
    $.ajax({
      method: "delete",
      url: "https://spotandidentify.herokuapp.com/people/1",
      error: function(data){
        $("#delete_message").empty().prepend("<br>").append("Something went wrong..try again.")
      },
      success: function(data, textStatus, jqXHR) {
        request_info = "jqXHR: " + jqXHR + "<br>"
        request_info += jqXHR.getAllResponseHeaders()
        if (data == null) {
          $("#delete_message").empty().prepend("<br>").append("<h4>Delete Person 1 - Sean</h4>").append("<br>Sorry, the person with id 1 has been deleted already!<br>Sean has been gone.")
        } else {
          $("#delete_message").empty().prepend("<br>").append("<h4>Delete Person 1 - Sean</h4>").append("<br>Person with id 1 is now deleted, Sean is gone!")
        }

        $("#request_info_delete_person").empty().prepend("<br>").append("<h4>Request Information</h4>")
        $("#request_info_delete_person").append(request_info).append("<br>")
      }
    })

}


function reload(e) {
  location.reload()
}
