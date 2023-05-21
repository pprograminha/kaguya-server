import { Either } from '@core/either';
import { Maybe } from '@shared/types/app';
import admin from 'firebase-admin';
import { GetUserResponse, IAuthProvider } from '../models/auth-provider';

class FirebaseAuthProvider implements IAuthProvider {
  static INSTANCE: Maybe<FirebaseAuthProvider> = null;

  private app: admin.app.App;

  constructor() {
    const app = admin.initializeApp({
      projectId: 'kaguya-d4e5a',
      storageBucket: 'kaguya-d4e5a.appspot.com',
      serviceAccountId:
        'firebase-adminsdk-5losg@kaguya-d4e5a.iam.gserviceaccount.com',
      credential: admin.credential.cert({
        projectId: 'kaguya-d4e5a',
        privateKey:
          '-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQC/UChUqE4oPxER\n6XHwaPv0Yt8SIWYcS6e17xb+c0IqRDzjxGQD69yNu+vVf4xeorpB0G+WUs2grkq2\ncq2l1UJA6AbMDXFYOLx1jEADjuAeX8HJz4opnpbWeJJUldtQch6NyZkYYOZbyioQ\n7O4lH1bqK+a9oendBzdxo5TbDlO92U7zAKkO7BpqdYe1qRQWcW2S4501ZuWxL64H\nYssvuwgMG6c9KgBMlPnxwR8A0+RHbK9nvwDECEtttwMLLGCLbmNRmrnuOQKaJi2N\nbwX9f+KZoCv8O+wqqCVk7932UlknvBkX5jDGelVE6zAGUfcnj56LNH5tVO4ydG7W\nKt0bG51JAgMBAAECggEADAgE+Un6XFKXBrrZJQbdLYHYSIIcM1RYsDrghdEGzLSs\n5aAQsCRxouI6Exup3ru6HfB3TAtaDixX24B7xi2StJVC9Cs2QReUVooi7nZaRt67\nx67LIBHup38+qJ4iBD2hCUav35YcdpJQse7MjT4az7BCGxPnKrTM+lMQxfPxNUOs\n0O8pUdzQ48lXeI9aS5KoDBUG1bOc9gSPPY5n1zkMOgPtFYOH7NJzyPfxLRyKZmra\nWSvlb9sNIygtAxHrakaIPhtqTk5vZk9qxiTloBfvZ2m8tAEyIW/2OkUXQuwVQ80r\naa6WB9XmCt8A8zE84PK4R0+K973a2hIdbpzqIXYxOQKBgQD2sn0BF/cymX3AukFz\npFys/bkAzv+QUsCzh3UwnDk4hjgsMbDTjcCS1+wPtTb+tV0b8j1GOprHQxK2UQen\nW4qO2sLfNtVbzSnziiFE/GD/qSrJc1IhXh3pQbSj9PXqnxnWS2PxEFy7LakrfeZa\nwwPVNYBwUrmebp/sLWDo6kswlQKBgQDGhwOn5qyu4hDS8emTp6gjw0fu/xzJkyKo\nAYyusWP35IovxGiYJgHs1fWZHxhglqwtn2sE/rrBLhHTd3gUkx6GoKqsHhwVkIeC\nroIpK0LBz69cRwRuLgVlNhAeNXPmI9vreg2uF3Oa+Yim0qJUDN3ywzBrcUv8sWpj\nvmnxT2KI5QKBgGg9SyynH8C1srk4+mcO0EoYe4+n57zn+pzhY9dCa7tCm4GxDXKW\ntwRVUF3iyHYf1FP2q4V9ReFkqgd3fbBtscJjFWyUEttTeaJ6f0xTB/l/VaEBpXaL\n+j+Rj+6nlzGoQJaYDIbTzxsYVB8Yd7lqJbh1fuv3SI91VwXItuYz+clxAoGAElz+\nu5McufhzMe/qeRvy84vmpXa3hPW1KPErwCTsaEuddJmoSxqI5w1LcGRt7tFBD99F\nGOsu/xtxzquoUc7h7fYCk3Udh+kcf7wAkipMPH0nbVOsVzyuhxQfHYw4Mjty5i8e\nANJugRE/0J5/IWMnTIM9gVKzgqYufxdn2UhMhvkCgYEApIG63U81/uCOkWQ1+g0i\nPY8Kyj3GxXDaxiuFgHOWv0/KyoYEKBGrZUmUJBKjeuN8UNa1Z3Y69u+EnMG8LiL3\nQWdmyXQ479DKmbNOBSMbS/TcJvXBuYHQF80PVav3DVUXyXe0q0rCyvDHens+Y+Rk\nPqRysWQbJ4z6Yw+SCRAJN5s=\n-----END PRIVATE KEY-----\n',
        clientEmail:
          'firebase-adminsdk-5losg@kaguya-d4e5a.iam.gserviceaccount.com',
      }),
    });

    this.app = app;
  }

  async getUser(accessToken: string): GetUserResponse {
    try {
      const decodedIdToken = await this.app.auth().verifyIdToken(accessToken);

      const user = await this.app.auth().getUser(decodedIdToken.uid);

      if (user.disabled) {
        return Either.left(new Error('Disabled user'));
      }

      return Either.right({
        uid: user.uid,
        email_verified: user.emailVerified,
        avatar_url: user.photoURL,
        email: user.email,
        name: user.displayName,
        phone_number: user.phoneNumber,
      });
    } catch {
      return Either.left(new Error('Unauthorized'));
    }
  }

  static create() {
    if (!this.INSTANCE) {
      this.INSTANCE = new FirebaseAuthProvider();
    }

    return this.INSTANCE;
  }
}
export { FirebaseAuthProvider };
