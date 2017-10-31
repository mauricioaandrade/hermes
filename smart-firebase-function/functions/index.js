const functions = require('firebase-functions');

// Create and Deploy Your First Cloud Functions
// https://firebase.google.com/docs/functions/write-firebase-functions

// Instalar firebase-tools: npm install -g firebase-tools
// Inicializar cloud functions: firebase init functions
// DEPLOY firebase deploy --only functions

const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);

/**
 * Envia notificação quando um evento é criado/motificado em `/events/{eventId}`.
 *
 * Os dispositivos possuem os ids dos usuários `/devicesUsers/${smartCode}/users`.
 * 
 * Alguns links:
 * https://mobikul.com/sending-notification-firebase-cloud-functions/
 * https://aaronczichon.de/2017/03/13/firebase-cloud-functions/
 * https://github.com/firebase/functions-samples/blob/master/fcm-notifications/functions/index.js
 * https://github.com/MahmoudAlyuDeen/FirebaseIM/blob/master/server/functions/index.js
 * https://android.jlelse.eu/serverless-notifications-with-cloud-functions-for-firebase-685d7c327cd4
 * https://android.jlelse.eu/cloud-functions-for-firebase-device-to-device-push-notification-f4c548fd9b7d
 * 
 */
exports.sendEventNotification = functions.database.ref('/events/{eventId}').onWrite(event => {
  const smartCode = event.data.val()["smart_code"];
  if (!smartCode) {
    return
  }
  
  //obter usuarios do dispositivo do evento
  const getUsersPromise = admin.database().ref(`/devicesUsers/${smartCode}/users`).once('value');

  return Promise.all([getUsersPromise]).then(results => {
    const users = results[0].val();

    const userIds = Object.keys(users).map(function(key) {
      return users[key];
    });

    // para cada usuário
    userIds.map(function(userId) {
      if(!userId) {
        return;
      }

      // obter dados do usuário
      const userPromise = admin.database().ref(`/users/${userId}`).once('value');
      
      return Promise.all([userPromise]).then(results2 => {
        const user = results2[0].val();
        const userSnapShot = results2[0];

        if (!user) {
          return;
        }

        const payload = {
          notification: {
            title: 'Um incidente ocorreu!',
            body: `Algo de errado não está certo.`,
          }
        };
            
        const tokens = user["pushNotificationTokens"];

        console.log(tokens);
        if (!tokens || !tokens.length) {
          return;
        }

        //enviar notificação
        return admin.messaging().sendToDevice(tokens, payload).then(response => {
          const tokensToRemove = [];
          response.results.forEach((result, index) => {
            const error = result.error;
            if (error) {
              console.error('Failure sending notification to', tokens[index], error);
              // limpar tokens inválidos
              if (error.code === 'messaging/invalid-registration-token' ||
                  error.code === 'messaging/registration-token-not-registered') {
                tokensToRemove.push(userSnapShot.ref.child('pushNotificationTokens').child(index).remove());                
              }
            }
          });
          return Promise.all(tokensToRemove);
        });
      })
    })
  });
});