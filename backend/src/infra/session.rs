use jsonwebtoken::{decode, encode, Algorithm, DecodingKey, EncodingKey, Header, Validation};
use rocket::serde::{Deserialize, Serialize};

use domain::{
    generator::DateTimeGen,
    schedule::user::model::User,
    session::{Session, SessionDecodeErr, SessionEncodeErr, SessionErr, SessionService},
};

#[derive(Debug, Serialize, Deserialize)]
#[serde(crate = "rocket::serde")]
struct Claims {
    username: String,
    sub: String,
    aud: String,
    iss: String,
    exp: usize,
    iat: usize,
}

const SECRET: &str = "your-secret-key";

pub struct SessionServiceJWT;

impl SessionService for SessionServiceJWT {
    fn encode(&self, user: &User, date_time_gen: &dyn DateTimeGen) -> Result<Session, SessionErr> {
        let claims = Claims {
            username: user.username.clone(),
            sub: user.id.clone(),
            aud: String::from("precise_schedule_server"),
            iss: String::from("precise_schedule"),
            exp: (date_time_gen.now_as_epoch() + 60 * 60 * 2) as usize,
            iat: date_time_gen.now_as_epoch() as usize,
        };
        let token = encode(&Header::new(Algorithm::HS512), &claims, &EncodingKey::from_secret(SECRET.as_ref()))
            .map_err(|_| SessionErr::Encode(SessionEncodeErr))?;
        Ok(Session { token })
    }

    fn decode(&self, session: Session) -> Result<String, SessionErr> {
        let mut validation = Validation::new(Algorithm::HS512);
        validation.set_audience(&[String::from("precise_schedule_server")]);
        validation.set_issuer(&[String::from("precise_schedule")]);
        let token_data = decode::<Claims>(&session.token, &DecodingKey::from_secret(SECRET.as_ref()), &validation)
            .map_err(|_| SessionErr::Decode(SessionDecodeErr))?;
        Ok(token_data.claims.sub)
    }
}

#[cfg(test)]
mod test {
    use std::sync::LazyLock;

    use domain::{
        generator::stub::DateTimeGenStub,
        schedule::user::stub::user_stub,
        session::{Session, SessionService},
    };

    use super::SessionServiceJWT;

    static SESSION: LazyLock<Session> = LazyLock::new(|| {
        Session {
            token: [
                "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9",
                "eyJ1c2VybmFtZSI6InBhdWxfbWMiLCJzdWIiOiJhNmVkYzkwNi0yZjlmLTVmYjItYTM3My1lZmFjNDA2ZjBlZjIiLCJhdWQiOiJwcmVjaXNlX3NjaGVkdWxlX3NlcnZlciIsImlzcyI6InByZWNpc2Vfc2NoZWR1bGUiLCJleHAiOjQxMDEzMDczNjEsImlhdCI6NDEwMTMwMDE2MX0",
                "_5E9VhcTd2hPsybdNZtbTuqA6G5p85x8OtJXe3K0QS1r7CQkXLRgGpiYE-UsaKBeAWrHgGHdTdu_iarcK_cj8w"
            ].join(".")
        }
    });

    #[test]
    fn test_session_encode() {
        assert_eq!(SessionServiceJWT.encode(&user_stub(), &DateTimeGenStub(String::from("2099-12-18T18:02Z"), 4101300161)), Ok(SESSION.clone()));
    }

    #[test]
    fn test_session_decode() {
        assert_eq!(SessionServiceJWT.decode(SESSION.clone()), Ok(user_stub().id));
    }
}
