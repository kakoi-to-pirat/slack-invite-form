$('#slack-invite-form').submit(function (e) {
  e.preventDefault();
  var email =  $('#slack-invite-email').val();
  var button = $('#slack-invite-form-button');
  button.attr('disabled','disabled');
  button.addClass('disabled');
  button.html('Пожалуйста, подождите');
  $.post(
      'https://YOUR_TEAM.slack.com/api/users.admin.invite',
      {
          email: email,
          token: 'YOUR_TOKEN_FROM_SLACK',
          set_active: true
      },
      function(response) {
          if (response.error) {
              button.addClass('error');
              if (response.error == 'already_in_team'){
                  response.error = 'Уже в чате!'
              }
              button.html(response.error);
          } else {
              button.addClass('success');
              button.html('Приглашение отправлено!');
          }
      }
  );
});