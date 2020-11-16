var json, people, messages;

$(document).ready(function() {
  mentionsI = $('textarea.mention').mentionsInput({
    onDataRequest:function (mode, query, callback) {
      var data = _.filter(people, function(item) { return item.name.toLowerCase().indexOf(query.toLowerCase()) > -1 });
      callback.call(this, data);
    }
  });
})

//------------------------

function jsonifyGiveThanksForm() {
  let mentionIDs = [];
  $('textarea.mention').mentionsInput('getMentions', function(data) {
      data.forEach((item, i) => {
        mentionIDs.push(item.id);
      });
  });

  return {
    message: $('#thanks-message').val(),
    tags: mentionIDs
  };
}

//------------------------

$('#send-thanks-btn').on('click', function() {
  //do ajax to api/give/thanks
  $.ajax({
    url: "/api/give/thanks",
    type: "POST",
    dataType: "json",
    data: jsonifyGiveThanksForm(),
    //on successful data reception, we can now show the data and make it all functional
    success: function(data) {
      if (data === false) {
        console.error('ERROR: Server could not return a valid database object.');
        return;
      }

    }, //end success
    error: function(err) { console.log(err) }
  }); //end ajax call
})

//------------------------

$('#person-selector').on('change', function() {
  console.log($('#person-selector').val());
  populateThanks(messages, $('#person-selector').val())
});

//------------------------

function populatePeople(ppl) {

  $('#person-selector').append(
    $('<option>', {
      'value': '',
      'text': 'Choose a Person'
    })
  );

  ppl.forEach(function(entry, i, arr) {
    $('#person-selector').append(
      $('<option>', {
        'value': entry.id,
        'text': entry.name
      })
    )
  });
}

//------------------------

function populateThanks(msgs, filter=false) {
  $('#thanks-display').empty();
  msgs.forEach((item, i) => {
    if (!filter || item.tags.includes(parseInt(filter))) {
      $('#thanks-display').append(
        $('<div>', {
          class: 'thanks-list-message col-md-12',
          text: item.message,
        })
      )
    }
  });
}

//------------------------

function showTree() {
  $('#json-tree').removeAttr('style');
  $('#json-tree').jsonViewer(json, {collapsed: true}); //call tree view on the json
  $('#loading-icon').trigger('treeCreated');
}

//------------------------

//ajax request to get data to populate tables with
  //fire immediately on doc ready
  $.ajax({
    url: "/api/get/thanks",
    type: "POST",
    dataType: "json",
    data: {},
    //on successful data reception, we can now show the data and make it all functional
    success: function(data) {
      if (data === false) {
        console.error('ERROR: Server could not return a valid database object.');
        return;
      }
      json = data; //make the data global just in case we need it later
      people = data.people;
      messages = data.messages;

      //DO STUFF
      console.log(data);

      populatePeople(data.people);
      populateThanks(data.messages);



      //register lodaing icon events and when to start/stop
      $('#loading-icon').bind('showTree', function() {
        $(this).css({'padding-top':'45px','padding-bottom':'35px'});
        $(this).show();
      });
      $('#loading-icon').bind('treeCreated', function() {
        $(this).hide();
        $(this).css({'padding-top':'0px','padding-bottom':'0px'});
      });
      $('.tree-view').on('click', 'button', function() {
        $('#loading-icon').trigger('showTree');
        $('.tree-view button').hide();
        setTimeout(function() { showTree() }, 5);
      });

    }, //end success
    error: function(err) { console.log(err) }
  }); //end ajax call
