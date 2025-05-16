use jsonwebtoken::{Algorithm, DecodingKey, EncodingKey, Header, Validation, decode, encode};
use serde::{Deserialize, Serialize};

use domain::{
    generator::DateTimeGenerator,
    schedule::user::model::User,
    session::{Session, SessionDecodeErr, SessionDecodeService, SessionEncodeErr, SessionEncodeService, SessionErr},
};

#[derive(Debug, Serialize, Deserialize)]
struct Claims {
    username: String,
    sub: String,
    aud: String,
    iss: String,
    exp: usize,
    iat: usize,
}

const SECRET: &str = "your-secret-key";

pub struct SessionEncodeServiceJWT;

pub struct SessionDecodeServiceJWT;

impl SessionEncodeService for SessionEncodeServiceJWT {
    fn encode<DtTmGen: DateTimeGenerator>(&self, user: &User, date_time_gen: &DtTmGen) -> Result<Session, SessionErr> {
        let claims = Claims {
            username: user.username.clone(),
            sub: user.id.clone(),
            aud: "precise_schedule_server".into(),
            iss: "precise_schedule".into(),
            exp: (date_time_gen.now_as_unix_epoch() + 60 * 60 * 2) as usize,
            iat: date_time_gen.now_as_unix_epoch() as usize,
        };
        let token = encode(&Header::new(Algorithm::HS512), &claims, &EncodingKey::from_secret(SECRET.as_ref()))
            .map_err(|_| SessionErr::Encode(SessionEncodeErr))?;
        Ok(Session { token })
    }
}

impl SessionDecodeService for SessionDecodeServiceJWT {
    fn decode(&self, session: Session) -> Result<String, SessionErr> {
        let mut validation = Validation::new(Algorithm::HS512);
        validation.set_audience(&["precise_schedule_server".to_string()]);
        validation.set_issuer(&["precise_schedule".to_string()]);
        let token_data = decode::<Claims>(&session.token, &DecodingKey::from_secret(SECRET.as_ref()), &validation)
            .map_err(|_| SessionErr::Decode(SessionDecodeErr))?;
        Ok(token_data.claims.sub)
    }
}

#[cfg(test)]
mod test {
    use domain::{
        generator::stub::DateTimeGeneratorStub,
        schedule::user::model::{User, stub::user_stub},
        session::{Session, SessionDecodeService, SessionEncodeService},
    };

    use super::{SessionDecodeServiceJWT, SessionEncodeServiceJWT};

    fn session_stub() -> Session {
        Session {
            token: [
                "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9",
                &[
                    "eyJ1c2VybmFtZSI6Im1hY2NhIiwic3ViIjoi",
                    "YTZlZGM5MDYtMmY5Zi01ZmIyLWEzNzMtZWZh",
                    "YzQwNmYwZWYyIiwiYXVkIjoicHJlY2lzZV9z",
                    "Y2hlZHVsZV9zZXJ2ZXIiLCJpc3MiOiJwcmVj",
                    "aXNlX3NjaGVkdWxlIiwiZXhwIjo0MTAxMzA3",
                    "MzYxLCJpYXQiOjQxMDEzMDAxNjF9",
                ]
                .join(""),
                "oaRQBy7-yCWu6MUW3smjOaG4609PjeEZyN5Vlc8fPdbLmpU3QXeDEQb_6hRq3yoXH2eFmfbQYu587P1z1ZNyeg",
            ]
            .join("."),
        }
    }

    #[test]
    fn test_session_encode() {
        assert_eq!(
            SessionEncodeServiceJWT.encode(
                &User {
                    id: "a6edc906-2f9f-5fb2-a373-efac406f0ef2".into(),
                    email: "paul@gmail.com".into(),
                    first_name: "Paul McCartney".into(),
                    birthdate: "1942-06-18".into(),
                    username: "macca".into(),
                    password: "asdf!@#123".into(),
                    created_at: "2024-03-01T11:26Z".into(),
                    updated_at: "2024-07-03T22:49Z".into(),
                },
                &DateTimeGeneratorStub::of_unix_epoch(4101300161)
            ),
            Ok(session_stub())
        );
    }

    #[test]
    fn test_session_decode() {
        assert_eq!(SessionDecodeServiceJWT.decode(session_stub()), Ok("a6edc906-2f9f-5fb2-a373-efac406f0ef2".into()));
    }
}
