$(document).on('ready', function() {

  $("body").on("click", "#get_people", getPeopleList)

  $("body").on("click", "#post_person", makeNewPerson)

  $("body").on("click", "#update_person", updatePerson)

  $("body").on("click", "#delete_person", deletePerson)

  // $("body").on("click", "#reload", reload)


})



function getPeopleList(e) {
  // debugger;

  history.replaceState({}, document.title, ".");
  $.ajax({
    method: "get",
    url: "https://spotandidentify.herokuapp.com/people",
    error: function(data) {
      // debugger
    },
    success: function(data) {
      $(".people_list").empty().prepend("<br>").append("<h4>All People</h4>")
      data.forEach(function(e){

        // debugger

        print = {id: e.id, name: e.name, favoriteCity: e.favoriteCity}
        var id = e.id
        var link = $(document.createElement("a"))
        link.attr('href', "https://spotandidentify.herokuapp.com/people/" + parseInt(id))
        link.attr('class', "people")
        link.attr('id', id)
        link.text(e.name)
        // link.text ++ e.favoriteCity ++ id

        $(".people_list").append(link).append("<br>")
        $(".people_list").append(print).append("<br>")

        // debugger

      })

    }})

}



function makeNewPerson(e) {
  // debugger

  e.preventDefault()
  var name = $("input[name*=name_for_post]").val()
  var favoriteCity = $("input[name*=favoriteCity_for_post]").val()

  // debugger

  $.ajax({
    method: "post",
    url: "https://spotandidentify.herokuapp.com/people",
    data: {
        name: name,
        favoriteCity: favoriteCity
      },
    error: function(e) {
      // debugger

    },
    success: function(e) {
      // debugger
      var name_text = "name: " + e.name
      var city_text = "favoriteCity: " + e.favoriteCity
      $(".show_person").append("<br><br>").append(name_text).append("<br>").append(city_text).append("<br>")
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
      error: function(e){
      },
      success: function(e) {

        var text = "name: " + e.name + "new value for attribute favoriteCity: " + e.favoriteCity
        $(".person_one_show_update").text(text)
      }
    })

}

function deletePerson(e) {

    $.ajax({
      method: "delete",
      url: "https://spotandidentify.herokuapp.com/people/1",
      error: function(data){
      },
      success: function(data) {
        // debugger
        $(".delete_message").text(data.message)


      }
    })

}


// function reload(e) {
//
// }
