(function() {

  const serverUrl = 'http://127.0.0.1:3000';
  const messageUrl = 'http://127.0.0.1:3000/messages';

  //
  // TODO: build the swim command fetcher here
  //

  const create = function(message, successCB, errorCB = null) {
    // todo: save a message to the server
    $.ajax({
      // This is the url you should use to communicate with the parse API server.
      url: 'http://127.0.0.1:3000/messages',
      type: 'POST',
      data: JSON.stringify(message),
      contentType: 'application/json',
      success: successCB || function (data) {
        console.log('Message sent');
      },
      error: errorCB || function (data) {
        // See: https://developer.mozilla.org/en-US/docs/Web/API/console.error
        console.error('Failed to send message', data);
      }
    });
  }

  const fetchMessages = () => {

    $.ajax({
      url: messageUrl,
      type: 'GET',
      contentType: 'text/plain',
      success: function (data) {
        // send data to be used to move the fishies
        setTimeout(fetchMessages, 1000);
        console.log(`getting info: ${data}`);
      }
    });
  };


  /////////////////////////////////////////////////////////////////////
  // The ajax file uplaoder is provided for your convenience!
  // Note: remember to fix the URL below.
  /////////////////////////////////////////////////////////////////////

  const ajaxFileUplaod = (file) => {
    var formData = new FormData();
    formData.append('file', file);
    $.ajax({
      type: 'POST',
      data: formData,
      url: serverUrl,
      cache: false,
      contentType: false,
      processData: false,
      success: () => {
        // reload the page
        window.location = window.location.href;
      }
    });
  };

  $('form').on('submit', function(e) {
    e.preventDefault();

    var form = $('form .file')[0];
    if (form.files.length === 0) {
      console.log('No file selected!');
      return;
    }

    var file = form.files[0];
    if (file.type !== 'image/jpeg') {
      console.log('Not a jpg file!');
      return;
    }

    ajaxFileUplaod(file);
  });

  fetchMessages();

})();