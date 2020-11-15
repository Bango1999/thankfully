
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
    url: "/api/web/fetch",
    type: "POST",
    dataType: "json",
    data: {},
    //on successful data reception, we can now show the data and make it all functional
    success: function(data) {
      if (data === false) {
        console.log('ERROR: Server could not return a valid database object.');
        return;
      }
      json = data; //make the data global just in case we need it later


      //DO STUFF
      console.log(data);


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

      //user clicks a show table action, display the table they requested
      // $('.table-actions').on('change', 'select', function(e) {
      //   var dId = $(this).find("option:selected").attr('data-id');
      //   var val = $(this).find("option:selected").attr('value');
      //   if (dId !== 'false') {
      //     $('.table-actions select').each(function() {
      //       if ($(this).find('option').eq(1).attr('data-id') != dId) {
      //         $(this).val($(this).find('option:first').val());
      //       }
      //     })
      //     tableToHTML(tabulate(dId, val));
      //   } else if ( $.fn.DataTable.isDataTable('#datatable') ) {
      //     $('#datatable').DataTable().destroy();
      //     $('#datatable').empty();
      //   }
      // });

    }, //end success
    error: function(err) { console.log(err) }
  }); //end ajax call
